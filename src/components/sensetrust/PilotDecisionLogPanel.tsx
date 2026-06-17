import type { SenseTrustPilotDecisionLog } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotDecisionLogPanel({ items }: { items: SenseTrustPilotDecisionLog[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Pilot decision log</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.slice(0, 12).map((item) => (
          <div key={item.decision_log_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{item.simulated_date_label} / {item.checkpoint_reference}</p>
            <p className="mt-2 text-sm font-black text-slate-900">{item.decision_type}</p>
            <p className="mt-1 text-xs text-slate-600">{item.decision_reason}</p>
            <p className="mt-1 text-xs text-slate-600">Responsible: {item.simulated_responsible}</p>
            <p className="mt-2 text-xs font-bold text-emerald-700">metadata_only</p>
          </div>
        ))}
      </div>
    </section>
  )
}
