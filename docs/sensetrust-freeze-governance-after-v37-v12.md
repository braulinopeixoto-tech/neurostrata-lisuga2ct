# SenseTrust Freeze Governance after v3.7

## Objetivo
Definir governanca de freeze depois da v3.7 Strategic Partnership Pilot Proposal Room. O incidente v3.7 mostrou que o padrao diario deve ser Lean Freeze e clone limpo, nao reparo administrativo de permissao.

## Politica
Nao usar PowerShell admin no fluxo diario. Nao usar takeown/icacls no fluxo diario. Nao varrer node_modules. Usar clone limpo quando houver ACL quebrada. Instalar dependencias com `npm.cmd install --legacy-peer-deps --no-audit --no-fund` e validar com `npm.cmd run build`.

## Controle Git
Git add por arquivo. Nao usar `git add .`. Nao usar git add -A. Bloquear branch vazia, build falhando, teste principal falhando, regressao falhando, Obsidian errado, push falhando, hash remoto divergente e git status sujo.

## Limites
Sem dado clinico real, paciente real, operacao clinica real, certificacao diagnostica, contrato real, cliente real ou parceria formalizada. Relaciona v3.7, v3.6, Git Freeze Automation v1.1, Obsidian, SenseTrust, DNDA, BLC, NeuroStrata e VitalStrata. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável. metadata_only, LGPD e neurodireitos.
