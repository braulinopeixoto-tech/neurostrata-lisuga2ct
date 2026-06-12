# SenseTrust Future ICP-Brasil and Gov.br Readiness

Status: future readiness note, no real integration.

## Current state

v0.7 defines future-compatible signature and timestamp modes:

- `future_icp_brasil_signature`
- `future_govbr_signature`
- `future_external_timestamp_authority`
- `future_icp_brasil_timestamp`
- `future_govbr_timestamp`
- `future_rfc3161_timestamp`

These modes are placeholders only.

## Not implemented

- No ICP-Brasil certificate purchase or use.
- No Gov.br authentication or signing.
- No RFC3161 timestamp authority request.
- No legal non-repudiation claim.

## Future requirements

Before real integration, the project must define:

- legal certificate custody and consent model;
- signer identity assurance;
- timestamp authority policy;
- revocation and certificate chain validation;
- audit logging and RLS checks;
- public verification language that distinguishes technical traceability from legal validity.

## Current safe claim

SenseTrust v0.7 certifies only simulated technical traceability: hashes, signatures, timestamp metadata and emission integrity in a controlled non-clinical test layer.
