import { cleanup, render, screen, waitFor } from '@testing-library/react'
import type { Session, SupabaseClient } from '@supabase/supabase-js'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from '@/hooks/use-auth'
import type { Database } from '@/lib/supabase/types'
import { RequireAuthenticatedStaging } from './RequireAuthenticatedStaging'

function createSession(): Session {
  return {
    access_token: 'synthetic-access-token',
    refresh_token: 'synthetic-refresh-token',
    expires_in: 3600,
    token_type: 'bearer',
    user: {
      id: 'synthetic-user',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2026-07-22T12:00:00.000Z',
      email: 'synthetic@example.invalid',
    },
  }
}

function createAuthClient(session: Session | null) {
  const unsubscribe = vi.fn()
  const auth = {
    getSession: vi.fn().mockResolvedValue({ data: { session }, error: null }),
    onAuthStateChange: vi.fn(() => ({ data: { subscription: { unsubscribe } } })),
    signInWithPassword: vi.fn().mockResolvedValue({ data: { session }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
  }
  return {
    client: { auth } as unknown as SupabaseClient<Database>,
    auth,
    unsubscribe,
  }
}

function renderProtectedDashboard(client: SupabaseClient<Database>) {
  return render(
    <AuthProvider client={client}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <Routes>
          <Route path="/login" element={<div>Canonical login</div>} />
          <Route element={<RequireAuthenticatedStaging />}>
            <Route path="/dashboard" element={<div>Protected NeuroStrata dashboard</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>,
  )
}

afterEach(cleanup)

describe('canonical Supabase authentication flow', () => {
  it('restores an existing session and renders the protected NeuroStrata dashboard', async () => {
    const { client, auth } = createAuthClient(createSession())
    renderProtectedDashboard(client)

    await waitFor(() =>
      expect(screen.getByText('Protected NeuroStrata dashboard')).toBeInTheDocument(),
    )
    expect(auth.getSession).toHaveBeenCalledOnce()
    expect(auth.onAuthStateChange).toHaveBeenCalledOnce()
  })

  it('denies the dashboard to an anonymous session', async () => {
    const { client } = createAuthClient(null)
    renderProtectedDashboard(client)

    await waitFor(() => expect(screen.getByText('Canonical login')).toBeInTheDocument())
    expect(screen.queryByText('Protected NeuroStrata dashboard')).not.toBeInTheDocument()
  })
})
