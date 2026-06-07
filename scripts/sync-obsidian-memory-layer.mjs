import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { resolveObsidianVault } from './resolve-obsidian-vault.mjs'

const VAULT_ID = 'b1a32fcb40985ffc'
const now = new Date()
const isoNow = now.toISOString()
const today = isoNow.slice(0, 10)

const { vaultId, vaultPath } = resolveObsidianVault()
if (vaultId !== VAULT_ID) {
  throw new Error(`unexpected_vault_id: ${vaultId}`)
}

const changedFiles = []

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return markdown.trim()
  const end = markdown.indexOf('\n---', 3)
  if (end === -1) return markdown.trim()
  return markdown.slice(end + 4).trim()
}

function frontmatter(fields) {
  const lines = ['---']
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`)
      for (const item of value) lines.push(`  - ${item}`)
    } else {
      lines.push(`${key}: ${value}`)
    }
  }
  lines.push('---')
  return lines.join('\n')
}

function noteId(relativePath) {
  return sha256(`${VAULT_ID}:${relativePath}`).slice(0, 24)
}

function writeGovernedNote(relativePath, fields, body) {
  const normalizedPath = relativePath.replaceAll('\\', '/')
  const absolutePath = path.resolve(vaultPath, normalizedPath)
  const resolvedVault = path.resolve(vaultPath)
  if (!absolutePath.startsWith(`${resolvedVault}${path.sep}`)) {
    throw new Error(`note_path_outside_vault: ${absolutePath}`)
  }

  const canonicalBody = body.trim()
  const bodyHash = sha256(canonicalBody)
  const content = `${frontmatter({
    id: fields.id ?? noteId(normalizedPath),
    vault_id: VAULT_ID,
    type: fields.type,
    module: fields.module,
    status: fields.status,
    linked_adr: fields.linked_adr ?? 'ADR-0009',
    created_by: fields.created_by ?? 'codex',
    created: fields.created ?? today,
    updated: today,
    body_hash: bodyHash,
    trust_status: fields.trust_status ?? 'governed',
  })}\n\n${canonicalBody}\n`

  mkdirSync(path.dirname(absolutePath), { recursive: true })
  writeFileSync(absolutePath, content, 'utf8')
  changedFiles.push(normalizedPath)
  return {
    vault_id: VAULT_ID,
    note_path: normalizedPath,
    note_title: path.basename(normalizedPath, '.md'),
    module: fields.module,
    status: fields.status,
    body_hash: bodyHash,
    last_write: isoNow,
    linked_mocs: fields.linked_mocs ?? [],
  }
}

function readBody(relativePath, fallback) {
  const absolutePath = path.join(vaultPath, relativePath)
  if (!existsSync(absolutePath)) return fallback.trim()
  return stripFrontmatter(readFileSync(absolutePath, 'utf8'))
}

function upsertMemoryLinks(body, links) {
  const section = `## Links de memoria\n\n${links.map((link) => `- [[${link}]]`).join('\n')}`
  const withoutOld = body
    .replace(/\n## Links de mem[oó]ria\n\n(?:- \[\[[^\]]+\]\]\n?)+/giu, '')
    .trim()
  return `${withoutOld}\n\n${section}`
}

const mocNeuroStrataBody = `# MOC NeuroStrata

## Eixos

- [[MOC_SenseTrust]]
- [[MOC_Supabase]]
- [[MOC_Codex_Sessions]]
- [[MOC_ADR]]

## Memoria recente

- [[SenseTrust Layer MVP Foundation]]
- [[Supabase Execution Proof]]
`

const mocSupabaseBody = `# MOC Supabase

## SenseTrust Bootstrap

- [[Supabase Execution Proof]]
- [[MOC_SenseTrust]]
- [[ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target]]

## Pendencias

- RLS forte pendente.
- QR PDF pendente.
- Reconciliacao Git/migrations pendente.
`

const mocCodexBody = `# MOC Codex Sessions

## Sessoes

- [[CODEX-20260606-001-SenseTrust-MVP]]
- [[Supabase Execution Proof]]
- [[MOC_SenseTrust]]
`

const mocAdrBody = `# MOC ADR

## Decisoes

- [[ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target]]
- [[MOC_SenseTrust]]
- [[MOC_Supabase]]
`

const mocSenseTrustBody = `# MOC SenseTrust

## Notas centrais

- [[SenseTrust Layer MVP Foundation]]
- [[Supabase Execution Proof]]
- [[SenseTrust RLS Hardening]]
- [[ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target]]
- [[CODEX-20260606-001-SenseTrust-MVP]]

## MOCs relacionados

- [[MOC_NeuroStrata]]
- [[MOC_Supabase]]
- [[MOC_Codex_Sessions]]
- [[MOC_ADR]]

## Estado

- Supabase Bootstrap: aprovado.
- RLS forte: pendente.
- QR PDF: pendente.
- Reconciliacao Git/migrations: pendente.
`

const manifestEntries = []

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MOC_NeuroStrata.md', {
  type: 'moc',
  module: 'NeuroStrata',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust', 'MOC_Supabase'],
}, mocNeuroStrataBody))

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MOC_SenseTrust.md', {
  type: 'moc',
  module: 'SenseTrust',
  status: 'active',
  linked_mocs: ['MOC_NeuroStrata', 'MOC_Supabase'],
}, mocSenseTrustBody))

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MOC_Supabase.md', {
  type: 'moc',
  module: 'Supabase',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust'],
}, mocSupabaseBody))

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MOC_Codex_Sessions.md', {
  type: 'moc',
  module: 'Codex',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust', 'MOC_ADR'],
}, mocCodexBody))

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MOC_ADR.md', {
  type: 'moc',
  module: 'ADR',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust', 'MOC_Codex_Sessions'],
}, mocAdrBody))

manifestEntries.push(writeGovernedNote('05_SENSETRUST/MOC_SenseTrust.md', {
  type: 'moc',
  module: 'SenseTrust',
  status: 'active',
  linked_mocs: ['MOC_NeuroStrata', 'MOC_Supabase'],
}, mocSenseTrustBody))

const criticalNotes = [
  {
    path: '05_SENSETRUST/SenseTrust Layer MVP Foundation.md',
    type: 'architecture',
    module: 'SenseTrust',
    status: 'active',
    fallback: '# SenseTrust Layer MVP Foundation\n\nFundacao SenseTrust MVP.',
    links: ['MOC_SenseTrust', 'MOC_NeuroStrata', 'MOC_Supabase', 'MOC_ADR'],
    linked_mocs: ['MOC_SenseTrust', 'MOC_NeuroStrata', 'MOC_Supabase'],
  },
  {
    path: '05_SENSETRUST/Supabase Execution Proof.md',
    type: 'execution_proof',
    module: 'SenseTrust',
    status: 'approved',
    fallback: '# Supabase Execution Proof\n\nSupabase Bootstrap: APROVADO.',
    links: ['MOC_SenseTrust', 'MOC_Supabase', 'MOC_Codex_Sessions'],
    linked_mocs: ['MOC_SenseTrust', 'MOC_Supabase'],
  },
  {
    path: '08_CODEX_RUNBOOKS/CODEX-20260606-001-SenseTrust-MVP.md',
    type: 'codex_session',
    module: 'SenseTrust',
    status: 'active',
    fallback: '# CODEX-20260606-001 - SenseTrust MVP\n\nSessao Codex SenseTrust.',
    links: ['MOC_Codex_Sessions', 'MOC_SenseTrust', 'MOC_ADR'],
    linked_mocs: ['MOC_Codex_Sessions', 'MOC_SenseTrust'],
  },
  {
    path: '09_ADR_DECISIONS/ADR-0009-Obsidian-Vault-ID-as-Canonical-Memory-Target.md',
    type: 'adr',
    module: 'Obsidian Vault Integrity',
    status: 'accepted',
    fallback: '# ADR-0009 - Obsidian Vault ID como alvo canonico de memoria\n\nVault ID como alvo canonico.',
    links: ['MOC_ADR', 'MOC_SenseTrust', 'MOC_Codex_Sessions'],
    linked_mocs: ['MOC_ADR', 'MOC_SenseTrust'],
  },
]

for (const note of criticalNotes) {
  const body = upsertMemoryLinks(readBody(note.path, note.fallback), note.links)
  manifestEntries.push(writeGovernedNote(note.path, {
    type: note.type,
    module: note.module,
    status: note.status,
    linked_mocs: note.linked_mocs,
  }, body))
}

const lastSyncBody = `# Last Sync

## Execucao

- Data/hora local: ${now.toLocaleString('pt-BR')}
- Executor: Codex
- Vault ID: ${VAULT_ID}

## Arquivos criados/alterados

${changedFiles.map((file) => `- [[${path.basename(file, '.md')}]] (${file})`).join('\n')}

## Status

- Obsidian: filesystem positivo, MOCs e manifesto atualizados; prova visual/operacional depende da abertura no Obsidian UI.
- Supabase: Bootstrap aprovado; RLS forte pendente.
- Git: reconciliacao Git/migrations pendente.

## Proximos bloqueios

- RLS forte.
- QR PDF final.
- Reconciliacao Git/migrations.
- Confirmacao visual do grafo Obsidian apos abertura por URI.

## Links de memoria

- [[MOC_SenseTrust]]
- [[MOC_NeuroStrata]]
- [[MOC_Supabase]]
- [[MOC_Codex_Sessions]]
- [[MOC_ADR]]
`

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/_LAST_SYNC.md', {
  type: 'sync_report',
  module: 'Obsidian Memory Sync',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust', 'MOC_Codex_Sessions'],
}, lastSyncBody))

const manifestJsonPath = path.join(vaultPath, '00_MEMORY_INDEX', 'MEMORY_MANIFEST.json')
writeFileSync(manifestJsonPath, `${JSON.stringify(manifestEntries, null, 2)}\n`, 'utf8')
changedFiles.push('00_MEMORY_INDEX/MEMORY_MANIFEST.json')

const manifestTable = `# Memory Manifest

| Nota | Modulo | Status | Ultima atualizacao | Hash | MOCs vinculados |
|---|---|---|---|---|---|
${manifestEntries
  .map((entry) => `| [[${entry.note_title}]] | ${entry.module} | ${entry.status} | ${entry.last_write} | \`${entry.body_hash.slice(0, 16)}...\` | ${entry.linked_mocs.map((moc) => `[[${moc}]]`).join(', ')} |`)
  .join('\n')}

## Links de memoria

- [[MOC_SenseTrust]]
- [[MOC_NeuroStrata]]
- [[MOC_Supabase]]
- [[MOC_Codex_Sessions]]
- [[MOC_ADR]]
`

manifestEntries.push(writeGovernedNote('00_MEMORY_INDEX/MEMORY_MANIFEST.md', {
  type: 'manifest',
  module: 'Obsidian Memory Sync',
  status: 'active',
  linked_mocs: ['MOC_SenseTrust', 'MOC_Codex_Sessions'],
}, manifestTable))

console.log(JSON.stringify({
  status: 'ok',
  vault_id: VAULT_ID,
  vault_path: vaultPath,
  changed_files: changedFiles,
  manifest_entries: manifestEntries.length,
}, null, 2))
