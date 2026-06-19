# SenseTrust Git Freeze Automation Memory

## Objetivo

Criar memoria operacional e automacao permanente para impedir repeticao do entrave Git/Freeze nas sprints SenseTrust. Esta camada nao altera feature clinica, dado clinico, LGPD, simulated_only ou metadata_only.

## Origem do problema

Nas sprints v3.1, v3.2 e v3.3 o codigo local passou em teste principal, regressões, build e Obsidian, mas o congelamento final sofreu falhas operacionais no clone limpo. O padrao dominante foi `.git/FETCH_HEAD Permission denied`.

## Historico dos incidentes

- v3.1 Strategic Scale Operating Model: risco de branch vazia, permissao Git e falso freeze.
- v3.2 Strategic Scale Simulation Console: risco de push sem commit novo e hash remoto antigo.
- v3.3 Strategic Scale Evidence Simulator: repeticao do bloqueio `cannot open '.git/FETCH_HEAD': Permission denied`.

## Padroes de falha

- `.git/FETCH_HEAD Permission denied`.
- Branch criada vazia apontando para commit anterior.
- Arquivos do SourceRepo nao copiados para o CleanRepo.
- Variaveis `$Files`, `$CleanRepo` ou `$SourceRepo` ausentes.
- Execucao em `C:\WINDOWS\system32`.
- Script Obsidian de versao errada.
- `nothing to commit, working tree clean`.
- `ls-remote` apontando para hash antigo.

## Protocolo manual que funcionou

Encerrar processos que travam Git, tomar posse do CleanRepo, reparar ACLs com `icacls`, remover read-only, remover locks, remover `FETCH_HEAD`, copiar arquivos seletivamente, validar status, rodar testes, build, Obsidian, commit seletivo, push e confirmar hash remoto.

## Automacao proposta

- `scripts/sensetrust-git-preflight-repair.ps1`: repara permissoes e valida `.git`.
- `scripts/sensetrust-sprint-freeze-runner.ps1`: executa freeze guiado por manifesto JSON.
- `scripts/sensetrust-sprint-freeze-manifest.example.json`: exemplo real v3.3.
- `scripts/test-sensetrust-git-freeze-automation.mjs`: teste de sanidade da automacao.

## Como usar antes da proxima sprint

1. Atualizar ou criar manifesto da sprint.
2. Rodar o runner com o manifesto.
3. Aceitar freeze somente se o runner emitir `FREEZE_PASS`.
4. Bloquear a proxima sprint se houver `FREEZE_BLOCKED`.

## Criterios de bloqueio

Bloquear se houver `FETCH_HEAD` travado, CleanRepo ausente, `.git` ausente, execucao em `C:\WINDOWS\system32`, branch vazia, script Obsidian errado, teste principal falhando, regressao falhando, build falhando, commit ausente, push ausente, working tree sujo ou hash remoto diferente do commit local.

## Criterios de aprovacao

Freeze aprovado exige commit novo diferente da base, push realizado, `git status --short` limpo, `ls-remote` igual ao commit local, teste principal PASS, regressões PASS, build PASS e Obsidian correto aplicado.

## Governanca

SenseTrust atua como Trust Layer operacional do ecossistema NeuroStrata / VitalStrata: rastreia decisao, evidencia, versao e bloqueios. BLC atua como cadeia logica de rastreabilidade. DNDA significa exatamente Diagnóstico Neurofuncional Dimensional Auditável. Obsidian registra memoria operacional, Git registra trilha auditavel e Supabase permanece memoria operacional estruturada quando aplicavel.

## Limites

Esta memoria nao cria feature clinica, nao usa dado clinico, nao altera LGPD, nao altera simulated_only, nao substitui revisao humana e nao autoriza uso clinico real. Ela reduz risco operacional de falso congelamento.

## Recomendacoes para v3.4

Antes de implementar v3.4, executar o preflight e congelar v3.3 com o runner. Nao avancar com freeze incompleto.

## v1.1 - FETCH_HEAD ACL Recovery

Incidente observado: na sprint SenseTrust v3.4 Strategic Partner Readiness Room, a implementacao local foi concluida, o teste principal passou, as regressÃµes v3.3 ate v1.0 passaram, o teste da Git Freeze Automation Memory passou, o build passou, o Obsidian foi atualizado e a root note apontou para `[[37_STRATEGIC_PARTNER_READINESS_ROOM_v34]]`. Mesmo assim, o freeze foi bloqueado antes de branch, copia, commit ou push por ACL persistente em `.git\FETCH_HEAD` no CleanRepo.

Codigo operacional do bloqueio: `FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL`.

Causa provavel: ACL resistente, heranca quebrada, ownership incorreto ou arquivo travado dentro de `.git`, especialmente em `FETCH_HEAD`. Esse estado impede que o Git atualize refs com seguranca e pode produzir falso freeze se for ignorado.

O runner bloqueou corretamente porque o Git e a trilha auditavel da SenseTrust nao podem declarar sucesso quando `FETCH_HEAD` continua inacessivel. Forcar commit/push manual apos esse bloqueio quebra a governanca do Git como trilha auditavel e pode criar branch vazia, hash remoto antigo ou divergencia entre SourceRepo, CleanRepo, Obsidian e GitHub.

Nao se deve forcar commit manual apos `PREFLIGHT_BLOCKED_FETCH_HEAD_ACL`. Primeiro e necessario reparar ACL/ownership do CleanRepo, depois reexecutar o runner completo com o manifesto da sprint.

Solucao elevada:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\sensetrust-git-preflight-repair.ps1"
```

Executar em PowerShell como Administrador quando o usuario comum nao tiver privilegio de propriedade sobre `C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct\.git`.

Comportamento esperado do preflight v1.1:

- Registrar CleanRepo, principal e se a execucao caiu em `C:\WINDOWS\system32`.
- Validar CleanRepo e `.git`.
- Encerrar processos que podem travar Git.
- Aplicar reparo especifico em `.git\FETCH_HEAD` com `takeown`, `icacls`, `attrib -R -H -S`, `Remove-Item` e fallback por rename `FETCH_HEAD.blocked.<timestamp>.bak`.
- Emitir `PREFLIGHT_FETCH_HEAD_CLEARED` quando o arquivo foi removido ou renomeado.
- Emitir `PREFLIGHT_BLOCKED_FETCH_HEAD_ACL` quando o arquivo continua inacessivel.
- Emitir `PREFLIGHT_BLOCKED_CLEAN_REPO_MISSING`, `PREFLIGHT_BLOCKED_GIT_DIR_MISSING`, `PREFLIGHT_BLOCKED_GIT_STATUS_FAILED` ou `PREFLIGHT_PASS` conforme o caso.

Comportamento esperado do runner v1.1:

- Se receber `PREFLIGHT_BLOCKED_FETCH_HEAD_ACL`, emitir `FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL`.
- Nao criar branch.
- Nao copiar arquivos.
- Nao rodar testes como se o freeze estivesse apto.
- Nao fazer commit.
- Nao fazer push.
- Nao simular sucesso.
- Preservar bloqueio contra branch vazia, falso freeze, script Obsidian errado, teste principal, regressÃµes, build, status Git limpo, `ls-remote`, hash remoto igual ao commit local e commit novo diferente da base.

Criterios para liberar novo freeze:

- `PREFLIGHT_PASS`.
- `FETCH_HEAD` ausente apos reparo.
- `git status --short` funcional no CleanRepo.
- Runner da sprint emite `FREEZE_PASS`.
- Branch remota existe.
- Commit local e hash remoto coincidem.
- Obsidian, GitHub e docs permanecem alinhados.

Esta memoria v1.1 preserva NeuroStrata, VitalStrata, DNDA, BLC, SenseTrust, Trust Layer, metadata_only, LGPD, Obsidian e Git como trilha auditavel. DNDA significa exatamente DiagnÃ³stico Neurofuncional Dimensional AuditÃ¡vel.
