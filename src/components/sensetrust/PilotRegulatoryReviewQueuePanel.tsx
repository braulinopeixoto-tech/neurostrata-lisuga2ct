import type { SenseTrustPilotRegulatoryReviewQueue } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotRegulatoryReviewQueuePanel({ queues }: { queues: SenseTrustPilotRegulatoryReviewQueue[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Regulatory Review Queue</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{queues.slice(0, 8).map((x) => <div key={x.regulatory_review_queue_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.regulatory_review_queue_id}</p><p className="text-xs text-slate-600">{x.items.length} regulatory review routes</p></div>)}</div></section>
}
