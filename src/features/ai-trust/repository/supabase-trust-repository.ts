import type { SupabaseClient } from '@supabase/supabase-js'
import { validateTrustChain } from '../chain'
import { calculateTrustEventHash } from '../hashing'
import type { AiTrustDatabase, AiTrustEventRow } from './database-types'
import { normalizeSupabaseError, TrustRepositoryError } from './errors'
import { fromTrustEventRow, toTrustDecisionRow, toTrustEventRow } from './mappers'
import type { PersistedTrustDecision, PersistedTrustEvent, TrustRepository } from './types'

export class SupabaseTrustRepository implements TrustRepository {
  constructor(
    private readonly client: SupabaseClient<AiTrustDatabase>,
    private readonly organizationId: string,
  ) {}

  async appendEvent(event: PersistedTrustEvent): Promise<PersistedTrustEvent> {
    if ((await calculateTrustEventHash(event)) !== event.eventHash) {
      throw new TrustRepositoryError(
        'INVALID_EVENT_HASH',
        'append_event',
        `Event hash does not match its canonical payload: ${event.eventId}`,
      )
    }

    const { error } = await this.client.from('ai_trust_events').insert({
      ...toTrustEventRow(event),
      organization_id: this.organizationId,
    })
    if (error) throw normalizeSupabaseError(error, 'append_event')
    return structuredClone(event)
  }

  async getEventsByResource(resourceId: string): Promise<PersistedTrustEvent[]> {
    const { data, error } = await this.client
      .from('ai_trust_events')
      .select('*')
      .eq('organization_id', this.organizationId)
      .eq('resource_id', resourceId)
      .order('sequence_number', { ascending: true })

    if (error) throw normalizeSupabaseError(error, 'get_events_by_resource')
    return ((data ?? []) as AiTrustEventRow[]).map(fromTrustEventRow)
  }

  async getLatestEvent(resourceId: string): Promise<PersistedTrustEvent | null> {
    const { data, error } = await this.client
      .from('ai_trust_events')
      .select('*')
      .eq('organization_id', this.organizationId)
      .eq('resource_id', resourceId)
      .order('sequence_number', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw normalizeSupabaseError(error, 'get_latest_event')
    return data ? fromTrustEventRow(data as AiTrustEventRow) : null
  }

  async appendDecision(decision: PersistedTrustDecision): Promise<PersistedTrustDecision> {
    const { error } = await this.client.from('ai_trust_decisions').insert({
      ...toTrustDecisionRow(decision),
      organization_id: this.organizationId,
    })

    if (error) throw normalizeSupabaseError(error, 'append_decision')
    return structuredClone(decision)
  }

  async validateResourceChain(resourceId: string) {
    return validateTrustChain(await this.getEventsByResource(resourceId))
  }
}
