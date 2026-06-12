# SenseTrust Clinical Commit Chain / Versionamento Clinico Auditavel v0.5

## Objetivo

Implementar uma cadeia simulada de commits clinicos para relatorios DNDA, provando versionamento auditavel sem dados clinicos reais.

## Cadeia simulada

1. `initial_draft`
2. `evidence_attached`
3. `dnda_trust_object_created`
4. `human_review`
5. `clinical_revision`
6. `signed_final`

Adendos e revogacoes sao modelados como novos commits pos-assinatura.

## Relacao com fases anteriores

- v0.3: certificado publico e rota `/verify/:token`.
- v0.4: DNDA Trust Object e Evidence Manifest.
- v0.5: genealogia de versoes clinicas em cima do objeto DNDA simulado.

## Garantias

- Primeiro commit sem parent.
- Commits seguintes com `parent_commit_id`.
- `previous_hash` encadeado com `current_hash` anterior.
- `current_hash` detecta alteracao em `diff_json`.
- `document_hash` alterado invalida a cadeia.
- `signed_final` bloqueia edicao destrutiva.

## Limites

- Somente dados simulados.
- Sem uso clinico real.
- Sem alteracao de RLS v0.2.
- Sem alteracao do QR v0.3.
- Sem assinatura digital ICP-Brasil.
