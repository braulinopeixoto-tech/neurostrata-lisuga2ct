# SenseTrust Document States v0.6

Status: implemented locally, pending final build, Obsidian write and Git remote confirmation.

## Objective

SenseTrust v0.6 adds governed document lifecycle states for simulated DNDA documents. It proves that a signed document can stay active, receive an amendment, be revoked, expire by rule, or be superseded by a replacement version without destructive edits.

## Scope

- Only simulated identifiers are used.
- No real patient, CPF, EEG, qEEG, sLORETA, anamnesis, biomarker or clinical report content is used.
- No Supabase migration is introduced in this sprint.
- RLS v0.2 and QR v0.3 are not changed.

## Document states

- `draft`
- `reviewed`
- `signed`
- `active`
- `amended`
- `revoked`
- `expired`
- `superseded`
- `invalid_integrity`

The service also models `active_new_version` and `archived` to express the full transition rules from the sprint contract.

## Governed transitions

- `reviewed -> signed`
- `signed -> active`
- `active -> amended`
- `active -> revoked`
- `active -> expired`
- `active -> superseded`
- `amended -> active_new_version`
- `amended -> revoked`
- `superseded -> archived`

`revoked`, `expired`, `archived` and `invalid_integrity` are terminal or blocked states for the original certificate.

## Clinical Commit relation

Every critical transition creates a simulated document-state clinical commit reference:

- amendment: `amended`
- revocation: `revoked`
- supersedence: `superseded`
- expiration: `status_expired`
- integrity invalidation: `integrity_invalidated`

These commit types extend the v0.5 commit taxonomy without breaking previous tests.

## Public contract

The public payload is minimized and may expose only:

- document id
- document type
- document version
- certificate id
- lifecycle status
- verification status
- public reason
- replacement or amended document id when applicable
- expiration and update dates

Private reasons and clinical content are never included.
