# SenseTrust Public Verification Safety Contract

Status: v0.8 simulated public safety contract.

## Purpose

The public portal must allow external verification without exposing clinical content or personal data.

## Allowed public metadata

- simulated token status;
- simulated document id;
- simulated certificate id;
- simulated emission id;
- document lifecycle state;
- signature and timestamp status;
- issued and verified dates;
- simulated professional role;
- simulated institution name;
- partial hashes only;
- safe public messages and action hints.

## Prohibited public fields

- patient name;
- CPF or other identifiers;
- birth date, address, phone or email;
- diagnosis or diagnostic hypothesis;
- clinical report content;
- anamnesis;
- EEG, qEEG or sLORETA;
- scales and raw scores;
- medications;
- clinical notes;
- private revocation reason;
- real professional license number;
- full document text.

## Diagnostic truth boundary

SenseTrust public verification states that a document is traceable, versioned and integrity-checked. It does not state that a diagnosis is absolutely true.
