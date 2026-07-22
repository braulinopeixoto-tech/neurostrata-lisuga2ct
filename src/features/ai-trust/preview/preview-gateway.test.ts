import type { SupabaseClient } from '@supabase/supabase-js'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import type { AiTrustDatabase } from '../repository/database-types'
import type { PersistedTrustEvent, TrustRepository } from '../repository/types'
import { createPersistedEvent } from '../repository/repository-test-fixtures'
import { resolvePreviewClientConfiguration } from './preview-client'
import { SupabasePreviewGateway } from './preview-gateway'

function createQueryableClient(result: { data: unknown; error: unknown }) {
  const query: Record<string, unknown> = {}
  for (const method of ['select', 'eq', 'neq', 'order', 'limit']) {
    query[method] = vi.fn(() => query)
  }
  query.maybeSingle = vi.fn().mockResolvedValue(result)
  query.then = (resolve: (value: unknown) => unknown) => Promise.resolve(result).then(resolve)
  const from = vi.fn(() => query)
  return { client: { from } as unknown as SupabaseClient<AiTrustDatabase>, query, from }
}

describe('SupabasePreviewGateway', () => {
  it('resolves organization context only from active authenticated membership data', async () => {
    const { client, query } = createQueryableClient({
      data: {
        organization_id: '00000000-0000-4000-8000-000000000123',
        member_role: 'MEMBER',
      },
      error: null,
    })
    const gateway = new SupabasePreviewGateway(client)

    await expect(gateway.resolveOrganization('synthetic-user')).resolves.toEqual({
      organizationId: '00000000-0000-4000-8000-000000000123',
      memberRole: 'MEMBER',
    })
    expect(query.eq).toHaveBeenCalledWith('user_id', 'synthetic-user')
    expect(query.eq).toHaveBeenCalledWith('status', 'ACTIVE')
  })

  it('appends the governed synthetic event through the injected repository', async () => {
    const appendEvent = vi.fn(async (event: PersistedTrustEvent) => event)
    const repository = {
      getLatestEvent: vi.fn().mockResolvedValue(null),
      appendEvent,
    } as unknown as TrustRepository
    const { client } = createQueryableClient({ data: [], error: null })
    const gateway = new SupabasePreviewGateway(client, {
      repositoryFactory: () => repository,
      now: () => new Date('2026-07-22T14:00:00.000Z'),
      randomUUID: () => '00000000-0000-4000-8000-000000000777',
    })

    const event = await gateway.appendSyntheticEvent(
      { organizationId: 'org-1', memberRole: 'MEMBER' },
      'skip-preview-demo-001',
      'synthetic-user',
    )

    expect(appendEvent).toHaveBeenCalledOnce()
    expect(event.eventType).toBe('PREVIEW_VALIDATION')
    expect(event.metadata).toEqual(
      expect.objectContaining({ environment: 'staging', synthetic: true, source: 'skip-preview' }),
    )
    expect(event.eventHash).toMatch(/^[a-f0-9]{64}$/)
  })

  it('retrieves and validates the resource chain through TrustRepository', async () => {
    const event = await createPersistedEvent()
    const repository = {
      getEventsByResource: vi.fn().mockResolvedValue([event]),
      validateResourceChain: vi.fn().mockResolvedValue({ valid: true, errors: [] }),
    } as unknown as TrustRepository
    const { client } = createQueryableClient({ data: [], error: null })
    const gateway = new SupabasePreviewGateway(client, { repositoryFactory: () => repository })

    await expect(
      gateway.loadChain({ organizationId: 'org-1', memberRole: 'MEMBER' }, event.resourceId),
    ).resolves.toEqual({ events: [event], valid: true, errors: [] })
  })

  it('reports cross-organization visibility as denied when RLS returns no rows', async () => {
    const { client, query } = createQueryableClient({ data: [], error: null })
    const gateway = new SupabasePreviewGateway(client)

    await expect(gateway.verifyCrossOrganizationIsolation('org-1')).resolves.toBe(true)
    expect(query.neq).toHaveBeenCalledWith('organization_id', 'org-1')
  })

  it('exposes no update or delete operation in the preview gateway', () => {
    const { client } = createQueryableClient({ data: [], error: null })
    const gateway = new SupabasePreviewGateway(client)

    expect('updateEvent' in gateway).toBe(false)
    expect('deleteEvent' in gateway).toBe(false)
  })

  it('accepts only the explicitly authorized Supabase staging project', () => {
    expect(() =>
      resolvePreviewClientConfiguration({
        VITE_SUPABASE_URL: 'https://production-example.supabase.co',
        VITE_SUPABASE_ANON_KEY: 'placeholder',
      }),
    ).toThrow('AI_TRUST_UNAUTHORIZED_SUPABASE_PROJECT')
  })

  it('contains no administrative credential reference in frontend preview modules', () => {
    const shippedModules = ['preview-client.ts', 'preview-gateway.ts', 'AiTrustPreviewPage.tsx']
      .map((file) => readFileSync(new URL(file, import.meta.url), 'utf8'))
      .join('\n')

    expect(shippedModules).not.toMatch(/service[_-]?role/i)
  })

  it('uses only the authorized anon-key environment contract in the shared browser client', () => {
    const browserClient = readFileSync(resolve(process.cwd(), 'src/lib/supabase/client.ts'), 'utf8')

    expect(browserClient).toContain('VITE_SUPABASE_ANON_KEY')
    expect(browserClient).not.toMatch(/VITE_SUPABASE_PUBLISHABLE_KEY|service[_-]?role/i)
  })
})
