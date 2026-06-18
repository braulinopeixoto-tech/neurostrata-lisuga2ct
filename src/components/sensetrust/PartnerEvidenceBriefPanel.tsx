import type { SenseTrustPartnerEvidenceBrief } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerEvidenceBriefPanel({ briefs }: { briefs: SenseTrustPartnerEvidenceBrief[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Evidence Brief</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{briefs.map((brief) => <div key={brief.partner_evidence_brief_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{brief.brief_title}</p><p className="text-xs text-slate-600">{brief.evidence_items.length} itens; no scientific validation</p></div>)}</div></section>
}
