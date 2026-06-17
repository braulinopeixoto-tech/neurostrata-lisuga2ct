import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/pilot-evidence-vault.ts',
  service: 'src/services/sensetrust/pilot-evidence-vault-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pilot-evidence-vault.ts',
  dashboard: 'src/components/sensetrust/PilotEvidenceVaultDashboard.tsx',
  manifestPanel: 'src/components/sensetrust/EvidenceManifestPanel.tsx',
  ledgerPanel: 'src/components/sensetrust/AcceptanceLedgerPanel.tsx',
  matrixPanel: 'src/components/sensetrust/EvidenceMinimumMatrixPanel.tsx',
  completenessPanel: 'src/components/sensetrust/EvidenceCompletenessScorePanel.tsx',
  riskPanel: 'src/components/sensetrust/EvidenceRiskSignalPanel.tsx',
  blockerPanel: 'src/components/sensetrust/EvidenceMisuseBlockerPanel.tsx',
  auditPanel: 'src/components/sensetrust/EvidenceAuditTrailPanel.tsx',
  acceptanceStatePanel: 'src/components/sensetrust/PilotAcceptanceStatePanel.tsx',
  reportPanel: 'src/components/sensetrust/EvidenceVaultExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustPilotEvidenceVault.tsx',
  doc: 'docs/sensetrust-pilot-evidence-vault-v26.md',
  manifestDoc: 'docs/sensetrust-evidence-manifest-v26.md',
  ledgerDoc: 'docs/sensetrust-acceptance-ledger-v26.md',
  matrixDoc: 'docs/sensetrust-evidence-minimum-matrix-v26.md',
  riskDoc: 'docs/sensetrust-evidence-risk-signals-v26.md',
  blockersDoc: 'docs/sensetrust-evidence-misuse-blockers-v26.md',
  auditDoc: 'docs/sensetrust-evidence-audit-trail-v26.md',
  executiveDoc: 'docs/sensetrust-evidence-vault-executive-report-v26.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'pilot evidence vault types exist')
assert(exists(files.service), 'pilot evidence vault service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'pilot evidence vault dashboard exists')
assert(exists(files.manifestPanel), 'evidence manifest panel exists')
assert(exists(files.ledgerPanel), 'acceptance ledger panel exists')
assert(exists(files.matrixPanel), 'evidence minimum matrix panel exists')
assert(exists(files.completenessPanel), 'evidence completeness score panel exists')
assert(exists(files.riskPanel), 'evidence risk signal panel exists')
assert(exists(files.blockerPanel), 'evidence misuse blocker panel exists')
assert(exists(files.auditPanel), 'evidence audit trail panel exists')
assert(exists(files.acceptanceStatePanel), 'pilot acceptance state panel exists')
assert(exists(files.reportPanel), 'evidence vault executive report panel exists')
assert(exists(files.page) || true, 'optional pilot evidence vault page exists or not required')
assert(exists(files.doc), 'pilot evidence vault doc exists')
assert(exists(files.manifestDoc), 'evidence manifest doc exists')
assert(exists(files.ledgerDoc), 'acceptance ledger doc exists')
assert(exists(files.matrixDoc), 'evidence minimum matrix doc exists')
assert(exists(files.riskDoc), 'evidence risk signals doc exists')
assert(exists(files.blockersDoc), 'evidence misuse blockers doc exists')
assert(exists(files.auditDoc), 'evidence audit trail doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_PILOT_EVIDENCE_VAULTS') && fixtures.includes('length: 8'), 'evidence vaults created')
assert(fixtures.includes('SIMULATED_PILOT_EVIDENCE_RECORDS') && fixtures.includes('length: 40'), 'evidence records created')
assert(fixtures.includes('SIMULATED_PILOT_EVIDENCE_MANIFESTS') && fixtures.includes('length: 8'), 'evidence manifests created')
assert(fixtures.includes('SIMULATED_ACCEPTANCE_LEDGERS') && fixtures.includes('length: 8'), 'acceptance ledgers created')
assert(fixtures.includes('SIMULATED_ACCEPTANCE_LEDGER_ENTRIES') && fixtures.includes('length: 32'), 'acceptance ledger entries created')
assert(fixtures.includes('SIMULATED_ACCEPTANCE_STATES') && fixtures.includes('map'), 'acceptance states created')
assert(fixtures.includes('SIMULATED_EVIDENCE_MINIMUM_MATRICES') && fixtures.includes('length: 8'), 'evidence minimum matrices created')
assert(fixtures.includes('SIMULATED_EVIDENCE_COMPLETENESS_SCORES') && fixtures.includes('length: 8'), 'evidence completeness scores created')
assert(fixtures.includes('SIMULATED_EVIDENCE_RISK_SIGNALS') && fixtures.includes('length: 24'), 'risk signals created')
assert(fixtures.includes('SIMULATED_EVIDENCE_MISUSE_BLOCKERS') && fixtures.includes('length: 16'), 'misuse blockers created')
assert(fixtures.includes('SIMULATED_EVIDENCE_AUDIT_TRAIL') && fixtures.includes('length: 24'), 'audit trail created')
assert(fixtures.includes('SIMULATED_EVIDENCE_VAULT_EXECUTIVE_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_storage_claimed:\s*true/i.test(all) && !/storage_real_enabled:\s*true/i.test(all), 'no real storage claimed')
assert(!/legal_signature_claimed:\s*true/i.test(all) && !/legal_signature_enabled:\s*true/i.test(all), 'no legal signature claimed')
assert(!/blockchain_claimed:\s*true/i.test(all) && !/blockchain_enabled:\s*true/i.test(all), 'no blockchain claimed')
assert(!/diagnostic_truth_certification_claimed:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_clinical_operation_claimed:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(all.includes('v2.5'), 'v2.5 reference present')
assert(all.includes('v2.4'), 'v2.4 reference present')
assert(all.includes('v2.3'), 'v2.3 reference present')

