$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Visual QA Demo Readiness Revisao Visual Checklist Apresentacao Roteiro Demonstracao v2.1"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }

$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) {
  $FullPath = Join-Path $VaultRoot $Folder
  if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null }
}

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\25_DEMO_READINESS_v21.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/DemoReadiness","SenseTrust/VisualQA","SenseTrust/PrototypeUX","SenseTrust/MockupInterativo","SenseTrust/RotasPublicas","SenseTrust/UXPublica","SenseTrust/WebsiteBlueprint","SenseTrust/LandingExperience","SenseTrust/PublicNarrative","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","DemoReadiness","VisualQA","RoteiroDemonstracao")

$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"
$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.1
status: implemented_local_demo_readiness
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Prototype UX]] [[Website Blueprint]] [[Visual QA]] [[Demo Readiness]] [[Roteiro de Demonstracao]] [[Presentation Checklist]] [[Demo Governance]] [[Mockup Interativo]] [[Rotas Publicas]] [[Disclosure Publico]]

Status: Visual QA e Demo Readiness v2.1 implementados para demonstracao controlada.

Bloqueios: sem site publicado, sem deploy, sem coleta real, sem analytics real, sem CRM real, sem billing real, sem receita real, sem certificacao diagnostica absoluta.
"@

$QuickContent = "# 25_DEMO_READINESS_v21`n`nUltima nota: [[$SprintTitle]]`n`nVisual QA, roteiro, checklist, riscos, objection handling e demo governance v2.1."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[25_DEMO_READINESS_v21]]`n- [[$SprintTitle]]`n`nRegra: demonstracao controlada, metadata_only, sem producao, sem lead real e sem certificacao diagnostica absoluta."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[25_DEMO_READINESS_v21]] / [[$SprintTitle]]`nStatus: Demo Readiness v2.1 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Demo Readiness v2.1 - [[25_DEMO_READINESS_v21]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) {
  $MocPath = Join-Path $VaultRoot $Moc
  if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }
  Add-Content -LiteralPath $MocPath -Value "`n- [[25_DEMO_READINESS_v21]] - [[$SprintTitle]]"
}
$Payload = @{ latest_sensetrust_note = "25_DEMO_READINESS_v21"; latest_title = $SprintTitle; latest_version = "v2.1"; updated = $Now; status = "implemented_local_demo_readiness"; constraints = @("metadata_only", "no_real_leads", "no_real_analytics", "no_production_deploy", "no_diagnostic_truth_certification") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Demo Readiness v2.1 notes updated"
