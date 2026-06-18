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
