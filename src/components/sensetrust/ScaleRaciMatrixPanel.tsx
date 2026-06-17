import type { SenseTrustScaleRaciMatrix } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleRaciMatrixPanel({ matrices }: { matrices: SenseTrustScaleRaciMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale RACI Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.slice(0, 8).map((matrix) => <div key={matrix.raci_matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-lg font-black text-slate-950">{matrix.roles.length}</p><p className="text-xs text-slate-600">papeis simulados; sem obrigacao juridica</p></div>)}</div></section>
}
