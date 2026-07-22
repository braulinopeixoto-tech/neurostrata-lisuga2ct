import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Brain, Loader2, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

const loginSchema = z.object({
  email: z.string().min(1, 'Informe o email autorizado.').email('Email inválido.'),
  password: z.string().min(1, 'Informe a senha de staging.'),
})

type LoginForm = z.infer<typeof loginSchema>

export function CanonicalLoginPage() {
  const { user, loading: sessionLoading, configurationError, signIn } = useAuth()
  const [submissionError, setSubmissionError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const requestedPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname
  const destination =
    requestedPath?.startsWith('/') && requestedPath !== '/login' ? requestedPath : '/dashboard'

  if (!sessionLoading && user) return <Navigate to={destination} replace />

  const onSubmit = async (values: LoginForm) => {
    setSubmitting(true)
    setSubmissionError(false)
    const { error } = await signIn(values.email, values.password)
    setSubmitting(false)
    if (error) {
      setSubmissionError(true)
      form.setValue('password', '')
      return
    }
    navigate(destination, { replace: true })
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#ecfdf5,_#f8fafc_45%,_#eef2ff)] px-4 py-10">
      <div className="mx-auto flex w-full max-w-md flex-col items-center">
        <div className="mb-7 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-xl">
            <Brain className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-950">NeuroStrata</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Clinical OS + AI Trust</p>
        </div>

        <div className="mb-4 flex flex-wrap justify-center gap-2">
          <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">STAGING ONLY</Badge>
          <Badge variant="outline">DADOS SINTÉTICOS</Badge>
        </div>

        <Card className="w-full border-slate-200 shadow-2xl shadow-slate-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <LockKeyhole className="h-5 w-5 text-emerald-700" /> Acesso interno
            </CardTitle>
            <CardDescription>Use somente uma identidade autorizada no staging.</CardDescription>
          </CardHeader>
          <CardContent>
            {configurationError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTitle>Configuração indisponível</AlertTitle>
                <AlertDescription>O ambiente de staging não está configurado.</AlertDescription>
              </Alert>
            )}
            {submissionError && (
              <Alert variant="destructive" className="mb-4" role="alert">
                <AlertTitle>Autenticação não concluída</AlertTitle>
                <AlertDescription>Verifique a identidade e tente novamente.</AlertDescription>
              </Alert>
            )}
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="staging-email">Email</Label>
                <Input
                  id="staging-email"
                  type="email"
                  autoComplete="username"
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="staging-password">Senha</Label>
                <Input
                  id="staging-password"
                  type="password"
                  autoComplete="current-password"
                  {...form.register('password')}
                />
                {form.formState.errors.password && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
              <Button
                className="w-full bg-emerald-700 hover:bg-emerald-800"
                disabled={submitting || configurationError}
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar no NeuroStrata
              </Button>
            </form>
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <span>Autenticação pública do staging com isolamento aplicado pelo banco.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
