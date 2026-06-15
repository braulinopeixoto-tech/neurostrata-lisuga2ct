export type SenseTrustInvestorRoomArea =
  | 'data_room'
  | 'pitch_deck'
  | 'strategic_partnership'
  | 'due_diligence'
  | 'institutional_relations'
  | 'fundraising_readiness'

export interface SenseTrustDataRoomItem {
  item_id: string
  area: SenseTrustInvestorRoomArea
  title: string
  status: 'implemented' | 'simulated' | 'planned' | 'pending_review'
  sensitivity: 'public_safe' | 'controlled_access' | 'internal_review'
  summary: string
}

export interface SenseTrustPitchDeckSection {
  section_id: string
  order: number
  title: string
  narrative: string
  status: 'draft' | 'review_ready'
}

export interface SenseTrustStrategicPartner {
  partner_id: string
  segment: string
  profile: string
  partnership_track: SenseTrustPartnershipTrack
  value_exchange: string
  status: 'mapped' | 'warm_intro_needed' | 'future_candidate'
}

export interface SenseTrustPartnershipTrack {
  track_id: string
  label: string
  objective: string
  required_review: string[]
}

export interface SenseTrustInvestorFAQ {
  question_id: string
  question: string
  answer: string
  disclosure_level: 'public_safe' | 'controlled_access'
}

export interface SenseTrustDueDiligenceItem {
  item_id: string
  category: SenseTrustInvestorRoomArea
  title: string
  readiness: 'ready' | 'draft' | 'pending' | 'blocked'
  owner: string
  note: string
}

export interface SenseTrustMarketNarrative {
  narrative_id: string
  title: string
  points: string[]
}

export interface SenseTrustTractionSignal {
  signal_id: string
  label: string
  evidence_type: 'simulated' | 'implemented' | 'documented'
  summary: string
}

export interface SenseTrustInvestmentUseOfFunds {
  bucket_id: string
  bucket: string
  allocation_percent_simulated: number
  purpose: string
  simulated_only: true
}

export interface SenseTrustStrategicMoat {
  moat_id: string
  label: string
  description: string
}

export interface SenseTrustRiskDisclosure {
  risk_id: string
  risk: string
  disclosure: string
  mitigation: string
  level: 'low' | 'moderate' | 'high' | 'critical'
}

export interface SenseTrustInvestorRoomState {
  state_id: string
  version: 'v1.7'
  data_room_items: SenseTrustDataRoomItem[]
  pitch_deck_sections: SenseTrustPitchDeckSection[]
  strategic_partners: SenseTrustStrategicPartner[]
  due_diligence_items: SenseTrustDueDiligenceItem[]
  investor_faq: SenseTrustInvestorFAQ[]
  market_narrative: SenseTrustMarketNarrative
  traction_signals: SenseTrustTractionSignal[]
  use_of_funds: SenseTrustInvestmentUseOfFunds[]
  moat: SenseTrustStrategicMoat[]
  risk_disclosures: SenseTrustRiskDisclosure[]
  public_exposure: 'metadata_only'
  simulated_only: true
  real_revenue_claimed: false
  real_billing_claimed: false
  real_signed_contracts_claimed: false
}

export interface SenseTrustInvestorExportPayload {
  schema: 'sensetrust.investor_room_export.v1'
  exported_at: string
  state: SenseTrustInvestorRoomState
  public_exposure: 'metadata_only'
  simulated_only: true
}
