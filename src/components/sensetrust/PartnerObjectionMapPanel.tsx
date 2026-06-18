import type { SenseTrustPartnerObjectionMap } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerObjectionMapPanel({ maps }: { maps: SenseTrustPartnerObjectionMap[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Objection Map</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{maps.map((map) => <div key={map.partner_objection_map_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{map.items.length} objecoes</p><p className="text-xs text-slate-600">respostas seguras simulated_only</p></div>)}</div></section>
}
