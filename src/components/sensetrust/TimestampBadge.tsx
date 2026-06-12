import { BadgeCheck, BadgeX, Clock3, FileX, RotateCcw, ShieldCheck, ShieldX } from 'lucide-react'
import type { SignatureStatus } from '@/types/sensetrust/signature-timestamp'

interface TimestampBadgeProps {
  status: SignatureStatus
}

const BADGE_META: Record<string, { label: string; className: string; icon: typeof BadgeCheck }> = {
  timestamped: { label: 'TIMESTAMPED', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: Clock3 },
  signed: { label: 'SIGNED', className: 'bg-sky-50 text-sky-700 ring-sky-200', icon: ShieldCheck },
  countersigned: { label: 'COUNTERSIGNED', className: 'bg-indigo-50 text-indigo-700 ring-indigo-200', icon: BadgeCheck },
  invalid_signature: { label: 'INVALID SIGNATURE', className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: BadgeX },
  invalid_timestamp: { label: 'INVALID TIMESTAMP', className: 'bg-red-50 text-red-800 ring-red-200', icon: ShieldX },
  revoked: { label: 'REVOKED', className: 'bg-rose-50 text-rose-800 ring-rose-200', icon: FileX },
  superseded: { label: 'SUPERSEDED', className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: RotateCcw },
}

export function TimestampBadge({ status }: TimestampBadgeProps) {
  const meta = BADGE_META[status] ?? {
    label: status.toUpperCase().replaceAll('_', ' '),
    className: 'bg-slate-50 text-slate-700 ring-slate-200',
    icon: Clock3,
  }
  const Icon = meta.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ring-1 ${meta.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  )
}
