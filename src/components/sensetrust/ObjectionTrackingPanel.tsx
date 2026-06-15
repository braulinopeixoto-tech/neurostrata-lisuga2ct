import type { SenseTrustMeetingObjection } from '@/types/sensetrust/meeting-intelligence'

export function ObjectionTrackingPanel({ objections }: { objections: SenseTrustMeetingObjection[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Objection tracking</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {objections.slice(0, 12).map((item) => (
          <div key={item.objection_id} className="rounded-md border border-rose-100 bg-rose-50 p-3">
            <p className="font-bold text-rose-950">{item.objection_text}</p>
            <p className="mt-1 text-xs font-semibold text-rose-700">{item.objection_category} / {item.risk_level}</p>
            <p className="mt-2 text-sm text-slate-700">{item.safe_response}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Proibido: {item.prohibited_response}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
