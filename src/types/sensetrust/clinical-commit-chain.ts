export type ClinicalCommitHashAlgorithm = 'SHA-256'

export type ClinicalCommitType =
  | 'initial_draft'
  | 'evidence_attached'
  | 'dnda_trust_object_created'
  | 'human_review'
  | 'clinical_revision'
  | 'risk_section_updated'
  | 'intervention_plan_updated'
  | 'signed_final'
  | 'amended'
  | 'revoked'
  | 'superseded'

export type ClinicalCommitStatus =
  | 'draft'
  | 'reviewed'
  | 'signed'
  | 'amended'
  | 'revoked'
  | 'superseded'
  | 'invalid_integrity'

export interface ClinicalCommitActor {
  actor_id: string
  display_name: string
  role: 'simulated_clinical_reviewer' | 'simulated_system' | 'simulated_auditor'
  organization: 'NeuroStrata Simulated Lab'
}

export interface ClinicalCommitDiff {
  section?: string
  operation?: 'created' | 'attached' | 'reviewed' | 'updated' | 'signed' | 'amended' | 'revoked'
  summary?: string
  simulated_only: true
  public_exposure: 'none' | 'metadata_only'
}

export interface ClinicalCommit {
  schema: 'sensetrust.clinical_commit.v1'
  commit_id: string
  parent_commit_id: string | null
  chain_id: string
  document_id: string
  trust_object_id: string
  evidence_manifest_id: string
  commit_type: ClinicalCommitType
  status: ClinicalCommitStatus
  actor: ClinicalCommitActor
  reason: string
  diff_json: ClinicalCommitDiff
  previous_hash: string | null
  current_hash: string
  hash_algorithm: ClinicalCommitHashAlgorithm
  evidence_manifest_hash: string
  document_hash: string
  trust_object_hash: string
  created_at: string
  sequence: number
}

export interface ClinicalCommitLink {
  commit_id: string
  parent_commit_id: string | null
  previous_hash: string | null
  current_hash: string
  sequence: number
}

export interface ClinicalCommitChain {
  schema: 'sensetrust.clinical_commit_chain.v1'
  chain_id: string
  document_id: string
  trust_object_id: string
  evidence_manifest_id: string
  status: ClinicalCommitStatus
  commits: ClinicalCommit[]
  created_at: string
  simulated_only: true
}

export interface ClinicalCommitIntegrityResult {
  commit_id: string
  sequence: number
  valid_hash: boolean
  valid_parent: boolean
  valid_previous_hash: boolean
}

export interface ClinicalCommitChainValidationResult {
  valid: boolean
  status: ClinicalCommitStatus | 'valid'
  results: ClinicalCommitIntegrityResult[]
  errors: string[]
}
