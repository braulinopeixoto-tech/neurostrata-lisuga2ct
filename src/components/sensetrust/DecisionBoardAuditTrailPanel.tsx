import type { SenseTrustDecisionAuditTrailItem } from '@/types/sensetrust/pipeline-governance'

export function DecisionBoardAuditTrailPanel({ items }: { items: SenseTrustDecisionAuditTrailItem[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Decision audit trail</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.slice(0, 12).map((item) => (
          <div key={item.audit_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold text-slate-500">{item.opportunity_id} / {item.simulated_date_label}</p>
            <p className="mt-2 text-sm text-slate-700">{item.previous_stage} to {item.next_stage}</p>
            <p className="mt-2 text-xs text-slate-600">{item.reason}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
