import { useMemo } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { MATRIX_DOMAINS } from '@/lib/matrix-data'
import { cn } from '@/lib/utils'

interface NeurofunctionalMatrixProps {
  phaseIndex: number
  highlightedDomainId?: string | null
}

export function NeurofunctionalMatrix({
  phaseIndex,
  highlightedDomainId,
}: NeurofunctionalMatrixProps) {
  // Generates a mock score to simulate transitions from distress to adaptive states
  const getScore = (domainIdx: number, stateIndex: number, phase: number) => {
    // Top 5 states are adaptive, bottom 5 are distress
    const isAdaptive = stateIndex < 5

    // Base targets
    const baseAdaptive = 20
    const baseDistress = 80
    const finalAdaptive = 85
    const finalDistress = 15

    // Interpolate based on timeline phase (0 to 3)
    const progress = phase / 3
    const score = isAdaptive
      ? baseAdaptive + (finalAdaptive - baseAdaptive) * progress
      : baseDistress + (finalDistress - baseDistress) * progress

    // Small deterministic noise for natural variance
    const noise = ((domainIdx * 7 + stateIndex * 3) % 15) - 7
    return Math.min(100, Math.max(0, score + noise))
  }

  const getColorClass = (score: number) => {
    if (score < 20) return 'bg-slate-100 border-slate-200'
    if (score < 40) return 'bg-indigo-200 border-indigo-300'
    if (score < 60) return 'bg-indigo-400 border-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]'
    if (score < 80) return 'bg-violet-600 border-violet-700 shadow-[0_0_15px_rgba(124,58,237,0.6)]'
    return 'bg-fuchsia-700 border-fuchsia-800 shadow-[0_0_20px_rgba(162,28,175,0.8)]'
  }

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="grid grid-cols-8 gap-3 min-w-[768px]">
        {MATRIX_DOMAINS.map((domain, dIdx) => (
          <div
            key={domain.id}
            className={cn(
              'flex flex-col gap-1.5 transition-all duration-300 rounded-lg',
              highlightedDomainId === domain.id
                ? 'ring-4 ring-primary ring-offset-2 scale-[1.02] bg-slate-50 z-10'
                : 'opacity-90 hover:opacity-100',
              highlightedDomainId && highlightedDomainId !== domain.id && 'opacity-40 grayscale',
            )}
          >
            <div className="h-12 px-1 text-center">
              <h4 className="text-[11px] font-bold text-slate-800 leading-tight line-clamp-2 uppercase tracking-tight">
                {domain.name}
              </h4>
            </div>

            <div className="flex flex-col gap-1 px-1">
              {domain.states.map((state, sIdx) => {
                const score = getScore(dIdx, sIdx, phaseIndex)
                return (
                  <TooltipProvider key={state.id} delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={cn(
                            'w-full aspect-square rounded cursor-pointer border transition-all duration-700 hover:scale-110 relative',
                            getColorClass(score),
                          )}
                        />
                      </TooltipTrigger>
                      <TooltipContent
                        side="right"
                        className="p-4 w-64 shadow-xl border-border bg-white text-slate-900"
                      >
                        <div className="space-y-3">
                          <div className="border-b pb-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                              Estado Funcional {state.id}
                            </span>
                            <p className="font-bold text-base capitalize mt-0.5">{state.name}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-primary">{domain.name}</p>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              <strong>Circuitos envolvidos:</strong> {domain.circuits}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-2 rounded border flex items-center justify-between">
                            <span className="text-xs font-medium">Nível de Ativação</span>
                            <span className="text-sm font-mono font-bold">
                              {Math.round(score)}%
                            </span>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
