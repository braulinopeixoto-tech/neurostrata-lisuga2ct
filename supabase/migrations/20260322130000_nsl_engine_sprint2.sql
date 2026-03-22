-- 1. Tables creation for NSL Engine (NeuroSingularity Language)

CREATE TABLE IF NOT EXISTS public.persons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  birth_date DATE,
  sex TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES public.persons(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  collected_by UUID,
  payload JSONB NOT NULL,
  source_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.model_definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_code TEXT NOT NULL,
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  config JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(model_code, version)
);

CREATE TABLE IF NOT EXISTS public.model_dimensions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_definition_id UUID NOT NULL REFERENCES public.model_definitions(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  json_path TEXT[] NOT NULL,
  score_type TEXT NOT NULL,
  weight NUMERIC(8,4) NOT NULL,
  min_value NUMERIC,
  max_value NUMERIC,
  target_value NUMERIC,
  tolerance_value NUMERIC,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.computed_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
  model_definition_id UUID NOT NULL REFERENCES public.model_definitions(id),
  vital_score NUMERIC(6,2) NOT NULL,
  nsi_score NUMERIC(6,2) NOT NULL,
  class_label TEXT NOT NULL,
  domain_scores JSONB NOT NULL,
  risk_scores JSONB NOT NULL,
  reserve_scores JSONB NOT NULL,
  explanations JSONB NOT NULL,
  computed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  computed_hash TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.biogram_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  person_id UUID NOT NULL REFERENCES public.persons(id) ON DELETE CASCADE,
  assessment_id UUID REFERENCES public.assessments(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_payload JSONB NOT NULL,
  event_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.model_dimensions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.computed_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biogram_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_read_persons" ON public.persons;
CREATE POLICY "auth_read_persons" ON public.persons FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_persons" ON public.persons;
CREATE POLICY "auth_insert_persons" ON public.persons FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_assessments" ON public.assessments;
CREATE POLICY "auth_read_assessments" ON public.assessments FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_assessments" ON public.assessments;
CREATE POLICY "auth_insert_assessments" ON public.assessments FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_model_definitions" ON public.model_definitions;
CREATE POLICY "auth_read_model_definitions" ON public.model_definitions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_read_model_dimensions" ON public.model_dimensions;
CREATE POLICY "auth_read_model_dimensions" ON public.model_dimensions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_read_computed_profiles" ON public.computed_profiles;
CREATE POLICY "auth_read_computed_profiles" ON public.computed_profiles FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_computed_profiles" ON public.computed_profiles;
CREATE POLICY "auth_insert_computed_profiles" ON public.computed_profiles FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_biogram_events" ON public.biogram_events;
CREATE POLICY "auth_read_biogram_events" ON public.biogram_events FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "auth_insert_biogram_events" ON public.biogram_events;
CREATE POLICY "auth_insert_biogram_events" ON public.biogram_events FOR INSERT TO authenticated WITH CHECK (true);

-- NSL Engine Functions

CREATE OR REPLACE FUNCTION public.fn_clamp(
  p_value numeric,
  p_min numeric,
  p_max numeric
) RETURNS numeric
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT GREATEST(p_min, LEAST(p_value, p_max));
$$;

CREATE OR REPLACE FUNCTION public.fn_normalize_direct(
  p_value numeric,
  p_min numeric,
  p_max numeric
) RETURNS numeric
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_max = p_min THEN 0
    ELSE public.fn_clamp(((p_value - p_min) / NULLIF((p_max - p_min),0)) * 100, 0, 100)
  END;
$$;

CREATE OR REPLACE FUNCTION public.fn_normalize_inverse(
  p_value numeric,
  p_min numeric,
  p_max numeric
) RETURNS numeric
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT 100 - public.fn_normalize_direct(p_value, p_min, p_max);
$$;

CREATE OR REPLACE FUNCTION public.fn_normalize_window(
  p_value numeric,
  p_target numeric,
  p_tolerance numeric
) RETURNS numeric
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT CASE
    WHEN p_tolerance <= 0 THEN 0
    ELSE 100 * exp(-power((p_value - p_target), 2) / (2 * power(p_tolerance, 2)))
  END;
$$;

CREATE OR REPLACE FUNCTION public.fn_compute_vitalscore(
  p_assessment_id uuid,
  p_model_code text DEFAULT 'VitalScore',
  p_model_version text DEFAULT '1.0.0'
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_assessment record;
  v_model record;
  v_dimension record;
  v_domain_scores jsonb := '{}'::jsonb;
  v_sum numeric := 0;
  v_raw numeric;
  v_score numeric;
  v_vital_score numeric := 0;
  v_nsi_score numeric := 0;
  v_class_label text := 'indefinido';
  v_result_id uuid;
  v_distinctiveness numeric := 50;
  v_coherence numeric := 50;
  v_temporal numeric := 50;
BEGIN
  SELECT * INTO v_assessment
  FROM public.assessments
  WHERE id = p_assessment_id;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'assessment not found';
  END IF;

  SELECT * INTO v_model
  FROM public.model_definitions
  WHERE model_code = p_model_code
    AND version = p_model_version
    AND status = 'active'
  LIMIT 1;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'model definition not found';
  END IF;

  FOR v_dimension IN
    SELECT * FROM public.model_dimensions WHERE model_definition_id = v_model.id
  LOOP
    -- extrair o valor bruto do JSON
    v_raw := NULLIF(v_assessment.payload #>> v_dimension.json_path, '')::numeric;

    IF v_raw IS NULL THEN
      v_score := 0;
    ELSIF v_dimension.score_type = 'direct' THEN
      v_score := public.fn_normalize_direct(v_raw, coalesce(v_dimension.min_value, 0), coalesce(v_dimension.max_value, 100));
    ELSIF v_dimension.score_type = 'inverse' THEN
      v_score := public.fn_normalize_inverse(v_raw, coalesce(v_dimension.min_value, 0), coalesce(v_dimension.max_value, 100));
    ELSIF v_dimension.score_type = 'window' THEN
      v_score := public.fn_normalize_window(v_raw, coalesce(v_dimension.target_value, 0), coalesce(v_dimension.tolerance_value, 1));
    ELSE
      v_score := 0;
    END IF;

    v_sum := v_sum + (v_score * v_dimension.weight);

    v_domain_scores := v_domain_scores || jsonb_build_object(
      v_dimension.code,
      jsonb_build_object(
        'raw', v_raw,
        'score', round(v_score, 2),
        'weight', v_dimension.weight,
        'weighted_score', round(v_score * v_dimension.weight, 2)
      )
    );
  END LOOP;

  v_vital_score := round(v_sum, 2);

  v_distinctiveness := coalesce((v_assessment.payload->>'distinctiveness_proxy')::numeric, 50);
  v_coherence := coalesce((v_assessment.payload->>'coherence_proxy')::numeric, 50);
  v_temporal := coalesce((v_assessment.payload->>'temporal_proxy')::numeric, 50);

  v_nsi_score := round(
      (0.40 * v_distinctiveness)
    + (0.25 * v_coherence)
    + (0.35 * v_temporal),
    2
  );

  IF v_vital_score < 25 THEN
    v_class_label := 'colapso_funcional_grave';
  ELSIF v_vital_score < 40 THEN
    v_class_label := 'fragilidade_severa';
  ELSIF v_vital_score < 55 THEN
    v_class_label := 'vulnerabilidade_moderada';
  ELSIF v_vital_score < 70 THEN
    v_class_label := 'funcionalidade_instavel';
  ELSIF v_vital_score < 85 THEN
    v_class_label := 'funcionalidade_preservada';
  ELSE
    v_class_label := 'alta_reserva_funcional';
  END IF;

  INSERT INTO public.computed_profiles (
    assessment_id,
    model_definition_id,
    vital_score,
    nsi_score,
    class_label,
    domain_scores,
    risk_scores,
    reserve_scores,
    explanations,
    computed_hash
  ) VALUES (
    v_assessment.id,
    v_model.id,
    v_vital_score,
    v_nsi_score,
    v_class_label,
    v_domain_scores,
    '{}'::jsonb,
    '{}'::jsonb,
    jsonb_build_object(
      'distinctiveness', v_distinctiveness,
      'coherence', v_coherence,
      'temporal_continuity', v_temporal
    ),
    md5(v_assessment.payload::text || v_model.config::text || now()::text)
  )
  RETURNING id INTO v_result_id;

  INSERT INTO public.biogram_events (
    person_id,
    assessment_id,
    event_type,
    event_payload
  ) VALUES (
    v_assessment.person_id,
    v_assessment.id,
    'profile_computed',
    jsonb_build_object(
      'computed_profile_id', v_result_id,
      'vital_score', v_vital_score,
      'nsi_score', v_nsi_score,
      'class_label', v_class_label
    )
  );

  RETURN v_result_id;
END;
$$;

-- SEED DATA NSL
DO $$
DECLARE
  v_model_id UUID;
BEGIN
  INSERT INTO public.model_definitions (model_code, version, status, config)
  VALUES (
    'VitalScore', '1.0.0', 'active',
    '{
      "nsi": {
        "distinctiveness_weight": 0.40,
        "coherence_weight": 0.25,
        "temporal_weight": 0.35
      }
    }'::jsonb
  ) ON CONFLICT (model_code, version) DO NOTHING
  RETURNING id INTO v_model_id;

  IF v_model_id IS NULL THEN
    SELECT id INTO v_model_id FROM public.model_definitions WHERE model_code = 'VitalScore' AND version = '1.0.0';
  END IF;

  -- Verify dimensions haven't been added yet
  IF NOT EXISTS (SELECT 1 FROM public.model_dimensions WHERE model_definition_id = v_model_id) THEN
    INSERT INTO public.model_dimensions (model_definition_id, code, json_path, score_type, weight, min_value, max_value, target_value, tolerance_value)
    VALUES
      (v_model_id, 'rdoc_negative_valence', ARRAY['rdoc', 'negative_valence'], 'inverse', 0.12, 0, 100, NULL, NULL),
      (v_model_id, 'rdoc_cognition', ARRAY['rdoc', 'cognition'], 'direct', 0.14, 0, 100, NULL, NULL),
      (v_model_id, 'big5_neuroticism', ARRAY['big5', 'neuroticism'], 'inverse', 0.08, 0, 100, NULL, NULL),
      (v_model_id, 'eeg_theta_beta', ARRAY['eeg', 'theta_beta'], 'window', 0.10, NULL, NULL, 42, 12),
      (v_model_id, 'clinical_function', ARRAY['clinical', 'function'], 'direct', 0.16, 0, 100, NULL, NULL),
      (v_model_id, 'metabolic_energy', ARRAY['metabolic', 'energy'], 'direct', 0.10, 0, 100, NULL, NULL),
      (v_model_id, 'context_stress', ARRAY['context', 'stress'], 'inverse', 0.08, 0, 100, NULL, NULL),
      (v_model_id, 'longitudinal_reserve', ARRAY['longitudinal', 'reserve'], 'direct', 0.22, 0, 100, NULL, NULL);
  END IF;
END $$;
