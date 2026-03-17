import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { TrendingUp, Calendar } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function MonitoringEvolutionTab() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('P001')

  const patient = patients.find((p) => p.id === selectedPatientId)

  // Mock longitudinal data
  const data = [
    { evaluation: 'Avaliação 1', date: '10/01/2023', nsi: 45, focus: 40, wellBeing: 50 },
    { evaluation: 'Avaliação 2', date: '15/03/2023', nsi: 55, focus: 55, wellBeing: 60 },
    { evaluation: 'Avaliação 3', date: '10/06/2023', nsi: 70, focus: 65, wellBeing: 75 },
    { evaluation: 'Avaliação 4', date: '20/07/2023', nsi: 85, focus: 80, wellBeing: 88 },
  ]

  const chartConfig = {
    nsi: { label: 'Índice Neurofuncional (NSI)', color: 'hsl(var(--primary))' },
    focus: { label: 'Atenção e Foco', color: 'hsl(var(--chart-1))' },
    wellBeing: { label: 'Bem-estar Emocional', color: 'hsl(var(--chart-2))' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" /> Monitoramento Longitudinal
            </CardTitle>
            <CardDescription>
              Evolução das métricas neurofuncionais do paciente ao longo do tempo.
            </CardDescription>
          </div>
          <div className="w-full sm:w-64">
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione um paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {!patient ? (
            <div className="text-center text-muted-foreground p-10 bg-muted/20 border-dashed rounded-lg">
              Selecione um paciente para ver a evolução.
            </div>
          ) : (
            <>
              <div className="h-[400px] w-full mt-4">
                <ChartContainer config={chartConfig} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--border))"
                      />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={false}
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        tickLine={false}
                        axisLine={false}
                        dx={-10}
                      />
                      <RechartsTooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line
                        type="monotone"
                        name="Índice Neurofuncional (NSI)"
                        dataKey="nsi"
                        stroke="hsl(var(--primary))"
                        strokeWidth={4}
                        dot={{ r: 5, strokeWidth: 2, fill: 'white' }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        name="Atenção e Foco"
                        dataKey="focus"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      />
                      <Line
                        type="monotone"
                        name="Bem-estar Emocional"
                        dataKey="wellBeing"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: 'white' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="mt-8 relative border-l-2 border-muted ml-3 space-y-6 pb-2 pt-2">
                {data.map((item, idx) => (
                  <div key={idx} className="pl-6 relative group">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background group-hover:scale-125 transition-transform" />
                    <div className="bg-white p-4 rounded-lg border shadow-sm group-hover:border-primary/30 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> {item.date}
                        </span>
                        <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                          NSI: {item.nsi}
                        </span>
                      </div>
                      <p className="font-semibold text-foreground text-sm">{item.evaluation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
