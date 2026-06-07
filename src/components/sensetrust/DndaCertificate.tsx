import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, Copy, QrCode, ShieldCheck } from 'lucide-react'
import type { TrustCertificate } from '@/types/sense-trust'

const demoCertificate: TrustCertificate = {
  id: 'cert-demo-001',
  documentId: 'NS-2026-SP-000142',
  certificateNumber: 'ST-9F42A1B6',
  status: 'active',
  documentHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  versionLabel: 'v3',
  issuer: 'NeuroStrata SenseTrust Layer',
  verificationUrl: '/verify/demo-token-sensetrust',
  certificatePayload: { resourceType: 'Provenance' },
  issuedAt: new Date().toISOString(),
}

export function DndaCertificate({ certificate = demoCertificate }: { certificate?: TrustCertificate }) {
  const verifyUrl = certificate.verificationUrl ?? `/verify/${certificate.verificationTokenId ?? ''}`

  return (
    <Card className="overflow-hidden border shadow-sm">
      <CardHeader className="border-b bg-emerald-50/60">
        <CardTitle className="flex items-center justify-between gap-3 text-lg">
          <span className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            Certificado DNDA
          </span>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            {certificate.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 p-5 lg:grid-cols-[1fr_160px]">
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Numero" value={certificate.certificateNumber} />
            <Field label="Versao" value={certificate.versionLabel} />
            <Field label="Emissor" value={certificate.issuer} />
            <Field label="Emitido em" value={new Date(certificate.issuedAt).toLocaleString('pt-BR')} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Hash SHA-256 do documento
            </p>
            <p className="mt-1 break-all rounded-md border bg-slate-50 p-2 font-mono text-xs text-slate-700">
              {certificate.documentHash}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <Copy className="h-4 w-4" />
              Copiar hash
            </Button>
            <Button size="sm" variant="outline">
              <CheckCircle2 className="h-4 w-4" />
              Validar certificado
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center rounded-md border bg-white p-4">
          <QrCode className="h-24 w-24 text-slate-900" />
          <p className="mt-3 break-all text-center font-mono text-xs text-slate-500">{verifyUrl}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  )
}
