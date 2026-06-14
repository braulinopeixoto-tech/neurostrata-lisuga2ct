import type { SenseTrustGatewayReadinessChecklist } from '@/types/sensetrust/revenue-operations'

interface PaymentGatewayReadinessPanelProps {
  checklist: SenseTrustGatewayReadinessChecklist
}

export function PaymentGatewayReadinessPanel({ checklist }: PaymentGatewayReadinessPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-black text-slate-950">Payment gateway readiness</p>
        <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">not implemented</span>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <List title="requirements" items={checklist.requirements} />
        <List title="pending" items={checklist.pending_items} />
        <List title="blockers" items={checklist.blockers} />
      </div>
    </section>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-slate-50 p-3 text-xs">
      <p className="font-bold uppercase text-slate-500">{title}</p>
      {items.map((item) => <p key={item} className="mt-1 text-slate-700">{item}</p>)}
    </div>
  )
}
