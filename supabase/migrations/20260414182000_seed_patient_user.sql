DO $DO_BLOCK$
DECLARE
  v_user_id uuid;
  v_org_id uuid;
BEGIN
  -- Get or create an organization
  SELECT id INTO v_org_id FROM public.organizations LIMIT 1;
  IF v_org_id IS NULL THEN
    v_org_id := gen_random_uuid();
    INSERT INTO public.organizations (id, legal_name, organization_type) 
    VALUES (v_org_id, 'NeuroStrata Institute', 'clinic');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'braulinopeixoto@gmail.com') THEN
    v_user_id := gen_random_uuid();
    INSERT INTO auth.users (
      id, instance_id, email, encrypted_password, email_confirmed_at,
      created_at, updated_at, raw_app_meta_data, raw_user_meta_data,
      is_super_admin, role, aud,
      confirmation_token, recovery_token, email_change_token_new,
      email_change, email_change_token_current,
      phone, phone_change, phone_change_token, reauthentication_token
    ) VALUES (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'braulinopeixoto@gmail.com',
      crypt('Skip@Pass123', gen_salt('bf')),
      NOW(), NOW(), NOW(),
      '{"provider": "email", "providers": ["email"]}',
      '{"name": "Braulino Peixoto"}',
      false, 'authenticated', 'authenticated',
      '', '', '', '', '', NULL, '', '', ''
    );
  ELSE
    SELECT id INTO v_user_id FROM auth.users WHERE email = 'braulinopeixoto@gmail.com' LIMIT 1;
  END IF;

  -- Ensure this user is a patient
  IF NOT EXISTS (SELECT 1 FROM public.patients WHERE email = 'braulinopeixoto@gmail.com') THEN
    INSERT INTO public.patients (id, organization_id, full_name, email, status) 
    VALUES (gen_random_uuid(), v_org_id, 'Braulino Peixoto (Paciente)', 'braulinopeixoto@gmail.com', 'active');
  END IF;
  
  -- Create a profile for the user
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (v_user_id, 'Braulino Peixoto', 'braulinopeixoto@gmail.com')
  ON CONFLICT (id) DO NOTHING;

END $DO_BLOCK$;
