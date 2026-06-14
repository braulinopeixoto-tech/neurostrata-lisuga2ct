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
  - SenseTrust/PilotPackage
  - SenseTrust/Comercial
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
  - Obsidian/NATE
  - PilotoFechado
"@

$PilotNote = @"
---
vault_id: $VaultId
type: pilot_package
module: SenseTrust
status: documental_aprovavel
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$Tags
---

# SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1

[[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[Metadata Only]] [[Piloto Fechado]] [[Pilot Console]] [[Demo Operacional v1.0]] [[MOC_SenseTrust]]

## Mensagem nuclear

A SenseTrust transforma objetos clinico-documentais em entidades versionaveis, rastreaveis, auditaveis e verificaveis, sem expor dados clinicos no portal publico.

## Limite obrigatorio

A SenseTrust certifica integridade, proveniencia, rastreabilidade, estado documental, emissao e verificabilidade publica segura; nao certifica verdade diagnostica absoluta.

## Piloto fechado

3 a 5 organizacoes/profissionais, 30 a 60 dias, dados simulados ou ambiente controlado. Sem billing real, sem assinatura legal real, sem ICP-Brasil real e sem Gov.br real.
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

Ultima nota: [[15_PILOT_PACKAGE_v11]]

Nota da sprint: [[SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1]]

## Mapa macro

[[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[Metadata Only]] [[Piloto Fechado]]
"@

$OpenSprint = "# 15 Pilot Package v1.1`n`n[[SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1]]"
$LastSync = "# _LAST_SYNC`n`nUltima sincronizacao SenseTrust: v1.1 Pilot Package / Apresentacao Comercial Tecnica."
$Manifest = "# MEMORY_MANIFEST`n`nSenseTrust v1.1 registrado como pacote comercial-tecnico de piloto fechado. MetadataOnly. Sem dado clinico real."
$ManifestJson = "{`"vault_id`":`"$VaultId`",`"module`":`"SenseTrust`",`"latest_note`":`"05_SENSETRUST/SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1.md`",`"status`":`"metadata_only`"}"

$MocAppend = @"

## Pilot Package v1.1
* [[15_PILOT_PACKAGE_v11]]
* [[SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1]]
* [[Piloto Fechado]]
* [[Pilot Console]]
* [[Demo Operacional v1.0]]
"@

Write-Utf8Note "00_ABRIR_SENSETRUST/15_PILOT_PACKAGE_v11.md" $OpenSprint
Write-Utf8Note "05_SENSETRUST/SenseTrust Pilot Package Apresentacao Comercial Tecnica Material Piloto Fechado v1.1.md" $PilotNote
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

Write-Output "SenseTrust v1.1 pilot package notes written to canonical vault $VaultPath"
