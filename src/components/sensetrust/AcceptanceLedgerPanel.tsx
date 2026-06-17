import type { SenseTrustAcceptanceLedgerEntry } from '@/types/sensetrust/pilot-evidence-vault'

export function AcceptanceLedgerPanel({ entries }: { entries: SenseTrustAcceptanceLedgerEntry[] }) {
  return <section className="rounded-md border bg-white p-5 shadow-sm"><p className="text-lg font-black text-slate-950">Acceptance ledger</p><div className="mt-4 grid gap-3 md:grid-cols-2">{entries.slice(0, 12).map((item) => <div key={item.ledger_entry_id} className="rounded-md bg-slate-50 p-3"><p className="font-mono text-xs font-bold text-slate-500">{item.timestamp_simulated} / {item.entry_hash}</p><p className="mt-2 text-sm font-black text-slate-900">{item.acceptance_state} / {item.decision_type}</p><p className="mt-1 text-xs text-slate-600">{item.decision_reason}</p><p className="mt-1 text-xs text-slate-600">Review: {item.required_review.join(', ')}</p><p className="mt-1 text-xs text-rose-700">Blocked: {item.blocked_actions.join(', ')}</p></div>)}</div></section>
}
