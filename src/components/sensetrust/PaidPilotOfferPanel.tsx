import type { SenseTrustPaidPilotOffer } from '@/types/sensetrust/pricing-strategy'

interface PaidPilotOfferPanelProps {
  offers: SenseTrustPaidPilotOffer[]
}

export function PaidPilotOfferPanel({ offers }: PaidPilotOfferPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Paid pilot offers</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        {offers.map((offer) => (
          <div key={offer.offer_id} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-mono font-black text-slate-900">{offer.plan_id}</p>
            <p className="mt-2 text-slate-700">{offer.scope}</p>
            <p className="mt-2 font-bold text-slate-900">{offer.simulated_price_range_brl}</p>
            <p className="mt-1 text-slate-600">duracao: {offer.duration_days}</p>
            <p className="mt-1 text-slate-600">limite: {offer.usage_limit}</p>
            <p className="mt-2 font-bold uppercase text-rose-700">fora do escopo</p>
            {offer.out_of_scope.map((item) => <p key={item} className="font-mono text-slate-600">{item}</p>)}
          </div>
        ))}
      </div>
    </section>
  )
}
