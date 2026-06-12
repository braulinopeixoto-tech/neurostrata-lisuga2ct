import { Fingerprint, LockKeyhole, ShieldCheck } from 'lucide-react'
import type { EmissionIntegrityObject, EmissionIntegrityValidationResult } from '@/types/sensetrust/signature-timestamp'
import { TimestampBadge } from './TimestampBadge'

interface SignatureIntegrityPanelProps {
  emission: EmissionIntegrityObject
  validation?: EmissionIntegrityValidationResult
}

export function SignatureIntegrityPanel({ emission, validation }: SignatureIntegrityPanelProps) {
  const valid = validation?.valid ?? emission.status === 'timestamped'

  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
            <Fingerprint className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">{emission.emission_id}</p>
            <p className="text-xs text-slate-500">SenseTrust simulated signature, timestamp and emission integrity</p>
          </div>
        </div>
        <TimestampBadge status={emission.status === 'timestamped' ? 'timestamped' : 'invalid_signature'} />
      </div>

      <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-3">
        <PanelField label="professional_role" value={emission.professional_signature.role} />
        <PanelField label="institution" value={emission.institutional_signature.institution_name} />
        <PanelField label="issued_at" value={emission.timestamp.issued_at} />
        <PanelField label="timestamp_mode" value={emission.timestamp.authority_mode} />
        <PanelField label="emission_hash" value={shortHash(emission.emission_hash)} />
        <PanelField label="document_state" value={emission.document_state} />
        <PanelField label="integrity_status" value={valid ? 'valid' : 'not_valid'} />
        <PanelField label="public_exposure" value={emission.public_exposure} />
        <PanelField label="certificate_id" value={emission.certificate_id} />
      </div>

      <div className="mt-3 flex items-start gap-2 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
        {valid ? (
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
        ) : (
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
        )}
        <p>
          Painel publico simulado: exibe apenas metadados de assinatura, timestamp e hash parcial.
          Nao exibe paciente, CPF, laudo, anamnese, qEEG, escalas, medicacoes ou documento completo.
        </p>
      </div>
    </section>
  )
}

function PanelField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-slate-50 p-2">
      <p className="font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 break-words font-mono text-slate-800">{value}</p>
    </div>
  )
}

function shortHash(hash: string) {
  return hash.length > 22 ? `${hash.slice(0, 18)}...` : hash
}
