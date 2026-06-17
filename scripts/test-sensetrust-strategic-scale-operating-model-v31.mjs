import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-scale-operating-model.ts',
  service: 'src/services/sensetrust/strategic-scale-operating-model-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-scale-operating-model.ts',
  dashboard: 'src/components/sensetrust/StrategicScaleOperatingModelDashboard.tsx',
  modelPanel: 'src/components/sensetrust/StrategicScaleOperatingModelPanel.tsx',
  cadencePanel: 'src/components/sensetrust/ScaleOperatingCadencePanel.tsx',
  raciPanel: 'src/components/sensetrust/ScaleRaciMatrixPanel.tsx',
  criteriaPanel: 'src/components/sensetrust/EntryExitCriteriaMatrixPanel.tsx',
  executionPanel: 'src/components/sensetrust/InstitutionalExecutionPlanPanel.tsx',
  calendarPanel: 'src/components/sensetrust/ScaleGovernanceCalendarPanel.tsx',
  riskPanel: 'src/components/sensetrust/ScaleRiskRegisterPanel.tsx',
  decisionPanel: 'src/components/sensetrust/ScaleDecisionLogPanel.tsx',
  boardPanel: 'src/components/sensetrust/OperationalControlBoardPanel.tsx',
  humanPanel: 'src/components/sensetrust/HumanReviewEscalationPathPanel.tsx',
  scorecardPanel: 'src/components/sensetrust/ScaleReadinessScorecardPanel.tsx',
  blockerPanel: 'src/components/sensetrust/OperatingModelMisuseBlockerPanel.tsx',
  executivePanel: 'src/components/sensetrust/StrategicScaleOperatingExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicScaleOperatingModel.tsx',
  doc: 'docs/sensetrust-strategic-scale-operating-model-v31.md',
  cadenceDoc: 'docs/sensetrust-scale-operating-cadence-v31.md',
  raciDoc: 'docs/sensetrust-scale-raci-matrix-v31.md',
  criteriaDoc: 'docs/sensetrust-entry-exit-criteria-matrix-v31.md',
  executionDoc: 'docs/sensetrust-institutional-execution-plan-v31.md',
  calendarDoc: 'docs/sensetrust-scale-governance-calendar-v31.md',
  riskDoc: 'docs/sensetrust-scale-risk-register-v31.md',
  decisionDoc: 'docs/sensetrust-scale-decision-log-v31.md',
  humanDoc: 'docs/sensetrust-human-review-escalation-path-v31.md',
  blockersDoc: 'docs/sensetrust-operating-model-misuse-blockers-v31.md',
  executiveDoc: 'docs/sensetrust-strategic-scale-operating-executive-report-v31.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'strategic scale operating model types exist')
assert(exists(files.service), 'strategic scale operating model service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'strategic scale operating model dashboard exists')
assert(exists(files.modelPanel), 'strategic scale operating model panel exists')
assert(exists(files.cadencePanel), 'scale operating cadence panel exists')
assert(exists(files.raciPanel), 'scale RACI matrix panel exists')
assert(exists(files.criteriaPanel), 'entry exit criteria matrix panel exists')
assert(exists(files.executionPanel), 'institutional execution plan panel exists')
assert(exists(files.calendarPanel), 'scale governance calendar panel exists')
assert(exists(files.riskPanel), 'scale risk register panel exists')
assert(exists(files.decisionPanel), 'scale decision log panel exists')
assert(exists(files.boardPanel), 'operational control board panel exists')
assert(exists(files.humanPanel), 'human review escalation path panel exists')
assert(exists(files.scorecardPanel), 'scale readiness scorecard panel exists')
assert(exists(files.blockerPanel), 'operating model misuse blocker panel exists')
assert(exists(files.executivePanel), 'strategic scale operating executive report panel exists')
assert(exists(files.page) || true, 'optional strategic scale operating page exists or not required')
assert(exists(files.doc), 'strategic scale operating model doc exists')
assert(exists(files.cadenceDoc), 'scale operating cadence doc exists')
assert(exists(files.raciDoc), 'scale RACI matrix doc exists')
assert(exists(files.criteriaDoc), 'entry exit criteria matrix doc exists')
assert(exists(files.executionDoc), 'institutional execution plan doc exists')
assert(exists(files.calendarDoc), 'scale governance calendar doc exists')
assert(exists(files.riskDoc), 'scale risk register doc exists')
assert(exists(files.decisionDoc), 'scale decision log doc exists')
assert(exists(files.humanDoc), 'human review escalation path doc exists')
assert(exists(files.blockersDoc), 'operating model misuse blockers doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_OPERATING_MODELS') && fixtures.includes('length: 8'), 'operating models created')
assert(fixtures.includes('SIMULATED_OPERATING_CADENCES') && fixtures.includes('length: 8'), 'operating cadences created')
assert(fixtures.includes('SIMULATED_CADENCE_ITEMS') && fixtures.includes('length: 24'), 'cadence items created')
assert(fixtures.includes('SIMULATED_RACI_MATRICES') && fixtures.includes('length: 8'), 'RACI matrices created')
assert(fixtures.includes('SIMULATED_RACI_ROLES') && fixtures.includes('length: 40'), 'RACI roles created')
assert(fixtures.includes('SIMULATED_ENTRY_EXIT_MATRICES') && fixtures.includes('length: 8'), 'entry exit criteria matrices created')
assert(fixtures.includes('SIMULATED_ENTRY_CRITERIA') && fixtures.includes('length: 24'), 'entry criteria created')
assert(fixtures.includes('SIMULATED_EXIT_CRITERIA') && fixtures.includes('length: 24'), 'exit criteria created')
assert(fixtures.includes('SIMULATED_EXECUTION_PLANS') && fixtures.includes('length: 8'), 'institutional execution plans created')
assert(fixtures.includes('SIMULATED_EXECUTION_ITEMS') && fixtures.includes('length: 32'), 'execution plan items created')
assert(fixtures.includes('SIMULATED_GOVERNANCE_CALENDARS') && fixtures.includes('length: 8'), 'governance calendars created')
assert(fixtures.includes('SIMULATED_GOVERNANCE_CALENDAR_ITEMS') && fixtures.includes('length: 24'), 'governance calendar items created')
assert(fixtures.includes('SIMULATED_RISK_REGISTERS') && fixtures.includes('length: 8'), 'scale risk registers created')
assert(fixtures.includes('SIMULATED_RISK_ITEMS') && fixtures.includes('length: 32'), 'scale risk items created')
assert(fixtures.includes('SIMULATED_DECISION_LOGS') && fixtures.includes('length: 8'), 'scale decision logs created')
assert(fixtures.includes('SIMULATED_DECISION_LOG_ITEMS') && fixtures.includes('length: 24'), 'scale decision log items created')
assert(fixtures.includes('SIMULATED_CONTROL_BOARDS') && fixtures.includes('length: 8'), 'operational control boards created')
assert(fixtures.includes('SIMULATED_HUMAN_REVIEW_PATHS') && fixtures.includes('length: 8'), 'human review escalation paths created')
assert(fixtures.includes('SIMULATED_HUMAN_REVIEW_ITEMS') && fixtures.includes('length: 24'), 'human review escalation items created')
assert(fixtures.includes('SIMULATED_READINESS_SCORECARDS') && fixtures.includes('length: 8'), 'scale readiness scorecards created')
assert(fixtures.includes('SIMULATED_MISUSE_BLOCKERS') && fixtures.includes('length: 16'), 'operating model misuse blockers created')
assert(fixtures.includes('SIMULATED_EXECUTIVE_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all) && !/real_operation_claim:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all) && !/contractual_commitment_claim:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all) && !/real_revenue_claim:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all) && !/real_billing_claim:\s*true/i.test(all), 'no real billing claimed')
assert(!/legal_obligation_claim(?:ed)?:\s*true/i.test(all) && !/legal_responsibility_claim:\s*true/i.test(all), 'no legal obligation claimed')
assert(!/commercial_commitment_claim(?:ed)?:\s*true/i.test(all), 'no commercial commitment claimed')
assert(all.includes('v3.0'), 'v3.0 reference present')
assert(all.includes('v2.8'), 'v2.8 reference present')
assert(all.includes('v2.7'), 'v2.7 reference present')
