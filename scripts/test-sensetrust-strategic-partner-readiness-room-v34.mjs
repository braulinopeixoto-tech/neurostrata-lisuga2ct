import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-partner-readiness-room.ts',
  service: 'src/services/sensetrust/strategic-partner-readiness-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-partner-readiness-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPartnerReadinessRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPartnerReadinessRoomPanel.tsx',
  profilePanel: 'src/components/sensetrust/PartnerReadinessProfilePanel.tsx',
  fitPanel: 'src/components/sensetrust/PartnerFitMatrixPanel.tsx',
  diligencePanel: 'src/components/sensetrust/StrategicDiligenceChecklistPanel.tsx',
  briefPanel: 'src/components/sensetrust/PartnerEvidenceBriefPanel.tsx',
  objectionPanel: 'src/components/sensetrust/PartnerObjectionMapPanel.tsx',
  riskPanel: 'src/components/sensetrust/PartnerRiskReviewBoardPanel.tsx',
  scorePanel: 'src/components/sensetrust/PartnerReadinessScorecardPanel.tsx',
  decisionPanel: 'src/components/sensetrust/PartnerDecisionPathwayPanel.tsx',
  queuePanel: 'src/components/sensetrust/PartnerHumanReviewQueuePanel.tsx',
  meetingPanel: 'src/components/sensetrust/PartnerMeetingPreparationKitPanel.tsx',
  followUpPanel: 'src/components/sensetrust/PartnerFollowUpGovernancePanel.tsx',
  blockerPanel: 'src/components/sensetrust/PartnerMisuseBlockerPanel.tsx',
  reportPanel: 'src/components/sensetrust/StrategicPartnerReadinessExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPartnerReadinessRoom.tsx',
  doc: 'docs/sensetrust-strategic-partner-readiness-room-v34.md',
  profileDoc: 'docs/sensetrust-partner-readiness-profiles-v34.md',
  fitDoc: 'docs/sensetrust-partner-fit-matrix-v34.md',
  diligenceDoc: 'docs/sensetrust-strategic-diligence-checklist-v34.md',
  briefDoc: 'docs/sensetrust-partner-evidence-brief-v34.md',
  objectionDoc: 'docs/sensetrust-partner-objection-map-v34.md',
  riskDoc: 'docs/sensetrust-partner-risk-review-board-v34.md',
  scoreDoc: 'docs/sensetrust-partner-readiness-scorecard-v34.md',
  decisionDoc: 'docs/sensetrust-partner-decision-pathway-v34.md',
  queueDoc: 'docs/sensetrust-partner-human-review-queue-v34.md',
  meetingDoc: 'docs/sensetrust-partner-meeting-preparation-kit-v34.md',
  followUpDoc: 'docs/sensetrust-partner-follow-up-governance-v34.md',
  blockersDoc: 'docs/sensetrust-partner-misuse-blockers-v34.md',
  reportDoc: 'docs/sensetrust-strategic-partner-readiness-executive-report-v34.md',
}
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([key, file]) => assert(exists(file) || key === 'page', `${key} exists`))
const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const app = read('src/App.tsx')
const all = `${types}\n${service}\n${fixtures}\n${docs}\n${app}`
const countChecks = [
  ['SIMULATED_PARTNER_READINESS_ROOMS', 'length: 8', 'partner readiness rooms created'],
  ['SIMULATED_PARTNER_PROFILES', 'length: 24', 'partner readiness profiles created'],
  ['SIMULATED_PARTNER_FIT_ITEMS', 'length: 32', 'partner fit items created'],
  ['SIMULATED_PARTNER_FIT_MATRICES', 'length: 8', 'partner fit matrices created'],
  ['SIMULATED_DILIGENCE_ITEMS', 'length: 48', 'strategic diligence items created'],
  ['SIMULATED_DILIGENCE_CHECKLISTS', 'length: 8', 'strategic diligence checklists created'],
  ['SIMULATED_PARTNER_EVIDENCE_BRIEF_ITEMS', 'length: 32', 'partner evidence brief items created'],
  ['SIMULATED_PARTNER_EVIDENCE_BRIEFS', 'length: 8', 'partner evidence briefs created'],
  ['SIMULATED_PARTNER_OBJECTION_ITEMS', 'length: 32', 'partner objection items created'],
  ['SIMULATED_PARTNER_OBJECTION_MAPS', 'length: 8', 'partner objection maps created'],
  ['SIMULATED_PARTNER_RISK_ITEMS', 'length: 32', 'partner risk items created'],
  ['SIMULATED_PARTNER_RISK_BOARDS', 'length: 8', 'partner risk boards created'],
  ['SIMULATED_PARTNER_SCORE_ITEMS', 'length: 32', 'partner score items created'],
  ['SIMULATED_PARTNER_SCORECARDS', 'length: 8', 'partner scorecards created'],
  ['SIMULATED_PARTNER_DECISION_ITEMS', 'length: 24', 'partner decision pathway items created'],
  ['SIMULATED_PARTNER_DECISION_PATHWAYS', 'length: 8', 'partner decision pathways created'],
  ['SIMULATED_PARTNER_HUMAN_REVIEW_ITEMS', 'length: 24', 'partner human review items created'],
  ['SIMULATED_PARTNER_HUMAN_REVIEW_QUEUES', 'length: 8', 'partner human review queues created'],
  ['SIMULATED_PARTNER_MEETING_ITEMS', 'length: 32', 'partner meeting preparation items created'],
  ['SIMULATED_PARTNER_MEETING_KITS', 'length: 8', 'partner meeting preparation kits created'],
  ['SIMULATED_PARTNER_FOLLOW_UP_ITEMS', 'length: 24', 'partner follow-up items created'],
  ['SIMULATED_PARTNER_FOLLOW_UP_GOVERNANCE', 'length: 8', 'partner follow-up governance created'],
  ['SIMULATED_PARTNER_MISUSE_BLOCKERS', 'length: 16', 'partner misuse blockers created'],
  ['SIMULATED_PARTNER_EXECUTIVE_REPORTS', 'length: 8', 'partner executive reports created'],
]
countChecks.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
assert(all.includes('/sensetrust-strategic-partner-readiness-room'), 'route registered')
assert(all.includes('SenseTrust Strategic Scale Evidence Simulator v3.3'), 'v3.3 reference present')
assert(all.includes('SenseTrust Strategic Scale Simulation Console v3.2'), 'v3.2 reference present')
assert(all.includes('SenseTrust Strategic Scale Operating Model v3.1'), 'v3.1 reference present')
assert(all.includes('SenseTrust Git Freeze Automation Memory'), 'git freeze automation memory reference present')
assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all) && !/real_revenue_claim:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all) && !/real_billing_claim:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_impact_claimed:\s*true/i.test(all) && !/real_impact_claim:\s*true/i.test(all), 'no real impact claimed')
assert(!/real_capacity_claimed:\s*true/i.test(all) && !/real_capacity_claim:\s*true/i.test(all), 'no real capacity claimed')
assert(!/real_scientific_validation_claim(?:ed)?:\s*true/i.test(all) && !/scientific_validation_claim:\s*true/i.test(all), 'no real scientific validation claimed')
assert(!/external_certification_claim(?:ed)?:\s*true/i.test(all), 'no external certification claimed')
