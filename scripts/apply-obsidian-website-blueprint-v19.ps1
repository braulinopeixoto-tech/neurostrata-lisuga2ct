$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Website Blueprint Landing Experience Arquitetura Site UX Publica Conversao Institucional v1.9"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) {
  throw "Obsidian vault not found: $VaultRoot"
}

$RequiredFolders = @(
  "00_ABRIR_SENSETRUST",
  "00_MEMORY_INDEX",
  "05_SENSETRUST"
)

foreach ($Folder in $RequiredFolders) {
  $FullPath = Join-Path $VaultRoot $Folder
  if (-not (Test-Path -LiteralPath $FullPath)) {
    New-Item -ItemType Directory -Path $FullPath | Out-Null
  }
}

$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$QuickOpenNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\23_WEBSITE_BLUEPRINT_v19.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$MocNote = Join-Path $VaultRoot "05_SENSETRUST\MOC_SenseTrust.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$JsonIndex = Join-Path $VaultRoot "00_MEMORY_INDEX\sensetrust-memory-index.json"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v1.9
status: implemented_local_blueprint
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# $SprintTitle

Status: IMPLEMENTADO LOCALMENTE COMO BLUEPRINT

## Resultado

Blueprint publico SenseTrust v1.9 criado para arquitetura de site, UX publica, landing experience, jornadas por audiencia, CTAs, guardrails, formularios blueprint_only, analytics blueprint_only e checklist de publicacao.

## Links

- [[23_WEBSITE_BLUEPRINT_v19]]
- [[MOC_SenseTrust]]
- [[_LAST_SYNC]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]

## Regras

- Nenhum dado clinico real.
- Nenhum lead real.
- Nenhum deploy de producao.
- Nenhum billing real.
- Nenhuma receita real.
- Nenhuma certificacao de verdade diagnostica absoluta.

## Referencias

- SenseTrust Public Narrative v1.8
- SenseTrust Investor Room v1.7
- SenseTrust Revenue Operations v1.6
"@

$QuickContent = @"
---
vault_id: b1a32fcb40985ffc
type: quick_open
module: SenseTrust
version: v1.9
status: latest_sensetrust_note
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# SenseTrust Website Blueprint v1.9

Abrir nota principal: [[$SprintTitle]]

## Painel rapido

- Sitemap publico: criado como blueprint.
- Landing experience: criada.
- Audience journeys: criadas.
- CTA matrix: criada.
- Claim guardrails: criados.
- Publicacao real: pendente.

## Regra definitiva

Website v1.9 e blueprint institucional. Nao publicar, coletar lead real, declarar deploy real, billing real ou verdade diagnostica absoluta sem sprint futura especifica.
"@

$RootContent = @"
---
vault_id: b1a32fcb40985ffc
type: root_note
module: SenseTrust
status: active
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# Abrir ultima nota SenseTrust

Ultima nota: [[$SprintTitle]]

## Painel rapido SenseTrust

- Estado executivo: Website Blueprint v1.9 implementado localmente.
- RLS forte: aprovado em sprint anterior.
- QR PDF: pendente.
- Uso clinico real: bloqueado.

## Regra operacional definitiva

Obsidian registra memoria conceitual, Supabase registra memoria operacional e GitHub registra memoria tecnica. Nenhuma comunicacao publica deve declarar producao, receita, billing, lead real ou certificacao diagnostica absoluta sem evidencia externa validada.

## Links

- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
- [[$SprintTitle]]
"@

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickOpenNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8

Add-Content -LiteralPath $MocNote -Value "`n- [[$SprintTitle]] - Website Blueprint v1.9 / UX publica / conversao institucional"
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[$SprintTitle]]`nStatus: Website Blueprint v1.9 implemented as local blueprint.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Website Blueprint v1.9 - [[$SprintTitle]]"

$IndexPayload = @{
  latest_sensetrust_note = $SprintTitle
  latest_version = "v1.9"
  updated = $Now
  status = "implemented_local_blueprint"
  constraints = @("metadata_only", "no_real_leads", "no_production_deploy", "no_real_billing", "no_diagnostic_truth_certification")
} | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $JsonIndex -Value $IndexPayload -Encoding UTF8

Write-Host "PASS Obsidian Website Blueprint v1.9 notes updated"
