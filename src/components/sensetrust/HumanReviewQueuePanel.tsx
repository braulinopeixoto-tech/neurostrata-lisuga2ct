import type { SenseTrustHumanReviewQueueItem } from '@/types/sensetrust/pipeline-governance'

export function HumanReviewQueuePanel({ items }: { items: SenseTrustHumanReviewQueueItem[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Human review queue</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.queue_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{item.opportunity_id}</p>
            <p className="mt-2 text-sm text-slate-600">{item.review_reason}</p>
            <p className="mt-2 text-xs text-rose-700">{item.risk_level} / owner {item.simulated_owner} / pendente {item.pending_decision}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
