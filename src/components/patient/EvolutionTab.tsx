import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { EvolutionChart } from '@/components/charts/EvolutionChart'

export function EvolutionTab() {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evolução Longitudinal de Funções Psíquicas</CardTitle>
          <CardDescription>
            Acompanhamento quantitativo dos processos cognitivos e afetivos ao longo do tempo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EvolutionChart />
        </CardContent>
      </Card>
    </div>
  )
}
