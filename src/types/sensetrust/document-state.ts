import type { ClinicalCommitType } from './clinical-commit-chain'

export type DocumentLifecycleStatus =
  | 'draft'
  | 'reviewed'
  | 'signed'
  | 'active'
  | 'amended'
  | 'active_new_version'
  | 'revoked'
  | 'expired'
  | 'superseded'
  | 'archived'
  | 'invalid_integrity'

export type DocumentStateTransitionType =
  | 'review_document'
  | 'sign_document'
  | 'activate_certificate'
  | 'amend_document'
  | 'revoke_document'
  | 'expire_document'
  | 'supersede_document'
  | 'restore_from_error'
  | 'integrity_invalidated'

export interface DocumentStateTransitionReason {
  public_reason: string
  private_reason?: string
  policy_reference: string
}

export interface DocumentStateActor {
  actor_id: string
  display_name: string
  role: 'simulated_system' | 'simulated_clinician' | 'simulated_auditor'
  organization: 'NeuroStrata Simulated Lab'
}

export interface DocumentStatePolicy {
  schema: 'sensetrust.document_state_policy.v1'
  signed_locks_direct_edit: true
  active_locks_direct_edit: true
  revocation_terminal: true
  expiration_terminal: true
  public_payload_minimized: true
  simulated_only: true
}

export interface DocumentStateTransition {
  transition_id: string
  transition_type: DocumentStateTransitionType
  document_id: string
  trust_object_id: string
  evidence_manifest_id: string
  clinical_commit_id: string
  certificate_id: string
  previous_status: DocumentLifecycleStatus
  next_status: DocumentLifecycleStatus
  reason: DocumentStateTransitionReason
  actor: DocumentStateActor
  transition_hash: string
  created_at: string
  terminal: boolean
}

export interface RevocationRecord {
  revocation_id: string
  document_id: string
  certificate_id: string
  clinical_commit_id: string
  revoked_at: string
  status: 'revoked'
  public_reason: string
  private_reason: string
  simulated_only: true
}

export interface AmendmentRecord {
  amendment_id: string
  source_document_id: string
  amended_document_id: string
  clinical_commit_id: string
  created_at: string
  status: 'amended'
  public_reason: string
  private_reason: string
  simulated_only: true
}

export interface SupersessionRecord {
  supersession_id: string
  source_document_id: string
  replacement_document_id: string
  clinical_commit_id: string
  superseded_at: string
  status: 'superseded'
  public_reason: string
  private_reason: string
  simulated_only: true
}

export interface ExpirationRecord {
  expiration_id: string
  document_id: string
  certificate_id: string
  clinical_commit_id: string
  expired_at: string
  status: 'expired'
  public_reason: string
  private_reason: string
  simulated_only: true
}

export interface DocumentState {
  schema: 'sensetrust.document_state.v1'
  document_id: string
  document_type: 'dnda_report'
  document_version: string
  trust_object_id: string
  evidence_manifest_id: string
  chain_id: string
  certificate_id: string
  status: DocumentLifecycleStatus
  document_hash: string
  state_hash: string
  issued_at: string
  updated_at: string
  expires_at?: string
  amendment?: AmendmentRecord
  revocation?: RevocationRecord
  supersession?: SupersessionRecord
  expiration?: ExpirationRecord
  transitions: DocumentStateTransition[]
  clinical_commit_ids: string[]
  policy: DocumentStatePolicy
  simulated_only: true
}

export interface DocumentStateValidationResult {
  valid: boolean
  status: DocumentLifecycleStatus | 'valid'
  errors: string[]
}

export interface PublicDocumentStatePayload {
  schema: 'sensetrust.public_document_state.v1'
  document_id: string
  document_type: 'dnda_report'
  document_version: string
  certificate_id: string
  lifecycle_status: DocumentLifecycleStatus
  verification_status: 'valid' | 'not_valid' | 'revoked' | 'expired' | 'superseded' | 'invalid_integrity'
  public_reason: string
  amended_document_id?: string
  replacement_document_id?: string
  expires_at?: string
  updated_at: string
  simulated_only: true
}

export interface DocumentStateClinicalCommit {
  commit_id: string
  commit_type: ClinicalCommitType
  document_id: string
  previous_status: DocumentLifecycleStatus
  next_status: DocumentLifecycleStatus
  public_reason: string
  current_hash: string
  created_at: string
  simulated_only: true
}
