import type { SenseTrustInstitutionalReadinessScore } from '@/types/sensetrust/pipeline-governance'

export function InstitutionalReadinessPanel({ scores }: { scores: SenseTrustInstitutionalReadinessScore[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Institutional readiness</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {scores.map((score) => (
          <div key={score.readiness_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{score.opportunity_id}</p>
            <p className="mt-2 text-sm text-slate-600">Inst {score.institutional_score} / Tec {score.technical_score} / Legal {score.legal_score} / Gov {score.governance_score}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">{score.recommendation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
