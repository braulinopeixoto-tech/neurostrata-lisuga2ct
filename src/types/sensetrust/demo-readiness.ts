export type SenseTrustDemoAudienceType = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'press' | 'regulators' | 'internal_team'
export type SenseTrustVisualQAStatus = 'pass' | 'warning' | 'blocked' | 'not_applicable'
export type SenseTrustDemoReadinessStatus = 'draft' | 'internal_review' | 'ready_for_internal_demo' | 'ready_for_partner_demo' | 'legal_review_required' | 'blocked'
export type SenseTrustDemoRiskLevel = 'low' | 'medium' | 'high' | 'critical'

export interface SenseTrustVisualQACheck {
  check_id: string
  title: string
  area: string
  route: string
  status: SenseTrustVisualQAStatus
  severity: SenseTrustDemoRiskLevel
  finding: string
  recommendation: string
  blocks_demo: boolean
  requires_human_review: boolean
  simulated_only: true
}

export interface SenseTrustDemoStep {
  step_id: string
  order: number
  title: string
  route: string
  objective: string
  talk_track: string
  visual_focus: string
  expected_user_understanding: string
  disclosure_to_reinforce: string
  prohibited_claims: string[]
  transition_to_next_step: string
}

export interface SenseTrustDemoScript {
  script_id: string
  title: string
  status: SenseTrustDemoReadinessStatus
  steps: SenseTrustDemoStep[]
  estimated_minutes: number
}

export interface SenseTrustDemoAudience {
  audience_id: string
  audience_type: SenseTrustDemoAudienceType
  focus: string
  pain: string
  safe_promise: string
  required_disclosure: string
}

export interface SenseTrustDemoReadinessScore {
  score_id: string
  score: number
  status: SenseTrustDemoReadinessStatus
  blockers: number
  warnings: number
  rationale: string
}

export interface SenseTrustPresentationChecklist {
  item_id: string
  phase: 'before_demo' | 'during_demo' | 'after_demo'
  requirement: string
  authorized_material: string
  prohibited_material: string
  requires_human_review: boolean
}

export interface SenseTrustVisualIssue {
  issue_id: string
  route: string
  issue: string
  severity: SenseTrustDemoRiskLevel
  non_blocking: boolean
}

export interface SenseTrustDemoRisk {
  risk_id: string
  risk: string
  level: SenseTrustDemoRiskLevel
  affected_audience: SenseTrustDemoAudienceType
  mitigation: string
  disclosure: string
  blocks_demo: boolean
}

export interface SenseTrustDemoTalkTrack {
  track_id: string
  audience: SenseTrustDemoAudienceType
  focus: string
  safe_phrase: string
  prohibited_phrase: string
  cta: string
  disclosure: string
}

export interface SenseTrustDemoObjection {
  objection_id: string
  objection: string
  safe_response: string
  permitted_claim: string
  prohibited_claim: string
  next_step: string
  requires_review: boolean
}

export interface SenseTrustDemoScenario {
  scenario_id: string
  title: string
  audience: SenseTrustDemoAudienceType
  steps: string[]
  outcome: string
}

export interface SenseTrustDemoGovernanceItem {
  governance_id: string
  topic: string
  rule: string
  owner: 'institutional' | 'legal' | 'privacy' | 'clinical' | 'commercial'
  approval_required: boolean
}

export interface SenseTrustDemoReadinessValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustDemoReadinessState {
  state_id: string
  version: 'v2.1'
  status: SenseTrustDemoReadinessStatus
  visual_qa_checks: SenseTrustVisualQACheck[]
  demo_script: SenseTrustDemoScript
  audiences: SenseTrustDemoAudience[]
  readiness_score: SenseTrustDemoReadinessScore
  presentation_checklist: SenseTrustPresentationChecklist[]
  visual_issues: SenseTrustVisualIssue[]
  demo_risks: SenseTrustDemoRisk[]
  talk_tracks: SenseTrustDemoTalkTrack[]
  objections: SenseTrustDemoObjection[]
  demo_scenarios: SenseTrustDemoScenario[]
  governance_items: SenseTrustDemoGovernanceItem[]
  references: string[]
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  production_deploy_claimed: false
  real_lead_collection: false
  real_analytics_enabled: false
  simulated_only: true
}

export interface SenseTrustDemoReadinessExportPayload {
  schema: 'sensetrust.demo_readiness_export.v1'
  exported_at: string
  state: SenseTrustDemoReadinessState
  public_exposure: 'metadata_only'
  simulated_only: true
}
