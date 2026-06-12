import type { SenseTrustPlan } from '@/types/sensetrust/saas-core'
import type { SenseTrustUsageLedger } from '@/types/sensetrust/saas-core'

interface UsageLedgerPanelProps {
  ledger: SenseTrustUsageLedger
  plan: SenseTrustPlan
}

export function UsageLedgerPanel({ ledger, plan }: UsageLedgerPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div>
        <p className="text-sm font-black text-slate-950">Usage ledger</p>
        <p className="text-xs text-slate-500">{ledger.organization_id} / {ledger.billing_month}</p>
      </div>
      <div className="mt-4 space-y-2">
        {ledger.events.map((event) => {
          const exceeded =
            event.usage_type === 'certificate_issued'
              ? event.quantity > plan.included_certificates_monthly
              : event.usage_type === 'public_verification'
                ? event.quantity > plan.included_public_verifications_monthly
                : false
          return (
            <div key={event.usage_event_id} className="grid gap-2 rounded-md border bg-slate-50 p-3 text-xs sm:grid-cols-5">
              <span className="font-bold text-slate-900">{event.usage_event_id}</span>
              <span>{event.usage_type}</span>
              <span>{event.quantity}</span>
              <span>{event.billing_month}</span>
              <span className={exceeded ? 'font-bold text-rose-700' : 'font-bold text-emerald-700'}>
                {exceeded ? 'exceeded' : 'within_limit'}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
