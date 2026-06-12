import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const tokens = {
  active: 'TOKEN-SIM-ACTIVE-001',
  amended: 'TOKEN-SIM-AMENDED-001',
  revoked: 'TOKEN-SIM-REVOKED-001',
  expired: 'TOKEN-SIM-EXPIRED-001',
  superseded: 'TOKEN-SIM-SUPERSEDED-001',
  invalidIntegrity: 'TOKEN-SIM-INTEGRITY-INVALID-001',
  invalid: 'TOKEN-SIM-INVALID-001',
}

const ids = {
  document_id: 'DNDA-SIM-2026-0001',
  replacement_document_id: 'DNDA-SIM-2026-0002',
  certificate_id: 'CERT-SIM-2026-0001',
  emission_id: 'EMIT-SIM-2026-0001',
  issued_at: '2026-06-08T10:00:00.000Z',
  verified_at: '2026-06-09T10:00:00.000Z',
  certificate_hash: 'sha256:simulated-certificate-hash-v08-abcdef1234567890',
  emission_hash: 'sha256:simulated-emission-hash-v08-abcdef1234567890',
  document_hash: 'sha256:simulated-document-hash-v08-abcdef1234567890',
}

const scenarios = {
  [tokens.active]: { state: 'active', status: 'verified_active', severity: 'success', replacement: null },
  [tokens.amended]: { state: 'amended', status: 'verified_amended', severity: 'warning', replacement: null },
  [tokens.revoked]: { state: 'revoked', status: 'verified_revoked', severity: 'danger', replacement: null },
  [tokens.expired]: { state: 'expired', status: 'verified_expired', severity: 'warning', replacement: null },
  [tokens.superseded]: { state: 'superseded', status: 'verified_superseded', severity: 'warning', replacement: ids.replacement_document_id },
  [tokens.invalidIntegrity]: { state: 'invalid_integrity', status: 'invalid_integrity', severity: 'blocked', replacement: null },
}

const sensitiveTerms = [
  'patient_name',
  'patient_cpf',
  'birth_date',
  'address',
  'phone',
  'email',
  'diagnosis',
  'diagnostic_hypothesis',
  'clinical_report',
  'anamnesis',
  'qeeg',
  'eeg',
  'scales',
  'medications',
  'raw_scores',
  'clinical_notes',
  'private_revocation_reason',
  'professional_license_number',
  'document_full_text',
  'cpf',
  'paciente',
  'laudo',
  'anamnese',
]

function partialHash(hash) {
  return `${hash.slice(0, 18)}...`
}

function messageFor(status) {
  const common = 'Esta consulta nao exibe dados clinicos.'
  if (status === 'verified_active') return `Documento verificavel pela SenseTrust. ${common}`
  if (status === 'verified_amended') return `Documento verificavel com adendo governado. ${common}`
  if (status === 'verified_revoked') return `Documento revogado no registro SenseTrust. ${common}`
  if (status === 'verified_expired') return `Documento expirado no registro SenseTrust. ${common}`
  if (status === 'verified_superseded') return `Documento substituido por nova versao no registro SenseTrust. ${common}`
  if (status === 'invalid_integrity') return `Integridade publica nao validada. ${common}`
  if (status === 'invalid_token') return `Token publico invalido ou indisponivel. ${common}`
  return `Verificacao publica indisponivel. ${common}`
}

function createPayloadForToken(token) {
  const scenario = scenarios[token]
  if (!scenario || token === tokens.invalid) {
    return {
      schema: 'sensetrust.public_verification_portal.v1',
      token_status: 'invalid',
      verification_status: 'invalid_token',
      severity: 'neutral',
      document_id: 'unavailable',
      certificate_id: 'unavailable',
      emission_id: 'unavailable',
      document_state: 'unavailable',
      signature_status: 'unavailable',
      timestamp_status: 'unavailable',
      issued_at: '',
      verified_at: ids.verified_at,
      professional_role: 'unavailable',
      institution_name: 'unavailable',
      public_hashes: {
        certificate_hash_partial: 'unavailable',
        emission_hash_partial: 'unavailable',
        document_hash_partial: 'unavailable',
      },
      superseded_by_document_id: null,
      public_message: messageFor('invalid_token'),
      safety_notice:
        'A SenseTrust certifica integridade, proveniencia e estado documental; nao certifica verdade diagnostica absoluta.',
      action_hints: [{ action_id: 'request_new_token', label: 'Solicitar novo token de verificacao ao emissor.', severity: 'neutral' }],
      public_exposure: 'metadata_only',
      simulated_only: true,
    }
  }

  return {
    schema: 'sensetrust.public_verification_portal.v1',
    token_status: 'valid',
    verification_status: scenario.status,
    severity: scenario.severity,
    document_id: ids.document_id,
    certificate_id: ids.certificate_id,
    emission_id: ids.emission_id,
    document_state: scenario.state,
    signature_status: 'timestamped',
    timestamp_status: 'valid',
    issued_at: ids.issued_at,
    verified_at: ids.verified_at,
    professional_role: 'simulated_clinical_reviewer',
    institution_name: 'NeuroStrata Simulated Lab',
    public_hashes: {
      certificate_hash_partial: partialHash(ids.certificate_hash),
      emission_hash_partial: partialHash(ids.emission_hash),
      document_hash_partial: partialHash(ids.document_hash),
    },
    superseded_by_document_id: scenario.replacement,
    public_message: messageFor(scenario.status),
    safety_notice:
      'A SenseTrust certifica integridade, proveniencia e estado documental; nao certifica verdade diagnostica absoluta.',
    action_hints: [{ action_id: 'keep_certificate_metadata', label: 'Conferir metadados do certificado e hash parcial.', severity: 'success' }],
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

function safetyCheck(payload) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const blockedTerms = sensitiveTerms.filter((term) => serialized.includes(term))
  const fullHashExposed = Object.values(payload.public_hashes).some((hash) => hash.startsWith('sha256:') && !hash.endsWith('...'))
  if (fullHashExposed) blockedTerms.push('full_hash')
  return { valid: blockedTerms.length === 0, blockedTerms }
}

function detectTampering(payload) {
  return !safetyCheck(payload).valid
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

function runRegression(script) {
  const result = spawnSync(process.execPath, [script], { encoding: 'utf8' })
  if (result.status !== 0) {
    throw new Error(`${script} failed\n${result.stdout}\n${result.stderr}`)
  }
  return true
}

const activePayload = createPayloadForToken(tokens.active)
assert(activePayload.schema === 'sensetrust.public_verification_portal.v1', 'active payload missing')
pass('public portal active payload created')

assert(createPayloadForToken(tokens.active).verification_status === 'verified_active', 'active token mismatch')
pass('active token returns verified_active')

assert(createPayloadForToken(tokens.amended).verification_status === 'verified_amended', 'amended token mismatch')
pass('amended token returns verified_amended')

assert(createPayloadForToken(tokens.revoked).verification_status === 'verified_revoked', 'revoked token mismatch')
pass('revoked token returns verified_revoked')

assert(createPayloadForToken(tokens.expired).verification_status === 'verified_expired', 'expired token mismatch')
pass('expired token returns verified_expired')

assert(createPayloadForToken(tokens.superseded).verification_status === 'verified_superseded', 'superseded token mismatch')
pass('superseded token returns verified_superseded')

assert(createPayloadForToken(tokens.invalidIntegrity).verification_status === 'invalid_integrity', 'invalid integrity token mismatch')
pass('invalid integrity token returns invalid_integrity')

assert(createPayloadForToken(tokens.invalid).verification_status === 'invalid_token', 'invalid token mismatch')
pass('invalid token returns invalid_token')

assert(activePayload.signature_status === 'timestamped' && activePayload.timestamp_status === 'valid' && activePayload.issued_at, 'signature metadata unsafe')
pass('signature timestamp metadata safe')

assert(activePayload.public_hashes.emission_hash_partial.endsWith('...') && activePayload.public_hashes.emission_hash_partial !== ids.emission_hash, 'full emission hash exposed')
pass('emission hash partial only')

assert(activePayload.public_hashes.document_hash_partial.endsWith('...') && activePayload.public_hashes.document_hash_partial !== ids.document_hash, 'full document hash exposed')
pass('document hash partial only')

assert(activePayload.certificate_id === ids.certificate_id && activePayload.public_hashes.certificate_hash_partial.endsWith('...'), 'certificate QR metadata unsafe')
pass('certificate qr metadata safe')

assert(!activePayload.safety_notice.toLowerCase().includes('verdade diagnostica absoluta') || activePayload.safety_notice.toLowerCase().includes('nao certifica'), 'diagnostic truth promise found')
pass('public message does not certify diagnostic truth')

const revokedPayload = createPayloadForToken(tokens.revoked)
assert(!JSON.stringify(revokedPayload).toLowerCase().includes('private_revocation_reason'), 'private revocation reason leaked')
pass('private revocation reason hidden')

assert(safetyCheck(activePayload).valid && safetyCheck(revokedPayload).valid, 'clinical data exposed')
pass('clinical data hidden')

assert(safetyCheck(activePayload).valid, 'public payload failed safety check')
pass('public payload safety check')

const tamperedPayload = {
  ...activePayload,
  public_hashes: { ...activePayload.public_hashes, document_hash_partial: ids.document_hash },
}
assert(detectTampering(tamperedPayload), 'tampered payload not detected')
pass('public payload tamper detected')

const serializedAll = JSON.stringify([
  activePayload,
  createPayloadForToken(tokens.amended),
  createPayloadForToken(tokens.revoked),
  createPayloadForToken(tokens.expired),
  createPayloadForToken(tokens.superseded),
  createPayloadForToken(tokens.invalidIntegrity),
  createPayloadForToken(tokens.invalid),
])
assert(serializedAll.includes('SIM') && !/cpf|paciente real|real patient|john doe|maria/i.test(serializedAll), 'non-simulated data detected')
pass('simulated only')

assert(runRegression('scripts/test-sensetrust-signature-timestamp-v07.mjs'), 'v0.7 regression failed')
pass('v0.7 regression')

assert(runRegression('scripts/test-sensetrust-document-states-v06.mjs'), 'v0.6 regression failed')
pass('v0.6 regression')

assert(runRegression('scripts/test-sensetrust-clinical-commit-chain-v05.mjs'), 'v0.5 regression failed')
pass('v0.5 regression')

// Keep crypto imported to assert the runtime has deterministic hashing available for portal hardening.
assert(createHash('sha256').update('sensetrust-v08').digest('hex').length === 64, 'sha256 unavailable')
