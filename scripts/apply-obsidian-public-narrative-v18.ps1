$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")

if (!(Test-Path $VaultPath)) { throw "Obsidian vault not found: $VaultPath" }
if (!(Test-Path (Join-Path $VaultPath ".obsidian"))) { throw "Obsidian vault marker not found: $VaultPath\.obsidian" }

function Write-VaultNote {
  param([string]$RelativePath, [string]$Content)
  $FullPath = Join-Path $VaultPath $RelativePath
  $Directory = Split-Path $FullPath -Parent
  if (!(Test-Path $Directory)) { New-Item -ItemType Directory -Path $Directory | Out-Null }
  Set-Content -LiteralPath $FullPath -Value $Content -Encoding UTF8
}

$Frontmatter = @"
---
vault_id: $VaultId
type: sprint_record
module: SenseTrust
status: implemented
created_by: Codex
created: $Now
updated: $Now
trust_status: simulated_only
---
"@

$SprintNote = @"
$Frontmatter

# SenseTrust Public Narrative Institutional Authority Manifesto Website Copy Tese Publica v1.8

Tags: #SenseTrust #SenseTrust/PublicNarrative #SenseTrust/InstitutionalAuthority #SenseTrust/Manifesto #SenseTrust/WebsiteCopy #SenseTrust/TesePublica #SenseTrust/ClaimsGovernance #SenseTrust/PressKit #SenseTrust/PublicFAQ #SenseTrust/TrustLayer #SenseTrust/DNDA #SenseTrust/VitalStrata #SenseTrust/NeuroStrata #SenseTrust/BLC #SenseTrust/InvestorRoom #NeuroStrata/TrustLayer #VitalStrata/SaaS #DNDA/Auditavel #BLC/Rastreabilidade #MetadataOnly #Neurodireitos #LGPD #Obsidian/NATE #PublicNarrative #InstitutionalAuthority

## Links

- [[NeuroStrata]]
- [[VitalStrata]]
- [[DNDA]]
- [[BLC]]
- [[Trust Layer]]
- [[SenseTrust Layer]]
- [[Neurodireitos]]
- [[LGPD]]
- [[Metadata Only]]
- [[Investor Room]]
- [[Data Room]]
- [[Pitch Deck]]
- [[Public Narrative]]
- [[Manifesto]]
- [[Website Copy]]
- [[Tese Publica]]
- [[Claims Governance]]
- [[Public Risk Disclosure]]
- [[Institutional Authority]]

## Estado

Narrativa publica v1.8 com manifesto, website copy, tese publica, claims governance, public FAQ, press kit e autoridade institucional.

## Fronteira

Sem site publicado, sem deploy, sem receita real, sem billing real, sem cliente real, sem Gov.br, sem ICP-Brasil e sem certificacao diagnostica absoluta.
"@

$RootNote = @"
$Frontmatter

# Abrir ultima nota SenseTrust

## Ultima nota

[[22_PUBLIC_NARRATIVE_v18]]

[[SenseTrust Public Narrative Institutional Authority Manifesto Website Copy Tese Publica v1.8]]
"@

$LastSync = @"
$Frontmatter

# _LAST_SYNC

Ultima sincronizacao: SenseTrust Public Narrative v1.8.

Root: [[22_PUBLIC_NARRATIVE_v18]]
"@

$Moc = @"
$Frontmatter

# MOC_SenseTrust

## Trilha atual

- [[SenseTrust Investor Strategic Partnership Room Data Room Pitch Deck Aliancas Institucionais v1.7]]
- [[SenseTrust Public Narrative Institutional Authority Manifesto Website Copy Tese Publica v1.8]]
"@

$Manifest = @"
$Frontmatter

# MEMORY_MANIFEST

- current_sprint: SenseTrust Public Narrative v1.8
- root_note: 00_ABRIR_SENSETRUST/22_PUBLIC_NARRATIVE_v18.md
- public_exposure: metadata_only
- simulated_only: true
- real_revenue_claimed: false
- real_billing_claimed: false
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "current_sprint": "SenseTrust Public Narrative v1.8",
  "root_note": "00_ABRIR_SENSETRUST/22_PUBLIC_NARRATIVE_v18.md",
  "public_exposure": "metadata_only",
  "simulated_only": true,
  "real_revenue_claimed": false,
  "real_billing_claimed": false,
  "updated": "$Now"
}
"@

Write-VaultNote "00_ABRIR_SENSETRUST\22_PUBLIC_NARRATIVE_v18.md" $RootNote
Write-VaultNote "05_SENSETRUST\SenseTrust Public Narrative Institutional Authority Manifesto Website Copy Tese Publica v1.8.md" $SprintNote
Write-VaultNote "05_SENSETRUST\MOC_SenseTrust.md" $Moc
Write-VaultNote "05_SENSETRUST\MOC_VitalStrata_SenseTrust.md" $Moc
Write-VaultNote "05_SENSETRUST\MOC_NeuroStrata_Trust_Layer.md" $Moc
Write-VaultNote "05_SENSETRUST\MOC_DNDA_Trust_Object.md" $Moc
Write-VaultNote "05_SENSETRUST\MOC_BLC_Rastreabilidade.md" $Moc
Write-VaultNote "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $RootNote
Write-VaultNote "00_MEMORY_INDEX\_LAST_SYNC.md" $LastSync
Write-VaultNote "00_MEMORY_INDEX\MEMORY_MANIFEST.md" $Manifest
Write-VaultNote "00_MEMORY_INDEX\MEMORY_MANIFEST.json" $ManifestJson

Write-Host "status: updated"
Write-Host "vault: $VaultPath"
Write-Host "root: 00_ABRIR_SENSETRUST\22_PUBLIC_NARRATIVE_v18.md"
