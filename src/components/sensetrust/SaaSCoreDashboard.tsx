import type { SenseTrustOrganization, SenseTrustPlan, SenseTrustUsageLedger, SenseTrustUser } from '@/types/sensetrust/saas-core'
import { PlanLimitCard } from './PlanLimitCard'
import { UsageLedgerPanel } from './UsageLedgerPanel'

interface SaaSCoreDashboardProps {
  organization: SenseTrustOrganization
  plan: SenseTrustPlan
  users: SenseTrustUser[]
  ledger: SenseTrustUsageLedger
  pilotReady: boolean
  limitExceeded?: boolean
}

export function SaaSCoreDashboard({ organization, plan, users, ledger, pilotReady, limitExceeded }: SaaSCoreDashboardProps) {
  const roleCounts = users.flatMap((user) => user.roles).reduce<Record<string, number>>((acc, role) => {
    acc[role] = (acc[role] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-4">
      <section className="rounded-md border bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-lg font-black text-slate-950">{organization.name}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">{organization.status}</p>
          </div>
          <span className={`rounded-md px-2 py-1 text-xs font-bold ${pilotReady ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
            {pilotReady ? 'pilot_ready' : 'pilot_pending'}
          </span>
        </div>
        {limitExceeded && (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 p-3 text-sm font-semibold text-rose-800">
            Limite simulado do plano excedido.
          </div>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <PlanLimitCard plan={plan} />
        <section className="rounded-md border bg-white p-4 shadow-sm">
          <p className="text-sm font-black text-slate-950">Usuarios por papel</p>
          <div className="mt-3 grid gap-2 text-sm">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="flex justify-between rounded-md bg-slate-50 px-3 py-2">
                <span>{role}</span>
                <span className="font-mono font-bold">{count}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <UsageLedgerPanel ledger={ledger} plan={plan} />
    </div>
  )
}
