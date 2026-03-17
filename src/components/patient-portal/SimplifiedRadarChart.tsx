import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

export function SimplifiedRadarChart({ data }: { data: any[] }) {
  return (
    <div className="h-[350px] w-full">
      <ChartContainer
        config={{
          baseline: { color: 'hsl(var(--muted-foreground))', label: 'Linha de Base' },
          current: { color: 'hsl(var(--primary))', label: 'Atual' },
        }}
        className="w-full h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Radar
              name="Linha de Base"
              dataKey="baseline"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.1}
              strokeDasharray="3 3"
            />
            <Radar
              name="Atual"
              dataKey="current"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
