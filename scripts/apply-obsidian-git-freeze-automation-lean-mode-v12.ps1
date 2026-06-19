$ErrorActionPreference = "Stop"
$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$SprintTitle = "SenseTrust Git Freeze Automation v1.2 Lean Mode"
$QuickNote = "00_ABRIR_SENSETRUST\41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12.md"
$MainNote = "05_SENSETRUST\$SprintTitle.md"
$RootNote = "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md","05_SENSETRUST\MOC_VitalStrata_SenseTrust.md","05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md","05_SENSETRUST\MOC_DNDA_Trust_Object.md","05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
if (!(Test-Path (Join-Path $VaultRoot ".obsidian"))) { throw "Vault Obsidian canonico nao encontrado: $VaultRoot" }
function Ensure-Parent($RelativePath) { $full = Join-Path $VaultRoot $RelativePath; $parent = Split-Path $full -Parent; if (!(Test-Path $parent)) { New-Item -ItemType Directory -Force -Path $parent | Out-Null } }
function Write-Note($RelativePath, $Body) { Ensure-Parent $RelativePath; Set-Content -Path (Join-Path $VaultRoot $RelativePath) -Value $Body -Encoding UTF8 }

$Tags = @("SenseTrust","SenseTrust/GitFreezeAutomation","SenseTrust/LeanFreeze","SenseTrust/v1.2","SenseTrust/FreezeRunner","SenseTrust/CleanClone","SenseTrust/NoAdmin","SenseTrust/NoACLRepair","SenseTrust/ManifestDriven","SenseTrust/HashValidation","SenseTrust/Obsidian","SenseTrust/v3.7","SenseTrust/v3.6","SenseTrust/v1.1","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE")
$TagsYaml = ($Tags | ForEach-Object { "  - $_" }) -join "`n"
$Frontmatter = @"
---
vault_id: $VaultId
type: sensetrust_git_freeze_automation_lean_mode
module: SenseTrust
version: v1.2
status: lean_freeze_standard
trust_status: metadata_only
created_by: Codex
created: 2026-06-19
updated: 2026-06-19
linked_sprint: SenseTrust Git Freeze Automation v1.2 Lean Mode
tags:
$TagsYaml
---
"@
$QuickBody = @"
$Frontmatter

# 41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12

[[SenseTrust Git Freeze Automation v1.2 Lean Mode]]

## Painel rapido

- Lean Freeze e o novo padrao diario.
- v1.1 permanece como recuperacao excepcional.
- Clone limpo e o caminho recomendado para ACL quebrada.
- O runner copia apenas arquivos do manifesto.
- O runner valida build, teste principal, regressoes, Obsidian, commit, push, hash local/remoto e git status limpo.

## Estado executivo

v1.2 transforma o procedimento que congelou a v3.7 em automacao rapida, auditavel e sem dependencia de PowerShell admin no fluxo diario.

## Regra operacional definitiva

Nao usar reparo de ACL no fluxo diario. Nao usar git add . ou git add -A. Nao aceitar falso freeze, branch vazia, Obsidian errado, build falhando, teste falhando, hash remoto divergente ou git status sujo.

## Links

- [[_LAST_SYNC]]
- [[MEMORY_MANIFEST]]
- [[MOC_SenseTrust]]
- [[40_STRATEGIC_PARTNERSHIP_PILOT_PROPOSAL_ROOM_v37]]
- [[39_STRATEGIC_PARTNERSHIP_CONVERSION_DECISION_ROOM_v36]]
- [[SenseTrust Git Freeze Automation Memory]]
"@
$MainBody = @"
$Frontmatter

# $SprintTitle

## Origem

A sprint nasce do incidente operacional v3.7. O fluxo que funcionou foi clone limpo, instalacao de dependencias quando necessario, build, teste principal, regressoes, Obsidian, git add por arquivo, commit, push, ls-remote, hash local/remoto igual e git status limpo.

## Decisao

Lean Freeze v1.2 substitui o v1.1 como fluxo diario. O v1.1 fica documentado como modo legado de recuperacao excepcional.

## Limites

Metadata only, LGPD, neurodireitos, sem dado clinico real, sem paciente real, sem operacao clinica real, sem certificacao diagnostica, sem contrato real, sem cliente real e sem parceria formalizada.

## Comandos

- npm.cmd install --legacy-peer-deps --no-audit --no-fund
- npm.cmd run build
"@
$RootBody = @"
$Frontmatter

# ABRIR ULTIMA NOTA SENSETRUST

## Ultima nota

- [[41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12]]
- [[SenseTrust Git Freeze Automation v1.2 Lean Mode]]

## Painel rapido SenseTrust

- Estado: Lean Freeze v1.2 como padrao diario.
- Escopo: automacao de freeze manifest-driven.
- Base: v3.7 Strategic Partnership Pilot Proposal Room.
- Bloqueios: sem falso freeze, sem branch vazia, sem git add geral, sem hash divergente, sem Obsidian errado.

## Links obrigatorios

- [[_LAST_SYNC]]
- [[MOC_SenseTrust]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
"@
$SyncBody = "# _LAST_SYNC`n`n- updated: 2026-06-19`n- module: SenseTrust`n- latest: [[41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12]]`n- latest_main: [[SenseTrust Git Freeze Automation v1.2 Lean Mode]]`n- status: lean_freeze_standard metadata_only`n- base: [[40_STRATEGIC_PARTNERSHIP_PILOT_PROPOSAL_ROOM_v37]]`n"
$ManifestBody = "# MEMORY_MANIFEST`n`n- Vault ID: $VaultId`n- Canonical vault: $VaultRoot`n- Latest SenseTrust note: [[41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12]]`n- Latest SenseTrust main note: [[SenseTrust Git Freeze Automation v1.2 Lean Mode]]`n- Memory role: Obsidian conceptual memory; Supabase operational memory; GitHub technical memory.`n"
$ManifestJsonBody = @{ vault_id = $VaultId; latest_sensetrust_note = "41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12"; latest_sensetrust_main_note = $SprintTitle; updated = "2026-06-19"; status = "lean_freeze_standard_metadata_only" } | ConvertTo-Json -Depth 5

Write-Note $QuickNote $QuickBody
Write-Note $MainNote $MainBody
Write-Note $RootNote $RootBody
Write-Note $LastSync $SyncBody
Write-Note $Manifest $ManifestBody
Write-Note $ManifestJson $ManifestJsonBody
foreach ($moc in $Mocs) {
  $full = Join-Path $VaultRoot $moc
  Ensure-Parent $moc
  if (Test-Path $full) { $current = Get-Content -Raw -Path $full } else { $current = "# " + [IO.Path]::GetFileNameWithoutExtension($moc) + "`n" }
  if ($current -notmatch "41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12") {
    $current = $current.TrimEnd() + "`n`n## SenseTrust Git Freeze Automation v1.2`n`n- [[41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12]]`n- [[SenseTrust Git Freeze Automation v1.2 Lean Mode]]`n"
  }
  Set-Content -Path $full -Value $current -Encoding UTF8
}
Write-Output "Obsidian SenseTrust Lean Freeze v1.2 atualizado em $VaultRoot"
