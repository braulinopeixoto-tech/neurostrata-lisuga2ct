export const SIMULATED_CLINICAL_COMMIT_CHAIN_FIXTURE = {
  chain_id: 'CHAIN-SIM-2026-0001',
  document_id: 'DNDA-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
  evidence_manifest_hash: 'sha256:manifest-simulated-hash-placeholder',
  document_hash: 'sha256:document-simulated-hash-placeholder',
  trust_object_hash: 'sha256:trust-object-simulated-hash-placeholder',
  created_at: '2026-06-12T09:00:00Z',
  actor: {
    actor_id: 'USR-SIM-001',
    display_name: 'NeuroStrata Simulated Reviewer',
    role: 'simulated_clinical_reviewer',
    organization: 'NeuroStrata Simulated Lab',
  },
  commit_plan: [
    ['initial_draft', 'draft', 'Initial simulated DNDA draft created'],
    ['evidence_attached', 'draft', 'Simulated evidence manifest attached'],
    ['dnda_trust_object_created', 'draft', 'Simulated DNDA trust object created'],
    ['human_review', 'reviewed', 'Simulated human review completed'],
    ['clinical_revision', 'reviewed', 'Simulated revision recorded without clinical content'],
    ['signed_final', 'signed', 'Simulated final version signed'],
  ],
} as const

export const CLINICAL_COMMIT_SENSITIVE_DENYLIST = [
  'patient_name',
  'patient_document',
  'cpf',
  'real_eeg',
  'anamnesis',
  'clinical_history',
  'diagnosis',
  'hypothesis',
  'scale_result',
  'clinical_data',
] as const
