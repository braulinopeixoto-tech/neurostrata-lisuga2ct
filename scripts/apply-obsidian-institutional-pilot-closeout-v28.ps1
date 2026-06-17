$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Institutional Pilot Closeout Learning Loop Encerramento Piloto Institucional v2.8"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) { $FullPath = Join-Path $VaultRoot $Folder; if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null } }

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/InstitutionalPilotCloseout","SenseTrust/LearningLoop","SenseTrust/V3Readiness","SenseTrust/InstitutionalMaturity","SenseTrust/PilotCertificate","SenseTrust/VerificationPreview","SenseTrust/PilotEvidenceVault","SenseTrust/AcceptanceLedger","SenseTrust/InstitutionalPilot","SenseTrust/PilotControlRoom","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","InstitutionalPilotCloseout","LearningLoop","V3Readiness")
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.8
status: implemented_local_institutional_pilot_closeout
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[Diagnostico Neurofuncional Dimensional Auditavel]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Institutional Pilot]] [[Pilot Control Room]] [[Pilot Evidence Vault]] [[Acceptance Ledger]] [[Pilot Certificate]] [[Verification Preview]] [[Closeout]] [[Learning Loop]] [[Audit Trail]]

## Estado executivo

Institutional Pilot Closeout v2.8 criado como encerramento simulado e Learning Loop auditavel para transformar evidencias, aceite e certificado preview em decisao Go / Pause / Refine e prontidao v3.0.

## Regra operacional definitiva

Esta camada nao e encerramento juridico vinculante, nao e prova clinica de eficacia, nao declara cliente formal, nao declara parceria formalizada, nao valida regulatoriamente e nao certifica verdade diagnostica absoluta.

## Painel rapido SenseTrust

- Institutional Pilot Closeout Report: criado
- Learning Loop Register: criado
- Lessons Learned Matrix: criada
- Institutional Maturity Matrix: criada
- Go / Pause / Refine Decision Board: criado
- Regulatory Pending Items: criados
- v3.0 Readiness Matrix: criada
"@

$QuickContent = "# 32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28`n`nUltima nota: [[$SprintTitle]]`n`nCockpit: [[Closeout]] [[Learning Loop]] [[V3Readiness]] [[Audit Trail]]`n`nEstado: v2.8 implementada localmente como encerramento simulado metadata_only."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28]]`n- [[$SprintTitle]]`n`nPainel rapido SenseTrust:`n- [[00_MEMORY_INDEX/_LAST_SYNC]]`n- [[05_SENSETRUST/MOC_SenseTrust]]`n- [[00_MEMORY_INDEX/MEMORY_MANIFEST]]`n- [[05_SENSETRUST/Supabase Execution Proof]]`n`nEstado executivo: Institutional Pilot Closeout v2.8 e o cockpit atual para encerramento, Learning Loop, Go/Pause/Refine, maturidade institucional e prontidao v3.0.`n`nRegra operacional definitiva: manter metadata_only, sem dado clinico real, sem operacao clinica real, sem contrato, sem cliente formal, sem parceria formalizada, sem validacao regulatoria real e sem certificacao diagnostica."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28]] / [[$SprintTitle]]`nStatus: Institutional Pilot Closeout v2.8 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Institutional Pilot Closeout v2.8 - [[32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) { $MocPath = Join-Path $VaultRoot $Moc; if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }; Add-Content -LiteralPath $MocPath -Value "`n- [[32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28]] - [[$SprintTitle]]" }
$Payload = @{ latest_sensetrust_note = "32_INSTITUTIONAL_PILOT_CLOSEOUT_LEARNING_LOOP_v28"; latest_title = $SprintTitle; latest_version = "v2.8"; updated = $Now; status = "implemented_local_institutional_pilot_closeout"; constraints = @("metadata_only", "no_clinical_data", "no_patient_data", "no_legal_binding", "no_regulatory_authorization", "no_clinical_outcome_claim", "no_diagnostic_truth_certification") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Institutional Pilot Closeout v2.8 notes updated"

