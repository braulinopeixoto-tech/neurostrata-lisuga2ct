import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const MENTAL_RADAR_DATA = [
  { subject: 'Atenção', A: 120, B: 110, fullMark: 150 },
  { subject: 'Memória', A: 98, B: 130, fullMark: 150 },
  { subject: 'Funções Executivas', A: 86, B: 130, fullMark: 150 },
  { subject: 'Linguagem', A: 99, B: 100, fullMark: 150 },
  { subject: 'Visuoespacial', A: 85, B: 90, fullMark: 150 },
  { subject: 'Regulação Emocional', A: 65, B: 85, fullMark: 150 },
]

export function MentalRadarChart() {
  const chartConfig = {
    A: { label: 'Paciente', color: 'hsl(var(--primary))' },
    B: { label: 'Referência', color: 'hsl(var(--muted-foreground))' },
  }

  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={MENTAL_RADAR_DATA}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} />
            <Radar
              name="Referência"
              dataKey="B"
              stroke="hsl(var(--muted-foreground))"
              fill="hsl(var(--muted-foreground))"
              fillOpacity={0.3}
            />
            <Radar
              name="Paciente"
              dataKey="A"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.6}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
