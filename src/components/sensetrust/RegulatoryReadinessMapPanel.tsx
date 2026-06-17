import type { SenseTrustRegulatoryReadinessMap } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function RegulatoryReadinessMapPanel({ maps }: { maps: SenseTrustRegulatoryReadinessMap[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Regulatory Readiness Map</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{maps.slice(0, 8).map((map) => <div key={map.map_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-lg font-black text-slate-950">{map.readiness_score}%</p><p className="text-xs text-slate-600">mapa de pendencias; nao parecer juridico</p></div>)}</div></section>
}
