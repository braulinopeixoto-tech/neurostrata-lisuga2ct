export function buildReportIntegrityPayload(data: Record<string, unknown>) {
  const { signature, isSigned, ...clinicalData } = data

  return stableStringify({
    schema: 'neurostrata-dnda-report-integrity-v1',
    clinicalData,
  })
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(',')}]`
  }

  if (value && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableStringify(item)}`)
      .join(',')}}`
  }

  return JSON.stringify(value)
}
