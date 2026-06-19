import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-partner-engagement-control-room.ts',
  service: 'src/services/sensetrust/strategic-partner-engagement-control-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-partner-engagement-control-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPartnerEngagementControlRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPartnerEngagementControlRoomPanel.tsx',
  trackPanel: 'src/components/sensetrust/PartnerEngagementTrackPanel.tsx',
  ledgerPanel: 'src/components/sensetrust/PartnerInteractionLedgerPanel.tsx',
  meetingPanel: 'src/components/sensetrust/PartnerMeetingSimulationBoardPanel.tsx',
  responsePanel: 'src/components/sensetrust/PartnerResponseMatrixPanel.tsx',
  objectionPanel: 'src/components/sensetrust/PartnerObjectionResolutionMapPanel.tsx',
  riskPanel: 'src/components/sensetrust/PartnerEngagementRiskRegisterPanel.tsx',
  followUpPanel: 'src/components/sensetrust/PartnerFollowUpDecisionBoardPanel.tsx',
  scorePanel: 'src/components/sensetrust/PartnerEngagementReadinessScorePanel.tsx',
  humanPanel: 'src/components/sensetrust/PartnerHumanReviewEscalationQueuePanel.tsx',
  guardrailPanel: 'src/components/sensetrust/PartnerBoundaryClaimsGuardrailPanel.tsx',
  auditPanel: 'src/components/sensetrust/PartnerEngagementAuditTrailPanel.tsx',
  reportPanel: 'src/components/sensetrust/StrategicPartnerEngagementExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPartnerEngagementControlRoom.tsx',
  doc: 'docs/sensetrust-strategic-partner-engagement-control-room-v35.md',
  tracksDoc: 'docs/sensetrust-partner-engagement-tracks-v35.md',
  ledgerDoc: 'docs/sensetrust-partner-interaction-ledger-v35.md',
  meetingDoc: 'docs/sensetrust-partner-meeting-simulation-board-v35.md',
  responseDoc: 'docs/sensetrust-partner-response-matrix-v35.md',
  objectionDoc: 'docs/sensetrust-partner-objection-resolution-map-v35.md',
  riskDoc: 'docs/sensetrust-partner-engagement-risk-register-v35.md',
  followUpDoc: 'docs/sensetrust-partner-follow-up-decision-board-v35.md',
  scoreDoc: 'docs/sensetrust-partner-engagement-readiness-score-v35.md',
  humanDoc: 'docs/sensetrust-partner-human-review-escalation-queue-v35.md',
  guardrailDoc: 'docs/sensetrust-partner-boundary-claims-guardrail-v35.md',
  auditDoc: 'docs/sensetrust-partner-engagement-audit-trail-v35.md',
  reportDoc: 'docs/sensetrust-strategic-partner-engagement-executive-report-v35.md',
}
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([key, file]) => assert(exists(file), `${key} exists`))
const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const app = read('src/App.tsx')
const all = `${types}\n${service}\n${fixtures}\n${docs}\n${app}`
const countChecks = [
  ['SIMULATED_PARTNER_ENGAGEMENT_ROOMS', 'length: 8', 'engagement rooms created'],
  ['SIMULATED_PARTNER_ENGAGEMENT_TRACKS', 'length: 24', 'engagement tracks created'],
  ['SIMULATED_PARTNER_INTERACTION_LEDGERS', 'length: 8', 'interaction ledgers created'],
  ['SIMULATED_PARTNER_INTERACTION_LEDGER_ITEMS', 'length: 48', 'interaction ledger items created'],
  ['SIMULATED_PARTNER_MEETING_BOARDS', 'length: 8', 'meeting simulation boards created'],
  ['SIMULATED_PARTNER_RESPONSE_MATRICES', 'length: 8', 'response matrices created'],
  ['SIMULATED_PARTNER_OBJECTION_RESOLUTION_MAPS', 'length: 8', 'objection resolution maps created'],
  ['SIMULATED_PARTNER_ENGAGEMENT_RISK_REGISTERS', 'length: 8', 'engagement risk registers created'],
  ['SIMULATED_PARTNER_FOLLOW_UP_DECISION_BOARDS', 'length: 8', 'follow-up decision boards created'],
  ['SIMULATED_PARTNER_ENGAGEMENT_SCORES', 'length: 8', 'engagement readiness scores created'],
  ['SIMULATED_PARTNER_HUMAN_REVIEW_ESCALATION_QUEUES', 'length: 8', 'human review escalation queues created'],
  ['SIMULATED_PARTNER_BOUNDARY_CLAIMS_GUARDRAILS', 'length: 8', 'boundary claims guardrails created'],
  ['SIMULATED_PARTNER_ENGAGEMENT_AUDIT_TRAILS', 'length: 8', 'engagement audit trails created'],
  ['SIMULATED_PARTNER_ENGAGEMENT_EXECUTIVE_REPORTS', 'length: 8', 'executive reports created'],
]
countChecks.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
assert(app.includes('/sensetrust-strategic-partner-engagement-control-room'), 'route registered')
assert(all.includes('SenseTrust Strategic Partner Readiness Room v3.4'), 'v3.4 reference present')
assert(all.includes('SenseTrust Strategic Scale Evidence Simulator v3.3'), 'v3.3 reference present')
assert(all.includes('SenseTrust Strategic Scale Simulation Console v3.2'), 'v3.2 reference present')
assert(all.includes('SenseTrust Git Freeze Automation Memory'), 'Git Freeze Automation Memory reference present')
assert(all.includes('FETCH_HEAD ACL Recovery'), 'FETCH_HEAD ACL Recovery reference present')
assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claim(?:ed)?:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claim(?:ed)?:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_impact_claim(?:ed)?:\s*true/i.test(all), 'no real impact claimed')
assert(!/real_capacity_claim(?:ed)?:\s*true/i.test(all), 'no real capacity claimed')
assert(!/real_scientific_validation_claim(?:ed)?:\s*true/i.test(all) && !/scientific_validation_claim:\s*true/i.test(all), 'no real scientific validation claimed')
assert(!/external_certification_claim(?:ed)?:\s*true/i.test(all), 'no external certification claimed')
assert(!/real_crm_claim(?:ed)?:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_email_automation_claim(?:ed)?:\s*true/i.test(all), 'no real email automation claimed')
