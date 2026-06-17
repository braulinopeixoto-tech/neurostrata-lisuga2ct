import type { SenseTrustStrategicScaleGate } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function StrategicScaleGatePanel({ gates }: { gates: SenseTrustStrategicScaleGate[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Scale Gate</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{gates.slice(0, 4).map((gate) => <article key={gate.scale_gate_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{gate.strategic_title}</p><p className="text-sm text-slate-600">{gate.scale_decision} / score {gate.scale_candidate_score.score}</p><p className="mt-2 text-xs text-slate-500">{gate.next_action}</p></article>)}</div></section>
}
