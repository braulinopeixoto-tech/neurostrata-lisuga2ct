$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path (Join-Path $VaultPath ".obsidian"))) {
  throw "Canonical Obsidian vault not found or .obsidian missing: $VaultPath"
}

function Write-Utf8Note {
  param(
    [string]$RelativePath,
    [string]$Content
  )
  $Target = Join-Path $VaultPath $RelativePath
  $Parent = Split-Path -Parent $Target
  if (-not (Test-Path $Parent)) {
    New-Item -ItemType Directory -Path $Parent -Force | Out-Null
  }
  Set-Content -LiteralPath $Target -Value $Content -Encoding UTF8
  return $Target
}

$SprintNote = @"
---
vault_id: $VaultId
type: sprint_record
module: SenseTrust
status: bloqueado_por_build_obsidian_git
trust_status: simulated_only
created_by: Codex
updated: $Now
linked_sprint: SenseTrust Assinatura Timestamp Integridade Emissao v0.7
---

# SenseTrust Assinatura Timestamp Integridade Emissao v0.7

Status operacional: BLOQUEADO para aprovacao final ate build, Obsidian e Git serem confirmados no ambiente.

## Relacao com v0.6
- Usa estados documentais para permitir emissao valida apenas em `signed` ou `active`.
- `revoked`, `expired`, `superseded` e `invalid_integrity` bloqueiam verificacao positiva.

## Assinatura profissional simulada
- actor_id simulado
- papel profissional simulado
- organizacao simulada
- signature_hash
- signed_at

## Assinatura institucional simulada
- institution_id simulado
- institution_name simulada
- signature_hash
- signed_at

## Timestamp logico
- timestamp_id simulado
- issued_at
- authority_mode internal_logical_timestamp
- sequence
- timestamp_hash

## Emission hash
Congela document_hash, trust_object_hash, evidence_manifest_hash, clinical_chain_hash, document_state_hash, hashes de assinatura e timestamp_hash.

## Preparacao futura
ICP-Brasil, Gov.br e RFC3161 permanecem como modos futuros. Nenhuma integracao legal real foi feita nesta sprint.

## Limite clinico
Somente dados simulados. Uso clinico real continua bloqueado.
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

Ultima nota: [[10_ASSINATURA_TIMESTAMP_v07]]

Nota da sprint: [[SenseTrust Assinatura Timestamp Integridade Emissao v0.7]]

## Painel rapido SenseTrust
- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]

## Estado executivo
SenseTrust v0.7 implementa assinatura simulada, timestamp logico e integridade de emissao.

## Regra operacional definitiva
Nao usar dado clinico real e nao liberar uso clinico enquanto build, Git remoto e validacoes finais nao estiverem aprovados.
"@

$OpenSprint = @"
---
vault_id: $VaultId
type: cockpit_note
module: SenseTrust
status: active
trust_status: simulated_only
created_by: Codex
updated: $Now
---

# 10 Assinatura Timestamp v0.7

Abrir sprint principal: [[SenseTrust Assinatura Timestamp Integridade Emissao v0.7]]

## Emissao
- assinatura profissional simulada
- assinatura institucional simulada
- timestamp logico
- emission_hash
- payload publico metadata_only
"@

$LastSync = @"
---
vault_id: $VaultId
type: sync_record
module: SenseTrust
status: updated
trust_status: simulated_only
created_by: Codex
updated: $Now
---

# _LAST_SYNC

Ultima sincronizacao SenseTrust: v0.7 Assinatura / Timestamp / Integridade de Emissao.

Notas principais:
- [[10_ASSINATURA_TIMESTAMP_v07]]
- [[SenseTrust Assinatura Timestamp Integridade Emissao v0.7]]
"@

$Moc = @"
---
vault_id: $VaultId
type: moc
module: SenseTrust
status: active
trust_status: simulated_only
created_by: Codex
updated: $Now
---

# MOC SenseTrust

## Trilhas
- [[Supabase Execution Proof]]
- [[SenseTrust RLS Hardening v0.2]]
- [[SenseTrust QR PDF Certificado Publico Seguro v0.3]]
- [[SenseTrust DNDA Trust Object Evidence Manifest v0.4]]
- [[SenseTrust Clinical Commit Chain v0.5]]
- [[SenseTrust Revogacao Adendo Estados Documentais v0.6]]
- [[SenseTrust Assinatura Timestamp Integridade Emissao v0.7]]
"@

$Manifest = @"
---
vault_id: $VaultId
type: memory_manifest
module: SenseTrust
status: updated
trust_status: simulated_only
created_by: Codex
updated: $Now
---

# MEMORY_MANIFEST

SenseTrust v0.7 registrado como camada simulada de assinatura, timestamp logico e integridade de emissao.
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "last_sync": "$Now",
  "latest_note": "05_SENSETRUST/SenseTrust Assinatura Timestamp Integridade Emissao v0.7.md",
  "latest_cockpit": "00_ABRIR_SENSETRUST/10_ASSINATURA_TIMESTAMP_v07.md",
  "trust_status": "simulated_only"
}
"@

Write-Utf8Note "05_SENSETRUST/SenseTrust Assinatura Timestamp Integridade Emissao v0.7.md" $SprintNote | Out-Null
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $OpenNote | Out-Null
Write-Utf8Note "00_ABRIR_SENSETRUST/10_ASSINATURA_TIMESTAMP_v07.md" $OpenSprint | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync | Out-Null
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $Moc | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson | Out-Null

Write-Output "SenseTrust v0.7 Obsidian notes written to canonical vault $VaultPath"
