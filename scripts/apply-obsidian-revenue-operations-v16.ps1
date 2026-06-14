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

# SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6

Tags: #SenseTrust #SenseTrust/RevenueOperations #SenseTrust/BillingReadiness #SenseTrust/ContratosComerciais #SenseTrust/GovernancaReceita #SenseTrust/ReceitaSimulada #SenseTrust/PricingStrategy #SenseTrust/OfertaComercial #SenseTrust/PlanosPagos #SenseTrust/ValidacaoReceita #SenseTrust/GoToMarket #SenseTrust/PilotCRM #SenseTrust/Pipeline #SenseTrust/PilotoFechado #SenseTrust/TrustLayer #SenseTrust/DNDA #SenseTrust/VitalStrata #SenseTrust/NeuroStrata #SenseTrust/BLC #NeuroStrata/TrustLayer #VitalStrata/SaaS #DNDA/Auditavel #BLC/Rastreabilidade #MetadataOnly #Neurodireitos #LGPD #Obsidian/NATE #BillingRealNaoImplementado #GatewayFuturo #FiscalLegalReview

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
- [[Piloto Fechado]]
- [[Pricing Strategy]]
- [[Receita Simulada]]
- [[Billing Readiness]]
- [[Contratos Comerciais]]
- [[Governanca de Receita]]
- [[Revenue Operations]]
- [[Gateway Futuro]]
- [[Billing Real Nao Implementado]]
- [[Fiscal Legal Review]]

## Estado

Revenue Operations v1.6 cria billing readiness, contratos comerciais revisaveis, ledger de receita simulada, governanca de receita e checklist de gateway futuro.

## Fronteira

Sem billing real, gateway real, PIX real, cartao real, boleto real, invoice real, nota fiscal real, assinatura legal real, contrato final ou dado clinico real.
"@

$RootNote = @"
$Frontmatter

# Abrir ultima nota SenseTrust

## Ultima nota

[[20_REVENUE_OPERATIONS_v16]]

[[SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6]]

## Painel rapido

- [[MOC_SenseTrust]]
- [[MOC_VitalStrata_SenseTrust]]
- [[MOC_NeuroStrata_Trust_Layer]]
- [[MOC_DNDA_Trust_Object]]
- [[MOC_BLC_Rastreabilidade]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
- [[_LAST_SYNC]]
"@

$LastSync = @"
$Frontmatter

# _LAST_SYNC

Ultima sincronizacao: SenseTrust Revenue Operations v1.6.

Nota principal: [[SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6]]

Root: [[20_REVENUE_OPERATIONS_v16]]
"@

$Moc = @"
$Frontmatter

# MOC_SenseTrust

## Trilha atual

- [[SenseTrust Pricing Strategy Oferta Comercial Planos Pagos Validacao Receita v1.5]]
- [[SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6]]

## Fronteira

Revenue Ops v1.6 e prontidao operacional simulada. Nao ativa billing real.
"@

$Manifest = @"
$Frontmatter

# MEMORY_MANIFEST

- current_sprint: SenseTrust Revenue Operations v1.6
- root_note: 00_ABRIR_SENSETRUST/20_REVENUE_OPERATIONS_v16.md
- public_exposure: metadata_only
- simulated_only: true
- billing_real_implemented: false
- payment_gateway_real_implemented: false
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "current_sprint": "SenseTrust Revenue Operations v1.6",
  "root_note": "00_ABRIR_SENSETRUST/20_REVENUE_OPERATIONS_v16.md",
  "public_exposure": "metadata_only",
  "simulated_only": true,
  "billing_real_implemented": false,
  "payment_gateway_real_implemented": false,
  "updated": "$Now"
}
"@

Write-VaultNote "00_ABRIR_SENSETRUST\20_REVENUE_OPERATIONS_v16.md" $RootNote
Write-VaultNote "05_SENSETRUST\SenseTrust Revenue Operations Billing Readiness Contratos Comerciais Governanca Receita v1.6.md" $SprintNote
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
Write-Host "root: 00_ABRIR_SENSETRUST\20_REVENUE_OPERATIONS_v16.md"
