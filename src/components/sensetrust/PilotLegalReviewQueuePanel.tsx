import type { SenseTrustPilotLegalReviewQueue } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotLegalReviewQueuePanel({ queues }: { queues: SenseTrustPilotLegalReviewQueue[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Legal Review Queue</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{queues.slice(0, 8).map((x) => <div key={x.legal_review_queue_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.legal_review_queue_id}</p><p className="text-xs text-slate-600">{x.items.length} legal review routes</p></div>)}</div></section>
}
