import type { SenseTrustPilotResponsibilityMatrix } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotResponsibilityMatrixPanel({ matrices }: { matrices: SenseTrustPilotResponsibilityMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Responsibility Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.slice(0, 8).map((x) => <div key={x.responsibility_matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.responsibility_matrix_id}</p><p className="text-xs text-slate-600">{x.items.length} non-binding responsibilities</p></div>)}</div></section>
}
