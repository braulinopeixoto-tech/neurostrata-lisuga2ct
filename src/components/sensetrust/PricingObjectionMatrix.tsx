import type { SenseTrustPriceObjection } from '@/types/sensetrust/pricing-strategy'

interface PricingObjectionMatrixProps {
  objections: SenseTrustPriceObjection[]
}

export function PricingObjectionMatrix({ objections }: PricingObjectionMatrixProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Pricing objections</p>
      <div className="mt-4 space-y-3">
        {objections.map((objection) => (
          <div key={objection.objection} className="rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-bold text-slate-900">{objection.objection}</p>
              <span className="rounded-md bg-white px-2 py-1 text-xs font-bold text-slate-600">{objection.impact}</span>
            </div>
            <p className="mt-2 text-slate-700">{objection.short_answer}</p>
            <p className="mt-1 text-slate-600">{objection.commercial_answer}</p>
            <p className="mt-1 font-mono text-xs text-slate-500">{objection.mitigation} / {objection.recommended_plan}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
