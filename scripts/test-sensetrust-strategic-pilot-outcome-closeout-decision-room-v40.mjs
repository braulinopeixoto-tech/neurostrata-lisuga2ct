import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-pilot-outcome-closeout-decision-room.ts',
  service: 'src/services/sensetrust/strategic-pilot-outcome-closeout-decision-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-pilot-outcome-closeout-decision-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPilotOutcomeCloseoutDecisionRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPilotOutcomeCloseoutDecisionRoomPanel.tsx',
  scenarioPanel: 'src/components/sensetrust/PilotOutcomeScenarioPanel.tsx',
  summaryPanel: 'src/components/sensetrust/PilotOutcomeSummaryPanel.tsx',
  evidenceSynthesisPanel: 'src/components/sensetrust/PilotOutcomeEvidenceSynthesisPanel.tsx',
  checkpointReviewPanel: 'src/components/sensetrust/PilotOutcomeCheckpointReviewPanel.tsx',
  riskReviewPanel: 'src/components/sensetrust/PilotOutcomeRiskReviewPanel.tsx',
  deviationReviewPanel: 'src/components/sensetrust/PilotOutcomeDeviationReviewPanel.tsx',
  learningLoopPanel: 'src/components/sensetrust/PilotOutcomeLearningLoopPanel.tsx',
  decisionBoardPanel: 'src/components/sensetrust/PilotOutcomeDecisionBoardPanel.tsx',
  readinessScorecardPanel: 'src/components/sensetrust/PilotOutcomeReadinessScorecardPanel.tsx',
  institutionalMaturityMatrixPanel: 'src/components/sensetrust/PilotOutcomeInstitutionalMaturityMatrixPanel.tsx',
  handoffReadinessBoardPanel: 'src/components/sensetrust/PilotOutcomeHandoffReadinessBoardPanel.tsx',
  humanReviewQueuePanel: 'src/components/sensetrust/PilotOutcomeHumanReviewQueuePanel.tsx',
  boundaryClaimsGuardrailPanel: 'src/components/sensetrust/PilotOutcomeBoundaryClaimsGuardrailPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/PilotOutcomeAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/StrategicPilotOutcomeExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPilotOutcomeCloseoutDecisionRoom.tsx',
}
const docs = ['docs/sensetrust-strategic-pilot-outcome-closeout-decision-room-v40.md','docs/sensetrust-pilot-outcome-scenarios-v40.md','docs/sensetrust-pilot-outcome-summary-v40.md','docs/sensetrust-pilot-outcome-evidence-synthesis-v40.md','docs/sensetrust-pilot-outcome-checkpoint-review-v40.md','docs/sensetrust-pilot-outcome-risk-review-v40.md','docs/sensetrust-pilot-outcome-deviation-review-v40.md','docs/sensetrust-pilot-outcome-learning-loop-v40.md','docs/sensetrust-pilot-outcome-decision-board-v40.md','docs/sensetrust-pilot-outcome-readiness-scorecard-v40.md','docs/sensetrust-pilot-outcome-institutional-maturity-matrix-v40.md','docs/sensetrust-pilot-outcome-handoff-readiness-board-v40.md','docs/sensetrust-pilot-outcome-human-review-queue-v40.md','docs/sensetrust-pilot-outcome-boundary-claims-guardrail-v40.md','docs/sensetrust-pilot-outcome-audit-trail-v40.md','docs/sensetrust-strategic-pilot-outcome-executive-report-v40.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/strategic-pilot-outcome-closeout-decision-room'), 'route registered')
for (const [needle, label] of [['SIMULATED_STRATEGIC_PILOT_OUTCOME_CLOSEOUT_ROOMS','closeout rooms created'],['SIMULATED_STRATEGIC_PILOT_OUTCOME_SCENARIOS','outcome scenarios created'],['SIMULATED_PILOT_OUTCOME_SUMMARIES','outcome summaries created'],['SIMULATED_PILOT_OUTCOME_EVIDENCE_SYNTHESIS','evidence synthesis created'],['SIMULATED_PILOT_OUTCOME_CHECKPOINT_REVIEWS','checkpoint reviews created'],['SIMULATED_PILOT_OUTCOME_RISK_REVIEWS','risk reviews created'],['SIMULATED_PILOT_OUTCOME_DEVIATION_REVIEWS','deviation reviews created'],['SIMULATED_PILOT_OUTCOME_LEARNING_LOOPS','learning loops created'],['SIMULATED_PILOT_OUTCOME_LESSONS_LEARNED','lessons learned created'],['SIMULATED_PILOT_OUTCOME_DECISION_BOARDS','decision boards created'],['SIMULATED_PILOT_OUTCOME_READINESS_SCORECARDS','readiness scorecards created'],['SIMULATED_PILOT_OUTCOME_INSTITUTIONAL_MATURITY_MATRICES','institutional maturity matrices created'],['SIMULATED_PILOT_OUTCOME_HANDOFF_READINESS_BOARDS','handoff readiness boards created'],['SIMULATED_PILOT_OUTCOME_HUMAN_REVIEW_QUEUES','human review queues created'],['SIMULATED_PILOT_OUTCOME_BOUNDARY_CLAIMS_GUARDRAILS','boundary claims guardrails created'],['SIMULATED_PILOT_OUTCOME_AUDIT_TRAILS','audit trails created'],['SIMULATED_STRATEGIC_PILOT_OUTCOME_EXECUTIVE_REPORTS','executive reports created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v3.9') || all.includes('Monitoring & Evidence Intake'), 'v3.9 reference present')
assert(all.includes('v3.8') || all.includes('Execution Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Pilot Proposal'), 'v3.7 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(all.includes('v4.1') && all.includes('handoff'), 'v4.1 handoff preparation present')
assert(!/contains_clinical_data:\s*true|clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/contains_patient_data:\s*true|patient_data_used:\s*true/i.test(all), 'no patient data used')
assert(!/contains_personal_sensitive_data:\s*true|personal_sensitive_data_used:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_biological_sample_claim:\s*true|biological_sample_used:\s*true/i.test(all), 'no biological sample used')
assert(!/real_eeg_claim:\s*true|real EEG used/i.test(all), 'no real EEG used')
assert(!/real_qeeg_claim:\s*true|real qEEG used/i.test(all), 'no real qEEG used')
assert(!/real_biomarker_claim:\s*true|real biomarker/i.test(all), 'no real biomarker used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_pilot_execution_claim(?:ed)?:\s*true/i.test(all), 'no real pilot execution claimed')
assert(!/real_outcome_claim(?:ed)?:\s*true/i.test(all), 'no real outcome claimed')
assert(!/real_client_claim(?:ed)?:\s*true|client_claim:\s*true/i.test(all), 'no real client claimed')
assert(!/real_contract_claim(?:ed)?:\s*true|contract_binding_claim:\s*true/i.test(all), 'no real contract claimed')
assert(!/real_partnership_claim(?:ed)?:\s*true|partnership_claim:\s*true/i.test(all), 'no real partnership claimed')
assert(!/regulatory_(validation|authorization)_claim(?:ed)?:\s*true/i.test(all), 'no regulatory validation claimed')
assert(!/scientific_validation_claim(?:ed)?:\s*true|real_scientific_validation_claim:\s*true/i.test(all), 'no scientific validation claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_revenue_claim(?:ed)?:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claim(?:ed)?:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_crm_claim(?:ed)?:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_email_automation_claim(?:ed)?:\s*true/i.test(all), 'no real email automation claimed')
assert(!/external_certification_claim(?:ed)?:\s*true/i.test(all), 'no external certification claimed')
assert(!/treatment_claim:\s*true/i.test(all), 'no treatment claim')
assert(!/outcome_guarantee_claim:\s*true/i.test(all), 'no outcome guarantee')
assert(!/public_health_claim:\s*true/i.test(all), 'no public health claim')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('handoff_preparation_only'), 'handoff_preparation_only present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'term neurodesenvolvimental absent')
