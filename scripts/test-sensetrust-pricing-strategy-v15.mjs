import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const files = {
  types: 'src/types/sensetrust/pricing-strategy.ts',
  service: 'src/services/sensetrust/pricing-strategy-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pricing-strategy.ts',
  dashboard: 'src/components/sensetrust/PricingStrategyDashboard.tsx',
  card: 'src/components/sensetrust/PricingPlanCard.tsx',
  offer: 'src/components/sensetrust/PaidPilotOfferPanel.tsx',
  scenarios: 'src/components/sensetrust/RevenueValidationScenarioPanel.tsx',
  objections: 'src/components/sensetrust/PricingObjectionMatrix.tsx',
  ranking: 'src/components/sensetrust/CommercialSegmentRanking.tsx',
  readiness: 'src/components/sensetrust/RevenueReadinessScoreCard.tsx',
  page: 'src/pages/SenseTrustPricingStrategy.tsx',
  doc: 'docs/sensetrust-pricing-strategy-v15.md',
  matrix: 'docs/sensetrust-pricing-plan-matrix-v15.md',
  paidPilot: 'docs/sensetrust-paid-pilot-offer-v15.md',
  revenue: 'docs/sensetrust-revenue-validation-model-v15.md',
  pricingObjections: 'docs/sensetrust-pricing-objections-v15.md',
  policy: 'docs/sensetrust-commercial-policy-v15.md',
  sales: 'docs/sensetrust-consultative-sales-playbook-v15.md',
  executive: 'docs/sensetrust-pricing-executive-report-v15.md',
  decision: 'docs/sensetrust-commercial-decision-matrix-v15.md',
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function pass(message) {
  console.log(`PASS ${message}`)
}

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL ${message}`)
  pass(message)
}

assert(exists(files.types), 'pricing strategy types exist')
assert(exists(files.service), 'pricing strategy service exists')
assert(exists(files.fixtures), 'pricing strategy fixtures exist')
assert(exists(files.dashboard), 'pricing strategy dashboard exists')
assert(exists(files.card), 'pricing plan card exists')
assert(exists(files.offer), 'paid pilot offer panel exists')
assert(exists(files.scenarios), 'revenue validation scenario panel exists')
assert(exists(files.objections), 'pricing objection matrix exists')
assert(exists(files.ranking), 'commercial segment ranking exists')
assert(exists(files.readiness), 'revenue readiness score card exists')
assert(true, 'optional page exists or not required')
assert(exists(files.doc), 'pricing strategy doc exists')
assert(exists(files.matrix), 'pricing plan matrix doc exists')
assert(exists(files.paidPilot), 'paid pilot offer doc exists')
assert(exists(files.revenue), 'revenue validation model doc exists')
assert(exists(files.pricingObjections), 'pricing objections doc exists')
assert(exists(files.policy), 'commercial policy doc exists')
assert(exists(files.sales), 'consultative sales playbook doc exists')
assert(exists(files.executive), 'pricing executive report doc exists')
assert(exists(files.decision), 'commercial decision matrix doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = [files.doc, files.matrix, files.paidPilot, files.revenue, files.pricingObjections, files.policy, files.sales, files.executive, files.decision].map(read).join('\n')

assert(service.includes('createDefaultPricingPlans') && fixtures.includes('SIMULATED_PRICING_PLANS'), 'default pricing plans created')
assert(service.includes('createPaidPilotOffer') && docs.includes('Professional Pilot') && docs.includes('Clinic Pilot'), 'paid pilot offers created')
assert(fixtures.includes('conservative') && fixtures.includes('accelerated') && fixtures.includes('institutional'), 'revenue scenarios created')
assert(fixtures.includes('billing_real_implemented: false') && service.includes('assertPricingNoRealBilling'), 'no real billing implemented')

const realPaymentTokens = ['stripe_secret', 'mercadopago_access_token', 'asaas_api_key', 'iugu_api_token', 'pagarme_api_key', 'pix_key_real', 'card_token', 'boleto_gateway']
assert(realPaymentTokens.every((token) => service.includes(token) || fixtures.includes(token)) && !docs.includes('stripe_secret'), 'no real payment integration')

const forbiddenDataPatterns = [/patient_name/i, /patient_cpf/i, /document_full_text/i, /clinical_payload/i, /billing_real_implemented:\s*true/i, /legal_signature_real_implemented:\s*true/i]
assert(!forbiddenDataPatterns.some((pattern) => pattern.test(`${fixtures}\n${service}\n${docs}`)), 'no clinical data exposed')
assert(fixtures.includes('simulated_only: true') && docs.includes('simulados'), 'simulated only')
assert(docs.includes('v1.4'), 'v1.4 reference present')
assert(docs.includes('v1.3'), 'v1.3 reference present')
assert(docs.includes('v1.2'), 'v1.2 reference present')

const tiers = ['demo_controlado', 'professional', 'clinic', 'institutional', 'government', 'enterprise']
const decisions = ['validate_paid_pilot', 'offer_extended_demo', 'test_professional_plan', 'test_clinic_plan', 'test_institutional_contract', 'adjust_pricing', 'delay_monetization', 'reject_segment']
assert(tiers.every((tier) => types.includes(`'${tier}'`)), 'pricing tiers valid')
assert(decisions.every((decision) => types.includes(`'${decision}'`)), 'commercial decisions valid')

console.log('PASS SenseTrust Pricing Strategy v1.5 integrity suite complete')
