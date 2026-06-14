import type { SenseTrustCommercialSegment } from '@/types/sensetrust/pricing-strategy'

interface CommercialSegmentRankingProps {
  segments: SenseTrustCommercialSegment[]
}

export function CommercialSegmentRanking({ segments }: CommercialSegmentRankingProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Commercial segment ranking</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-2">segmento</th>
              <th className="px-2 py-2">fit</th>
              <th className="px-2 py-2">valor</th>
              <th className="px-2 py-2">compra</th>
              <th className="px-2 py-2">ticket</th>
              <th className="px-2 py-2">risco</th>
              <th className="px-2 py-2">plano</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.segment} className="border-t">
                <td className="px-2 py-2 font-mono font-bold">{segment.segment}</td>
                <td className="px-2 py-2">{segment.commercial_fit_score}</td>
                <td className="px-2 py-2">{segment.perceived_value_score}</td>
                <td className="px-2 py-2">{segment.purchase_intent_score}</td>
                <td className="px-2 py-2">R$ {segment.potential_ticket_brl}</td>
                <td className="px-2 py-2">{segment.risk_level}</td>
                <td className="px-2 py-2">{segment.recommended_plan_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
