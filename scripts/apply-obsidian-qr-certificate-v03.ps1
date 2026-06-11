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

Write-Note "00_ABRIR_SENSETRUST/04_PROXIMA_SPRINT_QR_CERTIFICADO.md" @"
---
type: sprint_transition
module: SenseTrust
status: completed
updated: $Now
---

# 04_PROXIMA_SPRINT_QR_CERTIFICADO

Sprint autorizada e iniciada: [[05_QR_CERTIFICADO_v03]].

RLS v0.2 permanece aprovada e preservada. A sprint v0.3 usa somente dados simulados.
"@

Write-Note "00_ABRIR_SENSETRUST/05_QR_CERTIFICADO_v03.md" @"
---
type: sprint_record
module: SenseTrust
status: active
updated: $Now
trust_status: governed
---

# 05_QR_CERTIFICADO_v03

## Status

SenseTrust QR PDF / Certificado Publico Seguro v0.3 implementado com dados simulados.

## Fluxo

PDF simulado -> QR Code -> token publico -> verify_public_certificate -> pagina publica segura.

## Testes

- PASS valid token
- PASS invalid token
- PASS no sensitive fields
- PASS hash mismatch
- PASS revoked certificate

## Seguranca

- Nenhum dado clinico real usado.
- Nenhum nome de paciente real usado.
- Pagina publica exibe apenas metadados seguros.
- RLS v0.2 nao foi alterada.

## Links

- [[SenseTrust QR PDF Certificado Publico Seguro v0.3]]
- [[02_RLS_v02_FINAL_APPROVAL]]
"@

Write-Note "05_SENSETRUST/SenseTrust QR PDF Certificado Publico Seguro v0.3.md" @"
---
type: implementation_proof
module: SenseTrust
status: active
updated: $Now
clinical_use_status: simulated_only
---

# SenseTrust QR PDF Certificado Publico Seguro v0.3

## Objetivo

Fluxo publico seguro com QR/token usando somente dados simulados.

## Metadados permitidos

certificate_status, document_id, document_type, document_version, issued_at, issuer, verification_status, hash_match, revocation_status.

## Dados proibidos

Nome, CPF, anamnese, EEG, escalas clinicas, hipotese diagnostica e PDF completo.

## Testes

PASS valid token; PASS invalid token; PASS no sensitive fields; PASS hash mismatch; PASS revoked certificate.

## Limite

Uso clinico real amplo continua bloqueado ate governanca e validacao final.
"@

Add-Content -LiteralPath (Join-Path $Vault "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md") -Value @"

## Sprint atual v0.3

- [[05_QR_CERTIFICADO_v03]]
- [[SenseTrust QR PDF Certificado Publico Seguro v0.3]]
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "05_SENSETRUST\MOC_SenseTrust.md") -Value @"

## QR PDF / Certificado v0.3

- [[05_QR_CERTIFICADO_v03]] - sprint QR/token publico com dado simulado.
- [[SenseTrust QR PDF Certificado Publico Seguro v0.3]] - contrato e prova v0.3.
"@ -Encoding UTF8

Add-Content -LiteralPath (Join-Path $Vault "00_MEMORY_INDEX\_LAST_SYNC.md") -Value @"

## SenseTrust QR v0.3 - $Now

- Status: QR PDF / Certificado Publico Seguro v0.3 registrado.
- Dados: simulados.
- RLS v0.2: preservada.
"@ -Encoding UTF8

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" @"
# Memory Manifest

| Nota | Modulo | Status |
|---|---|---|
| [[05_QR_CERTIFICADO_v03]] | SenseTrust | active |
| [[SenseTrust QR PDF Certificado Publico Seguro v0.3]] | SenseTrust | active |
| [[00_ABRIR_ULTIMA_NOTA_SENSETRUST]] | SenseTrust | active |
"@

Write-Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" @"
[
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "00_ABRIR_SENSETRUST/05_QR_CERTIFICADO_v03.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  },
  {
    "vault_id": "b1a32fcb40985ffc",
    "note_path": "05_SENSETRUST/SenseTrust QR PDF Certificado Publico Seguro v0.3.md",
    "module": "SenseTrust",
    "status": "active",
    "updated": "$Now"
  }
]
"@

try {
  Start-Process "obsidian://open?vault=VitalStrata_OS&file=00_ABRIR_SENSETRUST/05_QR_CERTIFICADO_v03"
} catch {
  Write-Warning "Nao foi possivel abrir Obsidian automaticamente. Use Ctrl+O -> 05_QR_CERTIFICADO_v03"
}

Write-Output "OK Obsidian QR v0.3 atualizado"
