DO $$
DECLARE
  new_user_id uuid;
  new_org_id uuid;
  new_org_unit_id uuid;
  new_patient_id uuid;
  new_case_id uuid;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'braulinopeixoto@gmail.com') THEN
    new_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      new_user_id,
      '00000000-0000-0000-0000-000000000000',
      'braulinopeixoto@gmail.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Braulino Peixoto"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );

    INSERT INTO public.profiles (id, email, full_name, is_active)
    VALUES (new_user_id, 'braulinopeixoto@gmail.com', 'Braulino Peixoto', true)
    ON CONFLICT (id) DO NOTHING;

    -- Seed Organization
    new_org_id := gen_random_uuid();
    INSERT INTO public.organizations (id, legal_name, organization_type, is_active)
    VALUES (new_org_id, 'NeuroStrata Clinic', 'clinic', true);

    -- Seed Organization Unit
    new_org_unit_id := gen_random_uuid();
    INSERT INTO public.organization_units (id, organization_id, name, unit_type, is_active)
    VALUES (new_org_unit_id, new_org_id, 'Matriz', 'headquarters', true);

    -- Seed Patient
    new_patient_id := gen_random_uuid();
    INSERT INTO public.patients (id, organization_id, full_name, email, document_number, status)
    VALUES (new_patient_id, new_org_id, 'Braulino Peixoto', 'braulinopeixoto@gmail.com', '12345678900', 'active');

    -- Seed Patient Case
    new_case_id := gen_random_uuid();
    INSERT INTO public.patient_cases (id, patient_id, organization_unit_id, opened_by, case_status)
    VALUES (new_case_id, new_patient_id, new_org_unit_id, new_user_id, 'open');

    -- Seed Vital Scores (History for Biogram)
    INSERT INTO public.vital_scores (patient_case_id, patient_id, score_date, vital_score, score_band, score_version, score_components_json, is_current)
    VALUES 
      (new_case_id, new_patient_id, CURRENT_DATE - INTERVAL '60 days', 70, 'Yellow', '1.0.0', '{"cognition": 75, "emotion": 65, "physiology": 70, "sleep": 60, "stress": 50}', false),
      (new_case_id, new_patient_id, CURRENT_DATE - INTERVAL '30 days', 75, 'Green', '1.0.0', '{"cognition": 80, "emotion": 70, "physiology": 75, "sleep": 70, "stress": 40}', false),
      (new_case_id, new_patient_id, CURRENT_DATE, 82, 'Green', '1.0.0', '{"cognition": 85, "emotion": 80, "physiology": 85, "sleep": 80, "stress": 20}', true);
  END IF;
END $$;

-- RLS Policies to allow patient to read their own data based on email
DROP POLICY IF EXISTS "patient_read_own" ON public.patients;
CREATE POLICY "patient_read_own" ON public.patients
  FOR SELECT TO authenticated USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "patient_read_own_vital_scores" ON public.vital_scores;
CREATE POLICY "patient_read_own_vital_scores" ON public.vital_scores
  FOR SELECT TO authenticated USING (patient_id IN (SELECT id FROM public.patients WHERE email = (SELECT email FROM auth.users WHERE id = auth.uid())));
