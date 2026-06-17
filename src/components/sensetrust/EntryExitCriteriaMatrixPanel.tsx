import type { SenseTrustScaleEntryExitCriteriaMatrix } from '@/types/sensetrust/strategic-scale-operating-model'

export function EntryExitCriteriaMatrixPanel({ matrices }: { matrices: SenseTrustScaleEntryExitCriteriaMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Entry / Exit Criteria Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.slice(0, 8).map((matrix) => <div key={matrix.matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{matrix.entry_criteria.length} entrada / {matrix.exit_criteria.length} saida</p><p className="text-xs text-slate-600">governanca; nao clausula contratual</p></div>)}</div></section>
}
