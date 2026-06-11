export interface HashValidationResult {
  expectedHash: string
  actualHash: string
  hashMatch: boolean
}

export async function generateSha256FromContent(content: string | ArrayBuffer | Uint8Array) {
  const bytes = toUint8Array(content)
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes)
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function compareSha256Hash(
  content: string | ArrayBuffer | Uint8Array,
  expectedHash: string,
): Promise<HashValidationResult> {
  const actualHash = await generateSha256FromContent(content)
  return {
    expectedHash,
    actualHash,
    hashMatch: actualHash.toLowerCase() === expectedHash.toLowerCase(),
  }
}

function toUint8Array(content: string | ArrayBuffer | Uint8Array) {
  if (typeof content === 'string') {
    return new TextEncoder().encode(content)
  }

  if (content instanceof Uint8Array) {
    return content
  }

  return new Uint8Array(content)
}
