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
linked_sprint: SenseTrust Verificacao Publica Expandida Portal Consulta v0.8
---

# SenseTrust Verificacao Publica Expandida Portal Consulta v0.8

Status operacional: BLOQUEADO para aprovacao final ate build, Obsidian e Git serem confirmados no ambiente.

## Relacao com v0.7
- Exibe metadados seguros de assinatura simulada, timestamp logico e emission_hash parcial.
- Nao exibe assinatura completa, hash completo ou conteudo clinico.

## Estados publicos
- verified_active
- verified_amended
- verified_revoked
- verified_expired
- verified_superseded
- invalid_token
- invalid_integrity

## Contrato publico
SenseTrust certifica integridade, proveniencia e estado documental. Nao certifica verdade diagnostica absoluta.

## Campos permitidos
document_id simulado, certificate_id, emission_id, estado documental, assinatura/timestamp como metadados, hashes parciais e mensagens publicas seguras.

## Campos proibidos
Paciente, CPF, diagnostico, laudo, anamnese, qEEG, escalas, medicamentos, notas clinicas e documento completo.

## Preparacao SaaS
O portal esta preparado como contrato de consulta publica simulada para futura camada SaaS.
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

Ultima nota: [[11_PORTAL_VERIFICACAO_PUBLICA_v08]]

Nota da sprint: [[SenseTrust Verificacao Publica Expandida Portal Consulta v0.8]]

## Painel rapido SenseTrust
- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]

## Estado executivo
SenseTrust v0.8 implementa portal publico expandido de verificacao simulada.

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

# 11 Portal Verificacao Publica v0.8

Abrir sprint principal: [[SenseTrust Verificacao Publica Expandida Portal Consulta v0.8]]

## Portal
- token publico simulado
- estados documentais publicos
- assinatura e timestamp como metadados
- hashes parciais
- aviso contra inferencia clinica
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

Ultima sincronizacao SenseTrust: v0.8 Verificacao Publica Expandida / Portal de Consulta.

Notas principais:
- [[11_PORTAL_VERIFICACAO_PUBLICA_v08]]
- [[SenseTrust Verificacao Publica Expandida Portal Consulta v0.8]]
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
- [[SenseTrust Verificacao Publica Expandida Portal Consulta v0.8]]
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

SenseTrust v0.8 registrado como portal publico expandido de verificacao segura.
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "last_sync": "$Now",
  "latest_note": "05_SENSETRUST/SenseTrust Verificacao Publica Expandida Portal Consulta v0.8.md",
  "latest_cockpit": "00_ABRIR_SENSETRUST/11_PORTAL_VERIFICACAO_PUBLICA_v08.md",
  "trust_status": "simulated_only"
}
"@

Write-Utf8Note "05_SENSETRUST/SenseTrust Verificacao Publica Expandida Portal Consulta v0.8.md" $SprintNote | Out-Null
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $OpenNote | Out-Null
Write-Utf8Note "00_ABRIR_SENSETRUST/11_PORTAL_VERIFICACAO_PUBLICA_v08.md" $OpenSprint | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync | Out-Null
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $Moc | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson | Out-Null

Write-Output "SenseTrust v0.8 Obsidian notes written to canonical vault $VaultPath"
