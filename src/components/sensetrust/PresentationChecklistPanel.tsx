import type { SenseTrustPresentationChecklist } from '@/types/sensetrust/demo-readiness'

export function PresentationChecklistPanel({ items }: { items: SenseTrustPresentationChecklist[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Presentation checklist</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.item_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-xs font-bold uppercase text-slate-500">{item.phase}</p>
            <p className="mt-2 font-semibold text-slate-950">{item.requirement}</p>
            <p className="mt-2 text-xs text-emerald-700">Autorizado: {item.authorized_material}</p>
            <p className="mt-1 text-xs text-rose-700">Proibido: {item.prohibited_material}</p>
            <p className="mt-2 text-xs text-slate-600">Revisao humana: {item.requires_human_review ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
