export type HashAlgorithm = 'SHA-256'

export type EvidenceSourceType =
  | 'simulated_qeeg_summary'
  | 'simulated_biomarker_summary'
  | 'simulated_scale_summary'
  | 'simulated_protocol_reference'
  | 'simulated_dnda_document'

export type TrustObjectStatus =
  | 'draft_simulated'
  | 'validated_simulated'
  | 'linked_to_public_certificate'
  | 'revoked_simulated'

export interface EvidenceObject {
  evidence_id: string
  source_type: EvidenceSourceType
  file_name: string
  content_hash: string
  hash_algorithm: HashAlgorithm
  sensitivity: 'restricted' | 'internal' | 'public_metadata'
  included_in_public_certificate: boolean
}

export interface PipelineReference {
  pipeline_id: string
  pipeline_version: string
  pipeline_hash: string
}

export interface PromptReference {
  prompt_id: string
  prompt_version: string
  prompt_hash: string
}

export interface DocumentReference {
  document_id: string
  document_type: 'DNDA_REPORT_SIMULATED'
  document_version: string
  document_hash: string
}

export interface PublicCertificateReference {
  certificate_id: string
  token_scope: 'public_metadata_only'
  verification_route: '/verify/:token'
  public_exposure: 'metadata_only'
}

export interface EvidenceManifest {
  schema: 'sensetrust.evidence_manifest.v1'
  manifest_id: string
  document_id: string
  subject_scope: 'simulated_pseudonymized'
  evidence_scope: 'simulated_only'
  generated_at: string
  evidence_objects: EvidenceObject[]
  pipeline_reference: PipelineReference
  prompt_reference: PromptReference
  manifest_hash: string
}

export interface DndaTrustObject {
  schema: 'sensetrust.dnda_trust_object.v1'
  trust_object_id: string
  document_id: string
  document_type: 'DNDA_REPORT_SIMULATED'
  document_version: string
  subject_scope: 'simulated_pseudonymized'
  evidence_manifest_id: string
  evidence_manifest_hash: string
  document_hash: string
  pipeline_hash: string
  prompt_hash: string
  public_certificate: PublicCertificateReference
  status: TrustObjectStatus
  created_at: string
  created_by: 'NeuroStrata Simulated Lab'
  trust_object_hash: string
}
