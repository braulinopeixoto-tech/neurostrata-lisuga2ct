import { CheckCircle2 } from 'lucide-react'
import { CaseStatus } from '@/stores/useTeamFlowStore'

const PIPELINE_STAGES: CaseStatus[] = [
  'Triagem',
  'Coleta',
  'Análise Multidisciplinar',
  'Convergência',
  'Revisão Médica',
  'Laudo Validado',
]

export function CasePipeline({ currentStatus }: { currentStatus: CaseStatus }) {
  const currentIndex = PIPELINE_STAGES.indexOf(currentStatus)

  return (
    <div className="relative pt-4 pb-8 w-full overflow-x-auto hide-scrollbar">
      <div className="min-w-[600px] flex items-center justify-between relative px-4">
        {/* Background Track */}
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />

        {/* Progress Track */}
        <div
          className="absolute left-8 top-1/2 h-1 bg-indigo-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{ width: `calc(${(currentIndex / (PIPELINE_STAGES.length - 1)) * 100}% - 4rem)` }}
        />

        {PIPELINE_STAGES.map((stage, idx) => {
          const isPast = idx < currentIndex
          const isActive = idx === currentIndex

          return (
            <div key={stage} className="relative z-10 flex flex-col items-center gap-2 group w-24">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 scale-110 shadow-md'
                    : isPast
                      ? 'bg-indigo-200 text-indigo-700 border border-indigo-300'
                      : 'bg-white text-slate-400 border-2 border-slate-200'
                }`}
              >
                {isPast ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>
              <span
                className={`text-[10px] uppercase tracking-wider text-center font-bold transition-colors ${
                  isActive ? 'text-indigo-800' : isPast ? 'text-indigo-600/70' : 'text-slate-400'
                }`}
              >
                {stage}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
