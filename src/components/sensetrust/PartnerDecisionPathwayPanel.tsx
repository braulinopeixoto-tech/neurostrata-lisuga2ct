import type { SenseTrustPartnerDecisionPathway } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerDecisionPathwayPanel({ pathways }: { pathways: SenseTrustPartnerDecisionPathway[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Decision Pathway</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{pathways.map((pathway) => <div key={pathway.partner_decision_pathway_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{pathway.items.length} decisoes</p><p className="text-xs text-slate-600">sem decisao vinculante</p></div>)}</div></section>
}
