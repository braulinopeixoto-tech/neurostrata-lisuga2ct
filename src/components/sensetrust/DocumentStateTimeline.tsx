import { GitCommit, LockKeyhole, ShieldCheck } from 'lucide-react'
import type { DocumentStateTransition } from '@/types/sensetrust/document-state'
import { DocumentStateBadge } from './DocumentStateBadge'

interface DocumentStateTimelineProps {
  transitions: DocumentStateTransition[]
}

export function DocumentStateTimeline({ transitions }: DocumentStateTimelineProps) {
  return (
    <div className="space-y-3">
      {transitions.map((transition) => (
        <article key={transition.transition_id} className="rounded-md border bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-md bg-slate-100 p-2 text-slate-700">
                <GitCommit className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-950">{transition.transition_type}</p>
                <p className="text-xs text-slate-500">{transition.reason.public_reason}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DocumentStateBadge status={transition.previous_status} />
              <span className="text-xs font-semibold text-slate-400">to</span>
              <DocumentStateBadge status={transition.next_status} />
            </div>
          </div>

          <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-3">
            <TimelineField label="created_at" value={transition.created_at} />
            <TimelineField label="actor" value={`${transition.actor.display_name} / ${transition.actor.role}`} />
            <TimelineField label="commit_id" value={transition.clinical_commit_id} />
            <TimelineField label="transition_hash" value={shortHash(transition.transition_hash)} />
            <TimelineField label="terminal" value={transition.terminal ? 'yes' : 'no'} />
            <TimelineField label="certificate_id" value={transition.certificate_id} />
          </div>

          <div className="mt-3 flex items-start gap-2 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
            {transition.terminal ? (
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
            ) : (
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            )}
            <p>
              Linha do tempo documental simulada: mostra apenas estado, commit, ator tecnico e hashes parciais.
              Motivo privado e conteudo clinico nao sao exibidos.
            </p>
          </div>
        </article>
      ))}
    </div>
  )
}

function TimelineField({ label, value }: { label: string; value: string }) {
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
