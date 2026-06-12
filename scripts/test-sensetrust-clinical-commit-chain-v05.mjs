import { createHash } from 'node:crypto'

const fixture = {
  chain_id: 'CHAIN-SIM-2026-0001',
  document_id: 'DNDA-SIM-2026-0001',
  trust_object_id: 'DTO-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  evidence_manifest_hash: sha256('EM-SIM-2026-0001'),
  document_hash: sha256('DNDA-SIMULATED-DOCUMENT-V05'),
  trust_object_hash: sha256('DTO-SIM-2026-0001'),
  created_at: '2026-06-12T09:00:00Z',
}

const sensitiveFields = [
  'patient_name',
  'patient_document',
  'cpf',
  'real_eeg',
  'anamnesis',
  'clinical_history',
  'diagnosis',
  'hypothesis',
  'scale_result',
  'clinical_data',
]

const plan = [
  ['initial_draft', 'draft', 'Initial simulated DNDA draft created'],
  ['evidence_attached', 'draft', 'Simulated evidence manifest attached'],
  ['dnda_trust_object_created', 'draft', 'Simulated DNDA trust object created'],
  ['human_review', 'reviewed', 'Simulated human review completed'],
  ['clinical_revision', 'reviewed', 'Simulated revision recorded'],
  ['signed_final', 'signed', 'Simulated final version signed'],
]

function sha256(value) {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map((item) => stableStringify(item)).join(',')}]`
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(',')}}`
}

function hashCommit(commit) {
  const clone = { ...commit }
  delete clone.current_hash
  return sha256(stableStringify(clone))
}

function createCommit({ index, parent, commitType, status, reason }) {
  const commit = {
    schema: 'sensetrust.clinical_commit.v1',
    commit_id: `CMT-SIM-2026-${String(index + 1).padStart(4, '0')}`,
    parent_commit_id: parent?.commit_id ?? null,
    chain_id: fixture.chain_id,
    document_id: fixture.document_id,
    trust_object_id: fixture.trust_object_id,
    evidence_manifest_id: fixture.evidence_manifest_id,
    commit_type: commitType,
    status,
    actor: {
      actor_id: 'USR-SIM-001',
      display_name: 'NeuroStrata Simulated Reviewer',
      role: 'simulated_clinical_reviewer',
      organization: 'NeuroStrata Simulated Lab',
    },
    reason,
    diff_json: {
      operation: commitType === 'signed_final' ? 'signed' : index === 0 ? 'created' : 'updated',
      summary: reason,
      simulated_only: true,
      public_exposure: 'none',
    },
    previous_hash: parent?.current_hash ?? null,
    evidence_manifest_hash: fixture.evidence_manifest_hash,
    document_hash: fixture.document_hash,
    trust_object_hash: fixture.trust_object_hash,
    hash_algorithm: 'SHA-256',
    created_at: fixture.created_at,
    sequence: index + 1,
  }
  return { ...commit, current_hash: hashCommit(commit) }
}

function createChain() {
  const commits = []
  for (const [index, [commitType, status, reason]] of plan.entries()) {
    commits.push(createCommit({ index, parent: commits.at(-1), commitType, status, reason }))
  }
  return {
    schema: 'sensetrust.clinical_commit_chain.v1',
    chain_id: fixture.chain_id,
    document_id: fixture.document_id,
    trust_object_id: fixture.trust_object_id,
    evidence_manifest_id: fixture.evidence_manifest_id,
    status: 'signed',
    commits,
    simulated_only: true,
  }
}

function validateChain(chain) {
  const errors = []
  for (const [index, commit] of chain.commits.entries()) {
    const parent = index === 0 ? null : chain.commits[index - 1]
    if (commit.current_hash !== hashCommit(commit)) errors.push(`hash:${commit.commit_id}`)
    if (commit.parent_commit_id !== (parent?.commit_id ?? null)) errors.push(`parent:${commit.commit_id}`)
    if (commit.previous_hash !== (parent?.current_hash ?? null)) errors.push(`previous:${commit.commit_id}`)
  }
  return { valid: errors.length === 0, errors }
}

function appendPostSigned(chain, commitType, status) {
  const parent = chain.commits.at(-1)
  if (parent.status === 'signed' && !['amended', 'revoked', 'superseded'].includes(status)) {
    throw new Error('signed_chain_requires_new_amendment_revocation_or_supersession_commit')
  }
  return {
    ...chain,
    status,
    commits: [
      ...chain.commits,
      createCommit({
        index: chain.commits.length,
        parent,
        commitType,
        status,
        reason: `Simulated ${commitType} after signature`,
      }),
    ],
  }
}

function assert(condition, label) {
  if (!condition) throw new Error(`FAIL ${label}`)
  console.log(`PASS ${label}`)
}

const chain = createChain()

assert(chain.commits.length === 6, 'clinical commit chain created')
assert(chain.commits[0].parent_commit_id === null, 'first commit has no parent')
assert(validateChain(chain).valid, 'parent links valid')
assert(chain.commits.every((commit) => /^sha256:[a-f0-9]{64}$/.test(commit.current_hash)), 'commit hashes present')
assert(chain.commits.every((commit, index) => index === 0 || commit.previous_hash === chain.commits[index - 1].current_hash), 'previous hash chain valid')
assert(chain.commits.every((commit) => commit.trust_object_id === fixture.trust_object_id), 'trust object linked')
assert(chain.commits.every((commit) => commit.evidence_manifest_id === fixture.evidence_manifest_id), 'evidence manifest linked')

let destructiveBlocked = false
try {
  appendPostSigned(chain, 'clinical_revision', 'reviewed')
} catch {
  destructiveBlocked = true
}
assert(destructiveBlocked, 'signed final blocks destructive edit')

assert(appendPostSigned(chain, 'amended', 'amended').commits.at(-1).commit_type === 'amended', 'amendment commit allowed')
assert(appendPostSigned(chain, 'revoked', 'revoked').commits.at(-1).commit_type === 'revoked', 'revocation commit allowed')

const diffTampered = structuredClone(chain)
diffTampered.commits[2].diff_json.summary = 'TAMPERED_DIFF'
assert(!validateChain(diffTampered).valid, 'diff tamper detected')

const documentTampered = structuredClone(chain)
documentTampered.commits[3].document_hash = sha256('TAMPERED_DOCUMENT_HASH')
assert(!validateChain(documentTampered).valid, 'document hash tamper detected')

const parentTampered = structuredClone(chain)
parentTampered.commits[4].parent_commit_id = 'CMT-SIM-2026-9999'
assert(!validateChain(parentTampered).valid, 'parent link tamper detected')

const publicPayload = JSON.stringify(chain.commits.map((commit) => ({
  commit_id: commit.commit_id,
  sequence: commit.sequence,
  status: commit.status,
  current_hash: commit.current_hash,
}))).toLowerCase()
assert(!sensitiveFields.some((field) => publicPayload.includes(field)), 'no sensitive public exposure')
assert(chain.simulated_only === true && chain.commits.every((commit) => commit.diff_json.simulated_only === true), 'simulated only')
