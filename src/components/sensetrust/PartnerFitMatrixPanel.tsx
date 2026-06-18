import type { SenseTrustPartnerFitMatrix } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerFitMatrixPanel({ matrices }: { matrices: SenseTrustPartnerFitMatrix[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Fit Matrix</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{matrices.map((matrix) => <div key={matrix.partner_fit_matrix_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{matrix.recommended_partner_type}</p><p className="text-xs text-slate-600">{matrix.items.length} criterios simulados</p></div>)}</div></section>
}
