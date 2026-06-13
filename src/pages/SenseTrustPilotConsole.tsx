import { PilotConsoleDashboard } from '@/components/sensetrust/PilotConsoleDashboard'
import { createDefaultPilotScenarios, runPilotEndToEndFlow } from '@/services/sensetrust/pilot-console-service'

export default function SenseTrustPilotConsole() {
  const scenarios = createDefaultPilotScenarios()
  const result = runPilotEndToEndFlow()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <PilotConsoleDashboard
          scenarios={scenarios}
          result={result}
          selectedScenarioId="SCENARIO-SIM-END-TO-END-001"
        />
      </div>
    </main>
  )
}
