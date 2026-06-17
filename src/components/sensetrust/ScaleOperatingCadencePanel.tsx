import type { SenseTrustScaleOperatingCadence } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleOperatingCadencePanel({ cadences }: { cadences: SenseTrustScaleOperatingCadence[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Operating Cadence</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{cadences.slice(0, 8).map((cadence) => <div key={cadence.cadence_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{cadence.cadence_title}</p><p className="text-xs text-slate-600">{cadence.cadence_items.length} itens; sem calendario contratual</p></div>)}</div></section>
}
