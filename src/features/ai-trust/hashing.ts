import type { TrustEvent } from './contracts'

function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, item]) => item !== undefined)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, normalize(item)]),
    )
  }
  return value
}

export function canonicalize(value: unknown): string {
  return JSON.stringify(normalize(value))
}

export async function sha256Hex(value: string | Uint8Array): Promise<string> {
  const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes as BufferSource)
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
}

export async function calculateTrustEventHash(event: Omit<TrustEvent, 'eventHash'> | TrustEvent) {
  const { eventHash: _eventHash, ...payload } = event as TrustEvent
  return sha256Hex(canonicalize(payload))
}
