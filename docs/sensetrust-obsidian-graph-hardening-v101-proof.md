# SenseTrust Obsidian Graph Hardening v1.0.1 Proof

Status: BLOQUEADO

## Repository artifacts

Created:

- `scripts/apply-obsidian-graph-hardening-v101.ps1`
- `scripts/test-sensetrust-obsidian-graph-hardening-v101.mjs`
- `docs/sensetrust-obsidian-graph-hardening-v101.md`
- `docs/sensetrust-obsidian-graph-hardening-v101-proof.md`

## Obsidian notes targeted

- `00_ABRIR_SENSETRUST/14_GRAPH_HARDENING_MOC_v101.md`
- `05_SENSETRUST/SenseTrust Obsidian Graph Hardening MOC NeuroStrata VitalStrata DNDA BLC v1.0.1.md`
- `05_SENSETRUST/MOC_SenseTrust.md`
- `05_SENSETRUST/MOC_NeuroStrata_Trust_Layer.md`
- `05_SENSETRUST/MOC_VitalStrata_SenseTrust.md`
- `05_SENSETRUST/MOC_DNDA_Trust_Object.md`
- `05_SENSETRUST/MOC_BLC_Rastreabilidade.md`
- `00_ABRIR_ULTIMA_NOTA_SENSETRUST.md`
- `00_MEMORY_INDEX/_LAST_SYNC.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.md`
- `00_MEMORY_INDEX/MEMORY_MANIFEST.json`

## Required validation

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-graph-hardening-v101.ps1
node scripts/test-sensetrust-obsidian-graph-hardening-v101.mjs
node scripts/test-sensetrust-pilot-console-v10.mjs
node scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
npm.cmd run build
```

## Status log

Obsidian apply:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/apply-obsidian-graph-hardening-v101.ps1
```

Result: BLOQUEADO. The session was denied write access to the canonical vault path:

```text
C:\Users\User\Documents\NEURO DASH SKIP\VitalStrata_OS\00_ABRIR_SENSETRUST\14_GRAPH_HARDENING_MOC_v101.md
```

No fallback note was created.

Graph hardening test:

```powershell
node --check scripts/test-sensetrust-obsidian-graph-hardening-v101.mjs
node scripts/test-sensetrust-obsidian-graph-hardening-v101.mjs
```

Result: PASS. Because the vault write was blocked, the test validated the planned graph-hardening content embedded in `scripts/apply-obsidian-graph-hardening-v101.ps1`.

Regressions:

```powershell
node scripts/test-sensetrust-pilot-console-v10.mjs
node scripts/test-sensetrust-saas-core-v09.mjs
node scripts/test-sensetrust-public-verification-portal-v08.mjs
node scripts/test-sensetrust-signature-timestamp-v07.mjs
node scripts/test-sensetrust-document-states-v06.mjs
node scripts/test-sensetrust-clinical-commit-chain-v05.mjs
```

Result: PASS for v1.0, v0.9, v0.8, v0.7, v0.6 and v0.5.

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

## Validation summary

Passed in repository package validation:

- root note content links Graph Hardening v1.0.1;
- root note links NeuroStrata, VitalStrata, DNDA, BLC, Trust Layer, SenseTrust Layer, Neurodireitos and Piloto Fechado;
- MOC_SenseTrust content links trail 00 to 14;
- specialized MOCs are present in the script package;
- graph hardening note contains required tags;
- MetadataOnly is present;
- institutional language states SenseTrust does not certify absolute diagnostic truth;
- no real clinical data is present in the planned notes;
- v1.0, v0.9, v0.8, v0.7, v0.6 and v0.5 references are present.

Blocked for final approval:

- canonical Obsidian vault write;
- build;
- Git commit and push, because branch creation in the clean clone was blocked.

Git check:

```powershell
git -C C:\Users\User\Documents\NeuroStrata_Git\neurostrata-lisuga2ct branch --show-current
git switch -c chore/sensetrust-obsidian-graph-hardening-v101
```

Result:

```text
current branch: chore/sensetrust-pilot-console-v10
fatal: cannot lock ref 'refs/heads/chore/sensetrust-obsidian-graph-hardening-v101': Permission denied
```
