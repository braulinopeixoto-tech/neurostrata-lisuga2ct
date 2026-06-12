# SenseTrust Document States v0.6 Proof

Status: BLOQUEADO

## Local implementation

Created:

- `src/types/sensetrust/document-state.ts`
- `src/services/sensetrust/document-state-service.ts`
- `src/fixtures/sensetrust/simulated-document-state.ts`
- `src/components/sensetrust/DocumentStateBadge.tsx`
- `src/components/sensetrust/DocumentStateTimeline.tsx`
- `scripts/test-sensetrust-document-states-v06.mjs`
- `scripts/apply-obsidian-document-states-v06.ps1`

Updated:

- `src/types/sensetrust/clinical-commit-chain.ts`

## Required validation

The proof must be finalized after running:

```powershell
node --check scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-document-states-v06.mjs
npm.cmd run build
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-document-states-v06.ps1
```

## Expected test signals

- PASS active document state created
- PASS signed document activated
- PASS amendment creates new record
- PASS amendment creates clinical commit
- PASS revocation creates new record
- PASS revocation creates clinical commit
- PASS expiration preserves history
- PASS supersession links replacement document
- PASS revoked blocks reactivation
- PASS signed blocks destructive edit
- PASS invalid transition detected
- PASS state tamper detected
- PASS public payload safe
- PASS private reason hidden
- PASS terminal states respected
- PASS simulated only

## Status log

Executed from workspace:

```powershell
node --check scripts/test-sensetrust-document-states-v06.mjs
```

Result: PASS, no syntax errors.

Executed:

```powershell
node scripts/test-sensetrust-document-states-v06.mjs
```

Result:

```text
PASS active document state created
PASS signed document activated
PASS amendment creates new record
PASS amendment creates clinical commit
PASS revocation creates new record
PASS revocation creates clinical commit
PASS expiration preserves history
PASS supersession links replacement document
PASS revoked blocks reactivation
PASS signed blocks destructive edit
PASS invalid transition detected
PASS state tamper detected
PASS public payload safe
PASS private reason hidden
PASS terminal states respected
PASS simulated only
```

Executed:

```powershell
npm.cmd run build
```

Result: BLOQUEADO. The environment returned:

```text
'vite' nao e reconhecido como um comando interno ou externo
```

Executed:

```powershell
npm.cmd install --legacy-peer-deps --package-lock=false
```

Result: BLOQUEADO. The dependency install timed out after 120 seconds.

Executed again:

```powershell
npm.cmd run build
```

Result: BLOQUEADO. Vite remained unavailable.

Regression check:

```powershell
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
```

Result: PASS. The v0.5 simulated Clinical Commit Chain remained compatible after adding v0.6 commit types.

Executed:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-document-states-v06.ps1
```

Result: BLOQUEADO. The session was denied write access to the canonical Obsidian vault:

```text
Access denied writing C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS\05_SENSETRUST\SenseTrust Revogacao Adendo Estados Documentais v0.6.md
```

No fallback note was created.

## Final criteria

Passed locally:

- active document state created;
- signed document activated;
- amendment creates new record and clinical commit;
- revocation creates new record and clinical commit;
- expiration preserves history;
- supersedence links replacement document;
- revoked blocks reactivation;
- signed/active blocks destructive edit;
- invalid transition detected;
- status tampering detected;
- public payload safe;
- private reason hidden;
- terminal states respected;
- simulated data only.

Blocked:

- build, because Vite is unavailable and dependency install timed out;
- Obsidian write, because the canonical vault path is outside writable permissions for this session;
- Git commit/push, because the clean clone denied creation of the v0.6 branch ref.

Git check:

```powershell
git status --short
git branch --show-current
git switch -c chore/sensetrust-document-states-v06
```

Result in clean clone `C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct`:

```text
current branch: chore/sensetrust-clinical-commit-chain-v05
fatal: cannot lock ref 'refs/heads/chore/sensetrust-document-states-v06': Permission denied
```

Final Git status check was also blocked by Git ownership protection for the sandbox user:

```text
fatal: detected dubious ownership in repository at 'C:/Users/User/Documents/NeuroStrata_Git/neurostrata-lisuga2ct'
To add an exception for this directory, call:
git config --global --add safe.directory C:/Users/User/Documents/NeuroStrata_Git/neurostrata-lisuga2ct
```

The OneDrive workspace was not used for a v0.6 commit because it contains unrelated pending changes and is not the approved clean Git path.
