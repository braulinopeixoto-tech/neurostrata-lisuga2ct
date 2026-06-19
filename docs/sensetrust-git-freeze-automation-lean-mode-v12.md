# SenseTrust Git Freeze Automation v1.2 Lean Mode

## Objetivo
Formalizar o Lean Freeze como fluxo diario de congelamento SenseTrust apos o incidente v3.7. A v3.7 Strategic Partnership Pilot Proposal Room congelou com clone limpo, manifesto, build, teste principal, regressoes, Obsidian, git add por arquivo, commit, push, hash local/remoto igual e git status limpo.

## Origem e decisao
O runner v1.1 ficou pesado porque tentou reparar ACL do Windows, depender de PowerShell admin, usar takeown/icacls e lidar com nomes locais como Administrators/Administradores. Isso e util apenas como recuperacao excepcional. O Lean Freeze e o novo padrao porque nao tenta consertar permissao: ele usa clone limpo como default recovery.

## Regras
O Lean cria automacao de freeze manifest-driven. Nao cria dado clinico real, paciente real, operacao clinica real, certificacao diagnostica, contrato real, cliente real ou parceria formalizada. Nao varre node_modules. Quando faltar dependencia, usar `npm.cmd install --legacy-peer-deps --no-audit --no-fund`. O build deve usar `npm.cmd run build`.

## Git
Sempre usar git add por arquivo. Nao usar `git add .`. Nao usar git add -A. O freeze so passa com hash local/remoto igual e git status limpo.

## Relacoes
Relaciona v3.7, v3.6, Git Freeze Automation v1.1, Obsidian, SenseTrust, DNDA, BLC, NeuroStrata e VitalStrata. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável. Mantem metadata_only, LGPD e neurodireitos.
