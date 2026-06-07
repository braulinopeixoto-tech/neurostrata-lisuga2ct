# SenseTrust Layer MVP

## Objetivo

SenseTrust Layer e a camada transversal de confianca do NeuroStrata, VitalStrata e DNDA. Ela certifica que o processo clinico-documental e rastreavel, versionado, auditavel, assinado e verificavel. Ela nao certifica que uma formulacao DNDA e verdade absoluta ou diagnostico nosologico fechado.

## Fundacao Supabase

Tabelas principais:

- `audit_events`: trilha append-only para acesso, edicao, exportacao, assinatura e revogacao.
- `evidence_objects`: registro de arquivos clinicos, exames, biomarcadores, protocolos e documentos com hash SHA-256.
- `clinical_commits`: cadeia de alteracoes clinicas com `parent_commit_id`, diff e Evidence Manifest.
- `trust_certificates`: certificado do documento com status, hash, versao, emissor, data e revogacao.
- `prompt_versions`: versionamento de prompts, regras de seguranca e schemas de saida.
- `codex_sessions`: registro operacional das sessoes Codex que alteram arquitetura, codigo ou decisoes.
- `decision_records`: ADRs/decisoes rastreaveis ligando Supabase, GitHub e Obsidian.

Tabelas auxiliares:

- `report_versions`: versoes de relatorios DNDA com status `draft`, `reviewed`, `signed`, `amended`, `revoked`.
- `consent_versions`: versoes de consentimento.
- `pipeline_versions`: versoes de pipelines/modelos.
- `verification_tokens`: tokens publicos para QR Code e rota `/verify/:token`.

## Regras de integridade

- Todo arquivo clinico deve ter `sha256_hash`.
- Todo relatorio final deve ter Evidence Manifest.
- Relatorios assinados nao podem sofrer edicao direta de conteudo critico; devem gerar adendo ou nova versao.
- `audit_events` nao aceita update/delete.
- Certificados podem estar `active`, `amended`, `revoked` ou `expired`.
- A rota publica de verificacao exibe apenas metadados certificaveis: status, hash, versao, emissor, datas e revogacao.

## Compatibilidade conceitual FHIR

`audit_events.fhir_audit_event` armazena payload compatual com FHIR AuditEvent. `trust_certificates.certificate_payload` representa Provenance do documento certificado. A implementacao MVP nao substitui um servidor FHIR, mas preserva a semantica para evolucao futura.

## LGPD

Dados sensiveis e identificadores do paciente nao devem aparecer em tokens publicos, QR Code ou notas Obsidian. O Supabase deve separar dado clinico sensivel de metadados certificaveis, usando pseudonimizacao, RLS e minimizacao.

## Teste minimo

O script `npm run test:sensetrust` cria um hash de payload canonico, altera o conteudo e confirma que o hash resultante e diferente. Isso demonstra que uma alteracao posterior invalida a integridade do certificado.
