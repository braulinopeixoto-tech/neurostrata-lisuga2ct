import type { SenseTrustStrategicPartnerReadinessRoom } from '@/types/sensetrust/strategic-partner-readiness-room'

export function StrategicPartnerReadinessRoomPanel({ rooms }: { rooms: SenseTrustStrategicPartnerReadinessRoom[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Strategic Partner Readiness Rooms</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{rooms.map((room) => <article key={room.partner_readiness_room_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{room.room_title}</p><p className="text-sm text-slate-600">{room.readiness_status} / {room.recommended_partner_decision}</p><p className="mt-2 text-xs font-bold uppercase text-rose-700">{room.blocked_actions.join(', ')}</p></article>)}</div></section>
}
