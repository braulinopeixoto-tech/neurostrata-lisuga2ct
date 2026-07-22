# RLS POLICY MATRIX

Project: `neurostrata-ai-trust-staging`  
Project ref: `dujbstywpckdmnmfalbz`  
Policy version: migration `20260721210000_ai_trust_organization_rls.sql`

## Institutional boundary

`organization_id` is mandatory on every governed AI Trust record. Membership is resolved only through `ai_trust_organization_memberships`, keyed by the verified `auth.uid()`. Client-supplied metadata is not used to infer membership or reviewer authority.

| Resource | Actor | SELECT | INSERT | UPDATE | DELETE |
|---|---|---:|---:|---:|---:|
| Organizations | anon | DENY | DENY | DENY | DENY |
| Organizations | authenticated member | Own organization | DENY | DENY | DENY |
| Memberships | anon | DENY | DENY | DENY | DENY |
| Memberships | authenticated | Own active membership | DENY | DENY | DENY |
| Events | anon | DENY | DENY | DENY | DENY |
| Events | authenticated member | Own organization | Own organization | DENY | DENY |
| Artifacts | authenticated member | Own organization | Own organization | DENY | DENY |
| Decisions | authenticated member | Own organization | DENY | DENY | DENY |
| Decisions | authorized reviewer | Own organization | Own organization | DENY | DENY |
| Policies | authenticated member | Own organization | DENY | DENY | DENY |
| Reviews | authenticated member | Own organization | DENY | DENY | DENY |
| Reviews | authorized reviewer | Own organization | Own organization | DENY | DENY |
| Any governed resource | cross-organization actor | DENY | DENY | DENY | DENY |

## Implemented controls

- `ai_trust_has_organization_access(uuid)` derives access from active controlled membership.
- `ai_trust_has_organization_role(uuid, text[])` derives reviewer authority from controlled membership.
- Both functions are `SECURITY DEFINER` with a fixed search path and no public execute grant.
- Eleven minimal authenticated policies are active.
- Anonymous table grants are absent.
- Authenticated UPDATE and DELETE grants are absent.
- Historical events and decisions retain append-only database triggers.
- The adapter also filters by its injected `organizationId`, providing defense in depth in addition to RLS.

## Service role boundary

Supabase `service_role` has platform-level `BYPASSRLS`. It is therefore classified as a controlled backend administrative identity, not as evidence of RLS enforcement and never as a browser credential. Its use in this sprint was limited to transient synthetic identity/membership setup and cleanup.
