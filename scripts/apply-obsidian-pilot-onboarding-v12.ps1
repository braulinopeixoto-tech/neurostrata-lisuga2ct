$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path (Join-Path $VaultPath ".obsidian"))) {
  throw "Canonical Obsidian vault not found or .obsidian missing: $VaultPath"
}

function Write-Utf8Note {
  param([string]$RelativePath, [string]$Content)
  $Target = Join-Path $VaultPath $RelativePath
  $Parent = Split-Path -Parent $Target
  if (-not (Test-Path $Parent)) { New-Item -ItemType Directory -Path $Parent -Force | Out-Null }
  Set-Content -LiteralPath $Target -Value $Content -Encoding UTF8
}

$Tags = @"
  - SenseTrust
  - SenseTrust/PilotOnboarding
  - SenseTrust/ContratoPiloto
  - SenseTrust/Consentimento
  - SenseTrust/LGPD
  - SenseTrust/PilotoFechado
  - SenseTrust/TrustLayer
  - SenseTrust/DNDA
  - SenseTrust/VitalStrata
  - SenseTrust/NeuroStrata
  - SenseTrust/BLC
  - NeuroStrata/TrustLayer
  - VitalStrata/SaaS
  - DNDA/Auditavel
  - BLC/Rastreabilidade
  - MetadataOnly
  - Neurodireitos
  - LGPD
  - Obsidian/NATE
  - PilotoFechado
"@

$SprintNote = @"
---
vault_id: $VaultId
type: pilot_onboarding
module: SenseTrust
status: draft_tecnico_revisao_juridica
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$Tags
---

# SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2

[[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Piloto Fechado]] [[Contrato de Piloto]] [[Termo de Uso]] [[Consentimento Operacional]] [[Matriz RACI]] [[Aceite Supervisionado]] [[Revisao Juridica]]

## Objetivo

Formalizar entrada de participantes no piloto fechado SenseTrust com termo de uso, consentimento operacional, contrato-piloto, RACI, checklist, politica de dados e fila de revisao juridica.

## Limite obrigatorio

Modelos tecnico-operacionais para revisao por advogado. Sem paciente real, sem dado clinico real, sem billing real, sem assinatura legal real, sem ICP-Brasil e sem Gov.br nesta fase.
"@

$RootNote = @"
---
vault_id: $VaultId
type: root_entrypoint
module: SenseTrust
status: active
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# Abrir ultima nota SenseTrust

Ultima nota: [[16_PILOT_ONBOARDING_v12]]

Nota da sprint: [[SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2]]

## Links

[[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Piloto Fechado]]
"@

$OpenSprint = "# 16 Pilot Onboarding v1.2`n`n[[SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2]]"
$LastSync = "# _LAST_SYNC`n`nUltima sincronizacao SenseTrust: v1.2 Pilot Onboarding / Termos / Consentimentos / Contrato de Piloto."
$Manifest = "# MEMORY_MANIFEST`n`nSenseTrust v1.2 registrado como onboarding juridico-operacional de piloto fechado. MetadataOnly. Sem dado clinico real."
$ManifestJson = "{`"vault_id`":`"$VaultId`",`"module`":`"SenseTrust`",`"latest_note`":`"05_SENSETRUST/SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2.md`",`"status`":`"metadata_only`"}"

$MocAppend = @"

## Pilot Onboarding v1.2
* [[16_PILOT_ONBOARDING_v12]]
* [[SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2]]
* [[Contrato de Piloto]]
* [[Termo de Uso]]
* [[Consentimento Operacional]]
* [[Matriz RACI]]
* [[Aceite Supervisionado]]
* [[Revisao Juridica]]
"@

Write-Utf8Note "00_ABRIR_SENSETRUST/16_PILOT_ONBOARDING_v12.md" $OpenSprint
Write-Utf8Note "05_SENSETRUST/SenseTrust Pilot Onboarding Termos Consentimentos Contrato Piloto v1.2.md" $SprintNote
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $RootNote
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson

foreach ($moc in @(
  "05_SENSETRUST/MOC_SenseTrust.md",
  "05_SENSETRUST/MOC_VitalStrata_SenseTrust.md",
  "05_SENSETRUST/MOC_NeuroStrata_Trust_Layer.md",
  "05_SENSETRUST/MOC_DNDA_Trust_Object.md",
  "05_SENSETRUST/MOC_BLC_Rastreabilidade.md"
)) {
  $target = Join-Path $VaultPath $moc
  if (Test-Path $target) {
    Add-Content -LiteralPath $target -Value $MocAppend -Encoding UTF8
  } else {
    Write-Utf8Note $moc ("# " + [IO.Path]::GetFileNameWithoutExtension($moc) + $MocAppend)
  }
}

Write-Output "SenseTrust v1.2 pilot onboarding notes written to canonical vault $VaultPath"
