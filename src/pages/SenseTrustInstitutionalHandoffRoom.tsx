import { InstitutionalHandoffAuditTrailPanel } from '@/components/sensetrust/InstitutionalHandoffAuditTrailPanel'
import { InstitutionalHandoffBoundaryClaimsGuardrailPanel } from '@/components/sensetrust/InstitutionalHandoffBoundaryClaimsGuardrailPanel'
import { InstitutionalHandoffDecisionRecordPanel } from '@/components/sensetrust/InstitutionalHandoffDecisionRecordPanel'
import { InstitutionalHandoffEvidenceBundlePanel } from '@/components/sensetrust/InstitutionalHandoffEvidenceBundlePanel'
import { InstitutionalHandoffExecutiveReportPanel } from '@/components/sensetrust/InstitutionalHandoffExecutiveReportPanel'
import { InstitutionalHandoffMaterialPanel } from '@/components/sensetrust/InstitutionalHandoffMaterialPanel'
import { InstitutionalHandoffPackagePanel } from '@/components/sensetrust/InstitutionalHandoffPackagePanel'
import { InstitutionalHandoffRecipientProfilePanel } from '@/components/sensetrust/InstitutionalHandoffRecipientProfilePanel'
import { InstitutionalHandoffResponsibilityMatrixPanel } from '@/components/sensetrust/InstitutionalHandoffResponsibilityMatrixPanel'
import { InstitutionalHandoffReviewQueuePanel } from '@/components/sensetrust/InstitutionalHandoffReviewQueuePanel'
import { InstitutionalHandoffRiskRegisterPanel } from '@/components/sensetrust/InstitutionalHandoffRiskRegisterPanel'
import { InstitutionalHandoffScenarioPanel } from '@/components/sensetrust/InstitutionalHandoffScenarioPanel'
import { SenseTrustInstitutionalHandoffRoomDashboard } from '@/components/sensetrust/SenseTrustInstitutionalHandoffRoomDashboard'
import { SenseTrustInstitutionalHandoffRoomPanel } from '@/components/sensetrust/SenseTrustInstitutionalHandoffRoomPanel'
import { createInstitutionalHandoffState } from '@/services/sensetrust/institutional-handoff-room-service'

export default function SenseTrustInstitutionalHandoffRoom() {
  const state = createInstitutionalHandoffState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><SenseTrustInstitutionalHandoffRoomDashboard state={state} /><SenseTrustInstitutionalHandoffRoomPanel rooms={state.rooms} /><InstitutionalHandoffScenarioPanel scenarios={state.scenarios} /><InstitutionalHandoffPackagePanel packages={state.packages} /><InstitutionalHandoffRecipientProfilePanel profiles={state.recipientProfiles} /><InstitutionalHandoffMaterialPanel materials={state.materials} /><InstitutionalHandoffEvidenceBundlePanel bundles={state.evidenceBundles} /><InstitutionalHandoffResponsibilityMatrixPanel matrices={state.responsibilityMatrices} /><InstitutionalHandoffDecisionRecordPanel records={state.decisionRecords} /><InstitutionalHandoffReviewQueuePanel queues={state.reviewQueues} /><InstitutionalHandoffRiskRegisterPanel registers={state.riskRegisters} /><InstitutionalHandoffBoundaryClaimsGuardrailPanel guardrails={state.boundaryClaimsGuardrails} /><InstitutionalHandoffAuditTrailPanel trails={state.auditTrails} /><InstitutionalHandoffExecutiveReportPanel reports={state.executiveReports} /></div></main>
}
