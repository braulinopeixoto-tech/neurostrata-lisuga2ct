import { PilotExecutionActivationGatePanel } from '@/components/sensetrust/PilotExecutionActivationGatePanel'
import { PilotExecutionAuditTrailPanel } from '@/components/sensetrust/PilotExecutionAuditTrailPanel'
import { PilotExecutionBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/PilotExecutionBoundaryClaimsGuardrailPanel'
import { PilotExecutionCadencePanel } from '@/components/sensetrust/PilotExecutionCadencePanel'
import { PilotExecutionCheckpointTimelinePanel } from '@/components/sensetrust/PilotExecutionCheckpointTimelinePanel'
import { PilotExecutionDecisionBoardPanel } from '@/components/sensetrust/PilotExecutionDecisionBoardPanel'
import { PilotExecutionDeviationRegisterPanel } from '@/components/sensetrust/PilotExecutionDeviationRegisterPanel'
import { PilotExecutionEvidenceLedgerPanel } from '@/components/sensetrust/PilotExecutionEvidenceLedgerPanel'
import { PilotExecutionHumanReviewQueuePanel } from '@/components/sensetrust/PilotExecutionHumanReviewQueuePanel'
import { PilotExecutionInterruptionRulesPanel } from '@/components/sensetrust/PilotExecutionInterruptionRulesPanel'
import { PilotExecutionMilestoneBoardPanel } from '@/components/sensetrust/PilotExecutionMilestoneBoardPanel'
import { PilotExecutionResponsibilityMatrixPanel } from '@/components/sensetrust/PilotExecutionResponsibilityMatrixPanel'
import { PilotExecutionRiskRegisterPanel } from '@/components/sensetrust/PilotExecutionRiskRegisterPanel'
import { PilotExecutionScenarioPanel } from '@/components/sensetrust/PilotExecutionScenarioPanel'
import { PilotExecutionStakeholderReviewBoardPanel } from '@/components/sensetrust/PilotExecutionStakeholderReviewBoardPanel'
import { StrategicPilotExecutionExecutiveReportPanel } from '@/components/sensetrust/StrategicPilotExecutionExecutiveReportPanel'
import { StrategicPilotExecutionGovernanceRoomDashboard } from '@/components/sensetrust/StrategicPilotExecutionGovernanceRoomDashboard'
import { StrategicPilotExecutionGovernanceRoomPanel } from '@/components/sensetrust/StrategicPilotExecutionGovernanceRoomPanel'
import { createStrategicPilotExecutionGovernanceState } from '@/services/sensetrust/strategic-pilot-execution-governance-room-service'

export default function SenseTrustStrategicPilotExecutionGovernanceRoom() {
  const state = createStrategicPilotExecutionGovernanceState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPilotExecutionGovernanceRoomDashboard state={state} /><StrategicPilotExecutionGovernanceRoomPanel rooms={state.rooms} /><PilotExecutionScenarioPanel scenarios={state.scenarios} /><PilotExecutionActivationGatePanel gates={state.activationGates} /><PilotExecutionCheckpointTimelinePanel checkpoints={state.checkpoints} /><PilotExecutionMilestoneBoardPanel milestones={state.milestones} /><PilotExecutionCadencePanel cadences={state.cadences} /><PilotExecutionResponsibilityMatrixPanel matrices={state.responsibilityMatrices} /><PilotExecutionEvidenceLedgerPanel ledgers={state.evidenceLedgers} /><PilotExecutionDeviationRegisterPanel registers={state.deviationRegisters} /><PilotExecutionRiskRegisterPanel registers={state.riskRegisters} /><PilotExecutionInterruptionRulesPanel rules={state.interruptionRules} /><PilotExecutionDecisionBoardPanel boards={state.decisionBoards} /><PilotExecutionHumanReviewQueuePanel queues={state.humanReviewQueues} /><PilotExecutionStakeholderReviewBoardPanel boards={state.stakeholderReviewBoards} /><PilotExecutionBoundaryClaimsGuardrailPanel guardrails={state.boundaryClaimsGuardrails} /><PilotExecutionAuditTrailPanel trails={state.auditTrails} /><StrategicPilotExecutionExecutiveReportPanel reports={state.executiveReports} /></div></main>
}
