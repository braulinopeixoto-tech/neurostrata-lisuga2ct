import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AiTrustDatabase } from '@/features/ai-trust/repository/database-types'
import type { Database } from './types'

export const AUTHORIZED_STAGING_PROJECT_REF = 'dujbstywpckdmnmfalbz'

export interface CanonicalSupabaseEnvironment {
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
}

export interface CanonicalSupabaseConfiguration {
  url: string
  anonKey: string
  projectRef: string
}

export function resolveCanonicalSupabaseConfiguration(
  environment: CanonicalSupabaseEnvironment,
): CanonicalSupabaseConfiguration {
  const url = environment.VITE_SUPABASE_URL?.trim()
  const anonKey = environment.VITE_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) throw new Error('AI_TRUST_STAGING_CONFIGURATION_MISSING')

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw new Error('AI_TRUST_STAGING_URL_INVALID')
  }

  const projectRef = parsed.hostname.split('.')[0]
  if (projectRef !== AUTHORIZED_STAGING_PROJECT_REF) {
    throw new Error('AI_TRUST_UNAUTHORIZED_SUPABASE_PROJECT')
  }

  return { url, anonKey, projectRef }
}

let canonicalClient: SupabaseClient<Database> | null = null

export function getCanonicalSupabaseClient(): SupabaseClient<Database> {
  if (canonicalClient) return canonicalClient

  const configuration = resolveCanonicalSupabaseConfiguration(
    import.meta.env as CanonicalSupabaseEnvironment,
  )
  canonicalClient = createClient<Database>(configuration.url, configuration.anonKey, {
    auth: {
      storage: globalThis.localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  return canonicalClient
}

function bindClientMember(client: SupabaseClient<Database>, property: PropertyKey) {
  const value = Reflect.get(client, property, client)
  return typeof value === 'function' ? value.bind(client) : value
}

// Lazy proxy preserves the existing import contract while deferring environment
// validation until the browser client is actually used. Every consumer reaches
// the same singleton created by getCanonicalSupabaseClient().
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get: (_target, property) => bindClientMember(getCanonicalSupabaseClient(), property),
})

export const aiTrustSupabase = supabase as unknown as SupabaseClient<AiTrustDatabase>
