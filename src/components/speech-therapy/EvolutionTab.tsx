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
import { TrendingUp } from 'lucide-react'

const EVOLUTION_DATA = [
  { month: 'Mês 1', comunicacao: 30, funcional: 40, testes: 35, qeeg: 20 },
  { month: 'Mês 2', comunicacao: 45, funcional: 45, testes: 40, qeeg: 35 },
  { month: 'Mês 3', comunicacao: 65, funcional: 60, testes: 55, qeeg: 50 },
  { month: 'Mês 4', comunicacao: 80, funcional: 75, testes: 70, qeeg: 75 },
]

export function EvolutionTab() {
  const chartConfig = {
    comunicacao: { label: 'Melhora na Comunicação', color: 'hsl(var(--chart-1))' },
    funcional: { label: 'Evolução Funcional', color: 'hsl(var(--chart-2))' },
    testes: { label: 'Desempenho em Testes', color: 'hsl(var(--chart-3))' },
    qeeg: { label: 'Mudanças no qEEG', color: 'hsl(var(--chart-4))' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> Monitoramento de Evolução
          </CardTitle>
          <CardDescription>
            Acompanhamento longitudinal das métricas de linguagem correlacionadas aos ganhos
            neurofisiológicos.
          </CardDescription>
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
                    name="Comunicação"
                    dataKey="comunicacao"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Funcional"
                    dataKey="funcional"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="Testes Padronizados"
                    dataKey="testes"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    name="qEEG / Neuroplasticidade"
                    dataKey="qeeg"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="mt-6 bg-slate-50 p-4 rounded-lg border text-sm text-slate-700">
            <strong>Síntese do Workflow Integrado:</strong> A curva demonstra o reflexo direto da
            neuromodulação (linha tracejada) acelerando os ganhos no desempenho da reabilitação
            fonoaudiológica tradicional a partir do Mês 2.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
