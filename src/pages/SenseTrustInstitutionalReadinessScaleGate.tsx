import { GovernanceToScaleAuditTrailPanel } from '@/components/sensetrust/GovernanceToScaleAuditTrailPanel'
import { InstitutionalReadinessExecutiveReportPanel } from '@/components/sensetrust/InstitutionalReadinessExecutiveReportPanel'
import { InstitutionalReadinessGatePanel } from '@/components/sensetrust/InstitutionalReadinessGatePanel'
import { InstitutionalReadinessScaleGateDashboard } from '@/components/sensetrust/InstitutionalReadinessScaleGateDashboard'
import { InstitutionalRiskGovernanceMapPanel } from '@/components/sensetrust/InstitutionalRiskGovernanceMapPanel'
import { MarketPrioritizationMatrixPanel } from '@/components/sensetrust/MarketPrioritizationMatrixPanel'
import { RegulatoryReadinessMapPanel } from '@/components/sensetrust/RegulatoryReadinessMapPanel'
import { ScaleCandidateScorePanel } from '@/components/sensetrust/ScaleCandidateScorePanel'
import { ScaleDecisionBoardPanel } from '@/components/sensetrust/ScaleDecisionBoardPanel'
import { StrategicPartnerFitMatrixPanel } from '@/components/sensetrust/StrategicPartnerFitMatrixPanel'
import { StrategicScaleGatePanel } from '@/components/sensetrust/StrategicScaleGatePanel'
import { StrategicScaleMisuseBlockerPanel } from '@/components/sensetrust/StrategicScaleMisuseBlockerPanel'
import { V3StrategicRoadmapPanel } from '@/components/sensetrust/V3StrategicRoadmapPanel'
import { createInstitutionalReadinessScaleGateState } from '@/services/sensetrust/institutional-readiness-scale-gate-service'

export default function SenseTrustInstitutionalReadinessScaleGate() {
  const state = createInstitutionalReadinessScaleGateState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><InstitutionalReadinessScaleGateDashboard state={state} /><InstitutionalReadinessGatePanel gates={state.readiness_gates} /><StrategicScaleGatePanel gates={state.strategic_scale_gates} /><ScaleDecisionBoardPanel boards={state.scale_decision_boards} /><MarketPrioritizationMatrixPanel matrices={state.market_prioritization_matrices} /><RegulatoryReadinessMapPanel maps={state.regulatory_readiness_maps} /><InstitutionalRiskGovernanceMapPanel maps={state.institutional_risk_governance_maps} /><ScaleCandidateScorePanel scores={state.scale_candidate_scores} /><V3StrategicRoadmapPanel roadmaps={state.v3_strategic_roadmaps} /><StrategicPartnerFitMatrixPanel matrices={state.strategic_partner_fit_matrices} /><GovernanceToScaleAuditTrailPanel items={state.governance_to_scale_audit_trail} /><StrategicScaleMisuseBlockerPanel blockers={state.strategic_scale_misuse_blockers} /><InstitutionalReadinessExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
