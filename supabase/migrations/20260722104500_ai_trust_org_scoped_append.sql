-- Scope AI Trust append ordering to the authenticated organization boundary.
-- This replaces only the trigger function body; no historical row is rewritten.

create or replace function public.ai_trust_validate_event_append()
returns trigger
language plpgsql
as $$
declare
  latest_hash text;
begin
  perform pg_advisory_xact_lock(
    hashtextextended(new.organization_id::text || ':' || new.resource_id, 0)
  );

  select event_hash
    into latest_hash
    from public.ai_trust_events
   where organization_id = new.organization_id
     and resource_id = new.resource_id
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
