$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Meeting Intelligence Feedback Capture Registro Reuniao Objecoes Interesse Proximos Passos v2.3"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) { $FullPath = Join-Path $VaultRoot $Folder; if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null } }

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\27_MEETING_INTELLIGENCE_v23.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/MeetingIntelligence","SenseTrust/FeedbackCapture","SenseTrust/PartnerDemoKit","SenseTrust/DemoReadiness","SenseTrust/VisualQA","SenseTrust/PrototypeUX","SenseTrust/WebsiteBlueprint","SenseTrust/PublicNarrative","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","MeetingIntelligence","FeedbackCapture","ObjectionTracking","OpportunityScoring","RelationshipGovernance")
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.3
status: implemented_local_meeting_intelligence
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Partner Demo Kit]] [[Demo Readiness]] [[Meeting Intelligence]] [[Feedback Capture]] [[Objection Tracking]] [[Interest Signal]] [[Opportunity Scoring]] [[Next Steps Governance]] [[Relationship Governance]]

Status: Meeting Intelligence v2.3 implementado como registro e analise simulada, metadata_only, sem CRM real e sem automacao real.

Bloqueios: sem dado clinico real, sem lead real, sem CRM real, sem analytics real, sem e-mail automatico real, sem contrato vinculante e sem certificacao diagnostica absoluta.
"@

$QuickContent = "# 27_MEETING_INTELLIGENCE_v23`n`nUltima nota: [[$SprintTitle]]`n`nMeeting Intelligence com feedback capture, objection tracking, opportunity scoring e relationship governance."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[27_MEETING_INTELLIGENCE_v23]]`n- [[$SprintTitle]]`n`nRegra: registro metadata_only, sem CRM real, sem e-mail automatico real, sem lead real e sem contrato vinculante."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[27_MEETING_INTELLIGENCE_v23]] / [[$SprintTitle]]`nStatus: Meeting Intelligence v2.3 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Meeting Intelligence v2.3 - [[27_MEETING_INTELLIGENCE_v23]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) { $MocPath = Join-Path $VaultRoot $Moc; if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }; Add-Content -LiteralPath $MocPath -Value "`n- [[27_MEETING_INTELLIGENCE_v23]] - [[$SprintTitle]]" }
$Payload = @{ latest_sensetrust_note = "27_MEETING_INTELLIGENCE_v23"; latest_title = $SprintTitle; latest_version = "v2.3"; updated = $Now; status = "implemented_local_meeting_intelligence"; constraints = @("metadata_only", "no_real_crm", "no_real_email_automation", "no_real_leads", "no_contract_binding", "no_diagnostic_truth_certification") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Meeting Intelligence v2.3 notes updated"
