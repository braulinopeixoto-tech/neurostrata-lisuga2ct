import type { SenseTrustPilotCheckpoint } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotCheckpointTimelinePanel({ checkpoints }: { checkpoints: SenseTrustPilotCheckpoint[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Checkpoint timeline</p>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {checkpoints.slice(0, 16).map((item) => (
          <div key={item.checkpoint_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{item.checkpoint_status}</p>
            <p className="mt-2 text-sm font-bold text-slate-900">{item.checkpoint_title}</p>
            <p className="mt-2 text-xs text-slate-600">Criteria: {item.criteria.join(', ')}</p>
            <p className="mt-1 text-xs text-rose-700">Blockers: {item.blockers.join(', ')}</p>
            <p className="mt-1 text-xs text-slate-600">Evidence: {item.evidence_required.join(', ')}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
