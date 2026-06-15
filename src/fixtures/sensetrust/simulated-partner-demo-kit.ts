import type {
  SenseTrustAuthorizedMaterial,
  SenseTrustDemoAudienceBriefing,
  SenseTrustDemoFeedbackMock,
  SenseTrustDemoHandoffGovernance,
  SenseTrustDemoOnePager,
  SenseTrustFollowUpSequence,
  SenseTrustMeetingAgenda,
  SenseTrustMeetingScript,
  SenseTrustPartnerAudienceType,
  SenseTrustPartnerDemoKit,
  SenseTrustPartnerDemoReadinessScore,
  SenseTrustPartnerDemoRisk,
  SenseTrustPostDemoChecklist,
  SenseTrustPreMeetingChecklist,
  SenseTrustProhibitedMaterial,
} from '@/types/sensetrust/partner-demo-kit'

export const PARTNER_DEMO_KIT_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real']
export const PARTNER_DEMO_KIT_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'gateway real ativo', 'crm real ativo', 'analytics real ativo', 'lead real capturado', 'binding contract']

const audiences: SenseTrustPartnerAudienceType[] = ['clinics', 'public_sector', 'legal_partners', 'investors', 'institutions', 'press', 'regulators', 'internal_team']

export const SIMULATED_DEMO_ONE_PAGER: SenseTrustDemoOnePager = {
  one_pager_id: 'ONE-PAGER-V22',
  title: 'SenseTrust Partner Demo Kit',
  subtitle: 'Kit de demonstracao controlada para confianca documental metadata_only.',
  problem: 'Documentos sem trilha de evidencia, versao, estado e disclosure dificultam confianca institucional.',
  solution: 'SenseTrust demonstra uma Trust Layer para integridade, proveniencia, rastreabilidade e verificacao publica segura.',
  certifies: ['integridade documental', 'proveniencia de processo', 'estado documental', 'rastreabilidade'],
  does_not_certify: ['verdade diagnostica absoluta', 'validade juridica plena', 'assinatura legal real', 'receita ou contrato real'],
  proof_points: ['Prototype UX v2.0', 'Demo Readiness v2.1', 'metadata_only', 'disclosure obrigatorio'],
  safe_cta: 'Agendar conversa controlada com material autorizado.',
  required_disclosure: 'Material de reuniao controlada; nao e proposta vinculante, producao, coleta real ou certificacao diagnostica.',
}

export const SIMULATED_AUDIENCE_BRIEFINGS: SenseTrustDemoAudienceBriefing[] = audiences.map((audience) => ({
  briefing_id: `BRIEF-V22-${audience}`,
  audience_type: audience,
  audience_name: audience,
  primary_goal: 'Conduzir reuniao segura e controlada.',
  main_pain: 'Risco de interpretacao indevida sobre producao, validade, coleta ou diagnostico.',
  safe_promise: 'SenseTrust demonstra confianca documental e limites publicos em metadata_only.',
  permitted_language: 'Integridade, proveniencia, estado e rastreabilidade documental.',
  prohibited_language: 'Certifica diagnostico, substitui revisao humana, declara receita real ou contrato real.',
  recommended_route: audience === 'investors' ? '/investidores' : audience === 'public_sector' ? '/setor-publico' : '/sensetrust-public-prototype',
  recommended_materials: ['one-page demo', 'demo script', 'disclosure publico'],
  required_disclosures: ['sem deploy', 'sem lead real', 'sem analytics real', 'sem contrato vinculante'],
  suggested_cta: 'Propor proximo passo controlado e revisado.',
  next_step: 'Registrar interesse como feedback simulado ate ferramenta aprovada.',
  simulated_only: true,
}))

export const SIMULATED_MEETING_SCRIPTS: SenseTrustMeetingScript[] = audiences.map((audience) => ({
  script_id: `SCRIPT-V22-${audience}`,
  audience,
  opening: 'Abrir com contexto institucional NeuroStrata, VitalStrata, DNDA, BLC e SenseTrust.',
  framing: 'Enquadrar como demonstracao controlada, nao proposta vinculante.',
  discovery: 'Investigar dor documental e maturidade de governanca sem coletar dados reais.',
  demonstration: 'Mostrar Prototype UX v2.0 e Demo Readiness v2.1 com disclosure visivel.',
  objection_handling: 'Responder com limites e encaminhar revisao humana quando necessario.',
  next_steps: 'Sugerir follow-up autorizado e sem automacao real de CRM.',
  closing: 'Reforcar metadata_only, neurodireitos, LGPD e ausencia de promessa indevida.',
  permitted_phrase: 'SenseTrust demonstra trilha documental verificavel em ambiente controlado.',
  prohibited_phrase: 'SenseTrust ja fecha contrato, certifica diagnostico ou substitui validacao juridica.',
}))

export const SIMULATED_MEETING_AGENDAS: SenseTrustMeetingAgenda[] = audiences.map((audience) => ({
  agenda_id: `AGENDA-V22-${audience}`,
  audience,
  items: ['abertura', 'descoberta', 'demo', 'disclosure', 'objeções', 'proximo passo'],
  duration_minutes: 30,
}))

export const SIMULATED_PRE_MEETING_CHECKLIST: SenseTrustPreMeetingChecklist = {
  checklist_id: 'PRE-CHECK-V22',
  items: ['branch correta', 'build validado', 'prototipo funcionando', 'roteiro aberto', 'publico definido', 'material autorizado', 'sem dados reais', 'disclosure pronto'],
  all_real_data_removed: true,
  disclosures_ready: true,
}

export const SIMULATED_POST_DEMO_CHECKLIST: SenseTrustPostDemoChecklist = {
  checklist_id: 'POST-CHECK-V22',
  items: ['registrar feedback simulado', 'classificar interesse', 'classificar risco', 'definir proximo passo', 'enviar material autorizado'],
  feedback_real_collection_enabled: false,
}

export const SIMULATED_AUTHORIZED_MATERIALS: SenseTrustAuthorizedMaterial[] = Array.from({ length: 12 }, (_, index) => ({
  material_id: `MAT-AUTH-V22-${String(index + 1).padStart(2, '0')}`,
  title: ['One-page demo', 'Demo script', 'Audience briefing', 'Route map', 'Visual QA summary', 'Risk matrix', 'Disclosure sheet', 'FAQ seguro', 'Prototype link local', 'Meeting agenda', 'Follow-up template', 'Executive report'][index],
  material_type: ['one_page', 'script', 'briefing', 'map', 'qa', 'risk', 'disclosure', 'faq', 'prototype', 'agenda', 'follow_up', 'report'][index],
  audience: audiences[index % audiences.length],
  status: index % 5 === 0 ? 'internal_review' : 'approved_for_controlled_demo',
  purpose: 'Apoiar reuniao controlada com linguagem segura.',
  allowed_use: 'Uso em reuniao controlada com disclosure e apresentador treinado.',
  prohibited_use: 'Envio publico irrestrito, proposta vinculante, contrato real ou promessa clinica/juridica/financeira.',
  requires_human_review: index % 5 === 0,
  data_classification: 'metadata_only',
  clinical_data_used: false,
  simulated_only: true,
}))

export const SIMULATED_PROHIBITED_MATERIALS: SenseTrustProhibitedMaterial[] = Array.from({ length: 12 }, (_, index) => ({
  material_id: `MAT-BLOCK-V22-${String(index + 1).padStart(2, '0')}`,
  title: ['Contrato real', 'Proposta vinculante', 'Laudo real', 'Pitch de receita real', 'Claim Gov.br', 'Claim ICP-Brasil', 'CRM export', 'Lead list', 'Analytics real', 'Billing sheet', 'Assinatura legal real', 'Diagnostico certificado'][index],
  reason: 'Material proibido para demo controlada v2.2.',
  blocked_claim: 'Promessa clinica, juridica, financeira ou regulatoria indevida.',
  safe_replacement: 'Usar material metadata_only autorizado e revisado.',
}))

export const SIMULATED_FEEDBACK_MOCK: SenseTrustDemoFeedbackMock[] = Array.from({ length: 10 }, (_, index) => ({
  feedback_id: `FEEDBACK-MOCK-V22-${String(index + 1).padStart(2, '0')}`,
  prompt: ['A proposta ficou clara?', 'O que a SenseTrust certifica ficou claro?', 'O que ela nao certifica ficou claro?', 'Qual risco percebido?', 'Qual proximo passo seguro?'][index % 5],
  dimension: ['clarity', 'value', 'risk', 'objection', 'next_step'][index % 5] as SenseTrustDemoFeedbackMock['dimension'],
  simulated_response: 'Resposta simulada para calibrar reuniao, sem coleta real.',
  real_collection_enabled: false,
}))

export const SIMULATED_FOLLOW_UP_SEQUENCES: SenseTrustFollowUpSequence[] = audiences.map((audience) => ({
  sequence_id: `FOLLOW-V22-${audience}`,
  audience,
  message: 'Obrigado pela reuniao controlada. Segue material autorizado e limites de uso.',
  allowed_materials: ['one-page demo', 'disclosure sheet', 'executive report'],
  timing: '24-48h apos reuniao',
  next_step: 'Revisao humana antes de qualquer proposta, piloto ou compartilhamento externo.',
  blockers: ['sem automacao CRM', 'sem lead real', 'sem contrato vinculante'],
  automation_enabled: false,
}))

export const SIMULATED_PARTNER_DEMO_RISKS: SenseTrustPartnerDemoRisk[] = [
  risk('Interpretar demo como producao', 'high', 'institutions'),
  risk('Interpretar one-page como contrato', 'high', 'legal_partners'),
  risk('Interpretar piloto como venda ativa', 'high', 'clinics'),
  risk('Interpretar QR como diagnostico', 'critical', 'regulators'),
  risk('Interpretar assinatura como validade legal plena', 'critical', 'legal_partners'),
  risk('Interpretar Gov.br ou ICP como ativo', 'critical', 'public_sector'),
  risk('Interpretar feedback como coleta real', 'high', 'press'),
  risk('Enviar material nao revisado', 'high', 'internal_team'),
  risk('Usar pitch de investidor com prefeitura', 'medium', 'public_sector'),
  risk('Usar material publico com regulador', 'high', 'regulators'),
  risk('Declarar receita real', 'critical', 'investors'),
  risk('Prometer contrato real', 'critical', 'institutions'),
]

export const SIMULATED_HANDOFF_GOVERNANCE: SenseTrustDemoHandoffGovernance[] = [
  gov('Quem pode apresentar', 'Apresentador treinado com roteiro v2.2.', 'institutional', true),
  gov('Quem pode enviar material', 'Somente responsavel autorizado.', 'institutional', true),
  gov('Quem aprova material', 'Revisao humana por area responsavel.', 'legal', true),
  gov('Politica de gravacao', 'Gravacao apenas com aprovacao previa.', 'legal', true),
  gov('Politica de compartilhamento', 'Sem envio publico irrestrito.', 'privacy', true),
  gov('Politica de follow-up', 'Sem automacao real de CRM.', 'commercial', true),
  gov('Politica de feedback', 'Feedback real exige ferramenta aprovada futura.', 'privacy', true),
  gov('Material permitido', 'Apenas materiais metadata_only autorizados.', 'institutional', false),
  gov('Material proibido', 'Dados reais, contrato real e claims absolutos.', 'legal', true),
  gov('Revisao obrigatoria', 'Obrigatoria antes de proposta ou piloto real.', 'clinical', true),
]

export const SIMULATED_PARTNER_DEMO_READINESS_SCORE: SenseTrustPartnerDemoReadinessScore = {
  score_id: 'PARTNER-SCORE-V22',
  score: 88,
  status: 'approved_for_controlled_demo',
  blockers: 0,
  warnings: 4,
  rationale: 'Kit pronto para reunioes controladas com material autorizado e revisao humana.',
}

export const SIMULATED_PARTNER_DEMO_KIT: SenseTrustPartnerDemoKit = {
  kit_id: 'PARTNER-DEMO-KIT-V22',
  title: 'SenseTrust Partner Demo Kit v2.2',
  status: 'approved_for_controlled_demo',
  one_pager: SIMULATED_DEMO_ONE_PAGER,
  audience_briefings: SIMULATED_AUDIENCE_BRIEFINGS,
  meeting_scripts: SIMULATED_MEETING_SCRIPTS,
  meeting_agendas: SIMULATED_MEETING_AGENDAS,
}

export const SIMULATED_PARTNER_DEMO_REFERENCES = ['SenseTrust Demo Readiness v2.1', 'SenseTrust Prototype UX v2.0', 'SenseTrust Website Blueprint v1.9']

function risk(riskText: string, level: SenseTrustPartnerDemoRisk['level'], audience: SenseTrustPartnerAudienceType): SenseTrustPartnerDemoRisk {
  return { risk_id: `PDR-V22-${riskText.slice(0, 8).toUpperCase().replace(/[^A-Z]/g, '')}`, risk: riskText, level, audience, mitigation: 'Usar roteiro aprovado, disclosure e material autorizado.', related_material: 'disclosure sheet', blocks_meeting: level === 'critical' }
}

function gov(topic: string, rule: string, owner: SenseTrustDemoHandoffGovernance['owner'], approval_required: boolean): SenseTrustDemoHandoffGovernance {
  return { governance_id: `HANDOFF-V22-${topic.length}`, topic, rule, owner, approval_required }
}
