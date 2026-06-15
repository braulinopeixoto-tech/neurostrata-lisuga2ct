import type { SenseTrustRiskDisclosure } from '@/types/sensetrust/investor-room'

interface InvestorRiskDisclosurePanelProps {
  risks: SenseTrustRiskDisclosure[]
}

export function InvestorRiskDisclosurePanel({ risks }: InvestorRiskDisclosurePanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Risk disclosure</p>
      <div className="mt-4 space-y-3">
        {risks.map((risk) => (
          <div key={risk.risk_id} className="rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{risk.risk}</p>
              <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-rose-700">{risk.level}</span>
            </div>
            <p className="mt-2 text-slate-700">{risk.disclosure}</p>
            <p className="mt-1 text-slate-600">{risk.mitigation}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
