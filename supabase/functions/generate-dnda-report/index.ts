const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const OPENAI_API_URL = 'https://api.openai.com/v1'
const EMBEDDING_MODEL = 'text-embedding-3-small'
const DEFAULT_REPORT_MODEL = 'gpt-5.4-mini'
const PROMPT_VERSION = 'neurostrata-dnda-v1'

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
  return [
    inputAnamnesis,
    JSON.stringify(compactReportData(reportData)),
    JSON.stringify(patientContext ?? {}),
  ]
    .filter(Boolean)
    .join('\n\n')
    .slice(0, 24000)
}

function buildSystemPrompt() {
  return `Voce e o NeuroStrata Convergence Agent. Gere um rascunho tecnico assistido por IA para revisao profissional, nunca um laudo final.

Regras obrigatorias:
- Separar dado observado, nota recuperada, inferencia, hipotese, lacuna e recomendacao.
- Nao inventar qEEG, sLORETA/eLORETA, coordenadas, escalas, diagnosticos, medicamentos ou historico.
- Quando faltar dado, declarar a lacuna.
- Usar citacoes internas no formato [source_id: id, note_type: tipo, similarity: valor].
- Se o dado vier apenas da entrada atual, usar [source: input_anamnesis].
- Classificar energia cerebral, integracao de rede e organizacao funcional como indeterminada quando nao houver evidencias suficientes.
- Organizar intervencao por fases: base, integracao e especializacao.
- Finalizar com: Documento gerado como rascunho tecnico assistido por IA, dependente de revisao e validacao profissional.

Retorne somente JSON valido conforme o schema solicitado.`
}

function buildUserPrompt(params: {
  inputAnamnesis: string
  reportData: ReportData
  patientContext: unknown
  retrievedSources: RetrievedSource[]
}) {
  return JSON.stringify(
    {
      task: 'Gerar Relatorio de Convergencia NeuroStrata DNDA em Markdown e campos estruturados para preencher o editor.',
      output_language: 'pt-BR',
      status: 'draft_for_human_review',
      input_anamnesis: params.inputAnamnesis,
      report_data: compactReportData(params.reportData),
      patient_context: params.patientContext ?? {},
      retrieved_notes: params.retrievedSources.map((source) => ({
        id: source.id,
        title: source.title,
        note_type: source.note_type,
        axis: source.axis,
        evidence_level: source.evidence_level,
        similarity: source.similarity,
        content: source.content,
      })),
      required_json_shape: {
        report_markdown: 'string',
        report_fields: {
          reason: 'string',
          history: 'string',
          behavior: 'string',
          cognitive: 'string',
          rdoc: 'string',
          bigFive: 'string',
          psychicFunc: 'string',
          neurophysio: 'string',
          integration: 'string',
          hypotheses: 'string',
          intervention: 'string',
          conclusion: 'string',
        },
        evidence_quality: {
          level_a: ['string'],
          level_b: ['string'],
          level_c: ['string'],
          level_d: ['string'],
        },
        neurofunctional_classification: {
          brain_energy: 'hipoativa | hiperativa | instavel | mista | indeterminada',
          network_integration: 'acoplada | desacoplada | hiperacoplada | instavel | indeterminada',
          functional_organization: 'coerente | difusa | fragmentada | compensatoria | indeterminada',
        },
        risks: {
          clinical: ['string'],
          neurofunctional: ['string'],
          intervention: ['string'],
          red_flags: ['string'],
        },
        missing_data: ['string'],
        audit: {
          prompt_version: PROMPT_VERSION,
          human_reviewer_required: true,
        },
      },
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
        required: [
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
        ],
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
      evidence_quality: {
        type: 'object',
        additionalProperties: true,
      },
      neurofunctional_classification: {
        type: 'object',
        additionalProperties: true,
      },
      risks: {
        type: 'object',
        additionalProperties: true,
      },
      missing_data: {
        type: 'array',
        items: { type: 'string' },
      },
      audit: {
        type: 'object',
        additionalProperties: true,
      },
    },
  }
}

async function openaiEmbedding(openaiKey: string, input: string) {
  const response = await fetch(`${OPENAI_API_URL}/embeddings`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input }),
  })

  if (!response.ok) {
    throw new Error(`embedding_failed: ${await response.text()}`)
  }

  const payload = await response.json()
  return payload.data[0].embedding
}

function toPgVector(embedding: number[]) {
  return `[${embedding.join(',')}]`
}

async function generateReport(openaiKey: string, body: Record<string, unknown>) {
  const response = await fetch(`${OPENAI_API_URL}/responses`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`report_generation_failed: ${await response.text()}`)
  }

  const payload = await response.json()
  const text =
    payload.output_text ??
    payload.output?.flatMap((item: any) => item.content ?? [])
      ?.map((content: any) => content.text ?? '')
      ?.join('')

  if (!text) {
    throw new Error('report_generation_failed: empty model output')
  }

  return JSON.parse(text)
}

async function sha256Hex(value: string) {
  const data = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', data)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'method_not_allowed' }, 405)
  }

  try {
    const openaiKey = Deno.env.get('OPENAI_KEY')
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!openaiKey) return jsonResponse({ error: 'missing_OPENAI_KEY_secret' }, 500)
    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse({ error: 'missing_supabase_service_secrets' }, 500)
    }

    const requestBody = await req.json()
    const inputAnamnesis = String(requestBody.inputAnamnesis ?? '')
    const reportData = (requestBody.reportData ?? {}) as ReportData
    const patientContext = requestBody.patientContext ?? {}
    const matchCount = Math.min(Number(requestBody.matchCount ?? 10), 16)
    const model = String(requestBody.model ?? DEFAULT_REPORT_MODEL)
    const reasoningEffort = String(requestBody.reasoningEffort ?? 'medium')

    const searchText = buildSearchText(inputAnamnesis, reportData, patientContext)
    if (searchText.trim().length < 20) {
      return jsonResponse({ error: 'insufficient_input' }, 400)
    }

    const queryEmbedding = await openaiEmbedding(openaiKey, searchText)

    const matchResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/match_ns_notes`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query_embedding: toPgVector(queryEmbedding),
        match_count: matchCount,
        filter_axes: requestBody.filterAxes ?? null,
        filter_trust_status: requestBody.filterTrustStatus ?? ['governed'],
        filter_confidentiality: requestBody.filterConfidentiality ?? ['internal', 'restrito'],
      }),
    })

    if (!matchResponse.ok) {
      throw new Error(`match_notes_failed: ${await matchResponse.text()}`)
    }

    const retrievedSources = (await matchResponse.json()) as RetrievedSource[]
    const modelJson = await generateReport(openaiKey, {
      model,
      input: [
        { role: 'system', content: buildSystemPrompt() },
        {
          role: 'user',
          content: buildUserPrompt({
            inputAnamnesis,
            reportData,
            patientContext,
            retrievedSources,
          }),
        },
      ],
      reasoning: { effort: reasoningEffort },
      text: {
        verbosity: 'medium',
        format: {
          type: 'json_schema',
          name: 'neurostrata_dnda_report',
          strict: false,
          schema: buildReportJsonSchema(),
        },
      },
    })

    const reportMarkdown = String(modelJson.report_markdown ?? '')
    const reportFields = modelJson.report_fields ?? {}
    const hash = await sha256Hex(
      JSON.stringify({
        inputAnamnesis,
        reportData: compactReportData(reportData),
        patientContext,
        retrievedSources: retrievedSources.map((source) => source.id),
        reportMarkdown,
        model,
        promptVersion: PROMPT_VERSION,
      }),
    )

    const insertResponse = await fetch(`${supabaseUrl}/rest/v1/ns_ai_reports`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        patient_id: requestBody.patientId ?? null,
        status: 'draft_for_human_review',
        input_snapshot: { inputAnamnesis, reportData: compactReportData(reportData), patientContext },
        report_markdown: reportMarkdown,
        report_json: modelJson,
        report_fields: reportFields,
        retrieved_sources: retrievedSources.map((source) => ({
          id: source.id,
          source_path: source.source_path,
          title: source.title,
          note_type: source.note_type,
          axis: source.axis,
          evidence_level: source.evidence_level,
          similarity: source.similarity,
        })),
        model,
        embedding_model: EMBEDDING_MODEL,
        prompt_version: PROMPT_VERSION,
        report_hash: hash,
      }),
    })

    if (!insertResponse.ok) {
      throw new Error(`save_report_failed: ${await insertResponse.text()}`)
    }

    const [savedReport] = await insertResponse.json()

    return jsonResponse({
      reportId: savedReport.id,
      status: 'draft_for_human_review',
      model,
      embeddingModel: EMBEDDING_MODEL,
      promptVersion: PROMPT_VERSION,
      reportHash: hash,
      reportMarkdown,
      reportFields,
      reportJson: modelJson,
      retrievedSources,
    })
  } catch (error) {
    console.error(error)
    return jsonResponse({ error: error instanceof Error ? error.message : 'unknown_error' }, 500)
  }
})
