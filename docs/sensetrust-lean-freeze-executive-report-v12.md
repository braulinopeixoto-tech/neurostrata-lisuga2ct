# SenseTrust Lean Freeze Executive Report v1.2

## Objetivo
Registrar a decisao executiva de tornar o Lean Freeze o fluxo principal de congelamento SenseTrust. A origem foi o incidente v3.7, resolvido com clone limpo, dependencias instaladas, build, testes, Obsidian, commit seletivo, push e hash local/remoto igual.

## Criado
Runner Lean, bootstrap de clone limpo, template, manifesto exemplo, teste v1.2, script Obsidian e documentos de governanca. O Lean cria rastreabilidade operacional; nao cria produto clinico, contrato, cliente, parceria formalizada ou certificacao diagnostica.

## Racional
O v1.1 ficou pesado por tentar reparo de permissao. O Lean evita PowerShell admin, takeown/icacls e varredura de node_modules no dia a dia. Quando necessario, roda `npm.cmd install --legacy-peer-deps --no-audit --no-fund`; sempre valida `npm.cmd run build`.

## Condicao de aprovacao
Teste principal, regressoes, Obsidian, git add por arquivo, commit, push, ls-remote, hash local/remoto igual e git status limpo. Relações: v3.7, v3.6, Git Freeze Automation v1.1, Obsidian, SenseTrust, DNDA, BLC, NeuroStrata e VitalStrata. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável. metadata_only, LGPD e neurodireitos. Sem dado clinico real, paciente real, operacao clinica real, contrato real, cliente real ou parceria formalizada.
