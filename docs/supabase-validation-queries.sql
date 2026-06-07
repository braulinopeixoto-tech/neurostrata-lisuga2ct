-- SenseTrust remote validation queries
-- Project ref: yponblaeampkodzjrjko

select table_name
from information_schema.tables
where table_schema = 'public'
and table_name in (
  'audit_events',
  'evidence_objects',
  'clinical_commits',
  'trust_certificates',
  'prompt_versions',
  'codex_sessions',
  'decision_records',
  'report_versions',
  'consent_versions',
  'pipeline_versions',
  'verification_tokens',
  'obsidian_note_registry'
)
order by table_name;

select * from obsidian_note_registry order by created_at desc limit 10;

select * from decision_records where adr_code = 'ADR-0009';

select * from codex_sessions where module = 'SenseTrust' order by created_at desc limit 10;

