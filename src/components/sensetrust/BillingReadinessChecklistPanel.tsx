import type { SenseTrustBillingReadinessChecklist } from '@/types/sensetrust/revenue-operations'

interface BillingReadinessChecklistPanelProps {
  checklist: SenseTrustBillingReadinessChecklist
}

export function BillingReadinessChecklistPanel({ checklist }: BillingReadinessChecklistPanelProps) {
  const items = Object.entries(checklist).filter(([key]) => key !== 'checklist_id')
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Billing readiness checklist</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, ok]) => (
          <div key={label} className="rounded-md bg-slate-50 px-3 py-2 text-xs">
            <p className="font-mono font-bold text-slate-700">{label}</p>
            <p className={ok ? 'mt-1 font-bold text-emerald-700' : 'mt-1 font-bold text-amber-700'}>{ok ? 'ready' : 'pending'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
