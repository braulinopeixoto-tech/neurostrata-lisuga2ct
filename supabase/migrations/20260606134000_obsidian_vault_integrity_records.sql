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
