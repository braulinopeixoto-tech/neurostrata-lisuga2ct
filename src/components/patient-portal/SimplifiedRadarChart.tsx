import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface SimplifiedRadarChartProps {
  data: { subject: string; value: number }[]
}

export function SimplifiedRadarChart({ data }: SimplifiedRadarChartProps) {
  const config = {
    value: { label: 'Evolução (%)', color: 'hsl(var(--primary))' },
  }

  return (
    <ChartContainer config={config} className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Evolução"
            dataKey="value"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="hsl(var(--primary))"
            fillOpacity={0.35}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
