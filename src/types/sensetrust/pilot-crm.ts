export type SenseTrustPilotPipelineStage =
  | 'prospect'
  | 'invited'
  | 'qualified'
  | 'onboarding_sent'
  | 'terms_pending'
  | 'consent_pending'
  | 'agreement_pending'
  | 'demo_scheduled'
  | 'demo_completed'
  | 'feedback_pending'
  | 'go_no_go_review'
  | 'approved_for_next_phase'
  | 'rejected'
  | 'paused'
  | 'archived'

export type SenseTrustPilotStatus = 'active' | 'pending' | 'blocked' | 'paused' | 'completed' | 'rejected' | 'simulated_only'
export type SenseTrustPilotPriority = 'low' | 'medium' | 'high' | 'strategic'
export type SenseTrustPilotDocumentStatus = 'not_sent' | 'sent' | 'viewed' | 'pending_signature' | 'accepted' | 'rejected' | 'needs_legal_review'
export type SenseTrustPilotRiskLevel = 'low' | 'moderate' | 'high' | 'critical'
export type SenseTrustPilotGoNoGoDecision = 'go' | 'go_with_restrictions' | 'no_go' | 'hold' | 'needs_more_data'
export type SenseTrustPilotCRMActivityType =
  | 'invite_sent'
  | 'terms_sent'
  | 'consent_pending'
  | 'demo_scheduled'
  | 'feedback_collected'
  | 'go_no_go_recorded'
  | 'risk_updated'

export interface SenseTrustPilotLead {
  lead_id: string
  organization_name: string
  source: 'simulated_outbound' | 'simulated_referral' | 'simulated_partner'
  simulated_only: true
}

export interface SenseTrustPilotOrganization {
  organization_id: string
  organization_name: string
  organization_type: 'clinic' | 'legal_group' | 'public_secretariat' | 'multiprofessional_team' | 'vitalstrata_project'
  simulated_only: true
}

export interface SenseTrustPilotContact {
  contact_id: string
  organization_id: string
  name_simulated: string
  role: string
  email_simulated: string
  simulated_only: true
}

export interface SenseTrustPilotFeedback {
  feedback_id: string
  record_id: string
  summary: string
  sentiment: 'positive' | 'neutral' | 'concerned'
  simulated_only: true
}

export interface SenseTrustPilotDecision {
  decision_id: string
  record_id: string
  decision: SenseTrustPilotGoNoGoDecision
  reason: string
  decided_at: string
  simulated_only: true
}

export interface SenseTrustPilotCRMActivity {
  activity_id: string
  record_id: string
  activity_type: SenseTrustPilotCRMActivityType
  summary: string
  occurred_at: string
  simulated_only: true
}

export interface SenseTrustPilotCRMRecord {
  record_id: string
  organization_id: string
  organization_name: string
  organization_type: string
  primary_contact_name: string
  primary_contact_role: string
  primary_contact_email_simulated: string
  pipeline_stage: SenseTrustPilotPipelineStage
  status: SenseTrustPilotStatus
  priority: SenseTrustPilotPriority
  onboarding_status: SenseTrustPilotDocumentStatus
  terms_status: SenseTrustPilotDocumentStatus
  consent_status: SenseTrustPilotDocumentStatus
  agreement_status: SenseTrustPilotDocumentStatus
  data_policy_status: SenseTrustPilotDocumentStatus
  raci_status: SenseTrustPilotDocumentStatus
  demo_status: SenseTrustPilotDocumentStatus
  feedback_status: SenseTrustPilotDocumentStatus
  risk_level: SenseTrustPilotRiskLevel
  risk_notes: string
  go_no_go_decision: SenseTrustPilotGoNoGoDecision
  next_action: string
  owner: string
  activities: SenseTrustPilotCRMActivity[]
  feedback: SenseTrustPilotFeedback[]
  created_at: string
  updated_at: string
  public_exposure: 'metadata_only'
  data_classification: 'simulated_operational_metadata'
  simulated_only: true
}

export interface SenseTrustPilotCRMState {
  records: SenseTrustPilotCRMRecord[]
  metrics: SenseTrustPilotCRMMetric[]
  simulated_only: true
}

export interface SenseTrustPilotCRMFilter {
  stage?: SenseTrustPilotPipelineStage
  status?: SenseTrustPilotStatus
  risk_level?: SenseTrustPilotRiskLevel
  priority?: SenseTrustPilotPriority
}

export interface SenseTrustPilotCRMMetric {
  metric_id: string
  label: string
  value: number
}

export interface SenseTrustPilotCRMReadiness {
  record_id: string
  score: number
  passed: string[]
  pending: string[]
}

export interface SenseTrustPilotCRMExportPayload {
  schema: 'sensetrust.pilot_crm_export.v1'
  exported_at: string
  records: SenseTrustPilotCRMRecord[]
  public_exposure: 'metadata_only'
  simulated_only: true
}
