import type { SenseTrustAcceptanceState } from '@/types/sensetrust/pilot-evidence-vault'

export function PilotAcceptanceStatePanel({ states }: { states: SenseTrustAcceptanceState[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Pilot acceptance states</p><div className="mt-4 grid gap-3 md:grid-cols-4">{states.slice(0, 16).map((item) => <div key={item.state_id} className="rounded-md bg-slate-50 p-3"><p className="text-sm font-black text-slate-900">{item.state_type}</p><p className="mt-1 font-mono text-xs text-slate-500">{item.ledger_entry_id}</p><p className="mt-1 text-xs text-slate-600">{item.reason}</p></div>)}</div></section>
}
