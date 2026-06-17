import type { SenseTrustPilotEvidenceVaultState } from '@/types/sensetrust/pilot-evidence-vault'

export function PilotEvidenceVaultDashboard({ state }: { state: SenseTrustPilotEvidenceVaultState }) {
  const completeness = Math.round(state.completeness_scores.reduce((sum, item) => sum + item.score, 0) / state.completeness_scores.length)
  const acceptance = Math.round(state.vaults.reduce((sum, item) => sum + item.acceptance_progress, 0) / state.vaults.length)
  const critical = state.risk_signals.filter((item) => item.risk_level === 'critical').length
  const guardrails = ['metadata_only', 'no clinical data', 'no patient data', 'no real storage', 'no legal signature', 'no blockchain', 'no diagnostic truth certification']
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xl font-black text-slate-950">SenseTrust Pilot Evidence Vault v2.6</p>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">logical vault / acceptance ledger / metadata_only</p>
        </div>
        <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-black text-rose-700">no legal proof claim</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-6">
        <Metric label="vaults" value={state.vaults.length} />
        <Metric label="records" value={state.evidence_records.length} />
        <Metric label="completude" value={completeness} suffix="%" />
        <Metric label="aceite" value={acceptance} suffix="%" />
        <Metric label="riscos" value={state.risk_signals.length} />
        <Metric label="criticos" value={critical} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{guardrails.map((item) => <span key={item} className="rounded bg-slate-100 px-2 py-1 text-xs font-bold uppercase text-slate-700">{item}</span>)}</div>
    </section>
  )
}

function Metric({ label, value, suffix = '' }: { label: string; value: number; suffix?: string }) {
  return <div className="rounded-md bg-slate-50 p-3"><p className="text-xs font-semibold uppercase text-slate-500">{label}</p><p className="mt-1 font-mono text-xl font-black text-slate-950">{value}{suffix}</p></div>
}
