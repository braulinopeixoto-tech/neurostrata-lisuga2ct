# SenseTrust Public Status Contract v0.6

Status: simulated public verification contract.

## Purpose

The public status contract lets a verifier understand whether a simulated document certificate is active, amended, revoked, expired, superseded or invalid without seeing clinical content.

## Allowed public fields

- `document_id`
- `document_type`
- `document_version`
- `certificate_id`
- `lifecycle_status`
- `verification_status`
- `public_reason`
- `amended_document_id`
- `replacement_document_id`
- `expires_at`
- `updated_at`
- `simulated_only`

## Prohibited fields

- patient name
- CPF or national identifiers
- anamnesis
- EEG, qEEG or sLORETA content
- biomarkers
- diagnostic hypotheses
- clinical scales
- treatment details
- private revocation or amendment reason
- full report contents

## Public status meanings

- `valid`: certificate is active or amended and metadata integrity is acceptable.
- `revoked`: certificate has a governed revocation record.
- `expired`: certificate reached an expiration condition.
- `superseded`: document was replaced by another version.
- `invalid_integrity`: hash or state integrity is not acceptable.

## Relationship with QR v0.3

QR v0.3 may point to a public verification route. v0.6 supplies the safe status payload that such a route can display, without changing QR generation in this sprint.
