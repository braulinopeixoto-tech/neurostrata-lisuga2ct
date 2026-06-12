import type { DocumentLifecycleStatus } from '@/types/sensetrust/document-state'

export const SIMULATED_PUBLIC_VERIFICATION_TOKENS = {
  valid_active_token: 'TOKEN-SIM-ACTIVE-001',
  valid_amended_token: 'TOKEN-SIM-AMENDED-001',
  valid_revoked_token: 'TOKEN-SIM-REVOKED-001',
  valid_expired_token: 'TOKEN-SIM-EXPIRED-001',
  valid_superseded_token: 'TOKEN-SIM-SUPERSEDED-001',
  invalid_integrity_token: 'TOKEN-SIM-INTEGRITY-INVALID-001',
  invalid_token: 'TOKEN-SIM-INVALID-001',
} as const

export const SIMULATED_PUBLIC_VERIFICATION_IDS = {
  document_id: 'DNDA-SIM-2026-0001',
  replacement_document_id: 'DNDA-SIM-2026-0002',
  certificate_id: 'CERT-SIM-2026-0001',
  emission_id: 'EMIT-SIM-2026-0001',
  verified_at: '2026-06-09T10:00:00.000Z',
  issued_at: '2026-06-08T10:00:00.000Z',
  certificate_hash: 'sha256:simulated-certificate-hash-v08-abcdef1234567890',
  emission_hash: 'sha256:simulated-emission-hash-v08-abcdef1234567890',
  document_hash: 'sha256:simulated-document-hash-v08-abcdef1234567890',
} as const

export const SIMULATED_PUBLIC_VERIFICATION_SCENARIOS: Record<
  string,
  {
    token: string
    document_state: DocumentLifecycleStatus
    superseded_by_document_id: string | null
  }
> = {
  active: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.valid_active_token,
    document_state: 'active',
    superseded_by_document_id: null,
  },
  amended: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.valid_amended_token,
    document_state: 'amended',
    superseded_by_document_id: null,
  },
  revoked: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.valid_revoked_token,
    document_state: 'revoked',
    superseded_by_document_id: null,
  },
  expired: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.valid_expired_token,
    document_state: 'expired',
    superseded_by_document_id: null,
  },
  superseded: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.valid_superseded_token,
    document_state: 'superseded',
    superseded_by_document_id: SIMULATED_PUBLIC_VERIFICATION_IDS.replacement_document_id,
  },
  invalid_integrity: {
    token: SIMULATED_PUBLIC_VERIFICATION_TOKENS.invalid_integrity_token,
    document_state: 'invalid_integrity',
    superseded_by_document_id: null,
  },
}

export const PUBLIC_PORTAL_SENSITIVE_DENYLIST = [
  'patient_name',
  'patient_cpf',
  'birth_date',
  'address',
  'phone',
  'email',
  'diagnosis',
  'diagnostic_hypothesis',
  'clinical_report',
  'anamnesis',
  'qeeg',
  'eeg',
  'scales',
  'medications',
  'raw_scores',
  'clinical_notes',
  'private_revocation_reason',
  'professional_license_number',
  'document_full_text',
  'cpf',
  'paciente',
  'laudo',
  'anamnese',
  'medicacao',
  'medicação',
  'diagnostico',
  'diagnóstico',
]
