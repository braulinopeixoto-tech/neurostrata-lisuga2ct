# SenseTrust Public Verification Limitations

Status: v0.8 limitations and SaaS readiness note.

## Current limits

- simulated tokens only;
- simulated identities only;
- no real authentication;
- no real Supabase migration;
- no real clinical data;
- no ICP-Brasil, Gov.br or legal timestamp integration;
- no real patient-facing production use.

## Interpretation limits

The portal confirms metadata integrity and document state. It must not be interpreted as:

- diagnostic validation;
- clinical recommendation;
- evidence of treatment adequacy;
- legal digital signature;
- complete medical record disclosure.

## SaaS readiness

The contract is ready to become a SaaS-facing public verification layer after:

- RLS and public RPCs are reconciled with production data rules;
- token issuance is connected to real certificate records;
- audit logging is enforced for public verification;
- clinical data remains separated from public metadata;
- legal language is reviewed.
