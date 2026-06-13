import type { SenseTrustPilotScenario } from '@/types/sensetrust/pilot-console'

interface PilotScenarioSelectorProps {
  scenarios: SenseTrustPilotScenario[]
  selectedScenarioId: string
  onSelect?: (scenarioId: string) => void
}

export function PilotScenarioSelector({ scenarios, selectedScenarioId, onSelect }: PilotScenarioSelectorProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {scenarios.map((scenario) => (
        <button
          key={scenario.scenario_id}
          type="button"
          onClick={() => onSelect?.(scenario.scenario_id)}
          className={`rounded-md border p-3 text-left text-sm shadow-sm ${scenario.scenario_id === selectedScenarioId ? 'border-emerald-500 bg-emerald-50' : 'bg-white'}`}
        >
          <p className="font-bold text-slate-950">{scenario.title}</p>
          <p className="mt-1 text-xs text-slate-500">{scenario.demo_mode}</p>
        </button>
      ))}
    </div>
  )
}
