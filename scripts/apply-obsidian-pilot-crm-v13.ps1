$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")

if (!(Test-Path $VaultPath)) {
  throw "Obsidian vault not found: $VaultPath"
}

if (!(Test-Path (Join-Path $VaultPath ".obsidian"))) {
  throw "Obsidian vault marker not found: $VaultPath\.obsidian"
}

function Write-VaultNote {
  param(
    [string]$RelativePath,
    [string]$Content
  )

  $FullPath = Join-Path $VaultPath $RelativePath
  $Directory = Split-Path $FullPath -Parent
  if (!(Test-Path $Directory)) {
    New-Item -ItemType Directory -Path $Directory | Out-Null
  }
  Set-Content -LiteralPath $FullPath -Value $Content -Encoding UTF8
  return $FullPath
}

$SprintNote = @"
---
vault_id: $VaultId
type: sprint_record
module: SenseTrust
status: implemented_local_pending_git_build_obsidian_access
created_by: Codex
created: $Now
updated: $Now
trust_status: simulated_only
---

# SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3

## Estado

Sprint v1.3 implementa CRM operacional simulado para pipeline de pilotos fechados, gestao de organizacoes, status documental, risco operacional e decisao go/no-go.

## Links

- [[SenseTrust Pilot Console v1.0]]
- [[SenseTrust Pilot Package v1.1]]
- [[SenseTrust Pilot Onboarding Termos Consentimentos Contrato v1.2]]
- [[MOC_SenseTrust]]
- [[Supabase Execution Proof]]

## Regra operacional

Nao inserir dado clinico real, nao usar billing real e nao liberar uso clinico real. A exposicao autorizada e metadata_only.

## Organizacoes simuladas

- ORG-PILOT-SIM-001 Clinica Neurofuncional Alfa
- ORG-PILOT-SIM-002 Grupo Juridico Beta
- ORG-PILOT-SIM-003 Secretaria Municipal Gama
- ORG-PILOT-SIM-004 Equipe Multiprofissional Delta
- ORG-PILOT-SIM-005 Projeto VitalStrata Piloto Epsilon
"@

$RootNote = @"
---
vault_id: $VaultId
type: root_launcher
module: SenseTrust
status: current
created_by: Codex
created: $Now
updated: $Now
trust_status: simulated_only
---

# Abrir ultima nota SenseTrust

## Ultima nota

[[SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3]]

## Painel rapido SenseTrust

- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
- [[_LAST_SYNC]]

## Estado executivo

SenseTrust v1.3 tem CRM simulado para pilotos fechados, pipeline de organizacoes, go/no-go e governanca operacional.

## Regra operacional definitiva

Sem dado clinico real, sem billing real, sem assinatura juridica real e sem liberacao de uso clinico real.
"@

$LastSync = @"
---
vault_id: $VaultId
type: memory_sync
module: SenseTrust
status: updated
created_by: Codex
updated: $Now
trust_status: simulated_only
---

# _LAST_SYNC

Ultima sincronizacao: SenseTrust Pilot CRM v1.3.

Nota principal: [[SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3]]

Estado: CRM simulado implementado localmente; Git/build/Obsidian podem depender de permissao do ambiente.
"@

$Moc = @"
---
vault_id: $VaultId
type: moc
module: SenseTrust
status: updated
created_by: Codex
updated: $Now
trust_status: simulated_only
---

# MOC_SenseTrust

## Trilha atual

- [[SenseTrust Pilot Console v1.0]]
- [[SenseTrust Pilot Package v1.1]]
- [[SenseTrust Pilot Onboarding Termos Consentimentos Contrato v1.2]]
- [[SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3]]

## Fronteira

SenseTrust permanece como camada de confianca, rastreabilidade, versionamento, auditabilidade e verificabilidade. Nao certifica verdade diagnostica absoluta.
"@

Write-VaultNote "00_ABRIR_SENSETRUST\17_PILOT_CRM_v13.md" $RootNote | Out-Null
Write-VaultNote "05_SENSETRUST\SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3.md" $SprintNote | Out-Null
Write-VaultNote "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $RootNote | Out-Null
Write-VaultNote "00_MEMORY_INDEX\_LAST_SYNC.md" $LastSync | Out-Null
Write-VaultNote "05_SENSETRUST\MOC_SenseTrust.md" $Moc | Out-Null

Write-Host "status: updated"
Write-Host "vault: $VaultPath"
Write-Host "root: 00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
Write-Host "note: 05_SENSETRUST\SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3.md"
