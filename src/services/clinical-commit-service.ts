import { create_clinical_commit, create_evidence_manifest } from '@/services/sense-trust-service'

export async function createClinicalVersionCommit(params: {
  caseId: string
  parentCommitId?: string | null
  reason: string
  before: Record<string, unknown>
  after: Record<string, unknown>
}) {
  const evidenceManifest = await create_evidence_manifest(params.caseId)

  const commit = await create_clinical_commit(
    params.caseId,
    params.parentCommitId ?? null,
    params.reason,
    {
      before: params.before,
      after: params.after,
      evidence_manifest_hashes: evidenceManifest.evidence_hashes.map((item) => item.sha256_hash),
    },
  )

  return { commit, evidenceManifest }
}
