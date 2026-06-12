# SenseTrust Public Verification Portal v0.8

Status: implemented locally, pending final build, Obsidian write and Git remote confirmation.

## Objective

SenseTrust v0.8 adds an expanded public verification portal for simulated verification tokens. The portal combines public certificate metadata, QR/token status, document state, simulated signature, logical timestamp, emission integrity and safe public messages.

## What the portal verifies

- token status;
- document lifecycle state;
- simulated certificate id;
- simulated emission id;
- simulated signature status;
- logical timestamp status;
- partial certificate, emission and document hashes;
- supersedence metadata when a replacement document exists.

## What the portal does not verify

The portal does not certify diagnostic truth, clinical correctness, treatment adequacy or full report content. It certifies only technical traceability, provenance, integrity metadata and document state.

## Public states

- `verified_active`
- `verified_amended`
- `verified_revoked`
- `verified_expired`
- `verified_superseded`
- `invalid_token`
- `invalid_integrity`
- `unavailable`

## Integration

- QR v0.3 supplies the public verification route/token concept.
- DNDA Trust Object v0.4 supplies the trust object and evidence manifest model.
- Clinical Commit Chain v0.5 supplies audit lineage.
- Document States v0.6 supply lifecycle status.
- Signature/Timestamp v0.7 supplies simulated signature, timestamp and emission hash.

## Simulated data only

All tokens and identifiers are simulated. No real patient, CPF, EEG, qEEG, report, medication, scale score, diagnosis or clinical note is used.
