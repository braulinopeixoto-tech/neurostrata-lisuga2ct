import type { SenseTrustPilotGTMRecommendation } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotGTMRecommendationPanelProps {
  recommendation: SenseTrustPilotGTMRecommendation
}

export function PilotGTMRecommendationPanel({ recommendation }: PilotGTMRecommendationPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Go-to-market recommendation</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{recommendation.priority_segment}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-black text-slate-900">{recommendation.readiness_score}/100</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3 text-sm">
          <p className="font-bold text-slate-900">{recommendation.route}</p>
          <p className="mt-1 text-slate-700">{recommendation.entry_offer}</p>
          <p className="mt-2 font-mono text-xs font-bold text-slate-600">decision: {recommendation.decision}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-xs">
          <p className="font-bold uppercase text-slate-500">restrictions</p>
          {recommendation.restrictions.map((restriction) => <p key={restriction} className="mt-1 font-mono text-slate-700">{restriction}</p>)}
        </div>
      </div>
      <div className="mt-3 rounded-md bg-emerald-50 p-3 text-xs text-emerald-800">
        {recommendation.recommended_messages.map((message) => <p key={message}>{message}</p>)}
      </div>
    </section>
  )
}
