import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const migration = readFileSync(
  resolve(process.cwd(), 'supabase/migrations/20260722104500_ai_trust_org_scoped_append.sql'),
  'utf8',
).toLowerCase()

describe('AI Trust preview append isolation migration', () => {
  it('scopes both the advisory lock and latest event lookup to organization_id', () => {
    expect(migration).toContain("new.organization_id::text || ':' || new.resource_id")
    expect(migration).toContain('where organization_id = new.organization_id')
    expect(migration).toContain('and resource_id = new.resource_id')
  })

  it('does not contain destructive or historical rewrite operations', () => {
    expect(migration).not.toMatch(/\b(drop|truncate|delete|update)\b/)
    expect(migration).toContain('create or replace function public.ai_trust_validate_event_append')
  })
})
