# SenseTrust Runner v1.1 Limitations

## Objetivo
Documentar por que o runner v1.1 deixou de ser o caminho principal apos o incidente v3.7. Ele ficou seguro, mas pesado para uso diario.

## Limitacoes
O v1.1 tentou reparar ACL, depender de PowerShell admin, usar takeown/icacls e lidar com nomes locais de administracao do Windows. Esse desenho pode ser lento e fragil em Windows em portugues. A excecao administrativa fica deprecated para recuperacao rara; o padrao passa a ser clone limpo.

## Lean como padrao
O Lean Freeze cria um fluxo manifest-driven: copiar arquivos listados, rodar `npm.cmd install --legacy-peer-deps --no-audit --no-fund` quando necessario, rodar `npm.cmd run build`, teste principal, regressoes, Obsidian, git add por arquivo, commit, push, ls-remote, hash local/remoto igual e git status limpo.

## Limites clinicos e comerciais
Nao cria dado clinico real, paciente real, operacao clinica real, certificacao diagnostica, contrato real, cliente real ou parceria formalizada. Relaciona v3.7, v3.6, Git Freeze Automation v1.1, Obsidian, SenseTrust, DNDA, BLC, NeuroStrata e VitalStrata. DNDA significa Diagnóstico Neurofuncional Dimensional Auditável. metadata_only, LGPD e neurodireitos.
