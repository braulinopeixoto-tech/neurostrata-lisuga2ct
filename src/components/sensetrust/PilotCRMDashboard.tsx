import type { SenseTrustPilotCRMRecord } from '@/types/sensetrust/pilot-crm'
import { calculatePilotPipelineMetrics } from '@/services/sensetrust/pilot-crm-service'
import { PilotCRMActivityTimeline } from './PilotCRMActivityTimeline'
import { PilotPipelineBoard } from './PilotPipelineBoard'
import { PilotReadinessPanel } from './PilotReadinessPanel'
import { PilotRiskPanel } from './PilotRiskPanel'

interface PilotCRMDashboardProps {
  records: SenseTrustPilotCRMRecord[]
}

export function PilotCRMDashboard({ records }: PilotCRMDashboardProps) {
  const metrics = calculatePilotPipelineMetrics(records)
  const selectedRecord = records[0]
  const activities = records.flatMap((record) => record.activities)

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Pilot CRM</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">closed pilots / metadata_only / simulated_only</p>
          </div>
          <span className="rounded-md bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">no billing / no clinical data</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          {metrics.map((metric) => (
            <div key={metric.metric_id} className="rounded-md bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase text-slate-500">{metric.label}</p>
              <p className="mt-1 font-mono text-xl font-black text-slate-950">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <PilotPipelineBoard records={records} />

      <div className="grid gap-5 xl:grid-cols-2">
        {selectedRecord ? <PilotReadinessPanel record={selectedRecord} /> : null}
        <PilotRiskPanel records={records} />
      </div>

      <PilotCRMActivityTimeline activities={activities} />

      <section className="rounded-md border bg-white p-4 text-sm text-slate-700 shadow-sm">
        SenseTrust Pilot CRM v1.3 organiza pipeline comercial fechado, documentos v1.2, pacote v1.1 e demo v1.0 sem expor dados clinicos e sem ativar billing real.
      </section>
    </div>
  )
}
