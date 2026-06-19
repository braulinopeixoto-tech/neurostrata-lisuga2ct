import type { SenseTrustPilotProposalCandidate } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotProposalCandidatePanel({ candidates }: { candidates: SenseTrustPilotProposalCandidate[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Proposal Candidates</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{candidates.slice(0, 8).map((x) => <div key={x.pilot_proposal_candidate_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.partner_label}</p><p className="text-xs text-slate-600">{x.pilot_proposal_stage} / {x.recommended_pilot_proposal_decision}</p></div>)}</div></section>
}
