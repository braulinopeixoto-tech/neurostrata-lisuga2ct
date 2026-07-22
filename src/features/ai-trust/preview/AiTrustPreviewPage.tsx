import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, CheckCircle2, Database, LockKeyhole, ShieldCheck } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { PersistedTrustEvent } from '../repository/types'
import {
  createPreviewGatewayFromEnvironment,
  DEFAULT_PREVIEW_RESOURCE_ID,
  type PreviewGateway,
  type PreviewOrganizationContext,
  type PreviewSession,
} from './preview-gateway'

export interface AiTrustPreviewPageProps {
  gateway?: PreviewGateway
}

function shortenIdentifier(value: string) {
  return value.length <= 12 ? value : `${value.slice(0, 8)}…${value.slice(-4)}`
}

function toSafeError(error: unknown) {
  return error instanceof Error ? error.message : 'AI_TRUST_PREVIEW_OPERATION_FAILED'
}

function PreviewConfigurationError({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-3xl py-8" data-testid="preview-configuration-error">
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Preview de staging indisponível</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}

function ConfiguredAiTrustPreviewPage({ gateway }: { gateway: PreviewGateway }) {
  const [session, setSession] = useState<PreviewSession | null>(null)
  const [organization, setOrganization] = useState<PreviewOrganizationContext | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resourceId, setResourceId] = useState(DEFAULT_PREVIEW_RESOURCE_ID)
  const [events, setEvents] = useState<PersistedTrustEvent[]>([])
  const [chainValid, setChainValid] = useState<boolean | null>(null)
  const [isolationValid, setIsolationValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const establishContext = useCallback(
    async (nextSession: PreviewSession | null) => {
      setSession(nextSession)
      setOrganization(null)
      setEvents([])
      setChainValid(null)
      setIsolationValid(null)
      if (!nextSession) return
      const nextOrganization = await gateway.resolveOrganization(nextSession.userId)
      setOrganization(nextOrganization)
      const result = await gateway.loadChain(nextOrganization, DEFAULT_PREVIEW_RESOURCE_ID)
      setEvents(result.events)
      setChainValid(result.valid)
    },
    [gateway],
  )

  useEffect(() => {
    let active = true
    const unsubscribe = gateway.subscribeToSession((nextSession) => {
      if (!active) return
      void establishContext(nextSession).catch((reason) => setError(toSafeError(reason)))
    })

    void gateway
      .getSession()
      .then((nextSession) => (active ? establishContext(nextSession) : undefined))
      .catch((reason) => active && setError(toSafeError(reason)))
      .finally(() => active && setLoading(false))

    return () => {
      active = false
      unsubscribe()
    }
  }, [establishContext, gateway])

  const run = async (operation: () => Promise<void>) => {
    setLoading(true)
    setError(null)
    try {
      await operation()
    } catch (reason) {
      setError(toSafeError(reason))
    } finally {
      setLoading(false)
    }
  }

  const signIn = () =>
    run(async () => {
      const nextSession = await gateway.signIn(email, password)
      await establishContext(nextSession)
      setPassword('')
    })

  const signOut = () =>
    run(async () => {
      await gateway.signOut()
      await establishContext(null)
    })

  const loadChain = () =>
    run(async () => {
      if (!organization) throw new Error('AI_TRUST_ORGANIZATION_CONTEXT_REQUIRED')
      const result = await gateway.loadChain(organization, resourceId)
      setEvents(result.events)
      setChainValid(result.valid)
    })

  const appendEvent = () =>
    run(async () => {
      if (!session || !organization) throw new Error('AI_TRUST_AUTHENTICATION_REQUIRED')
      await gateway.appendSyntheticEvent(organization, resourceId, session.userId)
      const result = await gateway.loadChain(organization, resourceId)
      setEvents(result.events)
      setChainValid(result.valid)
    })

  const verifyIsolation = () =>
    run(async () => {
      if (!organization) throw new Error('AI_TRUST_ORGANIZATION_CONTEXT_REQUIRED')
      setIsolationValid(await gateway.verifyCrossOrganizationIsolation(organization.organizationId))
    })

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12" data-testid="ai-trust-preview">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Internal AI Trust Engine
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">Skip Preview Validation</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Fluxo sintético autenticado para validar persistência, cadeia de integridade e
            isolamento.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500" aria-live="polite">
            {loading ? 'WORKING' : 'READY'}
          </span>
          <Badge className="w-fit bg-amber-100 text-amber-900 hover:bg-amber-100">
            STAGING ONLY
          </Badge>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" data-testid="preview-error">
          <AlertCircle />
          <AlertTitle>Operação não concluída</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LockKeyhole className="h-5 w-5" /> Autenticação e contexto
          </CardTitle>
          <CardDescription>Nenhuma credencial administrativa é usada no navegador.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs uppercase text-slate-500">Status</p>
              <p className="font-medium" data-testid="authentication-status">
                {session ? 'AUTHENTICATED' : 'ANONYMOUS'}
              </p>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs uppercase text-slate-500">Organization</p>
              <p className="font-mono text-sm" data-testid="organization-context">
                {organization ? shortenIdentifier(organization.organizationId) : 'NOT_RESOLVED'}
              </p>
            </div>
            <div className="rounded-lg border bg-slate-50 p-3">
              <p className="text-xs uppercase text-slate-500">Role</p>
              <p className="font-medium">{organization?.memberRole ?? 'NONE'}</p>
            </div>
          </div>

          {!session ? (
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <Input
                aria-label="Synthetic staging email"
                type="email"
                autoComplete="username"
                placeholder="synthetic@example.invalid"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                aria-label="Synthetic staging password"
                type="password"
                autoComplete="current-password"
                placeholder="Staging password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <Button onClick={signIn} disabled={loading || !email || !password}>
                Autenticar
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={signOut} disabled={loading}>
              Encerrar sessão sintética
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" /> Cadeia sintética
          </CardTitle>
          <CardDescription>
            Eventos append-only; nenhuma edição ou exclusão é exposta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            aria-label="Synthetic resource ID"
            value={resourceId}
            onChange={(event) => setResourceId(event.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={appendEvent} disabled={loading || !organization || !resourceId}>
              Append synthetic event
            </Button>
            <Button
              variant="outline"
              onClick={loadChain}
              disabled={loading || !organization || !resourceId}
            >
              Load chain
            </Button>
            <Button variant="outline" onClick={verifyIsolation} disabled={loading || !organization}>
              Verify RLS isolation
            </Button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-lg border p-4" data-testid="chain-status">
              <p className="text-xs uppercase text-slate-500">Chain integrity</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                {chainValid === true && <CheckCircle2 className="text-emerald-600" />}
                {chainValid === null ? 'NOT_VALIDATED' : chainValid ? 'VALID' : 'INVALID'}
              </p>
            </div>
            <div className="rounded-lg border p-4" data-testid="isolation-status">
              <p className="text-xs uppercase text-slate-500">Cross-organization visibility</p>
              <p className="mt-1 flex items-center gap-2 font-semibold">
                {isolationValid === true && <ShieldCheck className="text-emerald-600" />}
                {isolationValid === null
                  ? 'NOT_TESTED'
                  : isolationValid
                    ? 'DENIED_AS_EXPECTED'
                    : 'UNEXPECTED_ACCESS'}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold">Events ({events.length})</h2>
            {events.length === 0 ? (
              <p className="rounded-lg border border-dashed p-6 text-center text-sm text-slate-500">
                No synthetic events loaded.
              </p>
            ) : (
              <ul className="space-y-2" aria-label="Synthetic event chain">
                {events.map((event) => (
                  <li key={event.eventId} className="rounded-lg border bg-white p-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-semibold">{event.eventType}</span>
                      <Badge variant="outline">{event.status}</Badge>
                    </div>
                    <p className="mt-1 font-mono text-xs text-slate-500">
                      {shortenIdentifier(event.eventId)} · {event.occurredAt}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function AiTrustPreviewPage({ gateway }: AiTrustPreviewPageProps) {
  const resolution = useMemo(() => {
    try {
      return { gateway: gateway ?? createPreviewGatewayFromEnvironment(), error: null }
    } catch (error) {
      return { gateway: null, error: toSafeError(error) }
    }
  }, [gateway])

  return resolution.gateway ? (
    <ConfiguredAiTrustPreviewPage gateway={resolution.gateway} />
  ) : (
    <PreviewConfigurationError message={resolution.error ?? 'AI_TRUST_PREVIEW_NOT_CONFIGURED'} />
  )
}
