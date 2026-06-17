import type { SenseTrustScaleRiskRegister } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleRiskRegisterPanel({ registers }: { registers: SenseTrustScaleRiskRegister[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Risk Register</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{registers.slice(0, 8).map((register) => <div key={register.risk_register_id} className="rounded-md bg-rose-50 p-3"><p className="font-black text-rose-900">{register.highest_risk_level}</p><p className="text-xs text-rose-700">{register.risk_items.length} riscos; nao parecer juridico</p></div>)}</div></section>
}
