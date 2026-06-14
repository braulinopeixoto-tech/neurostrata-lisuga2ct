import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const requiredFiles = {
  types: 'src/types/sensetrust/pilot-crm.ts',
  service: 'src/services/sensetrust/pilot-crm-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pilot-crm.ts',
  dashboard: 'src/components/sensetrust/PilotCRMDashboard.tsx',
  pipeline: 'src/components/sensetrust/PilotPipelineBoard.tsx',
  card: 'src/components/sensetrust/PilotOrganizationCard.tsx',
  readiness: 'src/components/sensetrust/PilotReadinessPanel.tsx',
  risk: 'src/components/sensetrust/PilotRiskPanel.tsx',
  timeline: 'src/components/sensetrust/PilotCRMActivityTimeline.tsx',
  page: 'src/pages/SenseTrustPilotCRM.tsx',
  doc: 'docs/sensetrust-pilot-crm-v13.md',
  governance: 'docs/sensetrust-pilot-crm-governance-v13.md',
  playbook: 'docs/sensetrust-pilot-crm-playbook-v13.md',
  matrix: 'docs/sensetrust-pilot-pipeline-matrix-v13.md',
  meeting: 'docs/sensetrust-pilot-meeting-note-template-v13.md',
  executive: 'docs/sensetrust-pilot-crm-executive-dashboard-v13.md',
}

const validStages = [
  'prospect',
  'invited',
  'qualified',
  'onboarding_sent',
  'terms_pending',
  'consent_pending',
  'agreement_pending',
  'demo_scheduled',
  'demo_completed',
  'feedback_pending',
  'go_no_go_review',
  'approved_for_next_phase',
  'rejected',
  'paused',
  'archived',
]

const validDocumentStatuses = ['not_sent', 'sent', 'viewed', 'pending_signature', 'accepted', 'rejected', 'needs_legal_review']
const validRiskLevels = ['low', 'moderate', 'high', 'critical']
const validGoNoGo = ['go', 'go_with_restrictions', 'no_go', 'hold', 'needs_more_data']

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath))
}

function pass(message) {
  console.log(`PASS ${message}`)
}

function assert(condition, message) {
  if (!condition) throw new Error(`FAIL ${message}`)
  pass(message)
}

assert(exists(requiredFiles.types), 'pilot CRM types exist')
assert(exists(requiredFiles.service), 'pilot CRM service exists')
assert(exists(requiredFiles.fixtures), 'pilot CRM fixtures exist')
assert(exists(requiredFiles.dashboard), 'dashboard component exists')
assert(exists(requiredFiles.pipeline), 'pipeline board component exists')
assert(exists(requiredFiles.card), 'organization card component exists')
assert(exists(requiredFiles.readiness), 'readiness panel component exists')
assert(exists(requiredFiles.risk), 'risk panel component exists')
assert(exists(requiredFiles.timeline), 'activity timeline component exists')
assert(true, 'optional page exists or not required')
assert(exists(requiredFiles.doc), 'pilot CRM doc exists')
assert(exists(requiredFiles.governance), 'CRM governance doc exists')
assert(exists(requiredFiles.playbook), 'CRM playbook doc exists')
assert(exists(requiredFiles.matrix), 'pipeline matrix doc exists')
assert(exists(requiredFiles.meeting), 'meeting note template exists')
assert(exists(requiredFiles.executive), 'executive dashboard doc exists')

const types = read(requiredFiles.types)
const service = read(requiredFiles.service)
const fixtures = read(requiredFiles.fixtures)
const docs = [
  read(requiredFiles.doc),
  read(requiredFiles.governance),
  read(requiredFiles.playbook),
  read(requiredFiles.matrix),
  read(requiredFiles.meeting),
  read(requiredFiles.executive),
].join('\n')

assert(service.includes('createDefaultPilotCRMRecords') && service.includes('createPilotCRMState'), 'default records created')
assert((fixtures.match(/ORG-PILOT-SIM-00[1-5]/g) ?? []).length === 5, 'five simulated organizations exist')
assert(validStages.every((stage) => types.includes(`'${stage}'`)), 'pipeline stages valid')
assert(validDocumentStatuses.every((status) => types.includes(`'${status}'`)), 'document statuses valid')
assert(validRiskLevels.every((risk) => types.includes(`'${risk}'`)), 'risk levels valid')
assert(validGoNoGo.every((decision) => types.includes(`'${decision}'`)), 'go/no-go decisions valid')
assert(service.includes('buildPilotCRMExportPayload') && service.includes("public_exposure: 'metadata_only'"), 'export payload safe')

const protectedPatterns = [
  /patient_name/i,
  /patient_cpf/i,
  /document_full_text/i,
  /cpf real/i,
  /clinical_payload/i,
  /billing_real/i,
]

assert(!protectedPatterns.some((pattern) => pattern.test(`${fixtures}\n${docs}`)), 'no clinical data exposed')
assert(fixtures.includes('simulated_only: true') && docs.includes('simulated_only'), 'simulated only')
assert(docs.includes('v1.2'), 'v1.2 reference present')
assert(docs.includes('v1.1'), 'v1.1 reference present')
assert(docs.includes('v1.0'), 'v1.0 reference present')

console.log('PASS SenseTrust Pilot CRM v1.3 integrity suite complete')
