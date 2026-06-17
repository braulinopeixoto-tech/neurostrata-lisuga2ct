import type { SenseTrustStrategicScaleOperatingModel } from '@/types/sensetrust/strategic-scale-operating-model'

export function StrategicScaleOperatingModelPanel({ models }: { models: SenseTrustStrategicScaleOperatingModel[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Scale Operating Model</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{models.slice(0, 4).map((model) => <article key={model.operating_model_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{model.operating_model_title}</p><p className="text-sm text-slate-600">{model.operating_model_status} / {model.recommended_operating_decision}</p><p className="mt-2 text-xs font-bold uppercase text-rose-700">blocked: {model.blocked_actions.join(', ')}</p></article>)}</div></section>
}
