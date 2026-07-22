import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  })
}

describe('canonical NeuroStrata AI Trust architecture', () => {
  it('contains exactly one browser Supabase client initialization', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const modules = walk(sourceRoot).filter(
      (file) =>
        /\.(ts|tsx)$/.test(file) &&
        !/\.test\.(ts|tsx)$/.test(file) &&
        !file.endsWith('lib\\supabase\\types.ts'),
    )
    const initializers = modules.flatMap((file) => {
      const matches = readFileSync(file, 'utf8').match(/\bcreateClient\s*(?:<[^>]+>)?\s*\(/g) ?? []
      return matches.map(() => relative(sourceRoot, file).replaceAll('\\', '/'))
    })

    expect(initializers).toEqual(['lib/supabase/client.ts'])
  })

  it('excludes PocketBase from source and package contracts', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const source = walk(sourceRoot)
      .filter((file) => /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n')
    const packageJson = readFileSync(resolve(process.cwd(), 'package.json'), 'utf8')

    expect(`${source}\n${packageJson}`).not.toMatch(/pocketbase/i)
  })

  it('keeps administrative credentials out of shipped frontend modules', () => {
    const sourceRoot = resolve(process.cwd(), 'src')
    const shippedSource = walk(sourceRoot)
      .filter((file) => /\.(ts|tsx)$/.test(file) && !/\.test\.(ts|tsx)$/.test(file))
      .map((file) => readFileSync(file, 'utf8'))
      .join('\n')

    expect(shippedSource).not.toMatch(/service[_-]?role|sb_secret_/i)
  })

  it('uses synthetic-only governed fixtures', () => {
    const fixtures = [
      'src/features/ai-trust/test-fixtures.ts',
      'src/features/ai-trust/repository/repository-test-fixtures.ts',
    ]
      .map((file) => readFileSync(resolve(process.cwd(), file), 'utf8'))
      .join('\n')

    expect(fixtures).toMatch(/SYNTHETIC_/)
    expect(fixtures).not.toMatch(/patient|diagnosis|eeg|medical_record|clinical_record/i)
  })

  it('preserves the canonical NeuroStrata, login and AI Trust routes', () => {
    const app = readFileSync(resolve(process.cwd(), 'src/App.tsx'), 'utf8')

    for (const route of [
      '/login',
      '/dashboard',
      '/patients',
      '/vitalstrata',
      '/ai-trust-preview',
    ]) {
      expect(app).toContain(`path="${route}"`)
    }
    expect(app).toContain('<RequireAuthenticatedStaging />')
  })
})
