import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-scale-evidence-simulator.ts',
  service: 'src/services/sensetrust/strategic-scale-evidence-simulator-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-scale-evidence-simulator.ts',
  dashboard: 'src/components/sensetrust/StrategicScaleEvidenceSimulatorDashboard.tsx',
  simulatorPanel: 'src/components/sensetrust/StrategicScaleEvidenceSimulatorPanel.tsx',
  packagePanel: 'src/components/sensetrust/ScenarioEvidencePackagePanel.tsx',
  matrixPanel: 'src/components/sensetrust/MinimumEvidenceMatrixPanel.tsx',
  gapPanel: 'src/components/sensetrust/EvidenceGapAnalysisPanel.tsx',
  riskPanel: 'src/components/sensetrust/ProofRiskRegisterPanel.tsx',
  maturityPanel: 'src/components/sensetrust/EvidenceMaturityScorePanel.tsx',
  boardPanel: 'src/components/sensetrust/EvidenceReadinessBoardPanel.tsx',
  tracePanel: 'src/components/sensetrust/EvidenceToDecisionTracePanel.tsx',
  briefPanel: 'src/components/sensetrust/InstitutionalEvidenceBriefPanel.tsx',
  planPanel: 'src/components/sensetrust/EvidenceStrengtheningPlanPanel.tsx',
  queuePanel: 'src/components/sensetrust/HumanReviewEvidenceQueuePanel.tsx',
  blockerPanel: 'src/components/sensetrust/EvidenceMisuseBlockerPanel.tsx',
  reportPanel: 'src/components/sensetrust/StrategicScaleEvidenceExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicScaleEvidenceSimulator.tsx',
  doc: 'docs/sensetrust-strategic-scale-evidence-simulator-v33.md',
  packagesDoc: 'docs/sensetrust-scenario-evidence-packages-v33.md',
  matrixDoc: 'docs/sensetrust-minimum-evidence-matrix-v33.md',
  gapDoc: 'docs/sensetrust-evidence-gap-analysis-v33.md',
  riskDoc: 'docs/sensetrust-proof-risk-register-v33.md',
  maturityDoc: 'docs/sensetrust-evidence-maturity-score-v33.md',
  boardDoc: 'docs/sensetrust-evidence-readiness-board-v33.md',
  traceDoc: 'docs/sensetrust-evidence-to-decision-trace-v33.md',
  briefDoc: 'docs/sensetrust-institutional-evidence-brief-v33.md',
  planDoc: 'docs/sensetrust-evidence-strengthening-plan-v33.md',
  queueDoc: 'docs/sensetrust-human-review-evidence-queue-v33.md',
  blockersDoc: 'docs/sensetrust-evidence-misuse-blockers-v33.md',
  reportDoc: 'docs/sensetrust-strategic-scale-evidence-executive-report-v33.md',
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
  ['SIMULATED_EVIDENCE_SIMULATORS', 'length: 8', 'evidence simulators created'],
  ['SIMULATED_SCENARIO_EVIDENCE_PACKAGES', 'length: 24', 'scenario evidence packages created'],
  ['SIMULATED_SCENARIO_EVIDENCE_ITEMS', 'length: 72', 'scenario evidence items created'],
  ['SIMULATED_MINIMUM_EVIDENCE_MATRICES', 'length: 8', 'minimum evidence matrices created'],
  ['SIMULATED_MINIMUM_EVIDENCE_REQUIREMENTS', 'length: 40', 'minimum evidence requirements created'],
  ['SIMULATED_EVIDENCE_GAP_ANALYSES', 'length: 8', 'evidence gap analyses created'],
  ['SIMULATED_EVIDENCE_GAP_ITEMS', 'length: 32', 'evidence gap items created'],
  ['SIMULATED_PROOF_RISK_REGISTERS', 'length: 8', 'proof risk registers created'],
  ['SIMULATED_PROOF_RISK_ITEMS', 'length: 32', 'proof risk items created'],
  ['SIMULATED_MATURITY_SCORES', 'length: 8', 'evidence maturity scores created'],
  ['SIMULATED_MATURITY_SCORE_ITEMS', 'length: 24', 'evidence maturity score items created'],
  ['SIMULATED_READINESS_BOARDS', 'length: 8', 'evidence readiness boards created'],
  ['SIMULATED_READINESS_BOARD_ITEMS', 'length: 24', 'evidence readiness board items created'],
  ['SIMULATED_EVIDENCE_TO_DECISION_TRACES', 'length: 8', 'evidence-to-decision traces created'],
  ['SIMULATED_EVIDENCE_TO_DECISION_TRACE_ITEMS', 'length: 24', 'evidence-to-decision trace items created'],
  ['SIMULATED_INSTITUTIONAL_EVIDENCE_BRIEFS', 'length: 8', 'institutional evidence briefs created'],
  ['SIMULATED_STRENGTHENING_PLANS', 'length: 8', 'evidence strengthening plans created'],
  ['SIMULATED_STRENGTHENING_PLAN_ITEMS', 'length: 32', 'evidence strengthening plan items created'],
  ['SIMULATED_HUMAN_REVIEW_QUEUES', 'length: 8', 'human review evidence queues created'],
  ['SIMULATED_HUMAN_REVIEW_QUEUE_ITEMS', 'length: 24', 'human review evidence queue items created'],
  ['SIMULATED_EVIDENCE_MISUSE_BLOCKERS', 'length: 16', 'evidence misuse blockers created'],
  ['SIMULATED_EVIDENCE_EXECUTIVE_REPORTS', 'length: 8', 'executive reports created'],
]
countChecks.forEach(([name, count, label]) => assert(fixtures.includes(name) && fixtures.includes(count), label))
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
assert(!/real_scientific_validation_claim(?:ed)?:\s*true/i.test(all) && !/clinical_validation_claim:\s*true/i.test(all) && !/real_evidence_claim:\s*true/i.test(all), 'no real scientific validation claimed')
assert(!/external_certification_claim(?:ed)?:\s*true/i.test(all), 'no external certification claimed')
assert(all.includes('v3.2'), 'v3.2 reference present')
assert(all.includes('v3.1'), 'v3.1 reference present')
assert(all.includes('v3.0'), 'v3.0 reference present')
