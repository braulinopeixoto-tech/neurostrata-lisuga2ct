# SenseTrust Clean Clone Bootstrap v1.2

## Objetivo
Criar ou recriar o clone limpo usado pelo Lean Freeze sem reparo de ACL. A origem e o incidente v3.7, quando o caminho robusto foi abandonar permissao quebrada e trabalhar em clone limpo.

## O que cria
Prepara clone limpo, checkout da base, instalacao opcional de dependencias com `npm.cmd install --legacy-peer-deps --no-audit --no-fund` e build com `npm.cmd run build`.

## O que nao cria
Nao cria dado clinico real, paciente real, operacao clinica real, certificacao diagnostica, contrato real, cliente real, parceria formalizada ou fluxo comercial real. Nao usa PowerShell admin, takeown/icacls ou varredura de node_modules.

## Governanca
O clone limpo e default recovery; v1.1 fica como excecao legada. O freeze posterior deve usar manifesto, git add por arquivo, nunca git add . ou git add -A, hash local/remoto igual e git status limpo. Relaciona v3.7, v3.6, Git Freeze Automation v1.1, Obsidian, SenseTrust, DNDA, BLC, NeuroStrata e VitalStrata. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável. metadata_only, LGPD e neurodireitos.
