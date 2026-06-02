CREATE TABLE IF NOT EXISTS public.vitalscore_table (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  vital_score NUMERIC NOT NULL DEFAULT 0,
  reserve_delta NUMERIC NOT NULL DEFAULT 0,
  reliability TEXT NOT NULL DEFAULT 'Alta',
  version TEXT NOT NULL DEFAULT '1.0.0',
  hash TEXT NOT NULL DEFAULT 'n/a',
  neuro NUMERIC NOT NULL DEFAULT 0,
  cognitive NUMERIC NOT NULL DEFAULT 0,
  emotional NUMERIC NOT NULL DEFAULT 0,
  metabolic NUMERIC NOT NULL DEFAULT 0,
  contextual NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.clinical_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id TEXT NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.vitalscore_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_select_vitalscore" ON public.vitalscore_table FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_insert_vitalscore" ON public.vitalscore_table FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_select_events" ON public.clinical_events;
CREATE POLICY "authenticated_select_events" ON public.clinical_events FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_events" ON public.clinical_events;
CREATE POLICY "authenticated_insert_events" ON public.clinical_events FOR INSERT TO authenticated WITH CHECK (true);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.vitalscore_table WHERE patient_id = '1') THEN
    INSERT INTO public.vitalscore_table (patient_id, vital_score, reserve_delta, reliability, version, hash, neuro, cognitive, emotional, metabolic, contextual)
    VALUES ('1', 78, -2.5, 'Alta (High Density)', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j0', 78, 70, 55, 55, 45);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM public.clinical_events WHERE patient_id = '1') THEN
    INSERT INTO public.clinical_events (patient_id, description, impact)
    VALUES 
    ('1', 'Ajuste Medicamentoso (ISRS)', 'Estabilização Emocional (+12%)'),
    ('1', 'Protocolo Nutricional Anti-inflamatório', 'Melhora Metabólica (+8%)');
  END IF;
END $$;
