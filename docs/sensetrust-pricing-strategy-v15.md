# SenseTrust Pricing Strategy v1.5

## 1. Objetivo

A v1.5 transforma a inteligencia de feedback da v1.4 em hipotese comercial testavel, com planos, oferta de entrada e validacao de receita simulada para NeuroStrata, VitalStrata, DNDA, BLC, Trust Layer e SenseTrust Layer.

Ela preserva a base operacional do Pilot CRM v1.3 e os limites de onboarding, termos e consentimentos da v1.2.

## 2. Por que precificar agora

- Sinais de valor percebido.
- Intencao de compra simulada.
- Segmentos priorizados.
- Objecoes mapeadas.
- Necessidade de testar disposicao a pagar.
- Necessidade de definir oferta de entrada.
- Necessidade de evitar venda prematura sem limites.

## 3. O que a v1.5 cria

- Planos simulados.
- Piloto pago simulado.
- Matriz de valor.
- Cenarios de receita.
- Objecoes de preco.
- Ranking de segmentos.
- Score de prontidao de receita.
- Playbook de oferta.

## 4. O que a v1.5 nao cria

- Billing real.
- Cobranca real.
- PIX real.
- Cartao real.
- Boleto real.
- Nota fiscal.
- Assinatura legal real.
- Contrato final.
- Producao clinica real.
- Certificacao diagnostica absoluta.

## 5. Planos sugeridos

- Demo Controlado: R$ 0, ate 10 objetos simulados.
- Professional Pilot: R$ 497 a R$ 997 por mes simulado.
- Clinic Pilot: R$ 1.497 a R$ 2.997 por mes simulado.
- Institutional Pilot: R$ 5.000 a R$ 15.000 por mes simulado.
- Government / Enterprise: contrato customizado simulado.

## 6. Hipoteses de receita

- Conservador: tres pilotos, uma conversao, ticket medio R$ 997 por mes.
- Base: cinco pilotos, duas conversoes, ticket medio R$ 1.497 por mes.
- Acelerado: dez pilotos, quatro conversoes, ticket medio R$ 2.997 por mes.
- Institucional: dois contratos, ticket medio R$ 10.000 por mes.

## 7. Criterios para testar piloto pago

- Aceitacao do metadata_only.
- Compreensao dos limites.
- Feedback positivo.
- Intencao de compra moderada ou alta.
- Risco juridico controlado.
- Capacidade operacional.
- Segmento com dor clara.

## 8. Decisao comercial

Decisoes possiveis: `validate_paid_pilot`, `offer_extended_demo`, `test_professional_plan`, `test_clinic_plan`, `test_institutional_contract`, `adjust_pricing`, `delay_monetization` e `reject_segment`.

Tudo permanece simulated_only, metadata_only, LGPD e Neurodireitos. Billing real nao foi implementado.
