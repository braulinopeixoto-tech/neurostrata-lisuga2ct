# Validation

## Pre-flight

- Project name exact: PASS.
- Project ref recorded: PASS.
- Authorized owner organization: PASS.
- Region recorded: PASS.
- Newly created project: PASS.
- No clinical data: PASS.
- Explicitly non-production: PASS.
- Legacy projects not investigated or used: PASS.

## Migration and schema

- Authorized migration only: PASS.
- Destructive SQL absent: PASS.
- Production/clinical references absent: PASS.
- Migration applied once: PASS.
- Five expected public tables: PASS.
- RLS enabled on five tables: PASS.
- Append-only triggers present and effective: PASS.
- Generated types contain five tables: PASS.

## Required tests

- Tests completed: `12/12`.
- Tests passed: `12/12`.
- RLS unauthorized access controls: PASS.
- Authorized synthetic insert with rollback: PASS.
- Update/delete immutability: PASS.
- Duplicate ID/hash rejection: PASS.
- Ordered chain retrieval: PASS.
- Broken-chain detection: PASS.
- Partial-failure rollback: PASS.
- Concurrent append serialization: PASS.
- Idempotent exact retry: PASS.

## Final database reconciliation

- Public tables: `5`.
- RLS-enabled public tables: `5`.
- Persistent policies: `0`.
- Applied authorized migration records: `1`.
- Synthetic event rows: `5`.
- Non-synthetic event rows: `0`.
- Rows in artifacts, decisions, policies, and reviews: `0`.
- Prohibited-content matches: `0`.

## Environment boundary

- Production accessed: `no`.
- Legacy Supabase project accessed: `no`.
- Clinical data accessed: `no`.
- Service-role key exposed: `no`.
- Destructive SQL executed: `no`.
- Skip application deployed: `no`.
- Remote application deployment performed: `no`.

Validation status: `PASS_WITH_RESTRICTIONS`.
