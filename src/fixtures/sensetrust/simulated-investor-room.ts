import type {
  SenseTrustDataRoomItem,
  SenseTrustDueDiligenceItem,
  SenseTrustInvestmentUseOfFunds,
  SenseTrustInvestorFAQ,
  SenseTrustPitchDeckSection,
  SenseTrustRiskDisclosure,
  SenseTrustStrategicMoat,
  SenseTrustStrategicPartner,
  SenseTrustTractionSignal,
} from '@/types/sensetrust/investor-room'

export const INVESTOR_ROOM_SENSITIVE_DENYLIST = ['patient', 'paciente', 'cpf', 'cid', 'diagnostico', 'diagnóstico', 'clinical_report', 'laudo', 'anamnese', 'eeg', 'qeeg', 'medicacao', 'medicação']
export const INVESTOR_ROOM_REAL_CLAIM_DENYLIST = ['real revenue booked', 'faturamento real confirmado', 'billing real ativo', 'contrato real assinado', 'icp-brasil integrado', 'gov.br integrado']

export const SIMULATED_DATA_ROOM_ITEMS: SenseTrustDataRoomItem[] = [
  item('DR-001', 'data_room', 'Product architecture index', 'implemented', 'controlled_access', 'Mapa tecnico da camada SenseTrust e dependencias.'),
  item('DR-002', 'data_room', 'Evidence and certificate trail', 'implemented', 'controlled_access', 'Trilha de integridade, certificados e verificacao publica segura.'),
  item('DR-003', 'data_room', 'Pilot CRM summary', 'simulated', 'controlled_access', 'Pipeline v1.3 com organizacoes simuladas.'),
  item('DR-004', 'data_room', 'Feedback intelligence summary', 'simulated', 'controlled_access', 'Metricas v1.4 de aceite e valor percebido simuladas.'),
  item('DR-005', 'data_room', 'Pricing strategy summary', 'simulated', 'internal_review', 'Hipoteses comerciais v1.5 sem faturamento real.'),
  item('DR-006', 'data_room', 'Revenue operations readiness', 'simulated', 'internal_review', 'Readiness v1.6 sem billing real.'),
  item('DR-007', 'due_diligence', 'Risk disclosure matrix', 'draft_ready', 'controlled_access', 'Riscos de produto, juridico, fiscal e governanca.'),
  item('DR-008', 'institutional_relations', 'Institutional alliance narrative', 'draft_ready', 'public_safe', 'Narrativa para parceiros institucionais.'),
  item('DR-009', 'pitch_deck', 'Pitch deck textual', 'draft_ready', 'public_safe', 'Pitch textual para revisao executiva.'),
  item('DR-010', 'fundraising_readiness', 'Use of funds model', 'simulated', 'internal_review', 'Uso de recursos simulado para planejamento.'),
]

export const SIMULATED_PITCH_DECK_SECTIONS: SenseTrustPitchDeckSection[] = [
  deck(1, 'Problema', 'Relatorios e documentos sensiveis precisam de integridade, versao, revogacao e verificacao segura.'),
  deck(2, 'Oportunidade', 'Trust infrastructure para saude, educacao, pesquisa e governanca documental auditavel.'),
  deck(3, 'Solucao SenseTrust', 'Camada transversal de rastreabilidade, certificacao de processo e verificacao publica segura.'),
  deck(4, 'Relacao NeuroStrata / VitalStrata / DNDA / BLC', 'SenseTrust sustenta trilhas auditaveis sem certificar verdade diagnostica absoluta.'),
  deck(5, 'Trust Layer', 'Hash, estado documental, versao, evidencia, certificado e portal publico metadata_only.'),
  deck(6, 'Produto', 'MVP modular com console, CRM piloto, feedback intelligence, pricing e revenue ops readiness.'),
  deck(7, 'Demonstracao end-to-end', 'Fluxo simulado de evidencia, documento, certificado, verificacao e governanca.'),
  deck(8, 'Pilotos fechados', 'Pilotos e organizacoes sao simulados para demonstracao e validacao de processo.'),
  deck(9, 'Pricing e Revenue Ops', 'Planos, receita e ledger sao hipoteses simuladas, sem billing real.'),
  deck(10, 'Mercado inicial', 'Clinicas, redes, equipes multiprofissionais, pesquisa e parceiros institucionais.'),
  deck(11, 'Moat', 'Arquitetura de confianca, memoria Obsidian, trilha auditavel e governanca LGPD/neurodireitos.'),
  deck(12, 'Roadmap', 'RLS forte, portal publico, contratos revisados, pilotos controlados e compliance.'),
]

export const SIMULATED_STRATEGIC_PARTNERS: SenseTrustStrategicPartner[] = [
  partner('PARTNER-001', 'clinic_network', 'Rede de clinicas especializadas', 'Pilotos fechados e validacao de workflow.'),
  partner('PARTNER-002', 'legal_advisory', 'Escritorio juridico/regulatorio', 'Revisao de fronteiras, contratos e disclaimers.'),
  partner('PARTNER-003', 'research_institution', 'Instituicao de pesquisa', 'Governanca documental e neurodireitos.'),
  partner('PARTNER-004', 'healthtech_platform', 'Plataforma SaaS de saude', 'Integracao futura metadata_only e trust layer.'),
  partner('PARTNER-005', 'public_innovation_lab', 'Laboratorio publico de inovacao', 'Discussao futura sem Gov.br integrado.'),
]

export const SIMULATED_INVESTOR_FAQ: SenseTrustInvestorFAQ[] = Array.from({ length: 20 }, (_, index) => ({
  question_id: `FAQ-INV-SIM-${String(index + 1).padStart(3, '0')}`,
  question: [
    'O que a SenseTrust certifica?',
    'A plataforma certifica diagnostico?',
    'Existe faturamento real?',
    'Existe billing real?',
    'Ha contratos assinados?',
    'Como a LGPD e tratada?',
    'O que e metadata_only?',
    'Qual o papel do Obsidian?',
    'Qual o papel do Supabase?',
    'Qual o papel do GitHub?',
    'Como se conecta ao DNDA?',
    'Como se conecta ao VitalStrata?',
    'Existe Gov.br integrado?',
    'Existe ICP-Brasil integrado?',
    'Qual o mercado inicial?',
    'Qual o moat?',
    'Quais riscos principais?',
    'Qual o uso de recursos?',
    'O que esta implementado?',
    'O que esta pendente?',
  ][index],
  answer: 'Resposta controlada: separar implementado, simulado, planejado e pendente; sem dado clinico real, sem receita real e sem promessa diagnostica absoluta.',
  disclosure_level: index < 15 ? 'public_safe' : 'controlled_access',
}))

export const SIMULATED_DUE_DILIGENCE_ITEMS: SenseTrustDueDiligenceItem[] = [
  dd('DD-001', 'data_room', 'Arquitetura e repositorio', 'ready', 'Product'),
  dd('DD-002', 'pitch_deck', 'Pitch deck textual', 'draft', 'Strategy'),
  dd('DD-003', 'due_diligence', 'LGPD e neurodireitos', 'pending', 'Legal'),
  dd('DD-004', 'fundraising_readiness', 'Use of funds', 'draft', 'Finance'),
  dd('DD-005', 'strategic_partnership', 'Mapa de parceiros', 'draft', 'Partnerships'),
  dd('DD-006', 'institutional_relations', 'Narrativa institucional', 'draft', 'Institutional'),
  dd('DD-007', 'due_diligence', 'Riscos e disclaimers', 'pending', 'Legal'),
  dd('DD-008', 'data_room', 'Evidencias de build/teste', 'ready', 'Engineering'),
]

export const SIMULATED_TRACTION_SIGNALS: SenseTrustTractionSignal[] = [
  { signal_id: 'TRAC-SIM-001', label: 'MVP tecnico modular', evidence_type: 'implemented', summary: 'Camadas v0.5 a v1.6 estruturadas e testadas.' },
  { signal_id: 'TRAC-SIM-002', label: 'Pilotos simulados', evidence_type: 'simulated', summary: 'Cinco organizacoes simuladas usadas para demonstracao.' },
  { signal_id: 'TRAC-SIM-003', label: 'Revenue ops readiness', evidence_type: 'documented', summary: 'Readiness simulado sem billing real.' },
]

export const SIMULATED_USE_OF_FUNDS: SenseTrustInvestmentUseOfFunds[] = [
  { bucket_id: 'FUNDS-SIM-001', bucket: 'produto e engenharia', allocation_percent_simulated: 35, purpose: 'Hardening, testes, seguranca e experiencia operacional.', simulated_only: true },
  { bucket_id: 'FUNDS-SIM-002', bucket: 'compliance e juridico', allocation_percent_simulated: 20, purpose: 'Revisoes LGPD, neurodireitos, contratos e riscos.', simulated_only: true },
  { bucket_id: 'FUNDS-SIM-003', bucket: 'pilotos controlados', allocation_percent_simulated: 25, purpose: 'Execucao de pilotos fechados e validacao institucional.', simulated_only: true },
  { bucket_id: 'FUNDS-SIM-004', bucket: 'go-to-market', allocation_percent_simulated: 20, purpose: 'Materiais, parcerias e vendas consultivas.', simulated_only: true },
]

export const SIMULATED_MOAT: SenseTrustStrategicMoat[] = [
  { moat_id: 'MOAT-SIM-001', label: 'Trust process layer', description: 'Certifica processo, integridade, versionamento e verificabilidade.' },
  { moat_id: 'MOAT-SIM-002', label: 'Clinical boundary discipline', description: 'Nao promete verdade diagnostica absoluta e preserva revisao humana.' },
  { moat_id: 'MOAT-SIM-003', label: 'Obsidian memory graph', description: 'Memoria conceitual versionada e rastreavel.' },
]

export const SIMULATED_RISK_DISCLOSURES: SenseTrustRiskDisclosure[] = [
  { risk_id: 'RISK-INV-SIM-001', risk: 'Confusao com certificacao diagnostica', disclosure: 'SenseTrust nao certifica verdade diagnostica absoluta.', mitigation: 'Disclaimers e revisao juridica.', level: 'critical' },
  { risk_id: 'RISK-INV-SIM-002', risk: 'Receita simulada interpretada como real', disclosure: 'Nao ha faturamento real declarado.', mitigation: 'Separar simulado e implementado.', level: 'high' },
  { risk_id: 'RISK-INV-SIM-003', risk: 'Gov.br ou ICP-Brasil inferidos', disclosure: 'Nao estao integrados.', mitigation: 'Roadmap e revisao futura.', level: 'high' },
]

function item(item_id: string, area: SenseTrustDataRoomItem['area'], title: string, status: SenseTrustDataRoomItem['status'], sensitivity: SenseTrustDataRoomItem['sensitivity'], summary: string): SenseTrustDataRoomItem {
  return { item_id, area, title, status, sensitivity, summary }
}

function deck(order: number, title: string, narrative: string): SenseTrustPitchDeckSection {
  return { section_id: `DECK-SIM-${String(order).padStart(2, '0')}`, order, title, narrative, status: 'draft' }
}

function partner(partner_id: string, segment: string, profile: string, value_exchange: string): SenseTrustStrategicPartner {
  return { partner_id, segment, profile, partnership_track: { track_id: `TRACK-${partner_id}`, label: 'strategic_partnership', objective: value_exchange, required_review: ['legal', 'privacy', 'commercial'] }, value_exchange, status: 'mapped' }
}

function dd(item_id: string, category: SenseTrustDueDiligenceItem['category'], title: string, readiness: SenseTrustDueDiligenceItem['readiness'], owner: string): SenseTrustDueDiligenceItem {
  return { item_id, category, title, readiness, owner, note: 'Item controlado para data room v1.7.' }
}
