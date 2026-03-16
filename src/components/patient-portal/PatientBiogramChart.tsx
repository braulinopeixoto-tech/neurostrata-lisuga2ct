import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface PatientBiogramChartProps {
  data: any[]
}

export function PatientBiogramChart({ data }: PatientBiogramChartProps) {
  const config = {
    bemEstar: { label: 'Bem-estar Emocional', color: 'hsl(var(--chart-1))' },
    foco: { label: 'Foco e Atenção', color: 'hsl(var(--chart-2))' },
    energia: { label: 'Energia e Motivação', color: 'hsl(var(--chart-3))' },
  }

  return (
    <ChartContainer config={config} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
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
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line
            type="monotone"
            name="Bem-estar Emocional"
            dataKey="bemEstar"
            stroke="hsl(var(--chart-1))"
            strokeWidth={4}
            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            name="Foco e Atenção"
            dataKey="foco"
            stroke="hsl(var(--chart-2))"
            strokeWidth={4}
            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            name="Energia e Motivação"
            dataKey="energia"
            stroke="hsl(var(--chart-3))"
            strokeWidth={4}
            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
