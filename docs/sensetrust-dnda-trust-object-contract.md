# SenseTrust DNDA Trust Object Contract v0.4

## Objetivo

O DNDA Trust Object e o objeto interno certificavel que conecta documento DNDA simulado, Evidence Manifest, hashes de pipeline/prompt e certificado publico simulado.

## Estrutura minima

- `schema`: `sensetrust.dnda_trust_object.v1`
- `trust_object_id`
- `document_id`
- `document_type`: `DNDA_REPORT_SIMULATED`
- `document_version`
- `subject_scope`: `simulated_pseudonymized`
- `evidence_manifest_id`
- `evidence_manifest_hash`
- `document_hash`
- `pipeline_hash`
- `prompt_hash`
- `public_certificate`
- `status`
- `created_at`
- `created_by`
- `trust_object_hash`

## Public Certificate Reference

O objeto referencia um certificado publico simulado:

- `certificate_id`
- `token_scope`: `public_metadata_only`
- `verification_route`: `/verify/:token`
- `public_exposure`: `metadata_only`

## Integridade

O `trust_object_hash` e calculado sobre uma representacao canonica do objeto sem o proprio campo `trust_object_hash`. Alteracao em `document_hash`, manifesto, pipeline, prompt ou certificado deve invalidar o hash.

## Limite

Este contrato nao emite certificado publico real e nao libera uso clinico real.
