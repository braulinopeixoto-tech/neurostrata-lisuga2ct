import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/institutional-handoff-room.ts',
  service: 'src/services/sensetrust/institutional-handoff-room-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-institutional-handoff-room.ts',
  dashboard: 'src/components/sensetrust/SenseTrustInstitutionalHandoffRoomDashboard.tsx',
  roomPanel: 'src/components/sensetrust/SenseTrustInstitutionalHandoffRoomPanel.tsx',
  scenarioPanel: 'src/components/sensetrust/InstitutionalHandoffScenarioPanel.tsx',
  packagePanel: 'src/components/sensetrust/InstitutionalHandoffPackagePanel.tsx',
  recipientProfilePanel: 'src/components/sensetrust/InstitutionalHandoffRecipientProfilePanel.tsx',
  materialPanel: 'src/components/sensetrust/InstitutionalHandoffMaterialPanel.tsx',
  evidenceBundlePanel: 'src/components/sensetrust/InstitutionalHandoffEvidenceBundlePanel.tsx',
  responsibilityMatrixPanel: 'src/components/sensetrust/InstitutionalHandoffResponsibilityMatrixPanel.tsx',
  decisionRecordPanel: 'src/components/sensetrust/InstitutionalHandoffDecisionRecordPanel.tsx',
  reviewQueuePanel: 'src/components/sensetrust/InstitutionalHandoffReviewQueuePanel.tsx',
  riskRegisterPanel: 'src/components/sensetrust/InstitutionalHandoffRiskRegisterPanel.tsx',
  boundaryClaimsGuardrailPanel: 'src/components/sensetrust/InstitutionalHandoffBoundaryClaimsGuardrailPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/InstitutionalHandoffAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/InstitutionalHandoffExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustInstitutionalHandoffRoom.tsx',
}
const docs = ['docs/sensetrust-institutional-handoff-room-v41.md','docs/sensetrust-institutional-handoff-packages-v41.md','docs/sensetrust-institutional-handoff-recipient-profiles-v41.md','docs/sensetrust-institutional-handoff-materials-v41.md','docs/sensetrust-institutional-handoff-evidence-bundles-v41.md','docs/sensetrust-institutional-handoff-responsibility-matrix-v41.md','docs/sensetrust-institutional-handoff-review-queue-v41.md','docs/sensetrust-institutional-handoff-risk-register-v41.md','docs/sensetrust-institutional-handoff-boundary-claims-guardrail-v41.md','docs/sensetrust-institutional-handoff-executive-report-v41.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/institutional-handoff-room'), 'route registered')
for (const [needle, label] of [['SIMULATED_INSTITUTIONAL_HANDOFF_ROOMS','handoff rooms created'],['SIMULATED_INSTITUTIONAL_HANDOFF_PACKAGES','packages created'],['SIMULATED_INSTITUTIONAL_HANDOFF_RECIPIENT_PROFILES','recipient profiles created'],['SIMULATED_INSTITUTIONAL_HANDOFF_MATERIALS','materials created'],['SIMULATED_INSTITUTIONAL_HANDOFF_EVIDENCE_BUNDLES','evidence bundles created'],['SIMULATED_INSTITUTIONAL_HANDOFF_RESPONSIBILITY_MATRICES','responsibility matrices created'],['SIMULATED_INSTITUTIONAL_HANDOFF_DECISION_RECORDS','decision records created'],['SIMULATED_INSTITUTIONAL_HANDOFF_REVIEW_QUEUES','review queues created'],['SIMULATED_INSTITUTIONAL_HANDOFF_RISK_REGISTERS','risk registers created'],['SIMULATED_INSTITUTIONAL_HANDOFF_BOUNDARY_CLAIMS_GUARDRAILS','boundary claims guardrails created'],['SIMULATED_INSTITUTIONAL_HANDOFF_AUDIT_TRAILS','audit trails created'],['SIMULATED_INSTITUTIONAL_HANDOFF_EXECUTIVE_REPORTS','executive reports created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v4.0') || all.includes('Strategic Pilot Outcome'), 'v4.0 reference present')
assert(all.includes('v3.9') || all.includes('Monitoring'), 'v3.9 reference present')
assert(all.includes('v3.8') || all.includes('Execution Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Pilot Proposal'), 'v3.7 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(!/contains_clinical_data:\s*true|clinical_data_used:\s*true/i.test(all), 'no clinical data exposed')
assert(!/contains_patient_data:\s*true|patient_data_used:\s*true/i.test(all), 'no patient data used')
assert(!/real_biological_sample_claim:\s*true|biological_sample_used:\s*true/i.test(all), 'no biological sample used')
assert(!/real_eeg_claim:\s*true|real EEG used|real_qeeg_claim:\s*true|real qEEG used/i.test(all), 'no real EEG/qEEG used')
assert(!/real_client_claim(?:ed)?:\s*true|client_claim:\s*true/i.test(all), 'no real client claimed')
assert(!/real_contract_claim(?:ed)?:\s*true|contract_binding_claim:\s*true/i.test(all), 'no real contract claimed')
assert(!/real_partnership_claim(?:ed)?:\s*true|partnership_claim:\s*true/i.test(all), 'no real partnership claimed')
assert(!/real_billing_claim(?:ed)?:\s*true/i.test(all), 'no real billing claimed')
assert(!/real_crm_claim(?:ed)?:\s*true/i.test(all), 'no real CRM claimed')
assert(!/real_email_automation_claim(?:ed)?:\s*true/i.test(all), 'no real email automation claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/scientific_validation_claim(?:ed)?:\s*true|real_scientific_validation_claim:\s*true/i.test(all), 'no scientific validation claimed')
assert(!/regulatory_(validation|authorization)_claim(?:ed)?:\s*true/i.test(all), 'no regulatory validation claimed')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('handoff_preparation_only'), 'handoff_preparation_only present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'term neurodesenvolvimental absent')
