import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { MENTAL_RADAR_DATA } from '@/lib/mock-data'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

export function MentalRadarChart() {
  const config = {
    A: { label: 'Linha de Base', color: 'hsl(var(--muted-foreground))' },
    B: { label: 'Estado Atual', color: 'hsl(var(--amber-500))' },
  }

  return (
    <ChartContainer config={config} className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={MENTAL_RADAR_DATA}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
          <Radar
            name="Linha de Base"
            dataKey="A"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={2}
            fill="hsl(var(--muted-foreground))"
            fillOpacity={0.2}
          />
          <Radar
            name="Estado Atual"
            dataKey="B"
            stroke="hsl(var(--amber-500))"
            strokeWidth={3}
            fill="hsl(var(--amber-500))"
            fillOpacity={0.5}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
