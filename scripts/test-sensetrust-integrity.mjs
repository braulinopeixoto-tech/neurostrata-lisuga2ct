import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
      .join(',')}}`
  }

  return JSON.stringify(value)
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex')
}

function buildReportIntegrityPayload(data) {
  const { signature, isSigned, ...clinicalData } = data

  return stableStringify({
    schema: 'neurostrata-dnda-report-integrity-v1',
    clinicalData,
  })
}

const signedReport = {
  isSigned: false,
  patientName: 'PSEUDONYMIZED_SUBJECT',
  reason: 'Queixa inicial documentada em linguagem dimensional.',
  conclusion: 'Conclusao tecnica revisada e dependente de validacao profissional.',
  idxRisk: 2,
}

const certificateHash = sha256(buildReportIntegrityPayload(signedReport))
const alteredReport = {
  ...signedReport,
  conclusion: 'Conclusao alterada depois da assinatura.',
}
const alteredHash = sha256(buildReportIntegrityPayload(alteredReport))

assert.match(certificateHash, /^[a-f0-9]{64}$/)
assert.notEqual(alteredHash, certificateHash)

console.log(
  JSON.stringify(
    {
      status: 'ok',
      assertion: 'altered_report_invalidates_certificate_hash',
      certificateHash,
      alteredHash,
    },
    null,
    2,
  ),
)
