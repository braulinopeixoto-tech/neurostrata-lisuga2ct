-- Enable RLS and add basic policies to ensure data is accessible
DO $$
BEGIN
  -- We don't drop/recreate all policies if we don't know them, just ensure authenticated users can read/write for now
  -- on vital_scores and clinical_events.
END $$;

DROP POLICY IF EXISTS "auth_read_vital_scores" ON public.vital_scores;
CREATE POLICY "auth_read_vital_scores" ON public.vital_scores FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_vital_scores" ON public.vital_scores;
CREATE POLICY "auth_insert_vital_scores" ON public.vital_scores FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_vital_scores" ON public.vital_scores;
CREATE POLICY "auth_update_vital_scores" ON public.vital_scores FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_vital_scores" ON public.vital_scores;
CREATE POLICY "auth_delete_vital_scores" ON public.vital_scores FOR DELETE TO authenticated USING (true);


DROP POLICY IF EXISTS "auth_read_clinical_events" ON public.clinical_events;
CREATE POLICY "auth_read_clinical_events" ON public.clinical_events FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_clinical_events" ON public.clinical_events;
CREATE POLICY "auth_insert_clinical_events" ON public.clinical_events FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_clinical_events" ON public.clinical_events;
CREATE POLICY "auth_update_clinical_events" ON public.clinical_events FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_clinical_events" ON public.clinical_events;
CREATE POLICY "auth_delete_clinical_events" ON public.clinical_events FOR DELETE TO authenticated USING (true);


DROP POLICY IF EXISTS "auth_read_patients" ON public.patients;
CREATE POLICY "auth_read_patients" ON public.patients FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_patients" ON public.patients;
CREATE POLICY "auth_insert_patients" ON public.patients FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_patient_cases" ON public.patient_cases;
CREATE POLICY "auth_read_patient_cases" ON public.patient_cases FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_patient_cases" ON public.patient_cases;
CREATE POLICY "auth_insert_patient_cases" ON public.patient_cases FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_organizations" ON public.organizations;
CREATE POLICY "auth_read_organizations" ON public.organizations FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_organizations" ON public.organizations;
CREATE POLICY "auth_insert_organizations" ON public.organizations FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_organization_units" ON public.organization_units;
CREATE POLICY "auth_read_organization_units" ON public.organization_units FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_organization_units" ON public.organization_units;
CREATE POLICY "auth_insert_organization_units" ON public.organization_units FOR INSERT TO authenticated WITH CHECK (true);

-- Seed basic patient if none exist to allow testing
DO $$
DECLARE
  v_org_id uuid;
  v_patient_id uuid;
  v_org_unit_id uuid;
BEGIN
  -- Get or create an organization
  SELECT id INTO v_org_id FROM public.organizations LIMIT 1;
  IF v_org_id IS NULL THEN
    v_org_id := gen_random_uuid();
    INSERT INTO public.organizations (id, legal_name, organization_type) 
    VALUES (v_org_id, 'NeuroStrata Institute', 'clinic');
  END IF;

  -- Get or create an organization unit
  SELECT id INTO v_org_unit_id FROM public.organization_units WHERE organization_id = v_org_id LIMIT 1;
  IF v_org_unit_id IS NULL THEN
    v_org_unit_id := gen_random_uuid();
    INSERT INTO public.organization_units (id, organization_id, name, unit_type) 
    VALUES (v_org_unit_id, v_org_id, 'Unidade Central', 'headquarters');
  END IF;

  -- Ensure at least one patient exists
  IF NOT EXISTS (SELECT 1 FROM public.patients) THEN
    v_patient_id := gen_random_uuid();
    INSERT INTO public.patients (id, organization_id, full_name, status) 
    VALUES (v_patient_id, v_org_id, 'Paciente Teste VitalStrata', 'active');
  END IF;
END $$;
