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

Write-Note "00_ABRIR_SENSETRUST/06_DNDA_TRUST_OBJECT_v04.md" @"
---
type: sprint_record
module: SenseTrust
status: active
updated: $Now
trust_status: governed
clinical_use_status: simulated_only
---

# 06_DNDA_TRUST_OBJECT_v04

## Status

SenseTrust DNDA Trust Object / Evidence Manifest v0.4 implementado com dados simulados.

## Objetos

- Evidence Manifest: EM-SIM-2026-0001
- DNDA Trust Object: DTO-SIM-2026-0001
- Documento: DNDA-SIM-2026-0001
- Certificado publico simulado: CERT-SIM-2026-0001

## Testes

- PASS evidence manifest created
- PASS evidence manifest hash
- PASS dnda trust object created
- PASS dnda trust object hash
- PASS manifest linked to trust object
- PASS public certificate linked
- PASS evidence tamper detected
- PASS document hash mismatch detected
- PASS no sensitive public exposure
- PASS simulated only

## Links

- [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]]
- [[05_QR_CERTIFICADO_v03]]
"@

Write-Note "05_SENSETRUST/SenseTrust DNDA Trust Object Evidence Manifest v0.4.md" @"
---
type: implementation_proof
module: SenseTrust
status: active
updated: $Now
clinical_use_status: simulated_only
---

# SenseTrust DNDA Trust Object Evidence Manifest v0.4

## Objetivo

Transformar um relatorio DNDA simulado em objeto interno certificavel, auditavel e verificavel.

## Componentes

- Evidence Manifest
- DNDA Trust Object
- Referencia ao certificado publico simulado v0.3

## Limites

- Nenhum paciente real.
- Nenhum CPF.
- Nenhum EEG real.
- Nenhum laudo real.
- RLS v0.2 preservada.
- QR v0.3 preservado.
"@

Add-Content -LiteralPath (Join-Path $Vault "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md") -Value @"

## Sprint atual v0.4

- [[06_DNDA_TRUST_OBJECT_v04]]
- [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]]
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "05_SENSETRUST\MOC_SenseTrust.md") -Value @"

## DNDA Trust Object / Evidence Manifest v0.4

- [[06_DNDA_TRUST_OBJECT_v04]] - cockpit da sprint v0.4.
- [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]] - prova tecnica v0.4.
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "00_MEMORY_INDEX\_LAST_SYNC.md") -Value @"

## SenseTrust DNDA Trust Object v0.4 - $Now

- Status: Evidence Manifest e DNDA Trust Object simulados registrados.
- Dados: simulated_only.
- RLS v0.2: preservada.
- QR v0.3: preservado.
"@ -Encoding UTF8

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" @"
# Memory Manifest

| Nota | Modulo | Status |
|---|---|---|
| [[06_DNDA_TRUST_OBJECT_v04]] | SenseTrust | active |
| [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]] | SenseTrust | active |
| [[00_ABRIR_ULTIMA_NOTA_SENSETRUST]] | SenseTrust | active |
"@

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" @"
[
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "00_ABRIR_SENSETRUST/06_DNDA_TRUST_OBJECT_v04.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  },
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "05_SENSETRUST/SenseTrust DNDA Trust Object Evidence Manifest v0.4.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  }
]
"@

try {
  Start-Process "obsidian://open?vault=VitalStrata_OS&file=00_ABRIR_SENSETRUST/06_DNDA_TRUST_OBJECT_v04"
} catch {
  Write-Warning "Nao foi possivel abrir Obsidian automaticamente. Use Ctrl+O -> 06_DNDA_TRUST_OBJECT_v04"
}

Write-Output "OK Obsidian DNDA Trust Object v0.4 atualizado"
