import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, CheckCircle2, ChevronLeft, FileCheck2, ShieldAlert, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { verifyPublicCertificate, type PublicCertificatePayload } from '@/services/sensetrust/public-certificate-service'

interface PublicCertificateVerificationProps {
  token?: string
}

export function PublicCertificateVerification({ token }: PublicCertificateVerificationProps) {
  const [payload, setPayload] = useState<PublicCertificatePayload | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function verify() {
      setLoading(true)
      const result = token
        ? await verifyPublicCertificate(token)
        : {
            certificate_status: 'not_found' as const,
            document_id: 'unavailable',
            document_type: 'unavailable',
            document_version: 'unavailable',
            issued_at: '',
            issuer: 'NeuroStrata SenseTrust Layer',
            verification_status: 'invalid' as const,
            hash_match: false,
            revocation_status: 'unknown' as const,
          }

      if (mounted) {
        setPayload(result)
        setLoading(false)
      }
    }

    verify()
    return () => {
      mounted = false
    }
  }, [token])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <FileCheck2 className="mx-auto h-12 w-12 animate-pulse text-emerald-700" />
          <p className="mt-4 text-sm font-semibold text-slate-700">Verificando certificado publico SenseTrust</p>
        </div>
      </div>
    )
  }

  const isValid = payload?.verification_status === 'valid' && payload.hash_match
  const isRevoked = payload?.verification_status === 'revoked' || payload?.revocation_status === 'revoked'

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">SenseTrust</h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Public certificate verification
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
              Sair
            </Link>
          </Button>
        </div>

        <Card className={`overflow-hidden border-t-4 shadow-sm ${isValid ? 'border-t-emerald-500' : 'border-t-amber-500'}`}>
          <CardHeader className={isValid ? 'bg-emerald-50' : 'bg-amber-50'}>
            <div className="flex items-center gap-3">
              <div className={`rounded-md p-3 ${isValid ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {isValid ? <ShieldCheck className="h-7 w-7" /> : <ShieldAlert className="h-7 w-7" />}
              </div>
              <div>
                <CardTitle className="text-slate-950">
                  {isValid ? 'Certificado publico valido' : isRevoked ? 'Certificado revogado' : 'Certificado nao validado'}
                </CardTitle>
                <p className="mt-1 text-sm text-slate-600">
                  Esta tela mostra somente metadados publicos e nao exibe conteudo clinico.
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <SafeField label="certificate_status" value={payload?.certificate_status} />
              <SafeField label="document_id" value={payload?.document_id} />
              <SafeField label="document_type" value={payload?.document_type} />
              <SafeField label="document_version" value={payload?.document_version} />
              <SafeField label="issued_at" value={payload?.issued_at} />
              <SafeField label="issuer" value={payload?.issuer} />
              <SafeField label="verification_status" value={payload?.verification_status} />
              <SafeField label="hash_match" value={String(Boolean(payload?.hash_match))} />
              <SafeField label="revocation_status" value={payload?.revocation_status} />
            </div>

            <div className="flex items-start gap-2 rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Dados sensiveis foram minimizados: esta pagina nao mostra nome, CPF, anamnese,
                EEG, escalas clinicas, hipotese diagnostica ou o PDF completo.
              </p>
            </div>

            {!isValid && (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-white p-3 text-sm text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Token inexistente, revogado, expirado ou hash divergente deve ser tratado como nao valido.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SafeField({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-md border bg-white p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">{value || 'unavailable'}</p>
    </div>
  )
}
