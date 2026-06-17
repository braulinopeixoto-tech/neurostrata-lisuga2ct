import { GoPauseRefineScaleSimulatorPanel } from '@/components/sensetrust/GoPauseRefineScaleSimulatorPanel'
import { HumanReviewSimulationPanel } from '@/components/sensetrust/HumanReviewSimulationPanel'
import { InstitutionalImpactSimulationPanel } from '@/components/sensetrust/InstitutionalImpactSimulationPanel'
import { OperationalCapacitySimulationPanel } from '@/components/sensetrust/OperationalCapacitySimulationPanel'
import { ReadinessScoreSimulationPanel } from '@/components/sensetrust/ReadinessScoreSimulationPanel'
import { ResourceLoadSimulationPanel } from '@/components/sensetrust/ResourceLoadSimulationPanel'
import { ScaleRiskSimulationPanel } from '@/components/sensetrust/ScaleRiskSimulationPanel'
import { ScaleSimulationScenarioPanel } from '@/components/sensetrust/ScaleSimulationScenarioPanel'
import { ScenarioDecisionMatrixPanel } from '@/components/sensetrust/ScenarioDecisionMatrixPanel'
import { ScenarioOutcomeSummaryPanel } from '@/components/sensetrust/ScenarioOutcomeSummaryPanel'
import { SimulationDecisionTracePanel } from '@/components/sensetrust/SimulationDecisionTracePanel'
import { SimulationMisuseBlockerPanel } from '@/components/sensetrust/SimulationMisuseBlockerPanel'
import { StrategicScaleSimulationConsoleDashboard } from '@/components/sensetrust/StrategicScaleSimulationConsoleDashboard'
import { StrategicScaleSimulationConsolePanel } from '@/components/sensetrust/StrategicScaleSimulationConsolePanel'
import { StrategicScaleSimulationExecutiveReportPanel } from '@/components/sensetrust/StrategicScaleSimulationExecutiveReportPanel'
import { createStrategicScaleSimulationConsoleState } from '@/services/sensetrust/strategic-scale-simulation-console-service'

export default function SenseTrustStrategicScaleSimulationConsole() {
  const state = createStrategicScaleSimulationConsoleState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicScaleSimulationConsoleDashboard state={state} /><StrategicScaleSimulationConsolePanel consoles={state.simulation_consoles} /><ScaleSimulationScenarioPanel scenarios={state.scenarios} /><ScenarioDecisionMatrixPanel matrices={state.scenario_decision_matrices} /><InstitutionalImpactSimulationPanel simulations={state.institutional_impact_simulations} /><OperationalCapacitySimulationPanel simulations={state.operational_capacity_simulations} /><ResourceLoadSimulationPanel simulations={state.resource_load_simulations} /><ScaleRiskSimulationPanel simulations={state.scale_risk_simulations} /><ReadinessScoreSimulationPanel simulations={state.readiness_score_simulations} /><GoPauseRefineScaleSimulatorPanel simulators={state.simulators} /><HumanReviewSimulationPanel simulations={state.human_review_simulations} /><ScenarioOutcomeSummaryPanel summaries={state.outcome_summaries} /><SimulationDecisionTracePanel traces={state.decision_traces} /><SimulationMisuseBlockerPanel blockers={state.misuse_blockers} /><StrategicScaleSimulationExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
