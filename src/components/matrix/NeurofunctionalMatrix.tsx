import { cn } from '@/lib/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Badge } from '@/components/ui/badge'

const MATRIX_DOMAINS = [
  { id: 'd1', name: 'Valência Negativa (Aversão/Medo)', baseColor: 'rose' },
  { id: 'd2', name: 'Valência Positiva (Recompensa)', baseColor: 'emerald' },
  { id: 'd3', name: 'Sistemas Cognitivos', baseColor: 'blue' },
  { id: 'd4', name: 'Processamento Social', baseColor: 'purple' },
  { id: 'd5', name: 'Alerta e Regulação', baseColor: 'amber' },
  { id: 'd6', name: 'Sensório-Motor', baseColor: 'slate' },
]

const MATRIX_STAGES = [
  { id: 's1', name: 'Patologia / Falha Aguda', score: 20 },
  { id: 's2', name: 'Vulnerabilidade / Instabilidade', score: 40 },
  { id: 's3', name: 'Regulação / Adaptação Base', score: 60 },
  { id: 's4', name: 'Performance Consolidada', score: 80 },
  { id: 's5', name: 'Alta Performance / Flow', score: 100 },
]

// Mock transitions representing a patient's journey across 4 phases (0 to 3)
const TRANSITIONS: Record<string, number[]> = {
  d1: [1, 2, 2, 3], // Starts at Vulnerability, ends at Regulation
  d2: [0, 1, 3, 3], // Starts at Pathology, jumps to Performance
  d3: [1, 1, 2, 4], // Cognition improves to Flow
  d4: [2, 2, 3, 4], // Social improves
  d5: [0, 2, 3, 3], // Alertness recovers
  d6: [2, 3, 3, 4], // Motor
}

export function NeurofunctionalMatrix({
  phaseIndex = 0,
  highlightedDomainId,
}: {
  phaseIndex: number
  highlightedDomainId?: string
}) {
  const getColorClass = (domainColor: string, isCurrentStage: boolean, isHighlighted: boolean) => {
    if (!isCurrentStage) return 'bg-muted/10 border-transparent text-muted-foreground/30'

    const intensity = isHighlighted ? '500' : '400'
    const bgOpacity = isHighlighted ? 'bg-opacity-20' : 'bg-opacity-10'
    const border = isHighlighted ? 'border-2' : 'border'

    switch (domainColor) {
      case 'rose':
        return `bg-rose-${intensity} ${bgOpacity} border-rose-${intensity} ${border} text-rose-700 shadow-sm font-bold`
      case 'emerald':
        return `bg-emerald-${intensity} ${bgOpacity} border-emerald-${intensity} ${border} text-emerald-700 shadow-sm font-bold`
      case 'blue':
        return `bg-blue-${intensity} ${bgOpacity} border-blue-${intensity} ${border} text-blue-700 shadow-sm font-bold`
      case 'purple':
        return `bg-purple-${intensity} ${bgOpacity} border-purple-${intensity} ${border} text-purple-700 shadow-sm font-bold`
      case 'amber':
        return `bg-amber-${intensity} ${bgOpacity} border-amber-${intensity} ${border} text-amber-700 shadow-sm font-bold`
      case 'slate':
        return `bg-slate-${intensity} ${bgOpacity} border-slate-${intensity} ${border} text-slate-700 shadow-sm font-bold`
      default:
        return 'bg-primary/10 border-primary text-primary'
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[800px] border rounded-lg bg-white overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-6 bg-muted/40 border-b divide-x">
          <div className="p-4 font-bold text-sm text-foreground flex items-center justify-center bg-muted/60">
            DOMÍNIOS FUNCIONAIS
          </div>
          {MATRIX_STAGES.map((stage) => (
            <div key={stage.id} className="p-4 text-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {stage.name}
              </h4>
              <div className="text-[10px] text-muted-foreground/70 mt-1 font-mono">
                Score: {stage.score}
              </div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="divide-y">
          {MATRIX_DOMAINS.map((domain) => {
            const currentStageIndex = TRANSITIONS[domain.id][phaseIndex]
            const isHighlighted = highlightedDomainId === domain.id

            return (
              <div
                key={domain.id}
                className={cn(
                  'grid grid-cols-6 divide-x transition-colors',
                  isHighlighted && 'bg-slate-50/80',
                )}
              >
                <div className="p-4 font-semibold text-sm text-slate-700 flex items-center justify-between">
                  <span>{domain.name}</span>
                  {isHighlighted && (
                    <Badge variant="outline" className="ml-2 scale-75 border-primary text-primary">
                      Alvo
                    </Badge>
                  )}
                </div>

                {MATRIX_STAGES.map((stage, idx) => {
                  const isCurrent = currentStageIndex === idx

                  return (
                    <div key={stage.id} className="p-3 flex items-center justify-center relative">
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div
                            className={cn(
                              'w-full h-full min-h-[48px] rounded-md flex items-center justify-center text-xs transition-all duration-500 cursor-pointer',
                              getColorClass(domain.baseColor, isCurrent, isHighlighted),
                            )}
                          >
                            {isCurrent ? 'Estado Atual' : ''}
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="space-y-2">
                            <h4 className="font-bold text-sm">{domain.name}</h4>
                            <p className="text-xs text-muted-foreground">Estágio: {stage.name}</p>
                            <p className="text-xs border-t pt-2 mt-2">
                              {isCurrent
                                ? 'Nesta fase, o paciente apresenta as características correspondentes a este estado neurofuncional, refletindo a eficácia da intervenção.'
                                : 'Estado não detectado nesta fase do tratamento.'}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
