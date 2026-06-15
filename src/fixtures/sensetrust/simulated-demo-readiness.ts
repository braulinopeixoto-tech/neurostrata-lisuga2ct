import type {
  SenseTrustDemoAudience,
  SenseTrustDemoAudienceType,
  SenseTrustDemoGovernanceItem,
  SenseTrustDemoObjection,
  SenseTrustDemoReadinessScore,
  SenseTrustDemoRisk,
  SenseTrustDemoScenario,
  SenseTrustDemoScript,
  SenseTrustDemoStep,
  SenseTrustDemoTalkTrack,
  SenseTrustPresentationChecklist,
  SenseTrustVisualIssue,
  SenseTrustVisualQACheck,
} from '@/types/sensetrust/demo-readiness'

export const DEMO_READINESS_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real']
export const DEMO_READINESS_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'gateway real ativo', 'crm real ativo', 'analytics real ativo', 'lead real capturado']

const routes = ['/sensetrust-prototype-ux', '/sensetrust-public-prototype', '/', '/como-funciona', '/trust-layer', '/dnda', '/verificacao-publica', '/clinicas', '/setor-publico', '/parceiros-juridicos', '/investidores', '/pilotos-parcerias', '/faq', '/contato-demo']
const audiences: SenseTrustDemoAudienceType[] = ['clinics', 'public_sector', 'legal_partners', 'investors', 'institutions', 'press', 'regulators', 'internal_team']

export const SIMULATED_VISUAL_QA_CHECKS: SenseTrustVisualQACheck[] = Array.from({ length: 40 }, (_, index) => ({
  check_id: `VQA-V21-${String(index + 1).padStart(2, '0')}`,
  title: ['Legibilidade', 'Hierarquia visual', 'CTA claro', 'Disclosure visivel', 'Linguagem segura'][index % 5],
  area: ['visual', 'copy', 'navigation', 'disclosure', 'risk'][index % 5],
  route: routes[index % routes.length],
  status: index % 11 === 0 ? 'warning' : 'pass',
  severity: index % 11 === 0 ? 'medium' : 'low',
  finding: 'Checklist simulado confirma clareza suficiente para demo controlada.',
  recommendation: 'Reforcar que e prototipo, metadata_only e sem coleta real.',
  blocks_demo: false,
  requires_human_review: index % 7 === 0,
  simulated_only: true,
}))

export const SIMULATED_DEMO_STEPS: SenseTrustDemoStep[] = [
  step(1, 'Abertura institucional', '/', 'Posicionar NeuroStrata, VitalStrata, DNDA, BLC e SenseTrust.'),
  step(2, 'Problema documental', '/', 'Explicar documentos clinico-documentais sem trilha.'),
  step(3, 'SenseTrust como Trust Layer', '/trust-layer', 'Mostrar camada transversal de confianca.'),
  step(4, 'O que certifica', '/trust-layer', 'Integridade, proveniencia, estado e rastreabilidade.'),
  step(5, 'O que nao certifica', '/faq', 'Nao certifica verdade diagnostica absoluta.'),
  step(6, 'Home navegavel', '/sensetrust-public-prototype', 'Demonstrar experiencia visual simulada.'),
  step(7, 'Como funciona', '/como-funciona', 'Percorrer objeto, manifest, hash, commit, estado e verificacao.'),
  step(8, 'Verificacao publica segura', '/verificacao-publica', 'Mostrar token e hash parcial simulados.'),
  step(9, 'Formulario mockado', '/contato-demo', 'Mostrar envio real bloqueado.'),
  step(10, 'Jornada por audiencia', '/clinicas', 'Adaptar fala para publico presente.'),
  step(11, 'Governanca e neurodireitos', '/setor-publico', 'Reforcar LGPD, neurodireitos e revisao humana.'),
  step(12, 'Encerramento', '/pilotos-parcerias', 'Convidar para piloto controlado sem contrato real declarado.'),
]

export const SIMULATED_DEMO_SCRIPT: SenseTrustDemoScript = {
  script_id: 'DEMO-SCRIPT-V21',
  title: 'SenseTrust demo controlada v2.1',
  status: 'ready_for_internal_demo',
  steps: SIMULATED_DEMO_STEPS,
  estimated_minutes: 18,
}

export const SIMULATED_DEMO_AUDIENCES: SenseTrustDemoAudience[] = audiences.map((audience) => ({
  audience_id: `AUD-V21-${audience}`,
  audience_type: audience,
  focus: 'Clareza sobre confianca documental e limites de uso.',
  pain: 'Risco de documento sem versao, estado, evidencia e disclosure.',
  safe_promise: 'SenseTrust demonstra trilha documental verificavel em prototipo metadata_only.',
  required_disclosure: 'Nao e site publicado, nao coleta lead real e nao certifica diagnostico.',
}))

export const SIMULATED_TALK_TRACKS: SenseTrustDemoTalkTrack[] = audiences.map((audience) => ({
  track_id: `TRACK-V21-${audience}`,
  audience,
  focus: `Fala segura para ${audience}.`,
  safe_phrase: 'SenseTrust demonstra integridade, proveniencia, estado e rastreabilidade documental.',
  prohibited_phrase: 'SenseTrust certifica o diagnostico ou substitui revisao humana.',
  cta: 'Conversa controlada ou revisao institucional, sem coleta real.',
  disclosure: 'Prototipo simulado, metadata_only, sem deploy e sem lead real.',
}))

export const SIMULATED_DEMO_RISKS: SenseTrustDemoRisk[] = [
  risk('Entender prototipo como producao', 'high', 'institutions'),
  risk('Entender formulario como coleta real', 'high', 'clinics'),
  risk('Entender QR como diagnostico', 'critical', 'regulators'),
  risk('Entender assinatura como legal real', 'high', 'legal_partners'),
  risk('Entender receita como real', 'high', 'investors'),
  risk('Entender Gov.br ou ICP como ativo', 'critical', 'public_sector'),
  risk('Ausencia de disclosure', 'high', 'press'),
  risk('Promessa comercial excessiva', 'medium', 'investors'),
  risk('Extrapolacao clinica', 'critical', 'clinics'),
  risk('Uso indevido em proposta publica', 'high', 'public_sector'),
  risk('Confundir demo com backend real', 'medium', 'internal_team'),
  risk('Reutilizar material sem contexto', 'medium', 'press'),
]

export const SIMULATED_DEMO_OBJECTIONS: SenseTrustDemoObjection[] = [
  objection('Isso ja tem validade juridica?', 'Ainda exige revisao juridica especifica.'),
  objection('Isso certifica o diagnostico?', 'Nao. Certifica trilha documental e integridade de processo.'),
  objection('Isso substitui assinatura?', 'Nao substitui assinatura legal ou ICP-Brasil.'),
  objection('Isso ja esta integrado ao Gov.br?', 'Nao ha integracao Gov.br declarada nesta sprint.'),
  objection('Isso ja usa ICP-Brasil?', 'Nao ha ICP-Brasil real nesta sprint.'),
  objection('Isso ja coleta leads?', 'Nao. O formulario e mockado e bloqueado.'),
  objection('Isso ja tem clientes pagantes?', 'Nao declarar clientes ou receita real sem evidencia externa.'),
  objection('Isso ja esta pronto para prefeitura?', 'Requer revisao publica, juridica, seguranca e governanca.'),
  objection('Isso pode ser usado em BPC?', 'Qualquer uso assistencial ou juridico exige revisao especializada.'),
  objection('Isso pode ser usado com laudos reais?', 'Uso com laudos reais esta bloqueado ate governanca futura.'),
  objection('Isso tem analytics real?', 'Nao. Analytics real nao esta ativo.'),
  objection('Isso substitui medico ou perito?', 'Nao substitui julgamento clinico, medico, juridico ou regulatorio.'),
]

export const SIMULATED_PRESENTATION_CHECKLIST: SenseTrustPresentationChecklist[] = [
  checklist('before_demo', 'Ambiente local conferido.', 'Prototipo local', 'Site publicado'),
  checklist('before_demo', 'Branch e roteiro conferidos.', 'Roteiro v2.1', 'Dados reais'),
  checklist('before_demo', 'Disclosures visiveis.', 'Disclosure publico', 'Promessa legal'),
  checklist('during_demo', 'Reforcar prototipo.', 'Mockup interativo', 'Deploy real'),
  checklist('during_demo', 'Reforcar metadata_only.', 'Hash parcial simulado', 'Conteudo sensivel'),
  checklist('during_demo', 'Nao improvisar validade juridica.', 'Resposta segura', 'Assinatura legal real'),
  checklist('after_demo', 'Registrar feedback.', 'Resumo de feedback', 'CRM real'),
  checklist('after_demo', 'Classificar interesse e risco.', 'Matriz simulada', 'Contrato real'),
  checklist('after_demo', 'Enviar material autorizado.', 'Docs publicos', 'Material sensivel'),
]

export const SIMULATED_VISUAL_ISSUES: SenseTrustVisualIssue[] = Array.from({ length: 6 }, (_, index) => ({
  issue_id: `ISSUE-V21-${index + 1}`,
  route: routes[index],
  issue: 'Ajuste nao bloqueante de microcopy ou hierarquia visual.',
  severity: 'low',
  non_blocking: true,
}))

export const SIMULATED_DEMO_GOVERNANCE: SenseTrustDemoGovernanceItem[] = [
  gov('Quem pode demonstrar', 'Apresentador treinado com roteiro v2.1.', 'institutional', true),
  gov('Para quem demonstrar', 'Parceiros controlados e publico definido.', 'institutional', true),
  gov('Materiais permitidos', 'Docs e prototipo metadata_only.', 'institutional', false),
  gov('Materiais proibidos', 'Dados reais, contratos reais, claims juridicos absolutos.', 'legal', true),
  gov('Gravacao', 'Apenas com aprovacao previa.', 'legal', true),
  gov('Reuniao publica', 'Exige revisao institucional.', 'legal', true),
  gov('Investidor', 'Nao declarar receita real.', 'commercial', true),
  gov('Juridico', 'Nao declarar validade plena.', 'legal', true),
  gov('Saude publica', 'Nao declarar Gov.br ou ICP ativo.', 'privacy', true),
  gov('Uso clinico', 'Uso clinico real segue bloqueado.', 'clinical', true),
]

export const SIMULATED_DEMO_SCENARIOS: SenseTrustDemoScenario[] = audiences.map((audience) => ({
  scenario_id: `SCENARIO-V21-${audience}`,
  title: `Demo controlada para ${audience}`,
  audience,
  steps: ['abrir prototipo', 'explicar limite', 'mostrar rota relevante', 'reforcar disclosure', 'encerrar com proximo passo seguro'],
  outcome: 'Publico entende promessa permitida, limites e carater simulado.',
}))

export const SIMULATED_DEMO_READINESS_SCORE: SenseTrustDemoReadinessScore = {
  score_id: 'SCORE-V21-001',
  score: 86,
  status: 'ready_for_internal_demo',
  blockers: 0,
  warnings: SIMULATED_VISUAL_QA_CHECKS.filter((check) => check.status === 'warning').length,
  rationale: 'Pronto para demo interna controlada; demo com parceiros exige revisao humana.',
}

export const SIMULATED_DEMO_READINESS_REFERENCES = ['SenseTrust Prototype UX v2.0', 'SenseTrust Website Blueprint v1.9', 'SenseTrust Public Narrative v1.8']

function step(order: number, title: string, route: string, objective: string): SenseTrustDemoStep {
  return {
    step_id: `STEP-V21-${String(order).padStart(2, '0')}`,
    order,
    title,
    route,
    objective,
    talk_track: 'Fala segura: SenseTrust demonstra confianca documental metadata_only, sem promessa clinica, legal ou comercial indevida.',
    visual_focus: 'Disclosure visivel, CTA simulado e separacao entre implementado, simulado, planejado e pendente.',
    expected_user_understanding: 'Entender o que certifica, o que nao certifica e por que o prototipo e controlado.',
    disclosure_to_reinforce: 'Nao e producao, nao coleta lead real, nao usa analytics real e nao certifica diagnostico.',
    prohibited_claims: ['certifica diagnostico', 'substitui revisao humana', 'declara receita real', 'ativa Gov.br ou ICP-Brasil'],
    transition_to_next_step: 'Avancar mantendo metadata_only e limites explicitos.',
  }
}

function risk(riskText: string, level: SenseTrustDemoRisk['level'], affected_audience: SenseTrustDemoAudienceType): SenseTrustDemoRisk {
  return { risk_id: `RISK-V21-${riskText.slice(0, 8).toUpperCase().replace(/[^A-Z]/g, '')}`, risk: riskText, level, affected_audience, mitigation: 'Reforcar disclosure e roteiro aprovado.', disclosure: 'Demo controlada, simulated_only e metadata_only.', blocks_demo: level === 'critical' }
}

function objection(objectionText: string, safe_response: string): SenseTrustDemoObjection {
  return { objection_id: `OBJ-V21-${objectionText.length}`, objection: objectionText, safe_response, permitted_claim: 'Trilha documental e integridade de processo podem ser demonstradas como prototipo.', prohibited_claim: 'Nao prometer validade plena, diagnostico correto, receita real ou producao ativa.', next_step: 'Registrar pergunta e encaminhar para revisao humana quando aplicavel.', requires_review: true }
}

function checklist(phase: SenseTrustPresentationChecklist['phase'], requirement: string, authorized_material: string, prohibited_material: string): SenseTrustPresentationChecklist {
  return { item_id: `CHECK-V21-${phase}-${requirement.length}`, phase, requirement, authorized_material, prohibited_material, requires_human_review: phase !== 'after_demo' }
}

function gov(topic: string, rule: string, owner: SenseTrustDemoGovernanceItem['owner'], approval_required: boolean): SenseTrustDemoGovernanceItem {
  return { governance_id: `GOV-V21-${topic.length}`, topic, rule, owner, approval_required }
}
