-- AI Trust persistence foundation.
-- Local-only migration: reviewed but not linked or applied to any Supabase project.

create table public.ai_trust_artifacts (
  id uuid primary key default gen_random_uuid(),
  artifact_id text not null unique,
  resource_id text not null,
  artifact_type text not null,
  sha256 text not null check (sha256 ~ '^[0-9a-f]{64}$'),
  status text not null check (status in ('VALID', 'INVALID', 'PENDING_HUMAN_REVIEW')),
  metadata jsonb not null default '{}'::jsonb,
  occurred_at timestamptz not null,
  created_at timestamptz not null default now()
);

create table public.ai_trust_events (
  id uuid primary key default gen_random_uuid(),
  event_id text not null unique,
  resource_id text not null,
  event_type text not null,
  occurred_at timestamptz not null,
  actor_id text not null,
  artifact jsonb not null,
  integrity_policy text not null
    check (integrity_policy in ('STRICT_HASH', 'OBSERVATIONAL_HASH')),
  status text not null
    check (status in ('VALID', 'INVALID', 'PENDING_HUMAN_REVIEW')),
  decision jsonb not null,
  previous_event_hash text null
    check (previous_event_hash is null or previous_event_hash ~ '^[0-9a-f]{64}$'),
  event_hash text not null unique check (event_hash ~ '^[0-9a-f]{64}$'),
  metadata jsonb not null default '{}'::jsonb,
  sequence_number bigint generated always as identity,
  created_at timestamptz not null default now(),
  unique (resource_id, sequence_number)
);

create table public.ai_trust_decisions (
  id uuid primary key default gen_random_uuid(),
  decision_id text not null unique,
  resource_id text not null,
  event_id text null references public.ai_trust_events(event_id),
  occurred_at timestamptz not null,
  actor_id text not null,
  decision jsonb not null,
  outcome text generated always as (decision ->> 'outcome') stored
    check (outcome in ('ALLOW', 'DENY', 'REQUIRE_HUMAN_REVIEW')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.ai_trust_policies (
  id uuid primary key default gen_random_uuid(),
  policy_id text not null unique,
  resource_id text not null,
  policy_name text not null,
  integrity_policy text not null
    check (integrity_policy in ('STRICT_HASH', 'OBSERVATIONAL_HASH')),
  status text not null check (status in ('ACTIVE', 'INACTIVE', 'PENDING_HUMAN_REVIEW')),
  version text not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.ai_trust_reviews (
  id uuid primary key default gen_random_uuid(),
  review_id text not null unique,
  resource_id text not null,
  decision_id text null references public.ai_trust_decisions(decision_id),
  reviewer_id text not null,
  status text not null check (status in ('APPROVED', 'REJECTED', 'RESTRICTIONS_REQUIRED')),
  reviewed_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index ai_trust_artifacts_resource_time_idx
  on public.ai_trust_artifacts (resource_id, occurred_at);
create index ai_trust_events_resource_time_idx
  on public.ai_trust_events (resource_id, occurred_at, sequence_number);
create index ai_trust_decisions_resource_time_idx
  on public.ai_trust_decisions (resource_id, occurred_at);
create index ai_trust_policies_resource_time_idx
  on public.ai_trust_policies (resource_id, created_at);
create index ai_trust_reviews_resource_time_idx
  on public.ai_trust_reviews (resource_id, reviewed_at);

create function public.ai_trust_reject_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'AI Trust append-only records cannot be updated or deleted';
end;
$$;

create function public.ai_trust_validate_event_append()
returns trigger
language plpgsql
as $$
declare
  latest_hash text;
begin
  perform pg_advisory_xact_lock(hashtextextended(new.resource_id, 0));

  select event_hash
    into latest_hash
    from public.ai_trust_events
   where resource_id = new.resource_id
   order by sequence_number desc
   limit 1;

  if found and new.previous_event_hash is distinct from latest_hash then
    raise exception 'AI Trust append rejected: previous hash does not match latest event';
  end if;

  if not found and new.previous_event_hash is not null then
    raise exception 'AI Trust append rejected: genesis event must have no previous hash';
  end if;

  return new;
end;
$$;

create trigger ai_trust_events_validate_append
before insert on public.ai_trust_events
for each row execute function public.ai_trust_validate_event_append();

create trigger ai_trust_events_reject_mutation
before update or delete on public.ai_trust_events
for each row execute function public.ai_trust_reject_mutation();

create trigger ai_trust_decisions_reject_mutation
before update or delete on public.ai_trust_decisions
for each row execute function public.ai_trust_reject_mutation();

alter table public.ai_trust_events enable row level security;
alter table public.ai_trust_artifacts enable row level security;
alter table public.ai_trust_decisions enable row level security;
alter table public.ai_trust_policies enable row level security;
alter table public.ai_trust_reviews enable row level security;

-- RLS policy plan (documentation only; deliberately not applied):
-- 1. deny anonymous access by leaving all tables without permissive policies;
-- 2. add package/resource-scoped SELECT and INSERT policies only after a staging
--    project and non-bypass technical role are separately identified and approved;
-- 3. never add UPDATE or DELETE policies for events or decisions;
-- 4. validate FORCE ROW LEVEL SECURITY in the future controlled staging gate.
