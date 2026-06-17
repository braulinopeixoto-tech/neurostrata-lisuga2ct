export type SenseTrustPilotCertificateStatusType = 'draft' | 'ready_for_review' | 'issued_simulated' | 'verification_preview_available' | 'superseded' | 'blocked' | 'revoked_simulated'
export type SenseTrustPublicVerificationResultType = 'valid_metadata_preview' | 'pending_review' | 'superseded' | 'blocked' | 'revoked_simulated' | 'not_found_simulated'
export type SenseTrustQRPreviewStateType = 'generated_simulated' | 'pending_review' | 'blocked' | 'disabled' | 'revoked_simulated'
export type SenseTrustCertificateRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type SenseTrustCertificateDecisionType = 'create_preview' | 'issue_simulated' | 'enable_verification_preview' | 'require_review' | 'supersede' | 'block' | 'revoke_simulated'

export interface SenseTrustPilotCertificateMetadata { metadata_id: string; certificate_id: string; pilot_id: string; issued_label_simulated: string; version: 'v2.7'; metadata_only: true; simulated_only: true }
export interface SenseTrustPilotCertificateStatus { status_id: string; certificate_id: string; current_status: SenseTrustPilotCertificateStatusType; previous_status: SenseTrustPilotCertificateStatusType; next_allowed_status: SenseTrustPilotCertificateStatusType[]; blockers: string[]; human_review_required: boolean; legal_review_required: boolean; simulated_only: true }
export interface SenseTrustPublicVerificationResult { result_id: string; certificate_id: string; result_type: SenseTrustPublicVerificationResultType; status_message: string; metadata_only: true; simulated_only: true }
export interface SenseTrustCertificateClaimGuardrail { guardrail_id: string; claim_type: string; allowed_claims: string[]; prohibited_claims: string[]; recommended_language: string; risk_level: SenseTrustCertificateRiskLevel; simulated_only: true }
export interface SenseTrustCertificateEvidenceSummary { summary_id: string; certificate_id: string; evidence_vault_id: string; evidence_manifest_id: string; evidence_count: number; logical_manifest_hash: string; metadata_only: true; simulated_only: true }
export interface SenseTrustCertificateAcceptanceSummary { summary_id: string; certificate_id: string; acceptance_ledger_id: string; acceptance_state: string; accepted_simulated_count: number; pending_review_count: number; metadata_only: true; simulated_only: true }
export interface SenseTrustCertificateVerificationAuditTrailItem { audit_id: string; certificate_id: string; action: SenseTrustCertificateDecisionType; previous_status: SenseTrustPilotCertificateStatusType; new_status: SenseTrustPilotCertificateStatusType; logical_hash: string; timestamp_simulated: string; simulated_actor: string; metadata_only: true }
export interface SenseTrustCertificateMisuseBlocker { blocker_id: string; blocked_misuse: string; blocked_action: string; risk_avoided: string; safe_language: string; simulated_only: true }
export interface SenseTrustCertificatePublicMetadataSnapshot { snapshot_id: string; certificate_id: string; visible_fields: string[]; hidden_fields: string[]; blocked_fields: string[]; logical_certificate_hash: string; certificate_status: SenseTrustPilotCertificateStatusType; simulated_date_label: string; metadata_only: true; simulated_only: true }

export interface SenseTrustPublicVerificationPreview {
  verification_preview_id: string
  certificate_id: string
  verification_url_simulated: string
  verification_result: SenseTrustPublicVerificationResultType
  visible_public_fields: string[]
  hidden_private_fields: string[]
  blocked_fields: string[]
  qr_metadata_preview_id: string
  logical_certificate_hash: string
  status_message: string
  disclaimer: string
  metadata_only: true
  public_real_enabled: false
  simulated_only: true
}

export interface SenseTrustQRMetadataPreview {
  qr_preview_id: string
  certificate_id: string
  qr_payload_simulated: string
  qr_state: SenseTrustQRPreviewStateType
  allowed_metadata_fields: string[]
  blocked_metadata_fields: string[]
  verification_url_simulated: string
  contains_clinical_data: false
  contains_patient_data: false
  legal_signature_claim: false
  simulated_only: true
}

export interface SenseTrustPilotCertificatePreview {
  certificate_id: string
  pilot_id: string
  evidence_vault_id: string
  acceptance_ledger_id: string
  certificate_title: string
  certificate_status: SenseTrustPilotCertificateStatusType
  public_verification_preview_id: string
  qr_metadata_preview_id: string
  public_metadata_snapshot_id: string
  evidence_summary: SenseTrustCertificateEvidenceSummary
  acceptance_summary: SenseTrustCertificateAcceptanceSummary
  verification_result: SenseTrustPublicVerificationResult
  claim_guardrails: SenseTrustCertificateClaimGuardrail[]
  misuse_blockers: SenseTrustCertificateMisuseBlocker[]
  verification_audit_trail: SenseTrustCertificateVerificationAuditTrailItem[]
  logical_certificate_hash: string
  previous_certificate_hash: string | null
  metadata_only: true
  contains_clinical_data: false
  contains_patient_data: false
  contains_personal_sensitive_data: false
  public_real_enabled: false
  qr_real_enabled: false
  legal_signature_enabled: false
  icp_brasil_enabled: false
  gov_br_enabled: false
  blockchain_enabled: false
  diagnostic_truth_certification_claim: false
  legal_certificate_claim: false
  contract_binding_claim: false
  simulated_only: true
}

export interface SenseTrustPilotCertificateExecutiveReport { report_id: string; executive_summary: string; certificate_count: number; verification_preview_count: number; qr_preview_count: number; risk_summary: string; blocker_summary: string; pending_items: string[]; recommendation: string; simulated_only: true }
export interface SenseTrustPilotCertificateValidationResult { valid: boolean; errors: string[] }

export interface SenseTrustPilotCertificateVerificationState {
  state_id: string
  version: 'v2.7'
  certificate_previews: SenseTrustPilotCertificatePreview[]
  certificate_metadata: SenseTrustPilotCertificateMetadata[]
  certificate_statuses: SenseTrustPilotCertificateStatus[]
  public_verification_previews: SenseTrustPublicVerificationPreview[]
  public_verification_results: SenseTrustPublicVerificationResult[]
  qr_metadata_previews: SenseTrustQRMetadataPreview[]
  claim_guardrails: SenseTrustCertificateClaimGuardrail[]
  evidence_summaries: SenseTrustCertificateEvidenceSummary[]
  acceptance_summaries: SenseTrustCertificateAcceptanceSummary[]
  verification_audit_trail: SenseTrustCertificateVerificationAuditTrailItem[]
  misuse_blockers: SenseTrustCertificateMisuseBlocker[]
  public_metadata_snapshots: SenseTrustCertificatePublicMetadataSnapshot[]
  executive_reports: SenseTrustPilotCertificateExecutiveReport[]
  references: string[]
  metadata_only: true
  clinical_data_used: false
  patient_data_used: false
  personal_sensitive_data_used: false
  real_public_portal_claimed: false
  real_qr_claimed: false
  legal_signature_claimed: false
  icp_brasil_claimed: false
  gov_br_claimed: false
  blockchain_claimed: false
  diagnostic_truth_certification_claimed: false
  real_clinical_operation_claimed: false
  real_revenue_claimed: false
  real_billing_claimed: false
  contract_binding_claimed: false
  client_claim: false
  partnership_claim: false
  simulated_only: true
}

export interface SenseTrustPilotCertificateExportPayload { schema: 'sensetrust.pilot_certificate_verification_export.v1'; exported_at: string; state: SenseTrustPilotCertificateVerificationState; public_exposure: 'metadata_only'; simulated_only: true }
