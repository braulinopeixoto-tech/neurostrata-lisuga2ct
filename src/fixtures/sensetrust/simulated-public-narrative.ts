import type {
  SenseTrustAudienceMessage,
  SenseTrustAuthorityPillar,
  SenseTrustInstitutionalThesis,
  SenseTrustManifesto,
  SenseTrustPartnerMessage,
  SenseTrustPermittedClaim,
  SenseTrustPressMessage,
  SenseTrustProhibitedClaim,
  SenseTrustPublicFAQ,
  SenseTrustPublicRiskDisclosure,
  SenseTrustRegulatorySafeLanguage,
  SenseTrustWebsiteCopyBlock,
  SenseTrustInvestorPublicMessage,
} from '@/types/sensetrust/public-narrative'

export const PUBLIC_NARRATIVE_SENSITIVE_DENYLIST = ['patient', 'paciente', 'cpf', 'cid', 'diagnostico', 'diagnóstico', 'clinical_report', 'laudo', 'anamnese', 'eeg', 'qeeg', 'medicacao', 'medicação']
export const PUBLIC_NARRATIVE_REAL_CLAIM_DENYLIST = ['real revenue booked', 'faturamento real confirmado', 'billing real ativo', 'contrato real assinado', 'gov.br integrado', 'icp-brasil integrado']

export const SIMULATED_MANIFESTO: SenseTrustManifesto = {
  manifesto_id: 'MANIFESTO-SIM-V18',
  title: 'Manifesto SenseTrust',
  thesis: 'A proxima geracao de documentos clinicos e institucionais sera definida por integridade, proveniencia, estado, rastreabilidade e verificacao publica segura.',
  authority_phrase: 'Confianca documental precisa ser auditavel antes de ser escalavel.',
  permitted_promise: 'SenseTrust certifica integridade, proveniencia, rastreabilidade, estado documental e verificabilidade publica segura de objetos documentais.',
  public_limit: 'SenseTrust nao certifica verdade diagnostica absoluta e nao substitui revisao humana.',
  sections: ['documentos sem trilha', 'crise da confianca documental', 'conteudo nao e prova', 'camada de confianca', 'DNDA', 'BLC', 'Trust Layer', 'metadata_only', 'neurodireitos', 'promessa permitida', 'promessa proibida', 'chamada institucional'],
}

export const SIMULATED_PUBLIC_THESIS: SenseTrustInstitutionalThesis = {
  thesis_id: 'THESIS-SIM-V18',
  title: 'Documento como objeto verificavel',
  thesis: 'Documentos institucionais precisam ser tratados como objetos verificaveis, com estado, versao, integridade e governanca.',
  supporting_points: ['metadata_only protege exposicao publica', 'Trust Layer cria infraestrutura', 'DNDA e objeto documental auditavel', 'BLC preserva cadeia logica', 'governanca limita promessas indevidas'],
}

const permittedPhrase = SIMULATED_MANIFESTO.permitted_promise
const prohibited = ['certificar diagnostico correto', 'substituir assinatura legal', 'substituir validacao medica', 'declarar Gov.br integrado']

export const SIMULATED_WEBSITE_COPY: SenseTrustWebsiteCopyBlock[] = [
  block('WEB-HERO', 'Hero section', 'A camada de confianca para documentos verificaveis.', 'Integridade, proveniencia, rastreabilidade e verificacao publica segura.', 'Conversar sobre parceria'),
  block('WEB-PROBLEM', 'Problema', 'Documentos sem trilha fragilizam confianca.', 'Sem versao, estado e evidencia, processos ficam opacos.', 'Entender o problema'),
  block('WEB-SOLUTION', 'Solucao', 'SenseTrust cria uma Trust Layer documental.', 'A camada certifica processo e integridade, nao verdade diagnostica absoluta.', 'Ver a solucao'),
  block('WEB-HOW', 'Como funciona', 'Objetos documentais recebem hash, estado, evidencia e verificacao.', 'A rota publica preserva metadata_only.', 'Explorar fluxo'),
  block('WEB-WHO', 'Para quem e', 'Clinicas, equipes, instituicoes, parceiros juridicos e pesquisadores.', 'Uso controlado e revisado antes de producao.', 'Mapear fit'),
  block('WEB-CERTIFIES', 'O que certifica', 'Integridade documental e verificabilidade publica segura.', 'Nao valida conteudo clinico como verdade absoluta.', 'Ler claims'),
  block('WEB-NOT', 'O que nao certifica', 'Nao certifica diagnostico correto.', 'Nao substitui assinatura, medico, jurista ou regulador.', 'Ver limites'),
  block('WEB-CTA', 'Chamada para parceria/piloto', 'Parcerias institucionais e pilotos controlados.', 'Sem receita real declarada, sem billing real e sem contratos reais nesta narrativa.', 'Solicitar conversa'),
]

export const SIMULATED_PERMITTED_CLAIMS: SenseTrustPermittedClaim[] = Array.from({ length: 12 }, (_, index) => ({
  claim_id: `CLAIM-PERMIT-SIM-${String(index + 1).padStart(2, '0')}`,
  claim: [
    permittedPhrase,
    'SenseTrust organiza trilhas auditaveis de processo documental.',
    'SenseTrust preserva verificacao publica com metadata_only.',
    'SenseTrust separa estado documental de conteudo sensivel.',
    'SenseTrust apoia governanca LGPD e neurodireitos.',
    'SenseTrust registra limites entre implementado, simulado, planejado e pendente.',
    'SenseTrust pode apoiar pilotos fechados controlados.',
    'SenseTrust oferece narrativa institucional prudente.',
    'SenseTrust conecta NeuroStrata, VitalStrata, DNDA e BLC.',
    'SenseTrust documenta claims permitidos e proibidos.',
    'SenseTrust usa linguagem publica revisavel.',
    'SenseTrust apoia confianca sem hype regulatorio.',
  ][index],
  status: 'permitted',
  channel: 'website',
}))

export const SIMULATED_PROHIBITED_CLAIMS: SenseTrustProhibitedClaim[] = Array.from({ length: 12 }, (_, index) => ({
  claim_id: `CLAIM-BLOCK-SIM-${String(index + 1).padStart(2, '0')}`,
  claim: [
    'SenseTrust certifica que o diagnostico esta correto.',
    'SenseTrust substitui assinatura legal.',
    'SenseTrust substitui validacao medica.',
    'SenseTrust ja esta integrado ao Gov.br.',
    'SenseTrust ja possui billing real.',
    'SenseTrust garante validade juridica plena.',
    'SenseTrust usa ICP-Brasil real.',
    'SenseTrust declara receita real.',
    'SenseTrust possui contratos reais assinados.',
    'SenseTrust substitui revisao regulatoria.',
    'SenseTrust dispensa governanca LGPD.',
    'SenseTrust publica dado clinico real.',
  ][index],
  status: 'prohibited',
  safe_replacement: permittedPhrase,
}))

export const SIMULATED_AUDIENCE_MESSAGES: SenseTrustAudienceMessage[] = [
  audience('clinics', 'trilha documental fraca', 'confianca documental auditavel', 'piloto controlado'),
  audience('professionals', 'risco de versao e prova', 'documento verificavel sem expor conteudo sensivel', 'conversa tecnica'),
  audience('public_sector', 'governanca e transparencia', 'metadata_only e revisao institucional', 'avaliacao futura'),
  audience('legal_partners', 'fronteiras juridicas', 'claims revisaveis e disclaimers', 'legal review'),
  audience('investors', 'categoria emergente', 'trust infrastructure com disciplina regulatoria', 'data room'),
  audience('institutional_partners', 'parcerias responsaveis', 'camada de confianca e governanca', 'aliança institucional'),
  audience('press', 'linguagem clara', 'documentos verificaveis sem promessa clinica', 'press kit'),
  audience('regulators', 'risco de promessa indevida', 'transparencia de limites e metadata_only', 'revisao regulatoria'),
]

export const SIMULATED_PUBLIC_FAQ: SenseTrustPublicFAQ[] = Array.from({ length: 20 }, (_, index) => ({
  faq_id: `FAQ-PUBLIC-SIM-${String(index + 1).padStart(2, '0')}`,
  question: [
    'O que e a SenseTrust?',
    'O que ela certifica?',
    'Ela certifica diagnostico?',
    'Ela substitui assinatura digital?',
    'Ela expoe dados clinicos?',
    'O que e metadata_only?',
    'O que e DNDA?',
    'O que e BLC?',
    'O que e Trust Layer?',
    'Ela tem validade juridica?',
    'Ela ja usa ICP-Brasil?',
    'Ela ja usa Gov.br?',
    'Ela ja tem billing real?',
    'Para quem e?',
    'Como participar de piloto fechado?',
    'Como funciona a verificacao publica?',
    'O que esta implementado?',
    'O que e simulado?',
    'O que esta planejado?',
    'O que exige revisao?',
  ][index],
  answer: 'Resposta segura: SenseTrust comunica integridade documental, metadata_only, limites publicos e revisao humana obrigatoria.',
  claim_status: index < 2 ? 'permitted' : 'requires_review',
  disclaimer: 'Nao certifica verdade diagnostica absoluta, nao declara receita real e nao ativa billing real.',
}))

export const SIMULATED_AUTHORITY_PILLARS: SenseTrustAuthorityPillar[] = [
  pillar('NeuroStrata como matriz clinica-documental'),
  pillar('VitalStrata como expansao SaaS'),
  pillar('DNDA como objeto auditavel'),
  pillar('BLC como cadeia logica'),
  pillar('SenseTrust como Trust Layer'),
  pillar('metadata_only, neurodireitos e governanca SaaS'),
]

export const SIMULATED_RISK_DISCLOSURES: SenseTrustPublicRiskDisclosure[] = [
  { disclosure_id: 'DISC-SIM-001', category: 'implemented', statement: 'Artefatos tecnicos, docs e testes locais existem.' },
  { disclosure_id: 'DISC-SIM-002', category: 'simulated', statement: 'Pilotos, receita, pricing e use of funds sao simulados.' },
  { disclosure_id: 'DISC-SIM-003', category: 'planned', statement: 'Publicacao real e roadmap futuro.' },
  { disclosure_id: 'DISC-SIM-004', category: 'pending_review', statement: 'Claims publicos exigem revisao juridica/regulatoria.' },
  { disclosure_id: 'DISC-SIM-005', category: 'not_implemented', statement: 'Gov.br, ICP-Brasil, billing e gateway real nao implementados.' },
  { disclosure_id: 'DISC-SIM-006', category: 'prohibited_to_promise', statement: 'Nao prometer certificacao diagnostica absoluta.' },
]

export const SIMULATED_SAFE_LANGUAGE: SenseTrustRegulatorySafeLanguage[] = SIMULATED_PERMITTED_CLAIMS.slice(0, 6).map((claim, index) => ({ language_id: `SAFE-LANG-${index + 1}`, phrase: claim.claim, status: 'permitted', note: 'Uso publico permitido com revisao.' }))
export const SIMULATED_PRESS_MESSAGES: SenseTrustPressMessage[] = Array.from({ length: 5 }, (_, index) => ({ message_id: `PRESS-SIM-${index + 1}`, headline: 'SenseTrust apresenta narrativa de confianca documental', body: 'Camada institucional para integridade, proveniencia e verificacao segura.', avoid: prohibited }))
export const SIMULATED_PARTNER_MESSAGES: SenseTrustPartnerMessage[] = Array.from({ length: 5 }, (_, index) => ({ message_id: `PARTNER-MSG-SIM-${index + 1}`, partner_type: ['clinicas', 'juridico', 'pesquisa', 'saas', 'setor publico'][index], message: 'Parceria controlada para governanca documental metadata_only.', required_review: ['legal', 'privacy', 'institutional'] }))
export const SIMULATED_INVESTOR_PUBLIC_MESSAGES: SenseTrustInvestorPublicMessage[] = Array.from({ length: 5 }, (_, index) => ({ message_id: `INV-PUB-SIM-${index + 1}`, message: 'Tese publica de trust infrastructure sem declarar receita real.', disclosure: 'Material publico revisavel; data room controlado para detalhes.' }))

function block(block_id: string, title: string, subtitle: string, body: string, call_to_action: string): SenseTrustWebsiteCopyBlock {
  return { block_id, channel: 'website', audience: 'institutional_partners', title, subtitle, body, call_to_action, permitted_claims: [permittedPhrase], prohibited_claims: prohibited, risk_disclosure: 'Revisao juridica e regulatoria obrigatoria antes de publicacao.', data_classification: 'public_narrative_metadata', public_exposure: 'metadata_only', clinical_data_used: false, real_revenue_claimed: false, real_billing_claimed: false, simulated_only: true }
}

function audience(audience: SenseTrustAudienceMessage['audience'], pain: string, central_message: string, call_to_action: string): SenseTrustAudienceMessage {
  return { message_id: `AUD-${audience}`, audience, pain, central_message, permitted_promise: permittedPhrase, limit: 'Nao substitui julgamento clinico, juridico ou regulatorio.', call_to_action }
}

function pillar(title: string): SenseTrustAuthorityPillar {
  return { pillar_id: `PILLAR-${title.slice(0, 8).toUpperCase().replace(/[^A-Z]/g, '')}`, title, description: 'Pilar institucional da narrativa publica SenseTrust.' }
}
