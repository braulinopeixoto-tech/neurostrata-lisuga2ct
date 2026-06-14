# SenseTrust Simulated Revenue Ledger v1.6

## Definicao

Ledger de receita simulada e um registro operacional de hipotese de faturamento, sem cobranca real e sem reconhecimento contabil.

## Diferenca

Ledger simulado nao e faturamento real, invoice real, nota fiscal, boleto, PIX, cartao ou gateway.

## Campos obrigatorios

Organizacao, plano, valor simulado, periodo, status simulado, vencimento simulado e flags explicitas de nao cobranca real.

## Status simulados

`not_applicable`, `simulated_pending`, `simulated_paid`, `simulated_overdue`, `simulated_cancelled`, `simulated_refunded` e `real_payment_not_implemented`.

## Exemplos

As cinco organizacoes simuladas da v1.3 aparecem no ledger v1.6 com metadata_only e simulated_only.
