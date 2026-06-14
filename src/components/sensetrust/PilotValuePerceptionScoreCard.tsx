import type { SenseTrustPilotValueMetric } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotValuePerceptionScoreCardProps {
  metrics: SenseTrustPilotValueMetric[]
}

export function PilotValuePerceptionScoreCard({ metrics }: PilotValuePerceptionScoreCardProps) {
  const averageValue = Math.round(metrics.reduce((sum, metric) => sum + metric.perceived_value_score, 0) / Math.max(metrics.length, 1))

  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Value perception</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">document confidence, clarity, safety and intent</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-black text-slate-900">{averageValue}/100</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.metric_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="text-sm font-bold text-slate-900">{metric.label}</p>
            <div className="mt-2 grid gap-1">
              <Line label="perceived value" value={metric.perceived_value_score} />
              <Line label="document trust" value={metric.document_confidence_score} />
              <Line label="clarity" value={metric.clarity_score} />
              <Line label="safety" value={metric.perceived_safety_score} />
              <Line label="usage intent" value={metric.usage_intent_score} />
              <p className="font-mono font-bold text-slate-600">purchase: {metric.purchase_intent}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Line({ label, value }: { label: string; value: number }) {
  return <p className="flex justify-between gap-3"><span>{label}</span><span className="font-mono font-bold">{value}</span></p>
}
