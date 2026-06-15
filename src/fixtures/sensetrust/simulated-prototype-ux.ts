import type {
  SenseTrustPrototypeAudienceFlow,
  SenseTrustPrototypeCTA,
  SenseTrustPrototypeDemoScenario,
  SenseTrustPrototypeDisclosure,
  SenseTrustPrototypeInteraction,
  SenseTrustPrototypeMockLeadForm,
  SenseTrustPrototypeNavigationItem,
  SenseTrustPrototypePage,
  SenseTrustPrototypeRoute,
  SenseTrustPrototypeRouteType,
  SenseTrustPrototypeSection,
} from '@/types/sensetrust/prototype-ux'

export const PROTOTYPE_UX_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'cid real', 'qeeg real', 'eeg real', 'laudo real']
export const PROTOTYPE_UX_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'gateway real ativo', 'crm real ativo', 'analytics real ativo', 'lead real capturado']

const routeSpecs: Array<[string, SenseTrustPrototypeRouteType, string, string]> = [
  ['/', 'home', 'SenseTrust Prototype UX', 'Home institucional para explicar confianca documental.'],
  ['/como-funciona', 'how_it_works', 'Como funciona', 'Cinco passos do objeto documental ate verificacao publica segura.'],
  ['/trust-layer', 'trust_layer', 'Trust Layer', 'Camada transversal de integridade, versao, estado e trilha.'],
  ['/dnda', 'dnda', 'DNDA auditavel', 'DNDA como objeto documental verificavel sem dados clinicos reais.'],
  ['/verificacao-publica', 'public_verification', 'Verificacao publica demo', 'Mock seguro de token, estado e hash parcial.'],
  ['/clinicas', 'for_clinics', 'Para clinicas', 'Jornada de valor para clinicas sem uso clinico real.'],
  ['/setor-publico', 'for_public_sector', 'Para setor publico', 'Governanca documental futura com revisao institucional.'],
  ['/parceiros-juridicos', 'for_legal_partners', 'Para parceiros juridicos', 'Fronteiras de prova, auditoria e revisao legal.'],
  ['/investidores', 'for_investors', 'Para investidores', 'Tese visual sem receita, cliente ou billing real.'],
  ['/pilotos-parcerias', 'pilots_partnerships', 'Pilotos e parcerias', 'Fluxo de parceria simulado e controlado.'],
  ['/faq', 'faq', 'FAQ publico', 'Respostas seguras sobre o que certifica e nao certifica.'],
  ['/contato-demo', 'contact_mockup', 'Contato demo', 'Formulario mockado com envio real bloqueado.'],
]

export const SIMULATED_PROTOTYPE_NAVIGATION: SenseTrustPrototypeNavigationItem[] = routeSpecs.map(([route_path, route_type, label], index) => ({
  nav_id: `PROTO-NAV-${String(index + 1).padStart(2, '0')}`,
  label,
  route_path,
  route_type,
  order: index + 1,
}))

export const SIMULATED_PROTOTYPE_DISCLOSURES: SenseTrustPrototypeDisclosure[] = [
  disclosure('DISC-P20-001', 'Prototipo navegavel interno; nao e site publicado.'),
  disclosure('DISC-P20-002', 'Sem coleta real de leads, CRM real ou formulario real.'),
  disclosure('DISC-P20-003', 'Sem analytics real, billing real ou gateway real.'),
  disclosure('DISC-P20-004', 'Sem dado clinico, CPF, CID, exame, EEG, qEEG ou laudo real.'),
  disclosure('DISC-P20-005', 'Nao certifica verdade diagnostica absoluta.'),
  disclosure('DISC-P20-006', 'Nao substitui revisao clinica, juridica, fiscal, regulatoria ou institucional.'),
  disclosure('DISC-P20-007', 'Verificacao publica e demonstracao mock quando nao conectada a backend real.'),
  disclosure('DISC-P20-008', 'LGPD, neurodireitos e metadata_only permanecem obrigatorios.'),
]

export const SIMULATED_PROTOTYPE_CTAS: SenseTrustPrototypeCTA[] = Array.from({ length: 16 }, (_, index) => ({
  cta_id: `PROTO-CTA-${String(index + 1).padStart(2, '0')}`,
  label: [
    'Explorar prototipo', 'Ver como funciona', 'Abrir Trust Layer', 'Entender DNDA', 'Ver verificacao demo', 'Simular jornada clinicas',
    'Simular setor publico', 'Simular parceiro juridico', 'Simular investidor', 'Ver pilotos simulados', 'Abrir FAQ', 'Abrir contato demo',
    'Ler disclosure', 'Comparar rotas', 'Revisar claims', 'Bloquear envio real',
  ][index],
  interaction_type: index === 15 ? 'submit_mock_form_blocked' : index === 4 ? 'view_mock_verification' : 'simulate_cta',
  target_route: routeSpecs[index % routeSpecs.length][0],
  status: index === 15 ? 'blocked_for_real_submit' : 'simulated_only',
}))

export const SIMULATED_PROTOTYPE_INTERACTIONS: SenseTrustPrototypeInteraction[] = [
  interaction('INT-P20-001', 'navigate', 'Navegar rota simulada', 'Troca visual local.', true),
  interaction('INT-P20-002', 'open_modal', 'Abrir modal mock', 'Modal explicativo sem backend.', true),
  interaction('INT-P20-003', 'simulate_cta', 'Clicar CTA simulado', 'Registra apenas intencao visual.', true),
  interaction('INT-P20-004', 'open_disclosure', 'Abrir disclosure', 'Mostra limites publicos.', true),
  interaction('INT-P20-005', 'toggle_audience', 'Trocar audiencia', 'Atualiza conteudo local.', true),
  interaction('INT-P20-006', 'view_mock_verification', 'Ver verificacao demo', 'Exibe token e hash parcial simulados.', true),
  interaction('INT-P20-007', 'open_faq', 'Abrir FAQ', 'Mostra respostas seguras.', true),
  interaction('INT-P20-008', 'submit_mock_form_blocked', 'Enviar formulario real', 'Envio bloqueado.', false),
  interaction('INT-P20-009', 'submit_mock_form_blocked', 'Capturar lead real', 'Coleta real bloqueada.', false),
  interaction('INT-P20-010', 'simulate_cta', 'Ativar billing', 'Billing real bloqueado.', false),
  interaction('INT-P20-011', 'simulate_cta', 'Ativar analytics real', 'Analytics real bloqueado.', false),
  interaction('INT-P20-012', 'simulate_cta', 'Declarar producao', 'Deploy real bloqueado.', false),
]

export const SIMULATED_PROTOTYPE_SECTIONS: SenseTrustPrototypeSection[] = routeSpecs.flatMap(([, , title], routeIndex) =>
  Array.from({ length: routeIndex < 2 ? 5 : 4 }, (_, sectionIndex) => ({
    section_id: `PROTO-SEC-${String(routeIndex + 1).padStart(2, '0')}-${String(sectionIndex + 1).padStart(2, '0')}`,
    route_id: `PROTO-ROUTE-${String(routeIndex + 1).padStart(2, '0')}`,
    title: `${title} - bloco ${sectionIndex + 1}`,
    body: 'Conteudo visual simulado, institucional e metadata_only, com separacao entre implementado, simulado, planejado e pendente.',
    visual_status: sectionIndex === 0 ? 'covered' : 'mocked',
    order: sectionIndex + 1,
  })),
) // length: 50

export const SIMULATED_PROTOTYPE_PAGES: SenseTrustPrototypePage[] = routeSpecs.map(([, , title, summary], index) => ({
  page_id: `PROTO-PAGE-${String(index + 1).padStart(2, '0')}`,
  title,
  summary,
  sections: SIMULATED_PROTOTYPE_SECTIONS.filter((section) => section.route_id === `PROTO-ROUTE-${String(index + 1).padStart(2, '0')}`),
  visual_status: 'mocked',
}))

export const SIMULATED_PROTOTYPE_ROUTES: SenseTrustPrototypeRoute[] = routeSpecs.map(([route_path, route_type, title, subtitle], index) => ({
  route_id: `PROTO-ROUTE-${String(index + 1).padStart(2, '0')}`,
  route_path,
  route_type,
  title,
  subtitle,
  audience: audienceFor(route_type),
  page: SIMULATED_PROTOTYPE_PAGES[index],
  navigation_items: SIMULATED_PROTOTYPE_NAVIGATION,
  primary_cta: SIMULATED_PROTOTYPE_CTAS[index],
  secondary_cta: SIMULATED_PROTOTYPE_CTAS[(index + 1) % SIMULATED_PROTOTYPE_CTAS.length],
  disclosures: SIMULATED_PROTOTYPE_DISCLOSURES,
  allowed_interactions: SIMULATED_PROTOTYPE_INTERACTIONS.filter((item) => item.allowed),
  prohibited_interactions: SIMULATED_PROTOTYPE_INTERACTIONS.filter((item) => !item.allowed),
  publication_status: route_type === 'contact_mockup' ? 'legal_review_pending' : 'ready_for_demo',
  route_status: 'simulated_public_route',
  data_classification: 'public_metadata_only',
  public_exposure: 'metadata_only',
  clinical_data_used: false,
  real_lead_collection: false,
  real_analytics_enabled: false,
  production_deploy_claimed: false,
  simulated_only: true,
}))

export const SIMULATED_PROTOTYPE_AUDIENCE_FLOWS: SenseTrustPrototypeAudienceFlow[] = [
  flow('clinics', '/', ['/clinicas', '/como-funciona', '/verificacao-publica', '/contato-demo']),
  flow('public_sector', '/', ['/setor-publico', '/trust-layer', '/faq', '/contato-demo']),
  flow('legal_partners', '/', ['/parceiros-juridicos', '/trust-layer', '/verificacao-publica', '/faq']),
  flow('investors', '/', ['/investidores', '/pilotos-parcerias', '/faq', '/contato-demo']),
  flow('institutions', '/', ['/trust-layer', '/dnda', '/pilotos-parcerias']),
  flow('general_public', '/', ['/faq', '/verificacao-publica']),
  flow('clinics', '/dnda', ['/dnda', '/como-funciona', '/clinicas']),
  flow('investors', '/investidores', ['/investidores', '/trust-layer', '/pilotos-parcerias']),
]

export const SIMULATED_PROTOTYPE_MOCK_FORMS: SenseTrustPrototypeMockLeadForm[] = [
  form('FORM-P20-001', 'Contato demo', ['organizacao simulada', 'perfil de interesse', 'mensagem nao clinica']),
  form('FORM-P20-002', 'Piloto simulado', ['tipo de instituicao', 'objetivo do piloto', 'observacoes institucionais']),
  form('FORM-P20-003', 'Parceria simulada', ['area de parceria', 'maturidade institucional', 'canal preferido']),
]

export const SIMULATED_PROTOTYPE_DEMO_SCENARIOS: SenseTrustPrototypeDemoScenario[] = [
  scenario('Demo para clinicas', 'clinics', ['abrir home', 'selecionar clinicas', 'ver verificacao demo', 'abrir contato demo']),
  scenario('Demo setor publico', 'public_sector', ['abrir governanca', 'ver Trust Layer', 'abrir disclosure']),
  scenario('Demo parceiro juridico', 'legal_partners', ['abrir limites', 'ver claims', 'abrir FAQ']),
  scenario('Demo investidor', 'investors', ['abrir tese', 'ver sem receita real', 'abrir pilotos simulados']),
  scenario('Demo institucional geral', 'institutions', ['abrir home', 'como funciona', 'contato demo bloqueado']),
]

export const SIMULATED_PROTOTYPE_REFERENCES = ['SenseTrust Website Blueprint v1.9', 'SenseTrust Public Narrative v1.8', 'SenseTrust Investor Room v1.7']

function disclosure(disclosure_id: string, statement: string): SenseTrustPrototypeDisclosure {
  return { disclosure_id, statement, required_on_routes: routeSpecs.map(([, route_type]) => route_type) }
}

function interaction(interaction_id: string, type: SenseTrustPrototypeInteraction['type'], label: string, result: string, allowed: boolean): SenseTrustPrototypeInteraction {
  return { interaction_id, type, label, result, allowed }
}

function flow(audience: SenseTrustPrototypeAudienceFlow['audience'], entry_route: string, route_sequence: string[]): SenseTrustPrototypeAudienceFlow {
  return { flow_id: `FLOW-P20-${audience}-${route_sequence.length}`, audience, entry_route, route_sequence, intent: 'Compreender SenseTrust como experiencia visual sem dado sensivel.', blocker: 'Coleta, analytics e deploy reais permanecem bloqueados.' }
}

function form(form_id: string, title: string, fields: string[]): SenseTrustPrototypeMockLeadForm {
  return { form_id, title, fields, prohibited_fields: ['CPF', 'CID', 'diagnostico', 'laudo', 'EEG', 'qEEG', 'medicacao'], submit_interaction: 'submit_mock_form_blocked', real_submit_enabled: false, real_lead_collection: false }
}

function scenario(title: string, audience: SenseTrustPrototypeDemoScenario['audience'], steps: string[]): SenseTrustPrototypeDemoScenario {
  return { scenario_id: `SCENARIO-P20-${title.toUpperCase().replace(/[^A-Z]/g, '-')}`, title, audience, steps, expected_learning: 'Entender promessa permitida, limites publicos e carater simulado do prototipo.' }
}

function audienceFor(routeType: SenseTrustPrototypeRouteType): SenseTrustPrototypeRoute['audience'] {
  if (routeType === 'for_clinics') return ['clinics']
  if (routeType === 'for_public_sector') return ['public_sector']
  if (routeType === 'for_legal_partners') return ['legal_partners']
  if (routeType === 'for_investors') return ['investors']
  return ['institutions', 'general_public']
}
