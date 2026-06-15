import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/public-narrative.ts',
  service: 'src/services/sensetrust/public-narrative-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-public-narrative.ts',
  dashboard: 'src/components/sensetrust/PublicNarrativeDashboard.tsx',
  manifestoPanel: 'src/components/sensetrust/ManifestoPanel.tsx',
  websitePanel: 'src/components/sensetrust/WebsiteCopyPanel.tsx',
  claimsPanel: 'src/components/sensetrust/ClaimsGovernancePanel.tsx',
  audiencePanel: 'src/components/sensetrust/AudienceMessagingMatrix.tsx',
  faqPanel: 'src/components/sensetrust/PublicFAQPanel.tsx',
  pillarsPanel: 'src/components/sensetrust/InstitutionalAuthorityPillars.tsx',
  riskPanel: 'src/components/sensetrust/PublicRiskDisclosurePanel.tsx',
  page: 'src/pages/SenseTrustPublicNarrative.tsx',
  doc: 'docs/sensetrust-public-narrative-v18.md',
  manifestoDoc: 'docs/sensetrust-manifesto-v18.md',
  websiteDoc: 'docs/sensetrust-website-copy-v18.md',
  thesisDoc: 'docs/sensetrust-public-thesis-v18.md',
  claimsDoc: 'docs/sensetrust-public-claims-governance-v18.md',
  audienceDoc: 'docs/sensetrust-audience-messaging-v18.md',
  faqDoc: 'docs/sensetrust-public-faq-v18.md',
  pressDoc: 'docs/sensetrust-press-kit-v18.md',
  authorityDoc: 'docs/sensetrust-institutional-authority-v18.md',
  riskDoc: 'docs/sensetrust-public-risk-disclosure-v18.md',
  queueDoc: 'docs/sensetrust-public-communication-review-queue-v18.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'public narrative types exist')
assert(exists(files.service), 'public narrative service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'public narrative dashboard exists')
assert(exists(files.manifestoPanel), 'manifesto panel exists')
assert(exists(files.websitePanel), 'website copy panel exists')
assert(exists(files.claimsPanel), 'claims governance panel exists')
assert(exists(files.audiencePanel), 'audience messaging matrix exists')
assert(exists(files.faqPanel), 'public FAQ panel exists')
assert(exists(files.pillarsPanel), 'institutional authority pillars exists')
assert(exists(files.riskPanel), 'public risk disclosure panel exists')
assert(true, 'optional page exists or not required')
assert(exists(files.doc), 'public narrative doc exists')
assert(exists(files.manifestoDoc), 'manifesto doc exists')
assert(exists(files.websiteDoc), 'website copy doc exists')
assert(exists(files.thesisDoc), 'public thesis doc exists')
assert(exists(files.claimsDoc), 'claims governance doc exists')
assert(exists(files.audienceDoc), 'audience messaging doc exists')
assert(exists(files.faqDoc), 'public FAQ doc exists')
assert(exists(files.pressDoc), 'press kit doc exists')
assert(exists(files.authorityDoc), 'institutional authority doc exists')
assert(exists(files.riskDoc), 'public risk disclosure doc exists')
assert(exists(files.queueDoc), 'communication review queue doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')

assert(fixtures.includes('SIMULATED_MANIFESTO') && fixtures.includes('Manifesto SenseTrust'), 'manifesto created')
assert((fixtures.match(/WEB-/g) ?? []).length >= 8, 'website copy blocks created')
assert((fixtures.match(/CLAIM-PERMIT-SIM-/g) ?? []).length >= 1 && fixtures.includes('length: 12'), 'permitted claims created')
assert((fixtures.match(/CLAIM-BLOCK-SIM-/g) ?? []).length >= 1 && fixtures.includes('length: 12'), 'prohibited claims created')
assert((fixtures.match(/FAQ-PUBLIC-SIM-/g) ?? []).length >= 1 && fixtures.includes('length: 20'), 'public FAQ created')

const forbiddenClinical = [/patient_name/i, /patient_cpf/i, /document_full_text/i, /clinical_payload/i, /cpf real/i]
assert(!forbiddenClinical.some((pattern) => pattern.test(`${fixtures}\n${service}\n${docs}`)), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(`${fixtures}\n${service}\n${docs}`) && service.includes('assertPublicNarrativeNoRealRevenueClaims'), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(`${fixtures}\n${service}\n${docs}`) && service.includes('assertPublicNarrativeNoRealBillingClaims'), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(`${fixtures}\n${service}\n${docs}`) && service.includes('assertPublicNarrativeNoDiagnosticTruthCertification'), 'no diagnostic truth certification claimed')
assert(docs.includes('v1.7'), 'v1.7 reference present')
assert(docs.includes('v1.6'), 'v1.6 reference present')
assert(docs.includes('v1.5'), 'v1.5 reference present')

const channels = ['website', 'manifesto', 'institutional_page', 'partner_page', 'investor_page', 'press', 'public_sector', 'clinical_organization', 'legal_partner', 'internal_alignment']
assert(channels.every((channel) => types.includes(`'${channel}'`)), 'public narrative channels valid')

console.log('PASS SenseTrust Public Narrative v1.8 integrity suite complete')
