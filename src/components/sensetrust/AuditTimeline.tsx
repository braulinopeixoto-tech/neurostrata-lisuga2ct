import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Download, Eye, FilePenLine, KeyRound, ShieldCheck } from 'lucide-react'
import type { AuditEvent } from '@/types/sense-trust'

const iconByAction: Record<string, typeof Eye> = {
  access: Eye,
  edit: FilePenLine,
  export: Download,
  signature: KeyRound,
  revocation: ShieldCheck,
  'clinical_commit.created': FilePenLine,
  'certificate.generated': ShieldCheck,
}

const demoEvents: AuditEvent[] = [
  {
    id: 'audit-demo-004',
    actor: 'Dra. Camila Rocha',
    action: 'certificate.generated',
    resource: 'trust_certificates/ST-9F42A1B6',
    reason: 'final_signature',
    fhirAuditEvent: { resourceType: 'AuditEvent' },
    previousEventHash: 'a4d2f4d8f7a5d09d5e9647e6c4f9b0e3c53b8011f86b08e6ad90c8c9d1e0b3aa',
    eventHash: 'f51c7d2dc1f6ef6d67bd9af12c29b3d5a18d3eb370d3f1e6bf6e59e0eea9f7f2',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'audit-demo-003',
    actor: 'Dr. Renato Alves',
    action: 'signature',
    resource: 'report_versions/NS-2026-SP-000142/v3',
    reason: 'reviewed_and_signed',
    fhirAuditEvent: { resourceType: 'AuditEvent' },
    previousEventHash: '7a7f92811f5f9f623b86a92c14f262f49f949f8f5a5e979f8a42e2f7e9b0613d',
    eventHash: 'a4d2f4d8f7a5d09d5e9647e6c4f9b0e3c53b8011f86b08e6ad90c8c9d1e0b3aa',
    createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
  },
  {
    id: 'audit-demo-002',
    actor: 'NeuroStrata Engine',
    action: 'clinical_commit.created',
    resource: 'clinical_commits/commit-8a2',
    reason: 'biomarker_reconciliation',
    fhirAuditEvent: { resourceType: 'AuditEvent' },
    previousEventHash: '1f2fd8a50fb2e812e64d2e2160d06f8ceca63f49f7d4a13ec8dc33210937b5a4',
    eventHash: '7a7f92811f5f9f623b86a92c14f262f49f949f8f5a5e979f8a42e2f7e9b0613d',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
]

export function AuditTimeline({ events = demoEvents }: { events?: AuditEvent[] }) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="border-b bg-slate-50/70">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-slate-700" />
          Timeline de Auditoria SenseTrust
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {events.map((event) => {
            const Icon = iconByAction[event.action] ?? Eye

            return (
              <div key={event.id} className="grid gap-3 p-4 sm:grid-cols-[32px_1fr_auto]">
                <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-white text-slate-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-slate-900">{event.action}</p>
                    <Badge variant="outline" className="bg-white text-slate-600">
                      {event.actor}
                    </Badge>
                  </div>
                  <p className="mt-1 break-all font-mono text-xs text-slate-500">
                    {event.resource}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{event.reason}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-medium text-slate-500">
                    {new Date(event.createdAt).toLocaleString('pt-BR')}
                  </p>
                  <p className="mt-2 break-all font-mono text-[11px] text-slate-400">
                    {event.eventHash.slice(0, 18)}...
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

