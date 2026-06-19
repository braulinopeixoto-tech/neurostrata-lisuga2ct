import { PartnerBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/PartnerBoundaryClaimsGuardrailPanel'
import { PartnerEngagementAuditTrailPanel } from '@/components/sensetrust/PartnerEngagementAuditTrailPanel'
import { PartnerEngagementReadinessScorePanel } from '@/components/sensetrust/PartnerEngagementReadinessScorePanel'
import { PartnerEngagementRiskRegisterPanel } from '@/components/sensetrust/PartnerEngagementRiskRegisterPanel'
import { PartnerEngagementTrackPanel } from '@/components/sensetrust/PartnerEngagementTrackPanel'
import { PartnerFollowUpDecisionBoardPanel } from '@/components/sensetrust/PartnerFollowUpDecisionBoardPanel'
import { PartnerHumanReviewEscalationQueuePanel } from '@/components/sensetrust/PartnerHumanReviewEscalationQueuePanel'
import { PartnerInteractionLedgerPanel } from '@/components/sensetrust/PartnerInteractionLedgerPanel'
import { PartnerMeetingSimulationBoardPanel } from '@/components/sensetrust/PartnerMeetingSimulationBoardPanel'
import { PartnerObjectionResolutionMapPanel } from '@/components/sensetrust/PartnerObjectionResolutionMapPanel'
import { PartnerResponseMatrixPanel } from '@/components/sensetrust/PartnerResponseMatrixPanel'
import { StrategicPartnerEngagementControlRoomDashboard } from '@/components/sensetrust/StrategicPartnerEngagementControlRoomDashboard'
import { StrategicPartnerEngagementControlRoomPanel } from '@/components/sensetrust/StrategicPartnerEngagementControlRoomPanel'
import { StrategicPartnerEngagementExecutiveReportPanel } from '@/components/sensetrust/StrategicPartnerEngagementExecutiveReportPanel'
import { createStrategicPartnerEngagementControlRoomState } from '@/services/sensetrust/strategic-partner-engagement-control-room-service'

export default function SenseTrustStrategicPartnerEngagementControlRoom() {
  const state = createStrategicPartnerEngagementControlRoomState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPartnerEngagementControlRoomDashboard state={state} /><StrategicPartnerEngagementControlRoomPanel rooms={state.rooms} /><PartnerEngagementTrackPanel tracks={state.tracks} /><PartnerInteractionLedgerPanel ledgers={state.interaction_ledgers} /><PartnerMeetingSimulationBoardPanel boards={state.meeting_simulation_boards} /><PartnerResponseMatrixPanel matrices={state.response_matrices} /><PartnerObjectionResolutionMapPanel maps={state.objection_resolution_maps} /><PartnerEngagementRiskRegisterPanel registers={state.engagement_risk_registers} /><PartnerFollowUpDecisionBoardPanel boards={state.follow_up_decision_boards} /><PartnerEngagementReadinessScorePanel scores={state.engagement_readiness_scores} /><PartnerHumanReviewEscalationQueuePanel queues={state.human_review_escalation_queues} /><PartnerBoundaryClaimsGuardrailPanel guardrails={state.boundary_claims_guardrails} /><PartnerEngagementAuditTrailPanel trails={state.engagement_audit_trails} /><StrategicPartnerEngagementExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
