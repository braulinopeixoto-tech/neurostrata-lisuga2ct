import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-partnership-conversion-decision-room.ts',
  service: 'src/services/sensetrust/strategic-partnership-conversion-decision-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-partnership-conversion-decision-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPartnershipConversionDecisionRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPartnershipConversionDecisionRoomPanel.tsx',
  candidatePanel: 'src/components/sensetrust/PartnershipConversionCandidatePanel.tsx',
  matrixPanel: 'src/components/sensetrust/ConversionQualificationMatrixPanel.tsx',
  intentPanel: 'src/components/sensetrust/NonBindingIntentRegisterPanel.tsx',
  diligencePanel: 'src/components/sensetrust/PartnershipDueDiligenceReadinessBoardPanel.tsx',
  legalPanel: 'src/components/sensetrust/LegalReviewRoutingBoardPanel.tsx',
  scientificPanel: 'src/components/sensetrust/ScientificReviewRoutingBoardPanel.tsx',
  regulatoryPanel: 'src/components/sensetrust/RegulatoryReviewRoutingBoardPanel.tsx',
  riskPanel: 'src/components/sensetrust/ConversionRiskRegisterPanel.tsx',
  decisionPanel: 'src/components/sensetrust/ConversionDecisionBoardPanel.tsx',
  scorePanel: 'src/components/sensetrust/ConversionReadinessScorecardPanel.tsx',
  humanPanel: 'src/components/sensetrust/HumanReviewConversionQueuePanel.tsx',
  guardrailPanel: 'src/components/sensetrust/ConversionBoundaryClaimsGuardrailPanel.tsx',
  auditPanel: 'src/components/sensetrust/ConversionAuditTrailPanel.tsx',
  reportPanel: 'src/components/sensetrust/StrategicPartnershipConversionExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPartnershipConversionDecisionRoom.tsx',
}
const docs = ['docs/sensetrust-strategic-partnership-conversion-decision-room-v36.md','docs/sensetrust-partnership-conversion-candidates-v36.md','docs/sensetrust-conversion-qualification-matrix-v36.md','docs/sensetrust-non-binding-intent-register-v36.md','docs/sensetrust-partnership-due-diligence-readiness-board-v36.md','docs/sensetrust-legal-review-routing-board-v36.md','docs/sensetrust-scientific-review-routing-board-v36.md','docs/sensetrust-regulatory-review-routing-board-v36.md','docs/sensetrust-conversion-risk-register-v36.md','docs/sensetrust-conversion-decision-board-v36.md','docs/sensetrust-conversion-readiness-scorecard-v36.md','docs/sensetrust-human-review-conversion-queue-v36.md','docs/sensetrust-conversion-boundary-claims-guardrail-v36.md','docs/sensetrust-conversion-audit-trail-v36.md','docs/sensetrust-strategic-partnership-conversion-executive-report-v36.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([key, file]) => assert(exists(file), `${key} exists`))
docs.forEach((file) => assert(exists(file), `${file} exists`))
const fixtures = read(files.fixtures)
const all = `${read(files.types)}\n${read(files.service)}\n${fixtures}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const counts = [
  ['SIMULATED_PARTNERSHIP_CONVERSION_ROOMS', 'length: 8', 'conversion rooms created'],
  ['SIMULATED_PARTNERSHIP_CONVERSION_CANDIDATES', 'length: 24', 'conversion candidates created'],
  ['SIMULATED_CONVERSION_QUALIFICATION_MATRICES', 'length: 8', 'qualification matrices created'],
  ['SIMULATED_NON_BINDING_INTENT_REGISTERS', 'length: 8', 'non-binding intent registers created'],
  ['SIMULATED_DUE_DILIGENCE_READINESS_BOARDS', 'length: 8', 'due diligence readiness boards created'],
  ['SIMULATED_LEGAL_REVIEW_ROUTING_BOARDS', 'length: 8', 'legal review routing boards created'],
  ['SIMULATED_SCIENTIFIC_REVIEW_ROUTING_BOARDS', 'length: 8', 'scientific review routing boards created'],
  ['SIMULATED_REGULATORY_REVIEW_ROUTING_BOARDS', 'length: 8', 'regulatory review routing boards created'],
  ['SIMULATED_CONVERSION_RISK_REGISTERS', 'length: 8', 'conversion risk registers created'],
  ['SIMULATED_CONVERSION_DECISION_BOARDS', 'length: 8', 'conversion decision boards created'],
  ['SIMULATED_CONVERSION_READINESS_SCORECARDS', 'length: 8', 'conversion readiness scorecards created'],
  ['SIMULATED_HUMAN_REVIEW_CONVERSION_QUEUES', 'length: 8', 'human review conversion queues created'],
  ['SIMULATED_CONVERSION_BOUNDARY_CLAIMS_GUARDRAILS', 'length: 8', 'conversion boundary claims guardrails created'],
  ['SIMULATED_CONVERSION_AUDIT_TRAILS', 'length: 8', 'conversion audit trails created'],
  ['SIMULATED_PARTNERSHIP_CONVERSION_EXECUTIVE_REPORTS', 'length: 8', 'executive reports created'],
]
counts.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
assert(all.includes('/sensetrust-strategic-partnership-conversion-decision-room'), 'route registered')
assert(all.includes('SenseTrust Strategic Partner Engagement Control Room v3.5'), 'v3.5 reference present')
assert(all.includes('SenseTrust Strategic Partner Readiness Room v3.4'), 'v3.4 reference present')
assert(all.includes('SenseTrust Strategic Scale Evidence Simulator v3.3'), 'v3.3 reference present')
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
assert(!/binding_proposal_claim(?:ed)?:\s*true/i.test(all), 'no binding proposal claimed')
assert(!/commercial_commitment_claim(?:ed)?:\s*true/i.test(all), 'no commercial commitment claimed')
assert(!/legal_commitment_claim(?:ed)?:\s*true/i.test(all), 'no legal commitment claimed')
