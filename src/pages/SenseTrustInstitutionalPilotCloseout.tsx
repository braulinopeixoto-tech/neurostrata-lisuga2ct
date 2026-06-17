import { CloseoutAuditTrailPanel } from '@/components/sensetrust/CloseoutAuditTrailPanel'
import { CloseoutDecisionBoardPanel } from '@/components/sensetrust/CloseoutDecisionBoardPanel'
import { CloseoutMisuseBlockerPanel } from '@/components/sensetrust/CloseoutMisuseBlockerPanel'
import { CloseoutReportPanel } from '@/components/sensetrust/CloseoutReportPanel'
import { EvidenceToLearningMapPanel } from '@/components/sensetrust/EvidenceToLearningMapPanel'
import { InstitutionalCloseoutExecutiveReportPanel } from '@/components/sensetrust/InstitutionalCloseoutExecutiveReportPanel'
import { InstitutionalMaturityMatrixPanel } from '@/components/sensetrust/InstitutionalMaturityMatrixPanel'
import { InstitutionalPilotCloseoutDashboard } from '@/components/sensetrust/InstitutionalPilotCloseoutDashboard'
import { LearningLoopRegisterPanel } from '@/components/sensetrust/LearningLoopRegisterPanel'
import { LessonsLearnedMatrixPanel } from '@/components/sensetrust/LessonsLearnedMatrixPanel'
import { RegulatoryPendingItemsPanel } from '@/components/sensetrust/RegulatoryPendingItemsPanel'
import { V3ReadinessMatrixPanel } from '@/components/sensetrust/V3ReadinessMatrixPanel'
import { createInstitutionalPilotCloseoutState } from '@/services/sensetrust/institutional-pilot-closeout-service'

export default function SenseTrustInstitutionalPilotCloseout() {
  const state = createInstitutionalPilotCloseoutState()
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <InstitutionalPilotCloseoutDashboard state={state} />
        <CloseoutReportPanel reports={state.closeout_reports} />
        <LearningLoopRegisterPanel items={state.learning_loop_items} />
        <LessonsLearnedMatrixPanel matrices={state.lessons_learned_matrices} />
        <InstitutionalMaturityMatrixPanel matrices={state.institutional_maturity_matrices} />
        <CloseoutDecisionBoardPanel decisions={state.closeout_decisions} />
        <RegulatoryPendingItemsPanel items={state.regulatory_pending_items} />
        <EvidenceToLearningMapPanel maps={state.evidence_to_learning_maps} />
        <V3ReadinessMatrixPanel matrices={state.v3_readiness_matrices} />
        <CloseoutAuditTrailPanel items={state.closeout_audit_trail} />
        <CloseoutMisuseBlockerPanel blockers={state.closeout_misuse_blockers} />
        <InstitutionalCloseoutExecutiveReportPanel reports={state.executive_reports} />
      </div>
    </main>
  )
}
