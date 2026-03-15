import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const data = [
  { date: 'Jan', atencao: 45, memoria: 50, emocao: 30 },
  { date: 'Fev', atencao: 52, memoria: 55, emocao: 40 },
  { date: 'Mar', atencao: 58, memoria: 58, emocao: 55 },
  { date: 'Abr', atencao: 65, memoria: 62, emocao: 70 },
  { date: 'Mai', atencao: 75, memoria: 70, emocao: 82 },
]

export function EvolutionChart() {
  const config = {
    atencao: { label: 'Atenção', color: 'hsl(var(--chart-1))' },
    memoria: { label: 'Memória', color: 'hsl(var(--chart-2))' },
    emocao: { label: 'Reg. Emocional', color: 'hsl(var(--chart-3))' },
  }

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          <Line
            type="monotone"
            dataKey="atencao"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="memoria"
            stroke="hsl(var(--chart-2))"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="emocao"
            stroke="hsl(var(--chart-3))"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
