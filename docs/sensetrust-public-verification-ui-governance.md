# SenseTrust Public Verification UI Governance

Status: v0.8 simulated UI governance.

## Required sections

The expanded public portal presents:

- main verification status;
- document state;
- signature and timestamp;
- emission integrity;
- certificate and QR/token metadata;
- safety notice;
- what the verification does not show;
- safe public action hint.

## UI language

Public labels must be plain and non-clinical:

- DOCUMENTO VERIFICAVEL
- DOCUMENTO COM ADENDO
- DOCUMENTO REVOGADO
- DOCUMENTO EXPIRADO
- DOCUMENTO SUBSTITUIDO
- INTEGRIDADE INVALIDA
- TOKEN INVALIDO

## Redaction rule

The UI must not show full hashes, private reasons, full signatures, patient identifiers or report content. Hashes must be partial and all content must be metadata-only.

## Compatibility

The old public certificate concept remains intact at service level. The page `/verify/:token` now renders the expanded portal for the simulated v0.8 contract.
