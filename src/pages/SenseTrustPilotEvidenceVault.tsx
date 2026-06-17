import { AcceptanceLedgerPanel } from '@/components/sensetrust/AcceptanceLedgerPanel'
import { EvidenceAuditTrailPanel } from '@/components/sensetrust/EvidenceAuditTrailPanel'
import { EvidenceCompletenessScorePanel } from '@/components/sensetrust/EvidenceCompletenessScorePanel'
import { EvidenceManifestPanel } from '@/components/sensetrust/EvidenceManifestPanel'
import { EvidenceMinimumMatrixPanel } from '@/components/sensetrust/EvidenceMinimumMatrixPanel'
import { EvidenceMisuseBlockerPanel } from '@/components/sensetrust/EvidenceMisuseBlockerPanel'
import { EvidenceRiskSignalPanel } from '@/components/sensetrust/EvidenceRiskSignalPanel'
import { EvidenceVaultExecutiveReportPanel } from '@/components/sensetrust/EvidenceVaultExecutiveReportPanel'
import { PilotAcceptanceStatePanel } from '@/components/sensetrust/PilotAcceptanceStatePanel'
import { PilotEvidenceVaultDashboard } from '@/components/sensetrust/PilotEvidenceVaultDashboard'
import { createPilotEvidenceVaultState } from '@/services/sensetrust/pilot-evidence-vault-service'

export default function SenseTrustPilotEvidenceVault() {
  const state = createPilotEvidenceVaultState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <PilotEvidenceVaultDashboard state={state} />
        <EvidenceManifestPanel manifests={state.evidence_manifests} />
        <AcceptanceLedgerPanel entries={state.acceptance_ledger_entries} />
        <EvidenceMinimumMatrixPanel items={state.evidence_minimum_matrices} />
        <EvidenceCompletenessScorePanel scores={state.completeness_scores} />
        <EvidenceRiskSignalPanel risks={state.risk_signals} />
        <EvidenceMisuseBlockerPanel blockers={state.misuse_blockers} />
        <EvidenceAuditTrailPanel items={state.audit_trail} />
        <PilotAcceptanceStatePanel states={state.acceptance_states} />
        <EvidenceVaultExecutiveReportPanel reports={state.executive_reports} />
      </div>
    </main>
  )
}
