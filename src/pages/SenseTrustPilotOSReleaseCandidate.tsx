import { PilotOSReleaseCandidateAcceptanceCriteriaPanel } from '@/components/sensetrust/PilotOSReleaseCandidateAcceptanceCriteriaPanel'
import { PilotOSReleaseCandidateAuditTrailPanel } from '@/components/sensetrust/PilotOSReleaseCandidateAuditTrailPanel'
import { PilotOSReleaseCandidateDemoFlowPanel } from '@/components/sensetrust/PilotOSReleaseCandidateDemoFlowPanel'
import { PilotOSReleaseCandidateExecutiveChecklistPanel } from '@/components/sensetrust/PilotOSReleaseCandidateExecutiveChecklistPanel'
import { PilotOSReleaseCandidateExecutiveReportPanel } from '@/components/sensetrust/PilotOSReleaseCandidateExecutiveReportPanel'
import { PilotOSReleaseCandidateGuardrailMatrixPanel } from '@/components/sensetrust/PilotOSReleaseCandidateGuardrailMatrixPanel'
import { PilotOSReleaseCandidateHumanReviewQueuePanel } from '@/components/sensetrust/PilotOSReleaseCandidateHumanReviewQueuePanel'
import { PilotOSReleaseCandidateInstitutionalPackagePanel } from '@/components/sensetrust/PilotOSReleaseCandidateInstitutionalPackagePanel'
import { PilotOSReleaseCandidateKnownLimitationsPanel } from '@/components/sensetrust/PilotOSReleaseCandidateKnownLimitationsPanel'
import { PilotOSReleaseCandidateNavigationMapPanel } from '@/components/sensetrust/PilotOSReleaseCandidateNavigationMapPanel'
import { PilotOSReleaseCandidateProofChainSummaryPanel } from '@/components/sensetrust/PilotOSReleaseCandidateProofChainSummaryPanel'
import { PilotOSReleaseCandidateReadinessGatePanel } from '@/components/sensetrust/PilotOSReleaseCandidateReadinessGatePanel'
import { PilotOSReleaseCandidateRiskRegisterPanel } from '@/components/sensetrust/PilotOSReleaseCandidateRiskRegisterPanel'
import { PilotOSReleaseCandidateVersionMapPanel } from '@/components/sensetrust/PilotOSReleaseCandidateVersionMapPanel'
import { SenseTrustPilotOSReleaseCandidateDashboard } from '@/components/sensetrust/SenseTrustPilotOSReleaseCandidateDashboard'
import { SenseTrustPilotOSReleaseCandidatePanel } from '@/components/sensetrust/SenseTrustPilotOSReleaseCandidatePanel'
import * as service from '@/services/sensetrust/pilot-os-release-candidate-service'

export default function SenseTrustPilotOSReleaseCandidate() {
  const candidates = service.getSenseTrustPilotOSReleaseCandidates()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><SenseTrustPilotOSReleaseCandidateDashboard candidates={candidates} /><SenseTrustPilotOSReleaseCandidatePanel candidates={candidates} /><PilotOSReleaseCandidateVersionMapPanel maps={service.getPilotOSReleaseCandidateVersionMap()} /><PilotOSReleaseCandidateAcceptanceCriteriaPanel criteria={service.getPilotOSReleaseCandidateAcceptanceCriteria()} /><PilotOSReleaseCandidateReadinessGatePanel gates={service.getPilotOSReleaseCandidateReadinessGates()} /><PilotOSReleaseCandidateDemoFlowPanel flows={service.getPilotOSReleaseCandidateDemoFlows()} /><PilotOSReleaseCandidateNavigationMapPanel maps={service.getPilotOSReleaseCandidateNavigationMap()} /><PilotOSReleaseCandidateProofChainSummaryPanel summaries={service.getPilotOSReleaseCandidateProofChainSummary()} /><PilotOSReleaseCandidateGuardrailMatrixPanel matrices={service.getPilotOSReleaseCandidateGuardrailMatrix()} /><PilotOSReleaseCandidateRiskRegisterPanel registers={service.getPilotOSReleaseCandidateRiskRegister()} /><PilotOSReleaseCandidateKnownLimitationsPanel limitations={service.getPilotOSReleaseCandidateKnownLimitations()} /><PilotOSReleaseCandidateHumanReviewQueuePanel queues={service.getPilotOSReleaseCandidateHumanReviewQueue()} /><PilotOSReleaseCandidateInstitutionalPackagePanel packages={service.getPilotOSReleaseCandidateInstitutionalPackages()} /><PilotOSReleaseCandidateExecutiveChecklistPanel checklists={service.getPilotOSReleaseCandidateExecutiveChecklist()} /><PilotOSReleaseCandidateAuditTrailPanel trails={service.getPilotOSReleaseCandidateAuditTrail()} /><PilotOSReleaseCandidateExecutiveReportPanel reports={service.getPilotOSReleaseCandidateExecutiveReport()} /></div></main>
}
