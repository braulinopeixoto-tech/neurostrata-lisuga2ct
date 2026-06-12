import { CreditCard, ShieldCheck } from 'lucide-react'
import type { SenseTrustPlan } from '@/types/sensetrust/saas-core'

interface PlanLimitCardProps {
  plan: SenseTrustPlan
}

export function PlanLimitCard({ plan }: PlanLimitCardProps) {
  return (
    <article className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-slate-950">{plan.display_name}</p>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{plan.tier}</p>
        </div>
        <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
          <CreditCard className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        <Field label="preco_simulado" value={plan.monthly_price_brl === null ? 'contrato anual' : `R$ ${plan.monthly_price_brl}/mes`} />
        <Field label="certificados" value={String(plan.included_certificates_monthly)} />
        <Field label="verificacoes" value={String(plan.included_public_verifications_monthly)} />
        <Field label="usuarios" value={String(plan.max_users)} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {plan.features.map((feature) => (
          <span key={feature} className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
            {feature}
          </span>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600">
        <ShieldCheck className="h-4 w-4 text-emerald-700" />
        {plan.status}
      </div>
    </article>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2">
      <span className="text-xs font-semibold uppercase text-slate-500">{label}</span>
      <span className="font-mono text-xs font-bold text-slate-900">{value}</span>
    </div>
  )
}
