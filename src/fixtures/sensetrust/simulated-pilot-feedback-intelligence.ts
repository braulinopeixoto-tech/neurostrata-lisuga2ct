import type { SenseTrustPilotFeedbackItem } from '@/types/sensetrust/pilot-feedback-intelligence'

const now = '2026-06-14T14:00:00.000Z'

export const PILOT_FEEDBACK_SENSITIVE_DENYLIST = [
  'patient',
  'paciente',
  'cpf',
  'cid',
  'diagnostico',
  'diagnóstico',
  'clinical_report',
  'laudo',
  'anamnese',
  'eeg',
  'qeeg',
  'medicacao',
  'medicação',
]

const base = {
  created_at: now,
  data_classification: 'simulated_operational_metadata' as const,
  public_exposure: 'metadata_only' as const,
  simulated_only: true as const,
}

export const SIMULATED_PILOT_FEEDBACK_ITEMS: SenseTrustPilotFeedbackItem[] = [
  item('001', 'ORG-PILOT-SIM-001', 'Clinica Neurofuncional Alfa', 'clinic', 'trust', 'positive', 92, 'Valor alto em rastreabilidade e verificacao publica segura.', 'none', 'low', 'high', 91, 90, 'Priorizar piloto pago supervisionado.'),
  item('002', 'ORG-PILOT-SIM-001', 'Clinica Neurofuncional Alfa', 'clinic', 'clarity', 'positive', 88, 'Mensagem de integridade documental ficou clara.', 'none', 'low', 'high', 89, 87, 'Preparar proposta de entrada.'),
  item('003', 'ORG-PILOT-SIM-001', 'Clinica Neurofuncional Alfa', 'clinic', 'commercial', 'positive', 86, 'Intencao de uso alta em ambiente controlado.', 'pricing', 'low', 'high', 88, 86, 'Definir faixa piloto sem billing real.'),

  item('004', 'ORG-PILOT-SIM-002', 'Grupo Juridico Beta', 'legal_group', 'legal', 'mixed', 70, 'Pede clareza sobre validade juridica e limites.', 'legal_validity', 'moderate', 'moderate', 72, 66, 'Enviar matriz de responsabilidade.'),
  item('005', 'ORG-PILOT-SIM-002', 'Grupo Juridico Beta', 'legal_group', 'privacy', 'positive', 78, 'Metadata_only reduziu preocupacao de exposicao.', 'data_exposure', 'moderate', 'moderate', 76, 72, 'Reforcar arquitetura sem dado sensivel.'),
  item('006', 'ORG-PILOT-SIM-002', 'Grupo Juridico Beta', 'legal_group', 'go_to_market', 'mixed', 68, 'Fit bom para auditoria, mas exige revisao juridica forte.', 'liability', 'moderate', 'moderate', 70, 64, 'Seguir demo estendida com revisao legal.'),

  item('007', 'ORG-PILOT-SIM-003', 'Secretaria Municipal Gama', 'public_secretariat', 'workflow', 'mixed', 62, 'Valor percebido existe, mas ciclo publico e lento.', 'public_integration', 'high', 'low', 64, 58, 'Pausar ate escopo institucional ficar claro.'),
  item('008', 'ORG-PILOT-SIM-003', 'Secretaria Municipal Gama', 'public_secretariat', 'privacy', 'positive', 74, 'Seguranca publica parece adequada quando metadata_only e explicado.', 'governance_scope', 'high', 'low', 71, 63, 'Criar trilha juridica dedicada.'),
  item('009', 'ORG-PILOT-SIM-003', 'Secretaria Municipal Gama', 'public_secretariat', 'risk', 'negative', 48, 'Risco operacional alto para adocao imediata.', 'procurement_complexity', 'high', 'low', 50, 45, 'Manter como segmento futuro.'),

  item('010', 'ORG-PILOT-SIM-004', 'Equipe Multiprofissional Delta', 'multiprofessional_team', 'training', 'neutral', 67, 'Precisa treinamento simples para explicar o fluxo.', 'training_load', 'low', 'moderate', 69, 65, 'Oferecer demo guiada e checklist.'),
  item('011', 'ORG-PILOT-SIM-004', 'Equipe Multiprofissional Delta', 'multiprofessional_team', 'usability', 'positive', 79, 'Painel operacional foi entendido com facilidade.', 'workflow_change', 'low', 'moderate', 80, 76, 'Priorizar material de treinamento.'),
  item('012', 'ORG-PILOT-SIM-004', 'Equipe Multiprofissional Delta', 'multiprofessional_team', 'perceived_value', 'positive', 82, 'Rastreabilidade reduz retrabalho percebido.', 'none', 'low', 'moderate', 84, 79, 'Avancar para piloto estendido.'),

  item('013', 'ORG-PILOT-SIM-005', 'Projeto VitalStrata Piloto Epsilon', 'vitalstrata_project', 'go_to_market', 'positive', 90, 'Fit forte para narrativa longitudinal VitalStrata.', 'scope_control', 'moderate', 'high', 90, 88, 'Criar oferta de entrada com restricoes.'),
  item('014', 'ORG-PILOT-SIM-005', 'Projeto VitalStrata Piloto Epsilon', 'vitalstrata_project', 'technical', 'positive', 84, 'Arquitetura de verificabilidade parece reutilizavel.', 'integration_scope', 'moderate', 'high', 86, 82, 'Mapear integracoes futuras sem ativar producao.'),
  item('015', 'ORG-PILOT-SIM-005', 'Projeto VitalStrata Piloto Epsilon', 'vitalstrata_project', 'commercial', 'positive', 87, 'Intencao comercial alta com limites bem comunicados.', 'pricing', 'moderate', 'high', 88, 85, 'Planejar piloto pago supervisionado.'),
]

function item(
  id: string,
  organization_id: string,
  organization_name: string,
  organization_type: string,
  category: SenseTrustPilotFeedbackItem['category'],
  sentiment: SenseTrustPilotFeedbackItem['sentiment'],
  score: number,
  comment_simulated: string,
  objection_type: string,
  risk_level: SenseTrustPilotFeedbackItem['risk_level'],
  purchase_intent: SenseTrustPilotFeedbackItem['purchase_intent'],
  perceived_value_score: number,
  acceptance_score: number,
  next_action: string,
): SenseTrustPilotFeedbackItem {
  return {
    feedback_id: `FDB-INT-SIM-${id}`,
    organization_id,
    organization_name,
    organization_type,
    source: 'pilot_crm',
    category,
    sentiment,
    score,
    comment_simulated,
    objection_type,
    risk_level,
    purchase_intent,
    perceived_value_score,
    acceptance_score,
    next_action,
    ...base,
  }
}
