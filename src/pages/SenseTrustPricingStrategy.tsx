import { PricingStrategyDashboard } from '@/components/sensetrust/PricingStrategyDashboard'
import { createPricingStrategyState } from '@/services/sensetrust/pricing-strategy-service'

export default function SenseTrustPricingStrategy() {
  const state = createPricingStrategyState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <PricingStrategyDashboard state={state} />
      </div>
    </main>
  )
}
