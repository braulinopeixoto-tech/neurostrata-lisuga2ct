# SPRINT 04.10 CERTIFICATION

## Decision

`PASS_WITH_RESTRICTIONS`

## Certified outcome

- Organization-scoped RLS is active in `neurostrata-ai-trust-staging`.
- Anonymous access remains denied.
- Authenticated SELECT and INSERT are limited to controlled active membership in the target organization.
- Cross-organization access is denied.
- Reviewer writes are limited to controlled `REVIEWER` memberships in the target organization.
- Historical events remain immutable.
- The real `SupabaseTrustRepository` passed authenticated append and ordered-chain retrieval against staging.
- The adapter requires an injected organization scope and does not read secrets or environment variables.
- All identities and content used in validation were synthetic.
- No secret was printed or committed.
- Production, legacy projects, deploy, push, and merge remained outside scope.

## Restrictions

- `service_role` retains Supabase platform `BYPASSRLS` and is authorized only for controlled backend administration; it must never be exposed to frontend code.
- No permanent application membership was created in this sprint.
- Synthetic organizations and governed test evidence remain staging-only.
- The application was not deployed or promoted.

## Final state

`PROGRAM_04_AI_TRUST_ENGINE / SPRINT_04.10`

`MINIMAL_RLS_AND_AUTHENTICATED_ADAPTER_CERTIFIED`

Certification timestamp: `2026-07-21T21:11:28.6888254-03:00`.
