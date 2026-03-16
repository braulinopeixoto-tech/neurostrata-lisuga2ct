import { useState } from 'react'
import { TrendingUp, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import useAppStore from '@/stores/useAppStore'

export default function PerformanceTimeline() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [showPerformance, setShowPerformance] = useState(true)
  const [showStability, setShowStability] = useState(true)

  const timelineData = selectedPatientId
    ? [
        { date: 'Jan', performance: 20, stability: 30 },
        { date: 'Fev', performance: 25, stability: 35 },
        { date: 'Mar', performance: 32, stability: 38 },
        { date: 'Abr', performance: 45, stability: 50 },
        { date: 'Mai', performance: 58, stability: 55 },
        { date: 'Jun', performance: 70, stability: 65 },
      ]
    : []

  const chartConfig = {
    performance: { label: 'Score de Performance', color: 'hsl(var(--chart-1))' },
    stability: { label: 'Score de Estabilidade', color: 'hsl(var(--chart-2))' },
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-accent" /> Linha do Tempo de Performance
        </h1>
        <p className="text-muted-foreground mt-1">
          Acompanhamento visual da evolução dos índices de regulação e performance ao longo das
          intervenções.
        </p>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Filtro Longitudinal</CardTitle>
          <CardDescription>
            Selecione o paciente e as métricas para visualização histórica.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-6 items-start md:items-end">
          <div className="flex-1 w-full space-y-2">
            <Label>Paciente</Label>
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

          <div className="flex items-center gap-6 p-3 bg-muted/30 border rounded-lg">
            <div className="flex items-center gap-2">
              <Switch id="perf" checked={showPerformance} onCheckedChange={setShowPerformance} />
              <Label
                htmlFor="perf"
                className="flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" /> Performance
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="stab" checked={showStability} onCheckedChange={setShowStability} />
              <Label
                htmlFor="stab"
                className="flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" /> Estabilidade
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPatientId ? (
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="text-xl">
              Evolução Clínica de {patients.find((p) => p.id === selectedPatientId)?.name}
            </CardTitle>
            <CardDescription>
              Trajetória dos scores no último semestre de acompanhamento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] mt-4">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={timelineData}
                    margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                  >
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
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />

                    {showPerformance && (
                      <Line
                        type="monotone"
                        name="Score de Performance"
                        dataKey="performance"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={4}
                        dot={{ r: 5, fill: 'hsl(var(--chart-1))', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 7 }}
                        animationDuration={1500}
                      />
                    )}

                    {showStability && (
                      <Line
                        type="monotone"
                        name="Score de Estabilidade"
                        dataKey="stability"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={4}
                        dot={{ r: 5, fill: 'hsl(var(--chart-2))', strokeWidth: 2, stroke: '#fff' }}
                        activeDot={{ r: 7 }}
                        animationDuration={1500}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-primary text-sm">Crescimento Sustentado</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    A correlação positiva entre performance e estabilidade indica eficácia do
                    protocolo terapêutico adotado.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
            <p>Selecione um paciente para visualizar o acompanhamento evolutivo.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
