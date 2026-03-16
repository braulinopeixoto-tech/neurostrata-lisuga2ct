import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface DimensionalRadarChartProps {
  data: { subject: string; value: number }[]
}

export function DimensionalRadarChart({ data }: DimensionalRadarChartProps) {
  const config = {
    value: { label: 'Intensidade (%)', color: 'hsl(var(--primary))' },
  }

  return (
    <ChartContainer config={config} className="h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Intensidade"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fill="hsl(var(--primary))"
            fillOpacity={0.35}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
