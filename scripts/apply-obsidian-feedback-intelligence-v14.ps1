$ErrorActionPreference = "Stop"

$VaultPath = "C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS"
$VaultId = "b1a32fcb40985ffc"
$Now = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssK")

if (!(Test-Path $VaultPath)) {
  throw "Obsidian vault not found: $VaultPath"
}

if (!(Test-Path (Join-Path $VaultPath ".obsidian"))) {
  throw "Obsidian vault marker not found: $VaultPath\.obsidian"
}

function Write-VaultNote {
  param([string]$RelativePath, [string]$Content)
  $FullPath = Join-Path $VaultPath $RelativePath
  $Directory = Split-Path $FullPath -Parent
  if (!(Test-Path $Directory)) {
    New-Item -ItemType Directory -Path $Directory | Out-Null
  }
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

# SenseTrust Pilot Feedback Intelligence Metricas Aceite Valor Percebido Go-to-Market v1.4

Tags: #SenseTrust #SenseTrust/FeedbackIntelligence #SenseTrust/GoToMarket #SenseTrust/ValorPercebido #SenseTrust/Aceite #SenseTrust/PilotCRM #SenseTrust/Pipeline #SenseTrust/PilotoFechado #SenseTrust/TrustLayer #SenseTrust/DNDA #SenseTrust/VitalStrata #SenseTrust/NeuroStrata #SenseTrust/BLC #NeuroStrata/TrustLayer #VitalStrata/SaaS #DNDA/Auditavel #BLC/Rastreabilidade #MetadataOnly #Neurodireitos #LGPD #Obsidian/NATE #PilotoFechado #GoNoGo #GoToMarket #MarketSignals

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
- [[Pilot CRM]]
- [[Go No-Go]]
- [[Go-to-Market]]
- [[Valor Percebido]]
- [[Aceite]]
- [[Objecoes]]
- [[Sinais de Mercado]]

## Estado

Feedback Intelligence v1.4 transforma o Pilot CRM v1.3 em metricas simuladas de aceite, valor percebido, objecoes, risco recorrente, sinais de mercado e recomendacao go-to-market.

## Regras

Somente metadata_only. Somente simulated_only. Sem dado clinico real. Sem paciente real. Sem billing real. Sem decisao clinica automatizada. Revisao humana obrigatoria.
"@

$RootNote = @"
$Frontmatter

# Abrir ultima nota SenseTrust

## Ultima nota

[[18_FEEDBACK_INTELLIGENCE_v14]]

[[SenseTrust Pilot Feedback Intelligence Metricas Aceite Valor Percebido Go-to-Market v1.4]]

## Painel rapido

- [[MOC_SenseTrust]]
- [[MOC_VitalStrata_SenseTrust]]
- [[MOC_NeuroStrata_Trust_Layer]]
- [[MOC_DNDA_Trust_Object]]
- [[MOC_BLC_Rastreabilidade]]
- [[MEMORY_MANIFEST]]
- [[Supabase Execution Proof]]
- [[_LAST_SYNC]]

## Estado executivo

SenseTrust v1.4 consolida feedback simulado de pilotos fechados em inteligencia de produto, mercado e go-to-market.

## Regra operacional definitiva

Nao inserir dado clinico real, paciente real, billing real, assinatura legal real, ICP-Brasil real, Gov.br real, CRM externo real ou BI externo real.
"@

$LastSync = @"
$Frontmatter

# _LAST_SYNC

Ultima sincronizacao: SenseTrust Pilot Feedback Intelligence v1.4.

Nota principal: [[SenseTrust Pilot Feedback Intelligence Metricas Aceite Valor Percebido Go-to-Market v1.4]]

Root: [[18_FEEDBACK_INTELLIGENCE_v14]]
"@

$Moc = @"
$Frontmatter

# MOC_SenseTrust

## Trilha atual

- [[SenseTrust Pilot Console v1.0]]
- [[SenseTrust Pilot Package v1.1]]
- [[SenseTrust Pilot Onboarding Termos Consentimentos Contrato v1.2]]
- [[SenseTrust Pilot CRM Pipeline Pilotos Fechados Gestao Organizacoes v1.3]]
- [[SenseTrust Pilot Feedback Intelligence Metricas Aceite Valor Percebido Go-to-Market v1.4]]

## Fronteira

SenseTrust certifica processo, integridade, versionamento, auditabilidade e verificabilidade. Nao certifica verdade diagnostica absoluta.
"@

$Manifest = @"
$Frontmatter

# MEMORY_MANIFEST

- current_sprint: SenseTrust Pilot Feedback Intelligence v1.4
- root_note: 00_ABRIR_SENSETRUST/18_FEEDBACK_INTELLIGENCE_v14.md
- public_exposure: metadata_only
- simulated_only: true
"@

$ManifestJson = @"
{
  "vault_id": "$VaultId",
  "module": "SenseTrust",
  "current_sprint": "SenseTrust Pilot Feedback Intelligence v1.4",
  "root_note": "00_ABRIR_SENSETRUST/18_FEEDBACK_INTELLIGENCE_v14.md",
  "public_exposure": "metadata_only",
  "simulated_only": true,
  "updated": "$Now"
}
"@

Write-VaultNote "00_ABRIR_SENSETRUST\18_FEEDBACK_INTELLIGENCE_v14.md" $RootNote
Write-VaultNote "05_SENSETRUST\SenseTrust Pilot Feedback Intelligence Metricas Aceite Valor Percebido Go-to-Market v1.4.md" $SprintNote
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
Write-Host "root: 00_ABRIR_SENSETRUST\18_FEEDBACK_INTELLIGENCE_v14.md"
