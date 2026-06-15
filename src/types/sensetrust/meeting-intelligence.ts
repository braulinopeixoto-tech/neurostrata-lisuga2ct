export type SenseTrustMeetingAudienceType = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'press' | 'regulators' | 'internal_team'
export type SenseTrustMeetingStatus = 'planned' | 'completed_simulated' | 'feedback_recorded' | 'follow_up_pending' | 'human_review_required' | 'blocked'
export type SenseTrustMeetingInterestLevel = 'low' | 'moderate' | 'high' | 'strategic'
export type SenseTrustMeetingRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type SenseTrustNextStepType = 'send_authorized_material' | 'schedule_follow_up' | 'request_legal_review' | 'request_technical_demo' | 'request_public_sector_review' | 'request_investor_room' | 'defer' | 'block'

export interface SenseTrustMeetingParticipantProfile {
  profile_id: string
  audience_type: SenseTrustMeetingAudienceType
  role_summary: string
  organization_profile: string
  personal_data_recorded: false
  simulated_only: true
}

export interface SenseTrustMeetingAudience {
  audience_id: string
  audience_type: SenseTrustMeetingAudienceType
  audience_name: string
  primary_interest: string
  required_disclosure: string
}

export interface SenseTrustMeetingObjective {
  objective_id: string
  summary: string
  success_condition: string
  forbidden_goal: string
}

export interface SenseTrustMeetingFeedbackItem {
  feedback_id: string
  audience_type: SenseTrustMeetingAudienceType
  dimension: 'clarity' | 'value' | 'risk' | 'trust' | 'next_step'
  prompt: string
  simulated_response: string
  real_collection_enabled: false
}

export interface SenseTrustMeetingObjection {
  objection_id: string
  audience_type: SenseTrustMeetingAudienceType
  objection_text: string
  objection_category: string
  risk_level: SenseTrustMeetingRiskLevel
  safe_response: string
  prohibited_response: string
  recommended_next_step: SenseTrustNextStepType
  requires_human_review: boolean
  simulated_only: true
}

export interface SenseTrustMeetingInterestSignal {
  signal_id: string
  audience_type: SenseTrustMeetingAudienceType
  interest_level: SenseTrustMeetingInterestLevel
  signal: string
  simulated_evidence: string
  recommended_next_step: SenseTrustNextStepType
  associated_risk: SenseTrustMeetingRiskLevel
}

export interface SenseTrustMeetingRiskSignal {
  risk_id: string
  audience_type: SenseTrustMeetingAudienceType
  risk_level: SenseTrustMeetingRiskLevel
  source: string
  mitigation: string
  blocks_follow_up: boolean
  requires_human_review: boolean
}

export interface SenseTrustMeetingNextStep {
  next_step_id: string
  type: SenseTrustNextStepType
  audience_type: SenseTrustMeetingAudienceType
  description: string
  authorized_material: string
  owner: 'institutional' | 'legal' | 'privacy' | 'clinical' | 'commercial'
  simulated_due_label: string
  blockers: string[]
  requires_human_review: boolean
}

export interface SenseTrustMeetingFollowUpGovernance {
  governance_id: string
  audience_type: SenseTrustMeetingAudienceType
  allowed_materials: string[]
  prohibited_materials: string[]
  authorized_message: string
  human_approval_required: boolean
  real_automation_enabled: false
}

export interface SenseTrustMeetingOpportunityScore {
  score_id: string
  audience_type: SenseTrustMeetingAudienceType
  opportunity_score: number
  risk_score: number
  readiness_score: number
  recommended_decision: 'advance_controlled' | 'hold_for_review' | 'defer' | 'block'
  score_limit: string
  simulated_only: true
}

export interface SenseTrustMeetingReadinessScore {
  readiness_id: string
  audience_type: SenseTrustMeetingAudienceType
  score: number
  blockers: number
  warnings: number
  status: SenseTrustMeetingStatus
}

export interface SenseTrustMeetingInsight {
  insight_id: string
  category: 'objection_pattern' | 'interest_pattern' | 'risk_pattern' | 'demo_improvement' | 'material_signal'
  summary: string
  recommendation: string
}

export interface SenseTrustMeetingDecision {
  decision_id: string
  audience_type: SenseTrustMeetingAudienceType
  decision: 'advance' | 'review' | 'defer' | 'block'
  rationale: string
  next_step_type: SenseTrustNextStepType
}

export interface SenseTrustMeetingRecord {
  meeting_id: string
  meeting_title: string
  audience_type: SenseTrustMeetingAudienceType
  meeting_status: SenseTrustMeetingStatus
  meeting_date_label: string
  participants_profile: SenseTrustMeetingParticipantProfile
  objective: SenseTrustMeetingObjective
  demo_materials_used: string[]
  feedback_items: SenseTrustMeetingFeedbackItem[]
  objections: SenseTrustMeetingObjection[]
  interest_signals: SenseTrustMeetingInterestSignal[]
  risk_signals: SenseTrustMeetingRiskSignal[]
  next_steps: SenseTrustMeetingNextStep[]
  opportunity_score: SenseTrustMeetingOpportunityScore
  follow_up_governance: SenseTrustMeetingFollowUpGovernance
  data_classification: 'metadata_only'
  clinical_data_used: false
  real_lead_collection: false
  real_crm_enabled: false
  real_analytics_enabled: false
  real_email_automation_enabled: false
  contract_binding_claim: false
  simulated_only: true
}

export interface SenseTrustMeetingIntelligenceValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustMeetingIntelligenceState {
  state_id: string
  version: 'v2.3'
  meeting_records: SenseTrustMeetingRecord[]
  audiences: SenseTrustMeetingAudience[]
  feedback_items: SenseTrustMeetingFeedbackItem[]
  objections: SenseTrustMeetingObjection[]
  interest_signals: SenseTrustMeetingInterestSignal[]
  risk_signals: SenseTrustMeetingRiskSignal[]
  next_steps: SenseTrustMeetingNextStep[]
  follow_up_governance: SenseTrustMeetingFollowUpGovernance[]
  opportunity_scores: SenseTrustMeetingOpportunityScore[]
  readiness_scores: SenseTrustMeetingReadinessScore[]
  insights: SenseTrustMeetingInsight[]
  decisions: SenseTrustMeetingDecision[]
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
  simulated_only: true
}

export interface SenseTrustMeetingIntelligenceExportPayload {
  schema: 'sensetrust.meeting_intelligence_export.v1'
  exported_at: string
  state: SenseTrustMeetingIntelligenceState
  public_exposure: 'metadata_only'
  simulated_only: true
}
