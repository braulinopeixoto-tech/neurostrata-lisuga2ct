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

