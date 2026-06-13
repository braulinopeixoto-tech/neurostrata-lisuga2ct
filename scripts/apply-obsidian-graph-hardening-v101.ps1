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
}

$TrailLinks = @"
* [[00_ABRIR_AQUI_SENSETRUST]]
* [[01_STATUS_EXECUTIVO_SENSETRUST]]
* [[02_RLS_v02_FINAL_APPROVAL]]
* [[03_CADEIA_DE_PROVAS_RLS_v02]]
* [[04_PROXIMA_SPRINT_QR_CERTIFICADO]]
* [[05_QR_CERTIFICADO_v03]]
* [[06_DNDA_TRUST_OBJECT_v04]]
* [[07_PLANO_ESCALA_SAAS_SENSETRUST]]
* [[08_CLINICAL_COMMIT_CHAIN_v05]]
* [[09_REVOGACAO_ADENDO_ESTADOS_v06]]
* [[10_ASSINATURA_TIMESTAMP_v07]]
* [[11_PORTAL_VERIFICACAO_PUBLICA_v08]]
* [[12_SAAS_CORE_v09]]
* [[13_PILOT_CONSOLE_v10]]
* [[14_GRAPH_HARDENING_MOC_v101]]
"@

$GraphNote = @"
---
title: SenseTrust Graph Hardening / MOC NeuroStrata VitalStrata DNDA BLC v1.0.1
aliases:
  - SenseTrust Graph Hardening
  - MOC SenseTrust NeuroStrata VitalStrata DNDA BLC
  - NeuroStrata Trust Layer Graph
  - VitalStrata SenseTrust Graph
  - DNDA Trust Object Graph
  - BLC SenseTrust Graph
  - Cartorio Digital DNDA Graph
type: moc_hardening
class: obsidian_graph
project:
  - NeuroStrata
  - VitalStrata
  - DNDA
  - SenseTrust
  - BLC
version: v1.0.1
status: documental_aprovavel
base_branch: chore/sensetrust-pilot-console-v10
base_commit: 1ccede3
data_classification: metadata_only
clinical_use: nao_liberado_para_uso_clinico_real
billing_real: nao_implementado
signature_legal_real: nao_implementada
tags:
  - SenseTrust
  - SenseTrust/GraphHardening
  - SenseTrust/MOC
  - SenseTrust/TrustLayer
  - SenseTrust/DNDA
  - SenseTrust/VitalStrata
  - SenseTrust/NeuroStrata
  - SenseTrust/BLC
  - SenseTrust/PilotConsole
  - SenseTrust/v1
  - NeuroStrata
  - NeuroStrata/TrustLayer
  - NeuroStrata/DNDA
  - NeuroStrata/Neurodireitos
  - VitalStrata
  - VitalStrata/SaaS
  - VitalStrata/TrustLayer
  - VitalStrata/BioDigitalTwin
  - DNDA
  - DNDA/Auditavel
  - DNDA/Versionavel
  - DNDA/Certificavel
  - DNDA/TrustObject
  - BLC
  - BLC/CadeiaLogica
  - BLC/Rastreabilidade
  - BLC/Integridade
  - TrustLayer
  - MetadataOnly
  - LGPD
  - Neurodireitos
  - Obsidian/MOC
  - Obsidian/NATE
  - PilotoFechado
---

# SenseTrust Graph Hardening / MOC NeuroStrata VitalStrata DNDA BLC v1.0.1

## 1. Objetivo

Esta sprint nao altera o nucleo tecnico v1.0. Ela endurece o grafo Obsidian para tornar a arquitetura [[SenseTrust]] navegavel, demonstravel e conceitualmente conectada entre [[NeuroStrata]], [[VitalStrata]], [[DNDA]], [[BLC]] e [[Trust Layer]].

## 2. Nucleo ontologico

* [[NeuroStrata]]
* [[VitalStrata]]
* [[DNDA]]
* [[BLC]]
* [[SenseTrust]]
* [[Trust Layer]]
* [[SenseTrust Layer]]
* [[Neurodireitos]]
* [[Metadata Only]]
* [[Piloto Fechado]]

## 3. Relacao entre camadas

[[NeuroStrata]] -> matriz neurofuncional e documental.

[[DNDA]] -> objeto clinico-documental auditavel.

[[BLC]] -> cadeia logica de rastreabilidade e integridade.

[[SenseTrust]] -> Trust Layer que certifica integridade, proveniencia, emissao, estado documental e verificabilidade publica segura.

[[VitalStrata]] -> camada operacional/SaaS ampliada para jornada vital, longitudinalidade e futuro [[BioDigital Twin]] auditavel.

## 4. Grafo macro

[[NeuroStrata]] -> [[DNDA]] -> [[DNDA Trust Object]] -> [[Evidence Manifest]] -> [[Clinical Commit Chain]] -> [[Document States]] -> [[Signature Timestamp]] -> [[Portal Publico de Verificacao]] -> [[Pilot Console]]

[[VitalStrata]] -> [[SenseTrust SaaS Core]] -> [[Organizacoes]] -> [[Usuarios]] -> [[Papeis]] -> [[Planos Comerciais]] -> [[Usage Ledger]] -> [[Piloto Fechado]]

[[BLC]] -> [[Hash Chain]] -> [[Parent Commit]] -> [[Emission Hash]] -> [[Audit Trail]] -> [[Tenant Isolation]]

## 5. Trilha SenseTrust 00 a 14

$TrailLinks

## 6. Linguagem institucional obrigatoria

A SenseTrust nao substitui julgamento clinico e nao certifica verdade diagnostica absoluta. Ela certifica integridade, proveniencia, rastreabilidade, estado documental, emissao e verificabilidade publica segura dos objetos NeuroStrata, DNDA, VitalStrata e BLC.

## 7. Mapa de uso para piloto fechado

[[Piloto Fechado]] -> [[Demo Operacional v1.0]] -> [[Pilot Console]] -> [[SenseTrust SaaS Core]] -> [[Portal Publico de Verificacao]] -> [[Audit Report]] -> [[MOC_SenseTrust]]
"@

$RootNote = @"
---
vault_id: $VaultId
type: root_entrypoint
module: SenseTrust
status: active
trust_status: metadata_only
created_by: Codex
updated: $Now
---

# Abrir ultima nota SenseTrust

Ultima nota: [[14_GRAPH_HARDENING_MOC_v101]]

Nota da sprint: [[SenseTrust Obsidian Graph Hardening MOC NeuroStrata VitalStrata DNDA BLC v1.0.1]]

## Mapa macro do ecossistema

* [[NeuroStrata]]
* [[VitalStrata]]
* [[DNDA]]
* [[BLC]]
* [[Trust Layer]]
* [[SenseTrust Layer]]
* [[Neurodireitos]]
* [[Metadata Only]]
* [[Piloto Fechado]]
* [[MOC_SenseTrust]]
* [[MOC_NeuroStrata_Trust_Layer]]
* [[MOC_VitalStrata_SenseTrust]]
* [[MOC_DNDA_Trust_Object]]
* [[MOC_BLC_Rastreabilidade]]

## Trilha SenseTrust expandida

$TrailLinks
"@

$MocSenseTrust = @"
# MOC SenseTrust

## Nucleo
* [[SenseTrust Layer]]
* [[SenseTrust Core]]
* [[SenseTrust Certify]]
* [[SenseTrust SaaS]]
* [[Trust Layer]]
* [[NeuroStrata]]
* [[VitalStrata]]
* [[DNDA]]
* [[BLC]]

## Trilha operacional
$TrailLinks

## DNDA
* [[DNDA]]
* [[Diagnostico Neurofuncional Dimensional Auditavel]]
* [[DNDA Trust Object]]
* [[Evidence Manifest]]
* [[Clinical Commit Chain]]
* [[Laudo Auditavel]]
* [[Objeto Clinico Documental]]

## VitalStrata
* [[VitalStrata]]
* [[VitalStrata/SaaS]]
* [[BioDigital Twin]]
* [[Jornada Vital]]
* [[Eventos de Saude]]
* [[SenseTrust SaaS Core]]

## NeuroStrata
* [[NeuroStrata]]
* [[NeuroStrata Trust Layer]]
* [[Neurodireitos]]
* [[NeuroSingularidade]]
* [[RDoC]]
* [[Big Five]]
* [[Triple Network]]
* [[qEEG]]

## BLC
* [[BLC]]
* [[BLC Cadeia Logica]]
* [[Hash Chain]]
* [[Parent Commit]]
* [[Emission Hash]]
* [[Audit Trail]]
* [[Tenant Isolation]]

## SaaS e piloto
* [[SenseTrust SaaS Core]]
* [[Pilot Console]]
* [[Demo Operacional v1.0]]
* [[Piloto Fechado]]
* [[Planos Comerciais]]
* [[Usage Ledger]]
"@

$MocNeuro = @"
# MOC NeuroStrata Trust Layer

[[NeuroStrata]] -> [[DNDA]] -> [[SenseTrust]]

NeuroStrata organiza a matriz neurofuncional e documental. [[Neurodireitos]] orienta minimizacao, protecao e governanca. [[Metadata Only]] e regra publica: [[qEEG]] e outros dados neurofuncionais sao privados e nunca payload publico.

[[DNDA]] e tratado como objeto auditavel por [[DNDA Trust Object]], [[Evidence Manifest]] e [[Clinical Commit Chain]].

$TrailLinks
"@

$MocVital = @"
# MOC VitalStrata SenseTrust

[[VitalStrata]] funciona como camada operacional/SaaS para jornada vital, longitudinalidade e futuro [[BioDigital Twin]]. Relaciona [[Organizacoes]], [[Planos Comerciais]], [[Usage Ledger]], [[SenseTrust SaaS Core]] e [[Piloto Fechado]].

Links principais: [[12_SAAS_CORE_v09]] [[13_PILOT_CONSOLE_v10]] [[14_GRAPH_HARDENING_MOC_v101]]
"@

$MocDnda = @"
# MOC DNDA Trust Object

[[DNDA]] e objeto clinico-documental auditavel. Ele se conecta a [[DNDA Trust Object]], [[Evidence Manifest]], [[Clinical Commit Chain]], [[Document States]], [[Signature Timestamp]] e [[Portal Publico de Verificacao]].

A SenseTrust nao certifica verdade diagnostica absoluta; certifica integridade, proveniencia, rastreabilidade, estado documental, emissao e verificabilidade.
"@

$MocBlc = @"
# MOC BLC Rastreabilidade

[[BLC]] e cadeia logica de confianca. Relaciona [[Hash Chain]], [[Parent Commit]], [[Audit Trail]], [[Emission Hash]] e [[Tenant Isolation]] com a [[SenseTrust Layer]].

O objetivo e manter rastreabilidade, integridade e governanca metadata_only.
"@

$SprintNote = @"
# SenseTrust Obsidian Graph Hardening MOC NeuroStrata VitalStrata DNDA BLC v1.0.1

Ver nota principal: [[14_GRAPH_HARDENING_MOC_v101]]

Links: [[NeuroStrata]] [[VitalStrata]] [[DNDA]] [[BLC]] [[Trust Layer]] [[SenseTrust Layer]] [[Neurodireitos]] [[Metadata Only]] [[Piloto Fechado]]
"@

$LastSync = "# _LAST_SYNC`n`nUltima sincronizacao SenseTrust: v1.0.1 Obsidian Graph Hardening / MOC NeuroStrata VitalStrata DNDA BLC."
$Manifest = "# MEMORY_MANIFEST`n`nSenseTrust v1.0.1 registrado como hardening semantico do grafo Obsidian. MetadataOnly. Sem dado clinico real."
$ManifestJson = "{`"vault_id`":`"$VaultId`",`"module`":`"SenseTrust`",`"latest_note`":`"00_ABRIR_SENSETRUST/14_GRAPH_HARDENING_MOC_v101.md`",`"status`":`"metadata_only`"}"

Write-Utf8Note "00_ABRIR_SENSETRUST/14_GRAPH_HARDENING_MOC_v101.md" $GraphNote
Write-Utf8Note "05_SENSETRUST/SenseTrust Obsidian Graph Hardening MOC NeuroStrata VitalStrata DNDA BLC v1.0.1.md" $SprintNote
Write-Utf8Note "05_SENSETRUST/MOC_SenseTrust.md" $MocSenseTrust
Write-Utf8Note "05_SENSETRUST/MOC_NeuroStrata_Trust_Layer.md" $MocNeuro
Write-Utf8Note "05_SENSETRUST/MOC_VitalStrata_SenseTrust.md" $MocVital
Write-Utf8Note "05_SENSETRUST/MOC_DNDA_Trust_Object.md" $MocDnda
Write-Utf8Note "05_SENSETRUST/MOC_BLC_Rastreabilidade.md" $MocBlc
Write-Utf8Note "00_ABRIR_ULTIMA_NOTA_SENSETRUST.md" $RootNote
Write-Utf8Note "00_MEMORY_INDEX/_LAST_SYNC.md" $LastSync
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.md" $Manifest
Write-Utf8Note "00_MEMORY_INDEX/MEMORY_MANIFEST.json" $ManifestJson

Write-Output "SenseTrust v1.0.1 Obsidian graph hardening written to canonical vault $VaultPath"
