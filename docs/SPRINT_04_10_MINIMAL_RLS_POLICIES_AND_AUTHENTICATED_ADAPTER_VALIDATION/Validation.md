# Validation

## Environment and scope

- Authorized project ref exact: PASS.
- Staging/non-production identity: PASS.
- Legacy Supabase projects accessed: no.
- Production accessed: no.
- Clinical or personal data used: no.
- Public Skip deployment: no.
- Push or merge: no.

## Local implementation validation

- AI Trust test files: `9/9 PASS`.
- AI Trust unit tests: `29/29 PASS`.
- Scoped TypeScript check: PASS.
- Scoped AI Trust lint: `0 warnings / 0 errors`.
- Application build: PASS.
- Migration safety tests: PASS.
- Timestamp normalization regression test: PASS.

## Staging validation

- Required authenticated/RLS controls: `16/16 PASS`.
- Migration applied exactly once: PASS.
- Organization columns: `5/5`.
- Minimal RLS policies: `11`.
- Anonymous SELECT grant: false.
- Anonymous INSERT grant: false.
- Authenticated UPDATE grant on events: false.
- Authenticated DELETE grant on events: false.
- Events without organization: `0`.
- Cross-organization access: denied.
- Reviewer scope: enforced.
- Rollback simulation: PASS.
- Test users remaining: `0`.
- Test memberships remaining: `0`.
- Prohibited event-content matches: `0`.

## Security validation

- Service-role key committed: no.
- Service-role key printed: no.
- Environment secret committed: no.
- Hardcoded project URL in domain module: no.
- Frontend service-role use: no.
- Adapter bypass of RLS: no.
- Secret scan: PASS.

## Build observation

Two build attempts encountered transient Windows/OneDrive `EBUSY` file locks in unchanged third-party dependencies, not compiler or application errors. The final isolated retry passed, as did all AI Trust tests, scoped typecheck, scoped lint, live adapter controls, and migration validations.

Validation status: `PASS_WITH_RESTRICTIONS`.
