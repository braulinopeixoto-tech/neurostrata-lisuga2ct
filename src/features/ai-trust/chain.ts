import type { TrustEvent } from './contracts'
import { calculateTrustEventHash } from './hashing'
import { trustEventSchema } from './schema'

export interface ChainValidationResult {
  valid: boolean
  errors: string[]
}

export async function validateTrustChain(events: TrustEvent[]): Promise<ChainValidationResult> {
  const errors: string[] = []
  const eventIds = new Set<string>()

  for (const [index, event] of events.entries()) {
    const schemaResult = trustEventSchema.safeParse(event)
    if (!schemaResult.success) {
      errors.push(`SCHEMA_INVALID:${event.eventId || index}`)
      continue
    }

    if (eventIds.has(event.eventId)) errors.push(`DUPLICATE_EVENT:${event.eventId}`)
    eventIds.add(event.eventId)

    const expectedPreviousHash = index === 0 ? null : events[index - 1].eventHash
    if (event.previousEventHash !== expectedPreviousHash) {
      errors.push(`CHAIN_LINK_INVALID:${event.eventId}`)
    }

    const calculatedHash = await calculateTrustEventHash(event)
    if (event.eventHash !== calculatedHash) errors.push(`EVENT_HASH_INVALID:${event.eventId}`)
  }

  return { valid: errors.length === 0, errors }
}
