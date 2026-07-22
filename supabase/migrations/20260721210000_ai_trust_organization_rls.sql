-- AI Trust organization isolation and minimal authenticated RLS.
-- Scope: AI Trust staging structures only.
-- Controlled rollback is deny-first: revoke authenticated grants and remove the
-- policies in a compensating migration while preserving tables and evidence.

create table public.ai_trust_organizations (
  id uuid primary key default gen_random_uuid(),
  organization_key text not null unique,
  display_name text not null,
  status text not null check (status in ('ACTIVE', 'INACTIVE')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table public.ai_trust_organization_memberships (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.ai_trust_organizations(id),
  user_id uuid not null,
  member_role text not null check (member_role in ('MEMBER', 'REVIEWER')),
  status text not null check (status in ('ACTIVE', 'INACTIVE')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (organization_id, user_id)
);

create index ai_trust_memberships_user_status_idx
  on public.ai_trust_organization_memberships (user_id, status, organization_id);

insert into public.ai_trust_organizations (
  id,
  organization_key,
  display_name,
  status,
  metadata
) values (
  '00000000-0000-4000-8000-000000000409',
  'sprint-04-09-synthetic-evidence',
  'Sprint 04.09 synthetic evidence',
  'ACTIVE',
  '{"synthetic":true,"access":"controlled_backend_only"}'::jsonb
);

alter table public.ai_trust_events
  add column organization_id uuid not null
    default '00000000-0000-4000-8000-000000000409'
    references public.ai_trust_organizations(id);
alter table public.ai_trust_events alter column organization_id drop default;

alter table public.ai_trust_artifacts
  add column organization_id uuid not null
    default '00000000-0000-4000-8000-000000000409'
    references public.ai_trust_organizations(id);
alter table public.ai_trust_artifacts alter column organization_id drop default;

alter table public.ai_trust_decisions
  add column organization_id uuid not null
    default '00000000-0000-4000-8000-000000000409'
    references public.ai_trust_organizations(id);
alter table public.ai_trust_decisions alter column organization_id drop default;

alter table public.ai_trust_policies
  add column organization_id uuid not null
    default '00000000-0000-4000-8000-000000000409'
    references public.ai_trust_organizations(id);
alter table public.ai_trust_policies alter column organization_id drop default;

alter table public.ai_trust_reviews
  add column organization_id uuid not null
    default '00000000-0000-4000-8000-000000000409'
    references public.ai_trust_organizations(id);
alter table public.ai_trust_reviews alter column organization_id drop default;

create index ai_trust_events_organization_resource_idx
  on public.ai_trust_events (organization_id, resource_id, sequence_number);
create index ai_trust_artifacts_organization_resource_idx
  on public.ai_trust_artifacts (organization_id, resource_id, occurred_at);
create index ai_trust_decisions_organization_resource_idx
  on public.ai_trust_decisions (organization_id, resource_id, occurred_at);
create index ai_trust_policies_organization_resource_idx
  on public.ai_trust_policies (organization_id, resource_id, created_at);
create index ai_trust_reviews_organization_resource_idx
  on public.ai_trust_reviews (organization_id, resource_id, reviewed_at);

create function public.ai_trust_has_organization_access(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.ai_trust_organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and membership.status = 'ACTIVE'
  );
$$;

create function public.ai_trust_has_organization_role(
  target_organization_id uuid,
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.ai_trust_organization_memberships membership
    where membership.organization_id = target_organization_id
      and membership.user_id = auth.uid()
      and membership.status = 'ACTIVE'
      and membership.member_role = any (allowed_roles)
  );
$$;

revoke all on function public.ai_trust_has_organization_access(uuid) from public;
revoke all on function public.ai_trust_has_organization_role(uuid, text[]) from public;
grant execute on function public.ai_trust_has_organization_access(uuid) to authenticated;
grant execute on function public.ai_trust_has_organization_role(uuid, text[]) to authenticated;

alter table public.ai_trust_organizations enable row level security;
alter table public.ai_trust_organization_memberships enable row level security;

create policy ai_trust_organizations_member_select
on public.ai_trust_organizations
for select
to authenticated
using (public.ai_trust_has_organization_access(id));

create policy ai_trust_memberships_self_select
on public.ai_trust_organization_memberships
for select
to authenticated
using (user_id = auth.uid() and status = 'ACTIVE');

create policy ai_trust_events_member_select
on public.ai_trust_events
for select
to authenticated
using (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_events_member_insert
on public.ai_trust_events
for insert
to authenticated
with check (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_artifacts_member_select
on public.ai_trust_artifacts
for select
to authenticated
using (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_artifacts_member_insert
on public.ai_trust_artifacts
for insert
to authenticated
with check (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_decisions_member_select
on public.ai_trust_decisions
for select
to authenticated
using (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_decisions_reviewer_insert
on public.ai_trust_decisions
for insert
to authenticated
with check (
  public.ai_trust_has_organization_role(organization_id, array['REVIEWER']::text[])
);

create policy ai_trust_policies_member_select
on public.ai_trust_policies
for select
to authenticated
using (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_reviews_member_select
on public.ai_trust_reviews
for select
to authenticated
using (public.ai_trust_has_organization_access(organization_id));

create policy ai_trust_reviews_reviewer_insert
on public.ai_trust_reviews
for insert
to authenticated
with check (
  public.ai_trust_has_organization_role(organization_id, array['REVIEWER']::text[])
);

revoke all on table public.ai_trust_organizations from anon, authenticated;
revoke all on table public.ai_trust_organization_memberships from anon, authenticated;
revoke all on table public.ai_trust_events from anon, authenticated;
revoke all on table public.ai_trust_artifacts from anon, authenticated;
revoke all on table public.ai_trust_decisions from anon, authenticated;
revoke all on table public.ai_trust_policies from anon, authenticated;
revoke all on table public.ai_trust_reviews from anon, authenticated;

grant select on table public.ai_trust_organizations to authenticated;
grant select on table public.ai_trust_organization_memberships to authenticated;
grant select, insert on table public.ai_trust_events to authenticated;
grant select, insert on table public.ai_trust_artifacts to authenticated;
grant select, insert on table public.ai_trust_decisions to authenticated;
grant select on table public.ai_trust_policies to authenticated;
grant select, insert on table public.ai_trust_reviews to authenticated;

grant usage, select on sequence public.ai_trust_events_sequence_number_seq to authenticated;
