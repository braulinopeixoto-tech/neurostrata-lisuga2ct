import {
  INVESTOR_ROOM_REAL_CLAIM_DENYLIST,
  INVESTOR_ROOM_SENSITIVE_DENYLIST,
  SIMULATED_DATA_ROOM_ITEMS,
  SIMULATED_DUE_DILIGENCE_ITEMS,
  SIMULATED_INVESTOR_FAQ,
  SIMULATED_MOAT,
  SIMULATED_PITCH_DECK_SECTIONS,
  SIMULATED_RISK_DISCLOSURES,
  SIMULATED_STRATEGIC_PARTNERS,
  SIMULATED_TRACTION_SIGNALS,
  SIMULATED_USE_OF_FUNDS,
} from '@/fixtures/sensetrust/simulated-investor-room'
import type { SenseTrustInvestorExportPayload, SenseTrustInvestorRoomState } from '@/types/sensetrust/investor-room'

export function createInvestorRoomState(): SenseTrustInvestorRoomState {
  return {
    state_id: 'INVESTOR-ROOM-SIM-001',
    version: 'v1.7',
    data_room_items: createDefaultDataRoomItems(),
    pitch_deck_sections: createPitchDeckOutline(),
    strategic_partners: createStrategicPartnerMap(),
    due_diligence_items: createDueDiligenceChecklist(),
    investor_faq: createInvestorFAQ(),
    market_narrative: { narrative_id: 'MARKET-NARRATIVE-SIM-001', title: 'Trust infrastructure para documentacao auditavel', points: ['NeuroStrata', 'VitalStrata', 'DNDA', 'BLC', 'Trust Layer', 'SenseTrust Layer', 'LGPD', 'Neurodireitos'] },
    traction_signals: SIMULATED_TRACTION_SIGNALS.map((signal) => ({ ...signal })),
    use_of_funds: createUseOfFundsModel(),
    moat: createStrategicMoatSummary(),
    risk_disclosures: createRiskDisclosureMatrix(),
    public_exposure: 'metadata_only',
    simulated_only: true,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    real_signed_contracts_claimed: false,
  }
}

export function createDefaultDataRoomItems() { return SIMULATED_DATA_ROOM_ITEMS.map((item) => ({ ...item })) }
export function createPitchDeckOutline() { return SIMULATED_PITCH_DECK_SECTIONS.map((section) => ({ ...section })) }
export function createStrategicPartnerMap() { return SIMULATED_STRATEGIC_PARTNERS.map((partner) => ({ ...partner, partnership_track: { ...partner.partnership_track, required_review: [...partner.partnership_track.required_review] } })) }
export function createDueDiligenceChecklist() { return SIMULATED_DUE_DILIGENCE_ITEMS.map((item) => ({ ...item })) }
export function createInvestorFAQ() { return SIMULATED_INVESTOR_FAQ.map((item) => ({ ...item })) }
export function createUseOfFundsModel() { return SIMULATED_USE_OF_FUNDS.map((item) => ({ ...item })) }
export function createRiskDisclosureMatrix() { return SIMULATED_RISK_DISCLOSURES.map((risk) => ({ ...risk })) }
export function createStrategicMoatSummary() { return SIMULATED_MOAT.map((moat) => ({ ...moat })) }

export function buildInvestorExportPayload(): SenseTrustInvestorExportPayload {
  return { schema: 'sensetrust.investor_room_export.v1', exported_at: '2026-06-15T09:00:00.000Z', state: createInvestorRoomState(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validateInvestorExportPayload(payload = buildInvestorExportPayload()) {
  return {
    valid: assertNoClinicalDataExposure(payload) && assertNoRealRevenueClaims(payload) && assertSimulatedOnlyWhereApplicable(payload.state),
  }
}

export function assertNoClinicalDataExposure(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = INVESTOR_ROOM_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  if (exposed.length) throw new Error(`investor_room_sensitive_exposure:${exposed.join(',')}`)
  return true
}

export function assertNoRealRevenueClaims(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const exposed = INVESTOR_ROOM_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (exposed.length || serialized.includes('real_revenue_claimed":true') || serialized.includes('real_billing_claimed":true') || serialized.includes('real_signed_contracts_claimed":true')) throw new Error(`investor_room_real_claim_detected:${exposed.join(',')}`)
  return true
}

export function assertSimulatedOnlyWhereApplicable(state: SenseTrustInvestorRoomState) {
  if (!state.simulated_only || state.public_exposure !== 'metadata_only' || state.real_revenue_claimed || state.real_billing_claimed || state.real_signed_contracts_claimed) throw new Error('investor_room_state_not_safe')
  if (!state.use_of_funds.every((item) => item.simulated_only)) throw new Error('investor_room_use_of_funds_not_simulated')
  return true
}

export function linkInvestorRoomToRevenueOps() { return { link: 'SenseTrust Revenue Operations v1.6', public_exposure: 'metadata_only' as const } }
export function linkInvestorRoomToPricing() { return { link: 'SenseTrust Pricing Strategy v1.5', public_exposure: 'metadata_only' as const } }
export function linkInvestorRoomToFeedbackIntelligence() { return { link: 'SenseTrust Feedback Intelligence v1.4', public_exposure: 'metadata_only' as const } }
export function linkInvestorRoomToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }
