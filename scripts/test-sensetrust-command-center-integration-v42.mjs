import fs from 'node:fs'
import path from 'node:path'
const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/command-center-integration.ts',
  service: 'src/services/sensetrust/command-center-integration-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-command-center-integration.ts',
  dashboard: 'src/components/sensetrust/SenseTrustCommandCenterDashboard.tsx',
  commandCenterPanel: 'src/components/sensetrust/SenseTrustCommandCenterPanel.tsx',
  versionTrailPanel: 'src/components/sensetrust/CommandCenterVersionTrailPanel.tsx',
  navigationPanel: 'src/components/sensetrust/CommandCenterNavigationPanel.tsx',
  proofChainPanel: 'src/components/sensetrust/CommandCenterProofChainPanel.tsx',
  readinessSnapshotPanel: 'src/components/sensetrust/CommandCenterReadinessSnapshotPanel.tsx',
  riskSnapshotPanel: 'src/components/sensetrust/CommandCenterRiskSnapshotPanel.tsx',
  guardrailSnapshotPanel: 'src/components/sensetrust/CommandCenterGuardrailSnapshotPanel.tsx',
  demoScenarioPanel: 'src/components/sensetrust/CommandCenterDemoScenarioPanel.tsx',
  institutionalViewPanel: 'src/components/sensetrust/CommandCenterInstitutionalViewPanel.tsx',
  audienceProfilePanel: 'src/components/sensetrust/CommandCenterAudienceProfilePanel.tsx',
  handoffLinksPanel: 'src/components/sensetrust/CommandCenterHandoffLinksPanel.tsx',
  releaseCandidatePreparationPanel: 'src/components/sensetrust/CommandCenterReleaseCandidatePreparationPanel.tsx',
  auditTrailPanel: 'src/components/sensetrust/CommandCenterAuditTrailPanel.tsx',
  executiveReportPanel: 'src/components/sensetrust/CommandCenterExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustCommandCenterIntegration.tsx',
}
const docs = ['docs/sensetrust-command-center-integration-v42.md','docs/sensetrust-command-center-version-trail-v42.md','docs/sensetrust-command-center-navigation-v42.md','docs/sensetrust-command-center-proof-chain-v42.md','docs/sensetrust-command-center-readiness-snapshot-v42.md','docs/sensetrust-command-center-risk-snapshot-v42.md','docs/sensetrust-command-center-guardrail-snapshot-v42.md','docs/sensetrust-command-center-demo-scenarios-v42.md','docs/sensetrust-command-center-institutional-views-v42.md','docs/sensetrust-command-center-release-candidate-preparation-v42.md']
function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }
Object.entries(files).forEach(([k, f]) => assert(exists(f), `${k} exists`))
docs.forEach((f) => assert(exists(f), `${f} exists`))
const all = `${Object.values(files).map(read).join('\n')}\n${docs.map(read).join('\n')}\n${read('src/App.tsx')}`
const fixtures = read(files.fixtures)
assert(all.includes('/sensetrust/command-center'), 'route registered')
for (const [needle, label] of [['SIMULATED_COMMAND_CENTERS','command centers created'],['SIMULATED_COMMAND_CENTER_VERSION_NODES','version nodes created'],['SIMULATED_COMMAND_CENTER_TRAIL_MAPS','trail map created'],['SIMULATED_COMMAND_CENTER_NAVIGATION_ROUTES','navigation routes created'],['SIMULATED_COMMAND_CENTER_PROOF_CHAINS','proof chain created'],['SIMULATED_COMMAND_CENTER_READINESS_SNAPSHOTS','readiness snapshot created'],['SIMULATED_COMMAND_CENTER_RISK_SNAPSHOTS','risk snapshot created'],['SIMULATED_COMMAND_CENTER_GUARDRAIL_SNAPSHOTS','guardrail snapshot created'],['SIMULATED_COMMAND_CENTER_DEMO_SCENARIOS','demo scenarios created'],['SIMULATED_COMMAND_CENTER_INSTITUTIONAL_VIEWS','institutional views created'],['SIMULATED_COMMAND_CENTER_AUDIENCE_PROFILES','audience profiles created'],['SIMULATED_COMMAND_CENTER_HANDOFF_LINKS','handoff links created'],['SIMULATED_COMMAND_CENTER_RELEASE_CANDIDATE_PREPARATION','release candidate preparation created'],['SIMULATED_COMMAND_CENTER_AUDIT_TRAILS','audit trail created'],['SIMULATED_COMMAND_CENTER_EXECUTIVE_REPORTS','executive report created']]) assert(fixtures.includes(needle), label)
assert(all.includes('v4.1') || all.includes('Institutional Handoff'), 'v4.1 reference present')
assert(all.includes('v4.0') || all.includes('Outcome'), 'v4.0 reference present')
assert(all.includes('v3.9') || all.includes('Monitoring'), 'v3.9 reference present')
assert(all.includes('v3.8') || all.includes('Execution Governance'), 'v3.8 reference present')
assert(all.includes('v3.7') || all.includes('Pilot Proposal'), 'v3.7 reference present')
assert(all.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'v1.2 Lean reference present')
assert(all.includes('v4.3') && /release candidate/i.test(all), 'v4.3 release candidate preparation present')
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
assert(!/outcome_guarantee_claim:\s*true/i.test(all), 'no outcome guarantee claimed')
assert(all.includes('simulated_only'), 'simulated_only present')
assert(all.includes('metadata_only'), 'metadata_only present')
assert(all.includes('human_review_required'), 'human_review_required present')
assert(all.includes('command_center_only'), 'command_center_only present')
assert(all.includes('demo_preparation_only'), 'demo_preparation_only present')
assert(all.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'DNDA defined exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(!/neurodesenvolvimental/i.test(all), 'prohibited development term absent')
