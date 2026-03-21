-- Migration: Psychometric Lab Infrastructure
-- Description: Implementação da infraestrutura técnica mínima para validação psicométrica e longitudinal do VitalStrata.
-- Cria as tabelas de suporte metodológico e funções atômicas para os cálculos versionados e auditáveis.

-- ==========================================
-- 1. ESTRUTURA DE DADOS (TABLES)
-- ==========================================

-- 1.1 Versões de Score (Modelos de Calibração)
CREATE TABLE IF NOT EXISTS public.score_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_code TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'draft',
    algorithm_type TEXT DEFAULT 'linear',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 1.2 Definições dos Constructos para uma dada Versão
CREATE TABLE IF NOT EXISTS public.construct_definitions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    construct_code TEXT NOT NULL,
    name TEXT NOT NULL,
    weight NUMERIC DEFAULT 1.0,
    equation TEXT,
    min_value NUMERIC,
    max_value NUMERIC,
    is_sentinel BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(score_version_id, construct_code)
);

-- 1.3 Calibrações e Execuções de Modelagem
CREATE TABLE IF NOT EXISTS public.score_calibration_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    run_name TEXT NOT NULL,
    description TEXT,
    dataset_size INTEGER,
    calibration_metrics JSONB DEFAULT '{}'::jsonb,
    weights_used JSONB DEFAULT '{}'::jsonb,
    performed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.4 Estudos de Validação Documentados
CREATE TABLE IF NOT EXISTS public.score_validation_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    study_title TEXT NOT NULL,
    methodology TEXT,
    sample_size INTEGER,
    results_summary TEXT,
    publication_reference TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.5 Referenciais Normativos por População
CREATE TABLE IF NOT EXISTS public.score_norm_reference (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    population_group TEXT NOT NULL,
    mean_score NUMERIC,
    std_deviation NUMERIC,
    percentiles JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.6 Métricas de Confiabilidade (ex: Alpha de Cronbach)
CREATE TABLE IF NOT EXISTS public.score_reliability_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    metric_name TEXT NOT NULL,
    metric_value NUMERIC,
    confidence_interval_lower NUMERIC,
    confidence_interval_upper NUMERIC,
    sample_size INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.7 Métricas de Validade (Construto, Critério, etc)
CREATE TABLE IF NOT EXISTS public.score_validity_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    validity_type TEXT NOT NULL,
    reference_instrument TEXT,
    correlation_coefficient NUMERIC,
    p_value NUMERIC,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.8 Análise de Sensibilidade do Modelo
CREATE TABLE IF NOT EXISTS public.score_sensitivity_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    calibration_run_id UUID NULL REFERENCES public.score_calibration_runs(id) ON DELETE CASCADE,
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    parameter_varied TEXT NOT NULL,
    variation_range TEXT,
    impact_on_output NUMERIC,
    is_robust BOOLEAN,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 1.9 Logs de Computação (Auditabilidade Requisitada)
CREATE TABLE IF NOT EXISTS public.score_computation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_type TEXT NOT NULL,
    score_version_id UUID NOT NULL REFERENCES public.score_versions(id) ON DELETE CASCADE,
    session_id UUID NULL, 
    inputs_used JSONB NOT NULL,
    weights_used JSONB NOT NULL,
    output_generated JSONB NOT NULL,
    standard_error NUMERIC,
    confidence_band JSONB,
    checksum TEXT NOT NULL,
    executed_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);


-- ==========================================
-- 2. ÍNDICES
-- ==========================================
CREATE INDEX IF NOT EXISTS idx_construct_defs_version ON public.construct_definitions(score_version_id);
CREATE INDEX IF NOT EXISTS idx_computation_logs_version ON public.score_computation_logs(score_version_id);
CREATE INDEX IF NOT EXISTS idx_computation_logs_session ON public.score_computation_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_computation_logs_created_at ON public.score_computation_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_calibration_runs_version ON public.score_calibration_runs(score_version_id);
CREATE INDEX IF NOT EXISTS idx_norm_reference_version ON public.score_norm_reference(score_version_id);


-- ==========================================
-- 3. FUNÇÕES (RPCs) DE CÁLCULO E VALIDAÇÃO
-- ==========================================

-- 3.1 compute_construct_scores_v1
CREATE OR REPLACE FUNCTION public.compute_construct_scores_v1(
    p_session_id UUID,
    p_score_version_id UUID,
    p_inputs_json JSONB
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_weights JSONB;
    v_output JSONB;
    v_standard_error NUMERIC := 0.05; -- Margem base default para v1
    v_confidence_band JSONB := '{"lower": 0, "upper": 0}'::jsonb;
    v_checksum TEXT;
    v_log_id UUID;
    v_executed_by UUID;
BEGIN
    v_executed_by := auth.uid();

    -- Captura os pesos configurados para a versão atual
    SELECT COALESCE(jsonb_object_agg(construct_code, weight), '{}'::jsonb)
    INTO v_weights
    FROM public.construct_definitions
    WHERE score_version_id = p_score_version_id;

    -- Processamento dos constructos baseado nos pesos e inputs (Stub computacional)
    v_output := jsonb_build_object(
        'status', 'computed',
        'raw_inputs', p_inputs_json
    );
    
    -- Checksum garantindo imutabilidade dos dados utilizados
    v_checksum := md5(p_inputs_json::text || v_weights::text || p_score_version_id::text);
    
    -- Registro da computação no ledger analítico
    INSERT INTO public.score_computation_logs (
        execution_type, score_version_id, session_id, inputs_used,
        weights_used, output_generated, standard_error, confidence_band,
        checksum, executed_by
    ) VALUES (
        'construct_computation', p_score_version_id, p_session_id, p_inputs_json,
        v_weights, v_output, v_standard_error, v_confidence_band,
        v_checksum, v_executed_by
    ) RETURNING id INTO v_log_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'log_id', v_log_id,
        'output', v_output,
        'checksum', v_checksum
    );
END;
$$;

-- 3.2 compute_vitalscore_v1
CREATE OR REPLACE FUNCTION public.compute_vitalscore_v1(
    p_session_id UUID,
    p_score_version_id UUID,
    p_construct_scores JSONB
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_weights JSONB;
    v_output JSONB;
    v_standard_error NUMERIC := 2.5; 
    v_confidence_band JSONB := '{"lower": 0, "upper": 100}'::jsonb;
    v_checksum TEXT;
    v_log_id UUID;
    v_vital_score NUMERIC := 0.0;
    v_executed_by UUID;
BEGIN
    v_executed_by := auth.uid();

    -- Captura pesos
    SELECT COALESCE(jsonb_object_agg(construct_code, weight), '{}'::jsonb)
    INTO v_weights
    FROM public.construct_definitions
    WHERE score_version_id = p_score_version_id;

    -- Cálculo do motor central VitalScore (Stub agregador de constructos)
    v_output := jsonb_build_object(
        'vital_score', v_vital_score,
        'alert_band', 'Green'
    );
    
    v_checksum := md5(p_construct_scores::text || v_weights::text || p_score_version_id::text);
    
    -- Registro de log com métricas estatísticas
    INSERT INTO public.score_computation_logs (
        execution_type, score_version_id, session_id, inputs_used,
        weights_used, output_generated, standard_error, confidence_band,
        checksum, executed_by
    ) VALUES (
        'vitalscore_computation', p_score_version_id, p_session_id, p_construct_scores,
        v_weights, v_output, v_standard_error, v_confidence_band,
        v_checksum, v_executed_by
    ) RETURNING id INTO v_log_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'log_id', v_log_id,
        'output', v_output,
        'checksum', v_checksum
    );
END;
$$;

-- 3.3 recompute_vitalscore_by_version
CREATE OR REPLACE FUNCTION public.recompute_vitalscore_by_version(
    p_session_id UUID,
    p_target_score_version_id UUID
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_original_inputs JSONB;
    v_recomputed_constructs JSONB;
    v_recomputed_vitalscore JSONB;
BEGIN
    -- Busca os inputs crus originais que geraram os constructos
    SELECT inputs_used INTO v_original_inputs
    FROM public.score_computation_logs
    WHERE session_id = p_session_id AND execution_type = 'construct_computation'
    ORDER BY created_at ASC LIMIT 1;
    
    IF v_original_inputs IS NULL THEN
        RAISE EXCEPTION 'Original raw inputs not found for given session';
    END IF;
    
    -- 1. Recalcula os constructos usando a versão alvo
    v_recomputed_constructs := public.compute_construct_scores_v1(
        p_session_id, p_target_score_version_id, v_original_inputs
    );
    
    -- 2. Recalcula o VitalScore usando os novos constructos
    v_recomputed_vitalscore := public.compute_vitalscore_v1(
        p_session_id, p_target_score_version_id, v_recomputed_constructs->'output'
    );
    
    -- Flaggea os novos logs como recomputações longitudinais
    UPDATE public.score_computation_logs
    SET execution_type = 'recomputation'
    WHERE id IN (
        (v_recomputed_constructs->>'log_id')::UUID,
        (v_recomputed_vitalscore->>'log_id')::UUID
    );
    
    RETURN jsonb_build_object(
        'success', true,
        'session_id', p_session_id,
        'target_version_id', p_target_score_version_id,
        'vitalscore_data', v_recomputed_vitalscore
    );
END;
$$;

-- 3.4 register_validation_run
CREATE OR REPLACE FUNCTION public.register_validation_run(
    p_score_version_id UUID,
    p_run_name TEXT,
    p_dataset_size INTEGER,
    p_metrics JSONB,
    p_weights JSONB
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_run_id UUID;
BEGIN
    INSERT INTO public.score_calibration_runs (
        score_version_id, run_name, dataset_size, 
        calibration_metrics, weights_used, performed_by
    ) VALUES (
        p_score_version_id, p_run_name, p_dataset_size, 
        p_metrics, p_weights, auth.uid()
    ) RETURNING id INTO v_run_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'calibration_run_id', v_run_id
    );
END;
$$;

-- 3.5 compare_score_versions
CREATE OR REPLACE FUNCTION public.compare_score_versions(
    p_base_version_id UUID,
    p_target_version_id UUID
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_base_norms JSONB;
    v_target_norms JSONB;
    v_base_metrics JSONB;
    v_target_metrics JSONB;
BEGIN
    SELECT COALESCE(jsonb_agg(row_to_json(n)), '[]'::jsonb) INTO v_base_norms
    FROM public.score_norm_reference n WHERE n.score_version_id = p_base_version_id;
    
    SELECT COALESCE(jsonb_agg(row_to_json(n)), '[]'::jsonb) INTO v_target_norms
    FROM public.score_norm_reference n WHERE n.score_version_id = p_target_version_id;
    
    SELECT COALESCE(jsonb_agg(row_to_json(m)), '[]'::jsonb) INTO v_base_metrics
    FROM public.score_reliability_metrics m WHERE m.score_version_id = p_base_version_id;
    
    SELECT COALESCE(jsonb_agg(row_to_json(m)), '[]'::jsonb) INTO v_target_metrics
    FROM public.score_reliability_metrics m WHERE m.score_version_id = p_target_version_id;

    RETURN jsonb_build_object(
        'success', true,
        'comparison', jsonb_build_object(
            'base_version', jsonb_build_object('id', p_base_version_id, 'norms', v_base_norms, 'metrics', v_base_metrics),
            'target_version', jsonb_build_object('id', p_target_version_id, 'norms', v_target_norms, 'metrics', v_target_metrics)
        )
    );
END;
$$;


-- ==========================================
-- 4. POLÍTICAS DE SEGURANÇA (RLS)
-- ==========================================
DO $$
DECLARE
    t text;
    new_tables text[] := ARRAY[
        'score_versions', 'construct_definitions', 'score_calibration_runs', 
        'score_validation_studies', 'score_norm_reference', 'score_reliability_metrics', 
        'score_validity_metrics', 'score_sensitivity_analysis', 'score_computation_logs'
    ];
BEGIN
    FOREACH t IN ARRAY new_tables
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', t);
        
        EXECUTE format('DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Enable read access for authenticated users" ON public.%I FOR SELECT TO authenticated USING (true)', t);
        
        EXECUTE format('DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Enable insert access for authenticated users" ON public.%I FOR INSERT TO authenticated WITH CHECK (true)', t);
        
        EXECUTE format('DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Enable update access for authenticated users" ON public.%I FOR UPDATE TO authenticated USING (true)', t);
        
        EXECUTE format('DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON public.%I', t);
        EXECUTE format('CREATE POLICY "Enable delete access for authenticated users" ON public.%I FOR DELETE TO authenticated USING (true)', t);
    END LOOP;
END;
$$;
