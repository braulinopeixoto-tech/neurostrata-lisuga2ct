import { buildRevenueOpsExecutiveReport, calculateBillingReadinessScore, calculateContractReadinessScore, calculateFiscalLegalReadinessScore, calculateGatewayReadinessScore, calculateSimulatedOverdueAmount, createBillingReadinessChecklist } from '@/services/sensetrust/revenue-operations-service'
import type { SenseTrustRevenueOpsState } from '@/types/sensetrust/revenue-operations'
import { BillingReadinessChecklistPanel } from './BillingReadinessChecklistPanel'
import { CommercialContractTemplatePanel } from './CommercialContractTemplatePanel'
import { PaymentGatewayReadinessPanel } from './PaymentGatewayReadinessPanel'
import { RevenueOpsExecutiveSummary } from './RevenueOpsExecutiveSummary'
import { RevenueRiskGovernancePanel } from './RevenueRiskGovernancePanel'
import { SimulatedRevenueLedgerPanel } from './SimulatedRevenueLedgerPanel'
import { UpgradeDowngradePolicyPanel } from './UpgradeDowngradePolicyPanel'

interface RevenueOperationsDashboardProps {
  state: SenseTrustRevenueOpsState
}

export function RevenueOperationsDashboard({ state }: RevenueOperationsDashboardProps) {
  const checklist = createBillingReadinessChecklist()
  const report = buildRevenueOpsExecutiveReport()
  const gatewayChecklist = {
    checklist_id: 'GATEWAY-SIM-001',
    future_gateway: 'future_vendor_selection',
    requirements: ['LGPD', 'sandbox', 'audit logs', 'data minimization'],
    pending_items: ['vendor selection', 'legal review', 'fiscal review'],
    blockers: ['gateway real not implemented', 'invoice real not implemented'],
    vendor_selection_status: 'not_ready' as const,
    compliance_status: 'legal_review_pending' as const,
    gateway_real_implemented: false as const,
  }

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Revenue Operations</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">simulated_only / metadata_only / no_real_billing</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">no payment integration</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-4 lg:grid-cols-8">
          <Metric label="geral" value={`${report.readiness_score}/100`} />
          <Metric label="billing" value={`${calculateBillingReadinessScore(checklist)}/100`} />
          <Metric label="contrato" value={`${calculateContractReadinessScore()}/100`} />
          <Metric label="fiscal/legal" value={`${calculateFiscalLegalReadinessScore()}/100`} />
          <Metric label="gateway" value={`${calculateGatewayReadinessScore()}/100`} />
          <Metric label="MRR sim." value={`R$ ${state.simulated_ledger.simulated_mrr_brl}`} />
          <Metric label="ARR sim." value={`R$ ${state.simulated_ledger.simulated_arr_brl}`} />
          <Metric label="vencido sim." value={`R$ ${calculateSimulatedOverdueAmount(state.simulated_ledger.entries)}`} />
        </div>
      </section>
      <RevenueOpsExecutiveSummary report={report} nextAction={state.next_action} />
      <BillingReadinessChecklistPanel checklist={checklist} />
      <CommercialContractTemplatePanel templates={state.commercial_contract_templates} />
      <SimulatedRevenueLedgerPanel ledger={state.simulated_ledger} />
      <UpgradeDowngradePolicyPanel upgradeDowngradePolicy={state.upgrade_downgrade_policy} cancellationPolicy={state.cancellation_policy} />
      <RevenueRiskGovernancePanel risks={state.revenue_risks} />
      <PaymentGatewayReadinessPanel checklist={gatewayChecklist} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-sm font-black text-slate-950">{value}</p>
    </div>
  )
}
