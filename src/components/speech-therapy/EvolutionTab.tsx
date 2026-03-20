import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
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
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { TrendingUp, Network } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

const EVOLUTION_DATA = [
  { month: 'Mês 1', comunicacao: 30, funcional: 40, testes: 35, vitalScore: 45 },
  { month: 'Mês 2', comunicacao: 45, funcional: 45, testes: 40, vitalScore: 55 },
  { month: 'Mês 3', comunicacao: 65, funcional: 60, testes: 55, vitalScore: 68 },
  { month: 'Mês 4', comunicacao: 80, funcional: 75, testes: 70, vitalScore: 82 },
]

export function EvolutionTab({ patientId }: { patientId: string }) {
  const { patients } = useAppStore()
  const patient = patients.find((p) => p.id === patientId)

  const chartConfig = {
    comunicacao: { label: 'Fluência Verbal', color: 'hsl(var(--chart-1))' },
    funcional: { label: 'Compreensão Funcional', color: 'hsl(var(--chart-2))' },
    testes: { label: 'Bateria Padronizada', color: 'hsl(var(--chart-3))' },
    vitalScore: { label: 'VitalScore Global', color: 'hsl(var(--primary))' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Monitoramento de Evolução
              </CardTitle>
              <CardDescription className="mt-1">
                Acompanhamento longitudinal das métricas de linguagem correlacionadas aos ganhos
                neurofisiológicos do <strong>VitalScore™</strong>.
              </CardDescription>
            </div>
            {patient && (
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {patient.name}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={EVOLUTION_DATA}
                  margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />

                  <Line
                    type="monotone"
                    name="Fluência Verbal"
                    dataKey="comunicacao"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Compreensão Funcional"
                    dataKey="funcional"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Bateria Padronizada"
                    dataKey="testes"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="VitalScore Global"
                    dataKey="vitalScore"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    strokeDasharray="5 5"
                    dot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="mt-6 flex gap-3 bg-indigo-50/50 p-4 rounded-lg border border-indigo-100 text-sm text-indigo-900">
            <Network className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Convergência Multi-Eixo:</strong> A curva demonstra o reflexo direto da
              neuromodulação global (VitalScore - linha tracejada) acelerando os ganhos no
              desempenho da reabilitação fonoaudiológica tradicional a partir do Mês 2.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
