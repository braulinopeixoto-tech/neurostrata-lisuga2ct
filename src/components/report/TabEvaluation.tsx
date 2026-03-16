import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useReportStore from '@/stores/useReportStore'

export function TabEvaluation() {
  const { data, updateData } = useReportStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 5: Avaliação Cognitiva</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.cognitive}
            onChange={(e) => updateData({ cognitive: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 6: Análise RDoC</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.rdoc}
            onChange={(e) => updateData({ rdoc: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 7: Perfil Big Five</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.bigFive}
            onChange={(e) => updateData({ bigFive: e.target.value })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 8: 18 Funções Psíquicas</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[100px]"
            value={data.psychicFunc}
            onChange={(e) => updateData({ psychicFunc: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
