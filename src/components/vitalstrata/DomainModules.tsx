import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Brain, HeartPulse, Activity, Zap, Layers } from 'lucide-react'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function DomainModules({ record }: { record: VitalRecord | undefined }) {
  if (!record) return null

  const modules = [
    {
      id: 'neuro',
      name: 'Neurofuncional',
      icon: Brain,
      color: 'text-blue-500',
      bg: 'bg-blue-100',
      val: record.domains.neuro,
      desc: 'qEEG, coerência, frequência dominante',
    },
    {
      id: 'cognitive',
      name: 'Cognitivo-Comportamental',
      icon: Activity,
      color: 'text-purple-500',
      bg: 'bg-purple-100',
      val: record.domains.cognitive,
      desc: 'Atenção, memória, flexibilidade',
    },
    {
      id: 'emotional',
      name: 'Emocional-Regulatório',
      icon: HeartPulse,
      color: 'text-rose-500',
      bg: 'bg-rose-100',
      val: record.domains.emotional,
      desc: 'Estabilidade emocional, reatividade',
    },
    {
      id: 'metabolic',
      name: 'Metabólico-Energético',
      icon: Zap,
      color: 'text-emerald-500',
      bg: 'bg-emerald-100',
      val: record.domains.metabolic,
      desc: 'Nutrição, energia, inflamação',
    },
    {
      id: 'contextual',
      name: 'Contextual',
      icon: Layers,
      color: 'text-amber-500',
      bg: 'bg-amber-100',
      val: record.domains.contextual,
      desc: 'Ambiente, carga de estresse, sono',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {modules.map((m) => (
        <Card key={m.id} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-sm font-bold flex items-center gap-2">
                <m.icon className={`w-4 h-4 ${m.color}`} /> {m.name}
              </CardTitle>
              <span className={`font-black text-lg ${m.color}`}>{m.val}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{m.desc}</p>
          </CardHeader>
          <CardContent>
            <Progress
              value={m.val}
              className={`h-2 ${m.bg} [&>div]:bg-current [&>div]:${m.color}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
