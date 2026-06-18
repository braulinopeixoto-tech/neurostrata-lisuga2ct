import type { SenseTrustPartnerMeetingPreparationKit } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerMeetingPreparationKitPanel({ kits }: { kits: SenseTrustPartnerMeetingPreparationKit[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Meeting Preparation Kit</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{kits.map((kit) => <div key={kit.partner_meeting_preparation_kit_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{kit.items.length} talk tracks</p><p className="text-xs text-slate-600">sem reuniao real declarada</p></div>)}</div></section>
}
