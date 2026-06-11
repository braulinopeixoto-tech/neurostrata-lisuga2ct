import { createHash } from 'node:crypto'

const fixture = {
  document_id: 'DNDA-SIM-2026-0001',
  manifest_id: 'EM-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
  subject_scope: 'simulated_pseudonymized',
  evidence_scope: 'simulated_only',
  generated_at: '2026-06-11T12:00:00Z',
  document_version: '0.1.0',
  document_content: 'DNDA_SIMULATED_REPORT_CONTENT_V04_NO_REAL_CLINICAL_DATA',
  pipeline_content: 'PIPELINE_SIM_DNDA_001_VERSION_0_4_0',
  prompt_content: 'PROMPT_SIM_DNDA_001_VERSION_0_4_0',
  evidence: [
    {
      evidence_id: 'EVD-SIM-001',
      source_type: 'simulated_qeeg_summary',
      file_name: 'simulated_qeeg_summary.json',
      content: 'SIMULATED_QEEG_SUMMARY_NO_REAL_EEG',
      sensitivity: 'restricted',
      included_in_public_certificate: false,
    },
  ],
}

const sensitiveFields = [
  'patient_name',
  'patient_document',
  'cpf',
  'full_name',
  'real_eeg',
  'anamnesis',
  'clinical_history',
  'diagnosis',
  'hypothesis',
  'scale_result',
  'clinical_data',
]

function sha256(value) {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(',')}}`
}

function createManifest() {
  const manifest = {
    schema: 'sensetrust.evidence_manifest.v1',
    manifest_id: fixture.manifest_id,
    document_id: fixture.document_id,
    subject_scope: fixture.subject_scope,
    evidence_scope: fixture.evidence_scope,
    generated_at: fixture.generated_at,
    evidence_objects: fixture.evidence.map((evidence) => ({
      evidence_id: evidence.evidence_id,
      source_type: evidence.source_type,
      file_name: evidence.file_name,
      content_hash: sha256(evidence.content),
      hash_algorithm: 'SHA-256',
      sensitivity: evidence.sensitivity,
      included_in_public_certificate: evidence.included_in_public_certificate,
    })),
    pipeline_reference: {
      pipeline_id: 'PIPE-SIM-DNDA-001',
      pipeline_version: '0.4.0',
      pipeline_hash: sha256(fixture.pipeline_content),
    },
    prompt_reference: {
      prompt_id: 'PROMPT-SIM-DNDA-001',
      prompt_version: '0.4.0',
      prompt_hash: sha256(fixture.prompt_content),
    },
  }

  return {
    ...manifest,
    manifest_hash: sha256(stableStringify(manifest)),
  }
}

function createTrustObject(manifest) {
  const trustObject = {
    schema: 'sensetrust.dnda_trust_object.v1',
    trust_object_id: fixture.trust_object_id,
    document_id: fixture.document_id,
    document_type: 'DNDA_REPORT_SIMULATED',
    document_version: fixture.document_version,
    subject_scope: fixture.subject_scope,
    evidence_manifest_id: manifest.manifest_id,
    evidence_manifest_hash: manifest.manifest_hash,
    document_hash: sha256(fixture.document_content),
    pipeline_hash: manifest.pipeline_reference.pipeline_hash,
    prompt_hash: manifest.prompt_reference.prompt_hash,
    public_certificate: {
      certificate_id: fixture.certificate_id,
      token_scope: 'public_metadata_only',
      verification_route: '/verify/:token',
      public_exposure: 'metadata_only',
    },
    status: 'draft_simulated',
    created_at: fixture.generated_at,
    created_by: 'NeuroStrata Simulated Lab',
  }

  return {
    ...trustObject,
    trust_object_hash: sha256(stableStringify(trustObject)),
  }
}

function withoutHash(record, hashKey) {
  const clone = { ...record }
  delete clone[hashKey]
  return clone
}

function assert(condition, label) {
  if (!condition) throw new Error(`FAIL ${label}`)
  console.log(`PASS ${label}`)
}

const manifest = createManifest()
const trustObject = createTrustObject(manifest)

assert(manifest.schema === 'sensetrust.evidence_manifest.v1', 'evidence manifest created')
assert(/^sha256:[a-f0-9]{64}$/.test(manifest.manifest_hash), 'evidence manifest hash')
assert(trustObject.schema === 'sensetrust.dnda_trust_object.v1', 'dnda trust object created')
assert(/^sha256:[a-f0-9]{64}$/.test(trustObject.trust_object_hash), 'dnda trust object hash')
assert(trustObject.evidence_manifest_id === manifest.manifest_id, 'manifest linked to trust object')
assert(trustObject.public_certificate.certificate_id === fixture.certificate_id, 'public certificate linked')

const tamperedManifest = structuredClone(manifest)
tamperedManifest.evidence_objects[0].content_hash = sha256('TAMPERED_EVIDENCE')
assert(
  sha256(stableStringify(withoutHash(tamperedManifest, 'manifest_hash'))) !== manifest.manifest_hash,
  'evidence tamper detected',
)

const tamperedTrustObject = { ...trustObject, document_hash: sha256('TAMPERED_DOCUMENT') }
assert(
  sha256(stableStringify(withoutHash(tamperedTrustObject, 'trust_object_hash'))) !== trustObject.trust_object_hash,
  'document hash mismatch detected',
)

const publicPayload = JSON.stringify(trustObject.public_certificate).toLowerCase()
assert(!sensitiveFields.some((field) => publicPayload.includes(field)), 'no sensitive public exposure')
assert(manifest.evidence_scope === 'simulated_only' && trustObject.subject_scope === 'simulated_pseudonymized', 'simulated only')
