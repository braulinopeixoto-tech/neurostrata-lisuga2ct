import type { SenseTrustStrategicDiligenceChecklist } from '@/types/sensetrust/strategic-partner-readiness-room'

export function StrategicDiligenceChecklistPanel({ checklists }: { checklists: SenseTrustStrategicDiligenceChecklist[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Diligence Checklist</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{checklists.map((item) => <div key={item.diligence_checklist_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{item.completion_score}% completo</p><p className="text-xs text-slate-600">{item.items.length} itens; sem due diligence real</p></div>)}</div></section>
}
