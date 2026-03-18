import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function InteractiveBiogram({ records }: { records: VitalRecord[] }) {
  const chartData = [...records].reverse().map((r) => ({
    date: new Date(r.timestamp).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    score: r.vitalScore,
    source: r.source,
  }))

  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle>Biograma VitalStrata™ (Evolução Longitudinal)</CardTitle>
        <CardDescription>
          Histórico interativo da Reserva Funcional Humana (RFH). Nenhum dado é sobrescrito.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {chartData.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-lg">
            Sem dados longitudinais.
          </div>
        ) : (
          <div className="h-[400px] w-full mt-4">
            <ChartContainer
              config={{ score: { color: 'hsl(var(--primary))', label: 'VitalScore' } }}
              className="w-full h-full"
            >
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-slate-800 text-white p-3 rounded-lg shadow-xl text-sm">
                            <p className="font-bold mb-1">{data.date}</p>
                            <p>
                              VitalScore:{' '}
                              <span className="text-emerald-400 font-bold">{data.score}</span>
                            </p>
                            <p className="text-xs text-slate-300 mt-2">Fonte: {data.source}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
