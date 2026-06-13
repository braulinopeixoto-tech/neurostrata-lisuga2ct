import type { SenseTrustPilotScenario, SenseTrustPilotStep } from '@/types/sensetrust/pilot-console'

export const PILOT_CONSOLE_IDS = {
  pilot_id: 'PILOT-SIM-2026-0001',
  organization_id: 'ORG-SIM-001',
  user_id: 'USR-SIM-001',
  plan_id: 'PLAN-SIM-PROFESSIONAL',
  document_id: 'DNDA-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  clinical_chain_id: 'CHAIN-SIM-2026-0001',
  document_state_id: 'DOCSTATE-SIM-2026-0001',
  emission_id: 'EMIT-SIM-2026-0001',
  timestamp_id: 'TS-SIM-2026-0001',
  public_verification_token: 'TOKEN-SIM-ACTIVE-001',
  usage_ledger_id: 'USAGE-SIM-2026-0001',
  audit_report_id: 'AUDIT-SIM-2026-0001',
  created_at: '2026-06-11T10:00:00.000Z',
  completed_at: '2026-06-11T10:05:00.000Z',
}

export const PILOT_CONSOLE_SCENARIOS: SenseTrustPilotScenario[] = [
  { scenario_id: 'SCENARIO-SIM-END-TO-END-001', title: 'Fluxo ativo normal', status: 'ready', demo_mode: 'simulated_end_to_end', simulated_only: true },
  { scenario_id: 'SCENARIO-SIM-REVOKED-DOCUMENT-001', title: 'Documento revogado', status: 'ready', demo_mode: 'simulated_public_verification', simulated_only: true },
  { scenario_id: 'SCENARIO-SIM-SUPERSEDED-DOCUMENT-001', title: 'Documento substituido', status: 'ready', demo_mode: 'simulated_public_verification', simulated_only: true },
  { scenario_id: 'SCENARIO-SIM-LIMIT-EXCEEDED-001', title: 'Limite excedido', status: 'ready', demo_mode: 'simulated_saas_usage', simulated_only: true },
  { scenario_id: 'SCENARIO-SIM-AUDIT-EXPORT-001', title: 'Auditoria exportavel', status: 'ready', demo_mode: 'simulated_audit_export', simulated_only: true },
  { scenario_id: 'SCENARIO-SIM-PUBLIC-PORTAL-001', title: 'Verificacao publica', status: 'ready', demo_mode: 'simulated_public_verification', simulated_only: true },
]

export const PILOT_CONSOLE_STEPS: SenseTrustPilotStep[] = [
  'organizacao selecionada',
  'usuario autorizado',
  'plano validado',
  'documento simulado criado',
  'certificado criado',
  'Evidence Manifest criado',
  'DNDA Trust Object criado',
  'Clinical Commit Chain criada',
  'estado documental aplicado',
  'assinatura simulada aplicada',
  'timestamp logico aplicado',
  'emission_hash calculado',
  'portal publico gerado',
  'usage ledger atualizado',
  'relatorio de auditoria gerado',
].map((label, index) => ({
  step_id: `PSTEP-SIM-${String(index + 1).padStart(3, '0')}`,
  sequence: index + 1,
  label,
  status: 'passed',
  linked_module: 'SenseTrust',
  public_exposure: 'metadata_only',
}))

export const PILOT_CONSOLE_SENSITIVE_DENYLIST = [
  'patient',
  'paciente',
  'cpf',
  'diagnosis',
  'diagnostico',
  'diagnóstico',
  'clinical_report',
  'anamnesis',
  'anamnese',
  'qeeg',
  'eeg',
  'medication',
  'medicação',
  'medicacao',
  'raw_scores',
  'document_full_text',
]
