import type { SignatureActor } from '@/types/sensetrust/signature-timestamp'

export const SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE = {
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
  status: 'timestamped',
  issued_at: '2026-06-08T10:00:00.000Z',
  document_hash: 'sha256:simulated-document-hash-v07',
  trust_object_hash: 'sha256:simulated-trust-object-hash-v07',
  evidence_manifest_hash: 'sha256:simulated-evidence-manifest-hash-v07',
  clinical_chain_hash: 'sha256:simulated-clinical-chain-hash-v07',
  document_state_hash: 'sha256:simulated-document-state-hash-v07',
} as const

export const SIMULATED_SIGNATURE_ACTOR: SignatureActor = {
  actor_id: SIMULATED_SIGNATURE_TIMESTAMP_FIXTURE.professional_actor_id,
  role: 'simulated_professional',
  organization: 'NeuroStrata Simulated Lab',
  display_role: 'Simulated DNDA Reviewer',
}

export const SIGNATURE_TIMESTAMP_SENSITIVE_DENYLIST = [
  'patient',
  'paciente',
  'cpf',
  'rg',
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
  'motivo privado',
  'documento completo',
]
