# SenseTrust Lean Freeze Operational Playbook v1.2

## Objetivo
Descrever o procedimento operacional padrao do Lean Freeze criado a partir do incidente v3.7. O fluxo diario deve usar clone limpo, manifesto e validacoes, deixando o v1.1 como recuperacao excepcional.

## Procedimento
Validar clone limpo, base branch, arquivos do manifesto, node, npm, dependencias, build, teste principal, regressoes e Obsidian. Se faltar dependencia, rodar `npm.cmd install --legacy-peer-deps --no-audit --no-fund`. Depois rodar `npm.cmd run build`.

## Regras de seguranca
Nao usar PowerShell admin no fluxo diario. Nao usar takeown/icacls no fluxo diario. Nao varrer node_modules. Usar clone limpo quando houver ACL quebrada. Usar git add por arquivo, nunca git add . e nunca git add -A.

## Validacao final
Commit novo, push, ls-remote, hash local/remoto igual e git status limpo. Sem dado clinico real, paciente real, operacao clinica real, certificacao diagnostica, contrato real, cliente real ou parceria formalizada. SenseTrust permanece metadata_only sob LGPD e neurodireitos para NeuroStrata, VitalStrata, DNDA e BLC. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável.
