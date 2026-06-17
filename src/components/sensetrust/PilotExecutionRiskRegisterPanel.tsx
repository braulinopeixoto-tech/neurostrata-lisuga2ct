import type { SenseTrustPilotExecutionRisk } from '@/types/sensetrust/institutional-pilot-control-room'

export function PilotExecutionRiskRegisterPanel({ risks }: { risks: SenseTrustPilotExecutionRisk[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Execution risk register</p>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {risks.slice(0, 12).map((risk) => (
          <div key={risk.risk_id} className="rounded-md bg-slate-50 p-3">
            <p className="font-mono text-xs font-bold uppercase text-rose-700">{risk.risk_level}</p>
            <p className="mt-2 text-sm font-black text-slate-900">{risk.risk_title}</p>
            <p className="mt-1 text-xs text-slate-600">{risk.impact}</p>
            <p className="mt-2 text-xs text-slate-600">Mitigation: {risk.mitigation}</p>
            <p className="mt-1 text-xs font-bold text-slate-700">Rule: {risk.interruption_rule_reference}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
