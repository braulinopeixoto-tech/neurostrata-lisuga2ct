$ErrorActionPreference = "Stop"

$VaultRoot = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$SprintTitle = "SenseTrust Pilot Certificate Verification Preview Certificado Simulado Piloto Verificacao Publica v2.7"
$Now = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")

if (-not (Test-Path -LiteralPath $VaultRoot)) { throw "Obsidian vault not found: $VaultRoot" }
$Folders = @("00_ABRIR_SENSETRUST", "00_MEMORY_INDEX", "05_SENSETRUST")
foreach ($Folder in $Folders) { $FullPath = Join-Path $VaultRoot $Folder; if (-not (Test-Path -LiteralPath $FullPath)) { New-Item -ItemType Directory -Path $FullPath | Out-Null } }

$QuickNote = Join-Path $VaultRoot "00_ABRIR_SENSETRUST\31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27.md"
$MainNote = Join-Path $VaultRoot "05_SENSETRUST\$SprintTitle.md"
$RootNote = Join-Path $VaultRoot "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md"
$LastSync = Join-Path $VaultRoot "00_MEMORY_INDEX\_LAST_SYNC.md"
$Manifest = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.md"
$ManifestJson = Join-Path $VaultRoot "00_MEMORY_INDEX\MEMORY_MANIFEST.json"
$Mocs = @("05_SENSETRUST\MOC_SenseTrust.md", "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md", "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md", "05_SENSETRUST\MOC_DNDA_Trust_Object.md", "05_SENSETRUST\MOC_BLC_Rastreabilidade.md")
$Tags = @("SenseTrust","SenseTrust/PilotCertificate","SenseTrust/VerificationPreview","SenseTrust/PublicVerification","SenseTrust/QR","SenseTrust/PilotEvidenceVault","SenseTrust/AcceptanceLedger","SenseTrust/EvidenceManifest","SenseTrust/InstitutionalPilot","SenseTrust/PilotControlRoom","SenseTrust/SupervisedAcceptance","SenseTrust/PipelineGovernance","SenseTrust/DecisionBoard","SenseTrust/TrustLayer","SenseTrust/DNDA","SenseTrust/VitalStrata","SenseTrust/NeuroStrata","SenseTrust/BLC","NeuroStrata/TrustLayer","VitalStrata/SaaS","DNDA/Auditavel","BLC/Rastreabilidade","MetadataOnly","Neurodireitos","LGPD","Obsidian/NATE","PilotCertificate","VerificationPreview","PublicVerification","QRMetadata")
$TagLines = ($Tags | ForEach-Object { "  - $_" }) -join "`n"

$MainContent = @"
---
vault_id: b1a32fcb40985ffc
type: sprint_record
module: SenseTrust
version: v2.7
status: implemented_local_pilot_certificate_verification_preview
trust_status: metadata_only
created_by: Codex
updated: $Now
tags:
$TagLines
---

# $SprintTitle

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[Diagnostico Neurofuncional Dimensional Auditavel]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[LGPD]] [[Metadata Only]] [[Pilot Evidence Vault]] [[Acceptance Ledger]] [[Pilot Certificate]] [[Verification Preview]] [[Public Verification]] [[QR Metadata]] [[Evidence Manifest]] [[Audit Trail]]

## Estado executivo

Pilot Certificate Verification Preview v2.7 criado como certificado simulado metadata_only com preview publico e QR metadata preview simulados.

## Regra operacional definitiva

Esta camada nao e certificado legal real, nao e assinatura legal, nao e ICP-Brasil, nao e Gov.br, nao e blockchain, nao e QR publico real, nao e portal publico real em producao e nao certifica verdade diagnostica absoluta.

## Painel rapido SenseTrust

- Pilot Certificate Preview: criado
- Public Verification Preview: criada
- QR Metadata Preview: criada
- Public Metadata Snapshot: criado
- Claim Guardrails: criados
- Certificate Misuse Blockers: criados
"@

$QuickContent = "# 31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27`n`nUltima nota: [[$SprintTitle]]`n`nCockpit: [[Pilot Certificate]] [[Verification Preview]] [[Public Verification]] [[QR Metadata]]`n`nEstado: v2.7 implementada localmente como certificado e verificacao simulados metadata_only."
$RootContent = "# Abrir ultima nota SenseTrust`n`n- [[31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27]]`n- [[$SprintTitle]]`n`nPainel rapido SenseTrust:`n- [[00_MEMORY_INDEX/_LAST_SYNC]]`n- [[05_SENSETRUST/MOC_SenseTrust]]`n- [[00_MEMORY_INDEX/MEMORY_MANIFEST]]`n- [[05_SENSETRUST/Supabase Execution Proof]]`n`nEstado executivo: Pilot Certificate Verification Preview v2.7 e o cockpit atual para certificado simulado, verificacao publica simulada, QR metadata, snapshots publicos e blockers.`n`nRegra operacional definitiva: manter metadata_only, sem dado clinico real, sem paciente real, sem portal publico real, sem QR real, sem assinatura legal, sem ICP-Brasil, sem Gov.br e sem blockchain."

Set-Content -LiteralPath $MainNote -Value $MainContent -Encoding UTF8
Set-Content -LiteralPath $QuickNote -Value $QuickContent -Encoding UTF8
Set-Content -LiteralPath $RootNote -Value $RootContent -Encoding UTF8
Set-Content -LiteralPath $LastSync -Value "# Last Sync`n`nUpdated: $Now`nLatest SenseTrust note: [[31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27]] / [[$SprintTitle]]`nStatus: Pilot Certificate Verification Preview v2.7 implemented.`n" -Encoding UTF8
Add-Content -LiteralPath $Manifest -Value "`n- $Now - SenseTrust Pilot Certificate Verification Preview v2.7 - [[31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27]] - [[$SprintTitle]]"
foreach ($Moc in $Mocs) { $MocPath = Join-Path $VaultRoot $Moc; if (-not (Test-Path -LiteralPath $MocPath)) { Set-Content -LiteralPath $MocPath -Value "# $([IO.Path]::GetFileNameWithoutExtension($MocPath))`n" -Encoding UTF8 }; Add-Content -LiteralPath $MocPath -Value "`n- [[31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27]] - [[$SprintTitle]]" }
$Payload = @{ latest_sensetrust_note = "31_PILOT_CERTIFICATE_VERIFICATION_PREVIEW_v27"; latest_title = $SprintTitle; latest_version = "v2.7"; updated = $Now; status = "implemented_local_pilot_certificate_verification_preview"; constraints = @("metadata_only", "no_clinical_data", "no_patient_data", "no_real_public_portal", "no_real_qr", "no_legal_signature", "no_icp_brasil", "no_gov_br", "no_blockchain") } | ConvertTo-Json -Depth 4
Set-Content -LiteralPath $ManifestJson -Value $Payload -Encoding UTF8
Write-Host "PASS Obsidian Pilot Certificate Verification Preview v2.7 notes updated"

