import type { SenseTrustNonBindingPilotScopeMatrix } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function NonBindingPilotScopeMatrixPanel({ matrices }: { matrices: SenseTrustNonBindingPilotScopeMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Non-Binding Pilot Scope Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.slice(0, 8).map((x) => <div key={x.non_binding_scope_matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.non_binding_scope_matrix_id}</p><p className="text-xs text-slate-600">{x.items.length} simulated scope items</p></div>)}</div></section>
}
