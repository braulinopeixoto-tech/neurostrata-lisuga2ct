import type { SenseTrustRevenueRisk } from '@/types/sensetrust/revenue-operations'

interface RevenueRiskGovernancePanelProps {
  risks: SenseTrustRevenueRisk[]
}

export function RevenueRiskGovernancePanel({ risks }: RevenueRiskGovernancePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Revenue risk governance</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {risks.map((risk) => (
          <div key={risk.risk_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{risk.risk}</p>
              <span className="rounded-md bg-white px-2 py-1 font-bold text-rose-700">{risk.level}</span>
            </div>
            <p className="mt-2 text-slate-700">{risk.impact}</p>
            <p className="mt-1 text-slate-600">{risk.mitigation}</p>
            <p className="mt-1 font-mono text-slate-500">{risk.owner} / trigger: {risk.blocking_trigger}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
