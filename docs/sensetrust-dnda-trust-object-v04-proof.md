# SenseTrust DNDA Trust Object / Evidence Manifest v0.4 Proof

Data: 2026-06-11

## Status

BLOQUEADO para aprovacao final enquanto build, Obsidian real e commit/push nao forem confirmados neste ambiente.

## Arquivos criados

- `src/types/sensetrust/dnda-trust-object.ts`
- `src/services/sensetrust/evidence-manifest-service.ts`
- `src/services/sensetrust/dnda-trust-object-service.ts`
- `src/fixtures/sensetrust/simulated-dnda-trust-object.ts`
- `scripts/test-sensetrust-dnda-trust-object-v04.mjs`
- `docs/sensetrust-dnda-trust-object-v04.md`
- `docs/sensetrust-dnda-trust-object-v04-proof.md`
- `docs/sensetrust-evidence-manifest-contract.md`
- `docs/sensetrust-dnda-trust-object-contract.md`

## Seguranca

- Dados reais: nao usados.
- Nome real: nao usado.
- CPF: nao usado.
- EEG real: nao usado.
- Laudo real: nao usado.
- RLS v0.2: nao alterada.
- QR v0.3: nao alterado, apenas referenciado conceitualmente.

## Testes

Comandos:

```powershell
node --check scripts\test-sensetrust-dnda-trust-object-v04.mjs
node scripts\test-sensetrust-dnda-trust-object-v04.mjs
```

Saidas esperadas:

- `PASS evidence manifest created`
- `PASS evidence manifest hash`
- `PASS dnda trust object created`
- `PASS dnda trust object hash`
- `PASS manifest linked to trust object`
- `PASS public certificate linked`
- `PASS evidence tamper detected`
- `PASS document hash mismatch detected`
- `PASS no sensitive public exposure`
- `PASS simulated only`

## Resultado local

Executado:

```powershell
node --check scripts\test-sensetrust-dnda-trust-object-v04.mjs
node scripts\test-sensetrust-dnda-trust-object-v04.mjs
```

Resultado:

```text
PASS evidence manifest created
PASS evidence manifest hash
PASS dnda trust object created
PASS dnda trust object hash
PASS manifest linked to trust object
PASS public certificate linked
PASS evidence tamper detected
PASS document hash mismatch detected
PASS no sensitive public exposure
PASS simulated only
```

Build:

```powershell
npm.cmd run build
```

Resultado:

```text
'vite' nao e reconhecido como um comando interno ou externo
```

Tentativa de restaurar dependencias:

```powershell
npm.cmd install --legacy-peer-deps --package-lock=false
```

Resultado: timeout apos 120 segundos. Build permanece bloqueado por ambiente/dependencias.

## Obsidian

Notas a atualizar no vault canonico:

- `00_ABRIR_SENSETRUST/06_DNDA_TRUST_OBJECT_v04.md`
- `05_SENSETRUST/SenseTrust DNDA Trust Object Evidence Manifest v0.4.md`
- `00_ABRIR_ULTIMA_NOTA_SENSETRUST.md`
- `05_SENSETRUST/MOC_SenseTrust.md`
- `00_MEMORY_INDEX/_LAST_SYNC.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.json`

Tentativa executada:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\apply-obsidian-dnda-trust-object-v04.ps1
```

Resultado:

```text
Set-Content: O acesso ao caminho ...\00_ABRIR_SENSETRUST\06_DNDA_TRUST_OBJECT_v04.md foi negado.
```

Comando para executar fora do sandbox:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\apply-obsidian-dnda-trust-object-v04.ps1"
```

## Git

Branch planejada:

- `chore/sensetrust-dnda-trust-object-v04`

Commit planejado:

- `feat: add DNDA trust object and evidence manifest`

Tentativa no clone limpo:

```powershell
git switch chore/sensetrust-qr-certificate-v03
git pull
git switch -c chore/sensetrust-dnda-trust-object-v04
```

Resultado:

```text
fatal: Unable to create '.git/index.lock': Permission denied
error: cannot open '.git/FETCH_HEAD': Permission denied
fatal: cannot lock ref 'refs/heads/chore/sensetrust-dnda-trust-object-v04'
```

Comando unico de correcao:

```powershell
cd "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"; git switch chore/sensetrust-qr-certificate-v03; git pull; git switch -c chore/sensetrust-dnda-trust-object-v04; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\types\sensetrust\dnda-trust-object.ts" "src\types\sensetrust\dnda-trust-object.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\services\sensetrust\evidence-manifest-service.ts" "src\services\sensetrust\evidence-manifest-service.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\services\sensetrust\dnda-trust-object-service.ts" "src\services\sensetrust\dnda-trust-object-service.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\fixtures\sensetrust\simulated-dnda-trust-object.ts" "src\fixtures\sensetrust\simulated-dnda-trust-object.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\test-sensetrust-dnda-trust-object-v04.mjs" "scripts\test-sensetrust-dnda-trust-object-v04.mjs"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\apply-obsidian-dnda-trust-object-v04.ps1" "scripts\apply-obsidian-dnda-trust-object-v04.ps1"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-dnda-trust-object-v04.md" "docs\sensetrust-dnda-trust-object-v04.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-dnda-trust-object-v04-proof.md" "docs\sensetrust-dnda-trust-object-v04-proof.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-evidence-manifest-contract.md" "docs\sensetrust-evidence-manifest-contract.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-dnda-trust-object-contract.md" "docs\sensetrust-dnda-trust-object-contract.md"; git add -- src/types/sensetrust/dnda-trust-object.ts src/services/sensetrust/evidence-manifest-service.ts src/services/sensetrust/dnda-trust-object-service.ts src/fixtures/sensetrust/simulated-dnda-trust-object.ts scripts/test-sensetrust-dnda-trust-object-v04.mjs scripts/apply-obsidian-dnda-trust-object-v04.ps1 docs/sensetrust-dnda-trust-object-v04.md docs/sensetrust-dnda-trust-object-v04-proof.md docs/sensetrust-evidence-manifest-contract.md docs/sensetrust-dnda-trust-object-contract.md; git commit -m "feat: add DNDA trust object and evidence manifest"; git push -u origin chore/sensetrust-dnda-trust-object-v04
```
