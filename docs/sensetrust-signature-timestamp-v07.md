# SenseTrust Signature Timestamp v0.7

Status: implemented locally, pending final build, Obsidian write and Git remote confirmation.

## Objective

SenseTrust v0.7 adds simulated professional signature, simulated institutional countersignature, logical timestamp and emission integrity for simulated DNDA documents.

## Scope

- Simulated data only.
- No real patient, CPF, EEG, qEEG, sLORETA, report, anamnesis or clinical content.
- No ICP-Brasil, Gov.br, RFC3161 or legal certificate integration.
- No Supabase migration in this sprint.
- RLS v0.2, QR v0.3, Trust Object v0.4, Clinical Commit Chain v0.5 and Document States v0.6 are not changed beyond compatible type extension.

## Emission integrity

The emission object freezes these critical hashes:

- `document_hash`
- `trust_object_hash`
- `evidence_manifest_hash`
- `clinical_chain_hash`
- `document_state_hash`
- `professional_signature.signature_hash`
- `institutional_signature.signature_hash`
- `timestamp.timestamp_hash`

Any later change in these fields invalidates `emission_hash`.

## Valid document states

Valid emission:

- `signed`
- `active`

Restricted or invalid emission:

- `revoked`
- `expired`
- `superseded`
- `invalid_integrity`
- `amended` until represented by a governed new emission/version

## Public metadata

The public signature payload may show emission id, simulated document id, signature status, professional role, simulated institution, issued date, timestamp mode, partial emission hash, verification status and document state.

It must not show patient identity, CPF, report content, anamnesis, EEG, qEEG, sLORETA, scales, medication, biomarkers, private reasons or the complete document.
