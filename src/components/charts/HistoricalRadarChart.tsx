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

interface HistoricalRadarChartProps {
  data: any[]
  config: any
  lines: string[]
}

export function HistoricalRadarChart({ data, config, lines }: HistoricalRadarChartProps) {
  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 600 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />

          {lines.map((key, index) => {
            const isCurrent = key === 'Atual'
            const colorConfig = config[key]
            const color = colorConfig?.color || `hsl(var(--chart-${index + 1}))`
            return (
              <Radar
                key={key}
                name={colorConfig?.label || key}
                dataKey={key}
                stroke={color}
                strokeWidth={isCurrent ? 2 : 2}
                strokeDasharray={isCurrent ? '0' : '5 5'}
                fill={color}
                fillOpacity={isCurrent ? 0.35 : 0.1}
              />
            )
          })}

          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
