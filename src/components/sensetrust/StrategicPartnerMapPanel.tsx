import type { SenseTrustStrategicPartner } from '@/types/sensetrust/investor-room'

interface StrategicPartnerMapPanelProps {
  partners: SenseTrustStrategicPartner[]
}

export function StrategicPartnerMapPanel({ partners }: StrategicPartnerMapPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Strategic partner map</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        {partners.map((partner) => (
          <article key={partner.partner_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="text-sm font-bold text-slate-900">{partner.profile}</p>
            <p className="mt-1 font-mono text-slate-500">{partner.segment} / {partner.status}</p>
            <p className="mt-2 text-slate-700">{partner.value_exchange}</p>
            <p className="mt-2 text-slate-600">review: {partner.partnership_track.required_review.join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
