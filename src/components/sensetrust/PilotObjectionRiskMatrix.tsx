import type { SenseTrustPilotObjection, SenseTrustPilotRiskPattern } from '@/types/sensetrust/pilot-feedback-intelligence'

interface PilotObjectionRiskMatrixProps {
  objections: SenseTrustPilotObjection[]
  risks: SenseTrustPilotRiskPattern[]
}

export function PilotObjectionRiskMatrix({ objections, risks }: PilotObjectionRiskMatrixProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Objection and risk matrix</p>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-slate-500">Objections</p>
          {objections.map((objection) => (
            <div key={objection.objection_type} className="rounded-md bg-slate-50 p-3 text-xs">
              <p className="font-mono font-black text-slate-900">{objection.objection_type} ({objection.count})</p>
              <p className="mt-1 text-slate-700">impact: {objection.impact}</p>
              <p className="mt-1 text-slate-600">{objection.mitigation}</p>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase text-slate-500">Risks</p>
          {risks.map((risk) => (
            <div key={risk.risk_level} className="rounded-md bg-slate-50 p-3 text-xs">
              <p className="font-mono font-black text-slate-900">{risk.risk_level} ({risk.count})</p>
              <p className="mt-1 text-slate-700">{risk.pattern}</p>
              <p className="mt-1 text-slate-600">{risk.mitigation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
