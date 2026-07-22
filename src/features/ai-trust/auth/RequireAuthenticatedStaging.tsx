import { Loader2, ShieldAlert } from 'lucide-react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function RequireAuthenticatedStaging() {
  const { user, loading, configurationError } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50" role="status">
        <div className="text-center">
          <Loader2 className="mx-auto h-7 w-7 animate-spin text-emerald-700" />
          <p className="mt-3 text-sm font-medium text-slate-600">Restaurando sessão de staging</p>
        </div>
      </div>
    )
  }

  if (configurationError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
        <div className="max-w-lg rounded-xl border border-amber-200 bg-white p-6 text-amber-950">
          <ShieldAlert className="h-6 w-6" />
          <h1 className="mt-3 text-xl font-bold">Staging não configurado</h1>
          <p className="mt-2 text-sm">
            O preview exige a URL e a chave pública do projeto AI Trust de staging autorizado.
          </p>
        </div>
      </main>
    )
  }

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />

  return <Outlet />
}
