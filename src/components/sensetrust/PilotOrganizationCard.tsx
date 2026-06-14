import type { SenseTrustPilotCRMRecord } from '@/types/sensetrust/pilot-crm'
import { recommendNextPilotAction } from '@/services/sensetrust/pilot-crm-service'

interface PilotOrganizationCardProps {
  record: SenseTrustPilotCRMRecord
}

export function PilotOrganizationCard({ record }: PilotOrganizationCardProps) {
  return (
    <article className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">{record.organization_name}</p>
          <p className="mt-1 font-mono text-xs font-semibold text-slate-500">{record.organization_id}</p>
        </div>
        <span className={statusClass(record.status)}>{record.status}</span>
      </div>

      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-2">
        <Field label="stage" value={record.pipeline_stage} />
        <Field label="priority" value={record.priority} />
        <Field label="risk" value={record.risk_level} />
        <Field label="go/no-go" value={record.go_no_go_decision} />
      </div>

      <div className="mt-4 rounded-md bg-slate-50 p-3 text-xs text-slate-700">
        <p className="font-bold text-slate-900">Next action</p>
        <p className="mt-1">{recommendNextPilotAction(record)}</p>
      </div>

      <p className="mt-3 text-xs font-semibold uppercase text-emerald-700">{record.public_exposure} / simulated_only</p>
    </article>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 px-3 py-2">
      <p className="font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono font-bold text-slate-900">{value}</p>
    </div>
  )
}

function statusClass(status: string) {
  if (status === 'completed') return 'rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700'
  if (status === 'blocked' || status === 'rejected') return 'rounded-md bg-rose-50 px-2 py-1 text-xs font-bold text-rose-700'
  if (status === 'pending' || status === 'paused') return 'rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700'
  return 'rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-700'
}
