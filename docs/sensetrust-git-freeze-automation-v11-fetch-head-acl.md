# SenseTrust Git Freeze Automation v1.1 - FETCH_HEAD ACL Recovery

Status: operational memory patch.

Este patch endurece o preflight e o runner da SenseTrust Git Freeze Automation para tratar ACL persistente em `.git\FETCH_HEAD` sem permitir falso freeze.

## Incidente v3.4

Na sprint SenseTrust v3.4 Strategic Partner Readiness Room, o codigo local, teste principal, regressÃµes v3.3 ate v1.0, build e Obsidian passaram. O freeze foi bloqueado antes de branch/commit/push por `FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL`.

## Decisao

O bloqueio e correto. Git e a Trust Layer da SenseTrust nao devem registrar sucesso quando o CleanRepo nao permite acesso seguro ao `.git\FETCH_HEAD`. Forcar commit manual apos esse estado pode gerar branch vazia, hash remoto antigo ou divergencia entre Obsidian, GitHub e memoria operacional.

## Comportamento v1.1

- `Repair-FetchHeadAcl` repara especificamente `.git\FETCH_HEAD`.
- O preflight tenta `takeown`, `icacls`, `attrib -R -H -S`, `Remove-Item` e rename fallback.
- O preflight emite `PREFLIGHT_BLOCKED_FETCH_HEAD_ACL` quando o arquivo continua inacessivel.
- O runner emite `FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL` e para antes de branch, copia, commit ou push.

## Reparo elevado

PowerShell como Administrador:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\sensetrust-git-preflight-repair.ps1"
```

Depois do reparo, reexecutar o runner da sprint v3.4.

## Governanca

Este patch nao cria feature clinica, nao altera a v3.4 funcional, nao usa dado clinico real e nao muda LGPD, simulated_only ou metadata_only. Ele preserva NeuroStrata, VitalStrata, DNDA, BLC, SenseTrust, Trust Layer, Obsidian e Git como trilha auditavel. DNDA significa exatamente DiagnÃ³stico Neurofuncional Dimensional AuditÃ¡vel.
