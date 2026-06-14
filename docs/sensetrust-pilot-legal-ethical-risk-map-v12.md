# SenseTrust Pilot Legal Ethical Risk Map v1.2

| Risco | Descricao | Impacto | Probabilidade | Mitigacao | Owner | Gatilho de interrupcao |
|---|---|---:|---:|---|---|---|
| uso indevido com paciente real | Participante tenta usar paciente real | Alto | Media | Termos, treinamento e bloqueio de escopo | SenseTrust Owner | Qualquer dado identificavel |
| insercao acidental de dado clinico | Conteudo sensivel entra em feedback ou demo | Alto | Media | metadata_only e checklist | Responsavel institucional | Evidencia de dado sensivel |
| interpretacao como certificacao diagnostica | Confusao entre integridade e verdade diagnostica absoluta | Alto | Media | Disclaimers e roteiro | Produto | Promessa indevida |
| interpretacao como assinatura legal | Confusao com ICP-Brasil/Gov.br | Medio | Media | Aviso de sem assinatura legal real | Juridico/revisor | Assinatura formal sem revisao |
| expectativa de validade juridica plena | Documento tratado como contrato final | Alto | Media | Revisao juridica obrigatoria | Juridico/revisor | Uso formal sem advogado |
| exposicao publica indevida | Portal recebe dado sensivel | Alto | Baixa | Campo metadata_only e teste | Suporte tecnico | Vazamento ou campo sensivel |
| uso fora do escopo | Participante usa em producao clinica | Alto | Media | Suspensao imediata | SenseTrust Owner | Uso real nao autorizado |
| armazenamento inadequado de feedback | Feedback contem dados sensiveis | Medio | Media | Orientacao e revisao | Responsavel institucional | Feedback sensivel |
| conflito de responsabilidade profissional | Participante transfere decisao a SenseTrust | Alto | Baixa | Clausula de nao substituicao clinica | Produto/Juridico | Uso como decisao final |
