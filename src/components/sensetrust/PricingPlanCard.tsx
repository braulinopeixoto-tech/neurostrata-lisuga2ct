import type { SenseTrustPricingPlan } from '@/types/sensetrust/pricing-strategy'

interface PricingPlanCardProps {
  plan: SenseTrustPricingPlan
}

export function PricingPlanCard({ plan }: PricingPlanCardProps) {
  return (
    <article className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">{plan.plan_name}</p>
          <p className="mt-1 font-mono text-xs font-semibold text-slate-500">{plan.tier} / {plan.model}</p>
        </div>
        <span className="rounded-md bg-amber-50 px-2 py-1 text-xs font-bold text-amber-700">simulado</span>
      </div>
      <div className="mt-4 grid gap-2 text-xs sm:grid-cols-3">
        <Field label="mensal" value={`R$ ${plan.monthly_price_brl_simulated}`} />
        <Field label="anual" value={`R$ ${plan.annual_price_brl_simulated}`} />
        <Field label="por cert." value={`R$ ${plan.per_certificate_price_brl_simulated}`} />
      </div>
      <div className="mt-3 rounded-md bg-slate-50 p-3 text-xs">
        <p className="font-bold text-slate-900">{plan.intended_segment}</p>
        <p className="mt-1 text-slate-700">{plan.value_proposition}</p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <List title="features" items={plan.features.map((feature) => feature.label)} />
        <List title="restrictions" items={plan.restrictions} />
      </div>
    </article>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 px-3 py-2">
      <p className="font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono font-bold text-slate-900">{value}</p>
    </div>
  )
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md bg-slate-50 p-3 text-xs">
      <p className="font-bold uppercase text-slate-500">{title}</p>
      {items.map((item) => <p key={item} className="mt-1 text-slate-700">{item}</p>)}
    </div>
  )
}
