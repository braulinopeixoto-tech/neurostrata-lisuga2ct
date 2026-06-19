import type { SenseTrustPilotValueHypothesisCanvas } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotValueHypothesisCanvasPanel({ canvases }: { canvases: SenseTrustPilotValueHypothesisCanvas[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Value Hypothesis Canvas</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{canvases.slice(0, 8).map((x) => <div key={x.value_hypothesis_canvas_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.value_hypothesis_canvas_id}</p><p className="text-xs text-slate-600">{x.items[0]?.hypothesis}</p></div>)}</div></section>
}
