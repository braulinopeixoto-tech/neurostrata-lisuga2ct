import { createHash } from 'node:crypto'

const sensitiveFieldNames = [
  'patient_name',
  'patient_document',
  'cpf',
  'full_name',
  'clinical_data',
  'diagnosis',
  'anamnesis',
  'eeg',
  'qeeg',
  'scales',
  'pdf_content',
]

const simulatedContent = 'DNDA_SIMULATED_PUBLIC_CERTIFICATE_V03_NO_CLINICAL_CONTENT'
const simulatedHash = sha256(simulatedContent)

function publicPayload(overrides = {}) {
  return {
    certificate_status: 'active',
    document_id: 'DNDA-SIM-2026-0001',
    document_type: 'DNDA_REPORT_SIMULATED',
    document_version: 'v0.3-simulated',
    issued_at: '2026-06-11T10:30:00Z',
    issuer: 'NeuroStrata Simulated Lab',
    verification_status: 'valid',
    hash_match: true,
    revocation_status: 'not_revoked',
    ...overrides,
  }
}

function verifyMockToken(token) {
  if (token === 'sim-token-dnda-2026-0001') return publicPayload()
  if (token === 'sim-token-dnda-2026-revoked') {
    return publicPayload({
      certificate_status: 'revoked',
      verification_status: 'revoked',
      revocation_status: 'revoked',
    })
  }
  if (token === 'sim-token-dnda-2026-mismatch') {
    return publicPayload({
      verification_status: 'hash_mismatch',
      hash_match: false,
    })
  }
  return publicPayload({
    certificate_status: 'not_found',
    document_id: 'unavailable',
    document_type: 'unavailable',
    document_version: 'unavailable',
    issued_at: '',
    verification_status: 'invalid',
    hash_match: false,
    revocation_status: 'unknown',
  })
}

function assert(condition, label) {
  if (!condition) {
    throw new Error(`FAIL ${label}`)
  }
  console.log(`PASS ${label}`)
}

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

const valid = verifyMockToken('sim-token-dnda-2026-0001')
assert(valid.verification_status === 'valid' && valid.hash_match === true, 'valid token')

const invalid = verifyMockToken('invalid-token')
assert(invalid.verification_status === 'invalid' && invalid.hash_match === false, 'invalid token')

const serialized = JSON.stringify(valid).toLowerCase()
assert(!sensitiveFieldNames.some((field) => serialized.includes(field)), 'no sensitive fields')

const alteredHash = sha256(`${simulatedContent}:altered`)
assert(alteredHash !== simulatedHash && verifyMockToken('sim-token-dnda-2026-mismatch').hash_match === false, 'hash mismatch')

const revoked = verifyMockToken('sim-token-dnda-2026-revoked')
assert(revoked.certificate_status === 'revoked' && revoked.revocation_status === 'revoked', 'revoked certificate')
