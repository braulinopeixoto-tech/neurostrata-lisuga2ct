import {
  PROTOTYPE_UX_REAL_CLAIM_DENYLIST,
  PROTOTYPE_UX_SENSITIVE_DENYLIST,
  SIMULATED_PROTOTYPE_AUDIENCE_FLOWS,
  SIMULATED_PROTOTYPE_CTAS,
  SIMULATED_PROTOTYPE_DEMO_SCENARIOS,
  SIMULATED_PROTOTYPE_DISCLOSURES,
  SIMULATED_PROTOTYPE_INTERACTIONS,
  SIMULATED_PROTOTYPE_MOCK_FORMS,
  SIMULATED_PROTOTYPE_NAVIGATION,
  SIMULATED_PROTOTYPE_PAGES,
  SIMULATED_PROTOTYPE_REFERENCES,
  SIMULATED_PROTOTYPE_ROUTES,
  SIMULATED_PROTOTYPE_SECTIONS,
} from '@/fixtures/sensetrust/simulated-prototype-ux'
import type {
  SenseTrustPrototypeExportPayload,
  SenseTrustPrototypeUXState,
  SenseTrustPrototypeValidationResult,
} from '@/types/sensetrust/prototype-ux'

export function createPrototypeUXState(): SenseTrustPrototypeUXState {
  return {
    state_id: 'PROTOTYPE-UX-SIM-V20',
    version: 'v2.0',
    status: 'ready_for_demo',
    routes: createDefaultPrototypeRoutes(),
    pages: SIMULATED_PROTOTYPE_PAGES.map((page) => ({ ...page, sections: page.sections.map((section) => ({ ...section })) })),
    navigation: SIMULATED_PROTOTYPE_NAVIGATION.map((item) => ({ ...item })),
    ctas: SIMULATED_PROTOTYPE_CTAS.map((item) => ({ ...item })),
    interactions: SIMULATED_PROTOTYPE_INTERACTIONS.map((item) => ({ ...item })),
    audience_flows: SIMULATED_PROTOTYPE_AUDIENCE_FLOWS.map((item) => ({ ...item, route_sequence: [...item.route_sequence] })),
    disclosures: SIMULATED_PROTOTYPE_DISCLOSURES.map((item) => ({ ...item, required_on_routes: [...item.required_on_routes] })),
    mock_forms: SIMULATED_PROTOTYPE_MOCK_FORMS.map((item) => ({ ...item, fields: [...item.fields], prohibited_fields: [...item.prohibited_fields] })),
    demo_scenarios: SIMULATED_PROTOTYPE_DEMO_SCENARIOS.map((item) => ({ ...item, steps: [...item.steps] })),
    references: [...SIMULATED_PROTOTYPE_REFERENCES],
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    production_deploy_claimed: false,
    real_lead_collection: false,
    real_analytics_enabled: false,
    simulated_only: true,
  }
}

export function createPrototypeRoute() { return { ...SIMULATED_PROTOTYPE_ROUTES[0] } }
export function createPrototypePage() { return { ...SIMULATED_PROTOTYPE_PAGES[0], sections: SIMULATED_PROTOTYPE_PAGES[0].sections.map((item) => ({ ...item })) } }
export function createPrototypeSection() { return { ...SIMULATED_PROTOTYPE_SECTIONS[0] } }
export function createPrototypeNavigationItem() { return { ...SIMULATED_PROTOTYPE_NAVIGATION[0] } }
export function createPrototypeCTA() { return { ...SIMULATED_PROTOTYPE_CTAS[0] } }
export function createPrototypeInteraction() { return { ...SIMULATED_PROTOTYPE_INTERACTIONS[0] } }
export function createPrototypeAudienceFlow() { return { ...SIMULATED_PROTOTYPE_AUDIENCE_FLOWS[0], route_sequence: [...SIMULATED_PROTOTYPE_AUDIENCE_FLOWS[0].route_sequence] } }
export function createPrototypeDisclosure() { return { ...SIMULATED_PROTOTYPE_DISCLOSURES[0], required_on_routes: [...SIMULATED_PROTOTYPE_DISCLOSURES[0].required_on_routes] } }
export function createPrototypeMockLeadForm() { return { ...SIMULATED_PROTOTYPE_MOCK_FORMS[0], fields: [...SIMULATED_PROTOTYPE_MOCK_FORMS[0].fields], prohibited_fields: [...SIMULATED_PROTOTYPE_MOCK_FORMS[0].prohibited_fields] } }
export function createPrototypeDemoScenario() { return { ...SIMULATED_PROTOTYPE_DEMO_SCENARIOS[0], steps: [...SIMULATED_PROTOTYPE_DEMO_SCENARIOS[0].steps] } }

export function createDefaultPrototypeRoutes() {
  return SIMULATED_PROTOTYPE_ROUTES.map((route) => ({
    ...route,
    audience: [...route.audience],
    page: { ...route.page, sections: route.page.sections.map((section) => ({ ...section })) },
    navigation_items: route.navigation_items.map((item) => ({ ...item })),
    primary_cta: { ...route.primary_cta },
    secondary_cta: { ...route.secondary_cta },
    disclosures: route.disclosures.map((item) => ({ ...item, required_on_routes: [...item.required_on_routes] })),
    allowed_interactions: route.allowed_interactions.map((item) => ({ ...item })),
    prohibited_interactions: route.prohibited_interactions.map((item) => ({ ...item })),
  }))
}

export function createDefaultPrototypeUX() { return createPrototypeUXState() }

export function validatePrototypeRoutes(state = createPrototypeUXState()): SenseTrustPrototypeValidationResult {
  const errors: string[] = []
  if (state.routes.length !== 12) errors.push('prototype_routes_count_invalid')
  if (state.routes.some((route) => route.disclosures.length === 0)) errors.push('route_missing_disclosure')
  if (state.routes.some((route) => route.public_exposure !== 'metadata_only')) errors.push('route_public_exposure_invalid')
  return { valid: errors.length === 0, errors }
}

export function validatePrototypeInteractions(state = createPrototypeUXState()): SenseTrustPrototypeValidationResult {
  const errors: string[] = []
  if (!state.interactions.some((item) => item.type === 'submit_mock_form_blocked' && !item.allowed)) errors.push('mock_submit_not_blocked')
  if (state.ctas.some((cta) => cta.status !== 'simulated_only' && cta.status !== 'blocked_for_real_submit')) errors.push('cta_status_invalid')
  return { valid: errors.length === 0, errors }
}

export function validateNoRealLeadCollection(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_lead_collection":true') || serialized.includes('real_submit_enabled":true') ? ['real_lead_collection_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoRealAnalytics(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_analytics_enabled":true') ? ['real_analytics_enabled_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoProductionDeployClaim(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('production_deploy_claimed":true') ? ['production_deploy_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PROTOTYPE_UX_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoDiagnosticTruthClaim(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('diagnostic_truth_certification_claimed":true') ? ['diagnostic_truth_certification_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = PROTOTYPE_UX_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function validateNoRealBillingClaim(payload: unknown): SenseTrustPrototypeValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_billing_claimed":true') ? ['real_billing_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function buildPrototypeExportPayload(): SenseTrustPrototypeExportPayload {
  return { schema: 'sensetrust.prototype_ux_export.v1', exported_at: '2026-06-15T13:00:00.000Z', state: createPrototypeUXState(), public_exposure: 'metadata_only', simulated_only: true }
}

export function validatePrototypeExportPayload(payload = buildPrototypeExportPayload()) {
  const checks = [
    validatePrototypeRoutes(payload.state),
    validatePrototypeInteractions(payload.state),
    validateNoRealLeadCollection(payload.state),
    validateNoRealAnalytics(payload.state),
    validateNoProductionDeployClaim(payload.state),
    validateNoClinicalDataExposure(payload.state),
    validateNoDiagnosticTruthClaim(payload.state),
    validateNoRealRevenueClaim(payload.state),
    validateNoRealBillingClaim(payload.state),
  ]
  const errors = checks.flatMap((check) => check.errors)
  return { valid: errors.length === 0, errors }
}

export function assertPrototypeNoSensitiveExposure(payload: unknown) {
  const result = validateNoClinicalDataExposure(payload)
  if (!result.valid) throw new Error(`prototype_sensitive_exposure:${result.errors.join(',')}`)
  return true
}

export function assertPrototypeNoRealLeadCollection(payload: unknown) {
  const result = validateNoRealLeadCollection(payload)
  if (!result.valid) throw new Error(`prototype_real_lead_collection:${result.errors.join(',')}`)
  return true
}

export function assertPrototypeNoRealAnalytics(payload: unknown) {
  const result = validateNoRealAnalytics(payload)
  if (!result.valid) throw new Error(`prototype_real_analytics:${result.errors.join(',')}`)
  return true
}

export function assertPrototypeNoProductionDeploy(payload: unknown) {
  const result = validateNoProductionDeployClaim(payload)
  if (!result.valid) throw new Error(`prototype_production_deploy:${result.errors.join(',')}`)
  return true
}

export function assertPrototypeNoDiagnosticTruthCertification(payload: unknown) {
  const result = validateNoDiagnosticTruthClaim(payload)
  if (!result.valid) throw new Error(`prototype_diagnostic_truth:${result.errors.join(',')}`)
  return true
}

export function linkPrototypeToWebsiteBlueprint() { return { link: 'SenseTrust Website Blueprint v1.9', public_exposure: 'metadata_only' as const } }
export function linkPrototypeToPublicNarrative() { return { link: 'SenseTrust Public Narrative v1.8', public_exposure: 'metadata_only' as const } }
export function linkPrototypeToInvestorRoom() { return { link: 'SenseTrust Investor Room v1.7', public_exposure: 'metadata_only' as const } }
export function linkPrototypeToMOC() { return { link: 'MOC_SenseTrust', public_exposure: 'metadata_only' as const } }
