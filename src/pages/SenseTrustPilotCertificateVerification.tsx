import { CertificateClaimGuardrailsPanel } from '@/components/sensetrust/CertificateClaimGuardrailsPanel'
import { CertificateMisuseBlockerPanel } from '@/components/sensetrust/CertificateMisuseBlockerPanel'
import { CertificateStatusPanel } from '@/components/sensetrust/CertificateStatusPanel'
import { CertificateVerificationAuditTrailPanel } from '@/components/sensetrust/CertificateVerificationAuditTrailPanel'
import { PilotCertificateExecutiveReportPanel } from '@/components/sensetrust/PilotCertificateExecutiveReportPanel'
import { PilotCertificatePreviewPanel } from '@/components/sensetrust/PilotCertificatePreviewPanel'
import { PilotCertificateVerificationDashboard } from '@/components/sensetrust/PilotCertificateVerificationDashboard'
import { PublicMetadataSnapshotPanel } from '@/components/sensetrust/PublicMetadataSnapshotPanel'
import { PublicVerificationPreviewPanel } from '@/components/sensetrust/PublicVerificationPreviewPanel'
import { QRMetadataPreviewPanel } from '@/components/sensetrust/QRMetadataPreviewPanel'
import { createPilotCertificateVerificationState } from '@/services/sensetrust/pilot-certificate-verification-service'

export default function SenseTrustPilotCertificateVerification() {
  const state = createPilotCertificateVerificationState()

  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <PilotCertificateVerificationDashboard state={state} />
        <PilotCertificatePreviewPanel certificates={state.certificate_previews} />
        <PublicVerificationPreviewPanel previews={state.public_verification_previews} />
        <QRMetadataPreviewPanel previews={state.qr_metadata_previews} />
        <CertificateStatusPanel statuses={state.certificate_statuses} />
        <CertificateClaimGuardrailsPanel guardrails={state.claim_guardrails} />
        <PublicMetadataSnapshotPanel snapshots={state.public_metadata_snapshots} />
        <CertificateVerificationAuditTrailPanel items={state.verification_audit_trail} />
        <CertificateMisuseBlockerPanel blockers={state.misuse_blockers} />
        <PilotCertificateExecutiveReportPanel reports={state.executive_reports} />
      </div>
    </main>
  )
}
