import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useReportStore from '@/stores/useReportStore'

export function TabBiomarkers() {
  const { data, updateData } = useReportStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 9: Análise Neurofisiológica</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.neurophysio}
            onChange={(e) => updateData({ neurophysio: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 10: Integração NeuroStrata</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.integration}
            onChange={(e) => updateData({ integration: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 11: Hipóteses Diagnósticas (DSM-5-TR)</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.hypotheses}
            onChange={(e) => updateData({ hypotheses: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 12: Plano de Intervenção</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.intervention}
            onChange={(e) => updateData({ intervention: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
