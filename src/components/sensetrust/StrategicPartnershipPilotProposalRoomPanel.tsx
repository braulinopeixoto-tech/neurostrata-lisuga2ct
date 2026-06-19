import type { SenseTrustStrategicPartnershipPilotProposalRoom } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function StrategicPartnershipPilotProposalRoomPanel({ rooms }: { rooms: SenseTrustStrategicPartnershipPilotProposalRoom[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Proposal Rooms</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{rooms.map((x) => <div key={x.partnership_pilot_proposal_room_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.room_title}</p><p className="text-xs text-slate-600">{x.pilot_proposal_status} / {x.recommended_pilot_proposal_decision}</p><p className="mt-2 text-xs font-bold uppercase text-rose-700">no binding proposal</p></div>)}</div></section>
}
