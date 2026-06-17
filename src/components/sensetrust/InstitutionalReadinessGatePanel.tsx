import type { SenseTrustInstitutionalReadinessGate } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function InstitutionalReadinessGatePanel({ gates }: { gates: SenseTrustInstitutionalReadinessGate[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Institutional Readiness Gate</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{gates.slice(0, 4).map((gate) => <article key={gate.readiness_gate_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{gate.readiness_title}</p><p className="text-sm text-slate-600">{gate.readiness_level} / {gate.recommended_decision}</p><p className="mt-2 text-xs font-bold uppercase text-rose-700">blocked: {gate.blocked_actions.join(', ')}</p></article>)}</div></section>
}
