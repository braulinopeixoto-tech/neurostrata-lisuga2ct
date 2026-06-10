# SenseTrust RLS Hardening v0.2

Data: 2026-06-10

## Objetivo

Endurecer a camada SenseTrust no Supabase com Row Level Security, roles operacionais e uma funcao publica segura para verificacao de certificado. Esta sprint nao libera uso clinico real, nao cria QR PDF e nao altera UI.

## Escopo implementado

- Migration idempotente em `supabase/migrations/20260607100000_sensetrust_rls_hardening.sql`.
- Tabela `public.user_roles`.
- Funcoes auxiliares `public.has_sensetrust_role(required_roles text[])` e `public.is_sensetrust_admin()`.
- Remocao dinamica das policies anteriores nas tabelas SenseTrust.
- RLS habilitado nas tabelas criticas.
- Policies por papel para admin, auditor, clinician, reviewer, system e service.
- Sem `select` anon direto em `verification_tokens`.
- Funcao publica segura `public.verify_public_certificate(p_token text)`.
- `audit_events` mantida como append-only por triggers de update/delete.
- `report_versions` com status `signed` bloqueada contra edicao direta por policy e trigger.

## Papeis SenseTrust

- `sensetrust_admin`: administra roles, certificados, registros e documentos.
- `sensetrust_auditor`: leitura de trilhas auditaveis e metadados certificaveis.
- `sensetrust_clinician`: leitura e criacao controlada de evidencias, commits e versoes.
- `sensetrust_reviewer`: leitura revisora de versoes, evidencias e certificados.
- `sensetrust_system`: operacoes automatizadas internas.
- `sensetrust_service`: operacoes por service layer.

## Modelo publico de verificacao

A tabela `verification_tokens` nao recebe policy `anon`. A verificacao publica deve ocorrer apenas por:

```sql
select public.verify_public_certificate('<token>');
```

A funcao retorna somente metadados certificaveis e remove chaves sensiveis conhecidas do payload publico: `patient_name`, `patient_document`, `subject_ref` e `case_id`.

## Tabelas protegidas

- `evidence_objects`
- `clinical_commits`
- `audit_events`
- `trust_certificates`
- `report_versions`
- `consent_versions`
- `pipeline_versions`
- `verification_tokens`
- `prompt_versions`
- `codex_sessions`
- `decision_records`
- `obsidian_note_registry`
- `user_roles`

## Aplicacao manual

Nao executar `supabase db push` se houver drift de migrations. Usar o SQL manual:

- `docs/manual-supabase-apply-rls-v02.sql`

Depois rodar:

- `docs/supabase-rls-validation-queries.sql`

## Pendencias

- Aplicar no Supabase remoto via SQL Editor.
- Validar resultados das queries.
- Atualizar Obsidian real se o ambiente permitir escrita no vault.
- Commit e push no clone limpo.
- QR PDF permanece pendente.
- Uso clinico real permanece bloqueado.
