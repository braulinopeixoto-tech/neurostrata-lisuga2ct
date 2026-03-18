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
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Bot, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function SimulationEngine({ record }: { record: VitalRecord | undefined }) {
  const [boost, setBoost] = useState(0)

  const projectionData = useMemo(() => {
    if (!record) return []
    const base = record.vitalScore
    const strain = record.proprietaryMetrics.strainIndex

    // Use strain to calculate drop
    const trendDrop = Math.max(5, strain * 0.2) // Drop increases with higher strain
    const maxGain = 25
    const interventionEffect = (boost / 100) * maxGain

    return [
      { day: 'Hoje', base: base, projected: base },
      {
        day: '30 Dias',
        base: base - trendDrop * 0.4,
        projected: base + interventionEffect * 0.3 - trendDrop * 0.2,
      },
      {
        day: '60 Dias',
        base: base - trendDrop * 0.8,
        projected: base + interventionEffect * 0.7 - trendDrop * 0.5,
      },
      {
        day: '90 Dias',
        base: base - trendDrop,
        projected: Math.min(100, base + interventionEffect),
      },
    ]
  }, [record, boost])

  if (!record) return null

  const isHighRisk =
    record.proprietaryMetrics.allostaticLoad > 60 || record.proprietaryMetrics.strainIndex > 60
  const confidence = 85

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <Card className="lg:col-span-1 shadow-sm border-t-4 border-t-accent">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bot className="w-5 h-5 text-accent" /> Simulação Preditiva
          </CardTitle>
          <CardDescription>
            Projeção de risco de recaída e cenários "what-if" para intervenções.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle
                className={isHighRisk ? 'text-rose-500 w-4 h-4' : 'text-amber-500 w-4 h-4'}
              />
              Risco de Queda na Reserva (90 dias)
            </h4>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={
                  isHighRisk
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }
              >
                {isHighRisk ? 'Alto' : 'Moderado'}
              </Badge>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                Confiança: {confidence}%
              </Badge>
            </div>
            <div className="bg-muted/30 p-3 rounded text-xs text-muted-foreground border">
              <strong className="text-slate-700 block mb-1">Fator Explicativo (AI):</strong>
              "Elevado Strain Index ({record.proprietaryMetrics.strainIndex}) associado a baixo
              score Contextual ({record.domains.contextual}), indicando esforço excessivo prolongado
              sob carga de estresse ambiental."
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex justify-between items-center text-sm font-medium">
              <span>Intensidade da Intervenção Simulada</span>
              <span className="text-accent">{boost}%</span>
            </div>
            <Slider value={[boost]} onValueChange={(v) => setBoost(v[0])} max={100} step={10} />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modela o impacto de aderência a protocolos de neuromodulação e ajustes
              metabólicos/contextuais sobre a curva de declínio natural.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Projeção de Janelas (30, 60 e 90 Dias)</CardTitle>
          <CardDescription>
            Comparativo entre a evolução natural do risco e o cenário com intervenção otimizada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full mt-4">
            <ChartContainer
              config={{
                base: {
                  label: 'Trajetória Natural (Sem Intervenção)',
                  color: 'hsl(var(--muted-foreground))',
                },
                projected: {
                  label: `Cenário Otimizado (${boost}%)`,
                  color: 'hsl(var(--primary))',
                },
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
                  <RechartsTooltip contentStyle={{ borderRadius: '8px' }} />
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
