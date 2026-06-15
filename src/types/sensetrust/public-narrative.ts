export type SenseTrustNarrativeChannel =
  | 'website'
  | 'manifesto'
  | 'institutional_page'
  | 'partner_page'
  | 'investor_page'
  | 'press'
  | 'public_sector'
  | 'clinical_organization'
  | 'legal_partner'
  | 'internal_alignment'

export type SenseTrustAudienceType =
  | 'clinics'
  | 'professionals'
  | 'public_sector'
  | 'legal_partners'
  | 'investors'
  | 'institutional_partners'
  | 'patients_families_public'
  | 'regulators'
  | 'press'
  | 'internal_team'

export type SenseTrustClaimStatus = 'permitted' | 'prohibited' | 'requires_review' | 'future_roadmap' | 'simulated_only'

export interface SenseTrustPermittedClaim {
  claim_id: string
  claim: string
  status: 'permitted'
  channel: SenseTrustNarrativeChannel
}

export interface SenseTrustProhibitedClaim {
  claim_id: string
  claim: string
  status: 'prohibited'
  safe_replacement: string
}

export interface SenseTrustRegulatorySafeLanguage {
  language_id: string
  phrase: string
  status: SenseTrustClaimStatus
  note: string
}

export interface SenseTrustWebsiteCopyBlock {
  block_id: string
  channel: SenseTrustNarrativeChannel
  audience: SenseTrustAudienceType
  title: string
  subtitle: string
  body: string
  call_to_action: string
  permitted_claims: string[]
  prohibited_claims: string[]
  risk_disclosure: string
  data_classification: 'public_narrative_metadata'
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  simulated_only: true
}

export interface SenseTrustManifesto {
  manifesto_id: string
  title: string
  thesis: string
  authority_phrase: string
  permitted_promise: string
  public_limit: string
  sections: string[]
}

export interface SenseTrustInstitutionalThesis {
  thesis_id: string
  title: string
  thesis: string
  supporting_points: string[]
}

export interface SenseTrustAudienceMessage {
  message_id: string
  audience: SenseTrustAudienceType
  pain: string
  central_message: string
  permitted_promise: string
  limit: string
  call_to_action: string
}

export interface SenseTrustPublicFAQ {
  faq_id: string
  question: string
  answer: string
  claim_status: SenseTrustClaimStatus
  disclaimer: string
}

export interface SenseTrustPressMessage {
  message_id: string
  headline: string
  body: string
  avoid: string[]
}

export interface SenseTrustPartnerMessage {
  message_id: string
  partner_type: string
  message: string
  required_review: string[]
}

export interface SenseTrustInvestorPublicMessage {
  message_id: string
  message: string
  disclosure: string
}

export interface SenseTrustPublicRiskDisclosure {
  disclosure_id: string
  category: 'implemented' | 'simulated' | 'planned' | 'pending_review' | 'not_implemented' | 'prohibited_to_promise'
  statement: string
}

export interface SenseTrustAuthorityPillar {
  pillar_id: string
  title: string
  description: string
}

export interface SenseTrustPublicNarrativeSection {
  section_id: string
  title: string
  channel: SenseTrustNarrativeChannel
  status: SenseTrustClaimStatus
}

export interface SenseTrustPublicNarrativeValidationResult {
  valid: boolean
  errors: string[]
}

export interface SenseTrustPublicNarrativeState {
  state_id: string
  version: 'v1.8'
  manifesto: SenseTrustManifesto
  institutional_thesis: SenseTrustInstitutionalThesis
  website_copy: SenseTrustWebsiteCopyBlock[]
  audience_messages: SenseTrustAudienceMessage[]
  permitted_claims: SenseTrustPermittedClaim[]
  prohibited_claims: SenseTrustProhibitedClaim[]
  safe_language: SenseTrustRegulatorySafeLanguage[]
  public_faq: SenseTrustPublicFAQ[]
  press_messages: SenseTrustPressMessage[]
  partner_messages: SenseTrustPartnerMessage[]
  investor_public_messages: SenseTrustInvestorPublicMessage[]
  risk_disclosures: SenseTrustPublicRiskDisclosure[]
  authority_pillars: SenseTrustAuthorityPillar[]
  public_exposure: 'metadata_only'
  clinical_data_used: false
  real_revenue_claimed: false
  real_billing_claimed: false
  diagnostic_truth_certification_claimed: false
  simulated_only: true
}

export interface SenseTrustNarrativeExportPayload {
  schema: 'sensetrust.public_narrative_export.v1'
  exported_at: string
  state: SenseTrustPublicNarrativeState
  public_exposure: 'metadata_only'
  simulated_only: true
}
