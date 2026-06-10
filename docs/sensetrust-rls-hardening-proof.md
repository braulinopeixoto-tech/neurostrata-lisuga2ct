# SenseTrust RLS Hardening Proof v0.2

Data: 2026-06-10

## Status executivo

Status: BLOQUEADO PARA APROVACAO FINAL.

Os artefatos RLS foram preparados no workspace atual. O clone limpo fora do workspace bloqueou escrita por politica do ambiente, entao nao foi possivel concluir branch/commit/push a partir daqui.

## Artefatos criados

- `supabase/migrations/20260607100000_sensetrust_rls_hardening.sql`
- `docs/sensetrust-rls-hardening-v02.md`
- `docs/manual-supabase-apply-rls-v02.sql`
- `docs/supabase-rls-validation-queries.sql`
- `docs/sensetrust-rls-hardening-proof.md`
- `scripts/sync-obsidian-memory-layer.mjs` atualizado para apontar a nota raiz para `[[SenseTrust RLS Hardening v0.2]]`.

## Revisao local

- Migration nao insere dado clinico real.
- Migration nao cria policy `anon` em `verification_tokens`.
- Migration cria `verify_public_certificate(p_token text)` com `security definer`.
- Migration habilita RLS nas tabelas SenseTrust.
- Migration remove policies antigas antes de recriar as policies restritivas.
- Migration mantem `audit_events` append-only.
- Migration bloqueia edicao direta de `report_versions` assinadas.
- `node --check scripts\sync-obsidian-memory-layer.mjs` passou sem erro.
- Inspecao textual nao encontrou `using (true)` na migration RLS.

## Validacao Obsidian tentada

Comando executado:

```powershell
node scripts\sync-obsidian-memory-layer.mjs
```

Resultado:

```text
Error: EPERM: operation not permitted, open 'C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS\00_MEMORY_INDEX\MOC_NeuroStrata.md'
```

A nota raiz nao pode ser atualizada nesta execucao. Quando o sync rodar com permissao no vault canonico, `00_ABRIR_ULTIMA_NOTA_SENSETRUST.md` passara a apontar para `[[SenseTrust RLS Hardening v0.2]]`.

## Bloqueios

### Clone limpo

O clone exigido pela sprint fica fora do workspace permitido:

- `C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct`

Foi possivel ler o estado do clone, mas escrita foi bloqueada ao tentar modificar arquivos fora do projeto atual.

### Obsidian

A atualizacao do vault Obsidian real depende de permissao de escrita em:

- `C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS`

Como a sprint anterior mostrou bloqueio `EPERM`, esta prova nao declara Obsidian atualizado nesta execucao.

### Supabase remoto

Nao foi executado `supabase db push`, por regra da sprint. A aplicacao deve ser feita via SQL Editor usando:

- `docs/manual-supabase-apply-rls-v02.sql`

## Comando unico de correcao

Executar em PowerShell fora do sandbox atual:

```powershell
cd "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"; node scripts\sync-obsidian-memory-layer.mjs; cd "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"; git switch chore/obsidian-root-note-automation; git pull; git switch -c chore/sensetrust-rls-hardening-v02; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\supabase\migrations\20260607100000_sensetrust_rls_hardening.sql" "supabase\migrations\20260607100000_sensetrust_rls_hardening.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-rls-hardening-v02.md" "docs\sensetrust-rls-hardening-v02.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\manual-supabase-apply-rls-v02.sql" "docs\manual-supabase-apply-rls-v02.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\supabase-rls-validation-queries.sql" "docs\supabase-rls-validation-queries.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-rls-hardening-proof.md" "docs\sensetrust-rls-hardening-proof.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\sync-obsidian-memory-layer.mjs" "scripts\sync-obsidian-memory-layer.mjs"; git add -- supabase/migrations/20260607100000_sensetrust_rls_hardening.sql docs/sensetrust-rls-hardening-v02.md docs/manual-supabase-apply-rls-v02.sql docs/supabase-rls-validation-queries.sql docs/sensetrust-rls-hardening-proof.md scripts/sync-obsidian-memory-layer.mjs; git commit -m "chore: harden SenseTrust RLS policies"; git push -u origin chore/sensetrust-rls-hardening-v02; git status --short
```

## Decisao

SenseTrust RLS Hardening v0.2: BLOQUEADO ate aplicacao no clone limpo, atualizacao Obsidian real, commit seletivo, push remoto e validacao SQL Editor.

Nao avancar para QR PDF. Nao declarar uso clinico real liberado.
