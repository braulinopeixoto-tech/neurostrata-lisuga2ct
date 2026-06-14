import type { SenseTrustPilotCRMRecord } from '@/types/sensetrust/pilot-crm'
import { evaluateGoNoGoDecision } from '@/services/sensetrust/pilot-crm-service'

interface PilotRiskPanelProps {
  records: SenseTrustPilotCRMRecord[]
}

export function PilotRiskPanel({ records }: PilotRiskPanelProps) {
  const ranked = [...records].sort((a, b) => riskWeight(b.risk_level) - riskWeight(a.risk_level))

  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-slate-950">Pilot risk queue</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">operational risk only / no clinical payload</p>
      </div>

      <div className="mt-4 space-y-3">
        {ranked.map((record) => (
          <div key={record.record_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{record.organization_name}</p>
              <span className={riskClass(record.risk_level)}>{record.risk_level}</span>
            </div>
            <p className="mt-2 text-xs text-slate-700">{record.risk_notes}</p>
            <p className="mt-2 font-mono text-xs font-bold text-slate-600">decision: {evaluateGoNoGoDecision(record)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function riskWeight(risk: string) {
  return { low: 1, moderate: 2, high: 3, critical: 4 }[risk] ?? 0
}

function riskClass(risk: string) {
  if (risk === 'critical' || risk === 'high') return 'rounded-md bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700'
  if (risk === 'moderate') return 'rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700'
  return 'rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700'
}
