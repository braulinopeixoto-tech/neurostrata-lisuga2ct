import type {
  SenseTrustAnalyticsBlueprint,
  SenseTrustAudienceJourney,
  SenseTrustClaimGuardrail,
  SenseTrustConversionPath,
  SenseTrustFormBlueprint,
  SenseTrustNavigationItem,
  SenseTrustSEOBlock,
  SenseTrustWebsiteCTA,
  SenseTrustWebsitePage,
  SenseTrustWebsitePageType,
  SenseTrustWebsitePublicationChecklistItem,
  SenseTrustWebsiteRiskDisclosure,
  SenseTrustWebsiteSection,
} from '@/types/sensetrust/website-blueprint'

export const WEBSITE_BLUEPRINT_SENSITIVE_DENYLIST = ['patient_name', 'patient_cpf', 'clinical_payload', 'document_full_text', 'cpf real', 'laudo real', 'anamnesis real', 'qeeg real']
export const WEBSITE_BLUEPRINT_REAL_CLAIM_DENYLIST = ['real revenue booked', 'billing real ativo', 'contrato real assinado', 'lead real capturado', 'production deploy live']

const guardrailIds = ['WG-001', 'WG-002', 'WG-003']

export const SIMULATED_WEBSITE_GUARDRAILS: SenseTrustClaimGuardrail[] = [
  guardrail('WG-001', 'Certifica verdade diagnostica absoluta.', 'Certifica integridade, estado, versao e verificabilidade de processo documental.', 'clinical'),
  guardrail('WG-002', 'Substitui revisao medica ou juridica.', 'Apoia revisao humana e governanca institucional.', 'legal'),
  guardrail('WG-003', 'Opera com dados clinicos reais no site publico.', 'Site publico usa apenas metadata_only e linguagem institucional.', 'privacy'),
  guardrail('WG-004', 'Gateway, billing ou cobranca real ativos.', 'Billing e contratos comerciais permanecem pendentes ate readiness especifica.', 'institutional'),
  guardrail('WG-005', 'Pilotos reais fechados ou receita real declarada.', 'Materiais de piloto sao simulados ou blueprint ate confirmacao externa.', 'institutional'),
  guardrail('WG-006', 'Deploy publico de producao ja realizado.', 'Blueprint de site aprovado para mockup, nao para publicacao real.', 'institutional'),
  guardrail('WG-007', 'Validade legal plena garantida.', 'Qualquer uso juridico exige revisao especializada.', 'legal'),
  guardrail('WG-008', 'Coleta de leads real ativa.', 'Formularios sao blueprint_only e sem coleta real.', 'privacy'),
  guardrail('WG-009', 'Integracao Gov.br ou ICP-Brasil real.', 'Integracoes governamentais ou certificadoras seguem nao implementadas.', 'legal'),
  guardrail('WG-010', 'Resultados clinicos garantidos.', 'SenseTrust trata trilha documental, nao resultado clinico.', 'clinical'),
  guardrail('WG-011', 'Uso assistencial real liberado.', 'Uso clinico real segue bloqueado ate governanca, RLS e revisoes finais.', 'clinical'),
  guardrail('WG-012', 'Captura analytics identificavel.', 'Analytics planejado deve ser anonimo e metadata_only.', 'privacy'),
]

const pageSpecs: Array<[string, SenseTrustWebsitePageType, string, string]> = [
  ['/', 'home', 'SenseTrust', 'Converter interesse institucional em conversa qualificada sem prometer producao.'],
  ['/problema', 'problem', 'O problema da confianca documental', 'Explicar lacunas de versao, estado, evidencia e verificabilidade.'],
  ['/solucao', 'solution', 'Trust Layer para documentos verificaveis', 'Apresentar camada de integridade documental com limites publicos.'],
  ['/como-funciona', 'how_it_works', 'Como funciona', 'Mostrar fluxo metadata_only de hash, estado, evidencia e verificacao.'],
  ['/dnda', 'dnda', 'DNDA como objeto auditavel', 'Contextualizar DNDA sem expor dado clinico real.'],
  ['/sensetrust', 'sensetrust', 'SenseTrust Layer', 'Detalhar integridade, estado, cadeia e certificado publico seguro.'],
  ['/pilotos', 'pilots', 'Pilotos controlados', 'Descrever pilotos como blueprint e simulacao, sem contrato real.'],
  ['/parcerias', 'partners', 'Parcerias institucionais', 'Abrir dialogo com clinicas, setor publico e parceiros juridicos.'],
  ['/investidores', 'investors', 'Tese institucional para investidores', 'Conectar narrativa v1.8, investor room v1.7 e revenue ops v1.6.'],
  ['/faq', 'faq', 'Perguntas frequentes', 'Reduzir risco de interpretacao indevida com respostas seguras.'],
  ['/contato', 'contact', 'Contato institucional', 'Especificar formulario blueprint_only sem coleta real.'],
  ['/termos', 'legal', 'Limites publicos e termos', 'Centralizar disclaimers de privacidade, claims e nao producao.'],
]

export const SIMULATED_SEO_BLOCKS: SenseTrustSEOBlock[] = pageSpecs.map(([slug, pageType, title], index) => ({
  seo_id: `SEO-WEB-V19-${String(index + 1).padStart(2, '0')}`,
  title: `${title} | SenseTrust`,
  description: 'Blueprint publico metadata_only para confianca documental, integridade, rastreabilidade e verificacao segura.',
  keywords: ['SenseTrust', 'trust layer', 'DNDA', 'metadata_only', 'integridade documental'],
  safe_language_notes: ['Nao prometer verdade diagnostica absoluta.', 'Nao declarar deploy de producao.', 'Nao declarar lead real, billing real ou receita real.'],
}))

export const SIMULATED_WEBSITE_SECTIONS: SenseTrustWebsiteSection[] = pageSpecs.flatMap(([slug, , title], pageIndex) =>
  ['hero', 'problem', 'trust', 'cta'].map((type, sectionIndex) => ({
    section_id: `WEB-SECTION-V19-${String(pageIndex + 1).padStart(2, '0')}-${String(sectionIndex + 1).padStart(2, '0')}`,
    page_id: `WEB-PAGE-V19-${String(pageIndex + 1).padStart(2, '0')}`,
    type: type as SenseTrustWebsiteSection['type'],
    heading: sectionIndex === 0 ? title : `${title}: bloco ${sectionIndex + 1}`,
    body: 'Conteudo publico seguro, institucional e metadata_only, com separacao clara entre implementado, simulado, planejado e pendente.',
    claim_guardrail_ids: guardrailIds,
    order: sectionIndex + 1,
  })),
) // length: 48

export const SIMULATED_WEBSITE_CTAS: SenseTrustWebsiteCTA[] = [
  cta('CTA-W19-001', 'Agendar conversa institucional', 'schedule_conversation', '/contato', 'institutions'),
  cta('CTA-W19-002', 'Solicitar informacoes de piloto', 'request_pilot_info', '/pilotos', 'clinics'),
  cta('CTA-W19-003', 'Abrir dialogo de parceria', 'open_partnership_dialog', '/parcerias', 'legal_partners'),
  cta('CTA-W19-004', 'Baixar brief publico', 'download_public_brief', '/sensetrust', 'investors'),
  cta('CTA-W19-005', 'Revisar claims seguros', 'review_safe_claims', '/termos', 'public_sector'),
  cta('CTA-W19-006', 'Ver conceito de verificacao', 'view_verification_concept', '/como-funciona', 'research_partners'),
  cta('CTA-W19-007', 'Explorar DNDA auditavel', 'download_public_brief', '/dnda', 'clinics'),
  cta('CTA-W19-008', 'Conhecer limites publicos', 'review_safe_claims', '/faq', 'patients_families_public'),
  cta('CTA-W19-009', 'Ver tese institucional', 'download_public_brief', '/investidores', 'investors'),
  cta('CTA-W19-010', 'Mapear parceria publica', 'open_partnership_dialog', '/parcerias', 'public_sector'),
  cta('CTA-W19-011', 'Avaliar piloto fechado', 'request_pilot_info', '/pilotos', 'institutions'),
  cta('CTA-W19-012', 'Solicitar revisao de narrativa', 'review_safe_claims', '/contato', 'legal_partners'),
]

export const SIMULATED_WEBSITE_PAGES: SenseTrustWebsitePage[] = pageSpecs.map(([slug, pageType, title, primaryGoal], index) => ({
  page_id: `WEB-PAGE-V19-${String(index + 1).padStart(2, '0')}`,
  slug,
  title,
  page_type: pageType,
  audience: ['institutions', 'clinics', 'investors'],
  primary_goal: primaryGoal,
  safe_positioning: 'Blueprint institucional metadata_only; nao e deploy de producao nem coleta real.',
  sections: SIMULATED_WEBSITE_SECTIONS.filter((section) => section.page_id === `WEB-PAGE-V19-${String(index + 1).padStart(2, '0')}`),
  ctas: SIMULATED_WEBSITE_CTAS.slice(index % 6, (index % 6) + 2),
  seo: SIMULATED_SEO_BLOCKS[index],
  publication_status: 'approved_for_mockup',
  data_classification: 'public_metadata_only',
  clinical_data_used: false,
  production_deploy_claimed: false,
  real_lead_collection_claimed: false,
}))

export const SIMULATED_AUDIENCE_JOURNEYS: SenseTrustAudienceJourney[] = [
  journey('clinics', '/', ['/problema', '/solucao', '/pilotos'], 'avaliar piloto controlado'),
  journey('institutions', '/', ['/como-funciona', '/parcerias', '/contato'], 'abrir conversa institucional'),
  journey('investors', '/investidores', ['/sensetrust', '/termos', '/contato'], 'entender tese sem claims financeiros reais'),
  journey('legal_partners', '/termos', ['/sensetrust', '/faq', '/contato'], 'revisar claims e limites'),
  journey('public_sector', '/parcerias', ['/como-funciona', '/termos', '/contato'], 'avaliar governanca publica futura'),
  journey('research_partners', '/dnda', ['/sensetrust', '/como-funciona', '/parcerias'], 'entender objeto auditavel'),
  journey('patients_families_public', '/faq', ['/termos', '/sensetrust'], 'receber resposta publica sem dado sensivel'),
  journey('institutions', '/problema', ['/solucao', '/sensetrust', '/pilotos'], 'comparar riscos e limites'),
]

export const SIMULATED_CONVERSION_PATHS: SenseTrustConversionPath[] = Array.from({ length: 6 }, (_, index) => ({
  path_id: `CONV-W19-${String(index + 1).padStart(2, '0')}`,
  name: ['Institucional', 'Clinicas', 'Investidores', 'Legal', 'Setor publico', 'Pesquisa'][index],
  pages: SIMULATED_AUDIENCE_JOURNEYS[index].recommended_path,
  cta_ids: SIMULATED_WEBSITE_CTAS.slice(index, index + 2).map((ctaItem) => ctaItem.cta_id),
  conversion_status: 'simulated_only',
}))

export const SIMULATED_NAVIGATION_ITEMS: SenseTrustNavigationItem[] = pageSpecs.map(([slug, pageType, title], index) => ({
  nav_id: `NAV-W19-${String(index + 1).padStart(2, '0')}`,
  label: title,
  slug,
  page_type: pageType,
  order: index + 1,
}))

export const SIMULATED_FORM_BLUEPRINTS: SenseTrustFormBlueprint[] = [
  form('FORM-W19-001', 'Contato institucional', 'Pedido simulado de conversa sem coleta real de lead.', ['nome institucional opcional', 'tipo de organizacao', 'mensagem']),
  form('FORM-W19-002', 'Piloto controlado', 'Sinalizacao blueprint_only de interesse em piloto.', ['organizacao', 'perfil do piloto', 'observacoes nao clinicas']),
  form('FORM-W19-003', 'Parceria tecnica', 'Triagem simulada de parceria sem PII obrigatoria.', ['area de parceria', 'motivo', 'canal institucional']),
]

export const SIMULATED_ANALYTICS_BLUEPRINTS: SenseTrustAnalyticsBlueprint[] = [
  analytics('AN-W19-001', 'view_public_page', 'Medir interesse por pagina sem identificadores.'),
  analytics('AN-W19-002', 'click_blueprint_cta', 'Medir intencao de CTA sem coletar lead real.'),
  analytics('AN-W19-003', 'open_claim_disclosure', 'Medir leitura de limites publicos.'),
]

export const SIMULATED_PUBLICATION_CHECKLIST: SenseTrustWebsitePublicationChecklistItem[] = [
  check('content', 'Texto publico revisado contra promessas proibidas.', 'ready_for_review'),
  check('legal', 'Claims juridicos revisados antes de publicacao.', 'pending'),
  check('privacy', 'Formulario real desabilitado ate DPIA e politica final.', 'blocked'),
  check('security', 'Deploy de producao nao declarado nesta versao.', 'ready_for_review'),
  check('brand', 'Narrativa alinhada com v1.8 public narrative.', 'ready_for_review'),
  check('analytics', 'Eventos anonimos metadata_only definidos como blueprint.', 'pending'),
]

export const SIMULATED_WEBSITE_RISK_DISCLOSURES: SenseTrustWebsiteRiskDisclosure[] = [
  disclosure('implemented', 'Blueprint, docs, componentes e testes locais podem existir.'),
  disclosure('simulated', 'CTAs, jornadas, formularios e analytics sao simulados.'),
  disclosure('planned', 'Publicacao real depende de revisoes futuras.'),
  disclosure('pending_review', 'Claims publicos exigem revisao juridica, clinica e privacidade.'),
  disclosure('not_implemented', 'Deploy publico, billing real e coleta real de leads nao estao implementados.'),
  disclosure('prohibited_to_promise', 'Nao prometer verdade diagnostica, validade juridica plena ou resultado clinico.'),
  disclosure('pending_review', 'SEO deve evitar linguagem medica promocional.'),
  disclosure('simulated', 'Fluxos de conversao representam blueprint comercial, nao funil real.'),
]

export const SIMULATED_WEBSITE_REFERENCES = ['SenseTrust Public Narrative v1.8', 'SenseTrust Investor Room v1.7', 'SenseTrust Revenue Operations v1.6']

function cta(cta_id: string, label: string, cta_type: SenseTrustWebsiteCTA['cta_type'], target: string, audience: SenseTrustWebsiteCTA['audience']): SenseTrustWebsiteCTA {
  return { cta_id, label, cta_type, target, audience, status: 'simulated', lead_collection_status: 'not_enabled' }
}

function guardrail(guardrail_id: string, prohibited_claim: string, safe_replacement: string, review_owner: SenseTrustClaimGuardrail['review_owner']): SenseTrustClaimGuardrail {
  return { guardrail_id, prohibited_claim, safe_replacement, review_owner }
}

function journey(audience: SenseTrustAudienceJourney['audience'], entry_page: string, recommended_path: string[], conversion_goal: string): SenseTrustAudienceJourney {
  return { journey_id: `JOURNEY-W19-${audience}`, audience, entry_page, intent: 'Compreender SenseTrust sem exposicao sensivel.', recommended_path, conversion_goal, risk_disclosure: 'Fluxo simulado; nao coleta lead real.' }
}

function form(form_id: string, name: string, purpose: string, fields: string[]): SenseTrustFormBlueprint {
  return { form_id, name, purpose, fields, collection_status: 'blueprint_only', pii_collection_enabled: false, clinical_data_collection_enabled: false }
}

function analytics(analytics_id: string, event_name: string, purpose: string): SenseTrustAnalyticsBlueprint {
  return { analytics_id, event_name, purpose, payload_policy: 'anonymous_metadata_only', enabled_in_production: false }
}

function check(area: SenseTrustWebsitePublicationChecklistItem['area'], requirement: string, status: SenseTrustWebsitePublicationChecklistItem['status']): SenseTrustWebsitePublicationChecklistItem {
  return { item_id: `CHECK-W19-${area}`, area, requirement, status }
}

function disclosure(category: SenseTrustWebsiteRiskDisclosure['category'], statement: string): SenseTrustWebsiteRiskDisclosure {
  return { disclosure_id: `DISC-W19-${category}-${statement.length}`, category, statement }
}
