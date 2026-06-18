import type { SenseTrustPartnerFollowUpGovernance } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerFollowUpGovernancePanel({ governance }: { governance: SenseTrustPartnerFollowUpGovernance[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Follow-up Governance</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{governance.map((item) => <div key={item.partner_follow_up_governance_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{item.items.length} acoes</p><p className="text-xs text-slate-600">sem CRM/e-mail real</p></div>)}</div></section>
}
