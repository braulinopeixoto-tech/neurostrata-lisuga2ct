# CONCURRENCY AND IDEMPOTENCY RESULTS

## T11 — Concurrent append behavior

Two transactions attempted to append distinct children using the same predecessor hash for resource `SYNTHETIC-CONCURRENCY-0409`.

- Genesis rows: `1`.
- Concurrent child attempts: `2`.
- Accepted children: `1`.
- Rejected children: `1`.
- Final resource event count: `2`.
- Rejection reason: `previous hash does not match latest event`.
- Result: `PASS`.

The advisory transaction lock serialized the writes. The second transaction evaluated the newly committed latest hash and could not create a fork.

## T12 — Idempotent retry behavior

The exact synthetic event candidate was submitted twice through an atomic insert-if-identical-event-is-absent statement.

- Final matching rows: `1`.
- Duplicate row created: `no`.
- Event/hash mismatch accepted: `no`.
- Result: `PASS`.

## Persistent synthetic evidence

Five events remain in staging as controlled technical evidence:

- two valid-chain events;
- two concurrency-chain events;
- one idempotency event.

All use `SYNTHETIC-*` resource identifiers and actor `sprint-04.09`. No clinical or personal content is present.
