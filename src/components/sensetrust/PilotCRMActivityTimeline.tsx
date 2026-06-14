import type { SenseTrustPilotCRMActivity } from '@/types/sensetrust/pilot-crm'

interface PilotCRMActivityTimelineProps {
  activities: SenseTrustPilotCRMActivity[]
}

export function PilotCRMActivityTimeline({ activities }: PilotCRMActivityTimelineProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-slate-950">CRM activity timeline</p>
        <p className="text-xs uppercase tracking-wide text-slate-500">append-only operational trace</p>
      </div>

      <ol className="mt-4 space-y-3">
        {activities.map((activity) => (
          <li key={activity.activity_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{activity.summary}</p>
              <span className="font-mono text-xs font-semibold text-slate-500">{activity.activity_type}</span>
            </div>
            <p className="mt-1 font-mono text-xs text-slate-500">{activity.occurred_at}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
