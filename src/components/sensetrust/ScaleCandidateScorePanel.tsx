import type { SenseTrustScaleCandidateScore } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function ScaleCandidateScorePanel({ scores }: { scores: SenseTrustScaleCandidateScore[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Candidate Score</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{scores.slice(0, 8).map((score) => <div key={score.score_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xl font-black text-slate-950">{score.score}%</p><p className="text-xs text-slate-600">{score.readiness_level} / {score.recommendation}</p></div>)}</div></section>
}
