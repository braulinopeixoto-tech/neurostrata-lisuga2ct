export type SenseTrustPilotFeedbackSource = 'pilot_crm' | 'pilot_demo' | 'pilot_onboarding' | 'pilot_package' | 'simulated_interview'

export type SenseTrustPilotFeedbackCategory =
  | 'usability'
  | 'trust'
  | 'clarity'
  | 'legal'
  | 'privacy'
  | 'workflow'
  | 'commercial'
  | 'technical'
  | 'training'
  | 'perceived_value'
  | 'risk'
  | 'go_to_market'

export type SenseTrustPilotFeedbackSentiment = 'positive' | 'neutral' | 'negative' | 'mixed' | 'unclear'
export type SenseTrustPilotPurchaseIntent = 'high' | 'moderate' | 'low' | 'none' | 'unknown'
export type SenseTrustPilotFeedbackDecision =
  | 'proceed_to_paid_pilot'
  | 'proceed_to_extended_demo'
  | 'needs_product_adjustment'
  | 'needs_legal_review'
  | 'pause_segment'
  | 'reject_segment'
  | 'collect_more_feedback'

export interface SenseTrustPilotFeedbackItem {
  feedback_id: string
  organization_id: string
  organization_name: string
  organization_type: string
  source: SenseTrustPilotFeedbackSource
  category: SenseTrustPilotFeedbackCategory
  sentiment: SenseTrustPilotFeedbackSentiment
  score: number
  comment_simulated: string
  objection_type: string
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  purchase_intent: SenseTrustPilotPurchaseIntent
  perceived_value_score: number
  acceptance_score: number
  next_action: string
  created_at: string
  data_classification: 'simulated_operational_metadata'
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotAcceptanceMetric {
  metric_id: string
  label: string
  score: number
  demo_completed: boolean
  terms_understood: boolean
  metadata_only_understood: boolean
  legal_limits_understood: boolean
  go_no_go_trend: string
}

export interface SenseTrustPilotValueMetric {
  metric_id: string
  label: string
  perceived_value_score: number
  document_confidence_score: number
  clarity_score: number
  perceived_safety_score: number
  usage_intent_score: number
  purchase_intent: SenseTrustPilotPurchaseIntent
}

export interface SenseTrustPilotObjection {
  objection_type: string
  count: number
  impact: 'low' | 'moderate' | 'high'
  mitigation: string
}

export interface SenseTrustPilotRiskPattern {
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  count: number
  pattern: string
  mitigation: string
}

export interface SenseTrustPilotSegmentSignal {
  segment: string
  fit_score: number
  perceived_value_score: number
  purchase_intent: SenseTrustPilotPurchaseIntent
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  recommendation: SenseTrustPilotFeedbackDecision
}

export interface SenseTrustPilotGTMRecommendation {
  route: string
  priority_segment: string
  entry_offer: string
  recommended_messages: string[]
  restrictions: string[]
  readiness_score: number
  decision: SenseTrustPilotFeedbackDecision
}

export interface SenseTrustPilotFeedbackScore {
  score_id: string
  acceptance_score: number
  perceived_value_score: number
  trust_clarity_score: number
  privacy_confidence_score: number
  commercial_intent_score: number
  go_to_market_readiness: number
}

export interface SenseTrustPilotMarketSignal {
  signal_id: string
  segment: string
  signal: string
  strength: 'low' | 'moderate' | 'high'
}

export interface SenseTrustPilotProductSignal {
  signal_id: string
  category: SenseTrustPilotFeedbackCategory
  signal: string
  priority: 'low' | 'medium' | 'high'
}

export interface SenseTrustPilotFeedbackQuestionnaire {
  questionnaire_id: string
  questions: string[]
  scale: '0_to_10'
  simulated_only: true
}

export interface SenseTrustPilotFeedbackCohort {
  cohort_id: string
  label: string
  organization_ids: string[]
  simulated_only: true
}

export interface SenseTrustPilotFeedbackReport {
  report_id: string
  period: string
  pilots_evaluated: number
  score: SenseTrustPilotFeedbackScore
  objections: SenseTrustPilotObjection[]
  risks: SenseTrustPilotRiskPattern[]
  market_signals: SenseTrustPilotMarketSignal[]
  product_signals: SenseTrustPilotProductSignal[]
  gtm_recommendation: SenseTrustPilotGTMRecommendation
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotFeedbackIntelligenceState {
  feedback_items: SenseTrustPilotFeedbackItem[]
  acceptance_metrics: SenseTrustPilotAcceptanceMetric[]
  value_metrics: SenseTrustPilotValueMetric[]
  objections: SenseTrustPilotObjection[]
  risk_patterns: SenseTrustPilotRiskPattern[]
  segment_signals: SenseTrustPilotSegmentSignal[]
  market_signals: SenseTrustPilotMarketSignal[]
  product_signals: SenseTrustPilotProductSignal[]
  gtm_recommendation: SenseTrustPilotGTMRecommendation
  report: SenseTrustPilotFeedbackReport
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPilotFeedbackExportPayload {
  schema: 'sensetrust.pilot_feedback_intelligence_export.v1'
  exported_at: string
  report: SenseTrustPilotFeedbackReport
  feedback_items: SenseTrustPilotFeedbackItem[]
  public_exposure: 'metadata_only'
  simulated_only: true
}
