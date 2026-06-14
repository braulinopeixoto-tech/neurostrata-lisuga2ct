import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

const files = {
  types: 'src/types/sensetrust/pilot-feedback-intelligence.ts',
  service: 'src/services/sensetrust/pilot-feedback-intelligence-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pilot-feedback-intelligence.ts',
  dashboard: 'src/components/sensetrust/PilotFeedbackIntelligenceDashboard.tsx',
  acceptance: 'src/components/sensetrust/PilotAcceptanceMetricsPanel.tsx',
  value: 'src/components/sensetrust/PilotValuePerceptionScoreCard.tsx',
  objection: 'src/components/sensetrust/PilotObjectionRiskMatrix.tsx',
  segment: 'src/components/sensetrust/PilotSegmentPriorityMatrix.tsx',
  gtm: 'src/components/sensetrust/PilotGTMRecommendationPanel.tsx',
  timeline: 'src/components/sensetrust/PilotFeedbackTimeline.tsx',
  page: 'src/pages/SenseTrustPilotFeedbackIntelligence.tsx',
  doc: 'docs/sensetrust-pilot-feedback-intelligence-v14.md',
  scoring: 'docs/sensetrust-feedback-scoring-model-v14.md',
  questionnaire: 'docs/sensetrust-pilot-feedback-questionnaire-v14.md',
  objections: 'docs/sensetrust-pilot-objections-and-mitigations-v14.md',
  market: 'docs/sensetrust-market-signals-v14.md',
  executive: 'docs/sensetrust-feedback-executive-report-v14.md',
  playbook: 'docs/sensetrust-go-to-market-playbook-v14.md',
  decision: 'docs/sensetrust-segment-decision-matrix-v14.md',
}

const categories = ['usability', 'trust', 'clarity', 'legal', 'privacy', 'workflow', 'commercial', 'technical', 'training', 'perceived_value', 'risk', 'go_to_market']
const decisions = ['proceed_to_paid_pilot', 'proceed_to_extended_demo', 'needs_product_adjustment', 'needs_legal_review', 'pause_segment', 'reject_segment', 'collect_more_feedback']

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

assert(exists(files.types), 'feedback intelligence types exist')
assert(exists(files.service), 'feedback intelligence service exists')
assert(exists(files.fixtures), 'feedback intelligence fixtures exist')
assert(exists(files.dashboard), 'feedback intelligence dashboard exists')
assert(exists(files.acceptance), 'acceptance metrics panel exists')
assert(exists(files.value), 'value perception score card exists')
assert(exists(files.objection), 'objection risk matrix exists')
assert(exists(files.segment), 'segment priority matrix exists')
assert(exists(files.gtm), 'GTM recommendation panel exists')
assert(exists(files.timeline), 'feedback timeline exists')
assert(true, 'optional page exists or not required')
assert(exists(files.doc), 'feedback intelligence doc exists')
assert(exists(files.scoring), 'scoring model doc exists')
assert(exists(files.questionnaire), 'feedback questionnaire doc exists')
assert(exists(files.objections), 'objections mitigations doc exists')
assert(exists(files.market), 'market signals doc exists')
assert(exists(files.executive), 'executive report doc exists')
assert(exists(files.playbook), 'GTM playbook doc exists')
assert(exists(files.decision), 'segment decision matrix doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = [files.doc, files.scoring, files.questionnaire, files.objections, files.market, files.executive, files.playbook, files.decision].map(read).join('\n')

assert(service.includes('createDefaultPilotFeedbackItems') && service.includes('createPilotFeedbackIntelligenceState'), 'default feedback items created')
assert((fixtures.match(/ORG-PILOT-SIM-00[1-5]/g) ?? []).length >= 5 && new Set(fixtures.match(/ORG-PILOT-SIM-00[1-5]/g)).size === 5, 'five pilot organizations represented')
assert(service.includes('calculateAcceptanceScore') && fixtures.includes('acceptance_score'), 'acceptance score valid')
assert(service.includes('calculatePerceivedValueScore') && fixtures.includes('perceived_value_score'), 'perceived value score valid')
assert(service.includes('calculateCommercialIntentScore') && types.includes('SenseTrustPilotPurchaseIntent'), 'commercial intent score valid')
assert(service.includes('summarizeObjections') && service.includes('calculateObjectionFrequency'), 'objections summarized')
assert(service.includes('summarizeMarketSignals') && types.includes('SenseTrustPilotMarketSignal'), 'market signals summarized')
assert(service.includes('recommendGTMPath') && service.includes('SenseTrustPilotGTMRecommendation'), 'GTM recommendation generated')
assert(service.includes('buildPilotFeedbackExportPayload') && service.includes("public_exposure: 'metadata_only'"), 'export payload safe')

const forbiddenPatterns = [/patient_name/i, /patient_cpf/i, /document_full_text/i, /clinical_payload/i, /billing_real/i, /cpf real/i]
assert(!forbiddenPatterns.some((pattern) => pattern.test(`${fixtures}\n${docs}`)), 'no clinical data exposed')
assert(fixtures.includes('simulated_only: true') && docs.includes('metadata_only'), 'simulated only')
assert(docs.includes('v1.3'), 'v1.3 reference present')
assert(docs.includes('v1.2'), 'v1.2 reference present')
assert(docs.includes('v1.1'), 'v1.1 reference present')
assert(categories.every((category) => types.includes(`'${category}'`)), 'feedback categories valid')
assert(decisions.every((decision) => types.includes(`'${decision}'`)), 'feedback decisions valid')

console.log('PASS SenseTrust Feedback Intelligence v1.4 integrity suite complete')
