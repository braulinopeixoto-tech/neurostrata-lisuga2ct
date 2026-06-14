import type { SenseTrustCancellationPolicy, SenseTrustUpgradeDowngradePolicy } from '@/types/sensetrust/revenue-operations'

interface UpgradeDowngradePolicyPanelProps {
  upgradeDowngradePolicy: SenseTrustUpgradeDowngradePolicy
  cancellationPolicy: SenseTrustCancellationPolicy
}

export function UpgradeDowngradePolicyPanel({ upgradeDowngradePolicy, cancellationPolicy }: UpgradeDowngradePolicyPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Upgrade, downgrade and cancellation</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3 text-xs">
          <p className="font-bold text-slate-900">{upgradeDowngradePolicy.upgrade_simulated}</p>
          <p className="mt-2">{upgradeDowngradePolicy.downgrade_simulated}</p>
          <p className="mt-2">{upgradeDowngradePolicy.pause_simulated}</p>
          <p className="mt-2">{upgradeDowngradePolicy.reactivation_simulated}</p>
        </div>
        <div className="rounded-md bg-slate-50 p-3 text-xs">
          <p className="font-bold text-slate-900">{cancellationPolicy.cancellation_simulated}</p>
          <p className="mt-2">{cancellationPolicy.refund_simulated}</p>
          <p className="mt-2">{cancellationPolicy.risk_exit}</p>
          <p className="mt-2 font-bold text-amber-700">manual review required</p>
        </div>
      </div>
    </section>
  )
}
