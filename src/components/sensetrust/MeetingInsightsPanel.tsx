import type { SenseTrustMeetingInsight } from '@/types/sensetrust/meeting-intelligence'

export function MeetingInsightsPanel({ insights }: { insights: SenseTrustMeetingInsight[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Meeting insights</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {insights.map((insight) => (
          <div key={insight.insight_id} className="rounded-md border border-slate-200 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{insight.category}</p>
            <p className="mt-2 font-semibold text-slate-950">{insight.summary}</p>
            <p className="mt-2 text-sm text-slate-600">{insight.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
