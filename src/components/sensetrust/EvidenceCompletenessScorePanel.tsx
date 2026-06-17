import type { SenseTrustEvidenceCompletenessScore } from '@/types/sensetrust/pilot-evidence-vault'

export function EvidenceCompletenessScorePanel({ scores }: { scores: SenseTrustEvidenceCompletenessScore[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Evidence completeness score</p><div className="mt-4 grid gap-3 md:grid-cols-4">{scores.map((item) => <div key={item.score_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xl font-black text-slate-950">{item.score}%</p><p className="text-xs text-slate-600">{item.pilot_id}</p><p className="mt-1 text-xs text-slate-600">Present/missing: {item.evidence_present} / {item.evidence_missing}</p><p className="mt-1 text-xs text-rose-700">Risk: {item.acceptance_risk}</p><p className="mt-1 text-xs text-slate-600">{item.recommendation}</p></div>)}</div></section>
}
