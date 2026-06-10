-- SenseTrust RLS Hardening v0.2 validation queries
-- Run in Supabase SQL Editor after applying docs/manual-supabase-apply-rls-v02.sql.

-- 1. RLS enabled on critical tables.
select
  n.nspname as schema_name,
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  c.relforcerowsecurity as force_rls
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in (
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
    'obsidian_note_registry',
    'user_roles'
  )
order by c.relname;

-- 2. Policies by table.
select
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual,
  with_check
from pg_policies
where schemaname = 'public'
  and tablename in (
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
    'obsidian_note_registry',
    'user_roles'
  )
order by tablename, policyname;

-- 3. No direct anon select policy on verification_tokens.
select policyname, roles, cmd, qual
from pg_policies
where schemaname = 'public'
  and tablename = 'verification_tokens'
  and cmd = 'SELECT'
  and roles::text like '%anon%';

-- Expected: no rows.

-- 4. Public certificate verification RPC exists and is security definer.
select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as arguments,
  p.prosecdef as security_definer
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname = 'verify_public_certificate';

-- 5. Safe public RPC returns non-sensitive failure for unknown token.
select public.verify_public_certificate('nonexistent-token-for-rls-validation') as result;

-- Expected: {"is_valid": false, "reason": "token_not_found", ...}

-- 6. No old permissive policy names remain.
select tablename, policyname
from pg_policies
where schemaname = 'public'
  and policyname in (
    'auth_read_sensetrust_tables',
    'auth_insert_evidence_objects',
    'auth_read_clinical_commits',
    'auth_read_audit_events',
    'auth_read_trust_certificates',
    'auth_read_report_versions',
    'auth_write_report_versions',
    'auth_read_consent_versions',
    'auth_read_pipeline_versions',
    'auth_read_prompt_versions',
    'auth_write_prompt_versions',
    'auth_read_codex_sessions',
    'auth_write_codex_sessions',
    'auth_read_decision_records',
    'auth_write_decision_records',
    'public_verify_tokens',
    'auth_read_obsidian_note_registry',
    'auth_write_obsidian_note_registry'
  );

-- Expected: no rows.

-- 7. Audit events have no update/delete policies exposed to anon/authenticated.
select policyname, roles, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'audit_events'
  and cmd in ('UPDATE', 'DELETE', 'ALL');

-- Expected: no rows for UPDATE/DELETE/ALL.

-- 8. Signed report direct edit lock exists.
select
  tgname as trigger_name,
  tgenabled as enabled
from pg_trigger
where tgrelid = 'public.report_versions'::regclass
  and tgname = 'report_versions_signed_lock';

-- 9. Append-only audit triggers exist.
select
  tgname as trigger_name,
  tgenabled as enabled
from pg_trigger
where tgrelid = 'public.audit_events'::regclass
  and tgname in ('audit_events_append_only_update', 'audit_events_append_only_delete')
order by tgname;

-- 10. SenseTrust role helpers exist.
select
  n.nspname as schema_name,
  p.proname as function_name,
  pg_get_function_identity_arguments(p.oid) as arguments,
  p.prosecdef as security_definer
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in ('has_sensetrust_role', 'is_sensetrust_admin');
