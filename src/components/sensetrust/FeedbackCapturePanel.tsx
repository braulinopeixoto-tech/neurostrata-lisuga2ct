import type { SenseTrustMeetingFeedbackItem } from '@/types/sensetrust/meeting-intelligence'

export function FeedbackCapturePanel({ items }: { items: SenseTrustMeetingFeedbackItem[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Feedback capture</p>
      <p className="mt-1 text-sm font-semibold text-rose-700">Sem coleta real aberta; feedback e estruturado/simulado.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.slice(0, 12).map((item) => (
          <div key={item.feedback_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{item.dimension}</p>
            <p className="mt-1 font-semibold text-slate-950">{item.prompt}</p>
            <p className="mt-2 text-sm text-slate-600">{item.simulated_response}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
