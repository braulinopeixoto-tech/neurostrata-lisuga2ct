import type { SenseTrustPilotCRMRecord } from '@/types/sensetrust/pilot-crm'
import { calculatePilotCRMReadiness } from '@/services/sensetrust/pilot-crm-service'

interface PilotReadinessPanelProps {
  record: SenseTrustPilotCRMRecord
}

export function PilotReadinessPanel({ record }: PilotReadinessPanelProps) {
  const readiness = calculatePilotCRMReadiness(record)

  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">Pilot readiness</p>
          <p className="text-xs uppercase tracking-wide text-slate-500">{record.organization_name}</p>
        </div>
        <span className="rounded-md bg-slate-100 px-3 py-1 font-mono text-sm font-bold text-slate-900">{readiness.score}/10</span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Checklist title="passed" items={readiness.passed} tone="emerald" />
        <Checklist title="pending" items={readiness.pending} tone="amber" />
      </div>
    </section>
  )
}

function Checklist({ title, items, tone }: { title: string; items: string[]; tone: 'emerald' | 'amber' }) {
  const badgeClass = tone === 'emerald' ? 'text-emerald-700' : 'text-amber-700'

  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className={`text-xs font-bold uppercase ${badgeClass}`}>{title}</p>
      <div className="mt-2 space-y-1">
        {items.length === 0 ? (
          <p className="text-xs text-slate-500">none</p>
        ) : (
          items.map((item) => <p key={item} className="text-xs font-semibold text-slate-700">{item}</p>)
        )}
      </div>
    </div>
  )
}
