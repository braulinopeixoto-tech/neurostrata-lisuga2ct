import { AlertTriangle, BadgeCheck, FileClock, FilePenLine, FileX, ShieldAlert } from 'lucide-react'
import type { DocumentLifecycleStatus } from '@/types/sensetrust/document-state'

interface DocumentStateBadgeProps {
  status: DocumentLifecycleStatus
}

const BADGE_META: Record<string, { label: string; className: string; icon: typeof BadgeCheck }> = {
  active: { label: 'ACTIVE', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200', icon: BadgeCheck },
  amended: { label: 'AMENDED', className: 'bg-sky-50 text-sky-700 ring-sky-200', icon: FilePenLine },
  revoked: { label: 'REVOKED', className: 'bg-rose-50 text-rose-700 ring-rose-200', icon: FileX },
  expired: { label: 'EXPIRED', className: 'bg-amber-50 text-amber-700 ring-amber-200', icon: FileClock },
  superseded: { label: 'SUPERSEDED', className: 'bg-violet-50 text-violet-700 ring-violet-200', icon: AlertTriangle },
  invalid_integrity: { label: 'INVALID INTEGRITY', className: 'bg-red-50 text-red-800 ring-red-200', icon: ShieldAlert },
}

export function DocumentStateBadge({ status }: DocumentStateBadgeProps) {
  const meta = BADGE_META[status] ?? {
    label: status.toUpperCase().replaceAll('_', ' '),
    className: 'bg-slate-50 text-slate-700 ring-slate-200',
    icon: BadgeCheck,
  }
  const Icon = meta.icon

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-bold ring-1 ${meta.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  )
}
