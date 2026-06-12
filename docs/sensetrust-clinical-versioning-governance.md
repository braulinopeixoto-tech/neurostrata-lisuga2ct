# SenseTrust Clinical Versioning Governance v0.5

## Por que o estado final nao basta

Um relatorio final assinado nao explica como chegou ao estado final. A cadeia de commits clinicos preserva genealogia, autoria, motivo, diff e integridade de cada mudanca relevante.

## Genealogia

`parent_commit_id` forma a genealogia linear da versao simulada. Quebra do parent invalida a cadeia.

## Hash chain

`previous_hash` e `current_hash` formam uma cadeia de integridade. Alteracao retroativa em `diff_json`, `document_hash` ou parent quebra a validacao.

## Assinatura final

Depois de `signed_final`, edicao destrutiva nao deve ocorrer como update. Qualquer correcao deve ser:

- `amended`;
- `revoked`;
- `superseded`.

Essas acoes sao novos commits, nao sobrescrita do estado anterior.

## Relacao com v0.4

A cadeia referencia:

- DNDA Trust Object;
- Evidence Manifest;
- document hash;
- trust object hash;
- evidence manifest hash.

## Proxima fase

v0.6 deve aprofundar revogacao, adendo e supersessao como fluxos auditaveis.
