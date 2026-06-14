# SenseTrust Revenue Risk Matrix v1.6

| Risco | Impacto | Probabilidade | Mitigacao | Owner | Gatilho | Status |
| --- | --- | --- | --- | --- | --- | --- |
| cobrar antes da revisao juridica | critico | media | bloquear monetizacao | Legal | contrato sem revisao | blocked |
| cobrar antes da revisao fiscal | critico | media | bloquear cobranca | Fiscal | politica fiscal ausente | blocked |
| emitir invoice real sem estrutura | alto | baixa | manter invoice simulada | Revenue | invoice real solicitada | blocked |
| confundir simulacao com cobranca real | alto | media | labels no_real_billing | Product | linguagem ambigua | review |
| vender promessa proibida | critico | media | playbook comercial | Commercial | promessa diagnostica | blocked |
| usar dado clinico real em piloto pago | critico | baixa | bloquear uso clinico | Privacy | dado clinico solicitado | blocked |
| ativar gateway sem politica de dados | alto | baixa | checklist gateway | Product | vendor ativado | blocked |
| nao definir cancelamento | medio | media | politica v1.6 | Revenue | contrato sem clausula | review |
| nao definir suporte | medio | media | SLA futuro | Product | suporte indefinido | review |
| nao definir responsabilidade | alto | media | clausula juridica | Legal | responsabilidade ausente | blocked |
