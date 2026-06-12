import { createHash } from 'node:crypto'

const ids = {
  document_id: 'DNDA-SIM-2026-0001',
  amended_document_id: 'DNDA-SIM-2026-0001-A1',
  replacement_document_id: 'DNDA-SIM-2026-0002',
  trust_object_id: 'DTO-SIM-2026-0001',
  evidence_manifest_id: 'EM-SIM-2026-0001',
  chain_id: 'CHAIN-SIM-2026-0001',
  certificate_id: 'CERT-SIM-2026-0001',
}

const now = '2026-06-07T10:00:00.000Z'

const allowedTransitions = {
  reviewed: ['signed'],
  signed: ['active'],
  active: ['amended', 'revoked', 'expired', 'superseded', 'invalid_integrity'],
  amended: ['active_new_version', 'revoked'],
  revoked: [],
  expired: [],
  superseded: ['archived'],
  invalid_integrity: [],
}

function sha256(value) {
  return `sha256:${createHash('sha256').update(stableStringify(value)).digest('hex')}`
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  return `{${Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
    .join(',')}}`
}

function withStateHash(state) {
  const { state_hash, ...withoutHash } = state
  return { ...withoutHash, state_hash: sha256(withoutHash) }
}

function createInitialDocumentState() {
  return withStateHash({
    schema: 'sensetrust.document_state.v1',
    document_id: ids.document_id,
    document_type: 'dnda_report',
    document_version: '1.0.0',
    trust_object_id: ids.trust_object_id,
    evidence_manifest_id: ids.evidence_manifest_id,
    chain_id: ids.chain_id,
    certificate_id: ids.certificate_id,
    status: 'reviewed',
    document_hash: 'sha256:simulated-dnda-document-hash-v06',
    issued_at: now,
    updated_at: now,
    expires_at: '2026-12-31T23:59:59.000Z',
    transitions: [],
    clinical_commit_ids: [],
    simulated_only: true,
  })
}

function validateTransition(previous, next) {
  return Boolean(allowedTransitions[previous]?.includes(next))
}

function createCommit(type, state, previousStatus, nextStatus) {
  const commit = {
    commit_id: `CMT-SIM-DOC-${String(state.transitions.length + 1).padStart(4, '0')}`,
    commit_type: type,
    document_id: state.document_id,
    previous_status: previousStatus,
    next_status: nextStatus,
    public_reason: publicReason(nextStatus),
    created_at: now,
    simulated_only: true,
  }
  return { ...commit, current_hash: sha256(commit) }
}

function transitionTypeToCommit(type) {
  return {
    sign_document: 'signed_final',
    activate_certificate: 'signed_final',
    amend_document: 'amended',
    revoke_document: 'revoked',
    expire_document: 'status_expired',
    supersede_document: 'superseded',
    integrity_invalidated: 'integrity_invalidated',
  }[type]
}

function publicReason(status) {
  return {
    signed: 'Documento simulado assinado e pronto para certificacao.',
    active: 'Certificado simulado ativo.',
    amended: 'Documento simulado recebeu adendo governado.',
    revoked: 'Certificado simulado revogado por governanca documental.',
    expired: 'Certificado simulado expirado por regra temporal.',
    superseded: 'Documento simulado substituido por nova versao.',
    invalid_integrity: 'Integridade do documento simulado nao validada.',
  }[status]
}

function privateReason(status) {
  return {
    amended: 'Motivo interno simulado do adendo sem dado clinico real.',
    revoked: 'Motivo interno simulado de revogacao, nao publicavel.',
    expired: 'Expiracao interna simulada por janela de validade.',
    superseded: 'Supersedencia interna simulada por nova versao emitida.',
  }[status]
}

function applyTransition(state, transitionType, nextStatus) {
  if (state.status === 'revoked' && transitionType === 'activate_certificate') {
    throw new Error('revoked_certificate_cannot_be_reactivated')
  }
  if (!validateTransition(state.status, nextStatus)) {
    throw new Error(`invalid_transition:${state.status}->${nextStatus}`)
  }
  const commit = createCommit(transitionTypeToCommit(transitionType), state, state.status, nextStatus)
  const transitionWithoutHash = {
    transition_id: `DST-SIM-2026-${String(state.transitions.length + 1).padStart(4, '0')}`,
    transition_type: transitionType,
    document_id: state.document_id,
    trust_object_id: state.trust_object_id,
    evidence_manifest_id: state.evidence_manifest_id,
    clinical_commit_id: commit.commit_id,
    certificate_id: state.certificate_id,
    previous_status: state.status,
    next_status: nextStatus,
    reason: {
      public_reason: publicReason(nextStatus),
      private_reason: privateReason(nextStatus),
      policy_reference: 'SenseTrust Document Lifecycle v0.6',
    },
    created_at: now,
    terminal: ['revoked', 'expired', 'invalid_integrity'].includes(nextStatus),
  }
  const transition = { ...transitionWithoutHash, transition_hash: sha256(transitionWithoutHash) }
  return withStateHash({
    ...state,
    status: nextStatus,
    updated_at: now,
    transitions: [...state.transitions, transition],
    clinical_commit_ids: [...state.clinical_commit_ids, commit.commit_id],
  })
}

function signDocumentState(state) {
  return applyTransition(state, 'sign_document', 'signed')
}

function activateDocumentCertificate(state) {
  return applyTransition(state, 'activate_certificate', 'active')
}

function amendDocument(state) {
  const next = applyTransition(state, 'amend_document', 'amended')
  return withStateHash({
    ...next,
    amendment: {
      amendment_id: 'AMD-SIM-2026-0001',
      source_document_id: state.document_id,
      amended_document_id: ids.amended_document_id,
      clinical_commit_id: next.clinical_commit_ids.at(-1),
      created_at: now,
      status: 'amended',
      public_reason: publicReason('amended'),
      private_reason: privateReason('amended'),
      simulated_only: true,
    },
  })
}

function revokeDocument(state) {
  const next = applyTransition(state, 'revoke_document', 'revoked')
  return withStateHash({
    ...next,
    revocation: {
      revocation_id: 'REV-SIM-2026-0001',
      document_id: state.document_id,
      certificate_id: state.certificate_id,
      clinical_commit_id: next.clinical_commit_ids.at(-1),
      revoked_at: now,
      status: 'revoked',
      public_reason: publicReason('revoked'),
      private_reason: privateReason('revoked'),
      simulated_only: true,
    },
  })
}

function expireDocument(state) {
  const next = applyTransition(state, 'expire_document', 'expired')
  return withStateHash({
    ...next,
    expiration: {
      expiration_id: 'EXP-SIM-2026-0001',
      document_id: state.document_id,
      certificate_id: state.certificate_id,
      clinical_commit_id: next.clinical_commit_ids.at(-1),
      expired_at: now,
      status: 'expired',
      public_reason: publicReason('expired'),
      private_reason: privateReason('expired'),
      simulated_only: true,
    },
  })
}

function supersedeDocument(state) {
  const next = applyTransition(state, 'supersede_document', 'superseded')
  return withStateHash({
    ...next,
    supersession: {
      supersession_id: 'SUP-SIM-2026-0001',
      source_document_id: state.document_id,
      replacement_document_id: ids.replacement_document_id,
      clinical_commit_id: next.clinical_commit_ids.at(-1),
      superseded_at: now,
      status: 'superseded',
      public_reason: publicReason('superseded'),
      private_reason: privateReason('superseded'),
      simulated_only: true,
    },
  })
}

function assertNoDestructiveEditAfterSignature(state, patch) {
  const locked = ['signed', 'active', 'amended', 'revoked', 'expired', 'superseded'].includes(state.status)
  if (!locked) return true
  const destructive = ['document_id', 'document_hash', 'certificate_id', 'content', 'body'].filter((field) =>
    Object.prototype.hasOwnProperty.call(patch, field),
  )
  if (destructive.length) throw new Error(`destructive_edit_blocked:${destructive.join(',')}`)
  return true
}

function buildPublicDocumentStatePayload(state) {
  return {
    schema: 'sensetrust.public_document_state.v1',
    document_id: state.document_id,
    document_type: state.document_type,
    document_version: state.document_version,
    certificate_id: state.certificate_id,
    lifecycle_status: state.status,
    verification_status:
      state.status === 'revoked' ? 'revoked' : state.status === 'expired' ? 'expired' : state.status === 'superseded' ? 'superseded' : 'valid',
    public_reason:
      state.revocation?.public_reason ??
      state.amendment?.public_reason ??
      state.expiration?.public_reason ??
      state.supersession?.public_reason ??
      'Documento simulado verificavel por metadados publicos.',
    amended_document_id: state.amendment?.amended_document_id,
    replacement_document_id: state.supersession?.replacement_document_id,
    expires_at: state.expires_at,
    updated_at: state.updated_at,
    simulated_only: true,
  }
}

function detectStateTampering(state) {
  const { state_hash, ...withoutHash } = state
  return sha256(withoutHash) !== state_hash
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function pass(message) {
  console.log(`PASS ${message}`)
}

const reviewed = createInitialDocumentState()
const signed = signDocumentState(reviewed)
const active = activateDocumentCertificate(signed)
assert(active.status === 'active', 'active document state not created')
pass('active document state created')

assert(signed.status === 'signed' && active.transitions.some((transition) => transition.next_status === 'active'), 'signed document not activated')
pass('signed document activated')

const amended = amendDocument(active)
assert(amended.amendment?.amended_document_id === ids.amended_document_id && amended.transitions.length > active.transitions.length, 'amendment record missing')
pass('amendment creates new record')

assert(amended.clinical_commit_ids.at(-1)?.startsWith('CMT-SIM-DOC-'), 'amendment commit missing')
pass('amendment creates clinical commit')

const revoked = revokeDocument(active)
assert(revoked.revocation?.status === 'revoked' && revoked.status === 'revoked', 'revocation record missing')
pass('revocation creates new record')

assert(revoked.clinical_commit_ids.at(-1)?.startsWith('CMT-SIM-DOC-'), 'revocation commit missing')
pass('revocation creates clinical commit')

const expired = expireDocument(active)
assert(expired.status === 'expired' && expired.transitions.length === active.transitions.length + 1 && active.status === 'active', 'expiration did not preserve history')
pass('expiration preserves history')

const superseded = supersedeDocument(active)
assert(superseded.supersession?.replacement_document_id === ids.replacement_document_id, 'replacement document missing')
pass('supersession links replacement document')

let blockedReactivation = false
try {
  activateDocumentCertificate(revoked)
} catch {
  blockedReactivation = true
}
assert(blockedReactivation, 'revoked reactivation not blocked')
pass('revoked blocks reactivation')

let destructiveBlocked = false
try {
  assertNoDestructiveEditAfterSignature(active, { document_hash: 'sha256:tampered' })
} catch {
  destructiveBlocked = true
}
assert(destructiveBlocked, 'destructive edit not blocked')
pass('signed blocks destructive edit')

assert(!validateTransition('revoked', 'active'), 'invalid transition not detected')
pass('invalid transition detected')

const tampered = { ...active, status: 'revoked' }
assert(detectStateTampering(tampered), 'state tampering not detected')
pass('state tamper detected')

const publicPayload = buildPublicDocumentStatePayload(revoked)
const serializedPublic = JSON.stringify(publicPayload).toLowerCase()
const sensitiveTerms = ['patient', 'paciente', 'cpf', 'anamnese', 'eeg', 'qeeg', 'sloreta', 'diagnostico', 'diagnóstico', 'biomarcador', 'private_reason']
assert(!sensitiveTerms.some((term) => serializedPublic.includes(term)), 'public payload exposes sensitive field')
pass('public payload safe')

assert(!serializedPublic.includes(privateReason('revoked').toLowerCase()), 'private reason leaked')
pass('private reason hidden')

assert(revoked.transitions.at(-1).terminal && expired.transitions.at(-1).terminal && !active.transitions.at(-1).terminal, 'terminal states not respected')
pass('terminal states respected')

const allObjects = [reviewed, signed, active, amended, revoked, expired, superseded, publicPayload]
const serializedAll = JSON.stringify(allObjects)
assert(serializedAll.includes('SIM') && !/cpf|paciente real|real patient|john doe|maria/i.test(serializedAll), 'non-simulated data detected')
pass('simulated only')
