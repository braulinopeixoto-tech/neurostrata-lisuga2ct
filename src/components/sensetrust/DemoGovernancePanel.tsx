import type { SenseTrustDemoGovernanceItem } from '@/types/sensetrust/demo-readiness'

export function DemoGovernancePanel({ items }: { items: SenseTrustDemoGovernanceItem[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Demo governance</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.governance_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-slate-950">{item.topic}</p>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{item.owner}</span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{item.rule}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Aprovacao humana: {item.approval_required ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
