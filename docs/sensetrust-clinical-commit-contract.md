# SenseTrust Clinical Commit Contract v0.5

## Objetivo

Definir o formato minimo de um Clinical Commit SenseTrust para versionamento auditavel de relatorios DNDA simulados.

## Commit clinico versus commit transacional

Um commit transacional registra mudanca tecnica em banco ou codigo. Um commit clinico registra uma mudanca relevante no ciclo de vida do documento clinico, com motivo, ator, diff, hash e genealogia.

## Campos obrigatorios

- `schema`: `sensetrust.clinical_commit.v1`
- `commit_id`
- `parent_commit_id`
- `chain_id`
- `document_id`
- `trust_object_id`
- `evidence_manifest_id`
- `commit_type`
- `status`
- `actor`
- `reason`
- `diff_json`
- `previous_hash`
- `current_hash`
- `evidence_manifest_hash`
- `document_hash`
- `trust_object_hash`
- `created_at`
- `sequence`

## Integridade

`current_hash` e calculado sobre o conteudo canonico do commit, excluindo o proprio `current_hash`.

Cada commit posterior ao primeiro deve apontar para:

- `parent_commit_id` do commit anterior;
- `previous_hash` igual ao `current_hash` do commit anterior.

## Dados proibidos

O commit nao deve carregar nome real, CPF, EEG real, anamnese real, hipotese diagnostica real, escala clinica real ou laudo real.
