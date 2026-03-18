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

export function PatientBiogramChart({
  data,
  showWearables = false,
}: {
  data: any[]
  showWearables?: boolean
}) {
  const config = {
    bemEstar: { label: 'Bem-estar Emocional', color: 'hsl(var(--chart-1))' },
    foco: { label: 'Foco e Cognição', color: 'hsl(var(--chart-2))' },
    energia: { label: 'Energia Vital', color: 'hsl(var(--chart-3))' },
    ...(showWearables && {
      sleep: { label: 'Qualidade do Sono (Wearable)', color: 'hsl(var(--chart-4))' },
      stress: { label: 'Nível de Stress (Wearable)', color: 'hsl(var(--chart-5))' },
    }),
  }

  return (
    <div className="h-[400px] w-full mt-4">
      <ChartContainer config={config} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
            <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />

            <Line
              type="monotone"
              name="Bem-estar"
              dataKey="bemEstar"
              stroke="var(--color-bemEstar)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
            />
            <Line
              type="monotone"
              name="Foco e Atenção"
              dataKey="foco"
              stroke="var(--color-foco)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
            />
            <Line
              type="monotone"
              name="Energia Vital"
              dataKey="energia"
              stroke="var(--color-energia)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
            />

            {showWearables && (
              <>
                <Line
                  type="monotone"
                  name="Qualidade do Sono"
                  dataKey="sleep"
                  stroke="var(--color-sleep)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
                />
                <Line
                  type="monotone"
                  name="Nível de Stress"
                  dataKey="stress"
                  stroke="var(--color-stress)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, strokeWidth: 2, fill: 'white' }}
                />
              </>
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
