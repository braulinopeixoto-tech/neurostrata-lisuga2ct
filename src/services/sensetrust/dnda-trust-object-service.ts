import type {
  DndaTrustObject,
  EvidenceManifest,
  PublicCertificateReference,
} from '@/types/sensetrust/dnda-trust-object'
import { SIMULATED_DNDA_TRUST_OBJECT_FIXTURE } from '@/fixtures/sensetrust/simulated-dnda-trust-object'
import { generateSha256FromContent } from './pdf-hash-service'
import {
  assertNoSensitivePublicExposure,
  calculateEvidenceManifestHash,
  createSimulatedEvidenceManifest,
  stableStringify,
} from './evidence-manifest-service'

export async function createSimulatedDndaTrustObject(
  manifest: EvidenceManifest | null = null,
): Promise<DndaTrustObject> {
  const fixture = SIMULATED_DNDA_TRUST_OBJECT_FIXTURE
  const evidenceManifest = manifest ?? (await createSimulatedEvidenceManifest())
  const publicCertificate = linkTrustObjectToPublicCertificate(fixture.certificate_id)
  const trustObjectWithoutHash = {
    schema: 'sensetrust.dnda_trust_object.v1' as const,
    trust_object_id: fixture.trust_object_id,
    document_id: fixture.document_id,
    document_type: 'DNDA_REPORT_SIMULATED' as const,
    document_version: fixture.document_version,
    subject_scope: fixture.subject_scope,
    evidence_manifest_id: evidenceManifest.manifest_id,
    evidence_manifest_hash: evidenceManifest.manifest_hash,
    document_hash: `sha256:${await generateSha256FromContent(fixture.simulated_document_content)}`,
    pipeline_hash: evidenceManifest.pipeline_reference.pipeline_hash,
    prompt_hash: evidenceManifest.prompt_reference.prompt_hash,
    public_certificate: publicCertificate,
    status: 'draft_simulated' as const,
    created_at: fixture.generated_at,
    created_by: 'NeuroStrata Simulated Lab' as const,
  }

  return {
    ...trustObjectWithoutHash,
    trust_object_hash: await calculateDndaTrustObjectHash(trustObjectWithoutHash),
  }
}

export async function calculateDndaTrustObjectHash(
  trustObject: Omit<DndaTrustObject, 'trust_object_hash'> | DndaTrustObject,
) {
  const { trust_object_hash: _trustObjectHash, ...canonicalTrustObject } = trustObject as DndaTrustObject
  return `sha256:${await generateSha256FromContent(stableStringify(canonicalTrustObject))}`
}

export async function validateDndaTrustObject(trustObject: DndaTrustObject, manifest: EvidenceManifest) {
  const expectedHash = await calculateDndaTrustObjectHash(trustObject)
  const expectedManifestHash = await calculateEvidenceManifestHash(manifest)
  return {
    valid:
      trustObject.schema === 'sensetrust.dnda_trust_object.v1' &&
      trustObject.subject_scope === 'simulated_pseudonymized' &&
      trustObject.evidence_manifest_id === manifest.manifest_id &&
      trustObject.evidence_manifest_hash === manifest.manifest_hash &&
      manifest.manifest_hash === expectedManifestHash &&
      trustObject.trust_object_hash === expectedHash,
    expectedHash,
    actualHash: trustObject.trust_object_hash,
  }
}

export function linkTrustObjectToPublicCertificate(certificateId: string): PublicCertificateReference {
  return {
    certificate_id: certificateId,
    token_scope: 'public_metadata_only',
    verification_route: '/verify/:token',
    public_exposure: 'metadata_only',
  }
}

export async function assertDndaTrustObjectIntegrity(
  trustObject: DndaTrustObject,
  manifest: EvidenceManifest,
) {
  const validation = await validateDndaTrustObject(trustObject, manifest)
  if (!validation.valid) {
    throw new Error('dnda_trust_object_integrity_failed')
  }

  assertNoSensitivePublicExposure(trustObject.public_certificate)
  return true
}
