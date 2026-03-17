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
import { LineChart as LineChartIcon } from 'lucide-react'

export function MetabolicStressTab() {
  const data = [
    { time: '08:00', glicemia: 85, energia: 80, evento: 'Café da Manhã' },
    { time: '10:00', glicemia: 110, energia: 90, evento: '' },
    { time: '12:00', glicemia: 90, energia: 70, evento: 'Almoço (Rico em HC)' },
    { time: '14:00', glicemia: 140, energia: 40, evento: 'Fadiga Pós-Prandial' },
    { time: '16:00', glicemia: 100, energia: 50, evento: '' },
    { time: '18:00', glicemia: 85, energia: 60, evento: 'Lanche Leve' },
    { time: '20:00', glicemia: 95, energia: 75, evento: '' },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-amber-500 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <LineChartIcon className="w-5 h-5 text-amber-500" /> Tracker de Estresse Metabólico e
            Energia
          </CardTitle>
          <CardDescription>
            Acompanhamento diário das variações de glicemia estimada vs. nível de energia mental
            (fadiga/brain fog).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ChartContainer
              config={{
                glicemia: { color: 'hsl(var(--destructive))', label: 'Glicemia Estimada (mg/dL)' },
                energia: { color: 'hsl(var(--success))', label: 'Nível de Energia Mental (%)' },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="time" tickLine={false} axisLine={false} dy={10} />
                  <YAxis
                    yAxisId="left"
                    tickLine={false}
                    axisLine={false}
                    dx={-10}
                    domain={[60, 160]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="glicemia"
                    name="Glicemia Estimada"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="energia"
                    name="Energia Mental"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground border">
            Nota-se uma clara correlação inversa às 14:00, onde o pico glicêmico induzido pelo
            almoço resulta em queda abrupta de energia (Fadiga Pós-Prandial).
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
