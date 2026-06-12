import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, FileSearch, LockKeyhole, QrCode, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { PublicVerificationPortalResult } from '@/types/sensetrust/public-verification-portal'
import { verifyPublicTokenExpanded } from '@/services/sensetrust/public-verification-portal-service'
import { PublicVerificationStatusCard } from './PublicVerificationStatusCard'

interface ExpandedPublicVerificationPortalProps {
  token?: string
}

export function ExpandedPublicVerificationPortal({ token }: ExpandedPublicVerificationPortalProps) {
  const [result, setResult] = useState<PublicVerificationPortalResult | null>(null)

  useEffect(() => {
    setResult(verifyPublicTokenExpanded(token))
  }, [token])

  if (!result) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="text-center">
          <FileSearch className="mx-auto h-12 w-12 animate-pulse text-emerald-700" />
          <p className="mt-4 text-sm font-semibold text-slate-700">Verificando portal publico SenseTrust</p>
        </div>
      </div>
    )
  }

  const { payload } = result

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">SenseTrust</h1>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Public verification portal
            </p>
          </div>
          <Button variant="ghost" asChild>
            <Link to="/">
              <ChevronLeft className="h-4 w-4" />
              Sair
            </Link>
          </Button>
        </div>

        <PublicVerificationStatusCard
          status={payload.verification_status}
          severity={payload.severity}
          message={payload.public_message}
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <PortalSection title="Estado documental" icon={<ShieldCheck className="h-4 w-4" />}>
            <SafeField label="document_state" value={payload.document_state} />
            <SafeField label="verification_status" value={payload.verification_status} />
            <SafeField label="superseded_by_document_id" value={payload.superseded_by_document_id ?? 'none'} />
          </PortalSection>

          <PortalSection title="Assinatura e timestamp" icon={<LockKeyhole className="h-4 w-4" />}>
            <SafeField label="signature_status" value={payload.signature_status} />
            <SafeField label="timestamp_status" value={payload.timestamp_status} />
            <SafeField label="issued_at" value={payload.issued_at || 'unavailable'} />
            <SafeField label="professional_role" value={payload.professional_role} />
            <SafeField label="institution_name" value={payload.institution_name} />
          </PortalSection>

          <PortalSection title="Integridade de emissao" icon={<ShieldCheck className="h-4 w-4" />}>
            <SafeField label="certificate_hash_partial" value={payload.public_hashes.certificate_hash_partial} />
            <SafeField label="emission_hash_partial" value={payload.public_hashes.emission_hash_partial} />
            <SafeField label="document_hash_partial" value={payload.public_hashes.document_hash_partial} />
          </PortalSection>

          <PortalSection title="Certificado / QR" icon={<QrCode className="h-4 w-4" />}>
            <SafeField label="token_status" value={payload.token_status} />
            <SafeField label="certificate_id" value={payload.certificate_id} />
            <SafeField label="emission_id" value={payload.emission_id} />
            <SafeField label="verified_at" value={payload.verified_at} />
          </PortalSection>
        </div>

        <section className="rounded-md border bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-slate-950">Aviso de seguranca</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{payload.safety_notice}</p>
          <div className="mt-4 rounded-md bg-slate-50 p-3 text-sm text-slate-700">
            Esta verificacao nao mostra nome de paciente, CPF, diagnostico, laudo, anamnese, qEEG, escalas,
            medicamentos, notas clinicas ou DNDA completo.
          </div>
        </section>

        <section className="rounded-md border bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-slate-950">Proxima acao publica segura</p>
          <div className="mt-3 grid gap-2">
            {payload.action_hints.map((hint) => (
              <div key={hint.action_id} className="rounded-md border bg-slate-50 p-3 text-sm font-semibold text-slate-800">
                {hint.label}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PortalSection({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-black text-slate-950">
        {icon}
        {title}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  )
}

function SafeField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-900">{value || 'unavailable'}</p>
    </div>
  )
}
