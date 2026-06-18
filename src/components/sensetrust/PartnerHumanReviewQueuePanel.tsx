import type { SenseTrustPartnerHumanReviewQueue } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerHumanReviewQueuePanel({ queues }: { queues: SenseTrustPartnerHumanReviewQueue[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Human Review Queue</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{queues.map((queue) => <div key={queue.partner_human_review_queue_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{queue.items.length} revisoes</p><p className="text-xs text-slate-600">human / legal / scientific / regulatory</p></div>)}</div></section>
}
