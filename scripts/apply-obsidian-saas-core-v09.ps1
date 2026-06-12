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
linked_sprint: SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9
---

# SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9

Status operacional: BLOQUEADO para aprovacao final ate build, Obsidian e Git serem confirmados no ambiente.

## Relacao com v0.8
O SaaS Core preserva o portal publico metadata_only e modela consumo de emissoes e verificacoes publicas por organizacao.

## Nucleo
- organizacoes simuladas
- usuarios simulados
- papeis e permissoes
- planos comerciais simulados
- ledger de uso mensal
- tenant isolation

## Modelo comercial
Demo, Professional, Clinic, Enterprise e Government sao modelos simulados para validacao. Billing real nao foi implementado.

## Piloto fechado
Preparado conceitualmente, mas ainda bloqueado para uso real ate billing, autenticacao, RLS de producao e Git/build estarem aprovados.
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

Ultima nota: [[12_SAAS_CORE_v09]]

Nota da sprint: [[SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9]]

## Painel rapido SenseTrust
- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]

## Estado executivo
SenseTrust v0.9 implementa SaaS Core simulado com organizacoes, usuarios, papeis, planos, limites e consumo.

## Regra operacional definitiva
Nao usar dado clinico real, nao ativar billing real e nao liberar uso clinico enquanto build, Git remoto e validacoes finais nao estiverem aprovados.
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

# 12 SaaS Core v0.9

Abrir sprint principal: [[SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9]]

## SaaS
- organizacoes
- multiusuario
- papeis
- planos
- uso mensal
- tenant isolation
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

Ultima sincronizacao SenseTrust: v0.9 SaaS Core / Organizacoes / Multiusuario / Plano Comercial.

Notas principais:
- [[12_SAAS_CORE_v09]]
- [[SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9]]
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
- [[SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9]]
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

SenseTrust v0.9 registrado como SaaS Core simulado.
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "last_sync": "$Now",
  "latest_note": "05_SENSETRUST/SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9.md",
  "latest_cockpit": "00_ABRIR_SENSETRUST/12_SAAS_CORE_v09.md",
  "trust_status": "simulated_only"
}
"@

Write-Utf8Note "05_SENSETRUST/SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9.md" $SprintNote | Out-Null
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $OpenNote | Out-Null
Write-Utf8Note "00_ABRIR_SENSETRUST/12_SAAS_CORE_v09.md" $OpenSprint | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync | Out-Null
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $Moc | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest | Out-Null
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson | Out-Null

Write-Output "SenseTrust v0.9 Obsidian notes written to canonical vault $VaultPath"
