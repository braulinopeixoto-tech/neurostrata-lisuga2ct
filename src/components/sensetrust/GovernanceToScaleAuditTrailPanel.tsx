import type { SenseTrustGovernanceToScaleAuditTrailItem } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function GovernanceToScaleAuditTrailPanel({ items }: { items: SenseTrustGovernanceToScaleAuditTrailItem[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Governance-to-Scale Audit Trail</h2><div className="mt-3 space-y-2">{items.slice(0, 6).map((item) => <div key={item.audit_id} className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{item.action}</p><p className="text-xs text-slate-600">{item.previous_status} to {item.new_status}</p><p className="font-mono text-xs text-slate-500">{item.logical_hash}</p></div>)}</div></section>
}
