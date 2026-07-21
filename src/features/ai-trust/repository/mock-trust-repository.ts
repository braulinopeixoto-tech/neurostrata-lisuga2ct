import { validateTrustChain } from '../chain'
import { calculateTrustEventHash } from '../hashing'
import { TrustRepositoryError } from './errors'
import type {
  PersistedTrustDecision,
  PersistedTrustEvent,
  TrustRepository,
} from './types'

function cloneEvent(event: PersistedTrustEvent): PersistedTrustEvent {
  return structuredClone(event)
}

function cloneDecision(decision: PersistedTrustDecision): PersistedTrustDecision {
  return structuredClone(decision)
}

export class MockTrustRepository implements TrustRepository {
  private readonly events: PersistedTrustEvent[]
  private readonly decisions: PersistedTrustDecision[] = []

  constructor(persistedFixtures: PersistedTrustEvent[] = []) {
    this.events = persistedFixtures.map(cloneEvent)
  }

  async appendEvent(event: PersistedTrustEvent): Promise<PersistedTrustEvent> {
    if (this.events.some((candidate) => candidate.eventId === event.eventId)) {
      throw new TrustRepositoryError(
        'DUPLICATE_EVENT_ID',
        'append_event',
        `Duplicate event ID: ${event.eventId}`,
      )
    }

    if (this.events.some((candidate) => candidate.eventHash === event.eventHash)) {
      throw new TrustRepositoryError(
        'DUPLICATE_EVENT_HASH',
        'append_event',
        `Duplicate event hash: ${event.eventHash}`,
      )
    }

    if ((await calculateTrustEventHash(event)) !== event.eventHash) {
      throw new TrustRepositoryError(
        'INVALID_EVENT_HASH',
        'append_event',
        `Event hash does not match its canonical payload: ${event.eventId}`,
      )
    }

    const latest = await this.getLatestEvent(event.resourceId)
    const expectedPreviousHash = latest?.eventHash ?? null
    if (event.previousEventHash !== expectedPreviousHash) {
      throw new TrustRepositoryError(
        'INVALID_APPEND_ORDER',
        'append_event',
        `Event ${event.eventId} does not extend resource ${event.resourceId}.`,
      )
    }

    const stored = cloneEvent(event)
    this.events.push(stored)
    return cloneEvent(stored)
  }

  async getEventsByResource(resourceId: string): Promise<PersistedTrustEvent[]> {
    return this.events
      .filter((event) => event.resourceId === resourceId)
      .map(cloneEvent)
  }

  async getLatestEvent(resourceId: string): Promise<PersistedTrustEvent | null> {
    const events = this.events.filter((event) => event.resourceId === resourceId)
    return events.length === 0 ? null : cloneEvent(events[events.length - 1])
  }

  async appendDecision(decision: PersistedTrustDecision): Promise<PersistedTrustDecision> {
    if (this.decisions.some((candidate) => candidate.decisionId === decision.decisionId)) {
      throw new TrustRepositoryError(
        'DUPLICATE_DECISION_ID',
        'append_decision',
        `Duplicate decision ID: ${decision.decisionId}`,
      )
    }

    const stored = cloneDecision(decision)
    this.decisions.push(stored)
    return cloneDecision(stored)
  }

  async validateResourceChain(resourceId: string) {
    return validateTrustChain(await this.getEventsByResource(resourceId))
  }
}
