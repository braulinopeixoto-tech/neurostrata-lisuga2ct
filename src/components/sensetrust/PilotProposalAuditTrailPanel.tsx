import type { SenseTrustPilotProposalAuditTrail } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotProposalAuditTrailPanel({ trails }: { trails: SenseTrustPilotProposalAuditTrail[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Proposal Audit Trail</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{trails.slice(0, 8).map((x) => <div key={x.proposal_audit_trail_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.items[0]?.action}</p><p className="text-xs text-slate-600">append-only simulated / {x.items.length} events</p></div>)}</div></section>
}
