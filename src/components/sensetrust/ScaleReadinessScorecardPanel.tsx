import type { SenseTrustScaleReadinessScorecard } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleReadinessScorecardPanel({ scorecards }: { scorecards: SenseTrustScaleReadinessScorecard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Readiness Scorecard</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{scorecards.slice(0, 8).map((scorecard) => <div key={scorecard.scorecard_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xl font-black text-slate-950">{scorecard.operating_readiness_score}%</p><p className="text-xs text-slate-600">{scorecard.recommended_decision}</p></div>)}</div></section>
}
