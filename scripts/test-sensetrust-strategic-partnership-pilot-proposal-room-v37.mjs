import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-partnership-pilot-proposal-room.ts',
  service: 'src/services/sensetrust/strategic-partnership-pilot-proposal-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-partnership-pilot-proposal-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPartnershipPilotProposalRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPartnershipPilotProposalRoomPanel.tsx',
  candidatePanel: 'src/components/sensetrust/PilotProposalCandidatePanel.tsx',
  scopePanel: 'src/components/sensetrust/NonBindingPilotScopeMatrixPanel.tsx',
  valuePanel: 'src/components/sensetrust/PilotValueHypothesisCanvasPanel.tsx',
  entryPanel: 'src/components/sensetrust/PilotEntryCriteriaBoardPanel.tsx',
  exitPanel: 'src/components/sensetrust/PilotExitCriteriaBoardPanel.tsx',
  responsibilityPanel: 'src/components/sensetrust/PilotResponsibilityMatrixPanel.tsx',
  evidencePanel: 'src/components/sensetrust/PilotEvidenceRequirementMapPanel.tsx',
  riskPanel: 'src/components/sensetrust/PilotRiskInterruptionRegisterPanel.tsx',
  legalPanel: 'src/components/sensetrust/PilotLegalReviewQueuePanel.tsx',
  scientificPanel: 'src/components/sensetrust/PilotScientificReviewQueuePanel.tsx',
  regulatoryPanel: 'src/components/sensetrust/PilotRegulatoryReviewQueuePanel.tsx',
  humanPanel: 'src/components/sensetrust/PilotHumanReviewBoardPanel.tsx',
  guardrailPanel: 'src/components/sensetrust/PilotBoundaryClaimsGuardrailPanel.tsx',
  auditPanel: 'src/components/sensetrust/PilotProposalAuditTrailPanel.tsx',
  reportPanel: 'src/components/sensetrust/StrategicPartnershipPilotProposalExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPartnershipPilotProposalRoom.tsx',
}
const docs = [
  'docs/sensetrust-strategic-partnership-pilot-proposal-room-v37.md',
  'docs/sensetrust-pilot-proposal-candidates-v37.md',
  'docs/sensetrust-non-binding-pilot-scope-matrix-v37.md',
  'docs/sensetrust-pilot-value-hypothesis-canvas-v37.md',
  'docs/sensetrust-pilot-entry-criteria-board-v37.md',
  'docs/sensetrust-pilot-exit-criteria-board-v37.md',
  'docs/sensetrust-pilot-responsibility-matrix-v37.md',
  'docs/sensetrust-pilot-evidence-requirement-map-v37.md',
  'docs/sensetrust-pilot-risk-interruption-register-v37.md',
  'docs/sensetrust-pilot-legal-review-queue-v37.md',
  'docs/sensetrust-pilot-scientific-review-queue-v37.md',
  'docs/sensetrust-pilot-regulatory-review-queue-v37.md',
  'docs/sensetrust-pilot-human-review-board-v37.md',
  'docs/sensetrust-pilot-boundary-claims-guardrail-v37.md',
  'docs/sensetrust-pilot-proposal-audit-trail-v37.md',
  'docs/sensetrust-strategic-partnership-pilot-proposal-executive-report-v37.md',
]
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

Object.entries(files).forEach(([key, file]) => assert(exists(file), `${key} exists`))
docs.forEach((file) => assert(exists(file), `${file} exists`))

const fixtures = read(files.fixtures)
const all = `${read(files.types)}\n${read(files.service)}\n${fixtures}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const counts = [
  ['SIMULATED_PILOT_PROPOSAL_ROOMS', 'length: 8', 'pilot proposal rooms created'],
  ['SIMULATED_PILOT_PROPOSAL_CANDIDATES', 'length: 24', 'pilot proposal candidates created'],
  ['SIMULATED_NON_BINDING_SCOPE_MATRICES', 'length: 8', 'non-binding scope matrices created'],
  ['SIMULATED_VALUE_HYPOTHESIS_CANVASES', 'length: 8', 'value hypothesis canvases created'],
  ['SIMULATED_ENTRY_CRITERIA_BOARDS', 'length: 8', 'entry criteria boards created'],
  ['SIMULATED_EXIT_CRITERIA_BOARDS', 'length: 8', 'exit criteria boards created'],
  ['SIMULATED_RESPONSIBILITY_MATRICES', 'length: 8', 'responsibility matrices created'],
  ['SIMULATED_EVIDENCE_REQUIREMENT_MAPS', 'length: 8', 'evidence requirement maps created'],
  ['SIMULATED_RISK_INTERRUPTION_REGISTERS', 'length: 8', 'risk interruption registers created'],
  ['SIMULATED_LEGAL_REVIEW_QUEUES', 'length: 8', 'legal review queues created'],
  ['SIMULATED_SCIENTIFIC_REVIEW_QUEUES', 'length: 8', 'scientific review queues created'],
  ['SIMULATED_REGULATORY_REVIEW_QUEUES', 'length: 8', 'regulatory review queues created'],
  ['SIMULATED_HUMAN_REVIEW_BOARDS', 'length: 8', 'human review boards created'],
  ['SIMULATED_BOUNDARY_CLAIMS_GUARDRAILS', 'length: 8', 'boundary claims guardrails created'],
  ['SIMULATED_PROPOSAL_AUDIT_TRAILS', 'length: 8', 'proposal audit trails created'],
  ['SIMULATED_PILOT_PROPOSAL_EXECUTIVE_REPORTS', 'length: 8', 'executive reports created'],
]
counts.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
assert(all.includes('/sensetrust-strategic-partnership-pilot-proposal-room'), 'route registered')
assert(all.includes('SenseTrust Strategic Partnership Conversion Decision Room v3.6') || all.includes('Strategic Partnership Conversion Decision Room'), 'v3.6 reference present')
assert(all.includes('Strategic Partner Engagement Control Room') || all.includes('v3.5'), 'v3.5 reference present')
assert(all.includes('Strategic Partner Readiness Room') || all.includes('v3.4'), 'v3.4 reference present')
assert(all.includes('Strategic Scale Evidence Simulator'), 'evidence simulator reference present')
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
assert(!/real_loi_claim(?:ed)?:\s*true/i.test(all), 'no real LOI claimed')
assert(!/real_mou_claim(?:ed)?:\s*true/i.test(all), 'no real MOU claimed')
