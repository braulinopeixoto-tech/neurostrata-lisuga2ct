# SenseTrust Pilot CRM v1.3

Status: implementado localmente para uso demonstrativo e governanca de pilotos fechados.

## Objetivo

SenseTrust Pilot CRM v1.3 organiza o pipeline de organizacoes piloto para NeuroStrata, VitalStrata, DNDA, BLC e Trust Layer sem introduzir dado clinico real, sem prontuario, sem biomarcadores reais e sem billing real.

Esta sprint conecta a maturidade das entregas anteriores:

- v1.0: SenseTrust Pilot Console e fluxo operacional end-to-end.
- v1.1: Pilot Package comercial tecnico.
- v1.2: Onboarding, termos, consentimentos e contrato de piloto.

## Escopo

O CRM v1.3 cobre:

- cadastro simulado de organizacoes;
- estagio de pipeline;
- status documental de onboarding, termos, consentimento, contrato, politica de dados e RACI;
- prontidao operacional;
- riscos nao clinicos;
- decisao go/no-go;
- timeline operacional de atividades;
- exportacao segura `metadata_only`.

## Limites

Nao ha dado clinico real. Nao ha CPF, nome de paciente, anamnese, laudo, exame, qEEG, biomarcador, medicamento ou relatorio DNDA real.

Nao ha billing real, gateway de pagamento, assinatura juridica real, ICP-Brasil ou Gov.br. A camada e demonstrativa e preparada para governanca futura.

## Organizações simuladas

- ORG-PILOT-SIM-001: Clinica Neurofuncional Alfa.
- ORG-PILOT-SIM-002: Grupo Juridico Beta.
- ORG-PILOT-SIM-003: Secretaria Municipal Gama.
- ORG-PILOT-SIM-004: Equipe Multiprofissional Delta.
- ORG-PILOT-SIM-005: Projeto VitalStrata Piloto Epsilon.

## Regra de confianca

SenseTrust certifica processo, integridade, trilha, estado documental, verificabilidade e governanca operacional. Nao certifica verdade diagnostica absoluta.
