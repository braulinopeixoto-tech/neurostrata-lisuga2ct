import type { SenseTrustMeetingFollowUpGovernance } from '@/types/sensetrust/meeting-intelligence'

export function FollowUpGovernancePanel({ items }: { items: SenseTrustMeetingFollowUpGovernance[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Follow-up governance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.governance_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-bold text-slate-950">{item.audience_type}</p>
            <p className="mt-2 text-sm text-slate-700">{item.authorized_message}</p>
            <p className="mt-2 text-xs text-emerald-700">Permitidos: {item.allowed_materials.join(', ')}</p>
            <p className="mt-2 text-xs text-rose-700">Proibidos: {item.prohibited_materials.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
