import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { calculateTrustEventHash, canonicalize, sha256Hex } from '../hashing'
import type { AiTrustDatabase } from '../repository/database-types'
import { normalizeSupabaseError, TrustRepositoryError } from '../repository/errors'
import { SupabaseTrustRepository } from '../repository/supabase-trust-repository'
import type { PersistedTrustEvent, TrustRepository } from '../repository/types'
import {
  createPreviewSupabaseClient,
  resolvePreviewClientConfiguration,
  type PreviewEnvironment,
} from './preview-client'

export const DEFAULT_PREVIEW_RESOURCE_ID = 'skip-preview-demo-001'

export interface PreviewSession {
  userId: string
  email: string | null
}

export interface PreviewOrganizationContext {
  organizationId: string
  memberRole: 'MEMBER' | 'REVIEWER'
}

export interface PreviewChainResult {
  events: PersistedTrustEvent[]
  valid: boolean
  errors: string[]
}

export interface PreviewGateway {
  getSession(): Promise<PreviewSession | null>
  subscribeToSession(listener: (session: PreviewSession | null) => void): () => void
  signIn(email: string, password: string): Promise<PreviewSession>
  signOut(): Promise<void>
  resolveOrganization(userId: string): Promise<PreviewOrganizationContext>
  appendSyntheticEvent(
    organization: PreviewOrganizationContext,
    resourceId: string,
    actorId: string,
  ): Promise<PersistedTrustEvent>
  loadChain(
    organization: PreviewOrganizationContext,
    resourceId: string,
  ): Promise<PreviewChainResult>
  verifyCrossOrganizationIsolation(organizationId: string): Promise<boolean>
}

type RepositoryFactory = (
  client: SupabaseClient<AiTrustDatabase>,
  organizationId: string,
) => TrustRepository

export interface PreviewGatewayOptions {
  repositoryFactory?: RepositoryFactory
  now?: () => Date
  randomUUID?: () => string
}

function toPreviewSession(session: Session | null): PreviewSession | null {
  return session ? { userId: session.user.id, email: session.user.email ?? null } : null
}

export class SupabasePreviewGateway implements PreviewGateway {
  private readonly repositoryFactory: RepositoryFactory
  private readonly now: () => Date
  private readonly randomUUID: () => string

  constructor(
    private readonly client: SupabaseClient<AiTrustDatabase>,
    options: PreviewGatewayOptions = {},
  ) {
    this.repositoryFactory =
      options.repositoryFactory ??
      ((injectedClient, organizationId) =>
        new SupabaseTrustRepository(injectedClient, organizationId))
    this.now = options.now ?? (() => new Date())
    this.randomUUID = options.randomUUID ?? (() => globalThis.crypto.randomUUID())
  }

  async getSession(): Promise<PreviewSession | null> {
    const { data, error } = await this.client.auth.getSession()
    if (error) throw normalizeSupabaseError(error, 'preview_get_session')
    return toPreviewSession(data.session)
  }

  subscribeToSession(listener: (session: PreviewSession | null) => void): () => void {
    const { data } = this.client.auth.onAuthStateChange((_event, session) => {
      listener(toPreviewSession(session))
    })
    return () => data.subscription.unsubscribe()
  }

  async signIn(email: string, password: string): Promise<PreviewSession> {
    const { data, error } = await this.client.auth.signInWithPassword({ email, password })
    if (error) throw normalizeSupabaseError(error, 'preview_sign_in')
    const session = toPreviewSession(data.session)
    if (!session)
      throw new TrustRepositoryError('ACCESS_DENIED', 'preview_sign_in', 'Sign-in failed.')
    return session
  }

  async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut()
    if (error) throw normalizeSupabaseError(error, 'preview_sign_out')
  }

  async resolveOrganization(userId: string): Promise<PreviewOrganizationContext> {
    const { data, error } = await this.client
      .from('ai_trust_organization_memberships')
      .select('organization_id, member_role')
      .eq('user_id', userId)
      .eq('status', 'ACTIVE')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle()

    if (error) throw normalizeSupabaseError(error, 'preview_resolve_organization')
    if (!data) {
      throw new TrustRepositoryError(
        'ACCESS_DENIED',
        'preview_resolve_organization',
        'No active AI Trust organization membership is available.',
      )
    }

    return {
      organizationId: data.organization_id,
      memberRole: data.member_role,
    }
  }

  async appendSyntheticEvent(
    organization: PreviewOrganizationContext,
    resourceId: string,
    actorId: string,
  ): Promise<PersistedTrustEvent> {
    const repository = this.repositoryFactory(this.client, organization.organizationId)
    const latestEvent = await repository.getLatestEvent(resourceId)
    const occurredAt = this.now().toISOString()
    const eventId = this.randomUUID()
    const metadata = {
      environment: 'staging',
      synthetic: true,
      source: 'skip-preview',
      generatedAt: occurredAt,
      actorType: 'authenticated_user',
    }
    const artifactHash = await sha256Hex(
      canonicalize({ resourceId, eventType: 'PREVIEW_VALIDATION', metadata }),
    )
    const eventWithoutHash = {
      resourceId,
      eventId,
      eventType: 'PREVIEW_VALIDATION',
      occurredAt,
      actorId,
      artifact: {
        artifactId: `skip-preview-${eventId}`,
        artifactType: 'SYNTHETIC_PREVIEW_EVENT',
        sha256: artifactHash,
      },
      integrityPolicy: 'STRICT_HASH' as const,
      status: 'VALID' as const,
      decision: { outcome: 'ALLOW' as const, reasonCode: 'SYNTHETIC_PREVIEW_VALIDATION' },
      previousEventHash: latestEvent?.eventHash ?? null,
      metadata,
    }
    const event = {
      ...eventWithoutHash,
      eventHash: await calculateTrustEventHash(eventWithoutHash),
    }

    return repository.appendEvent(event)
  }

  async loadChain(
    organization: PreviewOrganizationContext,
    resourceId: string,
  ): Promise<PreviewChainResult> {
    const repository = this.repositoryFactory(this.client, organization.organizationId)
    const events = await repository.getEventsByResource(resourceId)
    const validation = await repository.validateResourceChain(resourceId)
    return { events, ...validation }
  }

  async verifyCrossOrganizationIsolation(organizationId: string): Promise<boolean> {
    const { data, error } = await this.client
      .from('ai_trust_events')
      .select('event_id')
      .neq('organization_id', organizationId)
      .limit(1)

    if (error) throw normalizeSupabaseError(error, 'preview_verify_cross_organization')
    return (data ?? []).length === 0
  }
}

export function createPreviewGatewayFromEnvironment(
  environment: PreviewEnvironment = import.meta.env as PreviewEnvironment,
): PreviewGateway {
  const configuration = resolvePreviewClientConfiguration(environment)
  return new SupabasePreviewGateway(createPreviewSupabaseClient(configuration))
}
