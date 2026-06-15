import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/investor-room.ts',
  service: 'src/services/sensetrust/investor-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-investor-room.ts',
  dashboard: 'src/components/sensetrust/InvestorRoomDashboard.tsx',
  dataRoom: 'src/components/sensetrust/DataRoomChecklistPanel.tsx',
  pitch: 'src/components/sensetrust/PitchDeckOutlinePanel.tsx',
  partners: 'src/components/sensetrust/StrategicPartnerMapPanel.tsx',
  diligence: 'src/components/sensetrust/DueDiligenceChecklistPanel.tsx',
  faq: 'src/components/sensetrust/InvestorFAQPanel.tsx',
  funds: 'src/components/sensetrust/UseOfFundsPanel.tsx',
  risk: 'src/components/sensetrust/InvestorRiskDisclosurePanel.tsx',
  doc: 'docs/sensetrust-investor-room-v17.md',
  dataRoomDoc: 'docs/sensetrust-data-room-index-v17.md',
  pitchDoc: 'docs/sensetrust-pitch-deck-textual-v17.md',
  onePageDoc: 'docs/sensetrust-investor-one-page-v17.md',
  partnerDoc: 'docs/sensetrust-strategic-partnership-map-v17.md',
  diligenceDoc: 'docs/sensetrust-due-diligence-checklist-v17.md',
  faqDoc: 'docs/sensetrust-investor-faq-v17.md',
  fundsDoc: 'docs/sensetrust-use-of-funds-v17.md',
  riskDoc: 'docs/sensetrust-risk-disclosure-v17.md',
  narrativeDoc: 'docs/sensetrust-institutional-alliance-narrative-v17.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'investor room types exist')
assert(exists(files.service), 'investor room service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'dashboard exists')
assert(exists(files.dataRoom), 'data room checklist exists')
assert(exists(files.pitch), 'pitch deck outline exists')
assert(exists(files.partners), 'strategic partner map exists')
assert(exists(files.diligence), 'due diligence checklist exists')
assert(exists(files.faq), 'investor FAQ exists')
assert(exists(files.funds), 'use of funds exists')
assert(exists(files.risk), 'risk disclosure exists')
assert(exists(files.doc), 'investor room docs exist')
assert(exists(files.dataRoomDoc), 'data room index exists')
assert(exists(files.pitchDoc), 'pitch deck textual exists')
assert(exists(files.onePageDoc), 'investor one-page exists')
assert(exists(files.partnerDoc), 'partnership map exists')
assert(exists(files.diligenceDoc), 'due diligence checklist doc exists')
assert(exists(files.faqDoc), 'investor FAQ doc exists')
assert(exists(files.fundsDoc), 'use of funds doc exists')
assert(exists(files.riskDoc), 'risk disclosure doc exists')
assert(exists(files.narrativeDoc), 'institutional narrative exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')

assert((fixtures.match(/DR-/g) ?? []).length >= 10, 'data room items created')
assert((fixtures.match(/deck\(/g) ?? []).length >= 12, 'pitch deck sections created')
assert((fixtures.match(/PARTNER-00/g) ?? []).length >= 5, 'strategic partners created')
assert((fixtures.match(/FAQ-INV-SIM-/g) ?? []).length >= 1 && fixtures.includes('length: 20'), 'investor FAQ created')

const forbiddenClinical = [/patient_name/i, /patient_cpf/i, /document_full_text/i, /clinical_payload/i, /cpf real/i]
assert(!forbiddenClinical.some((pattern) => pattern.test(`${fixtures}\n${service}\n${docs}`)), 'no clinical data exposed')
assert(!/real_revenue_claimed:\s*true/i.test(`${fixtures}\n${service}\n${docs}`) && service.includes('assertNoRealRevenueClaims'), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(`${fixtures}\n${service}\n${docs}`) && docs.includes('Nao ha billing real'), 'no real billing claimed')
assert(fixtures.includes('simulated_only: true') && service.includes('assertSimulatedOnlyWhereApplicable'), 'simulated only where applicable')
assert(docs.includes('v1.6'), 'v1.6 reference present')
assert(docs.includes('v1.5'), 'v1.5 reference present')
assert(docs.includes('v1.4'), 'v1.4 reference present')

const enumValues = ['data_room', 'pitch_deck', 'strategic_partnership', 'due_diligence', 'institutional_relations', 'fundraising_readiness']
assert(enumValues.every((value) => types.includes(`'${value}'`)), 'investor room areas valid')

console.log('PASS SenseTrust Investor Room v1.7 integrity suite complete')
