import type { EvidenceManifest, EvidenceObject } from '@/types/sensetrust/dnda-trust-object'
import {
  SENSITIVE_FIELD_DENYLIST,
  SIMULATED_DNDA_TRUST_OBJECT_FIXTURE,
} from '@/fixtures/sensetrust/simulated-dnda-trust-object'
import { generateSha256FromContent } from './pdf-hash-service'

export async function hashEvidenceObject(content: string) {
  return `sha256:${await generateSha256FromContent(content)}`
}

export async function createSimulatedEvidenceManifest(): Promise<EvidenceManifest> {
  const fixture = SIMULATED_DNDA_TRUST_OBJECT_FIXTURE
  const evidenceObjects: EvidenceObject[] = await Promise.all(
    fixture.evidence.map(async (evidence) => ({
      evidence_id: evidence.evidence_id,
      source_type: evidence.source_type,
      file_name: evidence.file_name,
      content_hash: await hashEvidenceObject(evidence.content),
      hash_algorithm: 'SHA-256',
      sensitivity: evidence.sensitivity,
      included_in_public_certificate: evidence.included_in_public_certificate,
    })),
  )

  const manifestWithoutHash = {
    schema: 'sensetrust.evidence_manifest.v1' as const,
    manifest_id: fixture.manifest_id,
    document_id: fixture.document_id,
    subject_scope: fixture.subject_scope,
    evidence_scope: fixture.evidence_scope,
    generated_at: fixture.generated_at,
    evidence_objects: evidenceObjects,
    pipeline_reference: {
      pipeline_id: fixture.pipeline_id,
      pipeline_version: fixture.pipeline_version,
      pipeline_hash: await hashEvidenceObject(fixture.simulated_pipeline_content),
    },
    prompt_reference: {
      prompt_id: fixture.prompt_id,
      prompt_version: fixture.prompt_version,
      prompt_hash: await hashEvidenceObject(fixture.simulated_prompt_content),
    },
  }

  return {
    ...manifestWithoutHash,
    manifest_hash: await calculateEvidenceManifestHash(manifestWithoutHash),
  }
}

export async function calculateEvidenceManifestHash(
  manifest: Omit<EvidenceManifest, 'manifest_hash'> | EvidenceManifest,
) {
  const { manifest_hash: _manifestHash, ...canonicalManifest } = manifest as EvidenceManifest
  return `sha256:${await generateSha256FromContent(stableStringify(canonicalManifest))}`
}

export async function validateEvidenceManifest(manifest: EvidenceManifest) {
  const expectedHash = await calculateEvidenceManifestHash(manifest)
  return {
    valid:
      manifest.schema === 'sensetrust.evidence_manifest.v1' &&
      manifest.evidence_scope === 'simulated_only' &&
      manifest.subject_scope === 'simulated_pseudonymized' &&
      manifest.manifest_hash === expectedHash,
    expectedHash,
    actualHash: manifest.manifest_hash,
  }
}

export function assertNoSensitivePublicExposure(payload: unknown) {
  const serialized = JSON.stringify(payload).toLowerCase()
  const found = SENSITIVE_FIELD_DENYLIST.filter((field) => serialized.includes(field))
  if (found.length > 0) {
    throw new Error(`sensitive_public_exposure_detected:${found.join(',')}`)
  }
  return true
}

export function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`

  const record = value as Record<string, unknown>
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`)
    .join(',')}}`
}
