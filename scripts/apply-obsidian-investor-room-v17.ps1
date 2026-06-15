$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")

if (!(Test-Path $VaultPath)) { throw "Obsidian vault not found: $VaultPath" }
if (!(Test-Path (Join-Path $VaultPath ".obsidian"))) { throw "Obsidian vault marker not found: $VaultPath\.obsidian" }

function Write-VaultNote {
  param([string]$RelativePath, [string]$Content)
  $FullPath = Join-Path $VaultPath $RelativePath
  $Directory = Split-Path $FullPath -Parent
  if (!(Test-Path $Directory)) { New-Item -ItemType Directory -Path $Directory | Out-Null }
  Set-Content -LiteralPath $FullPath -Value $Content -Encoding UTF8
}

$Frontmatter = @"
---
vault_id: $VaultId
type: sprint_record
module: SenseTrust
status: implemented
created_by: Codex
created: $Now
updated: $Now
trust_status: simulated_only
---
"@

$SprintNote = @"
$Frontmatter

# SenseTrust Investor Strategic Partnership Room Data Room Pitch Deck Aliancas Institucionais v1.7

## Links

- [[NeuroStrata]]
- [[VitalStrata]]
- [[DNDA]]
- [[BLC]]
- [[Trust Layer]]
- [[SenseTrust Layer]]
- [[Revenue Operations]]
- [[Pricing Strategy]]
- [[Feedback Intelligence]]
- [[Pilot CRM]]
- [[Piloto Fechado]]
- [[Data Room]]
- [[Pitch Deck]]
- [[Aliancas Institucionais]]
- [[Due Diligence]]
- [[Neurodireitos]]
- [[LGPD]]

## Estado

Sala estrategica v1.7 com data room, pitch textual, mapa de parcerias, FAQ, due diligence, use of funds e risk disclosure.

## Fronteira

Sem dado clinico real, receita real, billing real, contratos reais assinados, Gov.br integrado ou ICP-Brasil integrado.
"@

$RootNote = @"
$Frontmatter

# Abrir ultima nota SenseTrust

## Ultima nota

[[21_INVESTOR_PARTNERSHIP_ROOM_v17]]

[[SenseTrust Investor Strategic Partnership Room Data Room Pitch Deck Aliancas Institucionais v1.7]]

## Painel rapido

- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[_LAST_SYNC]]
"@

$LastSync = @"
$Frontmatter

# _LAST_SYNC

Ultima sincronizacao: SenseTrust Investor Strategic Partnership Room v1.7.

Root: [[21_INVESTOR_PARTNERSHIP_ROOM_v17]]
"@

$Moc = @"
$Frontmatter

# MOC_SenseTrust

## Trilha atual

- [[SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6]]
- [[SenseTrust Investor Strategic Partnership Room Data Room Pitch Deck Aliancas Institucionais v1.7]]
"@

$Manifest = @"
$Frontmatter

# MEMORY_MANIFEST

- current_sprint: SenseTrust Investor Strategic Partnership Room v1.7
- root_note: 00_ABRIR_SENSETRUST/21_INVESTOR_PARTNERSHIP_ROOM_v17.md
- public_exposure: metadata_only
- simulated_only: true
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "current_sprint": "SenseTrust Investor Strategic Partnership Room v1.7",
  "root_note": "00_ABRIR_SENSETRUST/21_INVESTOR_PARTNERSHIP_ROOM_v17.md",
  "public_exposure": "metadata_only",
  "simulated_only": true,
  "updated": "$Now"
}
"@

Write-VaultNote "00_ABRIR_SENSETRUST\21_INVESTOR_PARTNERSHIP_ROOM_v17.md" $RootNote
Write-VaultNote "05_SENSETRUST\SenseTrust Investor Strategic Partnership Room Data Room Pitch Deck Aliancas Institucionais v1.7.md" $SprintNote
Write-VaultNote "05_SENSETRUST\MOC_SenseTrust.md" $Moc
Write-VaultNote "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $RootNote
Write-VaultNote "00_MEMORY_INDEX\_LAST_SYNC.md" $LastSync
Write-VaultNote "00_MEMORY_INDEX\MEMORY_MANIFEST.md" $Manifest
Write-VaultNote "00_MEMORY_INDEX\MEMORY_MANIFEST.json" $ManifestJson

Write-Host "status: updated"
Write-Host "vault: $VaultPath"
Write-Host "root: 00_ABRIR_SENSETRUST\21_INVESTOR_PARTNERSHIP_ROOM_v17.md"
