export type SenseTrustWebsitePageType =
  | 'home'
  | 'problem'
  | 'solution'
  | 'how_it_works'
  | 'dnda'
  | 'sensetrust'
  | 'pilots'
  | 'partners'
  | 'investors'
  | 'faq'
  | 'contact'
  | 'legal'

export type SenseTrustWebsiteSectionType =
  | 'hero'
  | 'problem'
  | 'proof'
  | 'workflow'
  | 'audience'
  | 'cta'
  | 'disclosure'
  | 'faq'
  | 'trust'
  | 'conversion'

export type SenseTrustCTAType =
  | 'schedule_conversation'
  | 'request_pilot_info'
  | 'open_partnership_dialog'
  | 'download_public_brief'
  | 'review_safe_claims'
  | 'view_verification_concept'

export type SenseTrustWebsitePublicationStatus = 'draft' | 'internal_review' | 'legal_review_required' | 'approved_for_mockup' | 'blocked_for_publication'
export type SenseTrustWebsiteAudience = 'clinics' | 'institutions' | 'investors' | 'legal_partners' | 'public_sector' | 'research_partners' | 'patients_families_public'

export interface SenseTrustWebsitePage {
  page_id: string
  slug: string
  title: string
  page_type: SenseTrustWebsitePageType
  audience: SenseTrustWebsiteAudience[]
  primary_goal: string
  safe_positioning: string
  sections: SenseTrustWebsiteSection[]
  ctas: SenseTrustWebsiteCTA[]
  seo: SenseTrustSEOBlock
  publication_status: SenseTrustWebsitePublicationStatus
  data_classification: 'public_metadata_only'
  clinical_data_used: false
  production_deploy_claimed: false
  real_lead_collection_claimed: false
}

export interface SenseTrustWebsiteSection {
  section_id: string
  page_id: string
  type: SenseTrustWebsiteSectionType
  heading: string
  body: string
  claim_guardrail_ids: string[]
  order: number
}

export interface SenseTrustWebsiteCTA {
  cta_id: string
  label: string
  cta_type: SenseTrustCTAType
  target: string
  audience: SenseTrustWebsiteAudience
  status: 'simulated' | 'draft' | 'review_required'
  lead_collection_status: 'not_enabled'
}

export interface SenseTrustAudienceJourney {
  journey_id: string
  audience: SenseTrustWebsiteAudience
  entry_page: string
  intent: string
  recommended_path: string[]
  conversion_goal: string
  risk_disclosure: string
}

export interface SenseTrustConversionPath {
  path_id: string
  name: string
  pages: string[]
  cta_ids: string[]
  conversion_status: 'simulated_only'
}

export interface SenseTrustNavigationItem {
  nav_id: string
  label: string
  slug: string
  page_type: SenseTrustWebsitePageType
  order: number
}

export interface SenseTrustClaimGuardrail {
  guardrail_id: string
  prohibited_claim: string
  safe_replacement: string
  review_owner: 'clinical' | 'legal' | 'privacy' | 'institutional'
}

export interface SenseTrustSEOBlock {
  seo_id: string
  title: string
  description: string
  keywords: string[]
  safe_language_notes: string[]
}

export interface SenseTrustFormBlueprint {
  form_id: string
  name: string
  purpose: string
  fields: string[]
  collection_status: 'blueprint_only'
  pii_collection_enabled: false
  clinical_data_collection_enabled: false
}

export interface SenseTrustAnalyticsBlueprint {
  analytics_id: string
  event_name: string
  purpose: string
  payload_policy: 'anonymous_metadata_only'
  enabled_in_production: false
}

export interface SenseTrustWebsitePublicationChecklistItem {
  item_id: string
  area: 'content' | 'legal' | 'privacy' | 'security' | 'brand' | 'analytics'
  requirement: string
  status: 'pending' | 'ready_for_review' | 'blocked'
}

export interface SenseTrustWebsiteRiskDisclosure {
  disclosure_id: string
  category: 'implemented' | 'simulated' | 'planned' | 'pending_review' | 'not_implemented' | 'prohibited_to_promise'
  statement: string
}

export interface SenseTrustWebsiteBlueprintValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustWebsiteBlueprintState {
  state_id: string
  version: 'v1.9'
  pages: SenseTrustWebsitePage[]
  sections: SenseTrustWebsiteSection[]
  ctas: SenseTrustWebsiteCTA[]
  audience_journeys: SenseTrustAudienceJourney[]
  conversion_paths: SenseTrustConversionPath[]
  navigation: SenseTrustNavigationItem[]
  claim_guardrails: SenseTrustClaimGuardrail[]
  seo_blocks: SenseTrustSEOBlock[]
  form_blueprints: SenseTrustFormBlueprint[]
  analytics_blueprints: SenseTrustAnalyticsBlueprint[]
  publication_checklist: SenseTrustWebsitePublicationChecklistItem[]
  risk_disclosures: SenseTrustWebsiteRiskDisclosure[]
  references: string[]
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  production_deploy_claimed: false
  real_lead_collection_claimed: false
  simulated_only: true
}

export interface SenseTrustWebsiteBlueprintExportPayload {
  schema: 'sensetrust.website_blueprint_export.v1'
  exported_at: string
  state: SenseTrustWebsiteBlueprintState
  public_exposure: 'metadata_only'
  simulated_only: true
}
