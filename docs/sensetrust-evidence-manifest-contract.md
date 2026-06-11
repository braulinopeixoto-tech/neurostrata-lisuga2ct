# SenseTrust Evidence Manifest Contract v0.4

## Objetivo

O Evidence Manifest lista e vincula evidencias internas usadas para formar um documento DNDA simulado. Ele registra hashes, origem simulada, pipeline e prompt, sem expor conteudo clinico sensivel publicamente.

## Estrutura minima

- `schema`: `sensetrust.evidence_manifest.v1`
- `manifest_id`
- `document_id`
- `subject_scope`: `simulated_pseudonymized`
- `evidence_scope`: `simulated_only`
- `generated_at`
- `evidence_objects`
- `pipeline_reference`
- `prompt_reference`
- `manifest_hash`

## Evidence Object

Cada evidencia deve ter:

- `evidence_id`
- `source_type`
- `file_name`
- `content_hash`
- `hash_algorithm`: `SHA-256`
- `sensitivity`
- `included_in_public_certificate`: `false` para evidencias restritas

## Dados proibidos

- nome real;
- CPF;
- EEG real;
- anamnese;
- laudo real;
- hipotese diagnostica real;
- qualquer dado clinico real.

## Hash

O `manifest_hash` e calculado sobre uma representacao canonica do manifesto sem o proprio campo `manifest_hash`.

## Relacao com v0.3

O manifesto nao e exibido publicamente. A pagina `/verify/:token` da v0.3 pode referenciar somente metadados seguros do certificado publico.
