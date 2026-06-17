import type { SenseTrustStrategicPartnerFitMatrix } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function StrategicPartnerFitMatrixPanel({ matrices }: { matrices: SenseTrustStrategicPartnerFitMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Partner Fit Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.slice(0, 8).map((matrix) => <div key={matrix.matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-lg font-black text-slate-950">{matrix.fit_score}%</p><p className="text-xs text-slate-600">{matrix.segment}; sem parceria formalizada</p></div>)}</div></section>
}
