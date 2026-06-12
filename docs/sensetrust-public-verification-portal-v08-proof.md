# SenseTrust Public Verification Portal v0.8 Proof

Status: BLOQUEADO

## Local implementation

Created:

- `src/types/sensetrust/public-verification-portal.ts`
- `src/services/sensetrust/public-verification-portal-service.ts`
- `src/fixtures/sensetrust/simulated-public-verification-portal.ts`
- `src/components/sensetrust/ExpandedPublicVerificationPortal.tsx`
- `src/components/sensetrust/PublicVerificationStatusCard.tsx`
- `scripts/test-sensetrust-public-verification-portal-v08.mjs`
- `scripts/apply-obsidian-public-verification-portal-v08.ps1`

Updated:

- `src/pages/VerifyDocument.tsx`

## Required validation

```powershell
node --check scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
npm.cmd run build
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-public-verification-portal-v08.ps1
```

## Expected signals

- PASS public portal active payload created
- PASS active token returns verified_active
- PASS amended token returns verified_amended
- PASS revoked token returns verified_revoked
- PASS expired token returns verified_expired
- PASS superseded token returns verified_superseded
- PASS invalid integrity token returns invalid_integrity
- PASS invalid token returns invalid_token
- PASS signature timestamp metadata safe
- PASS emission hash partial only
- PASS document hash partial only
- PASS certificate qr metadata safe
- PASS public message does not certify diagnostic truth
- PASS private revocation reason hidden
- PASS clinical data hidden
- PASS public payload safety check
- PASS public payload tamper detected
- PASS simulated only
- PASS v0.7 regression
- PASS v0.6 regression
- PASS v0.5 regression

## Status log

Executed:

```powershell
node --check scripts/test-sensetrust-public-verification-portal-v08.mjs
```

Result: PASS, no syntax errors.

Executed:

```powershell
node scripts/test-sensetrust-public-verification-portal-v08.mjs
```

Result:

```text
PASS public portal active payload created
PASS active token returns verified_active
PASS amended token returns verified_amended
PASS revoked token returns verified_revoked
PASS expired token returns verified_expired
PASS superseded token returns verified_superseded
PASS invalid integrity token returns invalid_integrity
PASS invalid token returns invalid_token
PASS signature timestamp metadata safe
PASS emission hash partial only
PASS document hash partial only
PASS certificate qr metadata safe
PASS public message does not certify diagnostic truth
PASS private revocation reason hidden
PASS clinical data hidden
PASS public payload safety check
PASS public payload tamper detected
PASS simulated only
PASS v0.7 regression
PASS v0.6 regression
PASS v0.5 regression
```

Explicit regressions:

```powershell
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
```

Result: PASS for v0.7, v0.6 and v0.5.

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
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-public-verification-portal-v08.ps1
```

Result: BLOQUEADO. The session was denied write access to the canonical Obsidian vault:

```text
Access denied writing C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS\05_SENSETRUST\SenseTrust Verificacao Publica Expandida Portal Consulta v0.8.md
```

No fallback note was created.

## Final criteria

Passed locally:

- portal public active payload created;
- active token returns `verified_active`;
- amended token returns `verified_amended`;
- revoked token returns `verified_revoked`;
- expired token returns `verified_expired`;
- superseded token returns `verified_superseded`;
- invalid integrity token returns `invalid_integrity`;
- invalid token returns `invalid_token`;
- signature and timestamp appear only as safe metadata;
- emission hash and document hash appear only partial;
- certificate and QR/token metadata are safe;
- public message does not certify diagnostic truth;
- private revocation reason hidden;
- clinical data hidden;
- public payload safety check passed;
- tampered public payload detected;
- simulated data only;
- v0.7 regression passed;
- v0.6 regression passed;
- v0.5 regression passed.

Blocked:

- build, because Vite is unavailable and dependency install timed out;
- Obsidian write, because the canonical vault path is outside writable permissions for this session;
- Git commit/push, because the clean clone denied creation of the v0.8 branch ref.

Git check:

```powershell
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct status --short
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct branch --show-current
git switch -c chore/sensetrust-public-verification-portal-v08
```

Result in clean clone:

```text
current branch: chore/sensetrust-signature-timestamp-v07
fatal: cannot lock ref 'refs/heads/chore/sensetrust-public-verification-portal-v08': Permission denied
```

The OneDrive workspace was not used for a v0.8 commit because it contains unrelated pending changes and is not the approved clean Git path.
