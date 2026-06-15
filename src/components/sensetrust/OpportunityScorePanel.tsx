import type { SenseTrustMeetingOpportunityScore, SenseTrustMeetingReadinessScore } from '@/types/sensetrust/meeting-intelligence'

export function OpportunityScorePanel({ opportunities, readiness }: { opportunities: SenseTrustMeetingOpportunityScore[]; readiness: SenseTrustMeetingReadinessScore[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Opportunity scoring</p>
      <p className="mt-1 text-sm font-semibold text-rose-700">Score simulado, nao previsao comercial real.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {opportunities.map((score) => {
          const ready = readiness.find((item) => item.audience_type === score.audience_type)
          return (
            <div key={score.score_id} className="rounded-md bg-slate-50 p-3">
              <p className="font-bold text-slate-950">{score.audience_type}</p>
              <p className="mt-2 font-mono text-xl font-black text-emerald-700">{score.opportunity_score}</p>
              <p className="text-xs text-slate-600">risco {score.risk_score} / prontidao {ready?.score ?? score.readiness_score}</p>
              <p className="mt-2 text-xs font-semibold text-slate-700">{score.recommended_decision}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
