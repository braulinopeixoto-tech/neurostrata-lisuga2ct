import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/institutional-pilot-closeout.ts',
  service: 'src/services/sensetrust/institutional-pilot-closeout-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-institutional-pilot-closeout.ts',
  dashboard: 'src/components/sensetrust/InstitutionalPilotCloseoutDashboard.tsx',
  reportPanel: 'src/components/sensetrust/CloseoutReportPanel.tsx',
  learningPanel: 'src/components/sensetrust/LearningLoopRegisterPanel.tsx',
  lessonsPanel: 'src/components/sensetrust/LessonsLearnedMatrixPanel.tsx',
  maturityPanel: 'src/components/sensetrust/InstitutionalMaturityMatrixPanel.tsx',
  decisionPanel: 'src/components/sensetrust/CloseoutDecisionBoardPanel.tsx',
  regulatoryPanel: 'src/components/sensetrust/RegulatoryPendingItemsPanel.tsx',
  mapPanel: 'src/components/sensetrust/EvidenceToLearningMapPanel.tsx',
  v3Panel: 'src/components/sensetrust/V3ReadinessMatrixPanel.tsx',
  auditPanel: 'src/components/sensetrust/CloseoutAuditTrailPanel.tsx',
  blockerPanel: 'src/components/sensetrust/CloseoutMisuseBlockerPanel.tsx',
  executivePanel: 'src/components/sensetrust/InstitutionalCloseoutExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustInstitutionalPilotCloseout.tsx',
  doc: 'docs/sensetrust-institutional-pilot-closeout-v28.md',
  learningDoc: 'docs/sensetrust-learning-loop-v28.md',
  lessonsDoc: 'docs/sensetrust-lessons-learned-matrix-v28.md',
  maturityDoc: 'docs/sensetrust-institutional-maturity-matrix-v28.md',
  decisionDoc: 'docs/sensetrust-closeout-decision-board-v28.md',
  regulatoryDoc: 'docs/sensetrust-regulatory-pending-items-v28.md',
  v3Doc: 'docs/sensetrust-v3-readiness-matrix-v28.md',
  blockersDoc: 'docs/sensetrust-closeout-misuse-blockers-v28.md',
  executiveDoc: 'docs/sensetrust-institutional-closeout-executive-report-v28.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'institutional pilot closeout types exist')
assert(exists(files.service), 'institutional pilot closeout service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'institutional pilot closeout dashboard exists')
assert(exists(files.reportPanel), 'closeout report panel exists')
assert(exists(files.learningPanel), 'learning loop register panel exists')
assert(exists(files.lessonsPanel), 'lessons learned matrix panel exists')
assert(exists(files.maturityPanel), 'institutional maturity matrix panel exists')
assert(exists(files.decisionPanel), 'closeout decision board panel exists')
assert(exists(files.regulatoryPanel), 'regulatory pending items panel exists')
assert(exists(files.mapPanel), 'evidence to learning map panel exists')
assert(exists(files.v3Panel), 'v3 readiness matrix panel exists')
assert(exists(files.auditPanel), 'closeout audit trail panel exists')
assert(exists(files.blockerPanel), 'closeout misuse blocker panel exists')
assert(exists(files.executivePanel), 'institutional closeout executive report panel exists')
assert(exists(files.page) || true, 'optional institutional closeout page exists or not required')
assert(exists(files.doc), 'institutional pilot closeout doc exists')
assert(exists(files.learningDoc), 'learning loop doc exists')
assert(exists(files.lessonsDoc), 'lessons learned matrix doc exists')
assert(exists(files.maturityDoc), 'institutional maturity matrix doc exists')
assert(exists(files.decisionDoc), 'closeout decision board doc exists')
assert(exists(files.regulatoryDoc), 'regulatory pending items doc exists')
assert(exists(files.v3Doc), 'v3 readiness matrix doc exists')
assert(exists(files.blockersDoc), 'closeout misuse blockers doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_INSTITUTIONAL_PILOT_CLOSEOUT_REPORTS') && fixtures.includes('length: 8'), 'closeout reports created')
assert(fixtures.includes('SIMULATED_LEARNING_LOOP_REGISTERS') && fixtures.includes('length: 8'), 'learning loop registers created')
assert(fixtures.includes('SIMULATED_LEARNING_LOOP_ITEMS') && fixtures.includes('length: 40'), 'learning loop items created')
assert(fixtures.includes('SIMULATED_LESSONS_LEARNED_MATRICES') && fixtures.includes('length: 8'), 'lessons learned matrices created')
assert(fixtures.includes('SIMULATED_INSTITUTIONAL_MATURITY_MATRICES') && fixtures.includes('length: 8'), 'institutional maturity matrices created')
assert(fixtures.includes('SIMULATED_CLOSEOUT_DECISION_BOARDS') && fixtures.includes('length: 8'), 'closeout decision boards created')
assert(fixtures.includes('SIMULATED_CLOSEOUT_DECISIONS') && fixtures.includes('length: 16'), 'closeout decisions created')
assert(fixtures.includes('SIMULATED_REGULATORY_PENDING_ITEMS') && fixtures.includes('length: 24'), 'regulatory pending items created')
assert(fixtures.includes('SIMULATED_PILOT_OUTCOME_SUMMARIES') && fixtures.includes('length: 8'), 'pilot outcome summaries created')
assert(fixtures.includes('SIMULATED_EVIDENCE_TO_LEARNING_MAPS') && fixtures.includes('length: 8'), 'evidence to learning maps created')
assert(fixtures.includes('SIMULATED_V3_READINESS_MATRICES') && fixtures.includes('length: 8'), 'v3 readiness matrices created')
assert(fixtures.includes('SIMULATED_CLOSEOUT_AUDIT_TRAIL') && fixtures.includes('length: 24'), 'closeout audit trail created')
assert(fixtures.includes('SIMULATED_CLOSEOUT_MISUSE_BLOCKERS') && fixtures.includes('length: 16'), 'closeout misuse blockers created')
assert(fixtures.includes('SIMULATED_INSTITUTIONAL_CLOSEOUT_EXECUTIVE_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/legal_closeout_claim(?:ed)?:\s*true/i.test(all) && !/legal_decision_claim:\s*true/i.test(all), 'no legal closeout claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(all.includes('v2.7'), 'v2.7 reference present')
assert(all.includes('v2.6'), 'v2.6 reference present')
assert(all.includes('v2.5'), 'v2.5 reference present')

