import type { SenseTrustEvidenceMinimumMatrix } from '@/types/sensetrust/pilot-evidence-vault'

export function EvidenceMinimumMatrixPanel({ items }: { items: SenseTrustEvidenceMinimumMatrix[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Evidence minimum matrix</p><div className="mt-4 grid gap-3 md:grid-cols-2">{items.map((item) => <div key={item.matrix_id} className="rounded-md bg-slate-50 p-3"><p className="text-sm font-black text-slate-900">{item.required_evidence}</p><p className="mt-1 text-xs text-slate-600">Criterion/checkpoint: {item.acceptance_criterion_id} / {item.checkpoint_id}</p><p className="text-xs text-slate-600">Mandatory: {item.mandatory ? 'yes' : 'no'} / status: {item.status}</p><p className="mt-1 text-xs font-bold text-rose-700">Blocking if absent: {item.blocking_if_absent ? 'yes' : 'no'}</p></div>)}</div></section>
}
