import { supabase } from '@/lib/supabase/client'

export async function createPerson(input: {
  fullName: string
  externalCode?: string
  birthDate?: string
  sex?: string
}) {
  const { data, error } = await supabase
    .from('persons')
    .insert({
      full_name: input.fullName,
      external_code: input.externalCode,
      birth_date: input.birthDate,
      sex: input.sex,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function createAssessment(input: {
  personId: string
  assessmentType: string
  payload: Record<string, unknown>
}) {
  const { data, error } = await supabase
    .from('assessments')
    .insert({
      person_id: input.personId,
      assessment_type: input.assessmentType,
      payload: input.payload,
      status: 'submitted',
      source_hash: crypto.randomUUID(),
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function computeVitalScore(assessmentId: string) {
  const { data, error } = await supabase.rpc('fn_compute_vitalscore', {
    p_assessment_id: assessmentId,
    p_model_code: 'VitalScore',
    p_model_version: '1.0.0',
  })

  if (error) throw error
  return data
}

export async function getComputedProfiles(personId: string) {
  const { data, error } = await supabase
    .from('computed_profiles')
    .select(
      `
      *,
      assessments!inner (
        person_id
      )
    `,
    )
    .eq('assessments.person_id', personId)
    .order('computed_at', { ascending: false })

  if (error) throw error
  return data
}

export async function getNslModels() {
  const { data, error } = await supabase.from('model_definitions').select('*')
  if (error) throw error
  return data
}

export async function getNslModelDimensions(modelId: string) {
  const { data, error } = await supabase
    .from('model_dimensions')
    .select('*')
    .eq('model_definition_id', modelId)
  if (error) throw error
  return data
}
