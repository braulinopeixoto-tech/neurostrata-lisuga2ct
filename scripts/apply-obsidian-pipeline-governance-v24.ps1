$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Pipeline Governance Decision Board Priorizacao Oportunidades Go No Go v2.4"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) {
  $FullPath = Join-Path $VaultRoot $Folder
  if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null }
}

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24.md"
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
  "SenseTrust/PipelineGovernance",
  "SenseTrust/DecisionBoard",
  "SenseTrust/MeetingIntelligence",
  "SenseTrust/FeedbackCapture",
  "SenseTrust/PartnerDemoKit",
  "SenseTrust/DemoReadiness",
  "SenseTrust/VisualQA",
  "SenseTrust/PrototypeUX",
  "SenseTrust/WebsiteBlueprint",
  "SenseTrust/PublicNarrative",
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
  "PipelineGovernance",
  "DecisionBoard",
  "OpportunityPrioritization",
  "GoNoGo",
  "HumanReviewQueue"
)
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.4
status: implemented_local_pipeline_governance
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Meeting Intelligence]] [[Feedback Capture]] [[Partner Demo Kit]] [[Pipeline Governance]] [[Decision Board]] [[Opportunity Prioritization]] [[Go No Go]] [[Human Review Queue]] [[Relationship Governance]]

## Estado executivo

Pipeline Governance v2.4 criado como quadro decisorio controlado e simulado para transformar Meeting Intelligence v2.3 em priorizacao, risco, maturidade institucional, fila de revisao humana e recomendacao Go/No-Go.

## Regra operacional definitiva

Esta camada nao e CRM real, nao coleta lead real, nao cria cliente real, nao declara receita real, nao declara billing real, nao automatiza e-mail real, nao cria contrato vinculante e nao certifica verdade diagnostica absoluta.

## Painel rapido SenseTrust

- Decision Board: criado
- Opportunity Prioritization: criada
- Go/No-Go: governado e simulado
- Human Review Queue: criada
- Risk Priority Matrix: criada
- Relationship Governance: criada
- Data classification: metadata_only

## Trilhas relacionadas

- [[27_MEETING_INTELLIGENCE_v23]]
- [[26_PARTNER_DEMO_KIT_v22]]
- [[25_DEMO_READINESS_v21]]
"@

$QuickContent = @"
# 28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24

Ultima nota: [[$SprintTitle]]

Painel rapido:
- [[Pipeline Governance]]
- [[Decision Board]]
- [[Opportunity Prioritization]]
- [[Go No Go]]
- [[Human Review Queue]]
- [[Relationship Governance]]

Estado: v2.4 implementada localmente como simulacao metadata_only.
"@

$RootContent = @"
# Abrir ultima nota SenseTrust

- [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]]
- [[$SprintTitle]]

Painel rapido SenseTrust:
- [[00_MEMORY_INDEX/_LAST_SYNC]]
- [[05_SENSETRUST/MOC_SenseTrust]]
- [[00_MEMORY_INDEX/MEMORY_MANIFEST]]
- [[05_SENSETRUST/Supabase Execution Proof]]

Estado executivo: Pipeline Governance v2.4 e o cockpit atual para priorizacao simulada, Decision Board, Go/No-Go, Human Review Queue e Relationship Governance.

Regra operacional definitiva: manter metadata_only, sem dado clinico real, sem CRM real, sem automacao comercial real, sem e-mail automatico real, sem cliente real e sem contrato vinculante.
"@

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]] / [[$SprintTitle]]`nStatus: Pipeline Governance v2.4 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Pipeline Governance v2.4 - [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) {
  $MocPath = Join-Path $VaultRoot $Moc
  if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }
  Add-Content -LiteralPath $MocPath -Value "`n- [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]] - [[$SprintTitle]]"
}
$Payload = @{
  latest_sensetrust_note = "28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24"
  latest_title = $SprintTitle
  latest_version = "v2.4"
  updated = $Now
  status = "implemented_local_pipeline_governance"
  constraints = @("metadata_only", "no_real_crm", "no_real_analytics", "no_real_email_automation", "no_real_leads", "no_real_clients", "no_contract_binding", "no_diagnostic_truth_certification")
} | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Pipeline Governance v2.4 notes updated"

