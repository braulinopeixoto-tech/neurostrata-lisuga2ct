import { createHash } from 'node:crypto'

const ids = {
  document_id: 'DNDA-SIM-2026-0001',
  emission_id: 'EMIT-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  clinical_chain_id: 'CHAIN-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
  professional_actor_id: 'USR-SIM-001',
  institution_id: 'ORG-SIM-001',
  timestamp_id: 'TS-SIM-2026-0001',
  clinical_commit_id: 'CMT-SIM-DOC-EMISSION-0001',
  issued_at: '2026-06-08T10:00:00.000Z',
}

const criticalHashes = {
  document_hash: 'sha256:simulated-document-hash-v07',
  trust_object_hash: 'sha256:simulated-trust-object-hash-v07',
  evidence_manifest_hash: 'sha256:simulated-evidence-manifest-hash-v07',
  clinical_chain_hash: 'sha256:simulated-clinical-chain-hash-v07',
  document_state_hash: 'sha256:simulated-document-state-hash-v07',
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(',')}}`
}

function sha256(value) {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`
}

function createSimulatedProfessionalSignature() {
  const payload = {
    actor_id: ids.professional_actor_id,
    role: 'Simulated DNDA Reviewer',
    organization: 'NeuroStrata Simulated Lab',
    scope: 'emission_integrity',
    signed_at: ids.issued_at,
  }
  return {
    signature_id: 'SIG-PRO-SIM-2026-0001',
    signature_type: 'simulated_professional_signature',
    ...payload,
    signature_hash: sha256(payload),
    status: 'signed',
    simulated_only: true,
  }
}

function createSimulatedInstitutionalSignature() {
  const payload = {
    institution_id: ids.institution_id,
    institution_name: 'NeuroStrata Simulated Lab',
    scope: 'emission_integrity',
    signed_at: ids.issued_at,
  }
  return {
    signature_id: 'SIG-ORG-SIM-2026-0001',
    signature_type: 'simulated_institutional_signature',
    ...payload,
    signature_hash: sha256(payload),
    status: 'countersigned',
    simulated_only: true,
  }
}

function createLogicalTimestamp(sequence = 1) {
  const payload = {
    timestamp_id: ids.timestamp_id,
    issued_at: ids.issued_at,
    authority_mode: 'internal_logical_timestamp',
    sequence,
  }
  return {
    ...payload,
    timestamp_hash: sha256(payload),
    simulated_only: true,
  }
}

function calculateEmissionIntegrityHash(emission) {
  return sha256({
    document_hash: emission.document_hash,
    trust_object_hash: emission.trust_object_hash,
    evidence_manifest_hash: emission.evidence_manifest_hash,
    clinical_chain_hash: emission.clinical_chain_hash,
    document_state_hash: emission.document_state_hash,
    professional_signature_hash: emission.professional_signature.signature_hash,
    institutional_signature_hash: emission.institutional_signature.signature_hash,
    timestamp_hash: emission.timestamp.timestamp_hash,
  })
}

function createEmissionIntegrityObject(documentState = 'active') {
  const emission = {
    schema: 'sensetrust.emission_integrity.v1',
    emission_id: ids.emission_id,
    document_id: ids.document_id,
    trust_object_id: ids.trust_object_id,
    evidence_manifest_id: ids.evidence_manifest_id,
    clinical_chain_id: ids.clinical_chain_id,
    certificate_id: ids.certificate_id,
    clinical_commit_id: ids.clinical_commit_id,
    document_state: documentState,
    timestamp_id: ids.timestamp_id,
    ...criticalHashes,
    professional_signature: createSimulatedProfessionalSignature(),
    institutional_signature: createSimulatedInstitutionalSignature(),
    timestamp: createLogicalTimestamp(),
    status: documentState === 'active' || documentState === 'signed' ? 'timestamped' : documentState,
    created_at: ids.issued_at,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
  return { ...emission, emission_hash: calculateEmissionIntegrityHash(emission) }
}

function verifyProfessionalSignature(signature) {
  return (
    signature.signature_type === 'simulated_professional_signature' &&
    signature.actor_id === ids.professional_actor_id &&
    signature.status === 'signed' &&
    signature.signature_hash.startsWith('sha256:')
  )
}

function verifyInstitutionalSignature(signature) {
  return (
    signature.signature_type === 'simulated_institutional_signature' &&
    signature.institution_id === ids.institution_id &&
    signature.status === 'countersigned' &&
    signature.signature_hash.startsWith('sha256:')
  )
}

function verifyLogicalTimestamp(timestamp) {
  return (
    timestamp.timestamp_id === ids.timestamp_id &&
    timestamp.authority_mode === 'internal_logical_timestamp' &&
    timestamp.sequence > 0 &&
    timestamp.timestamp_hash.startsWith('sha256:')
  )
}

function validateEmissionIntegrityObject(emission) {
  const errors = []
  if (calculateEmissionIntegrityHash(emission) !== emission.emission_hash) errors.push('invalid_emission_hash')
  if (!verifyProfessionalSignature(emission.professional_signature)) errors.push('invalid_professional_signature')
  if (!verifyInstitutionalSignature(emission.institutional_signature)) errors.push('invalid_institutional_signature')
  if (!verifyLogicalTimestamp(emission.timestamp)) errors.push('invalid_logical_timestamp')
  if (!['signed', 'active'].includes(emission.document_state)) errors.push(`invalid_document_state:${emission.document_state}`)
  return { valid: errors.length === 0, errors }
}

function buildPublicSignaturePayload(emission) {
  return {
    schema: 'sensetrust.public_signature_payload.v1',
    emission_id: emission.emission_id,
    document_id: emission.document_id,
    signature_status: emission.status === 'timestamped' ? 'timestamped' : 'invalid_signature',
    professional_role: emission.professional_signature.role,
    institution_name: emission.institutional_signature.institution_name,
    issued_at: emission.timestamp.issued_at,
    timestamp_mode: emission.timestamp.authority_mode,
    emission_hash_partial: `${emission.emission_hash.slice(0, 18)}...`,
    verification_status: emission.document_state === 'active' || emission.document_state === 'signed' ? 'valid' : emission.document_state,
    document_state: emission.document_state,
    public_exposure: 'metadata_only',
    simulated_only: true,
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

const professionalSignature = createSimulatedProfessionalSignature()
assert(professionalSignature.signature_hash.startsWith('sha256:'), 'professional signature missing hash')
pass('professional signature created')

const institutionalSignature = createSimulatedInstitutionalSignature()
assert(institutionalSignature.signature_hash.startsWith('sha256:'), 'institutional signature missing hash')
pass('institutional signature created')

const timestamp = createLogicalTimestamp()
assert(timestamp.timestamp_hash.startsWith('sha256:'), 'logical timestamp missing hash')
pass('logical timestamp created')

const emission = createEmissionIntegrityObject('active')
assert(emission.schema === 'sensetrust.emission_integrity.v1' && emission.emission_id === ids.emission_id, 'emission object missing')
pass('emission integrity object created')

assert(emission.emission_hash.startsWith('sha256:'), 'emission hash missing')
pass('emission hash calculated')

assert(verifyProfessionalSignature(emission.professional_signature), 'professional signature not verified')
pass('professional signature verified')

assert(verifyInstitutionalSignature(emission.institutional_signature), 'institutional signature not verified')
pass('institutional signature verified')

assert(verifyLogicalTimestamp(emission.timestamp), 'logical timestamp not verified')
pass('logical timestamp verified')

const clinicalLink = {
  clinical_commit_id: emission.clinical_commit_id,
  commit_type: 'emission_timestamped',
  emission_id: emission.emission_id,
  certificate_id: emission.certificate_id,
  timestamp_id: emission.timestamp.timestamp_id,
}
assert(clinicalLink.commit_type === 'emission_timestamped' && clinicalLink.clinical_commit_id, 'clinical commit link missing')
pass('linked to clinical commit chain')

const documentStateLink = {
  document_id: emission.document_id,
  document_state: emission.document_state,
  document_state_hash: emission.document_state_hash,
  emission_id: emission.emission_id,
  valid_for_emission: ['signed', 'active'].includes(emission.document_state),
}
assert(documentStateLink.valid_for_emission && documentStateLink.document_state_hash, 'document state link missing')
pass('linked to document state')

assert(validateEmissionIntegrityObject(emission).valid, 'active document did not validate')
pass('active document allows valid emission')

const revokedEmission = createEmissionIntegrityObject('revoked')
assert(!validateEmissionIntegrityObject(revokedEmission).valid, 'revoked document validated incorrectly')
pass('revoked document blocks valid emission')

assert(!validateEmissionIntegrityObject({ ...emission, document_hash: 'sha256:tampered-document' }).valid, 'document hash tamper not detected')
pass('document hash tamper detected')

assert(!validateEmissionIntegrityObject({ ...emission, trust_object_hash: 'sha256:tampered-trust-object' }).valid, 'trust object hash tamper not detected')
pass('trust object hash tamper detected')

assert(!validateEmissionIntegrityObject({ ...emission, evidence_manifest_hash: 'sha256:tampered-evidence-manifest' }).valid, 'evidence manifest hash tamper not detected')
pass('evidence manifest hash tamper detected')

assert(!validateEmissionIntegrityObject({ ...emission, clinical_chain_hash: 'sha256:tampered-clinical-chain' }).valid, 'clinical chain hash tamper not detected')
pass('clinical chain hash tamper detected')

assert(
  !validateEmissionIntegrityObject({
    ...emission,
    timestamp: { ...emission.timestamp, timestamp_hash: 'sha256:tampered-timestamp' },
  }).valid,
  'timestamp hash tamper not detected',
)
pass('timestamp hash tamper detected')

const publicPayload = buildPublicSignaturePayload(emission)
const serializedPublic = JSON.stringify(publicPayload).toLowerCase()
const sensitiveTerms = [
  'patient',
  'paciente',
  'cpf',
  'anamnese',
  'laudo',
  'eeg',
  'qeeg',
  'sloreta',
  'escala',
  'medicacao',
  'medicação',
  'biomarcador',
  'diagnostico',
  'diagnóstico',
  'private',
]
assert(!sensitiveTerms.some((term) => serializedPublic.includes(term)), 'public signature payload exposes sensitive field')
pass('public signature payload safe')

assert(!serializedPublic.includes('signature_hash') && !serializedPublic.includes('documento completo'), 'private fields leaked')
pass('private fields hidden')

const serializedAll = JSON.stringify([emission, publicPayload])
assert(serializedAll.includes('SIM') && !/cpf|paciente real|real patient|john doe|maria/i.test(serializedAll), 'non-simulated data detected')
pass('simulated only')
