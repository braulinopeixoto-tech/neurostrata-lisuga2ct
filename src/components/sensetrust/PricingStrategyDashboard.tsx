import type { SenseTrustPricingStrategyState } from '@/types/sensetrust/pricing-strategy'
import { CommercialSegmentRanking } from './CommercialSegmentRanking'
import { PaidPilotOfferPanel } from './PaidPilotOfferPanel'
import { PricingObjectionMatrix } from './PricingObjectionMatrix'
import { PricingPlanCard } from './PricingPlanCard'
import { RevenueReadinessScoreCard } from './RevenueReadinessScoreCard'
import { RevenueValidationScenarioPanel } from './RevenueValidationScenarioPanel'

interface PricingStrategyDashboardProps {
  state: SenseTrustPricingStrategyState
}

export function PricingStrategyDashboard({ state }: PricingStrategyDashboardProps) {
  const recommendedPlan = state.plans.find((plan) => plan.plan_id === state.recommendation.recommended_plan_id) ?? state.plans[0]
  const baseScenario = state.revenue_scenarios.find((scenario) => scenario.scenario === 'base') ?? state.revenue_scenarios[0]

  return (
    <div className="space-y-5">
      <section className="rounded-md border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">SenseTrust Pricing Strategy</p>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">simulated_only / no_real_billing / metadata_only</p>
          </div>
          <span className="rounded-md bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700">no payment integration</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-5">
          <Metric label="plano" value={recommendedPlan.plan_name} />
          <Metric label="segmento" value={state.recommendation.priority_segment} />
          <Metric label="MRR sim." value={`R$ ${baseScenario.simulated_monthly_revenue_brl}`} />
          <Metric label="ARR sim." value={`R$ ${baseScenario.simulated_annual_revenue_brl}`} />
          <Metric label="readiness" value={`${state.readiness_score.score}/100`} />
        </div>
      </section>

      <RevenueReadinessScoreCard score={state.readiness_score} />

      <section className="grid gap-4 xl:grid-cols-2">
        {state.plans.map((plan) => <PricingPlanCard key={plan.plan_id} plan={plan} />)}
      </section>

      <PaidPilotOfferPanel offers={state.paid_pilot_offers} />
      <RevenueValidationScenarioPanel scenarios={state.revenue_scenarios} />
      <PricingObjectionMatrix objections={state.objections} />
      <CommercialSegmentRanking segments={state.commercial_segments} />
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 font-mono text-sm font-black text-slate-950">{value}</p>
    </div>
  )
}
