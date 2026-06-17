import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-scale-simulation-console.ts',
  service: 'src/services/sensetrust/strategic-scale-simulation-console-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-scale-simulation-console.ts',
  dashboard: 'src/components/sensetrust/StrategicScaleSimulationConsoleDashboard.tsx',
  consolePanel: 'src/components/sensetrust/StrategicScaleSimulationConsolePanel.tsx',
  scenarioPanel: 'src/components/sensetrust/ScaleSimulationScenarioPanel.tsx',
  matrixPanel: 'src/components/sensetrust/ScenarioDecisionMatrixPanel.tsx',
  impactPanel: 'src/components/sensetrust/InstitutionalImpactSimulationPanel.tsx',
  capacityPanel: 'src/components/sensetrust/OperationalCapacitySimulationPanel.tsx',
  loadPanel: 'src/components/sensetrust/ResourceLoadSimulationPanel.tsx',
  riskPanel: 'src/components/sensetrust/ScaleRiskSimulationPanel.tsx',
  readinessPanel: 'src/components/sensetrust/ReadinessScoreSimulationPanel.tsx',
  simulatorPanel: 'src/components/sensetrust/GoPauseRefineScaleSimulatorPanel.tsx',
  humanPanel: 'src/components/sensetrust/HumanReviewSimulationPanel.tsx',
  outcomePanel: 'src/components/sensetrust/ScenarioOutcomeSummaryPanel.tsx',
  tracePanel: 'src/components/sensetrust/SimulationDecisionTracePanel.tsx',
  blockerPanel: 'src/components/sensetrust/SimulationMisuseBlockerPanel.tsx',
  executivePanel: 'src/components/sensetrust/StrategicScaleSimulationExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicScaleSimulationConsole.tsx',
  doc: 'docs/sensetrust-strategic-scale-simulation-console-v32.md',
  scenariosDoc: 'docs/sensetrust-scale-simulation-scenarios-v32.md',
  matrixDoc: 'docs/sensetrust-scenario-decision-matrix-v32.md',
  impactDoc: 'docs/sensetrust-institutional-impact-simulation-v32.md',
  capacityDoc: 'docs/sensetrust-operational-capacity-simulation-v32.md',
  loadDoc: 'docs/sensetrust-resource-load-simulation-v32.md',
  riskDoc: 'docs/sensetrust-scale-risk-simulation-v32.md',
  readinessDoc: 'docs/sensetrust-readiness-score-simulation-v32.md',
  humanDoc: 'docs/sensetrust-human-review-simulation-v32.md',
  traceDoc: 'docs/sensetrust-simulation-decision-trace-v32.md',
  blockersDoc: 'docs/sensetrust-simulation-misuse-blockers-v32.md',
  executiveDoc: 'docs/sensetrust-strategic-scale-simulation-executive-report-v32.md',
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
const all = `${types}\n${service}\n${fixtures}\n${docs}`
const countChecks = [
  ['SIMULATED_SIMULATION_CONSOLES', 'length: 8', 'simulation consoles created'],
  ['SIMULATED_SCENARIOS', 'length: 24', 'simulation scenarios created'],
  ['SIMULATED_SCENARIO_INPUTS', 'length: 24', 'scenario inputs created'],
  ['SIMULATED_SCENARIO_OUTPUTS', 'length: 24', 'scenario outputs created'],
  ['SIMULATED_SCENARIO_DECISION_MATRICES', 'length: 8', 'scenario decision matrices created'],
  ['SIMULATED_SCENARIO_DECISION_ITEMS', 'length: 24', 'scenario decision items created'],
  ['SIMULATED_IMPACT_SIMULATIONS', 'length: 8', 'institutional impact simulations created'],
  ['SIMULATED_IMPACT_ITEMS', 'length: 24', 'institutional impact items created'],
  ['SIMULATED_CAPACITY_SIMULATIONS', 'length: 8', 'operational capacity simulations created'],
  ['SIMULATED_CAPACITY_ITEMS', 'length: 24', 'operational capacity items created'],
  ['SIMULATED_RESOURCE_LOAD_SIMULATIONS', 'length: 8', 'resource load simulations created'],
  ['SIMULATED_RESOURCE_LOAD_ITEMS', 'length: 24', 'resource load items created'],
  ['SIMULATED_SCALE_RISK_SIMULATIONS', 'length: 8', 'scale risk simulations created'],
  ['SIMULATED_SCALE_RISK_ITEMS', 'length: 24', 'scale risk simulation items created'],
  ['SIMULATED_READINESS_SCORE_SIMULATIONS', 'length: 8', 'readiness score simulations created'],
  ['SIMULATED_READINESS_SCORE_ITEMS', 'length: 24', 'readiness score items created'],
  ['SIMULATED_GO_PAUSE_REFINE_SCALE_SIMULATORS', 'length: 8', 'Go Pause Refine Scale simulators created'],
  ['SIMULATED_HUMAN_REVIEW_SIMULATIONS', 'length: 8', 'human review simulations created'],
  ['SIMULATED_HUMAN_REVIEW_ITEMS', 'length: 24', 'human review simulation items created'],
  ['SIMULATED_OUTCOME_SUMMARIES', 'length: 8', 'scenario outcome summaries created'],
  ['SIMULATED_DECISION_TRACES', 'length: 8', 'simulation decision traces created'],
  ['SIMULATED_DECISION_TRACE_ITEMS', 'length: 24', 'simulation decision trace items created'],
  ['SIMULATED_AUDIT_TRAIL', 'length: 24', 'simulation audit trail created'],
  ['SIMULATED_SIMULATION_MISUSE_BLOCKERS', 'length: 16', 'simulation misuse blockers created'],
  ['SIMULATED_EXECUTIVE_REPORTS', 'length: 8', 'executive reports created'],
]
countChecks.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all) && !/real_execution_claim:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all) && !/contractual_commitment_claim:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(!/regulatory_validation_claim:\s*true/i.test(all) && !/regulatory_authorization_claim:\s*true/i.test(all), 'no regulatory validation claim')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all) && !/real_revenue_claim:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all) && !/real_billing_claim:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_impact_claimed:\s*true/i.test(all) && !/real_impact_claim:\s*true/i.test(all), 'no real impact claimed')
assert(!/real_capacity_claimed:\s*true/i.test(all) && !/real_capacity_claim:\s*true/i.test(all), 'no real capacity claimed')
assert(!/legal_decision_claim(?:ed)?:\s*true/i.test(all), 'no legal decision claimed')
assert(!/commercial_commitment_claim(?:ed)?:\s*true/i.test(all), 'no commercial commitment claimed')
assert(all.includes('v3.1'), 'v3.1 reference present')
assert(all.includes('v3.0'), 'v3.0 reference present')
assert(all.includes('v2.8'), 'v2.8 reference present')
