# NeuroStrata RAG Report

## Objetivo

Conectar o gerador de relatorio rapido e o painel de IA do laudo a uma Edge Function Supabase que:

1. vetoriza a entrada com `text-embedding-3-small`;
2. recupera notas governadas ja vetorizadas no Supabase;
3. gera um rascunho DNDA com `gpt-5.4-mini`;
4. salva o relatorio como `draft_for_human_review`.

## Secrets necessarios

No Supabase, confirme:

- `OPENAI_KEY`: chave da OpenAI.
- `SUPABASE_SERVICE_ROLE_KEY`: geralmente ja disponivel nas Edge Functions do Supabase.
- `SUPABASE_URL`: geralmente ja disponivel nas Edge Functions do Supabase.

## Ordem de implantacao

1. Aplicar a migration:

```bash
supabase db push
```

2. Publicar a Edge Function:

```bash
supabase functions deploy generate-dnda-report
```

3. Vetorizar as notas do Obsidian por processo local fora deste repositorio.

A sincronizacao do vault Obsidian nao e versionada neste projeto porque envolve caminho local, politica de privacidade e controle direto da base de conhecimento.

## Guardrails clinicos

- O resultado sempre nasce como rascunho tecnico assistido por IA.
- O frontend nunca recebe a chave da OpenAI.
- O modelo nao deve inventar biomarcadores, coordenadas, escalas ou diagnosticos.
- O relatorio salva fontes recuperadas, prompt version, modelo e hash.
- A revisao profissional continua obrigatoria.

## Modelo padrao

- Embeddings: `text-embedding-3-small`.
- Relatorio: `gpt-5.4-mini`.
- Reasoning: `medium`.

Para casos muito complexos, a Edge Function aceita sobrescrever `model` e `reasoningEffort` no corpo da chamada.
