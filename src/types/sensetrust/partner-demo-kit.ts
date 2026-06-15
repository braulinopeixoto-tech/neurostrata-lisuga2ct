export type SenseTrustPartnerAudienceType = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'press' | 'regulators' | 'internal_team'
export type SenseTrustDemoMaterialStatus = 'draft' | 'internal_review' | 'approved_for_controlled_demo' | 'legal_review_required' | 'blocked'
export type SenseTrustDemoMeetingStage = 'pre_meeting' | 'opening' | 'discovery' | 'demonstration' | 'objection_handling' | 'next_steps' | 'follow_up' | 'governance_review'
export type SenseTrustPartnerDemoRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface SenseTrustDemoOnePager {
  one_pager_id: string
  title: string
  subtitle: string
  problem: string
  solution: string
  certifies: string[]
  does_not_certify: string[]
  proof_points: string[]
  safe_cta: string
  required_disclosure: string
}

export interface SenseTrustDemoAudienceBriefing {
  briefing_id: string
  audience_type: SenseTrustPartnerAudienceType
  audience_name: string
  primary_goal: string
  main_pain: string
  safe_promise: string
  permitted_language: string
  prohibited_language: string
  recommended_route: string
  recommended_materials: string[]
  required_disclosures: string[]
  suggested_cta: string
  next_step: string
  simulated_only: true
}

export interface SenseTrustMeetingAgenda {
  agenda_id: string
  audience: SenseTrustPartnerAudienceType
  items: string[]
  duration_minutes: number
}

export interface SenseTrustMeetingScript {
  script_id: string
  audience: SenseTrustPartnerAudienceType
  opening: string
  framing: string
  discovery: string
  demonstration: string
  objection_handling: string
  next_steps: string
  closing: string
  permitted_phrase: string
  prohibited_phrase: string
}

export interface SenseTrustPreMeetingChecklist {
  checklist_id: string
  items: string[]
  all_real_data_removed: true
  disclosures_ready: true
}

export interface SenseTrustPostDemoChecklist {
  checklist_id: string
  items: string[]
  feedback_real_collection_enabled: false
}

export interface SenseTrustAuthorizedMaterial {
  material_id: string
  title: string
  material_type: string
  audience: SenseTrustPartnerAudienceType
  status: SenseTrustDemoMaterialStatus
  purpose: string
  allowed_use: string
  prohibited_use: string
  requires_human_review: boolean
  data_classification: 'metadata_only'
  clinical_data_used: false
  simulated_only: true
}

export interface SenseTrustProhibitedMaterial {
  material_id: string
  title: string
  reason: string
  blocked_claim: string
  safe_replacement: string
}

export interface SenseTrustDemoFeedbackMock {
  feedback_id: string
  prompt: string
  dimension: 'clarity' | 'value' | 'risk' | 'objection' | 'next_step'
  simulated_response: string
  real_collection_enabled: false
}

export interface SenseTrustFollowUpSequence {
  sequence_id: string
  audience: SenseTrustPartnerAudienceType
  message: string
  allowed_materials: string[]
  timing: string
  next_step: string
  blockers: string[]
  automation_enabled: false
}

export interface SenseTrustPartnerDemoRisk {
  risk_id: string
  risk: string
  level: SenseTrustPartnerDemoRiskLevel
  audience: SenseTrustPartnerAudienceType
  mitigation: string
  related_material: string
  blocks_meeting: boolean
}

export interface SenseTrustDemoHandoffGovernance {
  governance_id: string
  topic: string
  rule: string
  owner: 'institutional' | 'legal' | 'privacy' | 'clinical' | 'commercial'
  approval_required: boolean
}

export interface SenseTrustPartnerDemoReadinessScore {
  score_id: string
  score: number
  status: SenseTrustDemoMaterialStatus
  blockers: number
  warnings: number
  rationale: string
}

export interface SenseTrustPartnerDemoKit {
  kit_id: string
  title: string
  status: SenseTrustDemoMaterialStatus
  one_pager: SenseTrustDemoOnePager
  audience_briefings: SenseTrustDemoAudienceBriefing[]
  meeting_scripts: SenseTrustMeetingScript[]
  meeting_agendas: SenseTrustMeetingAgenda[]
}

export interface SenseTrustPartnerDemoKitValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustPartnerDemoKitState {
  state_id: string
  version: 'v2.2'
  partner_demo_kit: SenseTrustPartnerDemoKit
  pre_meeting_checklist: SenseTrustPreMeetingChecklist
  post_demo_checklist: SenseTrustPostDemoChecklist
  authorized_materials: SenseTrustAuthorizedMaterial[]
  prohibited_materials: SenseTrustProhibitedMaterial[]
  feedback_mock: SenseTrustDemoFeedbackMock[]
  follow_up_sequences: SenseTrustFollowUpSequence[]
  risks: SenseTrustPartnerDemoRisk[]
  handoff_governance: SenseTrustDemoHandoffGovernance[]
  readiness_score: SenseTrustPartnerDemoReadinessScore
  references: string[]
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  production_deploy_claimed: false
  real_lead_collection: false
  real_analytics_enabled: false
  contract_binding_claimed: false
  simulated_only: true
}

export interface SenseTrustPartnerDemoKitExportPayload {
  schema: 'sensetrust.partner_demo_kit_export.v1'
  exported_at: string
  state: SenseTrustPartnerDemoKitState
  public_exposure: 'metadata_only'
  simulated_only: true
}
