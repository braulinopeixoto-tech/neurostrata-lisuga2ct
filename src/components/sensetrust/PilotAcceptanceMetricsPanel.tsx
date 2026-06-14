import type { SenseTrustPilotAcceptanceMetric } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotAcceptanceMetricsPanelProps {
  metrics: SenseTrustPilotAcceptanceMetric[]
}

export function PilotAcceptanceMetricsPanel({ metrics }: PilotAcceptanceMetricsPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-slate-950">Acceptance metrics</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">demo, limits, metadata_only and go/no-go trend</p>
      </div>
      <div className="mt-4 space-y-3">
        {metrics.map((metric) => (
          <div key={metric.metric_id} className="rounded-md bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-900">{metric.label}</p>
              <span className="font-mono text-sm font-black text-slate-950">{metric.score}/100</span>
            </div>
            <div className="mt-3 grid gap-2 text-xs sm:grid-cols-5">
              <Badge label="demo" ok={metric.demo_completed} />
              <Badge label="terms" ok={metric.terms_understood} />
              <Badge label="metadata" ok={metric.metadata_only_understood} />
              <Badge label="limits" ok={metric.legal_limits_understood} />
              <span className="rounded-md bg-white px-2 py-1 font-mono font-bold text-slate-600">{metric.go_no_go_trend}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Badge({ label, ok }: { label: string; ok: boolean }) {
  return <span className={ok ? 'rounded-md bg-emerald-50 px-2 py-1 font-bold text-emerald-700' : 'rounded-md bg-amber-50 px-2 py-1 font-bold text-amber-700'}>{label}: {ok ? 'ok' : 'review'}</span>
}
