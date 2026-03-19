import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  Legend,
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

  const metabolicChartData = useMemo(() => {
    return data.map((d) => ({
      displayDate: new Date(d.date).toLocaleDateString('pt-BR', {
        month: 'short',
        day: 'numeric',
      }),
      inflamacao: Math.round(Math.max(10, 80 - d.reserveScore * 0.5 + Math.random() * 10)),
      cortisol: Math.round(Math.max(20, 90 - d.metrics.stress * 0.6 + Math.random() * 5)),
      insulina: Math.round(Math.max(5, 60 - d.metrics.physiology * 0.4 + Math.random() * 5)),
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

      {/* Perfil Metabólico Chart */}
      <div className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm mt-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-800">
            Perfil Metabólico e Evolução Genética
          </h3>
          <p className="text-sm text-slate-500">
            Acompanhamento longitudinal dos biomarcadores sistêmicos correlacionados às variações
            funcionais.
          </p>
        </div>

        <div className="h-[280px] w-full">
          <ChartContainer
            config={{
              inflamacao: { label: 'Inflamação (PCR-us)', color: '#ef4444' }, // red-500
              cortisol: { label: 'Cortisol Salivar', color: '#f59e0b' }, // amber-500
              insulina: { label: 'Insulina', color: '#3b82f6' }, // blue-500
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={metabolicChartData}
                margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="displayDate"
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{
                    stroke: 'hsl(var(--muted-foreground))',
                    strokeWidth: 1,
                    strokeDasharray: '3 3',
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-border p-3 rounded-lg shadow-xl text-xs font-medium space-y-1">
                          <p className="font-bold text-slate-800 mb-2 border-b pb-1">
                            {payload[0].payload.displayDate}
                          </p>
                          {payload.map((entry: any, i) => (
                            <div key={i} className="flex justify-between gap-4">
                              <span style={{ color: entry.color }}>{entry.name}:</span>
                              <span className="font-bold text-slate-900">{entry.value}</span>
                            </div>
                          ))}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="inflamacao"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="cortisol"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="insulina"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    </div>
  )
}
