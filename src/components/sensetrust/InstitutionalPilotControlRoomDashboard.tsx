import type { SenseTrustInstitutionalPilotControlRoomState } from '@/types/sensetrust/institutional-pilot-control-room'

export function InstitutionalPilotControlRoomDashboard({ state }: { state: SenseTrustInstitutionalPilotControlRoomState }) {
  const statuses = new Set(state.pilots.map((item) => item.pilot_status))
  const critical = state.execution_risks.filter((item) => item.risk_level === 'critical').length
  const progress = Math.round(state.status_boards.reduce((sum, item) => sum + item.acceptance_progress, 0) / state.status_boards.length)
  const guardrails = ['no real clinical operation', 'no real patient data', 'no real contract', 'no real billing', 'no real CRM', 'no diagnostic truth certification', 'no client claim']
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xl font-black text-slate-950">SenseTrust Institutional Pilot Control Room v2.5</p>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">supervised pilot / metadata_only / simulated_only</p>
        </div>
        <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">no real clinical operation</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-6">
        <Metric label="pilotos" value={state.pilots.length} />
        <Metric label="status" value={statuses.size} />
        <Metric label="checkpoints" value={state.checkpoints.length} />
        <Metric label="aceite" value={progress} suffix="%" />
        <Metric label="revisoes" value={state.supervised_acceptance_records.length} />
        <Metric label="risco critico" value={critical} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{guardrails.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{item}</span>)}</div>
    </section>
  )
}

function Metric({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}{suffix}</p></div>
}
