import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Library, Activity, Sparkles, Clock, Info, HeartPulse } from 'lucide-react'
import useVitalStrataStore from '@/stores/useVitalStrataStore'

interface Props {
  patientId: string
}

export function InterventionsLibrary({ patientId }: Props) {
  const { protocols, appliedInterventions } = useVitalStrataStore()
  const [filter, setFilter] = useState<string>('All')

  const patientPlan = appliedInterventions.filter((i) => i.patientId === patientId)

  const filteredProtocols =
    filter === 'All' ? protocols : protocols.filter((p) => p.type === filter)

  const categories = ['All', 'Neuromodulation', 'Behavioral', 'Metabolic', 'Cognitive']

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Active Care Plan */}
      <Card className="shadow-sm border-t-4 border-t-indigo-500 bg-slate-50/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
            <HeartPulse className="w-5 h-5 text-indigo-500" /> Plano de Cuidados Ativo
          </CardTitle>
          <CardDescription>
            Intervenções atualmente em andamento e validadas pela Trust Layer™.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patientPlan.length === 0 ? (
            <div className="text-sm text-muted-foreground p-4 bg-white rounded-lg border border-dashed">
              Nenhuma intervenção ativa no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {patientPlan.map((plan) => {
                const protocol = protocols.find((p) => p.id === plan.protocolId)
                if (!protocol) return null
                return (
                  <Card key={plan.id} className="shadow-sm border-l-4 border-l-emerald-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-bold text-slate-800">{protocol.name}</h5>
                        <Badge className="bg-emerald-100 text-emerald-800 border-none">Ativo</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-[10px]">
                          {protocol.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {protocol.duration}
                        </span>
                      </div>
                      <div className="bg-slate-100 p-2 rounded text-xs text-slate-600 flex gap-2 items-start">
                        <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
                        <span>
                          <strong>Motivo:</strong> {plan.rationale}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Interventions Catalog */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
            <Library className="w-6 h-6 text-primary" /> Catálogo de Protocolos
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Badge
                key={cat}
                variant={filter === cat ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1 text-sm"
                onClick={() => setFilter(cat)}
              >
                {cat === 'All' ? 'Todos' : cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProtocols.map((protocol) => (
            <Card key={protocol.id} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-primary text-lg">{protocol.name}</h4>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {protocol.type}
                      </Badge>
                      <Badge variant="outline" className="text-slate-500">
                        Alvo: {protocol.targetDomain}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4 flex-1">{protocol.description}</p>
                <div className="space-y-2 mt-auto pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2 text-sm text-emerald-700">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      <strong>Impacto Esperado:</strong> {protocol.expectedOutcome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Activity className="w-4 h-4" />
                    <span>Duração Típica: {protocol.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
