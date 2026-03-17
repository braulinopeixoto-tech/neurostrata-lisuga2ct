import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Brain, Network, Zap } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'

export function TabBiomarkers() {
  const { data, updateData } = useReportStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Zap className="w-4 h-4" /> 9. Avaliação Neurofisiológica (qEEG)
          </CardTitle>
          <CardDescription>Topografia, conectividade e assimetrias.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva os achados eletroencefalográficos quantitativos..."
            className="min-h-[150px]"
            value={data.neurophysio || ''}
            onChange={(e) => updateData({ neurophysio: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Network className="w-4 h-4" /> 10. Integração Neurofuncional
          </CardTitle>
          <CardDescription>Cruzamento das redes neurais com funções cognitivas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Descreva como os achados biológicos sustentam a queixa..."
            className="min-h-[150px]"
            value={data.integration || ''}
            onChange={(e) => updateData({ integration: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Brain className="w-4 h-4" /> 11. Hipóteses Biomédicas
          </CardTitle>
          <CardDescription>Processamento subjacente e neuroinflamação.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Registre hipóteses complementares (ex: eixo intestino-cérebro)..."
            className="min-h-[150px]"
            value={data.hypotheses || ''}
            onChange={(e) => updateData({ hypotheses: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2 text-primary">
            <Zap className="w-4 h-4" /> 12. Alvos para Intervenção
          </CardTitle>
          <CardDescription>Metas para neuromodulação e terapia.</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Defina os protocolos e áreas alvo para reabilitação..."
            className="min-h-[150px]"
            value={data.intervention || ''}
            onChange={(e) => updateData({ intervention: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
