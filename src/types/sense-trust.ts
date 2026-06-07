export type TrustCertificateStatus = 'active' | 'amended' | 'revoked' | 'expired'
export type ReportVersionStatus = 'draft' | 'reviewed' | 'signed' | 'amended' | 'revoked'
export type VerificationTokenStatus = 'active' | 'revoked' | 'expired'

export interface EvidenceObject {
  id: string
  caseId: string
  objectType: 'dnda_report' | 'exam' | 'biomarker' | 'protocol' | 'clinical_document' | string
  storagePath: string
  fileName?: string
  mimeType?: string
  sha256Hash: string
  sizeBytes?: number
  sourceSystem: string
  pseudonymizedSubjectRef?: string
  metadata: Record<string, unknown>
  createdBy?: string
  createdAt: string
}

export interface EvidenceManifest {
  case_id: string
  manifest_version: 'sensetrust-evidence-v1'
  generated_at: string
  evidence_count: number
  evidence_hashes: Array<{
    id: string
    object_type: string
    storage_path: string
    sha256_hash: string
    created_at: string
  }>
}

export interface ClinicalCommit {
  id: string
  caseId: string
  parentCommitId: string | null
  commitHash: string
  reason: string
  diffJson: Record<string, unknown>
  evidenceManifest: EvidenceManifest
  actorId?: string
  createdAt: string
}

export interface AuditEvent {
  id: string
  actor: string
  action:
    | 'access'
    | 'edit'
    | 'export'
    | 'signature'
    | 'revocation'
    | 'clinical_commit.created'
    | 'certificate.generated'
    | 'certificate.revoked'
    | string
  resource: string
  resourceHash?: string
  reason?: string
  fhirAuditEvent: Record<string, unknown>
  previousEventHash?: string
  eventHash: string
  createdAt: string
}

export interface ReportVersion {
  id: string
  caseId: string
  documentId: string
  versionNumber: number
  status: ReportVersionStatus
  documentHash?: string
  evidenceManifest: EvidenceManifest
  clinicalCommitId?: string
  amendedFromId?: string
  lockedAt?: string
  signedAt?: string
  publicMetadata: Record<string, unknown>
  createdAt: string
}

export interface TrustCertificate {
  id: string
  documentId: string
  reportVersionId?: string
  certificateNumber: string
  status: TrustCertificateStatus
  documentHash: string
  versionLabel: string
  issuer: string
  verificationTokenId?: string
  verificationUrl?: string
  certificatePayload: Record<string, unknown>
  issuedAt: string
  expiresAt?: string
  revokedAt?: string
  revokeReason?: string
}

export interface PublicVerificationResult {
  token: string
  status: TrustCertificateStatus | 'not_found'
  isValid: boolean
  certificateNumber?: string
  documentHash?: string
  versionLabel?: string
  issuer?: string
  issuedAt?: string
  expiresAt?: string
  revokedAt?: string
  patientVisible: false
}

export interface PromptVersion {
  id: string
  promptKey: string
  versionLabel: string
  status: 'draft' | 'reviewed' | 'approved' | 'retired' | string
  promptHash: string
  modelFamily?: string
  intendedUse: string
  safetyRules: unknown[]
  outputSchema: Record<string, unknown>
  evidenceManifest: Record<string, unknown>
  approvedAt?: string
  supersedesId?: string
  createdAt: string
}

export interface CodexSession {
  id: string
  sessionKey: string
  projectKey: string
  objective: string
  actor: string
  status: 'open' | 'completed' | 'blocked' | string
  gitBranch?: string
  gitCommitSha?: string
  changedFiles: string[]
  obsidianNotePath?: string
  decisionRecordId?: string
  startedAt: string
  completedAt?: string
  metadata: Record<string, unknown>
}

export interface DecisionRecord {
  id: string
  decisionKey: string
  title: string
  status: 'proposed' | 'accepted' | 'superseded' | 'rejected' | string
  scope: string
  decisionText: string
  rationale: string
  risks: string[]
  alternatives: string[]
  supersedesId?: string
  codexSessionId?: string
  obsidianNotePath?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}
