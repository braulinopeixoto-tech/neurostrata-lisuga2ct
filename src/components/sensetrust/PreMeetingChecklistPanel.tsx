import type { SenseTrustPreMeetingChecklist } from '@/types/sensetrust/partner-demo-kit'

export function PreMeetingChecklistPanel({ checklist }: { checklist: SenseTrustPreMeetingChecklist }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Pre-meeting checklist</p>
      <div className="mt-4 grid gap-2 md:grid-cols-4">
        {checklist.items.map((item) => <span key={item} className="rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">{item}</span>)}
      </div>
    </section>
  )
}
