import { GitCommit, ShieldCheck } from 'lucide-react'
import type { ClinicalCommit, ClinicalCommitChainValidationResult } from '@/types/sensetrust/clinical-commit-chain'

interface ClinicalCommitTimelineProps {
  commits: ClinicalCommit[]
  validation?: ClinicalCommitChainValidationResult
}

export function ClinicalCommitTimeline({ commits, validation }: ClinicalCommitTimelineProps) {
  const resultByCommit = new Map(validation?.results.map((result) => [result.commit_id, result]))

  return (
    <div className="space-y-3">
      {commits.map((commit) => {
        const integrity = resultByCommit.get(commit.commit_id)
        const valid = !integrity || (integrity.valid_hash && integrity.valid_parent && integrity.valid_previous_hash)

        return (
          <article key={commit.commit_id} className="rounded-md border bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-emerald-50 p-2 text-emerald-700">
                  <GitCommit className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    #{commit.sequence} {commit.commit_type}
                  </p>
                  <p className="text-xs text-slate-500">{commit.reason}</p>
                </div>
              </div>
              <div className={`rounded-md px-2 py-1 text-xs font-bold ${valid ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                {valid ? 'integrity ok' : 'integrity issue'}
              </div>
            </div>

            <div className="mt-4 grid gap-3 text-xs sm:grid-cols-2 lg:grid-cols-3">
              <TimelineField label="status" value={commit.status} />
              <TimelineField label="actor_role" value={commit.actor.role} />
              <TimelineField label="created_at" value={commit.created_at} />
              <TimelineField label="parent_commit_id" value={commit.parent_commit_id ?? 'none'} />
              <TimelineField label="current_hash" value={shortHash(commit.current_hash)} />
              <TimelineField label="previous_hash" value={commit.previous_hash ? shortHash(commit.previous_hash) : 'none'} />
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-md bg-slate-50 p-3 text-xs text-slate-600">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
              <p>
                Timeline simulada: exibe somente metadados de versao, autoria e integridade.
                Nao exibe anamnese, EEG, escalas, hipotese diagnostica ou conteudo do relatorio.
              </p>
            </div>
          </article>
        )
      })}
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
