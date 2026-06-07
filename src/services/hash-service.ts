export async function generate_sha256(file: Blob | ArrayBuffer | Uint8Array | string) {
  const bytes = await toBytes(file)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function verify_document_hash(params: {
  file: Blob | ArrayBuffer | Uint8Array | string
  expectedHash: string
}) {
  const actualHash = await generate_sha256(params.file)
  return {
    actualHash,
    expectedHash: params.expectedHash,
    isValid: actualHash === params.expectedHash,
  }
}

async function toBytes(file: Blob | ArrayBuffer | Uint8Array | string) {
  if (typeof file === 'string') {
    return new TextEncoder().encode(file)
  }

  if (file instanceof Uint8Array) {
    return file
  }

  if (file instanceof ArrayBuffer) {
    return new Uint8Array(file)
  }

  return new Uint8Array(await file.arrayBuffer())
}

