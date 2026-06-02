import { supabase } from '@/lib/supabase/client'

export type DndaReportFields = {
  reason?: string
  history?: string
  behavior?: string
  cognitive?: string
  rdoc?: string
  bigFive?: string
  psychicFunc?: string
  neurophysio?: string
  integration?: string
  hypotheses?: string
  intervention?: string
  conclusion?: string
}

export type DndaReportResult = {
  reportId: string
  status: 'draft_for_human_review'
  model: string
  embeddingModel: string
  promptVersion: string
  reportHash: string
  reportMarkdown: string
  reportFields: DndaReportFields
  reportJson: Record<string, any>
  retrievedSources: Array<{
    id: string
    source_path: string
    title: string
    note_type: string | null
    axis: string | null
    evidence_level: string | null
    similarity: number
  }>
}

export async function generateDndaReportDraft(params: {
  inputAnamnesis: string
  reportData: Record<string, any>
  patientContext?: Record<string, any>
  patientId?: string
  matchCount?: number
  model?: string
  reasoningEffort?: 'low' | 'medium' | 'high'
}) {
  const { data, error } = await supabase.functions.invoke<DndaReportResult>('generate-dnda-report', {
    body: {
      model: 'gpt-5.4-mini',
      reasoningEffort: 'medium',
      matchCount: 10,
      ...params,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) {
    throw new Error('A IA nao retornou dados para o relatorio.')
  }

  return data
}
