import type { SenseTrustPilotFlowResult, SenseTrustPilotScenario } from '@/types/sensetrust/pilot-console'
import { EndToEndFlowTimeline } from './EndToEndFlowTimeline'
import { PilotAuditReportPanel } from './PilotAuditReportPanel'
import { PilotReadinessScoreCard } from './PilotReadinessScoreCard'
import { PilotScenarioSelector } from './PilotScenarioSelector'

interface PilotConsoleDashboardProps {
  scenarios: SenseTrustPilotScenario[]
  result: SenseTrustPilotFlowResult
  selectedScenarioId: string
}

export function PilotConsoleDashboard({ scenarios, result, selectedScenarioId }: PilotConsoleDashboardProps) {
  const flow = result.flow

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Pilot Console</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">{flow.status} / simulated_only</p>
          </div>
          <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">closed pilot demo</span>
        </div>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
          <Field label="organization" value={flow.organization_id} />
          <Field label="user" value={flow.user_id} />
          <Field label="plan" value={flow.plan_id} />
        </div>
      </section>

      <PilotScenarioSelector scenarios={scenarios} selectedScenarioId={selectedScenarioId} />
      <PilotReadinessScoreCard score={result.readiness_score} />
      <EndToEndFlowTimeline steps={flow.steps} />
      <PilotAuditReportPanel report={result.audit_report} />

      <section className="rounded-md border bg-white p-4 text-sm text-slate-700 shadow-sm">
        SenseTrust certifica integridade, proveniencia, estado documental e verificabilidade; nao certifica verdade diagnostica absoluta.
      </section>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-xs font-bold text-slate-900">{value}</p>
    </div>
  )
}
