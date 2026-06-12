import type { DocumentLifecycleStatus } from './document-state'
import type { SignatureStatus, TimestampAuthorityMode } from './signature-timestamp'

export type PublicVerificationStatus =
  | 'verified_active'
  | 'verified_amended'
  | 'verified_revoked'
  | 'verified_expired'
  | 'verified_superseded'
  | 'invalid_token'
  | 'invalid_integrity'
  | 'unavailable'
  | 'simulated_only'

export type PublicVerificationSeverity = 'success' | 'warning' | 'danger' | 'neutral' | 'blocked'

export type PublicVerificationTokenStatus = 'valid' | 'invalid' | 'expired' | 'revoked' | 'unknown'

export interface PublicVerificationDocumentStatus {
  document_id: string
  certificate_id: string
  document_state: DocumentLifecycleStatus | 'unavailable'
  superseded_by_document_id: string | null
}

export interface PublicVerificationSignatureStatus {
  signature_status: SignatureStatus | 'unavailable'
  timestamp_status: 'valid' | 'invalid' | 'unavailable'
  issued_at: string
  professional_role: string
  institution_name: string
}

export interface PublicVerificationIntegrityStatus {
  verification_status: PublicVerificationStatus
  certificate_hash_partial: string
  emission_hash_partial: string
  document_hash_partial: string
}

export interface PublicVerificationDisplaySection {
  section_id: string
  title: string
  severity: PublicVerificationSeverity
  items: Array<{ label: string; value: string }>
}

export interface PublicVerificationSafetyCheck {
  valid: boolean
  blocked_terms: string[]
  public_exposure: 'metadata_only'
}

export interface PublicVerificationActionHint {
  action_id: string
  label: string
  severity: PublicVerificationSeverity
}

export interface PublicVerificationPortalPayload {
  schema: 'sensetrust.public_verification_portal.v1'
  token_status: PublicVerificationTokenStatus
  verification_status: PublicVerificationStatus
  severity: PublicVerificationSeverity
  document_id: string
  certificate_id: string
  emission_id: string
  document_state: DocumentLifecycleStatus | 'unavailable'
  signature_status: SignatureStatus | 'unavailable'
  timestamp_status: 'valid' | 'invalid' | 'unavailable'
  issued_at: string
  verified_at: string
  professional_role: string
  institution_name: string
  public_hashes: {
    certificate_hash_partial: string
    emission_hash_partial: string
    document_hash_partial: string
  }
  superseded_by_document_id: string | null
  public_message: string
  safety_notice: string
  action_hints: PublicVerificationActionHint[]
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface PublicVerificationPortalResult {
  ok: boolean
  payload: PublicVerificationPortalPayload
  safety_check: PublicVerificationSafetyCheck
  display_sections: PublicVerificationDisplaySection[]
}
