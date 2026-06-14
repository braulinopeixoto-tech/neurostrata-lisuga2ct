import type { SenseTrustRevenueReadinessScore } from '@/types/sensetrust/pricing-strategy'

interface RevenueReadinessScoreCardProps {
  score: SenseTrustRevenueReadinessScore
}

export function RevenueReadinessScoreCard({ score }: RevenueReadinessScoreCardProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Revenue readiness</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">simulated commercial readiness only</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-black text-slate-900">{score.score}/100</span>
      </div>
      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-5">
        <Metric label="valor" value={score.value_clarity} />
        <Metric label="compra" value={score.purchase_intent} />
        <Metric label="risco com." value={score.commercial_risk} />
        <Metric label="risco jur." value={score.legal_risk} />
        <Metric label="operacao" value={score.operational_maturity} />
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md bg-slate-50 px-3 py-2">
      <p className="font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono font-bold text-slate-900">{value}</p>
    </div>
  )
}
