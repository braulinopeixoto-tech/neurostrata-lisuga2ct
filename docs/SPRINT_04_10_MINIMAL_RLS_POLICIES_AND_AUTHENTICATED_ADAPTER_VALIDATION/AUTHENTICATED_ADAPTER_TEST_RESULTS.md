# AUTHENTICATED ADAPTER TEST RESULTS

## Governed identities

The live staging test used only transient synthetic identities:

- `user_org_a`
- `reviewer_org_a`
- `user_org_b`
- unauthenticated client

Two synthetic organizations were created per execution. Test users and memberships were removed after each execution; final counts are zero.

## Required controls

| ID | Control | Result | Evidence |
|---|---|---|---|
| T01 | Anonymous read denied | PASS | Anonymous client had no SELECT grant. |
| T02 | Anonymous insert denied | PASS | Anonymous INSERT returned an authorization error. |
| T03 | Organization A member reads organization A | PASS | Exactly one own-organization row was visible. |
| T04 | Organization A member cannot read organization B | PASS | Cross-organization SELECT returned zero rows. |
| T05 | Organization A member inserts into organization A | PASS | Authenticated append succeeded. |
| T06 | Organization A member cannot insert into organization B | PASS | Adapter returned `ACCESS_DENIED`. |
| T07 | Historical event update denied | PASS | Authenticated UPDATE was denied. |
| T08 | Historical event delete denied | PASS | Authenticated DELETE was denied. |
| T09 | Reviewer A creates review in organization A | PASS | Reviewer-scoped INSERT succeeded. |
| T10 | Reviewer A cannot create review in organization B | PASS | Cross-organization review INSERT was denied. |
| T11 | Real adapter authenticated append | PASS | `SupabaseTrustRepository.appendEvent` succeeded using an injected authenticated client. |
| T12 | Real adapter ordered chain retrieval | PASS | The adapter returned the expected single-event ordered chain. |
| T13 | Duplicate event ID rejected | PASS | Duplicate identifier returned normalized `DUPLICATE_EVENT_ID`. |
| T14 | Duplicate event hash rejected | PASS | PostgreSQL unique constraint returned SQLSTATE `23505`. |
| T15 | Service-role behavior bounded | PASS | Bypass confirmed only in transient backend setup/cleanup; never used by the adapter or browser client. |
| T16 | No secret in logs or Git diff | PASS | Secret scan found no token, key, connection string, or environment secret. |

## Adapter remediation discovered by the live test

The first authenticated read exposed a real serialization incompatibility: PostgreSQL returned `timestamptz` with an explicit `+00:00` offset while the domain schema requires canonical UTC `Z`. The mapper now normalizes valid database timestamps through `Date.toISOString()` before schema validation.

After this scoped correction, the complete staging test passed. A permanent unit test covers the PostgreSQL offset form.

## Cleanup and persisted evidence

- Synthetic Auth users remaining: `0`.
- Synthetic memberships remaining: `0`.
- Cross-organization unauthorized writes: `0`.
- Persisted test data is synthetic only.
- Credentials were kept in process memory, never printed, and cleared at session end.
