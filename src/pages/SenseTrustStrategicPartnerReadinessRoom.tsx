import { PartnerDecisionPathwayPanel } from '@/components/sensetrust/PartnerDecisionPathwayPanel'
import { PartnerEvidenceBriefPanel } from '@/components/sensetrust/PartnerEvidenceBriefPanel'
import { PartnerFitMatrixPanel } from '@/components/sensetrust/PartnerFitMatrixPanel'
import { PartnerFollowUpGovernancePanel } from '@/components/sensetrust/PartnerFollowUpGovernancePanel'
import { PartnerHumanReviewQueuePanel } from '@/components/sensetrust/PartnerHumanReviewQueuePanel'
import { PartnerMeetingPreparationKitPanel } from '@/components/sensetrust/PartnerMeetingPreparationKitPanel'
import { PartnerMisuseBlockerPanel } from '@/components/sensetrust/PartnerMisuseBlockerPanel'
import { PartnerObjectionMapPanel } from '@/components/sensetrust/PartnerObjectionMapPanel'
import { PartnerReadinessProfilePanel } from '@/components/sensetrust/PartnerReadinessProfilePanel'
import { PartnerReadinessScorecardPanel } from '@/components/sensetrust/PartnerReadinessScorecardPanel'
import { PartnerRiskReviewBoardPanel } from '@/components/sensetrust/PartnerRiskReviewBoardPanel'
import { StrategicDiligenceChecklistPanel } from '@/components/sensetrust/StrategicDiligenceChecklistPanel'
import { StrategicPartnerReadinessExecutiveReportPanel } from '@/components/sensetrust/StrategicPartnerReadinessExecutiveReportPanel'
import { StrategicPartnerReadinessRoomDashboard } from '@/components/sensetrust/StrategicPartnerReadinessRoomDashboard'
import { StrategicPartnerReadinessRoomPanel } from '@/components/sensetrust/StrategicPartnerReadinessRoomPanel'
import { createStrategicPartnerReadinessRoomState } from '@/services/sensetrust/strategic-partner-readiness-room-service'

export default function SenseTrustStrategicPartnerReadinessRoom() {
  const state = createStrategicPartnerReadinessRoomState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPartnerReadinessRoomDashboard state={state} /><StrategicPartnerReadinessRoomPanel rooms={state.rooms} /><PartnerReadinessProfilePanel profiles={state.profiles} /><PartnerFitMatrixPanel matrices={state.fit_matrices} /><StrategicDiligenceChecklistPanel checklists={state.diligence_checklists} /><PartnerEvidenceBriefPanel briefs={state.evidence_briefs} /><PartnerObjectionMapPanel maps={state.objection_maps} /><PartnerRiskReviewBoardPanel boards={state.risk_review_boards} /><PartnerReadinessScorecardPanel scorecards={state.scorecards} /><PartnerDecisionPathwayPanel pathways={state.decision_pathways} /><PartnerHumanReviewQueuePanel queues={state.human_review_queues} /><PartnerMeetingPreparationKitPanel kits={state.meeting_preparation_kits} /><PartnerFollowUpGovernancePanel governance={state.follow_up_governance} /><PartnerMisuseBlockerPanel blockers={state.misuse_blockers} /><StrategicPartnerReadinessExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
