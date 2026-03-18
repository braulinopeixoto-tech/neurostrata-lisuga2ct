import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Bot, Lightbulb } from 'lucide-react'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function SimulationEngine({ record }: { record: VitalRecord | undefined }) {
  const [boost, setBoost] = useState(0)

  const projectionData = useMemo(() => {
    if (!record) return []
    const base = record.vitalScore
    // Simulate trend: if no intervention, it might drop slightly (e.g. -5 over 30 days)
    // With intervention (boost 0-100), it can increase up to +20 points
    const trendDrop = 5
    const maxGain = 20
    const interventionEffect = (boost / 100) * maxGain

    return [
      { day: 'Hoje', base: base, projected: base },
      {
        day: 'Dia 15',
        base: base - trendDrop * 0.5,
        projected: base + interventionEffect * 0.5 - trendDrop * 0.2,
      },
      {
        day: 'Dia 30',
        base: base - trendDrop,
        projected: Math.min(100, base + interventionEffect),
      },
    ]
  }, [record, boost])

  if (!record) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <Card className="lg:col-span-1 shadow-sm border-t-4 border-t-accent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" /> Parâmetros de Simulação
          </CardTitle>
          <CardDescription>
            Ajuste a intensidade da intervenção terapêutica para projetar cenários.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Intensidade da Intervenção</span>
              <span className="text-accent">{boost}%</span>
            </div>
            <Slider value={[boost]} onValueChange={(v) => setBoost(v[0])} max={100} step={10} />
            <p className="text-xs text-muted-foreground leading-relaxed mt-2">
              Modela o impacto de aderência a protocolos de neuromodulação e ajustes contextuais
              (sono, estresse).
            </p>
          </div>

          <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
            <h4 className="text-sm font-bold text-accent flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4" /> Insight Preditivo
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              Sem intervenção, a trajetória indica risco de queda de RFH (-5 pontos) em 30 dias. Com{' '}
              {boost}% de engajamento no protocolo sugerido, a projeção atinge{' '}
              {Math.round(projectionData[2]?.projected || 0)} pontos.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Projeção 30 Dias (What-If)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ChartContainer
              config={{
                base: { label: 'Trajetória Natural', color: 'hsl(var(--muted-foreground))' },
                projected: { label: 'Com Intervenção', color: 'hsl(var(--primary))' },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer>
                <LineChart
                  data={projectionData}
                  margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} dy={10} />
                  <YAxis
                    domain={['dataMin - 10', 'dataMax + 10']}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    type="monotone"
                    dataKey="base"
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    dot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
