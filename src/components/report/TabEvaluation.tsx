import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Brain, Activity, Target, Network } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'

export function TabEvaluation() {
  const { data, updateData } = useReportStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Brain className="w-4 h-4" /> 5. Testes Cognitivos e Psicométricos
          </CardTitle>
          <CardDescription>Resultados de baterias padronizadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva os escores e percentis obtidos..."
            className="min-h-[150px]"
            value={data.cognitive || ''}
            onChange={(e) => updateData({ cognitive: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Activity className="w-4 h-4" /> 6. Matriz RDoC (NIMH)
          </CardTitle>
          <CardDescription>Classificação transdiagnóstica em domínios.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Valência negativa, sistemas cognitivos, etc..."
            className="min-h-[150px]"
            value={data.rdoc || ''}
            onChange={(e) => updateData({ rdoc: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Network className="w-4 h-4" /> 7. Perfil de Personalidade (Big Five)
          </CardTitle>
          <CardDescription>Mapeamento de traços e tendências comportamentais.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Neuroticismo, Abertura, etc..."
            className="min-h-[150px]"
            value={data.bigFive || ''}
            onChange={(e) => updateData({ bigFive: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Target className="w-4 h-4" /> 8. 18 Funções Psíquicas Básicas
          </CardTitle>
          <CardDescription>
            Qualificação do estado mental atual (Senso-percepção, Atenção...).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Detalhe a integridade de cada função..."
            className="min-h-[150px]"
            value={data.psychicFunc || ''}
            onChange={(e) => updateData({ psychicFunc: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
