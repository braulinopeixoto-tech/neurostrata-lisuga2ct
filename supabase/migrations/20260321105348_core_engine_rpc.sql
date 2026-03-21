-- Migration: Core Engine RPC
-- Description: Implementação do pipeline funcional (Core Engine) via funções RPC no Supabase
-- para o ciclo de vida clínico: sessão -> respostas -> resultados -> VitalScore e auditoria.

-- ==============================================================================
-- 1. register_clinical_event
-- Registra eventos no ledger clínico (clinical_events) automaticamente em cada etapa
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.register_clinical_event(
    p_patient_case_id UUID,
    p_patient_id UUID,
    p_event_type TEXT,
    p_source_table TEXT,
    p_source_record_id UUID,
    p_payload JSONB DEFAULT '{}'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_event_id UUID;
    v_performed_by UUID;
BEGIN
    v_performed_by := auth.uid();
    
    INSERT INTO public.clinical_events (
        patient_case_id,
        patient_id,
        event_type,
        performed_by,
        source_table,
        source_record_id,
        payload
    ) VALUES (
        p_patient_case_id,
        p_patient_id,
        p_event_type,
        v_performed_by,
        p_source_table,
        p_source_record_id,
        p_payload
    ) RETURNING id INTO v_event_id;
    
    RETURN jsonb_build_object(
        'success', true,
        'event_id', v_event_id
    );
END;
$$;

-- ==============================================================================
-- 2. create_assessment_session_full
-- Cria a sessão de avaliação e vincula as entidades clínicas
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.create_assessment_session_full(
    p_patient_case_id UUID,
    p_instrument_version_id UUID,
    p_applicator_id UUID,
    p_supervisor_id UUID,
    p_organization_unit_id UUID,
    p_source_channel TEXT DEFAULT 'web'
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_patient_id UUID;
    v_organization_id UUID;
    v_session_id UUID;
BEGIN
    -- Obtém o ID do paciente a partir do caso
    SELECT patient_id INTO v_patient_id
    FROM public.patient_cases
    WHERE id = p_patient_case_id;
    
    IF v_patient_id IS NULL THEN
        RAISE EXCEPTION 'Patient case not found';
    END IF;

    -- Obtém a organização a partir da unidade
    SELECT organization_id INTO v_organization_id
    FROM public.organization_units
    WHERE id = p_organization_unit_id;
    
    IF v_organization_id IS NULL THEN
        RAISE EXCEPTION 'Organization unit not found';
    END IF;

    -- Insere a nova sessão
    INSERT INTO public.assessment_sessions (
        patient_case_id,
        patient_id,
        organization_id,
        organization_unit_id,
        instrument_version_id,
        applicator_id,
        supervisor_id,
        source_channel,
        session_status
    ) VALUES (
        p_patient_case_id,
        v_patient_id,
        v_organization_id,
        p_organization_unit_id,
        p_instrument_version_id,
        p_applicator_id,
        p_supervisor_id,
        p_source_channel,
        'in_progress'
    ) RETURNING id INTO v_session_id;

    -- Registra na trilha de eventos clínicos
    PERFORM public.register_clinical_event(
        p_patient_case_id,
        v_patient_id,
        'assessment_session_started',
        'assessment_sessions',
        v_session_id,
        jsonb_build_object('instrument_version_id', p_instrument_version_id)
    );

    RETURN jsonb_build_object(
        'success', true,
        'session_id', v_session_id
    );
END;
$$;

-- ==============================================================================
-- 3. insert_assessment_responses_batch
-- Inserção em lote de respostas com idempotência
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.insert_assessment_responses_batch(
    p_session_id UUID,
    p_responses JSONB
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_answered_by UUID;
    v_response JSONB;
    v_count INT := 0;
    v_patient_case_id UUID;
    v_patient_id UUID;
BEGIN
    v_answered_by := auth.uid();
    
    -- Verifica se a sessão existe e está em andamento
    SELECT patient_case_id, patient_id INTO v_patient_case_id, v_patient_id
    FROM public.assessment_sessions
    WHERE id = p_session_id AND session_status = 'in_progress';
    
    IF v_patient_case_id IS NULL THEN
        RAISE EXCEPTION 'Session not found or not in progress';
    END IF;

    -- Itera sobre o JSON array e insere ou atualiza as respostas (idempotente)
    FOR v_response IN SELECT * FROM jsonb_array_elements(p_responses)
    LOOP
        INSERT INTO public.assessment_responses (
            assessment_session_id,
            instrument_item_id,
            response_numeric,
            response_text,
            response_boolean,
            response_json,
            answered_by,
            source
        ) VALUES (
            p_session_id,
            (v_response->>'instrument_item_id')::UUID,
            (v_response->>'response_numeric')::NUMERIC,
            v_response->>'response_text',
            (v_response->>'response_boolean')::BOOLEAN,
            v_response->'response_json',
            v_answered_by,
            v_response->>'source'
        )
        ON CONFLICT (assessment_session_id, instrument_item_id)
        DO UPDATE SET
            response_numeric = EXCLUDED.response_numeric,
            response_text = EXCLUDED.response_text,
            response_boolean = EXCLUDED.response_boolean,
            response_json = EXCLUDED.response_json,
            answered_at = NOW(),
            answered_by = EXCLUDED.answered_by,
            source = EXCLUDED.source;
            
        v_count := v_count + 1;
    END LOOP;
    
    -- Registra o evento de inserção de respostas
    PERFORM public.register_clinical_event(
        v_patient_case_id,
        v_patient_id,
        'assessment_responses_batch_inserted',
        'assessment_sessions',
        p_session_id,
        jsonb_build_object('responses_count', v_count)
    );

    RETURN jsonb_build_object(
        'success', true,
        'responses_processed', v_count
    );
END;
$$;

-- ==============================================================================
-- 4. generate_assessment_result
-- Aplica regra de score, calcula constructos e o checksum
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.generate_assessment_result(
    p_session_id UUID,
    p_rule_set_id UUID,
    p_result_json JSONB,
    p_summary_text TEXT DEFAULT NULL,
    p_severity_label TEXT DEFAULT NULL,
    p_construct_scores JSONB DEFAULT '[]'::jsonb
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_generated_by UUID;
    v_result_id UUID;
    v_patient_case_id UUID;
    v_patient_id UUID;
    v_score JSONB;
    v_checksum TEXT;
BEGIN
    v_generated_by := auth.uid();
    
    -- Fecha a sessão
    UPDATE public.assessment_sessions
    SET session_status = 'completed', completed_at = NOW()
    WHERE id = p_session_id AND session_status != 'completed'
    RETURNING patient_case_id, patient_id INTO v_patient_case_id, v_patient_id;
    
    -- Fallback caso a sessão já estivesse concluída
    IF v_patient_case_id IS NULL THEN
        SELECT patient_case_id, patient_id INTO v_patient_case_id, v_patient_id
        FROM public.assessment_sessions
        WHERE id = p_session_id;
    END IF;

    -- Gera um checksum simples da operação 
    v_checksum := md5(p_result_json::text || p_rule_set_id::text || p_session_id::text);

    -- Insere o resultado final da avaliação
    INSERT INTO public.assessment_results (
        assessment_session_id,
        rule_set_id,
        generated_by,
        severity_label,
        summary_text,
        result_json,
        result_checksum,
        is_final
    ) VALUES (
        p_session_id,
        p_rule_set_id,
        v_generated_by,
        p_severity_label,
        p_summary_text,
        p_result_json,
        v_checksum,
        true
    )
    ON CONFLICT (assessment_session_id)
    DO UPDATE SET
        rule_set_id = EXCLUDED.rule_set_id,
        generated_at = NOW(),
        generated_by = EXCLUDED.generated_by,
        severity_label = EXCLUDED.severity_label,
        summary_text = EXCLUDED.summary_text,
        result_json = EXCLUDED.result_json,
        result_checksum = EXCLUDED.result_checksum,
        is_final = EXCLUDED.is_final
    RETURNING id INTO v_result_id;
    
    -- Reinsere os scores dos constructos taxonômicos
    DELETE FROM public.assessment_result_construct_scores WHERE assessment_result_id = v_result_id;
    
    FOR v_score IN SELECT * FROM jsonb_array_elements(p_construct_scores)
    LOOP
        INSERT INTO public.assessment_result_construct_scores (
            assessment_result_id,
            taxonomy_construct_id,
            raw_score,
            normalized_score,
            percentile,
            risk_band,
            interpretation
        ) VALUES (
            v_result_id,
            (v_score->>'taxonomy_construct_id')::UUID,
            (v_score->>'raw_score')::NUMERIC,
            (v_score->>'normalized_score')::NUMERIC,
            (v_score->>'percentile')::NUMERIC,
            v_score->>'risk_band',
            v_score->>'interpretation'
        );
    END LOOP;

    -- Registra na trilha de auditoria clínica
    PERFORM public.register_clinical_event(
        v_patient_case_id,
        v_patient_id,
        'assessment_result_generated',
        'assessment_results',
        v_result_id,
        jsonb_build_object('rule_set_id', p_rule_set_id, 'severity', p_severity_label)
    );

    RETURN jsonb_build_object(
        'success', true,
        'assessment_result_id', v_result_id,
        'checksum', v_checksum
    );
END;
$$;

-- ==============================================================================
-- 5. generate_vital_score
-- Consolida o VitalScore, desativa os anteriores e mantém o histórico seguro
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.generate_vital_score(
    p_patient_case_id UUID,
    p_assessment_result_id UUID,
    p_vital_score NUMERIC,
    p_score_band TEXT,
    p_score_version TEXT,
    p_score_components_json JSONB,
    p_score_date DATE DEFAULT CURRENT_DATE
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_patient_id UUID;
    v_vital_score_id UUID;
BEGIN
    -- Resgata o id do paciente
    SELECT patient_id INTO v_patient_id
    FROM public.patient_cases
    WHERE id = p_patient_case_id;
    
    IF v_patient_id IS NULL THEN
        RAISE EXCEPTION 'Patient case not found';
    END IF;

    -- Revoga o status de "current" dos scores anteriores deste caso
    UPDATE public.vital_scores
    SET is_current = false
    WHERE patient_case_id = p_patient_case_id AND is_current = true;

    -- Cria o novo snapshot do VitalScore atual
    INSERT INTO public.vital_scores (
        patient_case_id,
        patient_id,
        assessment_result_id,
        score_date,
        vital_score,
        score_band,
        score_version,
        score_components_json,
        is_current
    ) VALUES (
        p_patient_case_id,
        v_patient_id,
        p_assessment_result_id,
        p_score_date,
        p_vital_score,
        p_score_band,
        p_score_version,
        p_score_components_json,
        true
    ) RETURNING id INTO v_vital_score_id;

    -- Audita o evento clínico do score atualizado
    PERFORM public.register_clinical_event(
        p_patient_case_id,
        v_patient_id,
        'vital_score_generated',
        'vital_scores',
        v_vital_score_id,
        jsonb_build_object('vital_score', p_vital_score, 'score_band', p_score_band)
    );

    RETURN jsonb_build_object(
        'success', true,
        'vital_score_id', v_vital_score_id
    );
END;
$$;
