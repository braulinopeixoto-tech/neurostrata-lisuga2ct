# SenseTrust Revocation and Amendment Policy

Status: v0.6 simulated governance policy.

## Principle

A signed or active document is not edited destructively. Relevant corrections must be represented as an amendment, revocation, expiration or supersedence event.

## Amendment

An amendment keeps the original document intact and creates:

- `AmendmentRecord`
- document-state transition
- simulated Clinical Commit
- public status that says an amendment exists

The amendment may carry a private internal reason, but the public payload exposes only a generic safe reason.

## Revocation

A revocation keeps the original document intact and creates:

- `RevocationRecord`
- document-state transition
- simulated Clinical Commit
- public status `revoked`

A revoked certificate cannot be reactivated. A corrected or replacement document must use a new version or replacement identifier.

## Expiration

Expiration records that the original certificate is no longer valid after a temporal rule. It does not erase the document, commit chain, trust object or evidence manifest.

## Supersedence

Supersedence links the original document to a replacement document id. It preserves the original history and points public verification to the replacement metadata.

## Sensitive data boundary

This policy does not permit public exposure of patient identity, CPF, anamnesis, EEG, qEEG, sLORETA, biomarkers, hypotheses, scale scores or full report contents.
