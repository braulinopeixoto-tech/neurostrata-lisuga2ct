# SenseTrust RLS Hardening Proof v0.2

Data: 2026-06-10

## Status executivo

Status: APROVADO NO SUPABASE REMOTO.

Resultado informado para o fechamento final: SenseTrust RLS v0.2 aplicada e validada no Supabase com checklist final 7/7 PASS.

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

## Revokes e grants finais registrados

Registrado explicitamente na migration e no SQL manual:

```sql
revoke all privileges on table public.verification_tokens from anon;
revoke all privileges on table public.verification_tokens from public;
revoke all on function public.verify_public_certificate(text) from public;
grant execute on function public.verify_public_certificate(text) to anon;
grant execute on function public.verify_public_certificate(text) to authenticated;
```

## Checklist final Supabase

| Item | Status |
|---|---|
| RLS habilitado nas tabelas criticas SenseTrust | PASS |
| Policies permissivas `using(true)` removidas | PASS |
| `anon` sem select direto em `verification_tokens` | PASS |
| `public` sem select direto em `verification_tokens` | PASS |
| `verify_public_certificate(text)` executavel por `anon` e `authenticated` | PASS |
| `audit_events` protegido como append-only | PASS |
| `report_versions signed` protegido contra edicao direta | PASS |

Resultado: checklist final 7/7 PASS.

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

Foi possivel ler o estado do clone. Nesta execucao, escrita nos arquivos do clone e escrita em `.git` foram bloqueadas:

```text
Copy-Item: O acesso ao caminho foi negado.
fatal: Unable to create '.git/index.lock': Permission denied
Failed to connect to github.com port 443
```

Branch observada no clone:

- `chore/sensetrust-rls-v02-final-proof`

### Obsidian

A atualizacao do vault Obsidian real depende de permissao de escrita em:

- `C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS`

Como a sprint anterior mostrou bloqueio `EPERM`, esta prova nao declara Obsidian atualizado nesta execucao.

### Supabase remoto

Aplicacao e validacao remotas declaradas como concluidas para esta prova final.

SQL manual versionado:

- `docs/manual-supabase-apply-rls-v02.sql`

Queries de validacao versionadas:

- `docs/supabase-rls-validation-queries.sql`

## Comando unico de correcao

Executar em PowerShell fora do sandbox atual:

```powershell
cd "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01"; node scripts\sync-obsidian-memory-layer.mjs; cd "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"; git switch chore/sensetrust-rls-v02-final-proof; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\supabase\migrations\20260607100000_sensetrust_rls_hardening.sql" "supabase\migrations\20260607100000_sensetrust_rls_hardening.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\manual-supabase-apply-rls-v02.sql" "docs\manual-supabase-apply-rls-v02.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\supabase-rls-validation-queries.sql" "docs\supabase-rls-validation-queries.sql"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-rls-hardening-proof.md" "docs\sensetrust-rls-hardening-proof.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\sync-obsidian-memory-layer.mjs" "scripts\sync-obsidian-memory-layer.mjs"; git add -- supabase/migrations/20260607100000_sensetrust_rls_hardening.sql docs/manual-supabase-apply-rls-v02.sql docs/supabase-rls-validation-queries.sql docs/sensetrust-rls-hardening-proof.md scripts/sync-obsidian-memory-layer.mjs; git commit -m "chore: record final SenseTrust RLS validation proof"; git push; git status --short
```

## Decisao

SenseTrust RLS Hardening v0.2: APROVADO quanto a aplicacao e validacao Supabase, com checklist final 7/7 PASS.

Pendencias fora deste patch:

- registrar commit seletivo e push na branch `chore/sensetrust-rls-v02-final-proof`;
- atualizar Obsidian real se o ambiente local permitir escrita no vault;
- QR PDF permanece nao iniciado;
- uso clinico real permanece bloqueado ate governanca final, testes de permissao por papel/caso e liberacao formal.
