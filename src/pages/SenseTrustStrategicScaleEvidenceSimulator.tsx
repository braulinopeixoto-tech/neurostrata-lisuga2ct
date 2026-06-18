import { EvidenceGapAnalysisPanel } from '@/components/sensetrust/EvidenceGapAnalysisPanel'
import { EvidenceMaturityScorePanel } from '@/components/sensetrust/EvidenceMaturityScorePanel'
import { EvidenceMisuseBlockerPanel } from '@/components/sensetrust/EvidenceMisuseBlockerPanel'
import { EvidenceReadinessBoardPanel } from '@/components/sensetrust/EvidenceReadinessBoardPanel'
import { EvidenceStrengtheningPlanPanel } from '@/components/sensetrust/EvidenceStrengtheningPlanPanel'
import { EvidenceToDecisionTracePanel } from '@/components/sensetrust/EvidenceToDecisionTracePanel'
import { HumanReviewEvidenceQueuePanel } from '@/components/sensetrust/HumanReviewEvidenceQueuePanel'
import { InstitutionalEvidenceBriefPanel } from '@/components/sensetrust/InstitutionalEvidenceBriefPanel'
import { MinimumEvidenceMatrixPanel } from '@/components/sensetrust/MinimumEvidenceMatrixPanel'
import { ProofRiskRegisterPanel } from '@/components/sensetrust/ProofRiskRegisterPanel'
import { ScenarioEvidencePackagePanel } from '@/components/sensetrust/ScenarioEvidencePackagePanel'
import { StrategicScaleEvidenceExecutiveReportPanel } from '@/components/sensetrust/StrategicScaleEvidenceExecutiveReportPanel'
import { StrategicScaleEvidenceSimulatorDashboard } from '@/components/sensetrust/StrategicScaleEvidenceSimulatorDashboard'
import { StrategicScaleEvidenceSimulatorPanel } from '@/components/sensetrust/StrategicScaleEvidenceSimulatorPanel'
import { createStrategicScaleEvidenceSimulatorState } from '@/services/sensetrust/strategic-scale-evidence-simulator-service'

export default function SenseTrustStrategicScaleEvidenceSimulator() {
  const state = createStrategicScaleEvidenceSimulatorState()
  return <main className="min-h-screen bg-slate-100 p-6"><div className="mx-auto max-w-7xl space-y-5"><StrategicScaleEvidenceSimulatorDashboard state={state} /><StrategicScaleEvidenceSimulatorPanel simulators={state.evidence_simulators} /><ScenarioEvidencePackagePanel packages={state.evidence_packages} /><MinimumEvidenceMatrixPanel matrices={state.minimum_evidence_matrices} /><EvidenceGapAnalysisPanel analyses={state.gap_analyses} /><ProofRiskRegisterPanel registers={state.proof_risk_registers} /><EvidenceMaturityScorePanel scores={state.maturity_scores} /><EvidenceReadinessBoardPanel boards={state.readiness_boards} /><EvidenceToDecisionTracePanel traces={state.evidence_to_decision_traces} /><InstitutionalEvidenceBriefPanel briefs={state.institutional_evidence_briefs} /><EvidenceStrengtheningPlanPanel plans={state.strengthening_plans} /><HumanReviewEvidenceQueuePanel queues={state.human_review_queues} /><EvidenceMisuseBlockerPanel blockers={state.misuse_blockers} /><StrategicScaleEvidenceExecutiveReportPanel reports={state.executive_reports} /></div></main>
}
