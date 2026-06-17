import type { SenseTrustGoNoGoDecision } from '@/types/sensetrust/pipeline-governance'

export function GoNoGoDecisionPanel({ decisions }: { decisions: SenseTrustGoNoGoDecision[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Go/No-Go decisions</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {decisions.map((decision) => (
          <div key={decision.decision_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{decision.decision_type} / {decision.risk_level}</p>
            <p className="mt-2 font-semibold text-slate-950">{decision.decision_reason}</p>
            <p className="mt-2 text-sm text-slate-600">{decision.evidence_summary}</p>
            <p className="mt-2 text-xs text-emerald-700">Permitido: {decision.allowed_next_move}</p>
            <p className="mt-1 text-xs text-rose-700">Bloqueado: {decision.blocked_actions.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
