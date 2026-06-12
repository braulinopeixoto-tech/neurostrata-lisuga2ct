# SenseTrust Document Lifecycle Governance

Status: v0.6 simulated lifecycle governance.

## Memory model

The document lifecycle is append-oriented:

- the original signed state is preserved;
- transitions are recorded as hashes;
- critical transitions link to Clinical Commit ids;
- public payloads are minimized.

## Editing versus amending

Editing changes an existing document directly. That is blocked after signature or activation.

Amending adds a governed record and a new clinical commit while preserving the original state.

## Revoking versus replacing

Revoking marks the original certificate as no longer valid.

Replacing or superseding links the original document to a new replacement document id and keeps both histories distinguishable.

## Integrity failure

If state hash verification fails, the document enters or reports `invalid_integrity`. This is a blocked state and requires investigation before any downstream use.

## Current limits

- All data is simulated.
- No real Supabase writes are performed by v0.6.
- No clinical use is authorized.
- Build, Obsidian write and Git remote status must be proven before final approval.

## Next phase

After v0.6 is approved, the recommended next phase is controlled application to Supabase execution history and reconciliation with public verification routing, still without real clinical data.
