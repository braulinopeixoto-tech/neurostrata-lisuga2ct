# SenseTrust SaaS Core v0.9 Proof

Status: BLOQUEADO

## Local implementation

Created:

- `src/types/sensetrust/saas-core.ts`
- `src/services/sensetrust/saas-core-service.ts`
- `src/fixtures/sensetrust/simulated-saas-core.ts`
- `src/components/sensetrust/SaaSCoreDashboard.tsx`
- `src/components/sensetrust/PlanLimitCard.tsx`
- `src/components/sensetrust/RoleAccessMatrix.tsx`
- `src/components/sensetrust/UsageLedgerPanel.tsx`
- `scripts/test-sensetrust-saas-core-v09.mjs`
- `scripts/apply-obsidian-saas-core-v09.ps1`

## Required validation

```powershell
node --check scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
npm.cmd run build
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-saas-core-v09.ps1
```

## Expected signals

- PASS organization created
- PASS simulated users created
- PASS owner has full permissions
- PASS admin billing blocked without role
- PASS issuer can issue certificate
- PASS auditor cannot mutate document
- PASS public verifier portal only
- PASS default plans created
- PASS demo plan limits valid
- PASS professional plan limits valid
- PASS clinic plan limits valid
- PASS enterprise plan features valid
- PASS government plan contract mode valid
- PASS usage ledger created
- PASS certificate usage counted
- PASS public verification usage counted
- PASS plan limit exceeded detected
- PASS simulated plan upgrade allowed
- PASS tenant isolation enforced
- PASS commercial public payload safe
- PASS clinical data hidden
- PASS simulated only
- PASS v0.8 regression
- PASS v0.7 regression
- PASS v0.6 regression
- PASS v0.5 regression

## Status log

Executed:

```powershell
node --check scripts/test-sensetrust-saas-core-v09.mjs
```

Result: PASS, no syntax errors.

Executed:

```powershell
node scripts/test-sensetrust-saas-core-v09.mjs
```

Result:

```text
PASS organization created
PASS simulated users created
PASS owner has full permissions
PASS admin billing blocked without role
PASS issuer can issue certificate
PASS auditor cannot mutate document
PASS public verifier portal only
PASS default plans created
PASS demo plan limits valid
PASS professional plan limits valid
PASS clinic plan limits valid
PASS enterprise plan features valid
PASS government plan contract mode valid
PASS usage ledger created
PASS certificate usage counted
PASS public verification usage counted
PASS plan limit exceeded detected
PASS simulated plan upgrade allowed
PASS tenant isolation enforced
PASS commercial public payload safe
PASS clinical data hidden
PASS simulated only
PASS v0.8 regression
PASS v0.7 regression
PASS v0.6 regression
PASS v0.5 regression
```

Explicit regressions:

```powershell
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
```

Result: PASS for v0.8, v0.7, v0.6 and v0.5.

Build:

```powershell
npm.cmd run build
```

Result: BLOQUEADO.

```text
'vite' nao e reconhecido como um comando interno ou externo
```

Dependency restore attempt:

```powershell
npm.cmd install --legacy-peer-deps --package-lock=false
```

Result: BLOQUEADO. The command timed out after 120 seconds.

Build retry:

```powershell
npm.cmd run build
```

Result: BLOQUEADO. Vite remained unavailable.

Obsidian:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-saas-core-v09.ps1
```

Result: BLOQUEADO. The session was denied write access to the canonical Obsidian vault:

```text
Access denied writing C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS\05_SENSETRUST\SenseTrust SaaS Core Organizacoes Multiusuario Plano Comercial v0.9.md
```

No fallback note was created.

## Final criteria

Passed locally:

- simulated organization created;
- simulated users created;
- owner has full permissions;
- admin billing blocked without billing_manager;
- issuer can issue certificate;
- auditor cannot mutate document;
- public verifier portal-only;
- default plans created;
- demo, professional, clinic, enterprise and government plans validated;
- usage ledger created;
- certificate and public verification usage counted;
- plan limit exceeded detected;
- simulated plan upgrade allowed;
- tenant isolation enforced;
- commercial public payload safe;
- clinical data hidden;
- simulated data only;
- regressions v0.8, v0.7, v0.6 and v0.5 passed.

Blocked:

- build, because Vite is unavailable and dependency install timed out;
- Obsidian write, because the canonical vault path is outside writable permissions for this session;
- Git commit/push, because the clean clone denied creation of the v0.9 branch ref.

Git check:

```powershell
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct status --short
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct branch --show-current
git switch -c chore/sensetrust-saas-core-v09
```

Result in clean clone:

```text
current branch: chore/sensetrust-public-verification-portal-v08
fatal: cannot lock ref 'refs/heads/chore/sensetrust-saas-core-v09': Permission denied
```

The OneDrive workspace was not used for a v0.9 commit because it contains unrelated pending changes and is not the approved clean Git path.
