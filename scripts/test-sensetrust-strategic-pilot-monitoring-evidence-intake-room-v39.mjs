import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/strategic-pilot-monitoring-evidence-intake-room.ts',
  service: 'src/services/sensetrust/strategic-pilot-monitoring-evidence-intake-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-strategic-pilot-monitoring-evidence-intake-room.ts',
  dashboard: 'src/components/sensetrust/StrategicPilotMonitoringEvidenceIntakeRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/StrategicPilotMonitoringEvidenceIntakeRoomPanel.tsx',
  scenarioPanel: 'src/components/sensetrust/PilotMonitoringScenarioPanel.tsx',
  evidenceIntakeQueuePanel: 'src/components/sensetrust/PilotEvidenceIntakeQueuePanel.tsx',
  evidenceIntakeRecordPanel: 'src/components/sensetrust/PilotEvidenceIntakeRecordPanel.tsx',
  checkpointMonitoringPanel: 'src/components/sensetrust/PilotCheckpointMonitoringPanel.tsx',
  monitoringTimelinePanel: 'src/components/sensetrust/PilotMonitoringTimelinePanel.tsx',
  deviationSignalPanel: 'src/components/sensetrust/PilotDeviationSignalPanel.tsx',
  deviationEscalationPanel: 'src/components/sensetrust/PilotDeviationEscalationPanel.tsx',
  riskSignalUpdatePanel: 'src/components/sensetrust/PilotRiskSignalUpdatePanel.tsx',
  monitoringRiskRegisterPanel: 'src/components/sensetrust/PilotMonitoringRiskRegisterPanel.tsx',
  decisionTriggerPanel: 'src/components/sensetrust/PilotDecisionTriggerPanel.tsx',
  humanReviewTriggerPanel: 'src/components/sensetrust/PilotHumanReviewTriggerPanel.tsx',
  evidenceIntegrityCheckPanel: 'src/components/sensetrust/PilotEvidenceIntegrityCheckPanel.tsx',
  evidenceChainOfCustodyPanel: 'src/components/sensetrust/PilotEvidenceChainOfCustodyPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/PilotMonitoringAuditTrailPanel.tsx',
  dashboardMetricsPanel: 'src/components/sensetrust/PilotMonitoringDashboardMetricsPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/StrategicPilotMonitoringExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustStrategicPilotMonitoringEvidenceIntakeRoom.tsx',
}
const docs = ['docs/sensetrust-strategic-pilot-monitoring-evidence-intake-room-v39.md','docs/sensetrust-pilot-monitoring-scenarios-v39.md','docs/sensetrust-pilot-evidence-intake-queue-v39.md','docs/sensetrust-pilot-evidence-intake-records-v39.md','docs/sensetrust-pilot-checkpoint-monitoring-v39.md','docs/sensetrust-pilot-monitoring-timeline-v39.md','docs/sensetrust-pilot-deviation-signals-v39.md','docs/sensetrust-pilot-deviation-escalations-v39.md','docs/sensetrust-pilot-risk-signal-updates-v39.md','docs/sensetrust-pilot-monitoring-risk-register-v39.md','docs/sensetrust-pilot-decision-triggers-v39.md','docs/sensetrust-pilot-human-review-triggers-v39.md','docs/sensetrust-pilot-evidence-integrity-checks-v39.md','docs/sensetrust-pilot-evidence-chain-of-custody-v39.md','docs/sensetrust-pilot-monitoring-audit-trail-v39.md','docs/sensetrust-strategic-pilot-monitoring-executive-report-v39.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/strategic-pilot-monitoring-evidence-intake-room'), 'route registered')
for (const [needle, label] of [['SIMULATED_STRATEGIC_PILOT_MONITORING_ROOMS','monitoring rooms created'],['SIMULATED_STRATEGIC_PILOT_MONITORING_SCENARIOS','monitoring scenarios created'],['SIMULATED_PILOT_MONITORING_EVENTS','monitoring events created'],['SIMULATED_PILOT_EVIDENCE_INTAKE_QUEUES','evidence intake queues created'],['SIMULATED_PILOT_EVIDENCE_INTAKE_RECORDS','evidence intake records created'],['SIMULATED_PILOT_CHECKPOINT_MONITORING_RECORDS','checkpoint monitoring records created'],['SIMULATED_PILOT_MONITORING_TIMELINES','monitoring timelines created'],['SIMULATED_PILOT_DEVIATION_SIGNALS','deviation signals created'],['SIMULATED_PILOT_DEVIATION_ESCALATIONS','deviation escalations created'],['SIMULATED_PILOT_RISK_SIGNAL_UPDATES','risk signal updates created'],['SIMULATED_PILOT_MONITORING_RISK_REGISTERS','monitoring risk registers created'],['SIMULATED_PILOT_DECISION_TRIGGERS','decision triggers created'],['SIMULATED_PILOT_HUMAN_REVIEW_TRIGGERS','human review triggers created'],['SIMULATED_PILOT_EVIDENCE_INTEGRITY_CHECKS','evidence integrity checks created'],['SIMULATED_PILOT_EVIDENCE_CHAIN_OF_CUSTODY','evidence chain of custody created'],['SIMULATED_PILOT_MONITORING_AUDIT_TRAILS','monitoring audit trails created'],['SIMULATED_PILOT_MONITORING_DASHBOARD_METRICS','dashboard metrics created'],['SIMULATED_STRATEGIC_PILOT_MONITORING_EXECUTIVE_REPORTS','executive reports created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v3.8') || all.includes('Execution Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Pilot Proposal'), 'v3.7 reference present')
assert(all.includes('v3.6') || all.includes('Conversion'), 'v3.6 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(all.includes('v4.0') && all.includes('closeout'), 'v4.0 closeout preparation present')
assert(!/contains_clinical_data:\s*true|clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/contains_patient_data:\s*true|patient_data_used:\s*true/i.test(all), 'no patient data used')
assert(!/contains_personal_sensitive_data:\s*true|personal_sensitive_data_used:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_biological_sample_claim:\s*true|biological_sample_used:\s*true/i.test(all), 'no biological sample used')
assert(!/real_eeg_claim:\s*true|real EEG used/i.test(all), 'no real EEG used')
assert(!/real_qeeg_claim:\s*true|real qEEG used/i.test(all), 'no real qEEG used')
assert(!/real_biomarker_claim:\s*true|real biomarker/i.test(all), 'no real biomarker used')
assert(!/real_clinical_operation_claim(?:ed)?:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_pilot_execution_claim(?:ed)?:\s*true/i.test(all), 'no real pilot execution claimed')
assert(!/real_evidence_collection_claim(?:ed)?:\s*true/i.test(all), 'no real evidence collection claimed')
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
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'term neurodesenvolvimental absent')
