import type { SenseTrustPilotEvidenceItem } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotEvidenceChecklistPanel({ items }: { items: SenseTrustPilotEvidenceItem[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Evidence checklist</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {items.slice(0, 12).map((item) => (
          <div key={item.evidence_id} className="rounded-md bg-slate-50 p-3">
            <p className="text-sm font-black text-slate-900">{item.evidence_title}</p>
            <p className="mt-1 text-xs text-slate-600">Status: {item.evidence_status}</p>
            <p className="text-xs text-slate-600">Classificacao: {item.data_classification}</p>
            <p className="mt-2 text-xs font-bold text-rose-700">bloqueia dado clinico real</p>
          </div>
        ))}
      </div>
    </section>
  )
}
