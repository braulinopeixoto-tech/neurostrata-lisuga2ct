import { DemoDistributionScenarioPanel } from '@/components/sensetrust/DemoDistributionScenarioPanel'
import { PartnerPresentationAudienceProfilePanel } from '@/components/sensetrust/PartnerPresentationAudienceProfilePanel'
import { PartnerPresentationAuditTrailPanel } from '@/components/sensetrust/PartnerPresentationAuditTrailPanel'
import { PartnerPresentationChecklistPanel } from '@/components/sensetrust/PartnerPresentationChecklistPanel'
import { PartnerPresentationClaimsMatrixPanel } from '@/components/sensetrust/PartnerPresentationClaimsMatrixPanel'
import { PartnerPresentationDeckOutlinePanel } from '@/components/sensetrust/PartnerPresentationDeckOutlinePanel'
import { PartnerPresentationDemoScriptPanel } from '@/components/sensetrust/PartnerPresentationDemoScriptPanel'
import { PartnerPresentationDistributionLogPanel } from '@/components/sensetrust/PartnerPresentationDistributionLogPanel'
import { PartnerPresentationExecutiveReportPanel } from '@/components/sensetrust/PartnerPresentationExecutiveReportPanel'
import { PartnerPresentationHumanReviewQueuePanel } from '@/components/sensetrust/PartnerPresentationHumanReviewQueuePanel'
import { PartnerPresentationMaterialPanel } from '@/components/sensetrust/PartnerPresentationMaterialPanel'
import { PartnerPresentationNarrativeTrackPanel } from '@/components/sensetrust/PartnerPresentationNarrativeTrackPanel'
import { PartnerPresentationOnePagerPanel } from '@/components/sensetrust/PartnerPresentationOnePagerPanel'
import { PartnerPresentationPackagePanel } from '@/components/sensetrust/PartnerPresentationPackagePanel'
import { PartnerPresentationRiskRegisterPanel } from '@/components/sensetrust/PartnerPresentationRiskRegisterPanel'
import { PartnerPresentationRouteMapPanel } from '@/components/sensetrust/PartnerPresentationRouteMapPanel'
import { SenseTrustDemoDistributionPartnerPresentationKitDashboard } from '@/components/sensetrust/SenseTrustDemoDistributionPartnerPresentationKitDashboard'
import { SenseTrustDemoDistributionPartnerPresentationKitPanel } from '@/components/sensetrust/SenseTrustDemoDistributionPartnerPresentationKitPanel'
import * as service from '@/services/sensetrust/demo-distribution-partner-presentation-kit-service'

export default function SenseTrustDemoDistributionPartnerPresentationKit() {
  const kits = service.getSenseTrustDemoDistributionPartnerPresentationKits()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><SenseTrustDemoDistributionPartnerPresentationKitDashboard kits={kits} /><SenseTrustDemoDistributionPartnerPresentationKitPanel kits={kits} /><DemoDistributionScenarioPanel scenarios={service.getDemoDistributionScenarios()} /><PartnerPresentationAudienceProfilePanel profiles={service.getPartnerPresentationAudienceProfiles()} /><PartnerPresentationNarrativeTrackPanel tracks={service.getPartnerPresentationNarrativeTracks()} /><PartnerPresentationPackagePanel packages={service.getPartnerPresentationPackages()} /><PartnerPresentationMaterialPanel materials={service.getPartnerPresentationMaterials()} /><PartnerPresentationOnePagerPanel onePagers={service.getPartnerPresentationOnePagers()} /><PartnerPresentationDeckOutlinePanel outlines={service.getPartnerPresentationDeckOutlines()} /><PartnerPresentationDemoScriptPanel scripts={service.getPartnerPresentationDemoScripts()} /><PartnerPresentationRouteMapPanel maps={service.getPartnerPresentationRouteMaps()} /><PartnerPresentationClaimsMatrixPanel authorized={service.getPartnerPresentationAuthorizedClaims()} prohibited={service.getPartnerPresentationProhibitedClaims()} /><PartnerPresentationChecklistPanel pre={service.getPartnerPresentationPreMeetingChecklists()} post={service.getPartnerPresentationPostMeetingChecklists()} /><PartnerPresentationDistributionLogPanel logs={service.getPartnerPresentationDistributionLogs()} /><PartnerPresentationRiskRegisterPanel registers={service.getPartnerPresentationRiskRegister()} /><PartnerPresentationHumanReviewQueuePanel queues={service.getPartnerPresentationHumanReviewQueue()} /><PartnerPresentationAuditTrailPanel trails={service.getPartnerPresentationAuditTrail()} /><PartnerPresentationExecutiveReportPanel reports={service.getPartnerPresentationExecutiveReport()} /></div></main>
}
