export type SenseTrustEvidenceRecordType = 'scope_document' | 'authorized_material' | 'meeting_record' | 'feedback_record' | 'risk_record' | 'decision_log' | 'acceptance_criterion' | 'interruption_rule' | 'executive_report' | 'metadata_manifest'
export type SenseTrustEvidenceStateType = 'draft' | 'registered' | 'reviewed' | 'accepted_simulated' | 'rejected_simulated' | 'superseded' | 'blocked' | 'revoked_simulated'
export type SenseTrustAcceptanceStateType = 'pending' | 'partially_accepted' | 'accepted_simulated' | 'rejected_simulated' | 'blocked' | 'requires_human_review' | 'requires_legal_review'
export type SenseTrustEvidenceRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type SenseTrustEvidenceVaultDecisionType = 'register' | 'accept_simulated' | 'reject_simulated' | 'require_review' | 'supersede' | 'block' | 'revoke_simulated'

export interface SenseTrustPilotEvidenceHash { hash_id: string; logical_hash: string; hash_basis: string; simulated_only: true }
export interface SenseTrustPilotEvidenceState { state_id: string; evidence_id: string; state_type: SenseTrustEvidenceStateType; reason: string; simulated_only: true }
export interface SenseTrustAcceptanceState { state_id: string; ledger_entry_id: string; state_type: SenseTrustAcceptanceStateType; reason: string; simulated_only: true }
export interface SenseTrustAcceptanceEvidenceLink { link_id: string; evidence_id: string; ledger_entry_id: string; link_reason: string; metadata_only: true }

export interface SenseTrustPilotEvidenceRecord {
  evidence_id: string
  pilot_id: string
  evidence_type: SenseTrustEvidenceRecordType
  evidence_title: string
  evidence_description: string
  linked_checkpoint_id: string
  linked_acceptance_criterion_id: string
  linked_decision_log_id: string
  evidence_state: SenseTrustEvidenceStateType
  evidence_hash: string
  parent_evidence_hash: string | null
  metadata_only: true
  contains_clinical_data: false
  contains_patient_data: false
  contains_personal_sensitive_data: false
  storage_real_enabled: false
  legal_signature_enabled: false
  blockchain_enabled: false
  simulated_only: true
}

export interface SenseTrustPilotEvidenceManifest {
  manifest_id: string
  pilot_id: string
  version: string
  evidence_ids: string[]
  manifest_logical_hash: string
  manifest_state: SenseTrustEvidenceStateType
  checkpoint_reference: string
  acceptance_reference: string
  metadata_only: true
  simulated_only: true
}

export interface SenseTrustPilotEvidenceVault { vault_id: string; pilot_id: string; vault_title: string; manifest_id: string; record_count: number; completeness_score: number; acceptance_progress: number; metadata_only: true; simulated_only: true }

export interface SenseTrustAcceptanceLedgerEntry {
  ledger_entry_id: string
  pilot_id: string
  acceptance_criterion_id: string
  evidence_id: string
  acceptance_state: SenseTrustAcceptanceStateType
  decision_type: SenseTrustEvidenceVaultDecisionType
  decision_reason: string
  required_review: string[]
  blocked_actions: string[]
  evidence_hash: string
  previous_entry_hash: string | null
  entry_hash: string
  timestamp_simulated: string
  metadata_only: true
  legal_acceptance_claim: false
  contract_binding_claim: false
  simulated_only: true
}

export interface SenseTrustAcceptanceLedger { ledger_id: string; pilot_id: string; entries: SenseTrustAcceptanceLedgerEntry[]; ledger_state: SenseTrustAcceptanceStateType; metadata_only: true; simulated_only: true }
export interface SenseTrustEvidenceMinimumMatrix { matrix_id: string; pilot_id: string; required_evidence: string; acceptance_criterion_id: string; checkpoint_id: string; mandatory: boolean; status: SenseTrustEvidenceStateType; blocking_if_absent: boolean; human_review_required: boolean; legal_review_required: boolean; simulated_only: true }
export interface SenseTrustEvidenceCompletenessScore { score_id: string; pilot_id: string; score: number; evidence_present: number; evidence_missing: number; acceptance_risk: SenseTrustEvidenceRiskLevel; recommendation: string; simulated_only: true }
export interface SenseTrustEvidenceRiskSignal { risk_id: string; pilot_id: string; risk_level: SenseTrustEvidenceRiskLevel; trigger: string; impact: string; mitigation: string; associated_blocker_id: string; simulated_only: true }
export interface SenseTrustEvidenceMisuseBlocker { blocker_id: string; blocked_misuse: string; reason: string; blocked_action: string; risk_avoided: string; recommended_language: string; simulated_only: true }
export interface SenseTrustEvidenceAuditTrailItem { audit_id: string; pilot_id: string; evidence_id: string; action: SenseTrustEvidenceVaultDecisionType; previous_state: SenseTrustEvidenceStateType; new_state: SenseTrustEvidenceStateType; logical_hash: string; timestamp_simulated: string; simulated_actor: string; metadata_only: true }
export interface SenseTrustEvidenceVaultExecutiveReport { report_id: string; pilot_id: string; executive_summary: string; completeness_summary: string; acceptance_summary: string; risk_summary: string; blocker_summary: string; pending_items: string[]; recommendation: string; simulated_only: true }
export interface SenseTrustPilotEvidenceVaultValidationResult { valid: boolean; errors: string[] }

export interface SenseTrustPilotEvidenceVaultState {
  state_id: string
  version: 'v2.6'
  vaults: SenseTrustPilotEvidenceVault[]
  evidence_records: SenseTrustPilotEvidenceRecord[]
  evidence_manifests: SenseTrustPilotEvidenceManifest[]
  evidence_hashes: SenseTrustPilotEvidenceHash[]
  evidence_states: SenseTrustPilotEvidenceState[]
  acceptance_ledgers: SenseTrustAcceptanceLedger[]
  acceptance_ledger_entries: SenseTrustAcceptanceLedgerEntry[]
  acceptance_states: SenseTrustAcceptanceState[]
  acceptance_evidence_links: SenseTrustAcceptanceEvidenceLink[]
  evidence_minimum_matrices: SenseTrustEvidenceMinimumMatrix[]
  completeness_scores: SenseTrustEvidenceCompletenessScore[]
  risk_signals: SenseTrustEvidenceRiskSignal[]
  misuse_blockers: SenseTrustEvidenceMisuseBlocker[]
  audit_trail: SenseTrustEvidenceAuditTrailItem[]
  executive_reports: SenseTrustEvidenceVaultExecutiveReport[]
  references: string[]
  metadata_only: true
  clinical_data_used: false
  patient_data_used: false
  personal_sensitive_data_used: false
  real_storage_claimed: false
  legal_signature_claimed: false
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

export interface SenseTrustPilotEvidenceVaultExportPayload { schema: 'sensetrust.pilot_evidence_vault_export.v1'; exported_at: string; state: SenseTrustPilotEvidenceVaultState; public_exposure: 'metadata_only'; simulated_only: true }
