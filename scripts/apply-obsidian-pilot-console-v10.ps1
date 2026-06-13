$ErrorActionPreference = "Stop"
$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path (Join-Path $VaultPath ".obsidian"))) { throw "Canonical Obsidian vault not found: $VaultPath" }

function Write-Utf8Note {
  param([string]$RelativePath, [string]$Content)
  $Target = Join-Path $VaultPath $RelativePath
  $Parent = Split-Path -Parent $Target
  if (-not (Test-Path $Parent)) { New-Item -ItemType Directory -Path $Parent -Force | Out-Null }
  Set-Content -LiteralPath $Target -Value $Content -Encoding UTF8
}

$Tags = @"
SenseTrust
SenseTrust/PilotConsole
SenseTrust/v1
SenseTrust/DemoEndToEnd
SenseTrust/SaaS
SenseTrust/TrustLayer
SenseTrust/DNDA
SenseTrust/VitalStrata
SenseTrust/NeuroStrata
SenseTrust/BLC
DNDA/Auditavel
VitalStrata/SaaS
NeuroStrata/TrustLayer
BLC/Rastreabilidade
Obsidian/NATE
MetadataOnly
Neurodireitos
PilotoFechado
"@

$SprintNote = @"
---
vault_id: $VaultId
type: sprint_record
module: SenseTrust
status: bloqueado_por_build_obsidian_git
trust_status: simulated_only
created_by: Codex
updated: $Now
tags:
  - SenseTrust
  - SenseTrust/PilotConsole
  - SenseTrust/v1
  - SenseTrust/DemoEndToEnd
  - SenseTrust/SaaS
  - SenseTrust/TrustLayer
  - SenseTrust/DNDA
  - SenseTrust/VitalStrata
  - SenseTrust/NeuroStrata
  - SenseTrust/BLC
  - DNDA/Auditavel
  - VitalStrata/SaaS
  - NeuroStrata/TrustLayer
  - BLC/Rastreabilidade
  - Obsidian/NATE
  - MetadataOnly
  - Neurodireitos
  - PilotoFechado
---

# SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]]

Status operacional: BLOQUEADO ate build, Obsidian e Git serem confirmados.

## Fluxo end-to-end
Organizacao, usuario, plano, certificado, Evidence Manifest, DNDA Trust Object, Clinical Commit Chain, estado documental, assinatura, timestamp, portal publico, usage ledger e audit report.

## Regra publica
SenseTrust certifica integridade, proveniencia, estado documental e verificabilidade; nao certifica verdade diagnostica absoluta.

## Tags
$Tags
"@

$OpenNote = @"
---
vault_id: $VaultId
type: root_entrypoint
module: SenseTrust
status: active
trust_status: simulated_only
created_by: Codex
updated: $Now
---

# Abrir ultima nota SenseTrust

Ultima nota: [[13_PILOT_CONSOLE_v10]]

Nota da sprint: [[SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0]]
"@

$OpenSprint = "# 13 Pilot Console v1.0`n`n[[SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0]]"
$LastSync = "# _LAST_SYNC`n`nUltima sincronizacao SenseTrust: v1.0 Pilot Console / Demo End-to-End."
$Moc = "# MOC SenseTrust`n`n- [[SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0]]"
$Manifest = "# MEMORY_MANIFEST`n`nSenseTrust v1.0 registrado como Pilot Console simulado."
$ManifestJson = "{`"vault_id`":`"$VaultId`",`"module`":`"SenseTrust`",`"latest_note`":`"05_SENSETRUST/SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0.md`"}"

Write-Utf8Note "05_SENSETRUST/SenseTrust Pilot Console Demo Operacional Fluxo End-to-End v1.0.md" $SprintNote
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $OpenNote
Write-Utf8Note "00_ABRIR_SENSETRUST/13_PILOT_CONSOLE_v10.md" $OpenSprint
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $Moc
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson
