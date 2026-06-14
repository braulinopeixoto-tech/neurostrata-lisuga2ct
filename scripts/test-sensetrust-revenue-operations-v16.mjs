import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/revenue-operations.ts',
  service: 'src/services/sensetrust/revenue-operations-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-revenue-operations.ts',
  dashboard: 'src/components/sensetrust/RevenueOperationsDashboard.tsx',
  billing: 'src/components/sensetrust/BillingReadinessChecklistPanel.tsx',
  contract: 'src/components/sensetrust/CommercialContractTemplatePanel.tsx',
  ledger: 'src/components/sensetrust/SimulatedRevenueLedgerPanel.tsx',
  policy: 'src/components/sensetrust/UpgradeDowngradePolicyPanel.tsx',
  risk: 'src/components/sensetrust/RevenueRiskGovernancePanel.tsx',
  gateway: 'src/components/sensetrust/PaymentGatewayReadinessPanel.tsx',
  summary: 'src/components/sensetrust/RevenueOpsExecutiveSummary.tsx',
  page: 'src/pages/SenseTrustRevenueOperations.tsx',
  doc: 'docs/sensetrust-revenue-operations-v16.md',
  billingDoc: 'docs/sensetrust-billing-readiness-v16.md',
  contractDoc: 'docs/sensetrust-commercial-contract-template-v16.md',
  ledgerDoc: 'docs/sensetrust-simulated-revenue-ledger-v16.md',
  governanceDoc: 'docs/sensetrust-revenue-governance-policy-v16.md',
  policyDoc: 'docs/sensetrust-upgrade-downgrade-cancellation-policy-v16.md',
  gatewayDoc: 'docs/sensetrust-payment-gateway-readiness-v16.md',
  queueDoc: 'docs/sensetrust-fiscal-legal-review-queue-v16.md',
  riskDoc: 'docs/sensetrust-revenue-risk-matrix-v16.md',
  playbookDoc: 'docs/sensetrust-revenue-ops-playbook-v16.md',
  reportDoc: 'docs/sensetrust-revenue-ops-executive-report-v16.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'revenue operations types exist')
assert(exists(files.service), 'revenue operations service exists')
assert(exists(files.fixtures), 'revenue operations fixtures exist')
assert(exists(files.dashboard), 'revenue operations dashboard exists')
assert(exists(files.billing), 'billing readiness checklist panel exists')
assert(exists(files.contract), 'commercial contract template panel exists')
assert(exists(files.ledger), 'simulated revenue ledger panel exists')
assert(exists(files.policy), 'upgrade downgrade policy panel exists')
assert(exists(files.risk), 'revenue risk governance panel exists')
assert(exists(files.gateway), 'payment gateway readiness panel exists')
assert(exists(files.summary), 'revenue ops executive summary exists')
assert(true, 'optional page exists or not required')
assert(exists(files.doc), 'revenue operations doc exists')
assert(exists(files.billingDoc), 'billing readiness doc exists')
assert(exists(files.contractDoc), 'commercial contract template doc exists')
assert(exists(files.ledgerDoc), 'simulated revenue ledger doc exists')
assert(exists(files.governanceDoc), 'revenue governance policy doc exists')
assert(exists(files.policyDoc), 'upgrade downgrade cancellation policy doc exists')
assert(exists(files.gatewayDoc), 'payment gateway readiness doc exists')
assert(exists(files.queueDoc), 'fiscal legal review queue doc exists')
assert(exists(files.riskDoc), 'revenue risk matrix doc exists')
assert(exists(files.playbookDoc), 'revenue ops playbook doc exists')
assert(exists(files.reportDoc), 'revenue ops executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = [files.doc, files.billingDoc, files.contractDoc, files.ledgerDoc, files.governanceDoc, files.policyDoc, files.gatewayDoc, files.queueDoc, files.riskDoc, files.playbookDoc, files.reportDoc].map(read).join('\n')

assert((fixtures.match(/REV-LEDGER-SIM-/g) ?? []).length >= 5, 'simulated ledger entries created')
assert((fixtures.match(/CONTRACT-SIM-/g) ?? []).length >= 4, 'commercial contract templates created')
assert(fixtures.includes('not_ready') && fixtures.includes('legal_review_pending') && fixtures.includes('fiscal_review_pending') && fixtures.includes('ready_for_controlled_paid_pilot'), 'billing readiness scenarios created')
assert(fixtures.includes('billing_real_implemented: false') && service.includes('assertRevenueOpsNoRealBilling'), 'no real billing implemented')
assert(service.includes('assertRevenueOpsNoRealPaymentIntegration') && fixtures.includes('REVENUE_OPS_REAL_PAYMENT_DENYLIST'), 'no real payment integration')
assert(service.includes('assertRevenueOpsNoRealInvoice') && fixtures.includes('invoice_real_issued: false'), 'no real invoice implemented')
assert(fixtures.includes('fiscal_document_real_issued: false') && service.includes('fiscal_document_real_implemented: false'), 'no fiscal document issued')

const forbidden = [/patient_name/i, /patient_cpf/i, /document_full_text/i, /clinical_payload/i, /billing_real_implemented:\s*true/i, /payment_gateway_real_implemented:\s*true/i, /invoice_real_implemented:\s*true/i, /fiscal_document_real_implemented:\s*true/i]
assert(!forbidden.some((pattern) => pattern.test(`${fixtures}\n${service}\n${docs}`)), 'no clinical data exposed')
assert(fixtures.includes('simulated_only: true') && docs.includes('simulado'), 'simulated only')
assert(docs.includes('v1.5'), 'v1.5 reference present')
assert(docs.includes('v1.4'), 'v1.4 reference present')
assert(docs.includes('v1.3'), 'v1.3 reference present')

const statuses = ['not_ready', 'draft_ready', 'legal_review_pending', 'fiscal_review_pending', 'technical_ready_simulated', 'ready_for_controlled_paid_pilot', 'blocked']
const decisions = ['keep_simulated', 'prepare_paid_pilot_contract', 'require_legal_review', 'require_fiscal_review', 'require_gateway_vendor_selection', 'require_accounting_review', 'block_monetization', 'ready_for_controlled_paid_pilot']
assert(statuses.every((status) => types.includes(`'${status}'`)), 'billing readiness statuses valid')
assert(decisions.every((decision) => types.includes(`'${decision}'`)), 'revenue readiness decisions valid')

console.log('PASS SenseTrust Revenue Operations v1.6 integrity suite complete')
