import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'

const VAULT_PATH =
  process.env.OBSIDIAN_VAULT_PATH ??
  'C:\\Users\\User\\OneDrive\\Documentos\\NEURO DASH SKIP\\VitalStrata_OS'
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const OPENAI_KEY = process.env.OPENAI_KEY
const EMBEDDING_MODEL = process.env.EMBEDDING_MODEL ?? 'text-embedding-3-small'

const INCLUDED_TOP_LEVEL_FOLDERS = new Set([
  '40_CLINICAL_DECISION_OS',
  '41_DNDA_CLINICAL_ENGINE',
  '43_QEEG_SOURCE_LOCALIZATION',
  '44_CLINICAL_RISK_FLAGS',
  '45_REPORT_ENGINE',
  '46_CLINICAL_TRUST_LAYER',
  '47_CLINICAL_CASE_SIMULATOR',
  'NeuroStrata',
])

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !OPENAI_KEY) {
  console.error('Defina SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY e OPENAI_KEY antes de rodar.')
  process.exit(1)
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith('---')) return { metadata: {}, body: markdown }
  const end = markdown.indexOf('\n---', 3)
  if (end === -1) return { metadata: {}, body: markdown }

  const raw = markdown.slice(3, end).trim()
  const metadata = {}

  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!match) continue
    metadata[match[1]] = match[2].replace(/^["']|["']$/g, '').trim()
  }

  return { metadata, body: markdown.slice(end + 4).trim() }
}

function titleFromMarkdown(filePath, body, metadata) {
  if (metadata.title) return metadata.title
  const heading = body.match(/^#\s+(.+)$/m)
  if (heading) return heading[1].trim()
  return path.basename(filePath, path.extname(filePath))
}

function chunkText(text, maxChars = 5000, overlap = 500) {
  const chunks = []
  let cursor = 0

  while (cursor < text.length) {
    const end = Math.min(cursor + maxChars, text.length)
    chunks.push(text.slice(cursor, end).trim())
    if (end === text.length) break
    cursor = Math.max(0, end - overlap)
  }

  return chunks.filter((chunk) => chunk.length > 200)
}

async function listMarkdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === '.obsidian') continue
      files.push(...(await listMarkdownFiles(fullPath)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

async function createEmbedding(input) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input }),
  })

  if (!response.ok) {
    throw new Error(`OpenAI embedding error: ${await response.text()}`)
  }

  const payload = await response.json()
  return payload.data[0].embedding
}

async function upsertChunk(row) {
  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/ns_knowledge_notes?on_conflict=source_path,chunk_index`,
    {
      method: 'POST',
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(row),
    },
  )

  if (!response.ok) {
    throw new Error(`Supabase upsert error: ${await response.text()}`)
  }
}

function toPgVector(embedding) {
  return `[${embedding.join(',')}]`
}

async function main() {
  const files = await listMarkdownFiles(VAULT_PATH)
  let notesSeen = 0
  let chunksIndexed = 0
  let skippedNotes = 0

  for (const file of files) {
    const relativePath = path.relative(VAULT_PATH, file)
    const topFolder = relativePath.split(path.sep)[0]

    if (!INCLUDED_TOP_LEVEL_FOLDERS.has(topFolder)) {
      skippedNotes += 1
      continue
    }

    const markdown = await readFile(file, 'utf8')
    const { metadata, body } = parseFrontmatter(markdown)
    const trustStatus = metadata.trust_status ?? 'unreviewed'
    const confidentiality = metadata.confidentiality ?? 'internal'

    if (trustStatus !== 'governed') {
      skippedNotes += 1
      continue
    }

    notesSeen += 1
    const title = titleFromMarkdown(file, body, metadata)
    const chunks = chunkText(body)

    for (const [chunkIndex, content] of chunks.entries()) {
      const embedding = await createEmbedding(`${title}\n\n${content}`)
      await upsertChunk({
        source_path: relativePath.replaceAll(path.sep, '/'),
        obsidian_id: metadata.obsidian_id ?? metadata.id ?? null,
        chunk_index: chunkIndex,
        title,
        note_type: metadata.type ?? null,
        axis: metadata.axis ?? topFolder,
        evidence_level: metadata.evidence_level ?? null,
        confidentiality: confidentiality,
        trust_status: trustStatus,
        content,
        content_hash: sha256(content),
        metadata,
        embedding: toPgVector(embedding),
      })
      chunksIndexed += 1
      console.log(`Indexado: ${relativePath} #${chunkIndex + 1}`)
    }
  }

  console.log(
    JSON.stringify(
      {
        vaultPath: VAULT_PATH,
        notesSeen,
        chunksIndexed,
        skippedNotes,
      },
      null,
      2,
    ),
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
