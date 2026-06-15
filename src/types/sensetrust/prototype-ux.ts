export type SenseTrustPrototypeRouteType = 'home' | 'how_it_works' | 'trust_layer' | 'dnda' | 'public_verification' | 'for_clinics' | 'for_public_sector' | 'for_legal_partners' | 'for_investors' | 'pilots_partnerships' | 'faq' | 'contact_mockup'
export type SenseTrustPrototypeInteractionType = 'navigate' | 'open_modal' | 'simulate_cta' | 'open_disclosure' | 'toggle_audience' | 'view_mock_verification' | 'open_faq' | 'submit_mock_form_blocked'
export type SenseTrustPrototypeStatus = 'draft' | 'internal_review' | 'ux_review' | 'legal_review_pending' | 'ready_for_demo' | 'blocked'
export type SenseTrustPrototypeVisualStatus = 'covered' | 'mocked' | 'needs_review' | 'blocked'
export type SenseTrustPrototypeRouteStatus = 'simulated_public_route' | 'internal_demo_route' | 'review_required' | 'blocked'
export type SenseTrustPrototypeAudience = 'clinics' | 'public_sector' | 'legal_partners' | 'investors' | 'institutions' | 'general_public'

export interface SenseTrustPrototypeSection {
  section_id: string
  route_id: string
  title: string
  body: string
  visual_status: SenseTrustPrototypeVisualStatus
  order: number
}

export interface SenseTrustPrototypePage {
  page_id: string
  title: string
  summary: string
  sections: SenseTrustPrototypeSection[]
  visual_status: SenseTrustPrototypeVisualStatus
}

export interface SenseTrustPrototypeNavigationItem {
  nav_id: string
  label: string
  route_path: string
  route_type: SenseTrustPrototypeRouteType
  order: number
}

export interface SenseTrustPrototypeCTA {
  cta_id: string
  label: string
  interaction_type: SenseTrustPrototypeInteractionType
  target_route: string
  status: 'simulated_only' | 'blocked_for_real_submit'
}

export interface SenseTrustPrototypeInteraction {
  interaction_id: string
  type: SenseTrustPrototypeInteractionType
  label: string
  result: string
  allowed: boolean
}

export interface SenseTrustPrototypeDisclosure {
  disclosure_id: string
  statement: string
  required_on_routes: SenseTrustPrototypeRouteType[]
}

export interface SenseTrustPrototypeRoute {
  route_id: string
  route_path: string
  route_type: SenseTrustPrototypeRouteType
  title: string
  subtitle: string
  audience: SenseTrustPrototypeAudience[]
  page: SenseTrustPrototypePage
  navigation_items: SenseTrustPrototypeNavigationItem[]
  primary_cta: SenseTrustPrototypeCTA
  secondary_cta: SenseTrustPrototypeCTA
  disclosures: SenseTrustPrototypeDisclosure[]
  allowed_interactions: SenseTrustPrototypeInteraction[]
  prohibited_interactions: SenseTrustPrototypeInteraction[]
  publication_status: SenseTrustPrototypeStatus
  route_status: SenseTrustPrototypeRouteStatus
  data_classification: 'public_metadata_only'
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_lead_collection: false
  real_analytics_enabled: false
  production_deploy_claimed: false
  simulated_only: true
}

export interface SenseTrustPrototypeAudienceFlow {
  flow_id: string
  audience: SenseTrustPrototypeAudience
  entry_route: string
  route_sequence: string[]
  intent: string
  blocker: string
}

export interface SenseTrustPrototypeMockLeadForm {
  form_id: string
  title: string
  fields: string[]
  prohibited_fields: string[]
  submit_interaction: 'submit_mock_form_blocked'
  real_submit_enabled: false
  real_lead_collection: false
}

export interface SenseTrustPrototypeDemoScenario {
  scenario_id: string
  title: string
  audience: SenseTrustPrototypeAudience
  steps: string[]
  expected_learning: string
}

export interface SenseTrustPrototypeValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustPrototypeUXState {
  state_id: string
  version: 'v2.0'
  status: SenseTrustPrototypeStatus
  routes: SenseTrustPrototypeRoute[]
  pages: SenseTrustPrototypePage[]
  navigation: SenseTrustPrototypeNavigationItem[]
  ctas: SenseTrustPrototypeCTA[]
  interactions: SenseTrustPrototypeInteraction[]
  audience_flows: SenseTrustPrototypeAudienceFlow[]
  disclosures: SenseTrustPrototypeDisclosure[]
  mock_forms: SenseTrustPrototypeMockLeadForm[]
  demo_scenarios: SenseTrustPrototypeDemoScenario[]
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

export interface SenseTrustPrototypeExportPayload {
  schema: 'sensetrust.prototype_ux_export.v1'
  exported_at: string
  state: SenseTrustPrototypeUXState
  public_exposure: 'metadata_only'
  simulated_only: true
}
