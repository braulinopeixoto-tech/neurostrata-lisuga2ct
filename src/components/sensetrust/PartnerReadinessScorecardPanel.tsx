import type { SenseTrustPartnerReadinessScorecard } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerReadinessScorecardPanel({ scorecards }: { scorecards: SenseTrustPartnerReadinessScorecard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Readiness Scorecard</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{scorecards.map((card) => <div key={card.partner_readiness_scorecard_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{card.aggregate_score}%</p><p className="text-xs text-slate-600">{card.recommended_decision}</p></div>)}</div></section>
}
