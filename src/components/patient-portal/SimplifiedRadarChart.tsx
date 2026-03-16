import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

interface SimplifiedRadarChartProps {
  data: { subject: string; baseline: number; current: number }[]
}

export function SimplifiedRadarChart({ data }: SimplifiedRadarChartProps) {
  const config = {
    baseline: { label: 'Linha de Base', color: 'hsl(var(--muted-foreground))' },
    current: { label: 'Estado Atual', color: 'hsl(var(--primary))' },
  }

  return (
    <ChartContainer config={config} className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

          <Radar
            name="Linha de Base"
            dataKey="baseline"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            fill="hsl(var(--muted-foreground))"
            fillOpacity={0.1}
          />
          <Radar
            name="Estado Atual"
            dataKey="current"
            stroke="hsl(var(--primary))"
            strokeWidth={3}
            fill="hsl(var(--primary))"
            fillOpacity={0.35}
          />

          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
