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
linked_sprint: SenseTrust Revogacao Adendo Estados Documentais v0.6
---

# SenseTrust Revogacao Adendo Estados Documentais v0.6

Status operacional: BLOQUEADO para aprovacao final ate build, Obsidian e Git serem confirmados no ambiente.

## Relacao com v0.5
- Usa Clinical Commit Chain como trilha obrigatoria para adendo, revogacao, expiracao e supersedencia.
- Amplia tipos simulados para `status_expired` e `integrity_invalidated`.

## Estados documentais
- active
- amended
- revoked
- expired
- superseded
- invalid_integrity

## Politica
- Documento assinado ou ativo nao recebe edicao destrutiva.
- Adendo cria novo registro e commit clinico.
- Revogacao cria novo registro e commit clinico.
- Expiracao preserva historico.
- Supersedencia aponta para documento substituto.

## Contrato publico seguro
- Exibe somente metadados de verificacao.
- Nao exibe motivo privado, conteudo clinico, paciente, CPF, EEG, qEEG, sLORETA, anamnese ou biomarcadores.

## Proxima fase
- Confirmar build e Git remoto antes de qualquer uso clinico real.
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

Ultima nota: [[09_REVOGACAO_ADENDO_ESTADOS_v06]]

Nota da sprint: [[SenseTrust Revogacao Adendo Estados Documentais v0.6]]

## Painel rapido SenseTrust
- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]

## Estado executivo
SenseTrust v0.6 implementa estados documentais simulados para adendo, revogacao, expiracao e supersedencia.

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

# 09 Revogacao Adendo Estados v0.6

Abrir sprint principal: [[SenseTrust Revogacao Adendo Estados Documentais v0.6]]

## Estados
- active
- amended
- revoked
- expired
- superseded
- invalid_integrity

## Confirmacao
Somente dados simulados. Payload publico minimizado.
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

Ultima sincronizacao SenseTrust: v0.6 Revogacao / Adendo / Estados Documentais.

Notas principais:
- [[09_REVOGACAO_ADENDO_ESTADOS_v06]]
- [[SenseTrust Revogacao Adendo Estados Documentais v0.6]]
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

SenseTrust v0.6 registrado como camada simulada de estados documentais, revogacao, adendo, expiracao e supersedencia.
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "last_sync": "$Now",
  "latest_note": "05_SENSETRUST/SenseTrust Revogacao Adendo Estados Documentais v0.6.md",
  "latest_cockpit": "00_ABRIR_SENSETRUST/09_REVOGACAO_ADENDO_ESTADOS_v06.md",
  "trust_status": "simulated_only"
}
"@

Write-Utf8Note "05_SENSETRUST/SenseTrust Revogacao Adendo Estados Documentais v0.6.md" $SprintNote | Out-Null
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $OpenNote | Out-Null
Write-Utf8Note "00_ABRIR_SENSETRUST/09_REVOGACAO_ADENDO_ESTADOS_v06.md" $OpenSprint | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync | Out-Null
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $Moc | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson | Out-Null

Write-Output "SenseTrust v0.6 Obsidian notes written to canonical vault $VaultPath"
