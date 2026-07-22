import {
  AUTHORIZED_STAGING_PROJECT_REF,
  resolveCanonicalSupabaseConfiguration,
  type CanonicalSupabaseEnvironment,
  type CanonicalSupabaseConfiguration,
} from '@/lib/supabase/client'

export type PreviewEnvironment = CanonicalSupabaseEnvironment
export type PreviewClientConfiguration = CanonicalSupabaseConfiguration
export { AUTHORIZED_STAGING_PROJECT_REF }

export function resolvePreviewClientConfiguration(
  environment: PreviewEnvironment,
): PreviewClientConfiguration {
  return resolveCanonicalSupabaseConfiguration(environment)
}
