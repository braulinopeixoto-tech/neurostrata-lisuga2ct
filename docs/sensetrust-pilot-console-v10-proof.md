# SenseTrust Pilot Console v1.0 Proof

Status: BLOQUEADO

## Local implementation

Created:

- `src/types/sensetrust/pilot-console.ts`
- `src/services/sensetrust/pilot-console-service.ts`
- `src/fixtures/sensetrust/simulated-pilot-console.ts`
- `src/components/sensetrust/PilotConsoleDashboard.tsx`
- `src/components/sensetrust/EndToEndFlowTimeline.tsx`
- `src/components/sensetrust/PilotScenarioSelector.tsx`
- `src/components/sensetrust/PilotReadinessScoreCard.tsx`
- `src/components/sensetrust/PilotAuditReportPanel.tsx`
- `src/pages/SenseTrustPilotConsole.tsx`
- `scripts/test-sensetrust-pilot-console-v10.mjs`
- `scripts/apply-obsidian-pilot-console-v10.ps1`

## Required validation

```powershell
node --check scripts/test-sensetrust-pilot-console-v10.mjs
node scripts/test-sensetrust-pilot-console-v10.mjs
node scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
npm.cmd run build
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-pilot-console-v10.ps1
```

## Status log

Executed:

```powershell
node --check scripts/test-sensetrust-pilot-console-v10.mjs
node scripts/test-sensetrust-pilot-console-v10.mjs
```

Result:

```text
PASS pilot scenario created
PASS default pilot scenarios created
PASS pilot console state created
PASS organization linked
PASS user linked
PASS plan linked
PASS permission check passed
PASS end-to-end flow completed
PASS certificate linked
PASS evidence manifest linked
PASS dnda trust object linked
PASS clinical commit chain linked
PASS document state linked
PASS signature timestamp linked
PASS public verification linked
PASS usage ledger updated
PASS audit report created
PASS readiness score calculated
PASS simulated revoked scenario handled
PASS simulated superseded scenario handled
PASS simulated limit exceeded handled
PASS pilot export payload safe
PASS no clinical data exposed
PASS simulated only
PASS v0.9 regression
PASS v0.8 regression
PASS v0.7 regression
PASS v0.6 regression
PASS v0.5 regression
```

Explicit regressions:

```powershell
node scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
```

Result: PASS for v0.9, v0.8, v0.7, v0.6 and v0.5.

Build:

```powershell
npm.cmd run build
```

Result: BLOQUEADO.

```text
'vite' nao e reconhecido como um comando interno ou externo
```

Dependency restore:

```powershell
npm.cmd install --legacy-peer-deps --package-lock=false
```

Result: BLOQUEADO. The command timed out after 120 seconds.

Obsidian:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-pilot-console-v10.ps1
```

Result: BLOQUEADO. The session was denied write access to the canonical Obsidian vault.

No fallback note was created.

Git:

```powershell
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct branch --show-current
git switch -c chore/sensetrust-pilot-console-v10
```

Result:

```text
current branch: chore/sensetrust-saas-core-v09
fatal: cannot lock ref 'refs/heads/chore/sensetrust-pilot-console-v10': Permission denied
```

The OneDrive workspace was not used for a v1.0 commit because it contains unrelated pending changes and is not the approved clean Git path.
