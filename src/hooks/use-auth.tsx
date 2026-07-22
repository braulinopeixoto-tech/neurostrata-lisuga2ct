import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

interface AuthContextType {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<{ error: Error | null }>
  loading: boolean
  configurationError: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

interface AuthProviderProps {
  children: ReactNode
  client?: SupabaseClient<Database>
}

function normalizeAuthError(error: unknown): Error {
  return error instanceof Error ? error : new Error('AI_TRUST_AUTH_OPERATION_FAILED')
}

export const AuthProvider = ({ children, client = supabase }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [configurationError, setConfigurationError] = useState(false)

  useEffect(() => {
    let active = true
    try {
      const {
        data: { subscription },
      } = client.auth.onAuthStateChange((_event, nextSession) => {
        if (!active) return
        setSession(nextSession)
        setUser(nextSession?.user ?? null)
        setLoading(false)
      })

      void client.auth
        .getSession()
        .then(({ data }) => {
          if (!active) return
          setSession(data.session)
          setUser(data.session?.user ?? null)
        })
        .catch(() => active && setConfigurationError(true))
        .finally(() => active && setLoading(false))

      return () => {
        active = false
        subscription.unsubscribe()
      }
    } catch {
      setConfigurationError(true)
      setLoading(false)
      return () => {
        active = false
      }
    }
  }, [client])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await client.auth.signInWithPassword({ email, password })
      return { error: error ? normalizeAuthError(error) : null }
    } catch (error) {
      return { error: normalizeAuthError(error) }
    }
  }
  const signOut = async () => {
    try {
      const { error } = await client.auth.signOut()
      return { error: error ? normalizeAuthError(error) : null }
    } catch (error) {
      return { error: normalizeAuthError(error) }
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, signIn, signOut, loading, configurationError }}>
      {children}
    </AuthContext.Provider>
  )
}
