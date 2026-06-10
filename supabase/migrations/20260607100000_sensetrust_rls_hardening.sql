create extension if not exists pgcrypto;

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  role text not null check (
    role in (
      'sensetrust_admin',
      'sensetrust_auditor',
      'sensetrust_clinician',
      'sensetrust_reviewer',
      'sensetrust_system',
      'sensetrust_service'
    )
  ),
  scope text not null default 'global',
  case_id text,
  active boolean not null default true,
  granted_by uuid,
  granted_at timestamptz not null default now(),
  revoked_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create unique index if not exists user_roles_user_role_scope_case_idx
  on public.user_roles(user_id, role, scope, coalesce(case_id, ''));

create index if not exists user_roles_user_active_idx
  on public.user_roles(user_id, active, role);

alter table public.user_roles enable row level security;

create or replace function public.has_sensetrust_role(required_roles text[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    coalesce(auth.role(), '') = 'service_role'
    or exists (
      select 1
      from public.user_roles ur
      where ur.user_id = auth.uid()
        and ur.active = true
        and ur.revoked_at is null
        and ur.role = any(required_roles)
    );
$$;

create or replace function public.is_sensetrust_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select public.has_sensetrust_role(array['sensetrust_admin']);
$$;

do $$
declare
  p record;
begin
  for p in
    select schemaname, tablename, policyname
    from pg_policies
    where schemaname = 'public'
      and tablename in (
        'user_roles',
        'evidence_objects',
        'clinical_commits',
        'audit_events',
        'trust_certificates',
        'report_versions',
        'consent_versions',
        'pipeline_versions',
        'verification_tokens',
        'prompt_versions',
        'codex_sessions',
        'decision_records',
        'obsidian_note_registry'
      )
  loop
    execute format('drop policy if exists %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

alter table public.evidence_objects enable row level security;
alter table public.clinical_commits enable row level security;
alter table public.audit_events enable row level security;
alter table public.trust_certificates enable row level security;
alter table public.report_versions enable row level security;
alter table public.consent_versions enable row level security;
alter table public.pipeline_versions enable row level security;
alter table public.verification_tokens enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.codex_sessions enable row level security;
alter table public.decision_records enable row level security;
alter table public.obsidian_note_registry enable row level security;

create policy user_roles_read_own_or_admin
  on public.user_roles
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_sensetrust_admin());

create policy user_roles_admin_insert
  on public.user_roles
  for insert
  to authenticated
  with check (public.is_sensetrust_admin());

create policy user_roles_admin_update
  on public.user_roles
  for update
  to authenticated
  using (public.is_sensetrust_admin())
  with check (public.is_sensetrust_admin());

create policy evidence_objects_role_read
  on public.evidence_objects
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer']));

create policy evidence_objects_role_insert
  on public.evidence_objects
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']));

create policy clinical_commits_role_read
  on public.clinical_commits
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer']));

create policy clinical_commits_role_insert
  on public.clinical_commits
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']));

create policy audit_events_role_read
  on public.audit_events
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor']));

create policy audit_events_role_insert
  on public.audit_events
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy trust_certificates_role_read
  on public.trust_certificates
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer']));

create policy trust_certificates_role_insert
  on public.trust_certificates
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy trust_certificates_role_update_status
  on public.trust_certificates
  for update
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy report_versions_role_read
  on public.report_versions
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer']));

create policy report_versions_role_insert
  on public.report_versions
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']));

create policy report_versions_role_update_unsigned
  on public.report_versions
  for update
  to authenticated
  using (
    status <> 'signed'
    and public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_reviewer', 'sensetrust_system', 'sensetrust_service'])
  )
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_reviewer', 'sensetrust_system', 'sensetrust_service']));

create policy consent_versions_role_read
  on public.consent_versions
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer']));

create policy consent_versions_role_insert
  on public.consent_versions
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']));

create policy consent_versions_role_update_status
  on public.consent_versions
  for update
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_clinician', 'sensetrust_system', 'sensetrust_service']));

create policy pipeline_versions_role_read
  on public.pipeline_versions
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer', 'sensetrust_system', 'sensetrust_service']));

create policy pipeline_versions_role_write
  on public.pipeline_versions
  for all
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy verification_tokens_role_read
  on public.verification_tokens
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_system', 'sensetrust_service']));

create policy verification_tokens_role_insert
  on public.verification_tokens
  for insert
  to authenticated
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy verification_tokens_role_update
  on public.verification_tokens
  for update
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy prompt_versions_role_read
  on public.prompt_versions
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_clinician', 'sensetrust_reviewer', 'sensetrust_system', 'sensetrust_service']));

create policy prompt_versions_role_write
  on public.prompt_versions
  for all
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy codex_sessions_role_read
  on public.codex_sessions
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_system', 'sensetrust_service']));

create policy codex_sessions_role_write
  on public.codex_sessions
  for all
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy decision_records_role_read
  on public.decision_records
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_system', 'sensetrust_service']));

create policy decision_records_role_write
  on public.decision_records
  for all
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create policy obsidian_note_registry_role_read
  on public.obsidian_note_registry
  for select
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_auditor', 'sensetrust_system', 'sensetrust_service']));

create policy obsidian_note_registry_role_write
  on public.obsidian_note_registry
  for all
  to authenticated
  using (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']))
  with check (public.has_sensetrust_role(array['sensetrust_admin', 'sensetrust_system', 'sensetrust_service']));

create or replace function public.verify_public_certificate(p_token text)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'is_valid',
      vt.status = 'active'
      and tc.status = 'active'
      and (vt.expires_at is null or vt.expires_at > now())
      and (tc.expires_at is null or tc.expires_at > now())
      and tc.revoked_at is null,
    'certificate_number', tc.certificate_number,
    'certificate_status', tc.status,
    'token_status', vt.status,
    'document_hash', vt.document_hash,
    'version_label', tc.version_label,
    'issuer', tc.issuer,
    'issued_at', tc.issued_at,
    'expires_at', coalesce(tc.expires_at, vt.expires_at),
    'revoked_at', tc.revoked_at,
    'verification_checked_at', now(),
    'public_payload', coalesce(vt.public_payload, '{}'::jsonb) - 'patient_name' - 'patient_document' - 'subject_ref' - 'case_id'
  )
  into result
  from public.verification_tokens vt
  join public.trust_certificates tc on tc.id = vt.certificate_id
  where vt.token = p_token
  limit 1;

  if result is null then
    return jsonb_build_object(
      'is_valid', false,
      'reason', 'token_not_found',
      'verification_checked_at', now()
    );
  end if;

  update public.verification_tokens
  set last_verified_at = now()
  where token = p_token;

  return result;
end;
$$;

grant execute on function public.verify_public_certificate(text) to anon, authenticated;

create or replace function public.prevent_audit_event_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'audit_events_is_append_only';
end;
$$;

drop trigger if exists audit_events_append_only_update on public.audit_events;
create trigger audit_events_append_only_update
before update on public.audit_events
for each row execute function public.prevent_audit_event_mutation();

drop trigger if exists audit_events_append_only_delete on public.audit_events;
create trigger audit_events_append_only_delete
before delete on public.audit_events
for each row execute function public.prevent_audit_event_mutation();

create or replace function public.prevent_signed_report_direct_edit()
returns trigger
language plpgsql
as $$
begin
  if old.status = 'signed' then
    raise exception 'signed_report_requires_amendment_or_new_version';
  end if;

  return new;
end;
$$;

drop trigger if exists report_versions_signed_lock on public.report_versions;
create trigger report_versions_signed_lock
before update on public.report_versions
for each row execute function public.prevent_signed_report_direct_edit();
