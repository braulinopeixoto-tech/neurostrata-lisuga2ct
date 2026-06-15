import type {
  SenseTrustMeetingAudience,
  SenseTrustMeetingAudienceType,
  SenseTrustMeetingDecision,
  SenseTrustMeetingFeedbackItem,
  SenseTrustMeetingFollowUpGovernance,
  SenseTrustMeetingInsight,
  SenseTrustMeetingInterestSignal,
  SenseTrustMeetingNextStep,
  SenseTrustMeetingObjection,
  SenseTrustMeetingObjective,
  SenseTrustMeetingOpportunityScore,
  SenseTrustMeetingParticipantProfile,
  SenseTrustMeetingReadinessScore,
  SenseTrustMeetingRecord,
  SenseTrustMeetingRiskSignal,
} from '@/types/sensetrust/meeting-intelligence'

export const MEETING_INTELLIGENCE_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real']
export const MEETING_INTELLIGENCE_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'crm real ativo', 'analytics real ativo', 'email automation real', 'lead real capturado']

export const MEETING_AUDIENCES: SenseTrustMeetingAudienceType[] = ['clinics', 'public_sector', 'legal_partners', 'investors', 'institutions', 'press', 'regulators', 'internal_team']

export const SIMULATED_MEETING_AUDIENCES: SenseTrustMeetingAudience[] = MEETING_AUDIENCES.map((audience) => ({
  audience_id: `MI-AUD-${audience}`,
  audience_type: audience,
  audience_name: audience,
  primary_interest: 'Entender confianca documental sem promessa indevida.',
  required_disclosure: 'Registro simulado, metadata_only, sem CRM real e sem automacao real de e-mail.',
}))

export const SIMULATED_PARTICIPANT_PROFILES: SenseTrustMeetingParticipantProfile[] = MEETING_AUDIENCES.map((audience) => ({
  profile_id: `MI-PROFILE-${audience}`,
  audience_type: audience,
  role_summary: 'Perfil institucional simulado, sem nome pessoal ou dado sensivel.',
  organization_profile: 'Organizacao simulada para calibracao de reuniao controlada.',
  personal_data_recorded: false,
  simulated_only: true,
}))

export const SIMULATED_MEETING_OBJECTIVES: SenseTrustMeetingObjective[] = MEETING_AUDIENCES.map((audience) => ({
  objective_id: `MI-OBJ-${audience}`,
  summary: 'Capturar aprendizado pos-demo, objeções, interesse e proximos passos governados.',
  success_condition: 'Publico entende o que SenseTrust faz, o que nao faz e quais limites exigem revisao humana.',
  forbidden_goal: 'Criar contrato, lead real, receita real, CRM real ou promessa diagnostica.',
}))

export const SIMULATED_MEETING_FEEDBACK_ITEMS: SenseTrustMeetingFeedbackItem[] = Array.from({ length: 24 }, (_, index) => ({
  feedback_id: `MI-FEEDBACK-${String(index + 1).padStart(2, '0')}`,
  audience_type: MEETING_AUDIENCES[index % MEETING_AUDIENCES.length],
  dimension: ['clarity', 'value', 'risk', 'trust', 'next_step'][index % 5] as SenseTrustMeetingFeedbackItem['dimension'],
  prompt: ['Clareza da proposta', 'Valor percebido', 'Risco percebido', 'Entendimento do que certifica', 'Proximo passo sugerido'][index % 5],
  simulated_response: 'Resposta estruturada simulada, sem formulario publico real.',
  real_collection_enabled: false,
}))

export const SIMULATED_MEETING_OBJECTIONS: SenseTrustMeetingObjection[] = Array.from({ length: 24 }, (_, index) => ({
  objection_id: `MI-OBJT-${String(index + 1).padStart(2, '0')}`,
  audience_type: MEETING_AUDIENCES[index % MEETING_AUDIENCES.length],
  objection_text: ['Isso tem validade juridica?', 'Isso certifica diagnostico?', 'Isso ja usa Gov.br?', 'Isso coleta leads?', 'Isso tem CRM real?', 'Isso envia e-mail automatico?'][index % 6],
  objection_category: ['validade juridica', 'diagnostico', 'Gov.br', 'lead', 'CRM', 'email'][index % 6],
  risk_level: index % 6 === 1 ? 'critical' : index % 3 === 0 ? 'high' : 'medium',
  safe_response: 'Resposta segura: demonstracao controlada, metadata_only e revisao humana obrigatoria.',
  prohibited_response: 'Resposta proibida: declarar validade plena, diagnostico correto, CRM real ou automacao real.',
  recommended_next_step: index % 3 === 0 ? 'request_legal_review' : 'send_authorized_material',
  requires_human_review: index % 3 === 0,
  simulated_only: true,
}))

export const SIMULATED_INTEREST_SIGNALS: SenseTrustMeetingInterestSignal[] = Array.from({ length: 24 }, (_, index) => ({
  signal_id: `MI-INTEREST-${String(index + 1).padStart(2, '0')}`,
  audience_type: MEETING_AUDIENCES[index % MEETING_AUDIENCES.length],
  interest_level: ['low', 'moderate', 'high', 'strategic'][index % 4] as SenseTrustMeetingInterestSignal['interest_level'],
  signal: 'Solicitou material autorizado ou nova conversa controlada.',
  simulated_evidence: 'Evidencia simulada registrada sem dado pessoal real.',
  recommended_next_step: index % 4 === 3 ? 'schedule_follow_up' : 'send_authorized_material',
  associated_risk: index % 4 === 3 ? 'medium' : 'low',
}))

export const SIMULATED_RISK_SIGNALS: SenseTrustMeetingRiskSignal[] = Array.from({ length: 16 }, (_, index) => ({
  risk_id: `MI-RISK-${String(index + 1).padStart(2, '0')}`,
  audience_type: MEETING_AUDIENCES[index % MEETING_AUDIENCES.length],
  risk_level: index % 5 === 0 ? 'critical' : index % 2 === 0 ? 'high' : 'medium',
  source: 'Interpretacao indevida possivel durante follow-up.',
  mitigation: 'Usar disclosure, material autorizado e revisao humana.',
  blocks_follow_up: index % 5 === 0,
  requires_human_review: true,
}))

export const SIMULATED_NEXT_STEPS: SenseTrustMeetingNextStep[] = Array.from({ length: 16 }, (_, index) => ({
  next_step_id: `MI-NEXT-${String(index + 1).padStart(2, '0')}`,
  type: ['send_authorized_material', 'schedule_follow_up', 'request_legal_review', 'request_technical_demo', 'request_public_sector_review', 'request_investor_room', 'defer', 'block'][index % 8] as SenseTrustMeetingNextStep['type'],
  audience_type: MEETING_AUDIENCES[index % MEETING_AUDIENCES.length],
  description: 'Proximo passo governado, sem automacao real.',
  authorized_material: 'Partner Demo Kit v2.2 metadata_only',
  owner: ['institutional', 'legal', 'privacy', 'clinical', 'commercial'][index % 5] as SenseTrustMeetingNextStep['owner'],
  simulated_due_label: 'D+2 simulado',
  blockers: ['sem CRM real', 'sem e-mail automatico', 'sem contrato vinculante'],
  requires_human_review: index % 2 === 0,
}))

export const SIMULATED_FOLLOW_UP_GOVERNANCE: SenseTrustMeetingFollowUpGovernance[] = MEETING_AUDIENCES.map((audience) => ({
  governance_id: `MI-FOLLOW-GOV-${audience}`,
  audience_type: audience,
  allowed_materials: ['one-page demo', 'disclosure publico', 'executive report'],
  prohibited_materials: ['contrato real', 'lead list', 'dados sensiveis', 'claim diagnostico'],
  authorized_message: 'Mensagem controlada, sem automacao real e sem coleta aberta.',
  human_approval_required: true,
  real_automation_enabled: false,
}))

export const SIMULATED_OPPORTUNITY_SCORES: SenseTrustMeetingOpportunityScore[] = MEETING_AUDIENCES.map((audience, index) => ({
  score_id: `MI-OPP-${audience}`,
  audience_type: audience,
  opportunity_score: 58 + index * 4,
  risk_score: 30 + index,
  readiness_score: 70 + index,
  recommended_decision: index % 4 === 0 ? 'hold_for_review' : 'advance_controlled',
  score_limit: 'Score simulado, nao previsao comercial real.',
  simulated_only: true,
}))

export const SIMULATED_READINESS_SCORES: SenseTrustMeetingReadinessScore[] = MEETING_AUDIENCES.map((audience, index) => ({
  readiness_id: `MI-READY-${audience}`,
  audience_type: audience,
  score: 72 + index,
  blockers: index % 4 === 0 ? 1 : 0,
  warnings: 2,
  status: index % 4 === 0 ? 'human_review_required' : 'follow_up_pending',
}))

export const SIMULATED_MEETING_INSIGHTS: SenseTrustMeetingInsight[] = Array.from({ length: 12 }, (_, index) => ({
  insight_id: `MI-INSIGHT-${String(index + 1).padStart(2, '0')}`,
  category: ['objection_pattern', 'interest_pattern', 'risk_pattern', 'demo_improvement', 'material_signal'][index % 5] as SenseTrustMeetingInsight['category'],
  summary: 'Insight consolidado simulado sobre reunioes controladas.',
  recommendation: 'Melhorar disclosure, roteiro ou material autorizado conforme padrao observado.',
}))

export const SIMULATED_MEETING_DECISIONS: SenseTrustMeetingDecision[] = MEETING_AUDIENCES.map((audience, index) => ({
  decision_id: `MI-DECISION-${audience}`,
  audience_type: audience,
  decision: index % 4 === 0 ? 'review' : 'advance',
  rationale: 'Decisao simulada baseada em interesse, risco e prontidao.',
  next_step_type: index % 4 === 0 ? 'request_legal_review' : 'send_authorized_material',
}))

export const SIMULATED_MEETING_RECORDS: SenseTrustMeetingRecord[] = MEETING_AUDIENCES.map((audience, index) => ({
  meeting_id: `MI-MEETING-${audience}`,
  meeting_title: `Reuniao simulada ${audience}`,
  audience_type: audience,
  meeting_status: index % 3 === 0 ? 'human_review_required' : 'feedback_recorded',
  meeting_date_label: 'data simulada',
  participants_profile: SIMULATED_PARTICIPANT_PROFILES[index],
  objective: SIMULATED_MEETING_OBJECTIVES[index],
  demo_materials_used: ['Partner Demo Kit v2.2', 'Demo Readiness v2.1', 'Prototype UX v2.0'],
  feedback_items: SIMULATED_MEETING_FEEDBACK_ITEMS.filter((item) => item.audience_type === audience).slice(0, 3),
  objections: SIMULATED_MEETING_OBJECTIONS.filter((item) => item.audience_type === audience).slice(0, 3),
  interest_signals: SIMULATED_INTEREST_SIGNALS.filter((item) => item.audience_type === audience).slice(0, 3),
  risk_signals: SIMULATED_RISK_SIGNALS.filter((item) => item.audience_type === audience).slice(0, 2),
  next_steps: SIMULATED_NEXT_STEPS.filter((item) => item.audience_type === audience).slice(0, 2),
  opportunity_score: SIMULATED_OPPORTUNITY_SCORES[index],
  follow_up_governance: SIMULATED_FOLLOW_UP_GOVERNANCE[index],
  data_classification: 'metadata_only',
  clinical_data_used: false,
  real_lead_collection: false,
  real_crm_enabled: false,
  real_analytics_enabled: false,
  real_email_automation_enabled: false,
  contract_binding_claim: false,
  simulated_only: true,
}))

export const SIMULATED_MEETING_INTELLIGENCE_REFERENCES = ['SenseTrust Partner Demo Kit v2.2', 'SenseTrust Demo Readiness v2.1', 'SenseTrust Prototype UX v2.0']
