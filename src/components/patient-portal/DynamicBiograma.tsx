import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { BiogramaDataPoint } from '@/stores/useAppStore'
import { ChartContainer } from '@/components/ui/chart'
import { BiogramaDetailCard } from './BiogramaDetailCard'

interface Props {
  data: BiogramaDataPoint[]
}

export function DynamicBiograma({ data }: Props) {
  // Always default to the latest data point
  const [selectedIndex, setSelectedIndex] = useState<number>(data.length > 0 ? data.length - 1 : 0)

  // Memoize chart data to format dates nicely for the X-Axis
  const chartData = useMemo(() => {
    return data.map((d, index) => ({
      ...d,
      index,
      displayDate: new Date(d.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    }))
  }, [data])

  const selectedPoint = data[selectedIndex]

  if (!data || data.length === 0) {
    return (
      <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
        Nenhum dado biográfico disponível para renderização.
      </div>
    )
  }

  // Custom Active Dot to highlight the selected point on the timeline
  const CustomActiveDot = (props: any) => {
    const { cx, cy, payload } = props
    const isSelected = payload.index === selectedIndex
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={isSelected ? 8 : 4}
          fill="hsl(var(--primary))"
          stroke="#fff"
          strokeWidth={isSelected ? 3 : 2}
          className="transition-all duration-300"
        />
        {isSelected && (
          <circle
            cx={cx}
            cy={cy}
            r={14}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            opacity={0.5}
            className="animate-ping"
          />
        )}
      </g>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* The Longitudinal Scrubber (Chart) */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">Trajetória Longitudinal</h3>
          <p className="text-sm text-slate-500">
            Clique nos pontos do gráfico para inspecionar o estado detalhado da Reserva Funcional
            Humana naquele momento específico.
          </p>
        </div>

        <div className="h-[280px] w-full cursor-pointer">
          <ChartContainer
            config={{
              reserveScore: { label: 'Reserva Funcional', color: 'hsl(var(--primary))' },
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activePayload && e.activePayload.length > 0) {
                    const idx = e.activePayload[0].payload.index
                    setSelectedIndex(idx)
                  }
                }}
              >
                <defs>
                  <linearGradient id="colorReserve" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{
                    stroke: 'hsl(var(--muted-foreground))',
                    strokeWidth: 1,
                    strokeDasharray: '5 5',
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-800 text-white text-xs px-3 py-2 rounded-lg shadow-xl font-medium">
                          {payload[0].payload.displayDate}:{' '}
                          <span className="font-bold text-emerald-400">{payload[0].value}</span> pts
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reserveScore"
                  stroke="hsl(var(--primary))"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorReserve)"
                  activeDot={<CustomActiveDot />}
                  dot={<CustomActiveDot />}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* The Detail View for the selected point */}
      {selectedPoint && (
        <div key={selectedPoint.id} className="transition-all duration-500">
          <BiogramaDetailCard data={selectedPoint} />
        </div>
      )}
    </div>
  )
}
