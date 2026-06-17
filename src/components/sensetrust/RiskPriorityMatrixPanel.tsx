import type { SenseTrustPipelineRiskSignal } from '@/types/sensetrust/pipeline-governance'

export function RiskPriorityMatrixPanel({ risks }: { risks: SenseTrustPipelineRiskSignal[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Risk priority matrix</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {risks.slice(0, 12).map((risk) => (
          <div key={risk.signal_id} className="rounded-md border border-rose-100 bg-rose-50 p-3">
            <p className="font-bold text-rose-950">{risk.audience_type} / {risk.risk_level}</p>
            <p className="mt-2 text-sm text-slate-700">{risk.impact}</p>
            <p className="mt-2 text-xs text-slate-600">{risk.mitigation}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Bloqueia go/no-go: {risk.blocks_go_no_go ? 'sim' : 'nao'}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
