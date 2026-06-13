import type { SenseTrustPilotReadinessScore } from '@/types/sensetrust/pilot-console'

interface PilotReadinessScoreCardProps {
  score: SenseTrustPilotReadinessScore
}

export function PilotReadinessScoreCard({ score }: PilotReadinessScoreCardProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Readiness score</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{score.status}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-bold text-slate-900">{score.score}/10</span>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {score.criteria.map((item) => (
          <div key={item.criterion} className="flex justify-between rounded-md bg-slate-50 px-3 py-2 text-sm">
            <span>{item.criterion}</span>
            <span className={item.passed ? 'font-bold text-emerald-700' : 'font-bold text-amber-700'}>{item.passed ? 'ok' : 'pendente'}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
