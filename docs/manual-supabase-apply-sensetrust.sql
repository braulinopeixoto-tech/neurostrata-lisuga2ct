-- Manual Supabase Apply - SenseTrust
-- Project ref: yponblaeampkodzjrjko
-- Generated because npx/supabase CLI is not available in this local environment.
-- This file contains SQL text, not file paths as executable SQL.

-- ============================================================
-- BEGIN MIGRATION: supabase\migrations\20260606120000_sensetrust_layer.sql
-- ============================================================
create extension if not exists pgcrypto;

do $$
begin
  create type public.trust_certificate_status as enum ('active', 'amended', 'revoked', 'expired');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.report_version_status as enum ('draft', 'reviewed', 'signed', 'amended', 'revoked');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.verification_token_status as enum ('active', 'revoked', 'expired');
exception
  when duplicate_object then null;
end $$;

create table if not exists public.evidence_objects (
  id uuid primary key default gen_random_uuid(),
  case_id text not null,
  object_type text not null,
  storage_path text not null,
  file_name text,
  mime_type text,
  sha256_hash text not null check (sha256_hash ~ '^[a-f0-9]{64}$'),
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  source_system text not null default 'neurostrata',
  pseudonymized_subject_ref text,
  metadata jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (case_id, sha256_hash)
);

create table if not exists public.clinical_commits (
  id uuid primary key default gen_random_uuid(),
  case_id text not null,
  parent_commit_id uuid references public.clinical_commits(id),
  commit_hash text not null unique check (commit_hash ~ '^[a-f0-9]{64}$'),
  reason text not null,
  diff_json jsonb not null default '{}'::jsonb,
  evidence_manifest jsonb not null default '{}'::jsonb,
  actor_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  resource text not null,
  resource_hash text check (resource_hash is null or resource_hash ~ '^[a-f0-9]{64}$'),
  reason text,
  ip_address inet,
  user_agent text,
  fhir_audit_event jsonb not null default '{}'::jsonb,
  previous_event_hash text check (previous_event_hash is null or previous_event_hash ~ '^[a-f0-9]{64}$'),
  event_hash text not null unique check (event_hash ~ '^[a-f0-9]{64}$'),
  created_at timestamptz not null default now()
);

create table if not exists public.report_versions (
  id uuid primary key default gen_random_uuid(),
  case_id text not null,
  document_id uuid not null default gen_random_uuid(),
  version_number integer not null check (version_number > 0),
  status public.report_version_status not null default 'draft',
  document_hash text check (document_hash is null or document_hash ~ '^[a-f0-9]{64}$'),
  evidence_manifest jsonb not null default '{}'::jsonb,
  clinical_commit_id uuid references public.clinical_commits(id),
  amended_from_id uuid references public.report_versions(id),
  locked_at timestamptz,
  signed_by uuid,
  signed_at timestamptz,
  public_metadata jsonb not null default '{}'::jsonb,
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (case_id, version_number)
);

create table if not exists public.consent_versions (
  id uuid primary key default gen_random_uuid(),
  case_id text not null,
  subject_ref text not null,
  consent_type text not null,
  version_number integer not null check (version_number > 0),
  status text not null default 'active',
  consent_hash text not null check (consent_hash ~ '^[a-f0-9]{64}$'),
  scope_json jsonb not null default '{}'::jsonb,
  supersedes_id uuid references public.consent_versions(id),
  signed_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  unique (case_id, consent_type, version_number)
);

create table if not exists public.pipeline_versions (
  id uuid primary key default gen_random_uuid(),
  pipeline_key text not null,
  version_label text not null,
  status text not null default 'active',
  config_hash text not null check (config_hash ~ '^[a-f0-9]{64}$'),
  model_manifest jsonb not null default '{}'::jsonb,
  prompt_manifest jsonb not null default '{}'::jsonb,
  released_by uuid,
  released_at timestamptz not null default now(),
  retired_at timestamptz,
  unique (pipeline_key, version_label)
);

create table if not exists public.prompt_versions (
  id uuid primary key default gen_random_uuid(),
  prompt_key text not null,
  version_label text not null,
  status text not null default 'draft',
  prompt_hash text not null check (prompt_hash ~ '^[a-f0-9]{64}$'),
  model_family text,
  intended_use text not null,
  safety_rules jsonb not null default '[]'::jsonb,
  output_schema jsonb not null default '{}'::jsonb,
  evidence_manifest jsonb not null default '{}'::jsonb,
  approved_by uuid,
  approved_at timestamptz,
  supersedes_id uuid references public.prompt_versions(id),
  created_by uuid,
  created_at timestamptz not null default now(),
  unique (prompt_key, version_label)
);

create table if not exists public.codex_sessions (
  id uuid primary key default gen_random_uuid(),
  session_key text not null unique,
  project_key text not null default 'neurostrata-vitalstrata',
  module text not null default 'SenseTrust',
  objective text not null,
  actor text not null default 'codex',
  status text not null default 'open',
  git_branch text,
  git_commit_sha text,
  changed_files jsonb not null default '[]'::jsonb,
  obsidian_note_path text,
  decision_record_id uuid,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb
);

create table if not exists public.decision_records (
  id uuid primary key default gen_random_uuid(),
  decision_key text not null unique,
  adr_code text not null unique,
  title text not null,
  status text not null default 'proposed',
  scope text not null,
  decision_text text not null,
  rationale text not null,
  risks jsonb not null default '[]'::jsonb,
  alternatives jsonb not null default '[]'::jsonb,
  supersedes_id uuid references public.decision_records(id),
  codex_session_id uuid references public.codex_sessions(id),
  obsidian_note_path text,
  created_by text not null default 'codex',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.codex_sessions
  drop constraint if exists codex_sessions_decision_record_id_fkey;

alter table public.codex_sessions
  add constraint codex_sessions_decision_record_id_fkey
  foreign key (decision_record_id) references public.decision_records(id);

create table if not exists public.verification_tokens (
  id uuid primary key default gen_random_uuid(),
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  certificate_id uuid,
  document_hash text not null check (document_hash ~ '^[a-f0-9]{64}$'),
  status public.verification_token_status not null default 'active',
  public_payload jsonb not null default '{}'::jsonb,
  expires_at timestamptz,
  last_verified_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.trust_certificates (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null,
  report_version_id uuid references public.report_versions(id),
  certificate_number text not null unique,
  status public.trust_certificate_status not null default 'active',
  document_hash text not null check (document_hash ~ '^[a-f0-9]{64}$'),
  version_label text not null,
  issuer text not null default 'NeuroStrata SenseTrust Layer',
  verification_token_id uuid references public.verification_tokens(id),
  verification_url text,
  certificate_payload jsonb not null default '{}'::jsonb,
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  revoke_reason text,
  created_at timestamptz not null default now()
);

alter table public.verification_tokens
  drop constraint if exists verification_tokens_certificate_id_fkey;

alter table public.verification_tokens
  add constraint verification_tokens_certificate_id_fkey
  foreign key (certificate_id) references public.trust_certificates(id);

create index if not exists evidence_objects_case_id_idx on public.evidence_objects(case_id);
create index if not exists clinical_commits_case_id_created_idx on public.clinical_commits(case_id, created_at desc);
create index if not exists audit_events_resource_idx on public.audit_events(resource, created_at desc);
create index if not exists report_versions_document_idx on public.report_versions(document_id, version_number desc);
create index if not exists trust_certificates_document_idx on public.trust_certificates(document_id, status);
create index if not exists verification_tokens_token_idx on public.verification_tokens(token);
create index if not exists prompt_versions_key_idx on public.prompt_versions(prompt_key, status);
create index if not exists codex_sessions_project_idx on public.codex_sessions(project_key, started_at desc);
create index if not exists codex_sessions_module_idx on public.codex_sessions(module, started_at desc);
create index if not exists decision_records_scope_idx on public.decision_records(scope, status);
create index if not exists decision_records_adr_code_idx on public.decision_records(adr_code);

create or replace function public.generate_sha256(file bytea)
returns text
language sql
immutable
as $$
  select encode(digest(file, 'sha256'), 'hex');
$$;

create or replace function public.create_evidence_manifest(p_case_id text)
returns jsonb
language sql
stable
as $$
  select jsonb_build_object(
    'case_id', p_case_id,
    'manifest_version', 'sensetrust-evidence-v1',
    'generated_at', now(),
    'evidence_count', count(*),
    'evidence_hashes', coalesce(jsonb_agg(
      jsonb_build_object(
        'id', id,
        'object_type', object_type,
        'storage_path', storage_path,
        'sha256_hash', sha256_hash,
        'created_at', created_at
      )
      order by created_at, id
    ), '[]'::jsonb)
  )
  from public.evidence_objects
  where case_id = p_case_id;
$$;

create or replace function public.create_clinical_commit(
  case_id text,
  parent_commit_id uuid,
  reason text,
  diff_json jsonb
)
returns public.clinical_commits
language plpgsql
security definer
set search_path = public
as $$
declare
  manifest jsonb;
  parent_hash text;
  new_commit public.clinical_commits;
begin
  if parent_commit_id is not null then
    select commit_hash into parent_hash from public.clinical_commits where id = parent_commit_id;
    if parent_hash is null then
      raise exception 'parent_commit_not_found';
    end if;
  end if;

  manifest := public.create_evidence_manifest(case_id);

  insert into public.clinical_commits (
    case_id,
    parent_commit_id,
    commit_hash,
    reason,
    diff_json,
    evidence_manifest
  )
  values (
    case_id,
    parent_commit_id,
    encode(digest(concat_ws('|', case_id, coalesce(parent_hash, ''), reason, diff_json::text, manifest::text, clock_timestamp()::text), 'sha256'), 'hex'),
    reason,
    coalesce(diff_json, '{}'::jsonb),
    manifest
  )
  returning * into new_commit;

  perform public.append_audit_event('system', 'clinical_commit.created', 'clinical_commits/' || new_commit.id::text, reason);

  return new_commit;
end;
$$;

create or replace function public.append_audit_event(
  actor text,
  action text,
  resource text,
  reason text default null
)
returns public.audit_events
language plpgsql
security definer
set search_path = public
as $$
declare
  previous_hash text;
  new_event public.audit_events;
  fhir_payload jsonb;
begin
  select event_hash
  into previous_hash
  from public.audit_events
  order by created_at desc, id desc
  limit 1;

  fhir_payload := jsonb_build_object(
    'resourceType', 'AuditEvent',
    'type', jsonb_build_object('system', 'urn:neurostrata:sensetrust', 'code', action),
    'agent', jsonb_build_array(jsonb_build_object('who', jsonb_build_object('display', actor))),
    'entity', jsonb_build_array(jsonb_build_object('what', jsonb_build_object('reference', resource))),
    'recorded', now()
  );

  insert into public.audit_events (
    actor,
    action,
    resource,
    reason,
    fhir_audit_event,
    previous_event_hash,
    event_hash
  )
  values (
    actor,
    action,
    resource,
    reason,
    fhir_payload,
    previous_hash,
    encode(digest(concat_ws('|', coalesce(previous_hash, ''), actor, action, resource, coalesce(reason, ''), clock_timestamp()::text), 'sha256'), 'hex')
  )
  returning * into new_event;

  return new_event;
end;
$$;

create or replace function public.generate_trust_certificate(document_id uuid)
returns public.trust_certificates
language plpgsql
security definer
set search_path = public
as $$
declare
  report public.report_versions;
  cert public.trust_certificates;
  token_row public.verification_tokens;
begin
  select *
  into report
  from public.report_versions
  where report_versions.document_id = $1
    and status in ('signed', 'reviewed')
    and document_hash is not null
  order by version_number desc, created_at desc
  limit 1;

  if report.id is null then
    raise exception 'eligible_report_version_not_found';
  end if;

  insert into public.trust_certificates (
    document_id,
    report_version_id,
    certificate_number,
    document_hash,
    version_label,
    certificate_payload
  )
  values (
    report.document_id,
    report.id,
    'ST-' || upper(substr(encode(gen_random_bytes(8), 'hex'), 1, 16)),
    report.document_hash,
    'v' || report.version_number::text,
    jsonb_build_object(
      'resourceType', 'Provenance',
      'target', jsonb_build_array(jsonb_build_object('reference', 'report_versions/' || report.id::text)),
      'recorded', now(),
      'agent', jsonb_build_array(jsonb_build_object('who', jsonb_build_object('display', 'NeuroStrata SenseTrust Layer')))
    )
  )
  returning * into cert;

  insert into public.verification_tokens (
    certificate_id,
    document_hash,
    public_payload
  )
  values (
    cert.id,
    cert.document_hash,
    jsonb_build_object(
      'certificate_id', cert.id,
      'certificate_number', cert.certificate_number,
      'status', cert.status,
      'document_hash', cert.document_hash,
      'version_label', cert.version_label,
      'issuer', cert.issuer,
      'issued_at', cert.issued_at,
      'patient_visible', false
    )
  )
  returning * into token_row;

  update public.trust_certificates
  set
    verification_token_id = token_row.id,
    verification_url = '/verify/' || token_row.token
  where id = cert.id
  returning * into cert;

  perform public.append_audit_event('system', 'certificate.generated', 'trust_certificates/' || cert.id::text, 'final_signature');

  return cert;
end;
$$;

create or replace function public.verify_document_hash(document_hash text)
returns table (
  certificate_id uuid,
  status public.trust_certificate_status,
  version_label text,
  issued_at timestamptz,
  expires_at timestamptz,
  revoked_at timestamptz,
  issuer text,
  is_valid boolean
)
language sql
stable
as $$
  select
    c.id,
    c.status,
    c.version_label,
    c.issued_at,
    c.expires_at,
    c.revoked_at,
    c.issuer,
    c.status = 'active'
      and c.document_hash = $1
      and (c.expires_at is null or c.expires_at > now())
      and c.revoked_at is null as is_valid
  from public.trust_certificates c
  where c.document_hash = $1
  order by c.issued_at desc
  limit 1;
$$;

create or replace function public.revoke_certificate(certificate_id uuid, reason text)
returns public.trust_certificates
language plpgsql
security definer
set search_path = public
as $$
declare
  cert public.trust_certificates;
begin
  update public.trust_certificates
  set status = 'revoked',
      revoked_at = now(),
      revoke_reason = reason
  where id = certificate_id
  returning * into cert;

  if cert.id is null then
    raise exception 'certificate_not_found';
  end if;

  update public.verification_tokens
  set status = 'revoked'
  where certificate_id = cert.id;

  perform public.append_audit_event('system', 'certificate.revoked', 'trust_certificates/' || cert.id::text, reason);

  return cert;
end;
$$;

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
  if old.status = 'signed' and (
    new.document_hash is distinct from old.document_hash
    or new.evidence_manifest is distinct from old.evidence_manifest
    or new.public_metadata is distinct from old.public_metadata
  ) then
    raise exception 'signed_report_requires_amendment_or_new_version';
  end if;
  return new;
end;
$$;

drop trigger if exists report_versions_signed_lock on public.report_versions;
create trigger report_versions_signed_lock
before update on public.report_versions
for each row execute function public.prevent_signed_report_direct_edit();

alter table public.evidence_objects enable row level security;
alter table public.clinical_commits enable row level security;
alter table public.audit_events enable row level security;
alter table public.trust_certificates enable row level security;
alter table public.report_versions enable row level security;
alter table public.consent_versions enable row level security;
alter table public.pipeline_versions enable row level security;
alter table public.prompt_versions enable row level security;
alter table public.codex_sessions enable row level security;
alter table public.decision_records enable row level security;
alter table public.verification_tokens enable row level security;

drop policy if exists "auth_read_sensetrust_tables" on public.evidence_objects;
create policy "auth_read_sensetrust_tables" on public.evidence_objects for select to authenticated using (true);
drop policy if exists "auth_insert_evidence_objects" on public.evidence_objects;
create policy "auth_insert_evidence_objects" on public.evidence_objects for insert to authenticated with check (true);

drop policy if exists "auth_read_clinical_commits" on public.clinical_commits;
create policy "auth_read_clinical_commits" on public.clinical_commits for select to authenticated using (true);

drop policy if exists "auth_read_audit_events" on public.audit_events;
create policy "auth_read_audit_events" on public.audit_events for select to authenticated using (true);

drop policy if exists "auth_read_trust_certificates" on public.trust_certificates;
create policy "auth_read_trust_certificates" on public.trust_certificates for select to authenticated using (true);

drop policy if exists "auth_read_report_versions" on public.report_versions;
create policy "auth_read_report_versions" on public.report_versions for select to authenticated using (true);
drop policy if exists "auth_write_report_versions" on public.report_versions;
create policy "auth_write_report_versions" on public.report_versions for all to authenticated using (true) with check (true);

drop policy if exists "auth_read_consent_versions" on public.consent_versions;
create policy "auth_read_consent_versions" on public.consent_versions for select to authenticated using (true);
drop policy if exists "auth_read_pipeline_versions" on public.pipeline_versions;
create policy "auth_read_pipeline_versions" on public.pipeline_versions for select to authenticated using (true);

drop policy if exists "auth_read_prompt_versions" on public.prompt_versions;
create policy "auth_read_prompt_versions" on public.prompt_versions for select to authenticated using (true);
drop policy if exists "auth_write_prompt_versions" on public.prompt_versions;
create policy "auth_write_prompt_versions" on public.prompt_versions for all to authenticated using (true) with check (true);

drop policy if exists "auth_read_codex_sessions" on public.codex_sessions;
create policy "auth_read_codex_sessions" on public.codex_sessions for select to authenticated using (true);
drop policy if exists "auth_write_codex_sessions" on public.codex_sessions;
create policy "auth_write_codex_sessions" on public.codex_sessions for all to authenticated using (true) with check (true);

drop policy if exists "auth_read_decision_records" on public.decision_records;
create policy "auth_read_decision_records" on public.decision_records for select to authenticated using (true);
drop policy if exists "auth_write_decision_records" on public.decision_records;
create policy "auth_write_decision_records" on public.decision_records for all to authenticated using (true) with check (true);

drop policy if exists "public_verify_tokens" on public.verification_tokens;
create policy "public_verify_tokens" on public.verification_tokens for select to anon, authenticated using (true);


-- END MIGRATION: supabase\migrations\20260606120000_sensetrust_layer.sql

-- ============================================================
-- BEGIN MIGRATION: supabase\migrations\20260606133000_obsidian_note_registry.sql
-- ============================================================
create table if not exists public.obsidian_note_registry (
  id uuid primary key default gen_random_uuid(),
  vault_id text not null,
  note_path text not null,
  note_title text not null,
  note_type text not null,
  linked_module text,
  linked_adr text,
  created_by text not null default 'codex',
  created_at timestamptz not null default now(),
  content_hash text not null check (content_hash ~ '^[a-f0-9]{64}$'),
  source_codex_session_id uuid references public.codex_sessions(id),
  status text not null default 'active',
  unique (vault_id, note_path)
);

create index if not exists obsidian_note_registry_module_idx
  on public.obsidian_note_registry(linked_module, status);

create index if not exists obsidian_note_registry_adr_idx
  on public.obsidian_note_registry(linked_adr);

alter table public.obsidian_note_registry enable row level security;

drop policy if exists "auth_read_obsidian_note_registry" on public.obsidian_note_registry;
create policy "auth_read_obsidian_note_registry"
  on public.obsidian_note_registry for select to authenticated using (true);

drop policy if exists "auth_write_obsidian_note_registry" on public.obsidian_note_registry;
create policy "auth_write_obsidian_note_registry"
  on public.obsidian_note_registry for all to authenticated using (true) with check (true);



-- END MIGRATION: supabase\migrations\20260606133000_obsidian_note_registry.sql

-- ============================================================
-- BEGIN MIGRATION: supabase\migrations\20260606134000_obsidian_vault_integrity_records.sql
-- ============================================================
do $$
declare
  v_session_id uuid;
  v_decision_id uuid;
begin
  insert into public.codex_sessions (
    session_key,
    project_key,
    module,
    objective,
    actor,
    status,
    git_branch,
    changed_files,
    obsidian_note_path,
    metadata
  )
  values (
    'CODEX-20260606-001-SenseTrust-MVP',
    'neurostrata-vitalstrata-sensetrust',
    'SenseTrust',
    'Obsidian Vault Integrity: enforce Vault ID b1a32fcb40985ffc as canonical memory target.',
    'codex',
    'completed',
    'codex/obsidian-vault-integrity',
    '[".neurostrata/vault.config.json","scripts/resolve-obsidian-vault.mjs","scripts/write-obsidian-note.mjs","scripts/test-obsidian-vault-integrity.mjs","supabase/migrations/20260606133000_obsidian_note_registry.sql","supabase/migrations/20260606134000_obsidian_vault_integrity_records.sql"]'::jsonb,
    '08_CODEX_RUNBOOKS/CODEX-20260606-001-SenseTrust-MVP.md',
    jsonb_build_object(
      'github_remote', 'https://github.com/braulinopeixoto-tech/neurostrata-lisuga2ct.git',
      'github_reference_status', 'pending_commit_or_pr',
      'canonical_obsidian_vault_id', 'b1a32fcb40985ffc'
    )
  )
  on conflict (session_key) do update
  set
    status = excluded.status,
    changed_files = excluded.changed_files,
    obsidian_note_path = excluded.obsidian_note_path,
    metadata = excluded.metadata
  returning id into v_session_id;

  insert into public.decision_records (
    decision_key,
    adr_code,
    title,
    status,
    scope,
    decision_text,
    rationale,
    risks,
    alternatives,
    codex_session_id,
    obsidian_note_path
  )
  values (
    'ADR-0009',
    'ADR-0009',
    'Obsidian Vault ID as Canonical Memory Target',
    'accepted',
    'Obsidian Vault Integrity',
    'Use Vault ID b1a32fcb40985ffc as the only canonical target for Codex-created Obsidian memory.',
    'Path inference can write conceptual memory into OneDrive copies or non-canonical folders. Resolving by Obsidian Vault ID keeps the memory target explicit and testable.',
    '["Obsidian config missing blocks note creation","Local machine must have the canonical vault registered"]'::jsonb,
    '["Use absolute OneDrive path: rejected","Use first matching VitalStrata_OS folder: rejected","Use Vault ID from Obsidian config: accepted"]'::jsonb,
    v_session_id,
    '09_ADR_DECISIONS/ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target.md'
  )
  on conflict (decision_key) do update
  set
    status = excluded.status,
    decision_text = excluded.decision_text,
    rationale = excluded.rationale,
    risks = excluded.risks,
    alternatives = excluded.alternatives,
    codex_session_id = excluded.codex_session_id,
    obsidian_note_path = excluded.obsidian_note_path
  returning id into v_decision_id;

  update public.codex_sessions
  set decision_record_id = v_decision_id
  where id = v_session_id;

  insert into public.obsidian_note_registry (
    vault_id,
    note_path,
    note_title,
    note_type,
    linked_module,
    linked_adr,
    created_by,
    content_hash,
    source_codex_session_id,
    status
  )
  values
    (
      'b1a32fcb40985ffc',
      '05_SENSETRUST/SenseTrust Layer MVP Foundation.md',
      'SenseTrust Layer MVP Foundation',
      'architecture',
      'SenseTrust',
      'ADR-0009',
      'codex',
      '1cbf7c6db6bf02cd26e83644cb7b0c82791caacc203e4178aef318094153ce24',
      v_session_id,
      'active'
    ),
    (
      'b1a32fcb40985ffc',
      '08_CODEX_RUNBOOKS/CODEX-20260606-001-SenseTrust-MVP.md',
      'CODEX-20260606-001-SenseTrust-MVP',
      'codex_session',
      'SenseTrust',
      'ADR-0009',
      'codex',
      '3528d42ac605f519bfd88c5070fafa61deee28e21e954870d66a16f1183642a4',
      v_session_id,
      'active'
    ),
    (
      'b1a32fcb40985ffc',
      '09_ADR_DECISIONS/ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target.md',
      'ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target',
      'adr',
      'Obsidian Vault Integrity',
      'ADR-0009',
      'codex',
      'd0ac1b2d31e9c5f9804cf710f4c4d0a45efc70865407f907a394fdc3e7edb402',
      v_session_id,
      'accepted'
    )
  on conflict (vault_id, note_path) do update
  set
    note_title = excluded.note_title,
    note_type = excluded.note_type,
    linked_module = excluded.linked_module,
    linked_adr = excluded.linked_adr,
    content_hash = excluded.content_hash,
    source_codex_session_id = excluded.source_codex_session_id,
    status = excluded.status;
end $$;


-- END MIGRATION: supabase\migrations\20260606134000_obsidian_vault_integrity_records.sql

