import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Activity, TrendingUp } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'

export function TabEvolution() {
  const { data, updateData } = useReportStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Parecer de Evolução
          </CardTitle>
          <CardDescription>
            Síntese longitudinal para relatórios de acompanhamento contínuo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Histórico Evolutivo (Opcional)</Label>
            <Textarea
              placeholder="Descreva a progressão clínica desde a última avaliação..."
              className="min-h-[150px]"
            />
          </div>

          <div className="bg-muted/30 p-4 rounded-lg border border-dashed text-sm text-muted-foreground flex gap-3">
            <Activity className="w-5 h-5 shrink-0 text-accent" />
            <p>
              A inclusão de gráficos automáticos do Biograma Longitudinal pode ser configurada nas
              opções de exportação do PDF.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
