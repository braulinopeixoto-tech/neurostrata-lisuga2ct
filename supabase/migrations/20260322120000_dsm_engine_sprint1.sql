-- Sprint 1: Motor DSM & Trust Layer (Encadeamento de Hashes)

-- 1. DSM Domains Table
CREATE TABLE IF NOT EXISTS public.dsm_domains (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Level1',
    rdoc_domain TEXT,
    neuro_unit TEXT,
    severity_weight NUMERIC DEFAULT 1.0,
    risk_flag BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Seed base configuration
INSERT INTO public.dsm_domains (id, name, rdoc_domain, neuro_unit, severity_weight, risk_flag) VALUES
('depression', 'Depressão', 'negative_valence', 'NU-D', 1.2, true),
('anger', 'Raiva', 'negative_valence', 'NU-R', 1.0, false),
('mania', 'Mania', 'positive_valence', 'NU-M', 1.3, true),
('anxiety', 'Ansiedade', 'negative_valence', 'NU-A', 1.2, true),
('somatic', 'Somático', 'arousal_regulation', 'NU-Som', 0.9, false),
('suicide', 'Suicidalidade', 'negative_valence', 'NU-SR', 2.0, true),
('psychosis', 'Psicose', 'cognitive_systems', 'NU-Psy', 2.0, true),
('sleep', 'Sono', 'arousal_regulation', 'NU-AR', 1.1, false),
('memory', 'Memória', 'cognitive_systems', 'NU-Mem', 1.0, false),
('repetitive', 'Repetitividade', 'cognitive_systems', 'NU-Rep', 1.0, false),
('dissociation', 'Dissociação', 'self_processing', 'NU-Dis', 1.2, true),
('personality', 'Funcionamento de Personalidade', 'self_processing', 'NU-Pers', 1.1, false),
('substance', 'Substâncias', 'positive_valence', 'NU-Sub', 1.5, true)
ON CONFLICT (id) DO NOTHING;

-- 2. Level 1 Form Questions
CREATE TABLE IF NOT EXISTS public.dsm_level1_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain_id TEXT NOT NULL REFERENCES public.dsm_domains(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    question_type TEXT DEFAULT 'likert_0_4',
    weight NUMERIC DEFAULT 1.0,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Trust Layer Extension (Audit Log)
ALTER TABLE public.audit_log ADD COLUMN IF NOT EXISTS previous_hash TEXT;
ALTER TABLE public.audit_log ADD COLUMN IF NOT EXISTS hash TEXT;

-- Update the Audit Trigger to enforce hash chaining
CREATE OR REPLACE FUNCTION public.neurostrata_audit_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_old_data JSONB;
  v_new_data JSONB;
  v_actor_id UUID;
  v_record_id UUID;
  v_prev_hash TEXT;
  v_current_hash TEXT;
BEGIN
  v_actor_id := auth.uid();
  
  -- Recupera o último hash para o encadeamento (block-chaining)
  SELECT hash INTO v_prev_hash FROM public.audit_log ORDER BY id DESC LIMIT 1;
  IF v_prev_hash IS NULL THEN
      v_prev_hash := 'genesis_block';
  END IF;
  
  IF (TG_OP = 'UPDATE') THEN
    v_old_data := to_jsonb(OLD);
    v_new_data := to_jsonb(NEW);
    EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
    
    v_current_hash := md5(v_prev_hash || COALESCE(v_actor_id::text, 'system') || TG_TABLE_NAME || v_record_id::text || TG_OP || v_new_data::text);
    
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data, new_data, previous_hash, hash)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data, v_new_data, v_prev_hash, v_current_hash);
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    v_old_data := to_jsonb(OLD);
    EXECUTE 'SELECT $1.id' USING OLD INTO v_record_id;
    
    v_current_hash := md5(v_prev_hash || COALESCE(v_actor_id::text, 'system') || TG_TABLE_NAME || v_record_id::text || TG_OP || v_old_data::text);
    
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, old_data, previous_hash, hash)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_old_data, v_prev_hash, v_current_hash);
    RETURN OLD;
  ELSIF (TG_OP = 'INSERT') THEN
    v_new_data := to_jsonb(NEW);
    EXECUTE 'SELECT $1.id' USING NEW INTO v_record_id;
    
    v_current_hash := md5(v_prev_hash || COALESCE(v_actor_id::text, 'system') || TG_TABLE_NAME || v_record_id::text || TG_OP || v_new_data::text);
    
    INSERT INTO public.audit_log (actor_profile_id, table_name, record_id, action, new_data, previous_hash, hash)
    VALUES (v_actor_id, TG_TABLE_NAME, v_record_id, TG_OP, v_new_data, v_prev_hash, v_current_hash);
    RETURN NEW;
  END IF;
  RETURN NULL;
EXCEPTION WHEN OTHERS THEN
  IF (TG_OP = 'UPDATE' OR TG_OP = 'INSERT') THEN RETURN NEW; END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS for new tables
ALTER TABLE public.dsm_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dsm_level1_questions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.dsm_domains;
CREATE POLICY "Enable read access for authenticated users" ON public.dsm_domains FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Enable read access for authenticated users" ON public.dsm_level1_questions;
CREATE POLICY "Enable read access for authenticated users" ON public.dsm_level1_questions FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON public.dsm_domains;
CREATE POLICY "Enable insert access for authenticated users" ON public.dsm_domains FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Enable update access for authenticated users" ON public.dsm_domains;
CREATE POLICY "Enable update access for authenticated users" ON public.dsm_domains FOR UPDATE TO authenticated USING (true);
