import type { SenseTrustNextMoveRecommendation } from '@/types/sensetrust/pipeline-governance'

export function NextMoveRecommendationPanel({ items }: { items: SenseTrustNextMoveRecommendation[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Next move recommendations</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.recommendation_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-bold text-slate-950">{item.opportunity_id}</p>
            <p className="mt-2 text-sm text-slate-700">{item.next_move}</p>
            <p className="mt-2 text-xs text-emerald-700">Material: {item.authorized_material} / Reuniao: {item.suggested_meeting}</p>
            <p className="mt-1 text-xs text-rose-700">Bloqueado: {item.blocked_action}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
