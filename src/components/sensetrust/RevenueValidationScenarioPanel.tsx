import type { SenseTrustRevenueScenario } from '@/types/sensetrust/pricing-strategy'

interface RevenueValidationScenarioPanelProps {
  scenarios: SenseTrustRevenueScenario[]
}

export function RevenueValidationScenarioPanel({ scenarios }: RevenueValidationScenarioPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Revenue validation scenarios</p>
      <div className="mt-4 grid gap-3 lg:grid-cols-4">
        {scenarios.map((scenario) => (
          <div key={scenario.scenario} className="rounded-md bg-slate-50 p-3 text-xs">
            <p className="font-mono font-black text-slate-900">{scenario.scenario}</p>
            <p className="mt-2">pilotos: {scenario.pilot_count}</p>
            <p>conversao: {Math.round(scenario.simulated_conversion_rate * 100)}%</p>
            <p>ticket: R$ {scenario.simulated_average_ticket_brl}</p>
            <p className="mt-2 font-bold text-slate-900">MRR simulado: R$ {scenario.simulated_monthly_revenue_brl}</p>
            <p className="font-bold text-slate-900">ARR simulado: R$ {scenario.simulated_annual_revenue_brl}</p>
            <p className="mt-2 text-amber-700">risco: {scenario.main_risk}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
