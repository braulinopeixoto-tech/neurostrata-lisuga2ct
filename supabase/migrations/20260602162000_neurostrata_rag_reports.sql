create extension if not exists vector;

create table if not exists public.ns_knowledge_notes (
  id uuid primary key default gen_random_uuid(),
  source_path text not null,
  obsidian_id text,
  chunk_index integer not null default 0,
  title text not null,
  note_type text,
  axis text,
  evidence_level text,
  confidentiality text,
  trust_status text,
  content text not null,
  content_hash text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(1536),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (source_path, chunk_index)
);

create index if not exists ns_knowledge_notes_embedding_idx
  on public.ns_knowledge_notes
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create index if not exists ns_knowledge_notes_axis_idx
  on public.ns_knowledge_notes (axis);

create index if not exists ns_knowledge_notes_trust_status_idx
  on public.ns_knowledge_notes (trust_status);

create table if not exists public.ns_ai_reports (
  id uuid primary key default gen_random_uuid(),
  patient_id text,
  report_type text not null default 'neurostrata_convergence_report',
  status text not null default 'draft_for_human_review',
  input_snapshot jsonb not null default '{}'::jsonb,
  report_markdown text,
  report_json jsonb,
  report_fields jsonb not null default '{}'::jsonb,
  retrieved_sources jsonb not null default '[]'::jsonb,
  model text not null,
  embedding_model text not null default 'text-embedding-3-small',
  prompt_version text not null default 'neurostrata-dnda-v1',
  report_hash text,
  created_by uuid,
  reviewed_by uuid,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.ns_ingestion_jobs (
  id uuid primary key default gen_random_uuid(),
  vault_path text,
  status text not null default 'running',
  notes_seen integer not null default 0,
  chunks_indexed integer not null default 0,
  skipped_notes integer not null default 0,
  error_message text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create or replace function public.match_ns_notes(
  query_embedding vector(1536),
  match_count integer default 12,
  filter_axes text[] default null,
  filter_trust_status text[] default array['governed'],
  filter_confidentiality text[] default array['internal', 'restrito']
)
returns table (
  id uuid,
  source_path text,
  title text,
  note_type text,
  axis text,
  evidence_level text,
  confidentiality text,
  trust_status text,
  content text,
  metadata jsonb,
  similarity float
)
language sql
stable
as $$
  select
    n.id,
    n.source_path,
    n.title,
    n.note_type,
    n.axis,
    n.evidence_level,
    n.confidentiality,
    n.trust_status,
    n.content,
    n.metadata,
    1 - (n.embedding <=> query_embedding) as similarity
  from public.ns_knowledge_notes n
  where n.embedding is not null
    and (filter_axes is null or n.axis = any(filter_axes))
    and (filter_trust_status is null or n.trust_status = any(filter_trust_status))
    and (filter_confidentiality is null or n.confidentiality = any(filter_confidentiality))
  order by n.embedding <=> query_embedding
  limit match_count;
$$;

alter table public.ns_knowledge_notes enable row level security;
alter table public.ns_ai_reports enable row level security;
alter table public.ns_ingestion_jobs enable row level security;

drop policy if exists "auth_read_ns_knowledge_notes" on public.ns_knowledge_notes;
create policy "auth_read_ns_knowledge_notes"
  on public.ns_knowledge_notes for select to authenticated using (true);

drop policy if exists "auth_read_ns_ai_reports" on public.ns_ai_reports;
create policy "auth_read_ns_ai_reports"
  on public.ns_ai_reports for select to authenticated using (true);

drop policy if exists "auth_insert_ns_ai_reports" on public.ns_ai_reports;
create policy "auth_insert_ns_ai_reports"
  on public.ns_ai_reports for insert to authenticated with check (true);

drop policy if exists "auth_read_ns_ingestion_jobs" on public.ns_ingestion_jobs;
create policy "auth_read_ns_ingestion_jobs"
  on public.ns_ingestion_jobs for select to authenticated using (true);
