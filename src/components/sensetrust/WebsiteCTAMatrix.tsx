import type { SenseTrustWebsiteCTA } from '@/types/sensetrust/website-blueprint'

interface WebsiteCTAMatrixProps {
  ctas: SenseTrustWebsiteCTA[]
}

export function WebsiteCTAMatrix({ ctas }: WebsiteCTAMatrixProps) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">CTA matrix</p>
      <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">CTA</th>
              <th className="px-3 py-2">Audiencia</th>
              <th className="px-3 py-2">Destino</th>
              <th className="px-3 py-2">Coleta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ctas.map((cta) => (
              <tr key={cta.cta_id}>
                <td className="px-3 py-2 font-semibold text-slate-950">{cta.label}</td>
                <td className="px-3 py-2 text-slate-600">{cta.audience}</td>
                <td className="px-3 py-2 font-mono text-xs text-slate-600">{cta.target}</td>
                <td className="px-3 py-2 text-rose-700">{cta.lead_collection_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
