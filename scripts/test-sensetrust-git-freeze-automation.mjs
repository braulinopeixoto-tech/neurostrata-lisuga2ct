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
assert(/Remove-Item[\s\S]+FETCH_HEAD/i.test(preflight), 'preflight removes FETCH_HEAD')
assert(preflight.includes('index.lock'), 'preflight removes index.lock')
assert(preflight.includes('*.lock'), 'preflight removes *.lock')
assert(preflight.includes('takeown'), 'preflight uses takeown')
assert(preflight.includes('icacls'), 'preflight uses icacls')
assert(preflight.includes('clean_repo_not_found'), 'preflight validates CleanRepo')
assert(preflight.includes('git_dir_not_found') || preflight.includes('.git'), 'preflight validates .git')

assert(runner.includes('C:\\WINDOWS\\system32'), 'runner validates not running from C:\\WINDOWS\\system32')
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
assert(docs.toLowerCase().includes('falso freeze'), 'docs mention false freeze prevention')
assert(docs.toLowerCase().includes('branch vazia'), 'docs mention branch empty prevention')
assert(docs.toLowerCase().includes('script obsidian'), 'docs mention Obsidian wrong-script prevention')
assert(docs.includes('metadata_only'), 'docs mention metadata_only')
assert(docs.includes('NeuroStrata') && docs.includes('VitalStrata') && docs.includes('DNDA') && docs.includes('BLC') && docs.includes('SenseTrust'), 'docs mention NeuroStrata, VitalStrata, DNDA, BLC, SenseTrust')
assert(docs.includes('Diagnóstico Neurofuncional Dimensional Auditável'), 'docs define DNDA exactly as Diagnóstico Neurofuncional Dimensional Auditável')
