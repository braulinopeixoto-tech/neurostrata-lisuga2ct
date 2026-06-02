DO $$
BEGIN
  CREATE TABLE IF NOT EXISTS public.vitalscore_table (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id TEXT NOT NULL,
    vital_score NUMERIC NOT NULL,
    reserve_delta NUMERIC,
    reliability TEXT,
    version TEXT,
    hash TEXT,
    neuro NUMERIC,
    cognitive NUMERIC,
    emotional NUMERIC,
    metabolic NUMERIC,
    contextual NUMERIC,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS public.clinical_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id TEXT NOT NULL,
    description TEXT NOT NULL,
    impact TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );

  IF NOT EXISTS (SELECT 1 FROM public.vitalscore_table LIMIT 1) THEN
    INSERT INTO public.vitalscore_table (patient_id, vital_score, reserve_delta, reliability, version, hash, neuro, cognitive, emotional, metabolic, contextual)
    VALUES 
    ('1', 78, -2.5, 'Alta (High Density)', 'v2.1.0-rc', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', 78, 70, 55, 55, 45),
    ('2', 65, -5.0, 'Média', 'v2.1.0-rc', 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9', 60, 50, 40, 50, 45),
    ('P001', 82, 1.2, 'Alta', 'v2.1.0-rc', 'a1b2c3d4e5f6', 85, 80, 75, 70, 60);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.clinical_events LIMIT 1) THEN
    INSERT INTO public.clinical_events (patient_id, description, impact)
    VALUES 
    ('1', 'Ajuste Medicamentoso (ISRS)', 'Estabilização Emocional (+12%)'),
    ('1', 'Protocolo Nutricional Anti-inflamatório', 'Melhora Metabólica (+8%)'),
    ('2', 'Intervenção Comportamental', 'Estabilização Contextual (+5%)'),
    ('P001', 'Sessão de Neuromodulação', 'Aumento de Foco (+15%)');
  END IF;
END $$;

-- RLS Config
ALTER TABLE public.vitalscore_table ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "authenticated_select_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_select_vitalscore" ON public.vitalscore_table FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_insert_vitalscore" ON public.vitalscore_table FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_update_vitalscore" ON public.vitalscore_table FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_delete_vitalscore" ON public.vitalscore_table;
CREATE POLICY "authenticated_delete_vitalscore" ON public.vitalscore_table FOR DELETE TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_select_events" ON public.clinical_events;
CREATE POLICY "authenticated_select_events" ON public.clinical_events FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_insert_events" ON public.clinical_events;
CREATE POLICY "authenticated_insert_events" ON public.clinical_events FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_events" ON public.clinical_events;
CREATE POLICY "authenticated_update_events" ON public.clinical_events FOR UPDATE TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_delete_events" ON public.clinical_events;
CREATE POLICY "authenticated_delete_events" ON public.clinical_events FOR DELETE TO authenticated USING (true);
