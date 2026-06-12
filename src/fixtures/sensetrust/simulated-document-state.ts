import type { DocumentStateActor, DocumentStatePolicy, DocumentStateTransitionReason } from '@/types/sensetrust/document-state'

export const SIMULATED_DOCUMENT_STATE_IDS = {
  document_id: 'DNDA-SIM-2026-0001',
  amended_document_id: 'DNDA-SIM-2026-0001-A1',
  replacement_document_id: 'DNDA-SIM-2026-0002',
  trust_object_id: 'DTO-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  chain_id: 'CHAIN-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
}

export const SIMULATED_DOCUMENT_STATE_ACTOR: DocumentStateActor = {
  actor_id: 'ACTOR-SIM-SENSETRUST',
  display_name: 'SenseTrust Simulated Reviewer',
  role: 'simulated_clinician',
  organization: 'NeuroStrata Simulated Lab',
}

export const SIMULATED_DOCUMENT_STATE_POLICY: DocumentStatePolicy = {
  schema: 'sensetrust.document_state_policy.v1',
  signed_locks_direct_edit: true,
  active_locks_direct_edit: true,
  revocation_terminal: true,
  expiration_terminal: true,
  public_payload_minimized: true,
  simulated_only: true,
}

export const SIMULATED_DOCUMENT_STATE_REASONS: Record<string, DocumentStateTransitionReason> = {
  sign: {
    public_reason: 'Documento simulado assinado e pronto para certificacao.',
    private_reason: 'Motivo interno simulado para assinatura apos revisao.',
    policy_reference: 'SenseTrust Document Lifecycle v0.6',
  },
  activate: {
    public_reason: 'Certificado simulado ativo.',
    private_reason: 'Ativacao interna simulada apos assinatura.',
    policy_reference: 'SenseTrust Document Lifecycle v0.6',
  },
  amend: {
    public_reason: 'Documento simulado recebeu adendo governado.',
    private_reason: 'Motivo interno simulado do adendo sem dado clinico real.',
    policy_reference: 'SenseTrust Revocation and Amendment Policy v0.6',
  },
  revoke: {
    public_reason: 'Certificado simulado revogado por governanca documental.',
    private_reason: 'Motivo interno simulado de revogacao, nao publicavel.',
    policy_reference: 'SenseTrust Revocation and Amendment Policy v0.6',
  },
  expire: {
    public_reason: 'Certificado simulado expirado por regra temporal.',
    private_reason: 'Expiracao interna simulada por janela de validade.',
    policy_reference: 'SenseTrust Document Lifecycle v0.6',
  },
  supersede: {
    public_reason: 'Documento simulado substituido por nova versao.',
    private_reason: 'Supersedencia interna simulada por nova versao emitida.',
    policy_reference: 'SenseTrust Document Lifecycle v0.6',
  },
  invalid: {
    public_reason: 'Integridade do documento simulado nao validada.',
    private_reason: 'Status adulterado em teste simulado.',
    policy_reference: 'SenseTrust Public Status Contract v0.6',
  },
}

export const DOCUMENT_STATE_SENSITIVE_DENYLIST = [
  'paciente',
  'patient',
  'cpf',
  'anamnese',
  'eeg',
  'qeeg',
  'sloreta',
  'diagnostico',
  'diagnóstico',
  'biomarcador',
  'private_reason',
  'motivo interno',
]
