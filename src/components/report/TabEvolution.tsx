import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import useReportStore from '@/stores/useReportStore'
import { HistoricalRadarChart } from '@/components/charts/HistoricalRadarChart'

export function TabEvolution() {
  const { data } = useReportStore()
  const [selectedDates, setSelectedDates] = useState<string[]>([])

  const chartData = useMemo(() => {
    return data.radarData.map((d, i) => {
      const row: any = { subject: d.subject, Atual: d.value }
      selectedDates.forEach((date) => {
        const hist = data.historicalAssessments.find((h) => h.date === date)
        if (hist) {
          row[date] = hist.radarData[i].value
        }
      })
      return row
    })
  }, [data, selectedDates])

  const colors = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
  ]

  const config = useMemo(() => {
    const cfg: any = {
      Atual: { label: 'Assinatura Atual', color: 'hsl(var(--primary))' },
    }
    selectedDates.forEach((date, i) => {
      cfg[date] = { label: `Baseline: ${date}`, color: colors[i % colors.length] }
    })
    return cfg
  }, [selectedDates])

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comparativo de Evolução Longitudinal</CardTitle>
          <CardDescription>
            Sobreponha a Assinatura Neurofuncional atual com avaliações históricas do paciente.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label>Selecione os baselines históricos para comparação (máx 2 recomendados):</Label>
            <ToggleGroup
              type="multiple"
              value={selectedDates}
              onValueChange={setSelectedDates}
              className="justify-start flex-wrap"
            >
              {data.historicalAssessments.map((hist) => (
                <ToggleGroupItem
                  key={hist.date}
                  value={hist.date}
                  className="border"
                  aria-label={`Select ${hist.date}`}
                >
                  {hist.date}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="h-[400px] w-full border rounded-xl p-4 bg-muted/5">
            <HistoricalRadarChart
              data={chartData}
              config={config}
              lines={['Atual', ...selectedDates]}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
