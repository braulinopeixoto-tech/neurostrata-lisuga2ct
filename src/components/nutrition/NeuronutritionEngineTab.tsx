import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Brain, ArrowRight, Activity, Zap, Flame } from 'lucide-react'

export function NeuronutritionEngineTab() {
  const pathways = [
    {
      trigger: 'Baixo Aporte Proteico',
      triggerIcon: Zap,
      triggerColor: 'text-amber-500',
      mediator: 'Baixa Tirosina Plasmática',
      outcome: 'Queda de Dopamina (Falta de motivação e foco)',
      outcomeColor: 'text-rose-500',
    },
    {
      trigger: 'Disbiose Intestinal',
      triggerIcon: Activity,
      triggerColor: 'text-rose-500',
      mediator: 'Inflamação do Nervo Vago',
      outcome: 'Aumento da Ansiedade e Reatividade',
      outcomeColor: 'text-amber-500',
    },
    {
      trigger: 'Hiperglicemia Crônica',
      triggerIcon: Flame,
      triggerColor: 'text-red-500',
      mediator: 'Resistência à Insulina Cerebral',
      outcome: 'Déficit de Memória e Fadiga Mental (Brain Fog)',
      outcomeColor: 'text-purple-500',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-blue-500 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" /> Mapeamento de Vias (Nutriente-Cérebro)
          </CardTitle>
          <CardDescription>
            Como os gatilhos metabólicos impactam diretamente os neurotransmissores e as funções
            psíquicas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {pathways.map((path, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-slate-50 border rounded-xl relative overflow-hidden"
            >
              <div className="flex-1 text-center md:text-left">
                <div
                  className={`mx-auto md:mx-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border ${path.triggerColor}`}
                >
                  <path.triggerIcon className={`w-6 h-6 ${path.triggerColor}`} />
                </div>
                <h4 className="font-bold text-foreground">{path.trigger}</h4>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  Gatilho Nutricional
                </p>
              </div>

              <div className="flex flex-col items-center shrink-0">
                <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                <div className="bg-white border px-3 py-1.5 rounded-full text-xs font-semibold text-slate-600 my-2 md:my-0 shadow-sm z-10 relative">
                  {path.mediator}
                </div>
                <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block rotate-90 md:rotate-0" />
              </div>

              <div className="flex-1 text-center md:text-right">
                <div
                  className={`mx-auto md:ml-auto md:mr-0 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 border ${path.outcomeColor}`}
                >
                  <Brain className={`w-6 h-6 ${path.outcomeColor}`} />
                </div>
                <h4 className="font-bold text-foreground">{path.outcome}</h4>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  Impacto Neurofuncional
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
