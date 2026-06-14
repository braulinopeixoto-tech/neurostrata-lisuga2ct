import type { SenseTrustPilotSegmentSignal } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotSegmentPriorityMatrixProps {
  segments: SenseTrustPilotSegmentSignal[]
}

export function PilotSegmentPriorityMatrix({ segments }: PilotSegmentPriorityMatrixProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Segment priority matrix</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-2">segment</th>
              <th className="px-2 py-2">fit</th>
              <th className="px-2 py-2">value</th>
              <th className="px-2 py-2">intent</th>
              <th className="px-2 py-2">risk</th>
              <th className="px-2 py-2">recommendation</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.segment} className="border-t">
                <td className="px-2 py-2 font-mono font-bold">{segment.segment}</td>
                <td className="px-2 py-2">{segment.fit_score}</td>
                <td className="px-2 py-2">{segment.perceived_value_score}</td>
                <td className="px-2 py-2">{segment.purchase_intent}</td>
                <td className="px-2 py-2">{segment.risk_level}</td>
                <td className="px-2 py-2">{segment.recommendation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
