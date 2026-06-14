import type { SenseTrustPilotFeedbackItem } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotFeedbackTimelineProps {
  items: SenseTrustPilotFeedbackItem[]
}

export function PilotFeedbackTimeline({ items }: PilotFeedbackTimelineProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Feedback timeline</p>
      <ol className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.feedback_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{item.organization_name}</p>
              <span className="font-mono text-xs font-bold text-slate-500">{item.category} / {item.sentiment}</span>
            </div>
            <p className="mt-2 text-slate-700">{item.comment_simulated}</p>
            <p className="mt-2 font-mono text-xs text-slate-600">objection: {item.objection_type} / risk: {item.risk_level} / action: {item.next_action}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
