import type { SenseTrustPartnerReadinessProfile } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerReadinessProfilePanel({ profiles }: { profiles: SenseTrustPartnerReadinessProfile[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Readiness Profiles</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{profiles.slice(0, 8).map((profile) => <div key={profile.partner_profile_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{profile.partner_label}</p><p className="text-xs text-slate-600">{profile.partner_type} / {profile.recommended_decision}</p></div>)}</div></section>
}
