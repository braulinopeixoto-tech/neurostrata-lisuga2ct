param(
  [string]$Vault = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
)

$ErrorActionPreference = "Stop"
$Now = Get-Date -Format "yyyy-MM-ddTHH:mm:ss"

if (-not (Test-Path -LiteralPath (Join-Path $Vault ".obsidian"))) {
  throw "obsidian_vault_not_found_or_invalid: $Vault"
}

function Write-Note {
  param([string]$RelativePath, [string]$Content)
  $Path = Join-Path $Vault ($RelativePath -replace "/", "\")
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Path) | Out-Null
  Set-Content -LiteralPath $Path -Value $Content -Encoding UTF8
}

Write-Note "00_ABRIR_SENSETRUST/08_CLINICAL_COMMIT_CHAIN_v05.md" @"
---
type: sprint_record
module: SenseTrust
status: active
updated: $Now
trust_status: governed
clinical_use_status: simulated_only
---

# 08_CLINICAL_COMMIT_CHAIN_v05

## Status

SenseTrust Clinical Commit Chain v0.5 implementada com dados simulados.

## Cadeia simulada

1. initial_draft
2. evidence_attached
3. dnda_trust_object_created
4. human_review
5. clinical_revision
6. signed_final

## Testes de adulteracao

- diff_json tamper detected
- document_hash tamper detected
- parent_commit_id tamper detected

## Proxima fase

v0.6 Revogacao / Adendo.

## Links

- [[SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5]]
- [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]]
"@

Write-Note "05_SENSETRUST/SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5.md" @"
---
type: implementation_proof
module: SenseTrust
status: active
updated: $Now
clinical_use_status: simulated_only
---

# SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5

## Objetivo

Provar versionamento clinico auditavel para relatorios DNDA simulados.

## Relacao com v0.4

A cadeia referencia DNDA Trust Object e Evidence Manifest simulados.

## Limites

- Nenhum paciente real.
- Nenhum CPF.
- Nenhum EEG real.
- Nenhum laudo real.
- RLS v0.2 preservada.
- QR v0.3 preservado.

## Proxima fase

v0.6 Revogacao / Adendo.
"@

Add-Content -LiteralPath (Join-Path $Vault "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md") -Value @"

## Sprint atual v0.5

- [[08_CLINICAL_COMMIT_CHAIN_v05]]
- [[SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5]]
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "05_SENSETRUST\MOC_SenseTrust.md") -Value @"

## Clinical Commit Chain v0.5

- [[08_CLINICAL_COMMIT_CHAIN_v05]] - cockpit da sprint v0.5.
- [[SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5]] - prova tecnica v0.5.
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "00_MEMORY_INDEX\_LAST_SYNC.md") -Value @"

## SenseTrust Clinical Commit Chain v0.5 - $Now

- Status: cadeia simulada de commits clinicos registrada.
- Dados: simulated_only.
- Proxima fase: v0.6 Revogacao / Adendo.
"@ -Encoding UTF8

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" @"
# Memory Manifest

| Nota | Modulo | Status |
|---|---|---|
| [[08_CLINICAL_COMMIT_CHAIN_v05]] | SenseTrust | active |
| [[SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5]] | SenseTrust | active |
| [[00_ABRIR_ULTIMA_NOTA_SENSETRUST]] | SenseTrust | active |
"@

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" @"
[
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "00_ABRIR_SENSETRUST/08_CLINICAL_COMMIT_CHAIN_v05.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  },
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "05_SENSETRUST/SenseTrust Clinical Commit Chain Versionamento Clinico Auditavel v0.5.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  }
]
"@

try {
  Start-Process "obsidian://open?vault=VitalStrata_OS&file=00_ABRIR_SENSETRUST/08_CLINICAL_COMMIT_CHAIN_v05"
} catch {
  Write-Warning "Nao foi possivel abrir Obsidian automaticamente. Use Ctrl+O -> 08_CLINICAL_COMMIT_CHAIN_v05"
}

Write-Output "OK Obsidian Clinical Commit Chain v0.5 atualizado"
