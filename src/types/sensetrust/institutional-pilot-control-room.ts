export type SenseTrustInstitutionalPilotAudienceType = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'regulators' | 'internal_team'
export type SenseTrustPilotStatus = 'planned' | 'scope_defined' | 'governance_review' | 'ready_for_supervised_demo' | 'supervised_execution' | 'acceptance_review' | 'paused' | 'completed_simulated' | 'blocked'
export type SenseTrustPilotCheckpointStatus = 'pending' | 'in_review' | 'passed' | 'failed' | 'blocked' | 'not_applicable'
export type SenseTrustPilotRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type SenseTrustPilotDecisionType = 'continue' | 'pause' | 'revise_scope' | 'require_human_review' | 'require_legal_review' | 'block' | 'complete_simulated'

export interface SenseTrustPilotScope {
  scope_id: string
  pilot_id: string
  objective: string
  in_scope: string[]
  out_of_scope: string[]
  allowed_materials: string[]
  blocked_materials: string[]
  allowed_data: string[]
  prohibited_data: string[]
  simulated_duration: string
  exit_decision: SenseTrustPilotDecisionType
  simulated_only: true
}

export interface SenseTrustPilotRaciRole {
  role_id: string
  pilot_id: string
  role_name: string
  responsible: string
  accountable: string
  consulted: string[]
  informed: string[]
  human_review_required: boolean
  simulated_only: true
}

export interface SenseTrustPilotGovernanceBoard {
  board_id: string
  pilot_id: string
  title: string
  human_review_policy: string
  legal_review_policy: string
  institutional_review_policy: string
  technical_review_policy: string
  ethical_review_policy: string
  simulated_only: true
}

export interface SenseTrustPilotCheckpoint {
  checkpoint_id: string
  pilot_id: string
  checkpoint_title: string
  checkpoint_status: SenseTrustPilotCheckpointStatus
  criteria: string[]
  blockers: string[]
  evidence_required: string[]
  simulated_only: true
}

export interface SenseTrustPilotAcceptanceCriterion {
  criterion_id: string
  criterion_title: string
  criterion_description: string
  checkpoint_reference: string
  evidence_required: string
  acceptance_status: SenseTrustPilotCheckpointStatus
  human_review_required: boolean
  legal_review_required: boolean
  blocking_if_failed: boolean
  simulated_only: true
}

export interface SenseTrustSupervisedAcceptanceRecord {
  record_id: string
  pilot_id: string
  criterion_id: string
  acceptance_summary: string
  reviewed_by: string
  simulated_date_label: string
  decision: SenseTrustPilotDecisionType
  simulated_only: true
}

export interface SenseTrustPilotExecutionRisk {
  risk_id: string
  pilot_id: string
  risk_title: string
  risk_level: SenseTrustPilotRiskLevel
  impact: string
  mitigation: string
  interruption_rule_reference: string
  simulated_only: true
}

export interface SenseTrustPilotEvidenceItem {
  evidence_id: string
  pilot_id: string
  evidence_title: string
  evidence_status: SenseTrustPilotCheckpointStatus
  data_classification: 'metadata_only'
  blocks_real_clinical_data: true
  simulated_only: true
}

export interface SenseTrustPilotInterruptionRule {
  rule_id: string
  pilot_id: string
  trigger: string
  pause_condition: string
  block_condition: string
  human_review_required: boolean
  legal_review_required: boolean
  recommended_decision: SenseTrustPilotDecisionType
  simulated_only: true
}

export interface SenseTrustPilotStatusBoard {
  status_board_id: string
  pilot_id: string
  pilot_status: SenseTrustPilotStatus
  readiness_score: number
  acceptance_progress: number
  risk_score: number
  open_checkpoints: number
  human_review_items: number
  simulated_only: true
}

export interface SenseTrustPilotDecisionLog {
  decision_log_id: string
  pilot_id: string
  decision_type: SenseTrustPilotDecisionType
  decision_reason: string
  checkpoint_reference: string
  simulated_responsible: string
  human_review_required: boolean
  metadata_only: true
  simulated_date_label: string
}

export interface SenseTrustPilotExecutiveReport {
  report_id: string
  pilot_id: string
  executive_summary: string
  progress_summary: string
  risk_summary: string
  acceptance_summary: string
  pending_items: string[]
  recommendation: SenseTrustPilotDecisionType
  simulated_only: true
}

export interface SenseTrustInstitutionalPilot {
  pilot_id: string
  pilot_title: string
  audience_type: SenseTrustInstitutionalPilotAudienceType
  pilot_status: SenseTrustPilotStatus
  source_pipeline_opportunity_id: string
  decision_board_reference: string
  meeting_intelligence_reference: string
  partner_demo_kit_reference: string
  scope: SenseTrustPilotScope
  raci_roles: SenseTrustPilotRaciRole[]
  governance_board: SenseTrustPilotGovernanceBoard
  checkpoints: SenseTrustPilotCheckpoint[]
  acceptance_criteria: SenseTrustPilotAcceptanceCriterion[]
  supervised_acceptance_records: SenseTrustSupervisedAcceptanceRecord[]
  execution_risks: SenseTrustPilotExecutionRisk[]
  evidence_items: SenseTrustPilotEvidenceItem[]
  interruption_rules: SenseTrustPilotInterruptionRule[]
  status_board: SenseTrustPilotStatusBoard
  decision_log: SenseTrustPilotDecisionLog[]
  executive_report: SenseTrustPilotExecutiveReport
  data_classification: 'metadata_only'
  clinical_data_used: false
  real_patient_data_used: false
  real_clinical_operation_enabled: false
  real_contract_enabled: false
  real_billing_enabled: false
  real_crm_enabled: false
  real_analytics_enabled: false
  real_email_automation_enabled: false
  diagnostic_truth_certification_claim: false
  client_claim: false
  partnership_claim: false
  simulated_only: true
}

export interface SenseTrustInstitutionalPilotControlRoomState {
  state_id: string
  version: 'v2.5'
  pilots: SenseTrustInstitutionalPilot[]
  scopes: SenseTrustPilotScope[]
  raci_roles: SenseTrustPilotRaciRole[]
  governance_boards: SenseTrustPilotGovernanceBoard[]
  checkpoints: SenseTrustPilotCheckpoint[]
  acceptance_criteria: SenseTrustPilotAcceptanceCriterion[]
  supervised_acceptance_records: SenseTrustSupervisedAcceptanceRecord[]
  execution_risks: SenseTrustPilotExecutionRisk[]
  evidence_items: SenseTrustPilotEvidenceItem[]
  interruption_rules: SenseTrustPilotInterruptionRule[]
  status_boards: SenseTrustPilotStatusBoard[]
  decision_logs: SenseTrustPilotDecisionLog[]
  executive_reports: SenseTrustPilotExecutiveReport[]
  references: string[]
  data_classification: 'metadata_only'
  clinical_data_used: false
  real_patient_data_used: false
  real_clinical_operation_enabled: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  production_deploy_claimed: false
  real_lead_collection: false
  real_contract_enabled: false
  real_crm_enabled: false
  real_analytics_enabled: false
  real_email_automation_enabled: false
  contract_binding_claimed: false
  client_claim: false
  partnership_claim: false
  simulated_only: true
}

export interface SenseTrustInstitutionalPilotExportPayload {
  schema: 'sensetrust.institutional_pilot_control_room_export.v1'
  exported_at: string
  state: SenseTrustInstitutionalPilotControlRoomState
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustInstitutionalPilotValidationResult { valid: boolean; errors: string[] }
