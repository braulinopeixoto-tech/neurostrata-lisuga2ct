import { ConversionAuditTrailPanel } from '@/components/sensetrust/ConversionAuditTrailPanel'
import { ConversionBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/ConversionBoundaryClaimsGuardrailPanel'
import { ConversionDecisionBoardPanel } from '@/components/sensetrust/ConversionDecisionBoardPanel'
import { ConversionQualificationMatrixPanel } from '@/components/sensetrust/ConversionQualificationMatrixPanel'
import { ConversionReadinessScorecardPanel } from '@/components/sensetrust/ConversionReadinessScorecardPanel'
import { ConversionRiskRegisterPanel } from '@/components/sensetrust/ConversionRiskRegisterPanel'
import { HumanReviewConversionQueuePanel } from '@/components/sensetrust/HumanReviewConversionQueuePanel'
import { LegalReviewRoutingBoardPanel } from '@/components/sensetrust/LegalReviewRoutingBoardPanel'
import { NonBindingIntentRegisterPanel } from '@/components/sensetrust/NonBindingIntentRegisterPanel'
import { PartnershipConversionCandidatePanel } from '@/components/sensetrust/PartnershipConversionCandidatePanel'
import { PartnershipDueDiligenceReadinessBoardPanel } from '@/components/sensetrust/PartnershipDueDiligenceReadinessBoardPanel'
import { RegulatoryReviewRoutingBoardPanel } from '@/components/sensetrust/RegulatoryReviewRoutingBoardPanel'
import { ScientificReviewRoutingBoardPanel } from '@/components/sensetrust/ScientificReviewRoutingBoardPanel'
import { StrategicPartnershipConversionDecisionRoomDashboard } from '@/components/sensetrust/StrategicPartnershipConversionDecisionRoomDashboard'
import { StrategicPartnershipConversionDecisionRoomPanel } from '@/components/sensetrust/StrategicPartnershipConversionDecisionRoomPanel'
import { StrategicPartnershipConversionExecutiveReportPanel } from '@/components/sensetrust/StrategicPartnershipConversionExecutiveReportPanel'
import { createStrategicPartnershipConversionDecisionRoomState } from '@/services/sensetrust/strategic-partnership-conversion-decision-room-service'

export default function SenseTrustStrategicPartnershipConversionDecisionRoom() {
  const state = createStrategicPartnershipConversionDecisionRoomState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPartnershipConversionDecisionRoomDashboard state={state} /><StrategicPartnershipConversionDecisionRoomPanel rooms={state.rooms} /><PartnershipConversionCandidatePanel candidates={state.candidates} /><ConversionQualificationMatrixPanel matrices={state.qualification_matrices} /><NonBindingIntentRegisterPanel registers={state.intent_registers} /><PartnershipDueDiligenceReadinessBoardPanel boards={state.due_diligence_boards} /><LegalReviewRoutingBoardPanel boards={state.legal_review_boards} /><ScientificReviewRoutingBoardPanel boards={state.scientific_review_boards} /><RegulatoryReviewRoutingBoardPanel boards={state.regulatory_review_boards} /><ConversionRiskRegisterPanel registers={state.risk_registers} /><ConversionDecisionBoardPanel boards={state.decision_boards} /><ConversionReadinessScorecardPanel scorecards={state.readiness_scorecards} /><HumanReviewConversionQueuePanel queues={state.human_review_queues} /><ConversionBoundaryClaimsGuardrailPanel guardrails={state.boundary_claims_guardrails} /><ConversionAuditTrailPanel trails={state.audit_trails} /><StrategicPartnershipConversionExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
