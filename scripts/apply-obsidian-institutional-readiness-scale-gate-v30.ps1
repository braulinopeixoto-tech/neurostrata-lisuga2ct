$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$SprintTitle = "SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0"
$QuickNote = "00_ABRIR_SENSETRUST\33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30.md"
$MainNote = "05_SENSETRUST\$SprintTitle.md"
$RootNote = "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @(
  "05_SENSETRUST\MOC_SenseTrust.md",
  "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md",
  "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md",
  "05_SENSETRUST\MOC_DNDA_Trust_Object.md",
  "05_SENSETRUST\MOC_BLC_Rastreabilidade.md"
)

if (!(Test-Path (Join-Path $VaultRoot ".obsidian"))) {
  throw "Vault Obsidian canonico nao encontrado: $VaultRoot"
}

function Ensure-Parent($RelativePath) {
  $full = Join-Path $VaultRoot $RelativePath
  $parent = Split-Path $full -Parent
  if (!(Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
}

function Write-Note($RelativePath, $Body) {
  Ensure-Parent $RelativePath
  $full = Join-Path $VaultRoot $RelativePath
  Set-Content -Path $full -Value $Body -Encoding UTF8
  return $full
}

$Frontmatter = @"
---
vault_id: $VaultId
type: sensetrust_institutional_readiness_scale_gate
module: SenseTrust
version: v3.0
status: simulated_only
trust_status: metadata_only
created_by: Codex
created: 2026-06-17
updated: 2026-06-17
linked_sprint: SenseTrust v3.0 Institutional Readiness Strategic Scale Gate
---
"@

$QuickBody = @"
$Frontmatter

# 33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30

[[SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0]]

## Painel rapido

- Institutional Readiness Gate: criado.
- Strategic Scale Gate: criado.
- Scale Decision Board: criado.
- Market Prioritization Matrix: criada.
- Regulatory Readiness Map: criado.
- Institutional Risk Governance Map: criado.
- Scale Candidate Score: criado.
- v3 Strategic Roadmap: criado.
- Strategic Partner Fit Matrix: criada.
- Governance-to-Scale Audit Trail: criado.
- Strategic Scale Misuse Blockers: criados.
- Executive Report: criado.

## Estado executivo

Sprint v3.0 implementada como camada simulada e metadata_only. A decisao Go / Pause / Refine / Scale e recomendacao interna de governanca, nao autorizacao clinica, juridica, regulatoria ou comercial.

## Regra operacional definitiva

Nenhum uso clinico real, paciente real, contrato real, cliente formal, parceria formalizada, validacao regulatoria real, billing real ou certificacao diagnostica absoluta pode ser inferido desta sprint.

## Links

- [[_LAST_SYNC]]
- [[MEMORY_MANIFEST]]
- [[MOC_SenseTrust]]
- [[MOC_VitalStrata_SenseTrust]]
- [[MOC_NeuroStrata_Trust_Layer]]
- [[MOC_DNDA_Trust_Object]]
- [[MOC_BLC_Rastreabilidade]]
"@

$MainBody = @"
$Frontmatter

# $SprintTitle

## Pergunta respondida

Como transformar um ciclo de piloto institucional encerrado em portal estrategico de prontidao e decisao de escala, conectando maturidade institucional, risco, mercado, pendencias regulatorias e decisao Go / Pause / Refine / Scale sem virar contrato, cliente formal, parceria formalizada, validacao regulatoria real, operacao clinica real ou certificacao diagnostica.

## Origem

- Pilot Control Room v2.5.
- Evidence Vault & Acceptance Ledger v2.6.
- Pilot Certificate & Verification Preview v2.7.
- Institutional Pilot Closeout & Learning Loop v2.8.

## Criado

- Institutional Readiness Gate.
- Strategic Scale Gate.
- Scale Decision Board.
- Market Prioritization Matrix.
- Regulatory Readiness Map.
- Institutional Risk Governance Map.
- Scale Candidate Score.
- v3 Strategic Roadmap.
- Strategic Partner Fit Matrix.
- Governance-to-Scale Audit Trail.
- Strategic Scale Misuse Blockers.
- Institutional Readiness Executive Report.

## Limites

Metadata only, simulated only, LGPD, neurodireitos, sem dado clinico real, sem paciente real, sem contrato real, sem cliente formal, sem parceria formalizada, sem validacao regulatoria real e sem certificacao diagnostica absoluta.

## Links

- [[33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30]]
- [[MOC_SenseTrust]]
- [[MOC_VitalStrata_SenseTrust]]
- [[MOC_NeuroStrata_Trust_Layer]]
- [[MOC_DNDA_Trust_Object]]
- [[MOC_BLC_Rastreabilidade]]
"@

$RootBody = @"
$Frontmatter

# ABRIR ULTIMA NOTA SENSETRUST

## Ultima nota

- [[33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30]]
- [[SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0]]

## Painel rapido SenseTrust

- Estado: v3.0 metadata_only simulated_only.
- Escopo: prontidao institucional e decisao estrategica de escala.
- Bloqueios: sem paciente real, sem dado clinico real, sem contrato, sem cliente, sem parceria formalizada, sem validacao regulatoria real.

## Regra operacional definitiva

Obsidian e memoria conceitual, Supabase e memoria operacional, GitHub e memoria tecnica. A nota raiz sempre deve apontar para a ultima sprint SenseTrust atualizada no vault canonico.

## Links obrigatorios

- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
"@

$SyncBody = @"
# _LAST_SYNC

- updated: 2026-06-17
- module: SenseTrust
- latest: [[33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30]]
- latest_main: [[SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0]]
- status: v3.0 simulated_only metadata_only
- git: pending_or_blocked_until_remote_push
- supabase: not changed in this sprint
"@

$ManifestBody = @"
# MEMORY_MANIFEST

- Vault ID: $VaultId
- Canonical vault: $VaultRoot
- Latest SenseTrust note: [[33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30]]
- Latest SenseTrust main note: [[SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0]]
- Memory role: Obsidian conceptual memory; Supabase operational memory; GitHub technical memory.
"@

$ManifestJsonBody = @{
  vault_id = $VaultId
  latest_sensetrust_note = "33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30"
  latest_sensetrust_main_note = $SprintTitle
  updated = "2026-06-17"
  status = "metadata_only_simulated_only"
} | ConvertTo-Json -Depth 5

Write-Note $QuickNote $QuickBody | Out-Null
Write-Note $MainNote $MainBody | Out-Null
Write-Note $RootNote $RootBody | Out-Null
Write-Note $LastSync $SyncBody | Out-Null
Write-Note $Manifest $ManifestBody | Out-Null
Write-Note $ManifestJson $ManifestJsonBody | Out-Null

foreach ($moc in $Mocs) {
  $full = Join-Path $VaultRoot $moc
  Ensure-Parent $moc
  if (Test-Path $full) {
    $current = Get-Content -Raw -Path $full
  } else {
    $current = "# " + [IO.Path]::GetFileNameWithoutExtension($moc) + "`n"
  }
  if ($current -notmatch "33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30") {
    $current = $current.TrimEnd() + "`n`n## SenseTrust v3.0`n`n- [[33_INSTITUTIONAL_READINESS_STRATEGIC_SCALE_GATE_v30]]`n- [[SenseTrust Institutional Readiness Strategic Scale Gate Prontidao Institucional v3.0]]`n"
  }
  Set-Content -Path $full -Value $current -Encoding UTF8
}

Write-Output "Obsidian SenseTrust v3.0 atualizado em $VaultRoot"
