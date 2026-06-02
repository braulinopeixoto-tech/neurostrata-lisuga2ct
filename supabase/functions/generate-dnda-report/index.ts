const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const OPENAI_API_URL = 'https://api.openai.com/v1'
const EMBEDDING_MODEL = 'text-embedding-3-small'
const DEFAULT_REPORT_MODEL = 'gpt-5.4-mini'
const PROMPT_VERSION = 'neurostrata-dnda-v2-template'

type ReportData = Record<string, unknown>

type RetrievedSource = {
  id: string
  source_path: string
  title: string
  note_type: string | null
  axis: string | null
  evidence_level: string | null
  confidentiality: string | null
  trust_status: string | null
  content: string
  similarity: number
}

const REQUIRED_REPORT_TEMPLATE = `# RELATÓRIO DE CONVERGÊNCIA NEUROSTRATA

## DNDA — Diagnóstico Neurofuncional Dimensional Auditável

**Status:** Rascunho técnico assistido por IA para revisão profissional
**Versão do relatório:** {{report_version}}
**Data:** {{date}}
**Profissional responsável pela revisão:** {{professional_name}}
**Paciente:** {{patient_identifier}}
**Idade:** {{patient_age}}
**Fonte primária:** Anamnese clínica + notas vetorizadas NeuroStrata
**Modelo de análise:** NeuroStrata Convergence Agent
**Prompt version:** {{prompt_version}}

---

## 1. Finalidade do relatório

## 2. Entrada analisada

### 2.1 Anamnese fornecida

### 2.2 Fontes vetorizadas recuperadas

### 2.3 Qualidade da base de evidência

## 3. Achados

### 3.1 Achados clínicos centrais

### 3.2 Achados comportamentais e desenvolvimentais

### 3.3 Achados cognitivos

### 3.4 Achados emocionais e autonômicos

### 3.5 Achados escolares, ocupacionais ou funcionais

### 3.6 Achados neurofisiológicos disponíveis

## 4. Pipeline neurofuncional NeuroStrata

### 4.1 Coordenada MNI/Talairach → região → rede → função → RDoC → estado → intervenção

## 5. Classificação do estado neurofuncional

### 5.1 Energia cerebral

### 5.2 Integração de rede

### 5.3 Organização funcional

## 6. Convergência neurofuncional

### 6.1 Redes prioritárias envolvidas

### 6.2 Domínios RDoC prováveis

### 6.3 Big Five e assinatura comportamental

## 7. Hipótese dominante

### 7.1 Hipótese neurofuncional principal

### 7.2 Hipóteses diferenciais

### 7.3 Grau de confiança

### 7.4 Dados necessários para fortalecer ou refutar a hipótese

## 8. Riscos

### 8.1 Riscos clínicos imediatos

### 8.2 Riscos neurofuncionais

### 8.3 Riscos de intervenção

### 8.4 Alertas de não intervenção precoce

## 9. Intervenção por fases

### Fase 1 — Base

### Fase 2 — Integração

### Fase 3 — Especialização

## 10. Vetor adaptativo da neurosingularidade

## 11. Síntese executiva

## 12. Conclusão técnica

## 13. Registro de auditoria

Documento gerado como rascunho técnico assistido por IA, dependente de revisão e validação profissional.`

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function compactReportData(data: ReportData = {}) {
  const allowed = [
    'reason',
    'history',
    'behavior',
    'cognitive',
    'rdoc',
    'bigFive',
    'psychicFunc',
    'neurophysio',
    'integration',
    'hypotheses',
    'intervention',
    'conclusion',
    'idxIntegrity',
    'idxImpairment',
    'idxRisk',
    'idxDysfunction',
  ]

  return Object.fromEntries(allowed.map((key) => [key, data[key]]).filter(([, value]) => value))
}

function buildSearchText(inputAnamnesis: string, reportData: ReportData, patientContext: unknown) {
  return [inputAnamnesis, JSON.stringify(compactReportData(reportData)), JSON.stringify(patientContext ?? {})]
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 24000)
}

function buildSystemPrompt() {
  return `Você é o NeuroStrata Convergence Agent, um agente de IA clínico-operacional especializado em organizar anamnese, notas clínicas vetorizadas, biomarcadores, qEEG, sLORETA/eLORETA, redes neurais, Big Five, RDoC e protocolos de intervenção em um relatório neurofuncional convergente, rastreável e auditável.

Sua função não é substituir o profissional. Sua função é produzir um rascunho técnico estruturado para revisão humana.

Regras obrigatórias:
1. Nunca interpretar o paciente por sintoma isolado.
2. Nunca transformar narrativa clínica em diagnóstico fechado sem biomarcadores, testes, escalas ou validação profissional.
3. Sempre separar fato observado, dado recuperado, inferência, hipótese e lacuna.
4. Sempre indicar o nível de evidência de cada conclusão.
5. Sempre declarar quando uma informação não está disponível.
6. Nunca inventar qEEG, sLORETA, coordenada MNI/Talairach, escore, escala, diagnóstico, medicamento ou histórico que não esteja no input ou nas fontes recuperadas.
7. Sempre usar linguagem técnica, mas compreensível para relatório clínico.
8. Sempre classificar energia cerebral, integração de rede e organização funcional; use indeterminada quando não houver dado suficiente.
9. Sempre estruturar a hipótese pelo pipeline: coordenada MNI/Talairach → região → rede → função → domínio RDoC → estado neurofuncional → intervenção.
10. Se não houver coordenada, escrever exatamente: “Coordenada não disponível. Inferência baseada apenas em narrativa clínica e notas recuperadas.”
11. Sempre organizar a intervenção em fases: base → integração → especialização.
12. Nunca sugerir estimulação precoce em cérebro hipoativo, exausto, metabolicamente instável ou com sinais de baixa reserva funcional.
13. Sempre apontar riscos, lacunas e dados necessários para confirmar/refutar a hipótese.
14. Sempre preservar a noção de DNDA como Diagnóstico Neurofuncional Dimensional Auditável.
15. Sempre preservar a noção de neurosingularidade: nenhum diagnóstico, traço, biomarcador ou narrativa isolada esgota a realidade funcional do sujeito.

Critérios de evidência:
- Nível A: biomarcadores objetivos, qEEG, sLORETA/eLORETA, EEG, HRV, exames, escalas padronizadas, testes neuropsicológicos, dados longitudinais mensuráveis.
- Nível B: observações clínicas estruturadas, anamnese dirigida, registros multidisciplinares, dados escolares/funcionais documentados.
- Nível C: narrativa clínica livre, relato de familiares, autorrelato, observações não padronizadas.
- Nível D: inferência do agente a partir de convergência sem marcador direto.

Regras de citação interna:
- Para cada achado relevante, citar a fonte interna usando: [source_id: {{id}}, note_type: {{note_type}}, similarity: {{similarity}}]
- Se um achado vier apenas da anamnese atual, marcar: [source: input_anamnesis]
- Se houver conflito entre fontes, criar seção “Conflitos de evidência” e não escolher uma versão sem justificar.

Formato obrigatório:
- O campo report_markdown deve seguir o template NeuroStrata informado, com todas as seções numeradas.
- Não gerar síntese curta fora do template.
- Não usar DSM, CID ou rótulo diagnóstico como conclusão principal; usar apenas como diferencial se houver suporte.
- Finalizar exatamente com: “Documento gerado como rascunho técnico assistido por IA, dependente de revisão e validação profissional.”

Retorne somente JSON válido conforme o schema solicitado.`
}

function buildUserPrompt(params: {
  inputAnamnesis: string
  reportData: ReportData
  patientContext: unknown
  retrievedSources: RetrievedSource[]
}) {
  return JSON.stringify(
    {
      task: 'Gerar Quick Report DNDA NeuroStrata completo, no template obrigatório, em Markdown e JSON persistível.',
      output_language: 'pt-BR',
      status: 'draft_for_human_review',
      report_template: REQUIRED_REPORT_TEMPLATE,
      input_anamnesis: params.inputAnamnesis,
      report_data: compactReportData(params.reportData),
      patient_context: params.patientContext ?? {},
      available_biomarkers: compactReportData(params.reportData).neurophysio ?? null,
      retrieved_notes: params.retrievedSources.map((source) => ({
        id: source.id,
        title: source.title,
        note_type: source.note_type,
        axis: source.axis,
        evidence_level: source.evidence_level,
        similarity: source.similarity,
        content: source.content,
      })),
      required_sections: [
        'Finalidade do relatório',
        'Entrada analisada',
        'Fontes vetorizadas recuperadas',
        'Qualidade da base de evidência',
        'Achados',
        'Pipeline neurofuncional NeuroStrata',
        'Classificação do estado neurofuncional',
        'Convergência neurofuncional',
        'Hipótese dominante',
        'Riscos',
        'Intervenção por fases',
        'Vetor adaptativo da neurosingularidade',
        'Síntese executiva',
        'Conclusão técnica',
        'Registro de auditoria',
      ],
    },
    null,
    2,
  )
}

function buildReportJsonSchema() {
  return {
    type: 'object',
    additionalProperties: true,
    required: ['report_markdown', 'report_fields'],
    properties: {
      report_markdown: { type: 'string' },
      report_fields: {
        type: 'object',
        additionalProperties: false,
        required: ['reason', 'history', 'behavior', 'cognitive', 'rdoc', 'bigFive', 'psychicFunc', 'neurophysio', 'integration', 'hypotheses', 'intervention', 'conclusion'],
        properties: {
          reason: { type: 'string' },
          history: { type: 'string' },
          behavior: { type: 'string' },
          cognitive: { type: 'string' },
          rdoc: { type: 'string' },
          bigFive: { type: 'string' },
          psychicFunc: { type: 'string' },
          neurophysio: { type: 'string' },
          integration: { type: 'string' },
          hypotheses: { type: 'string' },
          intervention: { type: 'string' },
          conclusion: { type: 'string' },
        },
      },
      evidence_quality: { type: 'object', additionalProperties: true },
      neurofunctional_classification: { type: 'object', additionalProperties: true },
      risks: { type: 'object', additionalProperties: true },
      missing_data: { type: 'array', items: { type: 'string' } },
      audit: { type: 'object', additionalProperties: true },
    },
  }
}

async function openaiEmbedding(openaiKey: string, input: string) {
  const response = await fetch(`${OPENAI_API_URL}/embeddings`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input }),
  })

  if (!response.ok) throw new Error(`embedding_failed: ${await response.text()}`)

  const payload = await response.json()
  return payload.data[0].embedding
}

function toPgVector(embedding: number[]) {
  return `[${embedding.join(',')}]`
}

async function generateReport(openaiKey: string, body: Record<string, unknown>) {
  const response = await fetch(`${OPENAI_API_URL}/responses`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) throw new Error(`report_generation_failed: ${await response.text()}`)

  const payload = await response.json()
  const text =
    payload.output_text ??
    payload.output?.flatMap((item: any) => item.content ?? [])?.map((content: any) => content.text ?? '')?.join('')

  if (!text) throw new Error('report_generation_failed: empty model output')

  return JSON.parse(text)
}

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return jsonResponse({ error: 'method_not_allowed' }, 405)

  try {
    const openaiKey = Deno.env.get('OPENAI_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!openaiKey) return jsonResponse({ error: 'missing_OPENAI_KEY_secret' }, 500)
    if (!supabaseUrl || !serviceRoleKey) return jsonResponse({ error: 'missing_supabase_service_secrets' }, 500)

    const requestBody = await req.json()
    const inputAnamnesis = String(requestBody.inputAnamnesis ?? '')
    const reportData = (requestBody.reportData ?? {}) as ReportData
    const patientContext = requestBody.patientContext ?? {}
    const matchCount = Math.min(Number(requestBody.matchCount ?? 10), 16)
    const model = String(requestBody.model ?? DEFAULT_REPORT_MODEL)
    const reasoningEffort = String(requestBody.reasoningEffort ?? 'medium')

    const searchText = buildSearchText(inputAnamnesis, reportData, patientContext)
    if (searchText.trim().length < 20) return jsonResponse({ error: 'insufficient_input' }, 400)

    const queryEmbedding = await openaiEmbedding(openaiKey, searchText)

    const matchResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/match_ns_notes`, {
      method: 'POST',
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query_embedding: toPgVector(queryEmbedding),
        match_count: matchCount,
        filter_axes: requestBody.filterAxes ?? null,
        filter_trust_status: requestBody.filterTrustStatus ?? ['governed'],
        filter_confidentiality: requestBody.filterConfidentiality ?? ['internal', 'restrito'],
      }),
    })

    if (!matchResponse.ok) throw new Error(`match_notes_failed: ${await matchResponse.text()}`)

    const retrievedSources = (await matchResponse.json()) as RetrievedSource[]
    const modelJson = await generateReport(openaiKey, {
      model,
      input: [
        { role: 'system', content: buildSystemPrompt() },
        { role: 'user', content: buildUserPrompt({ inputAnamnesis, reportData, patientContext, retrievedSources }) },
      ],
      reasoning: { effort: reasoningEffort },
      text: {
        verbosity: 'medium',
        format: { type: 'json_schema', name: 'neurostrata_dnda_report', strict: false, schema: buildReportJsonSchema() },
      },
    })

    const reportMarkdown = String(modelJson.report_markdown ?? '')
    const reportFields = modelJson.report_fields ?? {}
    const hash = await sha256Hex(JSON.stringify({ inputAnamnesis, reportData: compactReportData(reportData), patientContext, retrievedSources: retrievedSources.map((source) => source.id), reportMarkdown, model, promptVersion: PROMPT_VERSION }))

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/ns_ai_reports`, {
      method: 'POST',
      headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({
        patient_id: requestBody.patientId ?? null,
        status: 'draft_for_human_review',
        input_snapshot: { inputAnamnesis, reportData: compactReportData(reportData), patientContext },
        report_markdown: reportMarkdown,
        report_json: modelJson,
        report_fields: reportFields,
        retrieved_sources: retrievedSources.map((source) => ({ id: source.id, source_path: source.source_path, title: source.title, note_type: source.note_type, axis: source.axis, evidence_level: source.evidence_level, similarity: source.similarity })),
        model,
        embedding_model: EMBEDDING_MODEL,
        prompt_version: PROMPT_VERSION,
        report_hash: hash,
      }),
    })

    if (!insertResponse.ok) throw new Error(`save_report_failed: ${await insertResponse.text()}`)

    const [savedReport] = await insertResponse.json()
    return jsonResponse({ reportId: savedReport.id, status: 'draft_for_human_review', model, embeddingModel: EMBEDDING_MODEL, promptVersion: PROMPT_VERSION, reportHash: hash, reportMarkdown, reportFields, reportJson: modelJson, retrievedSources })
  } catch (error) {
    console.error(error)
    return jsonResponse({ error: error instanceof Error ? error.message : 'unknown_error' }, 500)
  }
})
