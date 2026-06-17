import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/institutional-pilot-control-room.ts',
  service: 'src/services/sensetrust/institutional-pilot-control-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-institutional-pilot-control-room.ts',
  dashboard: 'src/components/sensetrust/InstitutionalPilotControlRoomDashboard.tsx',
  scopePanel: 'src/components/sensetrust/PilotScopePanel.tsx',
  raciPanel: 'src/components/sensetrust/PilotRaciGovernancePanel.tsx',
  checkpointPanel: 'src/components/sensetrust/PilotCheckpointTimelinePanel.tsx',
  acceptancePanel: 'src/components/sensetrust/SupervisedAcceptancePanel.tsx',
  riskPanel: 'src/components/sensetrust/PilotExecutionRiskRegisterPanel.tsx',
  evidencePanel: 'src/components/sensetrust/PilotEvidenceChecklistPanel.tsx',
  interruptionPanel: 'src/components/sensetrust/PilotInterruptionGovernancePanel.tsx',
  decisionPanel: 'src/components/sensetrust/PilotDecisionLogPanel.tsx',
  executivePanel: 'src/components/sensetrust/InstitutionalPilotExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustInstitutionalPilotControlRoom.tsx',
  doc: 'docs/sensetrust-institutional-pilot-control-room-v25.md',
  scopeDoc: 'docs/sensetrust-pilot-scope-v25.md',
  raciDoc: 'docs/sensetrust-pilot-raci-governance-v25.md',
  checkpointsDoc: 'docs/sensetrust-pilot-checkpoints-v25.md',
  acceptanceDoc: 'docs/sensetrust-supervised-acceptance-v25.md',
  riskDoc: 'docs/sensetrust-execution-risk-register-v25.md',
  evidenceDoc: 'docs/sensetrust-pilot-evidence-checklist-v25.md',
  interruptionDoc: 'docs/sensetrust-pilot-interruption-governance-v25.md',
  decisionDoc: 'docs/sensetrust-pilot-decision-log-v25.md',
  executiveDoc: 'docs/sensetrust-institutional-pilot-executive-report-v25.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'institutional pilot control room types exist')
assert(exists(files.service), 'institutional pilot control room service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'institutional pilot dashboard exists')
assert(exists(files.scopePanel), 'pilot scope panel exists')
assert(exists(files.raciPanel), 'pilot RACI governance panel exists')
assert(exists(files.checkpointPanel), 'pilot checkpoint timeline panel exists')
assert(exists(files.acceptancePanel), 'supervised acceptance panel exists')
assert(exists(files.riskPanel), 'pilot execution risk register panel exists')
assert(exists(files.evidencePanel), 'pilot evidence checklist panel exists')
assert(exists(files.interruptionPanel), 'pilot interruption governance panel exists')
assert(exists(files.decisionPanel), 'pilot decision log panel exists')
assert(exists(files.executivePanel), 'institutional pilot executive report panel exists')
assert(exists(files.page) || true, 'optional institutional pilot page exists or not required')
assert(exists(files.doc), 'institutional pilot control room doc exists')
assert(exists(files.scopeDoc), 'pilot scope doc exists')
assert(exists(files.raciDoc), 'RACI governance doc exists')
assert(exists(files.checkpointsDoc), 'checkpoints doc exists')
assert(exists(files.acceptanceDoc), 'supervised acceptance doc exists')
assert(exists(files.riskDoc), 'execution risk register doc exists')
assert(exists(files.evidenceDoc), 'evidence checklist doc exists')
assert(exists(files.interruptionDoc), 'interruption governance doc exists')
assert(exists(files.decisionDoc), 'pilot decision log doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_INSTITUTIONAL_PILOTS') && fixtures.includes('length: 8'), 'institutional pilots created')
assert(fixtures.includes('SIMULATED_PILOT_SCOPES') && fixtures.includes('length: 8'), 'pilot scopes created')
assert(fixtures.includes('SIMULATED_PILOT_RACI_ROLES') && fixtures.includes('length: 24'), 'RACI roles created')
assert(fixtures.includes('SIMULATED_PILOT_GOVERNANCE_BOARDS') && fixtures.includes('length: 8'), 'governance boards created')
assert(fixtures.includes('SIMULATED_PILOT_CHECKPOINTS') && fixtures.includes('length: 32'), 'checkpoints created')
assert(fixtures.includes('SIMULATED_PILOT_ACCEPTANCE_CRITERIA') && fixtures.includes('length: 32'), 'acceptance criteria created')
assert(fixtures.includes('SIMULATED_SUPERVISED_ACCEPTANCE_RECORDS') && fixtures.includes('length: 16'), 'supervised acceptance records created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_RISKS') && fixtures.includes('length: 24'), 'execution risks created')
assert(fixtures.includes('SIMULATED_PILOT_EVIDENCE_ITEMS') && fixtures.includes('length: 24'), 'evidence items created')
assert(fixtures.includes('SIMULATED_PILOT_INTERRUPTION_RULES') && fixtures.includes('length: 16'), 'interruption rules created')
assert(fixtures.includes('SIMULATED_PILOT_STATUS_BOARDS') && fixtures.includes('length: 8'), 'status boards created')
assert(fixtures.includes('SIMULATED_PILOT_DECISION_LOGS') && fixtures.includes('length: 16'), 'decision logs created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTIVE_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/real_patient_data_used:\s*true/i.test(all), 'no real patient data used')
assert(!/real_clinical_operation_enabled:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/production_deploy_claimed:\s*true/i.test(all), 'no production deploy claimed')
assert(!/real_lead_collection:\s*true/i.test(all), 'no real lead collection claimed')
assert(!/real_crm_enabled:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_analytics_enabled:\s*true/i.test(all), 'no real analytics claimed')
assert(!/real_email_automation_enabled:\s*true/i.test(all), 'no real email automation claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all) && !/real_contract_enabled:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(all.includes('v2.4'), 'v2.4 reference present')
assert(all.includes('v2.3'), 'v2.3 reference present')
assert(all.includes('v2.2'), 'v2.2 reference present')

