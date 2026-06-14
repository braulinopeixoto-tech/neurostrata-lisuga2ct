export type SenseTrustPricingTier =
  | 'demo_controlado'
  | 'professional'
  | 'clinic'
  | 'institutional'
  | 'government'
  | 'enterprise'

export type SenseTrustPricingModel =
  | 'free_demo'
  | 'paid_pilot'
  | 'monthly_subscription'
  | 'annual_contract'
  | 'per_certificate'
  | 'hybrid_subscription_usage'
  | 'custom_contract'

export type SenseTrustCommercialDecision =
  | 'validate_paid_pilot'
  | 'offer_extended_demo'
  | 'test_professional_plan'
  | 'test_clinic_plan'
  | 'test_institutional_contract'
  | 'adjust_pricing'
  | 'delay_monetization'
  | 'reject_segment'

export type SenseTrustRevenueValidationScenario = 'conservative' | 'base' | 'accelerated' | 'institutional'

export interface SenseTrustPlanFeature {
  feature_id: string
  label: string
  included: boolean
}

export interface SenseTrustUsageLimit {
  limit_id: string
  label: string
  value: number | 'custom'
  period: 'month' | 'pilot' | 'contract'
}

export interface SenseTrustPricingPlan {
  plan_id: string
  plan_name: string
  tier: SenseTrustPricingTier
  model: SenseTrustPricingModel
  monthly_price_brl_simulated: number
  annual_price_brl_simulated: number
  per_certificate_price_brl_simulated: number
  included_certificates: number | 'custom'
  included_users: number | 'custom'
  included_organizations: number | 'custom'
  features: SenseTrustPlanFeature[]
  usage_limits: SenseTrustUsageLimit[]
  intended_segment: string
  value_proposition: string
  restrictions: string[]
  simulated_only: true
  billing_real_implemented: false
  legal_signature_real_implemented: false
  data_classification: 'simulated_commercial_metadata'
}

export interface SenseTrustPricingMetric {
  metric_id: string
  label: string
  value: number
}

export interface SenseTrustPricingHypothesis {
  hypothesis_id: string
  statement: string
  confidence_score: number
  evidence_source: string
  simulated_only: true
}

export interface SenseTrustRevenueScenario {
  scenario: SenseTrustRevenueValidationScenario
  pilot_count: number
  simulated_conversion_rate: number
  simulated_average_ticket_brl: number
  simulated_monthly_revenue_brl: number
  simulated_annual_revenue_brl: number
  main_risk: string
  main_assumption: string
  recommended_decision: SenseTrustCommercialDecision
  simulated_only: true
}

export interface SenseTrustCommercialOffer {
  offer_id: string
  offer_name: string
  target_segment: string
  recommended_plan_id: string
  commercial_message: string
  restrictions: string[]
  simulated_only: true
}

export interface SenseTrustPaidPilotOffer {
  offer_id: string
  plan_id: string
  scope: string
  duration_days: string
  usage_limit: string
  deliverables: string[]
  simulated_price_range_brl: string
  conditions: string[]
  out_of_scope: string[]
  billing_real_implemented: false
  simulated_only: true
}

export interface SenseTrustPriceObjection {
  objection: string
  short_answer: string
  commercial_answer: string
  technical_answer: string
  mitigation: string
  recommended_plan: string
  impact: 'low' | 'moderate' | 'high'
}

export interface SenseTrustRevenueSignal {
  signal_id: string
  segment: string
  signal: string
  strength: 'low' | 'moderate' | 'high'
}

export interface SenseTrustCommercialSegment {
  segment: string
  commercial_fit_score: number
  perceived_value_score: number
  purchase_intent_score: number
  potential_ticket_brl: number
  risk_level: 'low' | 'moderate' | 'high' | 'critical'
  recommended_plan_id: string
}

export interface SenseTrustPricingRecommendation {
  recommended_plan_id: string
  priority_segment: string
  recommended_decision: SenseTrustCommercialDecision
  rationale: string
  restrictions: string[]
  simulated_only: true
}

export interface SenseTrustWillingnessToPaySignal {
  segment: string
  score: number
  evidence: string
}

export interface SenseTrustPlanFitScore {
  plan_id: string
  segment: string
  score: number
}

export interface SenseTrustRevenueReadinessScore {
  score_id: string
  score: number
  value_clarity: number
  purchase_intent: number
  commercial_risk: number
  legal_risk: number
  operational_maturity: number
}

export interface SenseTrustPricingStrategyState {
  plans: SenseTrustPricingPlan[]
  paid_pilot_offers: SenseTrustPaidPilotOffer[]
  revenue_scenarios: SenseTrustRevenueScenario[]
  commercial_segments: SenseTrustCommercialSegment[]
  objections: SenseTrustPriceObjection[]
  revenue_signals: SenseTrustRevenueSignal[]
  readiness_score: SenseTrustRevenueReadinessScore
  recommendation: SenseTrustPricingRecommendation
  public_exposure: 'metadata_only'
  simulated_only: true
}

export interface SenseTrustPricingExportPayload {
  schema: 'sensetrust.pricing_strategy_export.v1'
  exported_at: string
  state: SenseTrustPricingStrategyState
  public_exposure: 'metadata_only'
  simulated_only: true
  billing_real_implemented: false
}
