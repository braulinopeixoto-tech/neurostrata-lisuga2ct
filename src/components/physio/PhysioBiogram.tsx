import { Patient } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from 'recharts'
import { CalendarDays } from 'lucide-react'

const mockLongitudinalData = [
  { date: 'Jan/25', bfsp: 75, event: 'Alta hospitalar' },
  { date: 'Fev/25', bfsp: 70, event: null },
  { date: 'Mar/25', bfsp: 62, event: 'Reagudização (Dor lombar)' },
  { date: 'Abr/25', bfsp: 65, event: null },
  { date: 'Mai/25', bfsp: 68, event: 'Fisioterapia intensiva' },
  { date: 'Jun/25', bfsp: 68, event: 'Avaliação Pericial Atual' },
]

export function PhysioBiogram({ patient }: { patient: Patient }) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-indigo-600" />
          Biograma Longitudinal Funcional
        </CardTitle>
        <CardDescription>
          Evolução do BFS-P (BioStrata Functional Score) ao longo do tempo
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[400px] w-full">
          <ChartContainer
            config={{
              bfsp: { label: 'BFS-P', color: 'hsl(var(--primary))' },
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockLongitudinalData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorBfsp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dx={-10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />

                <ReferenceLine
                  y={50}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{
                    position: 'insideTopLeft',
                    value: 'Limiar Crítico',
                    fill: '#ef4444',
                    fontSize: 10,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="bfsp"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorBfsp)"
                  activeDot={{ r: 8, strokeWidth: 0, fill: '#4f46e5' }}
                />

                {mockLongitudinalData.map(
                  (entry, index) =>
                    entry.event && (
                      <ReferenceDot
                        key={`dot-${index}`}
                        x={entry.date}
                        y={entry.bfsp}
                        r={6}
                        fill="#fff"
                        stroke="#f59e0b"
                        strokeWidth={3}
                      />
                    ),
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div className="mt-8 space-y-4">
          <h4 className="text-sm font-semibold text-slate-700 border-b pb-2">
            Eventos Críticos (Timeline)
          </h4>
          <div className="space-y-3">
            {mockLongitudinalData
              .filter((d) => d.event)
              .reverse()
              .map((d, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-16 text-sm font-medium text-slate-500 pt-0.5">{d.date}</div>
                  <div className="flex-1 pb-4 border-l-2 border-indigo-100 pl-4 relative">
                    <div className="absolute w-3 h-3 bg-amber-400 rounded-full -left-[7px] top-1.5 shadow-[0_0_0_4px_white]"></div>
                    <p className="text-sm font-medium text-slate-800">{d.event}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      Impacto registrado no Score BFS-P: {d.bfsp}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
