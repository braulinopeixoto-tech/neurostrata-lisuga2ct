---
title: "SenseTrust RLS Hardening v0.2 — Final Approval"
type: final_approval
module: SenseTrust
project: NeuroStrata / DNDA / VitalStrata
status: approved
supabase_status: approved
validation: "7/7 PASS"
git_branch: chore/sensetrust-rls-hardening-v02
git_commit_final: f20feff
vault_id: b1a32fcb40985ffc
trust_status: governed
clinical_use_status: restricted_until_qr_and_governance
---

# SenseTrust RLS Hardening v0.2 — Final Approval

## Status final

- SenseTrust RLS Hardening v0.2: APROVADA NO SUPABASE
- Checklist final: 7/7 PASS
- Commit final: f20feff
- Branch: chore/sensetrust-rls-hardening-v02
- Obsidian: atualizado anteriormente
- Git: patch final registrado
- QR PDF / Certificado Publico Seguro: proxima sprint
- Uso clinico real amplo: ainda condicionado a QR seguro + governanca

## Checklist final

```text
01_functions_exist                                    PASS
02_all_target_tables_have_rls                         PASS
03_no_open_true_policies_on_sensetrust_tables         PASS
04_verification_tokens_no_anon_public_direct_grants   PASS
05_anon_can_execute_verify_public_certificate         PASS
06_audit_events_append_only_no_update_delete_policies PASS
07_report_versions_signed_update_blocked             PASS
```

## Decisoes tecnicas aprovadas

1. `verification_tokens` nao possui grant direto para `anon`/`public`.
2. `verify_public_certificate(text)` e a via publica segura de validacao.
3. `anon`/`authenticated` podem executar `verify_public_certificate`.
4. `audit_events` permanece append-only.
5. `report_versions` com status `signed` nao pode sofrer edicao direta.
6. Alteracoes futuras em documentos assinados devem ocorrer por nova versao, adendo ou revogacao.
7. SenseTrust certifica processo, versao, integridade, autoria e rastreabilidade; nao certifica verdade diagnostica absoluta.

## SQL critico registrado

```sql
revoke all privileges on table public.verification_tokens from anon;
revoke all privileges on table public.verification_tokens from public;

grant execute on function public.verify_public_certificate(text) to anon;
grant execute on function public.verify_public_certificate(text) to authenticated;
```

## Racional academico

A RLS v0.2 representa a transicao da SenseTrust de uma camada de rastreabilidade estrutural para uma camada com controle de acesso em nivel de linha. Essa mudanca permite verificacao publica segura sem exposicao de dados clinicos sensiveis, separando metadados certificaveis de informacao clinica protegida.

Essa fase sustenta a tese de uma cadeia de custodia neurofuncional auditavel para relatorios DNDA, biomarcadores, qEEG, laudos versionados e certificados clinicos. A camada certifica o processo, a integridade e a rastreabilidade do documento; nao afirma uma verdade diagnostica absoluta.

## Limites atuais

- QR PDF ainda nao implementado.
- Pagina publica de verificacao ainda nao implementada.
- Fluxo ponta a ponta com dado simulado ainda nao realizado.
- Governanca formal de emissao/revogacao ainda pendente.
- Assinatura digital forte ainda nao integrada.
- Uso clinico real amplo ainda nao liberado.

## Proxima fase

Proxima sprint:

SenseTrust QR PDF / Certificado Publico Seguro v0.3

Objetivo da proxima sprint:

```text
PDF final -> QR Code -> token publico -> verify_public_certificate -> pagina publica de validacao
```

Regra:

Nenhum dado clinico sensivel deve aparecer na pagina publica.
