import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-pilot-execution-governance-room.ts',
  service: 'src/services/sensetrust/strategic-pilot-execution-governance-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-pilot-execution-governance-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPilotExecutionGovernanceRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPilotExecutionGovernanceRoomPanel.tsx',
  scenarioPanel: 'src/components/sensetrust/PilotExecutionScenarioPanel.tsx',
  activationGatePanel: 'src/components/sensetrust/PilotExecutionActivationGatePanel.tsx',
  checkpointTimelinePanel: 'src/components/sensetrust/PilotExecutionCheckpointTimelinePanel.tsx',
  milestoneBoardPanel: 'src/components/sensetrust/PilotExecutionMilestoneBoardPanel.tsx',
  cadencePanel: 'src/components/sensetrust/PilotExecutionCadencePanel.tsx',
  responsibilityMatrixPanel: 'src/components/sensetrust/PilotExecutionResponsibilityMatrixPanel.tsx',
  evidenceLedgerPanel: 'src/components/sensetrust/PilotExecutionEvidenceLedgerPanel.tsx',
  deviationRegisterPanel: 'src/components/sensetrust/PilotExecutionDeviationRegisterPanel.tsx',
  riskRegisterPanel: 'src/components/sensetrust/PilotExecutionRiskRegisterPanel.tsx',
  interruptionRulesPanel: 'src/components/sensetrust/PilotExecutionInterruptionRulesPanel.tsx',
  decisionBoardPanel: 'src/components/sensetrust/PilotExecutionDecisionBoardPanel.tsx',
  humanReviewQueuePanel: 'src/components/sensetrust/PilotExecutionHumanReviewQueuePanel.tsx',
  stakeholderReviewBoardPanel: 'src/components/sensetrust/PilotExecutionStakeholderReviewBoardPanel.tsx',
  boundaryClaimsGuardrailPanel: 'src/components/sensetrust/PilotExecutionBoundaryClaimsGuardrailPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/PilotExecutionAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/StrategicPilotExecutionExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPilotExecutionGovernanceRoom.tsx',
}
const docs = ['docs/sensetrust-strategic-pilot-execution-governance-room-v38.md','docs/sensetrust-pilot-execution-scenarios-v38.md','docs/sensetrust-pilot-execution-activation-gates-v38.md','docs/sensetrust-pilot-execution-checkpoint-timeline-v38.md','docs/sensetrust-pilot-execution-milestone-board-v38.md','docs/sensetrust-pilot-execution-cadence-v38.md','docs/sensetrust-pilot-execution-responsibility-matrix-v38.md','docs/sensetrust-pilot-execution-evidence-ledger-v38.md','docs/sensetrust-pilot-execution-deviation-register-v38.md','docs/sensetrust-pilot-execution-risk-register-v38.md','docs/sensetrust-pilot-execution-interruption-rules-v38.md','docs/sensetrust-pilot-execution-decision-board-v38.md','docs/sensetrust-pilot-execution-human-review-queue-v38.md','docs/sensetrust-pilot-execution-stakeholder-review-board-v38.md','docs/sensetrust-pilot-execution-boundary-claims-guardrail-v38.md','docs/sensetrust-strategic-pilot-execution-executive-report-v38.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([key, file]) => assert(exists(file), `${key} exists`))
docs.forEach((file) => assert(exists(file), `${file} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/strategic-pilot-execution-governance-room'), 'route registered')
assert(fixtures.includes('SIMULATED_STRATEGIC_PILOT_EXECUTION_ROOMS'), 'pilot execution rooms created')
assert(fixtures.includes('SIMULATED_STRATEGIC_PILOT_EXECUTION_SCENARIOS'), 'scenarios created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_ACTIVATION_GATES'), 'activation gates created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_CHECKPOINTS'), 'checkpoints created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_MILESTONES'), 'milestones created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_CADENCES'), 'cadences created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_RESPONSIBILITY_MATRICES'), 'responsibility matrices created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_EVIDENCE_LEDGERS'), 'evidence ledgers created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_EVIDENCE_RECORDS'), 'evidence records created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_DEVIATION_REGISTERS'), 'deviation registers created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_RISK_REGISTERS'), 'risk registers created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_INTERRUPTION_RULES'), 'interruption rules created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_DECISION_BOARDS'), 'decision boards created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_HUMAN_REVIEW_QUEUES'), 'human review queues created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_STAKEHOLDER_REVIEW_BOARDS'), 'stakeholder review boards created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_BOUNDARY_CLAIMS_GUARDRAILS'), 'boundary claims guardrails created')
assert(fixtures.includes('SIMULATED_PILOT_EXECUTION_AUDIT_TRAILS'), 'audit trails created')
assert(fixtures.includes('SIMULATED_STRATEGIC_PILOT_EXECUTION_EXECUTIVE_REPORTS'), 'executive reports created')
assert(all.includes('v3.7') || all.includes('Pilot Proposal Room'), 'v3.7 reference present')
assert(all.includes('v3.6') || all.includes('Conversion Decision Room'), 'v3.6 reference present')
assert(all.includes('v3.5') || all.includes('Engagement Control Room'), 'v3.5 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(!/contains_clinical_data:\s*true|clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/contains_patient_data:\s*true|patient_data_used:\s*true/i.test(all), 'no patient data used')
assert(!/contains_personal_sensitive_data:\s*true|personal_sensitive_data_used:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_pilot_execution_claim(?:ed)?:\s*true/i.test(all), 'no real pilot execution claimed')
assert(!/real_client_claim(?:ed)?:\s*true|client_claim:\s*true/i.test(all), 'no real client claimed')
assert(!/real_contract_claim(?:ed)?:\s*true|contract_binding_claim:\s*true/i.test(all), 'no real contract claimed')
assert(!/real_partnership_claim(?:ed)?:\s*true|partnership_claim:\s*true/i.test(all), 'no real partnership claimed')
assert(!/regulatory_(validation|authorization)_claim(?:ed)?:\s*true/i.test(all), 'no regulatory validation claimed')
assert(!/scientific_validation_claim(?:ed)?:\s*true|real_scientific_validation_claim:\s*true/i.test(all), 'no scientific validation claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claim(?:ed)?:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claim(?:ed)?:\s*true/i.test(all), 'no real billing claimed')
assert(!/automated_crm_claim:\s*true|real_crm_claim:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_email_automation_claim(?:ed)?:\s*true/i.test(all), 'no real email automation claimed')
assert(!/external_certification_claim(?:ed)?:\s*true/i.test(all), 'no external certification claimed')
assert(!/treatment_claim:\s*true/i.test(all), 'no treatment claim')
assert(!/outcome_guarantee_claim:\s*true/i.test(all), 'no outcome guarantee')
assert(!/public_health_claim:\s*true/i.test(all), 'no public health claim')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'forbidden term absent')
