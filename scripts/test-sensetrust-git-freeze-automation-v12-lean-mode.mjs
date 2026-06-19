import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  runner: 'scripts/sensetrust-sprint-freeze-runner-lean-v12.ps1',
  bootstrap: 'scripts/sensetrust-clean-clone-bootstrap-lean-v12.ps1',
  template: 'scripts/sensetrust-lean-freeze-template-v12.ps1',
  example: 'scripts/sensetrust-lean-freeze-manifest-example-v12.json',
  manifest: 'scripts/sensetrust-sprint-freeze-manifest-v12-lean-mode.json',
  obsidian: 'scripts/apply-obsidian-git-freeze-automation-lean-mode-v12.ps1',
  doc: 'docs/sensetrust-git-freeze-automation-lean-mode-v12.md',
  playbook: 'docs/sensetrust-lean-freeze-operational-playbook-v12.md',
  bootstrapDoc: 'docs/sensetrust-clean-clone-bootstrap-v12.md',
  v11Doc: 'docs/sensetrust-runner-v11-limitations-v12.md',
  governanceDoc: 'docs/sensetrust-freeze-governance-after-v37-v12.md',
  reportDoc: 'docs/sensetrust-lean-freeze-executive-report-v12.md',
}

function exists(file) { return fs.existsSync(path.join(root, file)) }
function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

Object.entries(files).forEach(([label, file]) => assert(exists(file), `${label} exists`))

const runner = read(files.runner)
const bootstrap = read(files.bootstrap)
const template = read(files.template)
const example = read(files.example)
const manifest = read(files.manifest)
const obsidian = read(files.obsidian)
const docs = [files.doc, files.playbook, files.bootstrapDoc, files.v11Doc, files.governanceDoc, files.reportDoc].map(read).join('\n')

assert(!runner.includes('takeown'), 'lean runner does not contain takeown')
assert(!runner.includes('icacls'), 'lean runner does not contain icacls')
assert(!runner.includes('Administrators'), 'lean runner does not contain Administrators')
assert(!runner.includes('Administradores'), 'lean runner does not contain Administradores')
assert(!runner.includes('S-1-5-32-544'), 'lean runner does not contain administrator SID')
assert(!/admin/i.test(runner), 'lean runner does not require admin')
assert(runner.includes('C:\\WINDOWS\\system32'), 'lean runner validates not running from C:\\WINDOWS\\system32')
assert(runner.includes('function Test-CleanRepo'), 'lean runner validates CleanRepo')
assert(runner.includes('function Test-SourceRepo'), 'lean runner validates SourceRepo')
assert(runner.includes('function Test-Manifest'), 'lean runner validates manifest')
assert(runner.includes('function Test-GitAvailable'), 'lean runner validates git')
assert(runner.includes('function Test-NodeAvailable'), 'lean runner validates node')
assert(runner.includes('function Test-NpmAvailable'), 'lean runner validates npm')
assert(runner.includes('function Test-DependenciesInstalled'), 'lean runner detects missing dependencies')
assert(runner.includes('npm.cmd install --legacy-peer-deps --no-audit --no-fund'), 'lean runner suggests npm install legacy peer deps')
assert(runner.includes('sensetrust-clean-clone-bootstrap-lean-v12.ps1'), 'lean runner orients clean clone when git permission is broken')
assert(runner.includes('Copy-Item') && runner.includes('$Manifest.files'), 'lean runner copies files from SourceRepo to CleanRepo')
assert(runner.includes('foreach ($file in $Manifest.files)'), 'lean runner uses manifest.files')
assert(runner.includes('Invoke-BuildCommand') && runner.includes('LEAN_BUILD_PASS'), 'lean runner validates build')
assert(runner.includes('Invoke-PrimaryTest') && runner.includes('LEAN_PRIMARY_TEST_PASS'), 'lean runner validates primary test')
assert(runner.includes('Invoke-RegressionTests') && runner.includes('LEAN_REGRESSIONS_PASS'), 'lean runner validates regression tests')
assert(runner.includes('Invoke-ObsidianScript') && runner.includes('LEAN_OBSIDIAN_PASS'), 'lean runner validates Obsidian script')
assert(/git add -- "\$f"/.test(runner), 'lean runner uses file-by-file git add')
assert(!/git\s+add\s+\./.test(runner), 'lean runner does not use git add .')
assert(!/git\s+add\s+-A/.test(runner), 'lean runner does not use git add -A')
assert(runner.includes('LEAN_FREEZE_BLOCKED_empty_branch'), 'lean runner blocks empty branch')
assert(runner.includes('Get-LocalCommit'), 'lean runner validates local commit')
assert(runner.includes('Assert-RemoteHashMatchesLocal') && runner.includes('LEAN_FREEZE_BLOCKED_remote_hash_mismatch'), 'lean runner validates remote hash')
assert(runner.includes('Assert-GitStatusClean') && runner.includes('LEAN_FREEZE_BLOCKED_git_status_not_clean'), 'lean runner validates git status clean')
assert(runner.includes('LEAN_PREFLIGHT_PASS'), 'lean runner emits LEAN_PREFLIGHT_PASS')
assert(runner.includes('LEAN_DEPENDENCIES_READY'), 'lean runner emits LEAN_DEPENDENCIES_READY')
assert(runner.includes('LEAN_COPIED_FILES'), 'lean runner emits LEAN_COPIED_FILES')
assert(runner.includes('LEAN_COMMIT_CREATED'), 'lean runner emits LEAN_COMMIT_CREATED')
assert(runner.includes('LEAN_PUSH_PASS'), 'lean runner emits LEAN_PUSH_PASS')
assert(runner.includes('LOCAL_COMMIT=') && runner.includes('REMOTE_COMMIT='), 'lean runner emits local and remote hashes')
assert(runner.includes('LEAN_FREEZE_PASS'), 'lean runner emits LEAN_FREEZE_PASS')

assert(!bootstrap.includes('takeown'), 'clean clone bootstrap does not use takeown')
assert(!bootstrap.includes('icacls'), 'clean clone bootstrap does not use icacls')
assert(bootstrap.includes('Move-Item') && bootstrap.includes('.backup.'), 'clean clone bootstrap can rename old clone')
assert(bootstrap.includes('git clone'), 'clean clone bootstrap can clone repo')
assert(bootstrap.includes('npm.cmd install --legacy-peer-deps --no-audit --no-fund'), 'clean clone bootstrap can install dependencies with legacy peer deps')
assert(template.includes('sensetrust-sprint-freeze-runner-lean-v12.ps1'), 'lean template references lean runner')
assert(example.includes('chore/sensetrust-strategic-partnership-pilot-proposal-room-v37'), 'lean manifest example based on v3.7')
assert(manifest.includes('SenseTrust Git Freeze Automation v1.2 Lean Mode'), 'lean manifest sprint name present')
assert(manifest.includes('chore/sensetrust-git-freeze-automation-v12-lean-mode'), 'lean manifest branch present')
assert(obsidian.includes('41_GIT_FREEZE_AUTOMATION_LEAN_MODE_v12'), 'Obsidian script updates v1.2 root note')
assert(obsidian.includes('[[SenseTrust Git Freeze Automation v1.2 Lean Mode]]'), 'Obsidian script links main note')

assert(docs.includes('v3.7'), 'docs mention v3.7 incident')
assert(docs.includes('v1.1'), 'docs mention v1.1 limitations')
assert(docs.toLowerCase().includes('clone limpo'), 'docs mention clone limpo as default recovery')
assert(docs.toLowerCase().includes('deprecated') || docs.toLowerCase().includes('excepcional'), 'docs mention admin repair only as deprecated exception')
assert(docs.includes('metadata_only'), 'docs mention metadata_only')
assert(docs.includes('NeuroStrata'), 'docs mention NeuroStrata')
assert(docs.includes('VitalStrata'), 'docs mention VitalStrata')
assert(docs.includes('DNDA'), 'docs mention DNDA')
assert(docs.includes('BLC'), 'docs mention BLC')
assert(docs.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'docs define DNDA exactly as Diagnóstico Neurofuncional Dimensional Auditável')
assert(docs.includes('npm.cmd install --legacy-peer-deps --no-audit --no-fund'), 'docs mention dependency install command')
assert(docs.includes('npm.cmd run build'), 'docs mention build command')
assert(docs.toLowerCase().includes('git add por arquivo'), 'docs mention file-by-file git add')
assert(docs.includes('git add .'), 'docs mention no git add dot')
assert(docs.includes('git add -A'), 'docs mention no git add -A')
assert(docs.toLowerCase().includes('hash local/remoto'), 'docs mention local remote hash rule')
assert(docs.toLowerCase().includes('git status limpo'), 'docs mention clean git status rule')
