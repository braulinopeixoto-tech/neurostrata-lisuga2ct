# SenseTrust Pilot CRM Governance v1.3

Status: governanca operacional simulada.

## Principios

1. O CRM registra apenas metadados comerciais e operacionais.
2. O CRM nao armazena dado clinico real.
3. Toda organizacao piloto deve manter `simulated_only: true` nesta fase.
4. Exportacoes devem usar `metadata_only`.
5. Decisoes go/no-go nao substituem revisao humana.
6. Riscos registrados sao comerciais, juridicos, operacionais ou de governanca.
7. O CRM referencia v1.2, v1.1 e v1.0 sem alterar seus contratos.

## Controle de acesso futuro

Quando houver banco real, a leitura deve ser restrita por organizacao, papel e escopo. O portal publico nao deve exibir dados de contato ou informacao sensivel.

## Papéis previstos

- SenseTrust Owner: opera o pipeline.
- Commercial Reviewer: revisa oportunidade e proposta.
- Legal Reviewer: revisa termo, consentimento, contrato e politica.
- Pilot Sponsor: confirma prioridade e decisao.
- Auditor: consulta trilha de atividades e evidencias operacionais.

## Estados documentais

Os status documentais seguem o vocabulário do piloto: `not_sent`, `sent`, `viewed`, `pending_signature`, `accepted`, `rejected` e `needs_legal_review`.

## Governanca LGPD e neurodireitos

O CRM v1.3 aplica minimizacao, finalidade, segregacao de dados e exposicao apenas de metadados. A protecao de neurodireitos e preservada porque nenhum dado neurofuncional individual e coletado nesta etapa.
