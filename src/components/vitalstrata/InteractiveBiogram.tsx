import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  ReferenceLine,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, History, UserCheck, Stethoscope } from 'lucide-react'
import { VitalRecord } from '@/stores/useVitalStrataStore'

export function InteractiveBiogram({ records }: { records: VitalRecord[] }) {
  const chronologicalRecords = [...records].reverse()
  const [selectedIndex, setSelectedIndex] = useState(chronologicalRecords.length - 1)

  if (chronologicalRecords.length === 0) {
    return (
      <Card className="shadow-sm border-t-4 border-t-indigo-500">
        <CardContent className="p-12 text-center text-muted-foreground">
          Sem dados longitudinais.
        </CardContent>
      </Card>
    )
  }

  const chartData = chronologicalRecords.map((r, i) => ({
    index: i,
    date: new Date(r.timestamp).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    score: r.vitalScore,
    source: r.source,
    isAlert: r.isAlert,
    interventions: r.interventions || [],
    author: r.author,
    reliability: r.reliability,
  }))

  const selectedRecord = chronologicalRecords[selectedIndex]

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-indigo-500">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Biograma Longitudinal (Living Document)</span>
            <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
              <History className="w-3.5 h-3.5 mr-1" /> Time Travel Ativo
            </Badge>
          </CardTitle>
          <CardDescription>
            Explore o histórico de forma interativa. Cada ponto é criptograficamente selado pela
            Trust Layer™.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] w-full mt-2">
            <ChartContainer
              config={{ score: { color: 'hsl(var(--primary))', label: 'VitalScore' } }}
              className="w-full h-full"
            >
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: -20 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
                  <YAxis domain={[0, 100]} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white border border-border p-3 rounded-lg shadow-xl text-sm min-w-[200px]">
                            <div className="flex justify-between items-start mb-2 border-b pb-2">
                              <p className="font-bold text-primary">{data.date}</p>
                              <ShieldCheck className="w-4 h-4 text-emerald-500" />
                            </div>
                            <p className="flex justify-between items-center mb-1">
                              <span className="text-muted-foreground">VitalScore:</span>
                              <span className="font-bold text-lg">{data.score}</span>
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                              <UserCheck className="w-3 h-3" /> {data.author}
                            </p>
                            {data.interventions.length > 0 && (
                              <div className="mt-2 pt-2 border-t text-xs">
                                <span className="font-semibold text-indigo-600 block mb-1">
                                  Intervenções:
                                </span>
                                <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground">
                                  {data.interventions.map((inv: string, idx: number) => (
                                    <li key={idx}>{inv}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  {/* Reference line for currently selected index via slider */}
                  <ReferenceLine
                    x={chartData[selectedIndex]?.date}
                    stroke="hsl(var(--accent))"
                    strokeDasharray="3 3"
                  />

                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                    dot={(props: any) => {
                      const { cx, cy, payload, key, index } = props
                      const hasIntervention =
                        payload.interventions && payload.interventions.length > 0
                      return (
                        <svg
                          key={key || `dot-${index}`}
                          x={cx - 5}
                          y={cy - 5}
                          width={10}
                          height={10}
                          fill={hasIntervention ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}
                          viewBox="0 0 10 10"
                        >
                          <circle cx="5" cy="5" r="5" />
                        </svg>
                      )
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="mt-8 space-y-4 max-w-2xl mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground font-medium mb-2">
              <span>Passado</span>
              <span>Estado Atual</span>
            </div>
            <Slider
              value={[selectedIndex]}
              onValueChange={(v) => setSelectedIndex(v[0])}
              max={chronologicalRecords.length - 1}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Selected State Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm bg-slate-50 border-slate-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <History className="w-4 h-4" /> Estado Histórico Selecionado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Data do Registro</span>
              <span className="font-bold">
                {new Date(selectedRecord.timestamp).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">VitalScore</span>
              <span className="font-black text-xl text-primary">{selectedRecord.vitalScore}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Fonte</span>
              <span className="text-sm">{selectedRecord.source}</span>
            </div>
            <div className="pt-3 border-t">
              <span className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                <Stethoscope className="w-4 h-4" /> Ações/Intervenções Neste Ponto
              </span>
              {selectedRecord.interventions && selectedRecord.interventions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.interventions.map((inv, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white border text-xs">
                      {inv}
                    </Badge>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">
                  Nenhuma intervenção registrada.
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-emerald-700 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Trust Layer™ Audit
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Responsável</span>
              <span className="text-sm flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> {selectedRecord.author}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Confiabilidade</span>
              <Badge
                variant="outline"
                className={
                  selectedRecord.reliability === 'High'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700'
                }
              >
                {selectedRecord.reliability}
              </Badge>
            </div>
            <div className="pt-3 border-t">
              <span className="text-sm font-medium text-slate-700 block mb-1">
                Hash Criptográfico (SHA-256)
              </span>
              <div className="bg-slate-100 p-2 rounded text-xs font-mono text-slate-600 break-all select-all">
                {selectedRecord.hash}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
