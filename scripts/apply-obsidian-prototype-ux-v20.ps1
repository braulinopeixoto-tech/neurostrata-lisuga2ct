$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Prototype UX Navegacao Visual Rotas Publicas Mockup Interativo v2.0"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) {
  throw "Obsidian vault not found: $VaultRoot"
}

$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) {
  $FullPath = Join-Path $VaultRoot $Folder
  if (-not (Test-Path -LiteralPath $FullPath)) {
    New-Item -ItemType Directory -Path $FullPath | Out-Null
  }
}

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\24_PROTOTYPE_UX_v20.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @(
  "05_SENSETRUST\MOC_SenseTrust.md",
  "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md",
  "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md",
  "05_SENSETRUST\MOC_DNDA_Trust_Object.md",
  "05_SENSETRUST\MOC_BLC_Rastreabilidade.md"
)

$Tags = @(
  "SenseTrust", "SenseTrust/PrototypeUX", "SenseTrust/MockupInterativo", "SenseTrust/RotasPublicas",
  "SenseTrust/UXPublica", "SenseTrust/WebsiteBlueprint", "SenseTrust/LandingExperience",
  "SenseTrust/PublicNarrative", "SenseTrust/TrustLayer", "SenseTrust/DNDA", "SenseTrust/VitalStrata",
  "SenseTrust/NeuroStrata", "SenseTrust/BLC", "NeuroStrata/TrustLayer", "VitalStrata/SaaS",
  "DNDA/Auditavel", "BLC/Rastreabilidade", "MetadataOnly", "Neurodireitos", "LGPD",
  "Obsidian/NATE", "PrototypeUX", "MockupInterativo", "RotasPublicas"
)

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.0
status: implemented_local_prototype
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$($Tags | ForEach-Object { "  - $_" } | Out-String)
---

# $SprintTitle

Status: IMPLEMENTADO COMO PROTOTIPO VISUAL SIMULADO

## Links de contexto

- [[NeuroStrata]]
- [[VitalStrata]]
- [[DNDA]]
- [[BLC]]
- [[Trust Layer]]
- [[SenseTrust Layer]]
- [[Neurodireitos]]
- [[LGPD]]
- [[Metadata Only]]
- [[Website Blueprint]]
- [[Landing Experience]]
- [[UX Publica]]
- [[Prototype UX]]
- [[Rotas Publicas]]
- [[Mockup Interativo]]
- [[Verificacao Publica]]
- [[CTA Simulado]]
- [[Formulario Mockado]]
- [[Disclosure Publico]]

## Resultado

Prototype UX v2.0 cria navegacao visual, rotas publicas simuladas, mockup interativo, verificacao publica demo, formulario mockado bloqueado e disclosure visual.

## Bloqueios

- Sem site publicado.
- Sem deploy de producao.
- Sem coleta real de leads.
- Sem analytics real.
- Sem CRM real.
- Sem billing real.
- Sem receita real.
- Sem certificacao diagnostica absoluta.
"@

$QuickContent = @"
---
vault_id: b1a32fcb40985ffc
type: quick_open
module: SenseTrust
version: v2.0
status: latest_sensetrust_note
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# 24_PROTOTYPE_UX_v20

Ultima nota: [[$SprintTitle]]

Prototype UX: navegacao visual, rotas publicas simuladas, mockup interativo, formulario bloqueado, disclosure publico.
"@

$RootContent = @"
---
vault_id: b1a32fcb40985ffc
type: root_note
module: SenseTrust
status: active
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# Abrir ultima nota SenseTrust

- [[24_PROTOTYPE_UX_v20]]
- [[$SprintTitle]]

## Estado executivo

Prototype UX v2.0 implementado como prototipo visual simulado.

## Regra operacional

Nao declarar producao, deploy, lead real, analytics real, billing real, receita real, cliente real ou certificacao diagnostica absoluta sem sprint futura especifica e validacao externa.
"@

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[24_PROTOTYPE_UX_v20]] / [[$SprintTitle]]`nStatus: Prototype UX v2.0 implemented as simulated visual prototype.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Prototype UX v2.0 - [[24_PROTOTYPE_UX_v20]] - [[$SprintTitle]]"

foreach ($Moc in $Mocs) {
  $MocPath = Join-Path $VaultRoot $Moc
  if (-not (Test-Path -LiteralPath $MocPath)) {
    Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8
  }
  Add-Content -LiteralPath $MocPath -Value "`n- [[24_PROTOTYPE_UX_v20]] - [[$SprintTitle]]"
}

$Payload = @{
  latest_sensetrust_note = "24_PROTOTYPE_UX_v20"
  latest_title = $SprintTitle
  latest_version = "v2.0"
  updated = $Now
  status = "implemented_local_prototype"
  constraints = @("metadata_only", "no_real_leads", "no_real_analytics", "no_production_deploy", "no_diagnostic_truth_certification")
} | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8

Write-Host "PASS Obsidian Prototype UX v2.0 notes updated"
