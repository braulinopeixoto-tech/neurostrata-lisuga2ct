import type { SenseTrustPilotRiskInterruptionRegister } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotRiskInterruptionRegisterPanel({ registers }: { registers: SenseTrustPilotRiskInterruptionRegister[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Risk Interruption Register</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{registers.slice(0, 8).map((x) => <div key={x.risk_interruption_register_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.highest_risk_level}</p><p className="text-xs text-slate-600">{x.items[0]?.interruption_rule}</p></div>)}</div></section>
}
