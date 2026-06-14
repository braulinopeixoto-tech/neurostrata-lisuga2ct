import type { SenseTrustPilotCRMRecord, SenseTrustPilotPipelineStage } from '@/types/sensetrust/pilot-crm'
import { PilotOrganizationCard } from './PilotOrganizationCard'

interface PilotPipelineBoardProps {
  records: SenseTrustPilotCRMRecord[]
}

const stages: SenseTrustPilotPipelineStage[] = [
  'prospect',
  'invited',
  'qualified',
  'onboarding_sent',
  'terms_pending',
  'consent_pending',
  'agreement_pending',
  'demo_scheduled',
  'demo_completed',
  'feedback_pending',
  'go_no_go_review',
  'approved_for_next_phase',
  'rejected',
  'paused',
  'archived',
]

export function PilotPipelineBoard({ records }: PilotPipelineBoardProps) {
  const visibleStages = stages.filter((stage) => records.some((record) => record.pipeline_stage === stage))

  return (
    <section className="space-y-3">
      <div>
        <p className="text-sm font-black text-slate-950">Pilot pipeline</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">closed pilots / metadata_only / simulated_only</p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {visibleStages.map((stage) => {
          const stageRecords = records.filter((record) => record.pipeline_stage === stage)
          return (
            <div key={stage} className="rounded-md border bg-slate-50 p-3">
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="font-mono text-xs font-black uppercase text-slate-700">{stage}</p>
                <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-600">{stageRecords.length}</span>
              </div>
              <div className="space-y-3">
                {stageRecords.map((record) => (
                  <PilotOrganizationCard key={record.record_id} record={record} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
