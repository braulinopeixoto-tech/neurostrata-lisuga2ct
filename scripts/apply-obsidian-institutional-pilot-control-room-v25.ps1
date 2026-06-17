$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Institutional Pilot Control Room Sala Controle Pilotos Institucionais Aceite Supervisionado v2.5"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) {
  $FullPath = Join-Path $VaultRoot $Folder
  if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null }
}

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25.md"
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
  "SenseTrust",
  "SenseTrust/InstitutionalPilot",
  "SenseTrust/PilotControlRoom",
  "SenseTrust/SupervisedAcceptance",
  "SenseTrust/PipelineGovernance",
  "SenseTrust/DecisionBoard",
  "SenseTrust/MeetingIntelligence",
  "SenseTrust/FeedbackCapture",
  "SenseTrust/PartnerDemoKit",
  "SenseTrust/DemoReadiness",
  "SenseTrust/TrustLayer",
  "SenseTrust/DNDA",
  "SenseTrust/VitalStrata",
  "SenseTrust/NeuroStrata",
  "SenseTrust/BLC",
  "NeuroStrata/TrustLayer",
  "VitalStrata/SaaS",
  "DNDA/Auditavel",
  "BLC/Rastreabilidade",
  "MetadataOnly",
  "Neurodireitos",
  "LGPD",
  "Obsidian/NATE",
  "InstitutionalPilot",
  "PilotControlRoom",
  "SupervisedAcceptance",
  "ExecutionGovernance",
  "InterruptionGovernance"
)
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.5
status: implemented_local_institutional_pilot_control_room
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[Diagnostico Neurofuncional Dimensional Auditavel]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Pipeline Governance]] [[Decision Board]] [[Meeting Intelligence]] [[Partner Demo Kit]] [[Institutional Pilot]] [[Pilot Control Room]] [[Supervised Acceptance]] [[Execution Governance]] [[Interruption Governance]]

## Estado executivo

Institutional Pilot Control Room v2.5 criado para transformar oportunidades governadas da v2.4 em pilotos institucionais simulados, supervisionados e metadata_only.

## Regra operacional definitiva

Esta camada nao e operacao clinica real, nao usa paciente real, nao usa dado clinico real, nao cria contrato, nao declara cliente, nao declara parceria formalizada, nao cria billing, nao cria CRM e nao certifica verdade diagnostica absoluta.

## Painel rapido SenseTrust

- Institutional Pilot Control Room: criado
- Pilot Scope: criado
- RACI Governance: criada
- Supervised Acceptance: criado
- Execution Risk Register: criado
- Evidence Checklist: criado
- Interruption Governance: criada
- Decision Log: criado

## Trilhas relacionadas

- [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]]
- [[27_MEETING_INTELLIGENCE_v23]]
- [[26_PARTNER_DEMO_KIT_v22]]
"@

$QuickContent = @"
# 29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25

Ultima nota: [[$SprintTitle]]

Painel rapido:
- [[Institutional Pilot]]
- [[Pilot Control Room]]
- [[Supervised Acceptance]]
- [[Execution Governance]]
- [[Interruption Governance]]

Estado: v2.5 implementada localmente como cockpit de piloto simulado metadata_only.
"@

$RootContent = @"
# Abrir ultima nota SenseTrust

- [[29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25]]
- [[$SprintTitle]]

Painel rapido SenseTrust:
- [[00_MEMORY_INDEX/_LAST_SYNC]]
- [[05_SENSETRUST/MOC_SenseTrust]]
- [[00_MEMORY_INDEX/MEMORY_MANIFEST]]
- [[05_SENSETRUST/Supabase Execution Proof]]

Estado executivo: Institutional Pilot Control Room v2.5 e o cockpit atual para pilotos simulados, escopo, RACI, checkpoints, aceite supervisionado, riscos, evidencias e interrupcao.

Regra operacional definitiva: manter metadata_only, sem paciente real, sem dado clinico real, sem operacao clinica real, sem contrato, sem cliente, sem parceria formalizada, sem billing, sem CRM e sem certificacao diagnostica absoluta.
"@

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25]] / [[$SprintTitle]]`nStatus: Institutional Pilot Control Room v2.5 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Institutional Pilot Control Room v2.5 - [[29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) {
  $MocPath = Join-Path $VaultRoot $Moc
  if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }
  Add-Content -LiteralPath $MocPath -Value "`n- [[29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25]] - [[$SprintTitle]]"
}
$Payload = @{
  latest_sensetrust_note = "29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25"
  latest_title = $SprintTitle
  latest_version = "v2.5"
  updated = $Now
  status = "implemented_local_institutional_pilot_control_room"
  constraints = @("metadata_only", "no_real_patient_data", "no_real_clinical_operation", "no_real_contract", "no_real_billing", "no_real_crm", "no_real_clients", "no_formal_partnership", "no_diagnostic_truth_certification")
} | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Institutional Pilot Control Room v2.5 notes updated"

