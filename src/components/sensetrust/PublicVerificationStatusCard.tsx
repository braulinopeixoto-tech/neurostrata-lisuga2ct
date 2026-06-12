import { AlertTriangle, BadgeCheck, Ban, FileClock, FilePenLine, FileX, RotateCcw, ShieldX } from 'lucide-react'
import type { PublicVerificationSeverity, PublicVerificationStatus } from '@/types/sensetrust/public-verification-portal'

interface PublicVerificationStatusCardProps {
  status: PublicVerificationStatus
  severity: PublicVerificationSeverity
  message: string
}

const STATUS_META: Record<PublicVerificationStatus, { label: string; icon: typeof BadgeCheck }> = {
  verified_active: { label: 'DOCUMENTO VERIFICAVEL', icon: BadgeCheck },
  verified_amended: { label: 'DOCUMENTO COM ADENDO', icon: FilePenLine },
  verified_revoked: { label: 'DOCUMENTO REVOGADO', icon: FileX },
  verified_expired: { label: 'DOCUMENTO EXPIRADO', icon: FileClock },
  verified_superseded: { label: 'DOCUMENTO SUBSTITUIDO', icon: RotateCcw },
  invalid_integrity: { label: 'INTEGRIDADE INVALIDA', icon: ShieldX },
  invalid_token: { label: 'TOKEN INVALIDO', icon: Ban },
  unavailable: { label: 'VERIFICACAO INDISPONIVEL', icon: AlertTriangle },
  simulated_only: { label: 'SIMULADO APENAS', icon: AlertTriangle },
}

const SEVERITY_CLASS: Record<PublicVerificationSeverity, string> = {
  success: 'border-t-emerald-500 bg-emerald-50 text-emerald-900',
  warning: 'border-t-amber-500 bg-amber-50 text-amber-900',
  danger: 'border-t-rose-500 bg-rose-50 text-rose-900',
  neutral: 'border-t-slate-400 bg-slate-50 text-slate-900',
  blocked: 'border-t-red-600 bg-red-50 text-red-900',
}

export function PublicVerificationStatusCard({ status, severity, message }: PublicVerificationStatusCardProps) {
  const meta = STATUS_META[status]
  const Icon = meta.icon

  return (
    <section className={`rounded-md border border-t-4 p-5 shadow-sm ${SEVERITY_CLASS[severity]}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-white/70 p-2">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black tracking-wide">{meta.label}</p>
          <p className="mt-1 text-sm leading-6">{message}</p>
        </div>
      </div>
    </section>
  )
}
