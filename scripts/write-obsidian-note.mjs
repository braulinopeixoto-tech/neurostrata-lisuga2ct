import { createHash } from 'node:crypto'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolveObsidianVault } from './resolve-obsidian-vault.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')

function parseArgs(argv) {
  const args = {}
  for (let index = 0; index < argv.length; index += 1) {
    const item = argv[index]
    if (!item.startsWith('--')) continue
    const key = item.slice(2)
    const next = argv[index + 1]
    if (!next || next.startsWith('--')) {
      args[key] = true
    } else {
      args[key] = next
      index += 1
    }
  }
  return args
}

function sha256(value) {
  return createHash('sha256').update(value, 'utf8').digest('hex')
}

function slugFileName(title) {
  return `${title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[<>:"/\\|?*]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()}.md`
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return markdown.trim()
  const end = markdown.indexOf('\n---', 3)
  if (end === -1) return markdown.trim()
  return markdown.slice(end + 4).trim()
}

function buildFrontmatter(fields) {
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

export function writeObsidianNote(params) {
  const { vaultId, vaultPath } = resolveObsidianVault()
  const title = params.title
  const folder = params.folder
  const noteType = params.noteType ?? 'codex_note'
  const linkedModule = params.linkedModule ?? 'SenseTrust'
  const linkedAdr = params.linkedAdr ?? ''
  const status = params.status ?? 'active'

  if (!title || !folder) {
    throw new Error('title_and_folder_are_required')
  }

  const body = stripFrontmatter(params.content ?? '')
  const contentHash = sha256(body)
  const relativeNotePath = path.posix.join(folder.replaceAll('\\', '/'), slugFileName(title))
  const absoluteNotePath = path.resolve(vaultPath, relativeNotePath)
  const resolvedVaultPath = path.resolve(vaultPath)

  if (
    absoluteNotePath !== resolvedVaultPath &&
    !absoluteNotePath.startsWith(`${resolvedVaultPath}${path.sep}`)
  ) {
    throw new Error(`note_path_outside_vault: ${absoluteNotePath}`)
  }

  const frontmatter = buildFrontmatter({
    id: params.id ?? sha256(`${vaultId}:${relativeNotePath}`).slice(0, 24),
    vault_id: vaultId,
    type: noteType,
    module: linkedModule,
    status,
    linked_adr: linkedAdr,
    created_by: params.createdBy ?? 'codex',
    created: params.created ?? new Date().toISOString().slice(0, 10),
    updated: params.updated ?? new Date().toISOString().slice(0, 10),
    body_hash: contentHash,
    trust_status: 'governed',
  })

  mkdirSync(path.dirname(absoluteNotePath), { recursive: true })
  writeFileSync(absoluteNotePath, `${frontmatter}\n\n${body}\n`, 'utf8')

  const obsidianUri = `obsidian://open?vault=${encodeURIComponent(vaultId)}&file=${encodeURIComponent(relativeNotePath)}`

  return {
    vault_id: vaultId,
    note_path: relativeNotePath,
    absolute_note_path: absoluteNotePath,
    content_hash: contentHash,
    obsidian_uri: obsidianUri,
    registry_payload: {
      vault_id: vaultId,
      note_path: relativeNotePath,
      note_title: title,
      note_type: noteType,
      linked_module: linkedModule,
      linked_adr: linkedAdr || null,
      created_by: params.createdBy ?? 'codex',
      content_hash: contentHash,
      source_codex_session_id: params.sourceCodexSessionId ?? null,
      status,
    },
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2))
  const content = args.contentFile
    ? readFileSync(path.resolve(repoRoot, args.contentFile), 'utf8')
    : String(args.content ?? '')

  const result = writeObsidianNote({
    title: args.title,
    folder: args.folder,
    content,
    noteType: args.noteType,
    linkedModule: args.linkedModule,
    linkedAdr: args.linkedAdr,
    status: args.status,
    sourceCodexSessionId: args.sourceCodexSessionId,
  })

  console.log(JSON.stringify(result, null, 2))
}
