import {
  REVENUE_OPS_REAL_PAYMENT_DENYLIST,
  REVENUE_OPS_SENSITIVE_DENYLIST,
  SIMULATED_BILLING_READINESS_SCENARIOS,
  SIMULATED_COMMERCIAL_CONTRACT_TEMPLATES,
  SIMULATED_REVENUE_LEDGER_ENTRIES,
  SIMULATED_REVENUE_RISKS,
} from '@/fixtures/sensetrust/simulated-revenue-operations'
import type {
  SenseTrustBillingReadinessChecklist,
  SenseTrustCommercialContractClause,
  SenseTrustRevenueOpsExportPayload,
  SenseTrustRevenueOpsReport,
  SenseTrustRevenueOpsState,
  SenseTrustRevenueReadinessDecision,
  SenseTrustRevenueRisk,
  SenseTrustSimulatedRevenueLedgerEntry,
} from '@/types/sensetrust/revenue-operations'

export function createBillingReadinessChecklist(): SenseTrustBillingReadinessChecklist {
  return {
    checklist_id: 'BILLING-READY-SIM-001',
    contract_reviewable: true,
    commercial_policy: true,
    data_policy: true,
    usage_plan: true,
    future_billing_terms: true,
    legal_review: false,
    fiscal_review: false,
    gateway_selected: false,
    gateway_not_implemented: true,
    invoice_real_not_implemented: true,
    billing_real_not_implemented: true,
  }
}

export function createCommercialContractTemplate() { return SIMULATED_COMMERCIAL_CONTRACT_TEMPLATES[0] }
export function createCommercialContractClause(): SenseTrustCommercialContractClause { return createCommercialContractTemplate().clauses[0] }
export function createSimulatedInvoice(entry = SIMULATED_REVENUE_LEDGER_ENTRIES[0]) { return { invoice_id: `INV-SIM-${entry.entry_id}`, ledger_entry_id: entry.entry_id, simulated_amount_brl: entry.simulated_amount_brl, simulated_status: entry.simulated_status, invoice_real_issued: false as const, fiscal_document_real_issued: false as const, simulated_only: true as const } }
export function createSimulatedRevenueLedgerEntry() { return SIMULATED_REVENUE_LEDGER_ENTRIES[0] }

export function createRevenueLedger(entries = SIMULATED_REVENUE_LEDGER_ENTRIES) {
  return {
    ledger_id: 'REVENUE-LEDGER-SIM-001',
    entries: entries.map((entry) => ({ ...entry })),
    simulated_mrr_brl: calculateSimulatedMRR(entries),
    simulated_arr_brl: calculateSimulatedARR(entries),
    simulated_only: true as const,
  }
}

export function createUpgradeDowngradePolicy() {
  return {
    policy_id: 'UPDOWN-SIM-001',
    upgrade_simulated: 'Upgrade simulado por aumento de volume ou governanca.',
    downgrade_simulated: 'Downgrade simulado por reducao de uso.',
    pause_simulated: 'Pausa simulada mediante revisao manual.',
    reactivation_simulated: 'Reativacao simulada apos nova revisao.',
    eligibility_criteria: ['risco controlado', 'limite de uso definido', 'revisao manual'],
    manual_review_required: true as const,
  }
}

export function createCancellationPolicy() {
  return {
    policy_id: 'CANCEL-SIM-001',
    cancellation_simulated: 'Cancelamento simulado sem cobranca real.',
    refund_simulated: 'Reembolso simulado sem transacao real.',
    risk_exit: 'Encerrar piloto se houver pedido de uso clinico real.',
    manual_review_required: true as const,
  }
}

export function createDunningPolicySimulated() { return { policy_id: 'DUNNING-SIM-001', reminder_steps: ['lembrete simulado', 'pausa simulada', 'revisao manual'], real_collection_implemented: false as const, simulated_only: true as const } }
export function createFiscalLegalReviewItem() { return { item_id: 'FISCAL-LEGAL-SIM-001', label: 'contrato comercial', status: 'legal_review_pending' as const, owner: 'Legal Owner', blocker: true } }
export function createRevenueRisk() { return SIMULATED_REVENUE_RISKS[0] }

export function createRevenueOpsState(): SenseTrustRevenueOpsState {
  return {
    state_id: 'REVOPS-STATE-SIM-001',
    version: 'v1.6',
    billing_readiness_status: 'draft_ready',
    contract_readiness_status: 'legal_review_pending',
    fiscal_review_status: 'fiscal_review_pending',
    legal_review_status: 'legal_review_pending',
    gateway_readiness_status: 'not_ready',
    simulated_ledger: createRevenueLedger(),
    commercial_contract_templates: SIMULATED_COMMERCIAL_CONTRACT_TEMPLATES.map((template) => ({ ...template, clauses: [...template.clauses] })),
    upgrade_downgrade_policy: createUpgradeDowngradePolicy(),
    cancellation_policy: createCancellationPolicy(),
    revenue_risks: SIMULATED_REVENUE_RISKS.map((risk) => ({ ...risk })),
    readiness_decision: recommendRevenueReadinessDecision(),
    next_action: recommendBillingNextAction(),
    billing_real_implemented: false,
    payment_gateway_real_implemented: false,
    invoice_real_implemented: false,
    fiscal_document_real_implemented: false,
    simulated_only: true,
  }
}

export function calculateBillingReadinessScore(checklist = createBillingReadinessChecklist()) {
  const values = Object.entries(checklist).filter(([key]) => key !== 'checklist_id').map(([, value]) => Boolean(value))
  return Math.round((values.filter(Boolean).length / values.length) * 100)
}

export function calculateContractReadinessScore() { return 62 }
export function calculateFiscalLegalReadinessScore() { return 45 }
export function calculateGatewayReadinessScore() { return 25 }
export function calculateRevenueOpsReadinessScore() { return Math.round((calculateBillingReadinessScore() + calculateContractReadinessScore() + calculateFiscalLegalReadinessScore() + calculateGatewayReadinessScore()) / 4) }
export function calculateSimulatedMRR(entries = SIMULATED_REVENUE_LEDGER_ENTRIES) { return entries.filter((entry) => entry.simulated_status !== 'not_applicable').reduce((sum, entry) => sum + entry.simulated_amount_brl, 0) }
export function calculateSimulatedARR(entries = SIMULATED_REVENUE_LEDGER_ENTRIES) { return calculateSimulatedMRR(entries) * 12 }
export function calculateSimulatedOverdueAmount(entries = SIMULATED_REVENUE_LEDGER_ENTRIES) { return entries.filter((entry) => entry.simulated_status === 'simulated_overdue').reduce((sum, entry) => sum + entry.simulated_amount_brl, 0) }

export function summarizeSimulatedRevenueLedger(entries = SIMULATED_REVENUE_LEDGER_ENTRIES) {
  return { count: entries.length, simulated_mrr_brl: calculateSimulatedMRR(entries), simulated_arr_brl: calculateSimulatedARR(entries), simulated_overdue_brl: calculateSimulatedOverdueAmount(entries) }
}

export function summarizeRevenueRisks(risks = SIMULATED_REVENUE_RISKS) {
  return risks.map((risk) => ({ risk: risk.risk, level: risk.level, owner: risk.owner, blocker: risk.status === 'blocked' }))
}

export function summarizeFiscalLegalQueue() {
  return ['contrato comercial', 'termo de uso pago', 'politica de cancelamento', 'politica de reembolso', 'emissao fiscal', 'gateway', 'LGPD', 'privacidade'].map((label, index) => ({ item_id: `QUEUE-SIM-${index + 1}`, label, status: index < 2 ? 'legal_review_pending' : 'fiscal_review_pending' }))
}

export function recommendRevenueReadinessDecision(): SenseTrustRevenueReadinessDecision { return 'require_legal_review' }
export function recommendBillingNextAction() { return 'Concluir revisao juridica e fiscal antes de qualquer piloto pago controlado.' }

export function buildRevenueOpsExecutiveReport(): SenseTrustRevenueOpsReport {
  return {
    report_id: 'REVOPS-REPORT-SIM-001',
    readiness_score: calculateRevenueOpsReadinessScore(),
    simulated_mrr_brl: calculateSimulatedMRR(),
    simulated_arr_brl: calculateSimulatedARR(),
    blockers: SIMULATED_REVENUE_RISKS.filter((risk) => risk.status === 'blocked').map((risk) => risk.risk),
    recommended_decision: recommendRevenueReadinessDecision(),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function buildRevenueOpsExportPayload(): SenseTrustRevenueOpsExportPayload {
  return { schema: 'sensetrust.revenue_operations_export.v1', exported_at: '2026-06-14T16:00:00.000Z', state: createRevenueOpsState(), report: buildRevenueOpsExecutiveReport(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validateRevenueOpsExportPayload(payload = buildRevenueOpsExportPayload()) {
  const noRealBilling = assertRevenueOpsNoRealBilling(payload)
  const noPayment = assertRevenueOpsNoRealPaymentIntegration(payload)
  const noInvoice = assertRevenueOpsNoRealInvoice(payload)
  const noSensitive = assertRevenueOpsNoSensitiveExposure(payload)
  const simulated = assertRevenueOpsSimulatedOnly(payload.state.simulated_ledger.entries)
  return { valid: noRealBilling && noPayment && noInvoice && noSensitive && simulated }
}

export function assertRevenueOpsNoRealBilling(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  if (serialized.includes('billing_real_implemented":true')) throw new Error('revenue_ops_real_billing_detected')
  return true
}

export function assertRevenueOpsNoRealPaymentIntegration(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = REVENUE_OPS_REAL_PAYMENT_DENYLIST.filter((term) => serialized.includes(term))
  if (exposed.length || serialized.includes('payment_gateway_real_implemented":true') || serialized.includes('payment_gateway_real_used":true')) throw new Error(`revenue_ops_real_payment_detected:${exposed.join(',')}`)
  return true
}

export function assertRevenueOpsNoRealInvoice(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  if (serialized.includes('invoice_real_implemented":true') || serialized.includes('invoice_real_issued":true') || serialized.includes('fiscal_document_real_issued":true')) throw new Error('revenue_ops_real_invoice_detected')
  return true
}

export function assertRevenueOpsNoSensitiveExposure(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = REVENUE_OPS_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  if (exposed.length) throw new Error(`revenue_ops_sensitive_exposure:${exposed.join(',')}`)
  return true
}

export function assertRevenueOpsSimulatedOnly(entries: SenseTrustSimulatedRevenueLedgerEntry[]) {
  if (!entries.every((entry) => entry.simulated_only && entry.public_exposure === 'metadata_only' && entry.billing_real_implemented === false)) throw new Error('revenue_ops_non_simulated_entry')
  return true
}

export function linkRevenueOpsToPricingStrategy() { return { link: 'SenseTrust Pricing Strategy v1.5', public_exposure: 'metadata_only' as const } }
export function linkRevenueOpsToFeedbackIntelligence() { return { link: 'SenseTrust Feedback Intelligence v1.4', public_exposure: 'metadata_only' as const } }
export function linkRevenueOpsToPilotCRM() { return { link: 'SenseTrust Pilot CRM v1.3', public_exposure: 'metadata_only' as const } }
export function linkRevenueOpsToSaaSCore() { return { link: 'SenseTrust SaaS Core v0.9', public_exposure: 'metadata_only' as const } }
export function linkRevenueOpsToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }

export { SIMULATED_BILLING_READINESS_SCENARIOS }
