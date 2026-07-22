# RLS AND APPEND-ONLY TEST RESULTS

All tests used synthetic identifiers and the isolated project `dujbstywpckdmnmfalbz`.

| Test | Control | Result | Objective evidence |
|---|---|---|---|
| T01 | Unauthenticated read denied | PASS | `anon` SELECT returned `0` visible rows. |
| T02 | Unauthorized insert denied | PASS | `anon` INSERT failed with SQLSTATE `42501` / row-level security violation. |
| T03 | Authorized synthetic insert allowed | PASS | `authenticated` INSERT succeeded under a resource-restricted temporary policy inside a transaction; rollback left `0` rows and `0` test policies. |
| T04 | Historical event update denied | PASS | Trigger raised `AI Trust append-only records cannot be updated or deleted`. |
| T05 | Historical event delete denied | PASS | Trigger raised `AI Trust append-only records cannot be updated or deleted`. |
| T06 | Duplicate `event_id` rejected | PASS | Unique constraint `ai_trust_events_event_id_key` raised SQLSTATE `23505`. |
| T07 | Duplicate `event_hash` rejected | PASS | Unique constraint `ai_trust_events_event_hash_key` raised SQLSTATE `23505`. |
| T08 | Valid chain retrieved in order | PASS | Ordered result was `{T08-GENESIS,T08-SECOND}`. |
| T09 | Broken chain detected | PASS | Append trigger rejected a non-latest `previous_event_hash`. |
| T10 | Transaction rollback on partial failure | PASS | Failed second insert rolled the subtransaction back to `0` rows. |

## Final RLS state

- RLS enabled: `5/5` tables.
- Public/permissive policies: `0`.
- Temporary authorization policy persisted: `no`.
- Anonymous read exposure: `0` rows.
- Anonymous write exposure: denied.
- Production access: not performed.

The staging database remains deny-by-default. A durable application role policy is intentionally outside this sprint and remains subject to a separate authorization gate.
