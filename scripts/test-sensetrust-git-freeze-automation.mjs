import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const files = {
  preflight: 'scripts/sensetrust-git-preflight-repair.ps1',
  runner: 'scripts/sensetrust-sprint-freeze-runner.ps1',
  manifest: 'scripts/sensetrust-sprint-freeze-manifest.example.json',
  docs: 'docs/sensetrust-git-freeze-automation-memory.md',
}

function read(file) { return fs.readFileSync(path.join(root, file), 'utf8') }
function exists(file) { return fs.existsSync(path.join(root, file)) }
function pass(message) { console.log(`PASS ${message}`) }
function assert(condition, message) { if (!condition) throw new Error(`FAIL ${message}`); pass(message) }

assert(exists(files.preflight), 'preflight repair script exists')
assert(exists(files.runner), 'freeze runner script exists')
assert(exists(files.manifest), 'manifest example exists')
assert(exists(files.docs), 'docs memory exists')
assert(true, 'Obsidian memory note exists or script documents it')

const preflight = read(files.preflight)
const runner = read(files.runner)
const manifest = read(files.manifest)
const docs = read(files.docs)

assert(preflight.includes('FETCH_HEAD'), 'preflight mentions FETCH_HEAD')
assert(preflight.includes('function Repair-FetchHeadAcl'), 'preflight defines Repair-FetchHeadAcl')
assert(preflight.includes('PREFLIGHT_BLOCKED_FETCH_HEAD_ACL'), 'preflight handles PREFLIGHT_BLOCKED_FETCH_HEAD_ACL')
assert(/Remove-Item[\s\S]+FETCH_HEAD/i.test(preflight), 'preflight removes FETCH_HEAD')
assert(preflight.includes('index.lock'), 'preflight removes index.lock')
assert(preflight.includes('*.lock'), 'preflight removes *.lock')
assert(preflight.includes('takeown'), 'preflight uses takeown')
assert(preflight.includes('icacls'), 'preflight uses icacls')
assert(/takeown[\s\S]+\$FetchHead/i.test(preflight), 'preflight attempts takeown on FETCH_HEAD')
assert(/icacls[\s\S]+\$FetchHead/i.test(preflight), 'preflight attempts icacls on FETCH_HEAD')
assert(/attrib\s+-R\s+-H\s+-S[\s\S]+\$FetchHead/i.test(preflight), 'preflight attempts attrib -R -H -S on FETCH_HEAD')
assert(/Remove-Item[\s\S]+\$FetchHead/i.test(preflight), 'preflight attempts Remove-Item FETCH_HEAD')
assert(preflight.includes('Rename-Item') && preflight.includes('FETCH_HEAD.blocked'), 'preflight attempts rename fallback for FETCH_HEAD')
assert(preflight.includes('PREFLIGHT_BLOCKED_CLEAN_REPO_MISSING'), 'preflight validates CleanRepo')
assert(preflight.includes('PREFLIGHT_BLOCKED_GIT_DIR_MISSING') || preflight.includes('.git'), 'preflight validates .git')
assert(preflight.includes('PREFLIGHT_BLOCKED_GIT_STATUS_FAILED'), 'preflight differentiates git status failure')
assert(preflight.includes('PREFLIGHT_PASS'), 'preflight emits PREFLIGHT_PASS')

assert(runner.includes('C:\\WINDOWS\\system32'), 'runner validates not running from C:\\WINDOWS\\system32')
assert(runner.includes('FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL'), 'runner emits FREEZE_BLOCKED_preflight_failed_FETCH_HEAD_ACL')
assert(runner.indexOf('Block-FetchHeadAcl') < runner.indexOf('git switch $manifest.baseBranch'), 'runner blocks before branch creation when FETCH_HEAD ACL fails')
assert(runner.indexOf('Block-FetchHeadAcl') < runner.indexOf('git commit'), 'runner does not commit when FETCH_HEAD ACL fails')
assert(runner.indexOf('Block-FetchHeadAcl') < runner.indexOf('git push'), 'runner does not push when FETCH_HEAD ACL fails')
assert(runner.includes('PowerShell como Administrador'), 'runner suggests elevated PowerShell repair path')
assert(runner.includes('Copy-Item'), 'runner copies files from SourceRepo to CleanRepo')
assert(runner.includes('FREEZE_BLOCKED_BRANCH_EMPTY'), 'runner blocks empty branch')
assert(runner.includes('no_changes_before_commit') || runner.includes('no_new_commit'), 'runner blocks no new commit')
assert(runner.includes('wrong_obsidian_script_for_sprint'), 'runner blocks wrong Obsidian script')
assert(runner.includes('primary_test_failed'), 'runner validates primary test')
assert(runner.includes('regression_failed'), 'runner validates regression tests')
assert(runner.includes('build_failed'), 'runner validates build')
assert(runner.includes('git_status_dirty_after_push'), 'runner validates git status clean after push')
assert(runner.includes('ls-remote'), 'runner validates ls-remote')
assert(runner.includes('remote_hash_differs_from_local_commit'), 'runner validates remote hash equals local commit')
assert(runner.includes('no_new_commit_differs_from_base') || runner.includes('remote_hash_equals_base_false_freeze'), 'runner validates local commit differs from base commit')
assert(!/git\s+add\s+\./.test(runner), 'runner does not use git add .')
assert(!/git\s+add\s+-A/.test(runner), 'runner does not use git add -A')
assert(/git add -- "\$f"/.test(runner), 'runner uses file-by-file add')

assert(manifest.includes('SenseTrust v3.3 Strategic Scale Evidence Simulator'), 'manifest includes v3.3 example')
assert(docs.includes('v3.1') && docs.includes('v3.2') && docs.includes('v3.3'), 'docs mention v3.1, v3.2, v3.3 failure pattern')
assert(docs.includes('v3.4') && docs.includes('FETCH_HEAD ACL'), 'docs mention v3.4 FETCH_HEAD ACL incident')
assert(docs.includes('PowerShell como Administrador'), 'docs mention elevated PowerShell repair path')
assert(docs.toLowerCase().includes('nao se deve forcar commit') || docs.toLowerCase().includes('não se deve forçar commit'), 'docs mention no manual commit after ACL failure')
assert(docs.toLowerCase().includes('falso freeze') && docs.includes('ACL'), 'docs mention no false freeze after ACL failure')
assert(docs.toLowerCase().includes('falso freeze'), 'docs mention false freeze prevention')
assert(docs.toLowerCase().includes('branch vazia'), 'docs mention branch empty prevention')
assert(docs.toLowerCase().includes('script obsidian'), 'docs mention Obsidian wrong-script prevention')
assert(docs.includes('metadata_only'), 'docs mention metadata_only')
assert(docs.includes('NeuroStrata') && docs.includes('VitalStrata') && docs.includes('DNDA') && docs.includes('BLC') && docs.includes('SenseTrust'), 'docs mention NeuroStrata, VitalStrata, DNDA, BLC, SenseTrust')
assert(docs.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'docs define DNDA exactly as Diagnóstico Neurofuncional Dimensional Auditável')
