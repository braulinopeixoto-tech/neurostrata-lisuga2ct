export type SenseTrustPipelineAudienceType = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'press' | 'regulators' | 'internal_team'
export type SenseTrustPipelineStageType = 'identified' | 'demo_completed' | 'feedback_recorded' | 'qualified_simulated' | 'human_review' | 'strategic_review' | 'legal_review_required' | 'go' | 'no_go' | 'defer' | 'blocked'
export type SenseTrustGoNoGoDecisionType = 'go' | 'no_go' | 'defer' | 'human_review_required' | 'legal_review_required' | 'blocked'
export type SenseTrustOpportunityPriorityLevel = 'low' | 'moderate' | 'high' | 'strategic'
export type SenseTrustPipelineRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface SenseTrustOpportunityPriorityScore { score_id: string; opportunity_id: string; score: number; priority_level: SenseTrustOpportunityPriorityLevel; rationale: string; simulated_only: true }
export interface SenseTrustInstitutionalReadinessScore { readiness_id: string; opportunity_id: string; institutional_score: number; technical_score: number; legal_score: number; governance_score: number; recommendation: string; simulated_only: true }
export interface SenseTrustPipelineRiskScore { risk_score_id: string; opportunity_id: string; score: number; risk_level: SenseTrustPipelineRiskLevel; rationale: string; simulated_only: true }

export interface SenseTrustPipelineOpportunity {
  opportunity_id: string
  opportunity_name: string
  audience_type: SenseTrustPipelineAudienceType
  pipeline_stage: SenseTrustPipelineStageType
  source_meeting_id: string
  meeting_intelligence_reference: string
  partner_demo_kit_reference: string
  main_interest_signal: string
  main_objection: string
  risk_level: SenseTrustPipelineRiskLevel
  priority_level: SenseTrustOpportunityPriorityLevel
  institutional_readiness_score: SenseTrustInstitutionalReadinessScore
  opportunity_priority_score: SenseTrustOpportunityPriorityScore
  pipeline_risk_score: SenseTrustPipelineRiskScore
  recommended_decision: SenseTrustGoNoGoDecisionType
  recommended_next_move: string
  human_review_required: boolean
  legal_review_required: boolean
  data_classification: 'metadata_only'
  clinical_data_used: false
  real_crm_enabled: false
  real_analytics_enabled: false
  real_email_automation_enabled: false
  contract_binding_claim: false
  simulated_only: true
}

export interface SenseTrustPipelineStage { stage_id: string; stage_type: SenseTrustPipelineStageType; entry_criteria: string[]; exit_criteria: string[]; blockers: string[]; human_review_required: boolean }
export interface SenseTrustPipelineDecision { decision_id: string; opportunity_id: string; decision_type: SenseTrustGoNoGoDecisionType; decision_reason: string; simulated_only: true }
export interface SenseTrustGoNoGoDecision {
  decision_id: string
  opportunity_id: string
  decision_type: SenseTrustGoNoGoDecisionType
  decision_reason: string
  evidence_summary: string
  required_review: string[]
  allowed_next_move: string
  blocked_actions: string[]
  risk_level: SenseTrustPipelineRiskLevel
  approved_by_human: boolean
  simulated_only: true
}
export interface SenseTrustPipelineRiskSignal { signal_id: string; opportunity_id: string; audience_type: SenseTrustPipelineAudienceType; risk_level: SenseTrustPipelineRiskLevel; impact: string; mitigation: string; blocks_go_no_go: boolean }
export interface SenseTrustHumanReviewQueueItem { queue_id: string; opportunity_id: string; audience_type: SenseTrustPipelineAudienceType; review_reason: string; risk_level: SenseTrustPipelineRiskLevel; simulated_owner: string; pending_decision: SenseTrustGoNoGoDecisionType }
export interface SenseTrustNextMoveRecommendation { recommendation_id: string; opportunity_id: string; next_move: string; authorized_material: string; suggested_meeting: string; blocked_action: string; rationale: string }
export interface SenseTrustPipelineStageGate { gate_id: string; stage_type: SenseTrustPipelineStageType; entry_criteria: string[]; exit_criteria: string[]; blockers: string[]; human_review_required: boolean }
export interface SenseTrustDecisionAuditTrailItem { audit_id: string; opportunity_id: string; previous_stage: SenseTrustPipelineStageType; next_stage: SenseTrustPipelineStageType; reason: string; simulated_date_label: string; metadata_only: true }
export interface SenseTrustRelationshipGovernanceBoard { board_id: string; contact_policy: string; material_policy: string; usage_limits: string[]; partnership_disclosure_rule: string; human_review_required: true }
export interface SenseTrustPipelineDecisionBoard { board_id: string; title: string; opportunities: SenseTrustPipelineOpportunity[]; decisions: SenseTrustGoNoGoDecision[]; human_review_queue: SenseTrustHumanReviewQueueItem[]; relationship_governance: SenseTrustRelationshipGovernanceBoard }
export interface SenseTrustPipelineGovernanceValidationResult { valid: boolean; errors: string[] }

export interface SenseTrustPipelineGovernanceState {
  state_id: string
  version: 'v2.4'
  opportunities: SenseTrustPipelineOpportunity[]
  stages: SenseTrustPipelineStage[]
  decision_board: SenseTrustPipelineDecisionBoard
  decisions: SenseTrustPipelineDecision[]
  go_no_go_decisions: SenseTrustGoNoGoDecision[]
  priority_scores: SenseTrustOpportunityPriorityScore[]
  readiness_scores: SenseTrustInstitutionalReadinessScore[]
  risk_scores: SenseTrustPipelineRiskScore[]
  risk_signals: SenseTrustPipelineRiskSignal[]
  human_review_queue: SenseTrustHumanReviewQueueItem[]
  next_move_recommendations: SenseTrustNextMoveRecommendation[]
  stage_gates: SenseTrustPipelineStageGate[]
  decision_audit_trail: SenseTrustDecisionAuditTrailItem[]
  relationship_governance_board: SenseTrustRelationshipGovernanceBoard
  references: string[]
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  production_deploy_claimed: false
  real_lead_collection: false
  real_crm_enabled: false
  real_analytics_enabled: false
  real_email_automation_enabled: false
  contract_binding_claimed: false
  real_client_claimed: false
  simulated_only: true
}

export interface SenseTrustPipelineGovernanceExportPayload { schema: 'sensetrust.pipeline_governance_export.v1'; exported_at: string; state: SenseTrustPipelineGovernanceState; public_exposure: 'metadata_only'; simulated_only: true }
