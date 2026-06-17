export type SenseTrustCloseoutStatusType = 'draft' | 'ready_for_review' | 'closed_simulated' | 'learning_loop_open' | 'v3_candidate' | 'paused' | 'blocked' | 'revoked_simulated'
export type SenseTrustLearningCategoryType = 'product' | 'institutional' | 'commercial' | 'regulatory' | 'ethical' | 'technical' | 'operational' | 'communication' | 'governance'
export type SenseTrustCloseoutDecisionType = 'go' | 'pause' | 'refine' | 'block' | 'require_legal_review' | 'require_regulatory_review' | 'require_human_review'
export type SenseTrustInstitutionalMaturityLevel = 'initial' | 'emerging' | 'structured' | 'governed' | 'pilot_ready' | 'scale_candidate'
export type SenseTrustCloseoutRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface SenseTrustPilotOutcomeSummary { outcome_id: string; pilot_id: string; outcome_status: SenseTrustCloseoutStatusType; summary: string; evidence_count: number; acceptance_state: string; certificate_status: string; metadata_only: true; simulated_only: true }
export interface SenseTrustLearningLoopItem { learning_id: string; pilot_id: string; source_evidence_id: string; source_certificate_id: string; learning_category: SenseTrustLearningCategoryType; learning_title: string; learning_description: string; action_required: string; owner_role: string; priority: SenseTrustCloseoutRiskLevel; status: SenseTrustCloseoutStatusType; linked_v3_requirement: string; metadata_only: true; simulated_only: true }
export interface SenseTrustLearningLoopRegister { register_id: string; pilot_id: string; items: SenseTrustLearningLoopItem[]; open_items: number; metadata_only: true; simulated_only: true }
export interface SenseTrustLessonsLearnedMatrix { matrix_id: string; pilot_id: string; lessons: string[]; area: SenseTrustLearningCategoryType; impact: string; source_evidence_id: string; suggested_decision: SenseTrustCloseoutDecisionType; recommendation: string; simulated_only: true }
export interface SenseTrustInstitutionalMaturityMatrix { matrix_id: string; pilot_id: string; maturity_level: SenseTrustInstitutionalMaturityLevel; domain: string; score: number; gaps: string[]; risk_level: SenseTrustCloseoutRiskLevel; recommendation: string; simulated_only: true }
export interface SenseTrustCloseoutDecision { decision_id: string; pilot_id: string; decision_type: SenseTrustCloseoutDecisionType; decision_reason: string; required_reviews: string[]; blocked_actions: string[]; next_action: string; decision_hash: string; previous_decision_hash: string | null; timestamp_simulated: string; metadata_only: true; legal_decision_claim: false; regulatory_authorization_claim: false; simulated_only: true }
export interface SenseTrustCloseoutDecisionBoard { board_id: string; pilot_id: string; decisions: SenseTrustCloseoutDecision[]; recommended_decision: SenseTrustCloseoutDecisionType; metadata_only: true; simulated_only: true }
export interface SenseTrustRegulatoryPendingItem { pending_id: string; pilot_id: string; area: string; risk_level: SenseTrustCloseoutRiskLevel; responsible_role: string; status: SenseTrustCloseoutStatusType; blockers: string[]; simulated_only: true }
export interface SenseTrustEvidenceToLearningMap { map_id: string; pilot_id: string; evidence_id: string; learning_id: string; decision_id: string; v3_requirement: string; risk_mitigated: string; metadata_only: true; simulated_only: true }
export interface SenseTrustV3ReadinessMatrix { matrix_id: string; pilot_id: string; requirement: string; readiness_score: number; gap: string; action: string; priority: SenseTrustCloseoutRiskLevel; recommendation: string; simulated_only: true }
export interface SenseTrustCloseoutAuditTrailItem { audit_id: string; pilot_id: string; action: SenseTrustCloseoutDecisionType; previous_status: SenseTrustCloseoutStatusType; new_status: SenseTrustCloseoutStatusType; logical_hash: string; timestamp_simulated: string; simulated_actor: string; metadata_only: true }
export interface SenseTrustCloseoutMisuseBlocker { blocker_id: string; blocked_misuse: string; risk: SenseTrustCloseoutRiskLevel; blocked_action: string; safe_language: string; simulated_only: true }
export interface SenseTrustInstitutionalCloseoutExecutiveReport { report_id: string; executive_summary: string; recommended_decision: SenseTrustCloseoutDecisionType; maturity_summary: string; v3_readiness_summary: string; pending_summary: string; risk_summary: string; recommendation: string; simulated_only: true }
export interface SenseTrustInstitutionalCloseoutValidationResult { valid: boolean; errors: string[] }

export interface SenseTrustInstitutionalPilotCloseoutReport {
  closeout_id: string
  pilot_id: string
  certificate_id: string
  evidence_vault_id: string
  acceptance_ledger_id: string
  closeout_title: string
  closeout_status: SenseTrustCloseoutStatusType
  outcome_summary: SenseTrustPilotOutcomeSummary
  lessons_learned_matrix: SenseTrustLessonsLearnedMatrix
  institutional_maturity_matrix: SenseTrustInstitutionalMaturityMatrix
  decision_board: SenseTrustCloseoutDecisionBoard
  regulatory_pending_items: SenseTrustRegulatoryPendingItem[]
  evidence_to_learning_map: SenseTrustEvidenceToLearningMap
  v3_readiness_matrix: SenseTrustV3ReadinessMatrix
  closeout_audit_trail: SenseTrustCloseoutAuditTrailItem[]
  misuse_blockers: SenseTrustCloseoutMisuseBlocker[]
  executive_report: SenseTrustInstitutionalCloseoutExecutiveReport
  logical_closeout_hash: string
  previous_closeout_hash: string | null
  metadata_only: true
  contains_clinical_data: false
  contains_patient_data: false
  contains_personal_sensitive_data: false
  real_clinical_operation_claim: false
  legal_closeout_claim: false
  contract_binding_claim: false
  client_claim: false
  partnership_claim: false
  regulatory_validation_claim: false
  diagnostic_truth_certification_claim: false
  simulated_only: true
}

export interface SenseTrustInstitutionalPilotCloseoutState {
  state_id: string; version: 'v2.8'; closeout_reports: SenseTrustInstitutionalPilotCloseoutReport[]; learning_loop_registers: SenseTrustLearningLoopRegister[]; learning_loop_items: SenseTrustLearningLoopItem[]; lessons_learned_matrices: SenseTrustLessonsLearnedMatrix[]; institutional_maturity_matrices: SenseTrustInstitutionalMaturityMatrix[]; closeout_decision_boards: SenseTrustCloseoutDecisionBoard[]; closeout_decisions: SenseTrustCloseoutDecision[]; regulatory_pending_items: SenseTrustRegulatoryPendingItem[]; pilot_outcome_summaries: SenseTrustPilotOutcomeSummary[]; evidence_to_learning_maps: SenseTrustEvidenceToLearningMap[]; v3_readiness_matrices: SenseTrustV3ReadinessMatrix[]; closeout_audit_trail: SenseTrustCloseoutAuditTrailItem[]; closeout_misuse_blockers: SenseTrustCloseoutMisuseBlocker[]; executive_reports: SenseTrustInstitutionalCloseoutExecutiveReport[]; references: string[]; metadata_only: true; clinical_data_used: false; patient_data_used: false; personal_sensitive_data_used: false; real_clinical_operation_claimed: false; legal_closeout_claimed: false; contract_binding_claimed: false; client_claim: false; partnership_claim: false; regulatory_validation_claim: false; diagnostic_truth_certification_claimed: false; real_revenue_claimed: false; real_billing_claimed: false; simulated_only: true
}

export interface SenseTrustInstitutionalCloseoutExportPayload { schema: 'sensetrust.institutional_pilot_closeout_export.v1'; exported_at: string; state: SenseTrustInstitutionalPilotCloseoutState; public_exposure: 'metadata_only'; simulated_only: true }
