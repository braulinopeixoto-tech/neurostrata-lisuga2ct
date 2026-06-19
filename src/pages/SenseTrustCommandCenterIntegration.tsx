import { CommandCenterAuditTrailPanel } from '@/components/sensetrust/CommandCenterAuditTrailPanel'
import { CommandCenterAudienceProfilePanel } from '@/components/sensetrust/CommandCenterAudienceProfilePanel'
import { CommandCenterDemoScenarioPanel } from '@/components/sensetrust/CommandCenterDemoScenarioPanel'
import { CommandCenterExecutiveReportPanel } from '@/components/sensetrust/CommandCenterExecutiveReportPanel'
import { CommandCenterGuardrailSnapshotPanel } from '@/components/sensetrust/CommandCenterGuardrailSnapshotPanel'
import { CommandCenterHandoffLinksPanel } from '@/components/sensetrust/CommandCenterHandoffLinksPanel'
import { CommandCenterInstitutionalViewPanel } from '@/components/sensetrust/CommandCenterInstitutionalViewPanel'
import { CommandCenterNavigationPanel } from '@/components/sensetrust/CommandCenterNavigationPanel'
import { CommandCenterProofChainPanel } from '@/components/sensetrust/CommandCenterProofChainPanel'
import { CommandCenterReadinessSnapshotPanel } from '@/components/sensetrust/CommandCenterReadinessSnapshotPanel'
import { CommandCenterReleaseCandidatePreparationPanel } from '@/components/sensetrust/CommandCenterReleaseCandidatePreparationPanel'
import { CommandCenterRiskSnapshotPanel } from '@/components/sensetrust/CommandCenterRiskSnapshotPanel'
import { CommandCenterVersionTrailPanel } from '@/components/sensetrust/CommandCenterVersionTrailPanel'
import { SenseTrustCommandCenterDashboard } from '@/components/sensetrust/SenseTrustCommandCenterDashboard'
import { SenseTrustCommandCenterPanel } from '@/components/sensetrust/SenseTrustCommandCenterPanel'
import * as service from '@/services/sensetrust/command-center-integration-service'

export default function SenseTrustCommandCenterIntegration() {
  const centers = service.getSenseTrustCommandCenters()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><SenseTrustCommandCenterDashboard centers={centers} /><SenseTrustCommandCenterPanel centers={centers} /><CommandCenterVersionTrailPanel nodes={service.getCommandCenterVersionNodes()} /><CommandCenterNavigationPanel routes={service.getCommandCenterNavigationRoutes()} /><CommandCenterProofChainPanel chains={service.getCommandCenterProofChain()} /><CommandCenterReadinessSnapshotPanel snapshots={service.getCommandCenterReadinessSnapshot()} /><CommandCenterRiskSnapshotPanel snapshots={service.getCommandCenterRiskSnapshot()} /><CommandCenterGuardrailSnapshotPanel snapshots={service.getCommandCenterGuardrailSnapshot()} /><CommandCenterDemoScenarioPanel scenarios={service.getCommandCenterDemoScenarios()} /><CommandCenterInstitutionalViewPanel views={service.getCommandCenterInstitutionalViews()} /><CommandCenterAudienceProfilePanel profiles={service.getCommandCenterAudienceProfiles()} /><CommandCenterHandoffLinksPanel links={service.getCommandCenterHandoffLinks()} /><CommandCenterReleaseCandidatePreparationPanel preparations={service.getCommandCenterReleaseCandidatePreparation()} /><CommandCenterAuditTrailPanel trails={service.getCommandCenterAuditTrail()} /><CommandCenterExecutiveReportPanel reports={service.getCommandCenterExecutiveReport()} /></div></main>
}
