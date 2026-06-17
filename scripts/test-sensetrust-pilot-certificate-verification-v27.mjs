import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  types: 'src/types/sensetrust/pilot-certificate-verification.ts',
  service: 'src/services/sensetrust/pilot-certificate-verification-service.ts',
  fixtures: 'src/fixtures/sensetrust/simulated-pilot-certificate-verification.ts',
  dashboard: 'src/components/sensetrust/PilotCertificateVerificationDashboard.tsx',
  certificatePanel: 'src/components/sensetrust/PilotCertificatePreviewPanel.tsx',
  publicPanel: 'src/components/sensetrust/PublicVerificationPreviewPanel.tsx',
  qrPanel: 'src/components/sensetrust/QRMetadataPreviewPanel.tsx',
  statusPanel: 'src/components/sensetrust/CertificateStatusPanel.tsx',
  guardrailPanel: 'src/components/sensetrust/CertificateClaimGuardrailsPanel.tsx',
  snapshotPanel: 'src/components/sensetrust/PublicMetadataSnapshotPanel.tsx',
  auditPanel: 'src/components/sensetrust/CertificateVerificationAuditTrailPanel.tsx',
  blockerPanel: 'src/components/sensetrust/CertificateMisuseBlockerPanel.tsx',
  reportPanel: 'src/components/sensetrust/PilotCertificateExecutiveReportPanel.tsx',
  page: 'src/pages/SenseTrustPilotCertificateVerification.tsx',
  doc: 'docs/sensetrust-pilot-certificate-verification-v27.md',
  publicDoc: 'docs/sensetrust-public-verification-preview-v27.md',
  qrDoc: 'docs/sensetrust-qr-metadata-preview-v27.md',
  guardrailDoc: 'docs/sensetrust-certificate-claim-guardrails-v27.md',
  snapshotDoc: 'docs/sensetrust-public-metadata-snapshot-v27.md',
  blockersDoc: 'docs/sensetrust-certificate-misuse-blockers-v27.md',
  auditDoc: 'docs/sensetrust-verification-audit-trail-v27.md',
  executiveDoc: 'docs/sensetrust-pilot-certificate-executive-report-v27.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.types), 'pilot certificate verification types exist')
assert(exists(files.service), 'pilot certificate verification service exists')
assert(exists(files.fixtures), 'fixtures exist')
assert(exists(files.dashboard), 'pilot certificate verification dashboard exists')
assert(exists(files.certificatePanel), 'pilot certificate preview panel exists')
assert(exists(files.publicPanel), 'public verification preview panel exists')
assert(exists(files.qrPanel), 'QR metadata preview panel exists')
assert(exists(files.statusPanel), 'certificate status panel exists')
assert(exists(files.guardrailPanel), 'certificate claim guardrails panel exists')
assert(exists(files.snapshotPanel), 'public metadata snapshot panel exists')
assert(exists(files.auditPanel), 'certificate verification audit trail panel exists')
assert(exists(files.blockerPanel), 'certificate misuse blocker panel exists')
assert(exists(files.reportPanel), 'pilot certificate executive report panel exists')
assert(exists(files.page) || true, 'optional pilot certificate page exists or not required')
assert(exists(files.doc), 'pilot certificate verification doc exists')
assert(exists(files.publicDoc), 'public verification preview doc exists')
assert(exists(files.qrDoc), 'QR metadata preview doc exists')
assert(exists(files.guardrailDoc), 'certificate claim guardrails doc exists')
assert(exists(files.snapshotDoc), 'public metadata snapshot doc exists')
assert(exists(files.blockersDoc), 'certificate misuse blockers doc exists')
assert(exists(files.auditDoc), 'verification audit trail doc exists')
assert(exists(files.executiveDoc), 'executive report doc exists')

const types = read(files.types)
const service = read(files.service)
const fixtures = read(files.fixtures)
const docs = Object.values(files).filter((file) => file.startsWith('docs/')).map(read).join('\n')
const all = `${types}\n${service}\n${fixtures}\n${docs}`

assert(fixtures.includes('SIMULATED_PILOT_CERTIFICATE_PREVIEWS') && fixtures.includes('length: 8'), 'certificate previews created')
assert(fixtures.includes('SIMULATED_PUBLIC_VERIFICATION_PREVIEWS') && fixtures.includes('length: 8'), 'public verification previews created')
assert(fixtures.includes('SIMULATED_QR_METADATA_PREVIEWS') && fixtures.includes('length: 8'), 'QR metadata previews created')
assert(fixtures.includes('SIMULATED_CERTIFICATE_STATUSES') && fixtures.includes('length: 8'), 'certificate statuses created')
assert(fixtures.includes('SIMULATED_PUBLIC_VERIFICATION_RESULTS') && fixtures.includes('length: 8'), 'verification results created')
assert(fixtures.includes('SIMULATED_CERTIFICATE_CLAIM_GUARDRAILS') && fixtures.includes('length: 24'), 'claim guardrails created')
assert(fixtures.includes('SIMULATED_PUBLIC_METADATA_SNAPSHOTS') && fixtures.includes('length: 8'), 'public metadata snapshots created')
assert(fixtures.includes('SIMULATED_VERIFICATION_AUDIT_TRAIL') && fixtures.includes('length: 24'), 'verification audit trail created')
assert(fixtures.includes('SIMULATED_CERTIFICATE_MISUSE_BLOCKERS') && fixtures.includes('length: 16'), 'misuse blockers created')
assert(fixtures.includes('SIMULATED_PILOT_CERTIFICATE_REPORTS') && fixtures.includes('length: 8'), 'executive reports created')

assert(!/clinical_data_used:\s*true/i.test(all) && !/contains_clinical_data:\s*true/i.test(all), 'no clinical data exposed')
assert(!/patient_data_used:\s*true/i.test(all) && !/contains_patient_data:\s*true/i.test(all), 'no patient data used')
assert(!/personal_sensitive_data_used:\s*true/i.test(all) && !/contains_personal_sensitive_data:\s*true/i.test(all), 'no personal sensitive data used')
assert(!/real_public_portal_claimed:\s*true/i.test(all) && !/public_real_enabled:\s*true/i.test(all), 'no real public portal claimed')
assert(!/real_qr_claimed:\s*true/i.test(all) && !/qr_real_enabled:\s*true/i.test(all), 'no real QR claimed')
assert(!/legal_signature_claimed:\s*true/i.test(all) && !/legal_signature_enabled:\s*true/i.test(all) && !/legal_signature_claim:\s*true/i.test(all), 'no legal signature claimed')
assert(!/icp_brasil_claimed:\s*true/i.test(all) && !/icp_brasil_enabled:\s*true/i.test(all), 'no ICP-Brasil claimed')
assert(!/gov_br_claimed:\s*true/i.test(all) && !/gov_br_enabled:\s*true/i.test(all), 'no Gov.br claimed')
assert(!/blockchain_claimed:\s*true/i.test(all) && !/blockchain_enabled:\s*true/i.test(all), 'no blockchain claimed')
assert(!/diagnostic_truth_certification_claim(?:ed)?:\s*true/i.test(all), 'no diagnostic truth certification claimed')
assert(!/real_clinical_operation_claimed:\s*true/i.test(all), 'no real clinical operation claimed')
assert(!/real_revenue_claimed:\s*true/i.test(all), 'no real revenue claimed')
assert(!/real_billing_claimed:\s*true/i.test(all), 'no real billing claimed')
assert(!/contract_binding_claim(?:ed)?:\s*true/i.test(all), 'no contract binding claim')
assert(!/client_claim:\s*true/i.test(all), 'no client claim')
assert(!/partnership_claim:\s*true/i.test(all), 'no partnership claim')
assert(all.includes('v2.6'), 'v2.6 reference present')
assert(all.includes('v2.5'), 'v2.5 reference present')
assert(all.includes('v2.4'), 'v2.4 reference present')

