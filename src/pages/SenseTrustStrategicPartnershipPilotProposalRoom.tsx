import { NonBindingPilotScopeMatrixPanel } from '@/components/sensetrust/NonBindingPilotScopeMatrixPanel'
import { PilotBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/PilotBoundaryClaimsGuardrailPanel'
import { PilotEntryCriteriaBoardPanel } from '@/components/sensetrust/PilotEntryCriteriaBoardPanel'
import { PilotEvidenceRequirementMapPanel } from '@/components/sensetrust/PilotEvidenceRequirementMapPanel'
import { PilotExitCriteriaBoardPanel } from '@/components/sensetrust/PilotExitCriteriaBoardPanel'
import { PilotHumanReviewBoardPanel } from '@/components/sensetrust/PilotHumanReviewBoardPanel'
import { PilotLegalReviewQueuePanel } from '@/components/sensetrust/PilotLegalReviewQueuePanel'
import { PilotProposalAuditTrailPanel } from '@/components/sensetrust/PilotProposalAuditTrailPanel'
import { PilotProposalCandidatePanel } from '@/components/sensetrust/PilotProposalCandidatePanel'
import { PilotRegulatoryReviewQueuePanel } from '@/components/sensetrust/PilotRegulatoryReviewQueuePanel'
import { PilotResponsibilityMatrixPanel } from '@/components/sensetrust/PilotResponsibilityMatrixPanel'
import { PilotRiskInterruptionRegisterPanel } from '@/components/sensetrust/PilotRiskInterruptionRegisterPanel'
import { PilotScientificReviewQueuePanel } from '@/components/sensetrust/PilotScientificReviewQueuePanel'
import { PilotValueHypothesisCanvasPanel } from '@/components/sensetrust/PilotValueHypothesisCanvasPanel'
import { StrategicPartnershipPilotProposalExecutiveReportPanel } from '@/components/sensetrust/StrategicPartnershipPilotProposalExecutiveReportPanel'
import { StrategicPartnershipPilotProposalRoomDashboard } from '@/components/sensetrust/StrategicPartnershipPilotProposalRoomDashboard'
import { StrategicPartnershipPilotProposalRoomPanel } from '@/components/sensetrust/StrategicPartnershipPilotProposalRoomPanel'
import { createStrategicPartnershipPilotProposalRoomState } from '@/services/sensetrust/strategic-partnership-pilot-proposal-room-service'

export default function SenseTrustStrategicPartnershipPilotProposalRoom() {
  const state = createStrategicPartnershipPilotProposalRoomState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicPartnershipPilotProposalRoomDashboard state={state} /><StrategicPartnershipPilotProposalRoomPanel rooms={state.rooms} /><PilotProposalCandidatePanel candidates={state.candidates} /><NonBindingPilotScopeMatrixPanel matrices={state.scope_matrices} /><PilotValueHypothesisCanvasPanel canvases={state.value_canvases} /><PilotEntryCriteriaBoardPanel boards={state.entry_boards} /><PilotExitCriteriaBoardPanel boards={state.exit_boards} /><PilotResponsibilityMatrixPanel matrices={state.responsibility_matrices} /><PilotEvidenceRequirementMapPanel maps={state.evidence_maps} /><PilotRiskInterruptionRegisterPanel registers={state.risk_registers} /><PilotLegalReviewQueuePanel queues={state.legal_review_queues} /><PilotScientificReviewQueuePanel queues={state.scientific_review_queues} /><PilotRegulatoryReviewQueuePanel queues={state.regulatory_review_queues} /><PilotHumanReviewBoardPanel boards={state.human_review_boards} /><PilotBoundaryClaimsGuardrailPanel guardrails={state.boundary_claims_guardrails} /><PilotProposalAuditTrailPanel trails={state.audit_trails} /><StrategicPartnershipPilotProposalExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
