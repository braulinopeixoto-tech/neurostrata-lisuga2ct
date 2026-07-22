import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { AiTrustDatabase } from '../repository/database-types'

export const AUTHORIZED_STAGING_PROJECT_REF = 'dujbstywpckdmnmfalbz'

export interface PreviewEnvironment {
  VITE_SUPABASE_URL?: string
  VITE_SUPABASE_ANON_KEY?: string
}

export interface PreviewClientConfiguration {
  url: string
  anonKey: string
  projectRef: string
}

export function resolvePreviewClientConfiguration(
  environment: PreviewEnvironment,
): PreviewClientConfiguration {
  const url = environment.VITE_SUPABASE_URL?.trim()
  const anonKey = environment.VITE_SUPABASE_ANON_KEY?.trim()

  if (!url || !anonKey) {
    throw new Error('AI_TRUST_STAGING_CONFIGURATION_MISSING')
  }

  let hostname: string
  try {
    hostname = new URL(url).hostname
  } catch {
    throw new Error('AI_TRUST_STAGING_URL_INVALID')
  }

  const projectRef = hostname.split('.')[0]
  if (projectRef !== AUTHORIZED_STAGING_PROJECT_REF) {
    throw new Error('AI_TRUST_UNAUTHORIZED_SUPABASE_PROJECT')
  }

  return { url, anonKey, projectRef }
}

export function createPreviewSupabaseClient(
  configuration: PreviewClientConfiguration,
): SupabaseClient<AiTrustDatabase> {
  return createClient<AiTrustDatabase>(configuration.url, configuration.anonKey, {
    auth: {
      storage: globalThis.localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  })
}
