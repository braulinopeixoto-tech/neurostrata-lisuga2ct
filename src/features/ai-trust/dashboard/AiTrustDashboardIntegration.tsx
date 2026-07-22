import { useCallback, useEffect, useMemo, useState } from 'react'
import { AlertCircle, Database, Fingerprint, Loader2, RefreshCw, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { PersistedTrustEvent } from '../repository/types'
import {
  createPreviewGatewayFromEnvironment,
  DEFAULT_PREVIEW_RESOURCE_ID,
  type PreviewGateway,
  type PreviewOrganizationContext,
  type PreviewSession,
} from '../preview/preview-gateway'

export interface AiTrustDashboardIntegrationProps {
  gateway?: PreviewGateway
}

function shorten(value: string | null | undefined): string {
  if (!value) return 'GENESIS'
  return value.length < 22 ? value : `${value.slice(0, 10)}…${value.slice(-8)}`
}

function StatusRow({
  label,
  value,
  mono = false,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-2 last:border-0">
      <span className="text-slate-500">{label}</span>
      <span className={mono ? 'font-mono text-xs font-semibold' : 'text-right font-semibold'}>
        {value}
      </span>
    </div>
  )
}

export function AiTrustDashboardIntegration({ gateway }: AiTrustDashboardIntegrationProps) {
  const resolution = useMemo(() => {
    try {
      return { gateway: gateway ?? createPreviewGatewayFromEnvironment(), configured: true }
    } catch {
      return { gateway: null, configured: false }
    }
  }, [gateway])
  const [session, setSession] = useState<PreviewSession | null>(null)
  const [organization, setOrganization] = useState<PreviewOrganizationContext | null>(null)
  const [events, setEvents] = useState<PersistedTrustEvent[]>([])
  const [chainValid, setChainValid] = useState<boolean | null>(null)
  const [isolationValid, setIsolationValid] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const refresh = useCallback(async () => {
    if (!resolution.gateway) {
      setError(true)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)
    try {
      const nextSession = await resolution.gateway.getSession()
      setSession(nextSession)
      if (!nextSession) {
        setOrganization(null)
        setEvents([])
        setChainValid(null)
        setIsolationValid(null)
        return
      }

      const nextOrganization = await resolution.gateway.resolveOrganization(nextSession.userId)
      const [chain, isolated] = await Promise.all([
        resolution.gateway.loadChain(nextOrganization, DEFAULT_PREVIEW_RESOURCE_ID),
        resolution.gateway.verifyCrossOrganizationIsolation(nextOrganization.organizationId),
      ])
      setOrganization(nextOrganization)
      setEvents(chain.events)
      setChainValid(chain.valid)
      setIsolationValid(isolated)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [resolution.gateway])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const appendSyntheticEvent = async () => {
    if (!resolution.gateway || !session || !organization) return
    setLoading(true)
    setError(false)
    try {
      await resolution.gateway.appendSyntheticEvent(
        organization,
        DEFAULT_PREVIEW_RESOURCE_ID,
        session.userId,
      )
      await refresh()
    } catch {
      setError(true)
      setLoading(false)
    }
  }

  const latestEvent = events.at(-1) ?? null
  const visibleEvents = events.slice(-6)

  return (
    <section className="space-y-4" aria-labelledby="ai-trust-dashboard-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
            Governança verificável
          </p>
          <h2 id="ai-trust-dashboard-title" className="mt-1 text-2xl font-black text-slate-950">
            AI Trust no NeuroStrata
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Evidência exclusivamente sintética no projeto autorizado de staging.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100">STAGING ONLY</Badge>
          <Badge variant="outline">SYNTHETIC</Badge>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" data-testid="ai-trust-dashboard-error">
          <AlertCircle />
          <AlertTitle>Estado AI Trust indisponível</AlertTitle>
          <AlertDescription>
            A evidência não pôde ser carregada. Nenhum detalhe de infraestrutura foi exposto.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 xl:grid-cols-[0.9fr_1.5fr_0.9fr]">
        <Card data-testid="ai-trust-status-card" className="border-emerald-200 bg-emerald-50/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldCheck className="h-5 w-5 text-emerald-700" /> Status AI Trust
            </CardTitle>
            <CardDescription>Contexto autenticado e isolamento.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <StatusRow label="Authentication" value={session ? 'AUTHENTICATED' : 'ANONYMOUS'} />
            <StatusRow
              label="Organization"
              value={organization ? shorten(organization.organizationId) : 'NOT_RESOLVED'}
              mono
            />
            <StatusRow
              label="Integrity"
              value={chainValid === null ? 'NOT_VALIDATED' : chainValid ? 'VALID' : 'INVALID'}
            />
            <StatusRow
              label="Cross-org"
              value={
                isolationValid === null
                  ? 'NOT_TESTED'
                  : isolationValid
                    ? 'DENIED_AS_EXPECTED'
                    : 'UNEXPECTED_ACCESS'
              }
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <Button size="sm" onClick={appendSyntheticEvent} disabled={loading || !organization}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Registrar evento
              </Button>
              <Button size="sm" variant="outline" onClick={refresh} disabled={loading}>
                <RefreshCw className="mr-2 h-4 w-4" /> Atualizar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card data-testid="synthetic-trust-timeline">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Fingerprint className="h-5 w-5 text-indigo-700" /> Timeline sintética
            </CardTitle>
            <CardDescription>Eventos append-only em ordem persistida.</CardDescription>
          </CardHeader>
          <CardContent>
            {visibleEvents.length === 0 ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-sm text-slate-500">
                {loading ? 'Carregando cadeia…' : 'Nenhum evento sintético disponível.'}
              </div>
            ) : (
              <ol className="space-y-3">
                {visibleEvents.map((event) => (
                  <li key={event.eventId} className="rounded-xl border bg-slate-50 p-3">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-slate-900">{event.eventType}</p>
                        <p className="mt-1 text-xs text-slate-500">
                          Actor {shorten(event.actorId)} · {event.occurredAt}
                        </p>
                      </div>
                      <Badge variant={event.status === 'VALID' ? 'default' : 'destructive'}>
                        {event.status}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </CardContent>
        </Card>

        <Card data-testid="trust-details-panel">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Database className="h-5 w-5 text-slate-700" /> Trust details
            </CardTitle>
            <CardDescription>Proveniência técnica mínima.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <StatusRow label="Resource" value={DEFAULT_PREVIEW_RESOURCE_ID} mono />
            <StatusRow label="Event count" value={String(events.length)} />
            <StatusRow label="Latest event" value={shorten(latestEvent?.eventId)} mono />
            <StatusRow
              label="Chain state"
              value={chainValid === null ? 'NOT_VALIDATED' : chainValid ? 'VALID' : 'INVALID'}
            />
            <StatusRow
              label="Repository"
              value={error ? 'ERROR' : resolution.configured ? 'READY' : 'NOT_CONFIGURED'}
            />
            <Button asChild variant="outline" className="mt-2 w-full">
              <Link to="/ai-trust-preview">Abrir diagnóstico técnico</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
