import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(
  resolve(
    process.cwd(),
    'supabase/migrations/20260721190000_ai_trust_persistence_foundation.sql',
  ),
  'utf8',
)

describe('AI Trust local migration', () => {
  it('creates all governed tables without destructive operations', () => {
    for (const table of ['events', 'artifacts', 'decisions', 'policies', 'reviews']) {
      expect(migration).toContain(`create table public.ai_trust_${table}`)
    }
    expect(migration).not.toMatch(/\b(drop|truncate)\b/i)
  })

  it('enables RLS without creating a permissive remote policy', () => {
    expect(migration.match(/enable row level security/g)).toHaveLength(5)
    expect(migration).not.toMatch(/^create policy/im)
  })

  it('enforces immutable events and append-chain continuity', () => {
    expect(migration).toContain('ai_trust_events_reject_mutation')
    expect(migration).toContain('ai_trust_validate_event_append')
    expect(migration).toContain('previous hash does not match latest event')
  })
})
