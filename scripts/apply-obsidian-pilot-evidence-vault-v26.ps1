$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Pilot Evidence Vault Acceptance Ledger Cofre Evidencias Piloto Aceite Supervisionado v2.6"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) { $FullPath = Join-Path $VaultRoot $Folder; if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null } }

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/PilotEvidenceVault","SenseTrust/AcceptanceLedger","SenseTrust/EvidenceManifest","SenseTrust/InstitutionalPilot","SenseTrust/PilotControlRoom","SenseTrust/SupervisedAcceptance","SenseTrust/PipelineGovernance","SenseTrust/DecisionBoard","SenseTrust/MeetingIntelligence","SenseTrust/PartnerDemoKit","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","PilotEvidenceVault","AcceptanceLedger","EvidenceManifest","AuditTrail")
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.6
status: implemented_local_pilot_evidence_vault
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[Diagnostico Neurofuncional Dimensional Auditavel]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Institutional Pilot]] [[Pilot Control Room]] [[Pilot Evidence Vault]] [[Acceptance Ledger]] [[Evidence Manifest]] [[Supervised Acceptance]] [[Execution Governance]] [[Interruption Governance]] [[Audit Trail]]

## Estado executivo

Pilot Evidence Vault v2.6 criado como cofre logico simulado metadata_only e Acceptance Ledger supervisionado.

## Regra operacional definitiva

Esta camada nao e storage imutavel real, nao e assinatura legal real, nao e blockchain, nao e ICP-Brasil, nao e Gov.br, nao e contrato, nao e aceite juridico vinculante, nao usa paciente real e nao certifica verdade diagnostica absoluta.

## Painel rapido SenseTrust

- Pilot Evidence Vault: criado
- Acceptance Ledger: criado
- Evidence Manifest: criado
- Logical Hash: simulado
- Misuse Blockers: criados
- Evidence Audit Trail: criado

## Trilhas relacionadas

- [[29_INSTITUTIONAL_PILOT_CONTROL_ROOM_v25]]
- [[28_PIPELINE_GOVERNANCE_DECISION_BOARD_v24]]
- [[27_MEETING_INTELLIGENCE_v23]]
"@

$QuickContent = "# 30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26`n`nUltima nota: [[$SprintTitle]]`n`nCockpit: [[Pilot Evidence Vault]] [[Acceptance Ledger]] [[Evidence Manifest]] [[Audit Trail]]`n`nEstado: v2.6 implementada localmente como evidencia metadata_only simulada."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26]]`n- [[$SprintTitle]]`n`nPainel rapido SenseTrust:`n- [[00_MEMORY_INDEX/_LAST_SYNC]]`n- [[05_SENSETRUST/MOC_SenseTrust]]`n- [[00_MEMORY_INDEX/MEMORY_MANIFEST]]`n- [[05_SENSETRUST/Supabase Execution Proof]]`n`nEstado executivo: Pilot Evidence Vault v2.6 e o cockpit atual para cofre logico, Acceptance Ledger, Evidence Manifest, hashes logicos, blockers e audit trail.`n`nRegra operacional definitiva: manter metadata_only, sem dado clinico real, sem paciente real, sem storage imutavel real, sem assinatura legal, sem blockchain, sem contrato, sem cliente e sem parceria formalizada."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26]] / [[$SprintTitle]]`nStatus: Pilot Evidence Vault v2.6 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Pilot Evidence Vault v2.6 - [[30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) { $MocPath = Join-Path $VaultRoot $Moc; if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }; Add-Content -LiteralPath $MocPath -Value "`n- [[30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26]] - [[$SprintTitle]]" }
$Payload = @{ latest_sensetrust_note = "30_PILOT_EVIDENCE_VAULT_ACCEPTANCE_LEDGER_v26"; latest_title = $SprintTitle; latest_version = "v2.6"; updated = $Now; status = "implemented_local_pilot_evidence_vault"; constraints = @("metadata_only", "no_clinical_data", "no_patient_data", "no_real_storage", "no_legal_signature", "no_blockchain", "no_contract", "no_client", "no_formal_partnership") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Pilot Evidence Vault v2.6 notes updated"

