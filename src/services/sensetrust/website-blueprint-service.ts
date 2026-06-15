import {
  SIMULATED_ANALYTICS_BLUEPRINTS,
  SIMULATED_AUDIENCE_JOURNEYS,
  SIMULATED_CONVERSION_PATHS,
  SIMULATED_FORM_BLUEPRINTS,
  SIMULATED_NAVIGATION_ITEMS,
  SIMULATED_PUBLICATION_CHECKLIST,
  SIMULATED_SEO_BLOCKS,
  SIMULATED_WEBSITE_CTAS,
  SIMULATED_WEBSITE_GUARDRAILS,
  SIMULATED_WEBSITE_PAGES,
  SIMULATED_WEBSITE_REFERENCES,
  SIMULATED_WEBSITE_RISK_DISCLOSURES,
  SIMULATED_WEBSITE_SECTIONS,
  WEBSITE_BLUEPRINT_REAL_CLAIM_DENYLIST,
  WEBSITE_BLUEPRINT_SENSITIVE_DENYLIST,
} from '@/fixtures/sensetrust/simulated-website-blueprint'
import type {
  SenseTrustWebsiteBlueprintExportPayload,
  SenseTrustWebsiteBlueprintState,
  SenseTrustWebsiteBlueprintValidationResult,
} from '@/types/sensetrust/website-blueprint'

export function createWebsiteBlueprintState(): SenseTrustWebsiteBlueprintState {
  return {
    state_id: 'WEBSITE-BLUEPRINT-SIM-V19',
    version: 'v1.9',
    pages: createWebsitePages(),
    sections: SIMULATED_WEBSITE_SECTIONS.map((item) => ({ ...item, claim_guardrail_ids: [...item.claim_guardrail_ids] })),
    ctas: createWebsiteCTAs(),
    audience_journeys: createAudienceJourneys(),
    conversion_paths: createConversionPaths(),
    navigation: SIMULATED_NAVIGATION_ITEMS.map((item) => ({ ...item })),
    claim_guardrails: SIMULATED_WEBSITE_GUARDRAILS.map((item) => ({ ...item })),
    seo_blocks: SIMULATED_SEO_BLOCKS.map((item) => ({ ...item, keywords: [...item.keywords], safe_language_notes: [...item.safe_language_notes] })),
    form_blueprints: createFormBlueprints(),
    analytics_blueprints: createAnalyticsBlueprints(),
    publication_checklist: SIMULATED_PUBLICATION_CHECKLIST.map((item) => ({ ...item })),
    risk_disclosures: SIMULATED_WEBSITE_RISK_DISCLOSURES.map((item) => ({ ...item })),
    references: [...SIMULATED_WEBSITE_REFERENCES],
    public_exposure: 'metadata_only',
    clinical_data_used: false,
    real_revenue_claimed: false,
    real_billing_claimed: false,
    diagnostic_truth_certification_claimed: false,
    production_deploy_claimed: false,
    real_lead_collection_claimed: false,
    simulated_only: true,
  }
}

export function createWebsitePages() {
  return SIMULATED_WEBSITE_PAGES.map((page) => ({
    ...page,
    audience: [...page.audience],
    sections: page.sections.map((section) => ({ ...section, claim_guardrail_ids: [...section.claim_guardrail_ids] })),
    ctas: page.ctas.map((cta) => ({ ...cta })),
    seo: { ...page.seo, keywords: [...page.seo.keywords], safe_language_notes: [...page.seo.safe_language_notes] },
  }))
}

export function createWebsiteSitemap() {
  return SIMULATED_NAVIGATION_ITEMS.map((item) => ({ ...item }))
}

export function createLandingExperience() {
  return createWebsitePages().find((page) => page.page_type === 'home')
}

export function createAudienceJourneys() {
  return SIMULATED_AUDIENCE_JOURNEYS.map((item) => ({ ...item, recommended_path: [...item.recommended_path] }))
}

export function createWebsiteCTAs() {
  return SIMULATED_WEBSITE_CTAS.map((item) => ({ ...item }))
}

export function createConversionPaths() {
  return SIMULATED_CONVERSION_PATHS.map((item) => ({ ...item, pages: [...item.pages], cta_ids: [...item.cta_ids] }))
}

export function createClaimGuardrails() {
  return SIMULATED_WEBSITE_GUARDRAILS.map((item) => ({ ...item }))
}

export function createFormBlueprints() {
  return SIMULATED_FORM_BLUEPRINTS.map((item) => ({ ...item, fields: [...item.fields] }))
}

export function createAnalyticsBlueprints() {
  return SIMULATED_ANALYTICS_BLUEPRINTS.map((item) => ({ ...item }))
}

export function createPublicationChecklist() {
  return SIMULATED_PUBLICATION_CHECKLIST.map((item) => ({ ...item }))
}

export function validateWebsiteBlueprint(state = createWebsiteBlueprintState()): SenseTrustWebsiteBlueprintValidationResult {
  const errors = [
    ...validateNoClinicalDataExposure(state).errors,
    ...validateNoRealRevenueClaim(state).errors,
    ...validateNoRealBillingClaim(state).errors,
    ...validateNoDiagnosticTruthClaim(state).errors,
    ...validateNoProductionDeployClaim(state).errors,
    ...validateNoRealLeadCollection(state).errors,
    ...validateBlueprintCompleteness(state).errors,
  ]
  return { valid: errors.length === 0, errors }
}

export function validateNoClinicalDataExposure(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = WEBSITE_BLUEPRINT_SENSITIVE_DENYLIST.filter((term) => serialized.includes(term))
  return { valid: errors.length === 0, errors }
}

export function validateNoRealRevenueClaim(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = WEBSITE_BLUEPRINT_REAL_CLAIM_DENYLIST.filter((term) => serialized.includes(term))
  if (serialized.includes('real_revenue_claimed":true')) errors.push('real_revenue_claimed_true')
  return { valid: errors.length === 0, errors }
}

export function validateNoRealBillingClaim(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_billing_claimed":true') ? ['real_billing_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoDiagnosticTruthClaim(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('diagnostic_truth_certification_claimed":true') ? ['diagnostic_truth_certification_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoProductionDeployClaim(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('production_deploy_claimed":true') ? ['production_deploy_claimed_true'] : []
  return { valid: errors.length === 0, errors }
}

export function validateNoRealLeadCollection(payload: unknown): SenseTrustWebsiteBlueprintValidationResult {
  const serialized = JSON.stringify(payload).toLowerCase()
  const errors = serialized.includes('real_lead_collection_claimed":true') ? ['real_lead_collection_claimed_true'] : []
  if (serialized.includes('lead_collection_status":"enabled"')) errors.push('lead_collection_enabled')
  return { valid: errors.length === 0, errors }
}

export function validateBlueprintCompleteness(state = createWebsiteBlueprintState()): SenseTrustWebsiteBlueprintValidationResult {
  const errors: string[] = []
  if (state.pages.length < 10) errors.push('website_pages_minimum_not_met')
  if (state.ctas.length < 12) errors.push('cta_minimum_not_met')
  if (state.audience_journeys.length < 8) errors.push('audience_journey_minimum_not_met')
  if (state.form_blueprints.length < 3) errors.push('form_blueprints_minimum_not_met')
  if (state.analytics_blueprints.length < 3) errors.push('analytics_blueprints_minimum_not_met')
  if (!state.references.includes('SenseTrust Public Narrative v1.8')) errors.push('missing_v18_reference')
  if (!state.references.includes('SenseTrust Investor Room v1.7')) errors.push('missing_v17_reference')
  if (!state.references.includes('SenseTrust Revenue Operations v1.6')) errors.push('missing_v16_reference')
  return { valid: errors.length === 0, errors }
}

export function buildWebsiteBlueprintExportPayload(): SenseTrustWebsiteBlueprintExportPayload {
  return {
    schema: 'sensetrust.website_blueprint_export.v1',
    exported_at: '2026-06-15T12:00:00.000Z',
    state: createWebsiteBlueprintState(),
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

export function validateWebsiteBlueprintExportPayload(payload = buildWebsiteBlueprintExportPayload()) {
  return validateWebsiteBlueprint(payload.state)
}

export function assertWebsiteBlueprintNoSensitiveExposure(payload: unknown) {
  const result = validateNoClinicalDataExposure(payload)
  if (!result.valid) throw new Error(`website_blueprint_sensitive_exposure:${result.errors.join(',')}`)
  return true
}

export function assertWebsiteBlueprintNoRealRevenueClaims(payload: unknown) {
  const result = validateNoRealRevenueClaim(payload)
  if (!result.valid) throw new Error(`website_blueprint_real_revenue_claim:${result.errors.join(',')}`)
  return true
}

export function assertWebsiteBlueprintNoRealBillingClaims(payload: unknown) {
  const result = validateNoRealBillingClaim(payload)
  if (!result.valid) throw new Error(`website_blueprint_real_billing_claim:${result.errors.join(',')}`)
  return true
}

export function assertWebsiteBlueprintNoDiagnosticTruthCertification(payload: unknown) {
  const result = validateNoDiagnosticTruthClaim(payload)
  if (!result.valid) throw new Error(`website_blueprint_diagnostic_truth_claim:${result.errors.join(',')}`)
  return true
}

export function assertWebsiteBlueprintNoProductionDeployClaims(payload: unknown) {
  const result = validateNoProductionDeployClaim(payload)
  if (!result.valid) throw new Error(`website_blueprint_production_deploy_claim:${result.errors.join(',')}`)
  return true
}

export function assertWebsiteBlueprintNoRealLeadCollection(payload: unknown) {
  const result = validateNoRealLeadCollection(payload)
  if (!result.valid) throw new Error(`website_blueprint_real_lead_collection:${result.errors.join(',')}`)
  return true
}
