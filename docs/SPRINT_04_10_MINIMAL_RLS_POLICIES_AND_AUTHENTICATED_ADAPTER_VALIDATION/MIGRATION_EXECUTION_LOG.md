# MIGRATION EXECUTION LOG

## Migration identity

- File: `supabase/migrations/20260721210000_ai_trust_organization_rls.sql`
- SHA-256: `093F47BE7358FD6FDDD417110EFC61CFDC8F16538E1D2BB515930BBC7BDD3AEE`
- Project ref: `dujbstywpckdmnmfalbz`
- Environment: `STAGING_NON_PRODUCTION`
- Applied migration records: `1`

## Dry-run gate

An isolated Supabase work directory contained only the previously applied persistence foundation and the new RLS migration. Remote dry-run reported exactly one pending migration:

`20260721210000_ai_trust_organization_rls.sql`

No legacy, clinical, or unrelated migration entered the plan.

## Applied changes

- Added `ai_trust_organizations`.
- Added `ai_trust_organization_memberships`.
- Added mandatory `organization_id` to the five governed AI Trust tables.
- Assigned prior Sprint 04.09 synthetic evidence to a deterministic synthetic evidence organization without rewriting historical event payloads.
- Added organization/resource indexes.
- Added two controlled membership helper functions.
- Added eleven minimal authenticated RLS policies.
- Removed all anon grants from AI Trust tables.
- Granted authenticated SELECT/INSERT only where required.
- Preserved immutable event and decision triggers.

The migration contains no `DROP TABLE`, `TRUNCATE`, production reference, or clinical table reference.

## Controlled rollback validation

The documented rollback is deny-first and non-destructive: revoke authenticated access and remove the eleven policies in a compensating migration while preserving tables and evidence. A transactional simulation removed all policies and grants, verified the deny state, then rolled back.

- Policies restored after rollback: `11/11`.
- Authenticated event SELECT restored: `true`.
- Authenticated event INSERT restored: `true`.
- Persistent rollback side effects: `0`.

## Tooling observation

The Supabase CLI again reported that Docker Desktop was unavailable for a local pg-delta catalog cache. Remote migration application and all remote validations completed successfully; no local or remote reset occurred.
