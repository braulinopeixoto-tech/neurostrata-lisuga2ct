import { PilotOutcomeAuditTrailPanel } from '@/components/sensetrust/PilotOutcomeAuditTrailPanel'
import { PilotOutcomeBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/PilotOutcomeBoundaryClaimsGuardrailPanel'
import { PilotOutcomeCheckpointReviewPanel } from '@/components/sensetrust/PilotOutcomeCheckpointReviewPanel'
import { PilotOutcomeDecisionBoardPanel } from '@/components/sensetrust/PilotOutcomeDecisionBoardPanel'
import { PilotOutcomeDeviationReviewPanel } from '@/components/sensetrust/PilotOutcomeDeviationReviewPanel'
import { PilotOutcomeEvidenceSynthesisPanel } from '@/components/sensetrust/PilotOutcomeEvidenceSynthesisPanel'
import { PilotOutcomeHandoffReadinessBoardPanel } from '@/components/sensetrust/PilotOutcomeHandoffReadinessBoardPanel'
import { PilotOutcomeHumanReviewQueuePanel } from '@/components/sensetrust/PilotOutcomeHumanReviewQueuePanel'
import { PilotOutcomeInstitutionalMaturityMatrixPanel } from '@/components/sensetrust/PilotOutcomeInstitutionalMaturityMatrixPanel'
import { PilotOutcomeLearningLoopPanel } from '@/components/sensetrust/PilotOutcomeLearningLoopPanel'
import { PilotOutcomeReadinessScorecardPanel } from '@/components/sensetrust/PilotOutcomeReadinessScorecardPanel'
import { PilotOutcomeRiskReviewPanel } from '@/components/sensetrust/PilotOutcomeRiskReviewPanel'
import { PilotOutcomeScenarioPanel } from '@/components/sensetrust/PilotOutcomeScenarioPanel'
import { PilotOutcomeSummaryPanel } from '@/components/sensetrust/PilotOutcomeSummaryPanel'
import { StrategicPilotOutcomeCloseoutDecisionRoomDashboard } from '@/components/sensetrust/StrategicPilotOutcomeCloseoutDecisionRoomDashboard'
import { StrategicPilotOutcomeCloseoutDecisionRoomPanel } from '@/components/sensetrust/StrategicPilotOutcomeCloseoutDecisionRoomPanel'
import { StrategicPilotOutcomeExecutiveReportPanel } from '@/components/sensetrust/StrategicPilotOutcomeExecutiveReportPanel'
import { createStrategicPilotOutcomeCloseoutState } from '@/services/sensetrust/strategic-pilot-outcome-closeout-decision-room-service'

export default function SenseTrustStrategicPilotOutcomeCloseoutDecisionRoom() {
  const state = createStrategicPilotOutcomeCloseoutState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPilotOutcomeCloseoutDecisionRoomDashboard state={state} /><StrategicPilotOutcomeCloseoutDecisionRoomPanel rooms={state.rooms} /><PilotOutcomeScenarioPanel scenarios={state.scenarios} /><PilotOutcomeSummaryPanel summaries={state.outcomeSummaries} /><PilotOutcomeEvidenceSynthesisPanel syntheses={state.evidenceSynthesis} /><PilotOutcomeCheckpointReviewPanel reviews={state.checkpointReviews} /><PilotOutcomeRiskReviewPanel reviews={state.riskReviews} /><PilotOutcomeDeviationReviewPanel reviews={state.deviationReviews} /><PilotOutcomeLearningLoopPanel loops={state.learningLoops} /><PilotOutcomeDecisionBoardPanel boards={state.decisionBoards} /><PilotOutcomeReadinessScorecardPanel scorecards={state.readinessScorecards} /><PilotOutcomeInstitutionalMaturityMatrixPanel matrices={state.institutionalMaturityMatrices} /><PilotOutcomeHandoffReadinessBoardPanel boards={state.handoffReadinessBoards} /><PilotOutcomeHumanReviewQueuePanel queues={state.humanReviewQueues} /><PilotOutcomeBoundaryClaimsGuardrailPanel guardrails={state.boundaryClaimsGuardrails} /><PilotOutcomeAuditTrailPanel trails={state.auditTrails} /><StrategicPilotOutcomeExecutiveReportPanel reports={state.executiveReports} /></div></main>
}
