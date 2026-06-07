import assert from 'node:assert/strict'
import { existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { resolveObsidianVault } from './resolve-obsidian-vault.mjs'
import { writeObsidianNote } from './write-obsidian-note.mjs'

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

const expectedVaultId = 'b1a32fcb40985ffc'
const oldOneDrivePath =
  'C:\\Users\\User\\OneDrive\\Documentos\\NEURO DASH SKIP\\VitalStrata_OS\\08_CODEX_RUNBOOKS\\VAULT-INTEGRITY-TEMP.md'
const oldSenseTrustNotePath =
  'C:\\Users\\User\\OneDrive\\Documentos\\NEURO DASH SKIP\\VitalStrata_OS\\46_CLINICAL_TRUST_LAYER\\SenseTrust Layer MVP Foundation.md'

const resolved = resolveObsidianVault()
assert.equal(resolved.vaultId, expectedVaultId)
assert.ok(existsSync(path.join(resolved.vaultPath, '.obsidian')))

const tempFolder = '08_CODEX_RUNBOOKS/_vault_integrity_tests'
const tempTitle = `VAULT-INTEGRITY-TEMP-${Date.now()}`
const tempBody = `# ${tempTitle}

Temporary note created by the Obsidian Vault Integrity test.
`

const result = writeObsidianNote({
  title: tempTitle,
  folder: tempFolder,
  content: tempBody,
  noteType: 'test',
  linkedModule: 'SenseTrust',
  linkedAdr: 'ADR-0009',
  status: 'test',
})

assert.equal(result.vault_id, expectedVaultId)
assert.ok(result.absolute_note_path.startsWith(resolved.vaultPath))
assert.ok(existsSync(result.absolute_note_path))
assert.equal(result.content_hash, sha256(tempBody.trim()))
assert.equal(existsSync(oldOneDrivePath), false)
assert.equal(existsSync(oldSenseTrustNotePath), false)

const noteText = readFileSync(result.absolute_note_path, 'utf8')
assert.match(noteText, /vault_id: b1a32fcb40985ffc/)
assert.match(noteText, /content_hash: [a-f0-9]{64}/)

const archiveFolder = path.join(resolved.vaultPath, '08_CODEX_RUNBOOKS', '_vault_integrity_tests_archive')
mkdirSync(archiveFolder, { recursive: true })
rmSync(result.absolute_note_path, { force: true })

console.log(
  JSON.stringify(
    {
      status: 'ok',
      vault_id: resolved.vaultId,
      vault_path: resolved.vaultPath,
      tested_note_path: result.note_path,
      content_hash: result.content_hash,
    },
    null,
    2,
  ),
)
