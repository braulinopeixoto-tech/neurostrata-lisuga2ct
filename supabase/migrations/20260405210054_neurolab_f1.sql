CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  -- Create Neurolab Protocols
  CREATE TABLE IF NOT EXISTS public.neurolab_protocols (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT NOT NULL,
    version INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    hypothesis_primary TEXT,
    hypothesis_secondary TEXT,
    rdoc_domain TEXT,
    neural_network_target TEXT,
    coordinates_mni TEXT,
    biomarkers_expected JSONB DEFAULT '{}'::jsonb,
    success_criteria_clinical TEXT,
    success_criteria_statistical TEXT,
    risk_level TEXT,
    off_label_flag BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'draft',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (code, version)
  );

  -- Create Neurolab Trials
  CREATE TABLE IF NOT EXISTS public.neurolab_trials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_id UUID NOT NULL REFERENCES public.neurolab_protocols(id),
    patient_case_id UUID NOT NULL REFERENCES public.patient_cases(id),
    investigator_id UUID REFERENCES public.professionals(id),
    status TEXT DEFAULT 'pending_consent',
    tcle_signed BOOLEAN DEFAULT false,
    ethics_approval_status TEXT DEFAULT 'pending',
    ethics_approval_doc TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create Neurolab Trial Stages (Baseline, Intervention, Post)
  CREATE TABLE IF NOT EXISTS public.neurolab_trial_stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trial_id UUID NOT NULL REFERENCES public.neurolab_trials(id) ON DELETE CASCADE,
    stage_type TEXT NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    analytics JSONB DEFAULT '{}'::jsonb,
    hash_sha256 TEXT,
    digital_signature TEXT,
    recorded_by UUID REFERENCES auth.users(id),
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  -- Create Neurolab Audit Ledger
  CREATE TABLE IF NOT EXISTS public.neurolab_audit_ledger (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trial_id UUID REFERENCES public.neurolab_trials(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    payload JSONB NOT NULL,
    previous_hash TEXT,
    hash_sha256 TEXT NOT NULL,
    actor_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

END $$;

-- Set up RLS
ALTER TABLE public.neurolab_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_trials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_trial_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.neurolab_audit_ledger ENABLE ROW LEVEL SECURITY;

-- Create Policies
DROP POLICY IF EXISTS "authenticated_select_nl_protocols" ON public.neurolab_protocols;
CREATE POLICY "authenticated_select_nl_protocols" ON public.neurolab_protocols FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "authenticated_insert_nl_protocols" ON public.neurolab_protocols;
CREATE POLICY "authenticated_insert_nl_protocols" ON public.neurolab_protocols FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "authenticated_update_nl_protocols" ON public.neurolab_protocols;
CREATE POLICY "authenticated_update_nl_protocols" ON public.neurolab_protocols FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_nl_trials" ON public.neurolab_trials;
CREATE POLICY "authenticated_select_nl_trials" ON public.neurolab_trials FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "authenticated_insert_nl_trials" ON public.neurolab_trials;
CREATE POLICY "authenticated_insert_nl_trials" ON public.neurolab_trials FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "authenticated_update_nl_trials" ON public.neurolab_trials;
CREATE POLICY "authenticated_update_nl_trials" ON public.neurolab_trials FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_nl_stages" ON public.neurolab_trial_stages;
CREATE POLICY "authenticated_select_nl_stages" ON public.neurolab_trial_stages FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "authenticated_insert_nl_stages" ON public.neurolab_trial_stages;
CREATE POLICY "authenticated_insert_nl_stages" ON public.neurolab_trial_stages FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "authenticated_update_nl_stages" ON public.neurolab_trial_stages;
CREATE POLICY "authenticated_update_nl_stages" ON public.neurolab_trial_stages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_nl_ledger" ON public.neurolab_audit_ledger;
CREATE POLICY "authenticated_select_nl_ledger" ON public.neurolab_audit_ledger FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "authenticated_insert_nl_ledger" ON public.neurolab_audit_ledger;
CREATE POLICY "authenticated_insert_nl_ledger" ON public.neurolab_audit_ledger FOR INSERT TO authenticated WITH CHECK (true);

-- Create Audit Trigger Function for Neurolab
CREATE OR REPLACE FUNCTION public.neurolab_audit_trigger_fn()
RETURNS trigger AS $func$
DECLARE
  v_actor_id UUID;
  v_prev_hash TEXT;
  v_current_hash TEXT;
  v_payload JSONB;
  v_trial_id UUID;
BEGIN
  v_actor_id := auth.uid();
  
  -- Get previous hash
  SELECT hash_sha256 INTO v_prev_hash FROM public.neurolab_audit_ledger ORDER BY created_at DESC LIMIT 1;
  IF v_prev_hash IS NULL THEN
    v_prev_hash := 'genesis';
  END IF;

  IF (TG_OP = 'DELETE') THEN
    v_payload := to_jsonb(OLD);
  ELSE
    v_payload := to_jsonb(NEW);
  END IF;

  -- Try to extract trial_id if available
  BEGIN
    IF TG_TABLE_NAME = 'neurolab_trials' THEN
      v_trial_id := (v_payload->>'id')::UUID;
    ELSIF v_payload ? 'trial_id' THEN
      v_trial_id := (v_payload->>'trial_id')::UUID;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    v_trial_id := NULL;
  END;

  v_current_hash := encode(digest(v_prev_hash || TG_TABLE_NAME || TG_OP || v_payload::text, 'sha256'), 'hex');

  INSERT INTO public.neurolab_audit_ledger (
    trial_id, action, table_name, record_id, payload, previous_hash, hash_sha256, actor_id
  ) VALUES (
    v_trial_id, TG_OP, TG_TABLE_NAME, COALESCE((v_payload->>'id')::UUID, gen_random_uuid()), v_payload, v_prev_hash, v_current_hash, v_actor_id
  );

  IF (TG_OP = 'DELETE') THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$func$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach Triggers
DROP TRIGGER IF EXISTS trg_audit_neurolab_protocols ON public.neurolab_protocols;
CREATE TRIGGER trg_audit_neurolab_protocols AFTER INSERT OR UPDATE ON public.neurolab_protocols FOR EACH ROW EXECUTE FUNCTION public.neurolab_audit_trigger_fn();

DROP TRIGGER IF EXISTS trg_audit_neurolab_trials ON public.neurolab_trials;
CREATE TRIGGER trg_audit_neurolab_trials AFTER INSERT OR UPDATE ON public.neurolab_trials FOR EACH ROW EXECUTE FUNCTION public.neurolab_audit_trigger_fn();

DROP TRIGGER IF EXISTS trg_audit_neurolab_trial_stages ON public.neurolab_trial_stages;
CREATE TRIGGER trg_audit_neurolab_trial_stages AFTER INSERT OR UPDATE ON public.neurolab_trial_stages FOR EACH ROW EXECUTE FUNCTION public.neurolab_audit_trigger_fn();

-- Create Analytics helper
CREATE OR REPLACE FUNCTION public.compute_neurolab_effect_size(p_baseline numeric, p_post numeric, p_sd numeric)
RETURNS numeric
LANGUAGE plpgsql
AS $func$
BEGIN
    IF p_sd = 0 OR p_sd IS NULL THEN
        RETURN 0;
    END IF;
    RETURN round((p_post - p_baseline) / p_sd, 3);
END;
$func$;
