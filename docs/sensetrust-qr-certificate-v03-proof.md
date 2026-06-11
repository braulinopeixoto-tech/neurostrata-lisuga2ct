# SenseTrust QR PDF / Certificado Publico Seguro v0.3 Proof

Data: 2026-06-11

## Status

BLOQUEADO para aprovacao final enquanto commit/push, build local e atualizacao Obsidian real nao forem confirmados neste ambiente.

## Entregas tecnicas

- `src/services/sensetrust/pdf-hash-service.ts`
- `src/services/sensetrust/public-certificate-service.ts`
- `src/services/sensetrust/qr-verification-service.ts`
- `src/components/sensetrust/PublicCertificateVerification.tsx`
- `src/fixtures/sensetrust/simulated-certificate.ts`
- `scripts/test-sensetrust-qr-certificate-v03.mjs`
- `docs/sensetrust-qr-certificate-v03.md`
- `docs/sensetrust-qr-certificate-v03-proof.md`
- `docs/sensetrust-public-verification-contract.md`
- `scripts/apply-obsidian-qr-certificate-v03.ps1`

## Seguranca

- Dados usados: simulados.
- Nome de paciente real: nao usado.
- Dados clinicos reais: nao usados.
- Pagina publica: exibe apenas metadados seguros.
- RLS v0.2: nao alterada.
- Migration RLS antiga: nao alterada.

## Teste esperado

```powershell
node scripts\test-sensetrust-qr-certificate-v03.mjs
```

Saidas esperadas:

- `PASS valid token`
- `PASS invalid token`
- `PASS no sensitive fields`
- `PASS hash mismatch`
- `PASS revoked certificate`

## Resultado local

Comando executado:

```powershell
node --check scripts\test-sensetrust-qr-certificate-v03.mjs
node scripts\test-sensetrust-qr-certificate-v03.mjs
```

Resultado:

```text
PASS valid token
PASS invalid token
PASS no sensitive fields
PASS hash mismatch
PASS revoked certificate
```

Build/typecheck:

```powershell
npm.cmd run build
```

Resultado:

```text
'vite' nao e reconhecido como um comando interno ou externo
```

Limitacao: dependencias/binarios locais nao estao disponiveis neste workspace. Nao ha script `typecheck` dedicado em `package.json`.

## Obsidian

Atualizar perfil NATE SenseTrust:

- `00_ABRIR_SENSETRUST/04_PROXIMA_SPRINT_QR_CERTIFICADO.md`
- `00_ABRIR_SENSETRUST/05_QR_CERTIFICADO_v03.md`
- `05_SENSETRUST/SenseTrust QR PDF Certificado Publico Seguro v0.3.md`
- `00_ABRIR_ULTIMA_NOTA_SENSETRUST.md`
- `05_SENSETRUST/MOC_SenseTrust.md`
- `00_MEMORY_INDEX/_LAST_SYNC.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.json`

Tentativa direta no vault falhou por permissao:

```text
Set-Content/Add-Content: O acesso ao caminho foi negado.
```

Script de correcao preparado:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\apply-obsidian-qr-certificate-v03.ps1"
```

## Proxima validacao

Confirmar no clone limpo:

```powershell
git status --short
git push -u origin chore/sensetrust-qr-certificate-v03
```

## Git

Tentativa no clone limpo:

```powershell
git switch chore/sensetrust-rls-hardening-v02
git pull
git switch -c chore/sensetrust-qr-certificate-v03
```

Resultado:

```text
fatal: Unable to create '.git/index.lock': Permission denied
error: cannot open '.git/FETCH_HEAD': Permission denied
fatal: cannot lock ref 'refs/heads/chore/sensetrust-qr-certificate-v03'
```

Comando unico para concluir fora do bloqueio:

```powershell
cd "C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct"; git switch chore/sensetrust-rls-hardening-v02; git pull; git switch -c chore/sensetrust-qr-certificate-v03; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\services\sensetrust\pdf-hash-service.ts" "src\services\sensetrust\pdf-hash-service.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\services\sensetrust\public-certificate-service.ts" "src\services\sensetrust\public-certificate-service.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\services\sensetrust\qr-verification-service.ts" "src\services\sensetrust\qr-verification-service.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\components\sensetrust\PublicCertificateVerification.tsx" "src\components\sensetrust\PublicCertificateVerification.tsx"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\fixtures\sensetrust\simulated-certificate.ts" "src\fixtures\sensetrust\simulated-certificate.ts"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\src\pages\VerifyDocument.tsx" "src\pages\VerifyDocument.tsx"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\test-sensetrust-qr-certificate-v03.mjs" "scripts\test-sensetrust-qr-certificate-v03.mjs"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\scripts\apply-obsidian-qr-certificate-v03.ps1" "scripts\apply-obsidian-qr-certificate-v03.ps1"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-qr-certificate-v03.md" "docs\sensetrust-qr-certificate-v03.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-qr-certificate-v03-proof.md" "docs\sensetrust-qr-certificate-v03-proof.md"; copy "C:\Users\User\OneDrive\Documentos\NeuroSTrata Skip P01\docs\sensetrust-public-verification-contract.md" "docs\sensetrust-public-verification-contract.md"; git add -- src/services/sensetrust/pdf-hash-service.ts src/services/sensetrust/public-certificate-service.ts src/services/sensetrust/qr-verification-service.ts src/components/sensetrust/PublicCertificateVerification.tsx src/fixtures/sensetrust/simulated-certificate.ts src/pages/VerifyDocument.tsx scripts/test-sensetrust-qr-certificate-v03.mjs scripts/apply-obsidian-qr-certificate-v03.ps1 docs/sensetrust-qr-certificate-v03.md docs/sensetrust-qr-certificate-v03-proof.md docs/sensetrust-public-verification-contract.md; git commit -m "feat: add SenseTrust public QR certificate verification"; git push -u origin chore/sensetrust-qr-certificate-v03
```
