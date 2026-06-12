import type { DocumentLifecycleStatus } from './document-state'

export type SignatureScope =
  | 'document'
  | 'trust_object'
  | 'evidence_manifest'
  | 'clinical_chain'
  | 'document_state'
  | 'emission_integrity'

export type SignatureType =
  | 'simulated_professional_signature'
  | 'simulated_institutional_signature'
  | 'simulated_system_signature'
  | 'future_icp_brasil_signature'
  | 'future_govbr_signature'
  | 'future_external_timestamp_authority'

export type SignatureStatus =
  | 'unsigned'
  | 'signed'
  | 'countersigned'
  | 'timestamped'
  | 'invalid_signature'
  | 'invalid_timestamp'
  | 'revoked'
  | 'superseded'

export interface SignatureActor {
  actor_id: string
  role: 'simulated_professional' | 'simulated_institution' | 'simulated_system'
  organization: 'NeuroStrata Simulated Lab'
  display_role: string
}

export interface ProfessionalSignature {
  signature_id: string
  signature_type: 'simulated_professional_signature'
  actor_id: string
  role: string
  organization: 'NeuroStrata Simulated Lab'
  scope: SignatureScope
  signature_hash: string
  signed_at: string
  status: 'signed'
  simulated_only: true
}

export interface InstitutionalSignature {
  signature_id: string
  signature_type: 'simulated_institutional_signature'
  institution_id: string
  institution_name: 'NeuroStrata Simulated Lab'
  scope: SignatureScope
  signature_hash: string
  signed_at: string
  status: 'countersigned'
  simulated_only: true
}

export type TimestampAuthorityMode =
  | 'internal_logical_timestamp'
  | 'simulated_external_timestamp'
  | 'future_icp_brasil_timestamp'
  | 'future_govbr_timestamp'
  | 'future_rfc3161_timestamp'

export interface LogicalTimestamp {
  timestamp_id: string
  issued_at: string
  authority_mode: TimestampAuthorityMode
  sequence: number
  timestamp_hash: string
  simulated_only: true
}

export type EmissionIntegrityStatus =
  | 'unsigned'
  | 'signed'
  | 'timestamped'
  | 'invalid_signature'
  | 'invalid_timestamp'
  | 'invalid_integrity'
  | 'revoked'
  | 'expired'
  | 'superseded'

export interface EmissionIntegrityObject {
  schema: 'sensetrust.emission_integrity.v1'
  emission_id: 'EMIT-SIM-2026-0001'
  document_id: 'DNDA-SIM-2026-0001'
  trust_object_id: 'DTO-SIM-2026-0001'
  evidence_manifest_id: 'EM-SIM-2026-0001'
  clinical_chain_id: 'CHAIN-SIM-2026-0001'
  certificate_id: 'CERT-SIM-2026-0001'
  clinical_commit_id: string
  document_state: DocumentLifecycleStatus
  timestamp_id: 'TS-SIM-2026-0001'
  document_hash: string
  trust_object_hash: string
  evidence_manifest_hash: string
  clinical_chain_hash: string
  document_state_hash: string
  professional_signature: ProfessionalSignature
  institutional_signature: InstitutionalSignature
  timestamp: LogicalTimestamp
  emission_hash: string
  status: EmissionIntegrityStatus
  created_at: string
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface EmissionIntegrityValidationResult {
  valid: boolean
  status: EmissionIntegrityStatus | 'valid'
  errors: string[]
}

export interface PublicSignaturePayload {
  schema: 'sensetrust.public_signature_payload.v1'
  emission_id: string
  document_id: string
  signature_status: SignatureStatus
  professional_role: string
  institution_name: string
  issued_at: string
  timestamp_mode: TimestampAuthorityMode
  emission_hash_partial: string
  verification_status: 'valid' | 'not_valid' | 'revoked' | 'expired' | 'superseded' | 'invalid_integrity'
  document_state: DocumentLifecycleStatus
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SignatureVerificationResult {
  valid: boolean
  status: SignatureStatus | EmissionIntegrityStatus | 'valid'
  errors: string[]
}
