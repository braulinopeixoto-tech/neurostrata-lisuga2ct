$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Partner Demo Kit Parceiros Investidores Instituicoes v2.2"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) { $FullPath = Join-Path $VaultRoot $Folder; if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null } }

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\26_PARTNER_DEMO_KIT_v22.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/PartnerDemoKit","SenseTrust/DemoReadiness","SenseTrust/VisualQA","SenseTrust/PrototypeUX","SenseTrust/MockupInterativo","SenseTrust/RotasPublicas","SenseTrust/UXPublica","SenseTrust/WebsiteBlueprint","SenseTrust/LandingExperience","SenseTrust/PublicNarrative","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","PartnerDemoKit","DemoReadiness","OnePageDemo","AudienceBriefing","MeetingScript")
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.2
status: implemented_local_partner_demo_kit
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Prototype UX]] [[Demo Readiness]] [[Partner Demo Kit]] [[One Page Demo]] [[Audience Briefing]] [[Meeting Script]] [[Authorized Materials]] [[Follow Up]] [[Demo Handoff Governance]]

Status: Partner Demo Kit v2.2 implementado como pacote de reuniao controlada.

Bloqueios: sem site publicado, sem deploy, sem lead real, sem analytics real, sem CRM real, sem billing real, sem contrato real, sem proposta vinculante e sem certificacao diagnostica absoluta.
"@

$QuickContent = "# 26_PARTNER_DEMO_KIT_v22`n`nUltima nota: [[$SprintTitle]]`n`nPartner Demo Kit com one-page, audience briefing, meeting scripts, materiais autorizados, follow-up e handoff governance."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[26_PARTNER_DEMO_KIT_v22]]`n- [[$SprintTitle]]`n`nRegra: reuniao controlada, metadata_only, sem proposta vinculante, sem lead real e sem certificacao diagnostica."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[26_PARTNER_DEMO_KIT_v22]] / [[$SprintTitle]]`nStatus: Partner Demo Kit v2.2 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Partner Demo Kit v2.2 - [[26_PARTNER_DEMO_KIT_v22]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) { $MocPath = Join-Path $VaultRoot $Moc; if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }; Add-Content -LiteralPath $MocPath -Value "`n- [[26_PARTNER_DEMO_KIT_v22]] - [[$SprintTitle]]" }
$Payload = @{ latest_sensetrust_note = "26_PARTNER_DEMO_KIT_v22"; latest_title = $SprintTitle; latest_version = "v2.2"; updated = $Now; status = "implemented_local_partner_demo_kit"; constraints = @("metadata_only", "no_real_leads", "no_real_analytics", "no_production_deploy", "no_contract_binding", "no_diagnostic_truth_certification") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Partner Demo Kit v2.2 notes updated"
