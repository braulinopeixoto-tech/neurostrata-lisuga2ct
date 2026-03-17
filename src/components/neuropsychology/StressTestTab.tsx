import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Activity, HeartPulse, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function StressTestTab() {
  const [data, setData] = useState<{ time: string; hrv: number; stress: number; gsr: number }[]>([])
  const [isRecording, setIsRecording] = useState(false)

  useEffect(() => {
    let time = 0
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        time += 1
        setData((prev) => {
          const newData = [
            ...prev,
            {
              time: `${time}s`,
              hrv: Math.floor(50 + Math.random() * 20),
              stress: Math.floor(30 + Math.random() * 40),
              gsr: +(2 + Math.random() * 1.5).toFixed(2),
            },
          ]
          if (newData.length > 30) newData.shift()
          return newData
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRecording])

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-red-500 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="w-6 h-6 text-red-500" /> Teste de Estresse em Tempo Real
            </CardTitle>
            <CardDescription>
              Monitoramento dinâmico de Variabilidade da Frequência Cardíaca (HRV) e Resposta
              Galvânica da Pele (GSR).
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? 'destructive' : 'default'}
            className="w-full sm:w-auto"
          >
            {isRecording ? 'Parar Gravação' : 'Iniciar Sessão de Teste'}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-100 p-4 rounded-xl text-center">
              <span className="text-red-800 text-xs font-bold uppercase tracking-wider block mb-1">
                Índice de Estresse
              </span>
              <span className="text-3xl font-black text-red-600">
                {data.length > 0 ? data[data.length - 1].stress : '--'}{' '}
                <span className="text-sm font-normal">%</span>
              </span>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-center">
              <span className="text-emerald-800 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center justify-center gap-1">
                <HeartPulse className="w-3 h-3" /> HRV
              </span>
              <span className="text-3xl font-black text-emerald-600">
                {data.length > 0 ? data[data.length - 1].hrv : '--'}{' '}
                <span className="text-sm font-normal">ms</span>
              </span>
            </div>
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-center">
              <span className="text-blue-800 text-xs font-bold uppercase tracking-wider block mb-1 flex items-center justify-center gap-1">
                <Zap className="w-3 h-3" /> GSR
              </span>
              <span className="text-3xl font-black text-blue-600">
                {data.length > 0 ? data[data.length - 1].gsr : '--'}{' '}
                <span className="text-sm font-normal">μS</span>
              </span>
            </div>
          </div>

          <div className="h-[400px] w-full bg-slate-50 p-4 rounded-xl border">
            <ChartContainer
              config={{
                hrv: { color: 'hsl(var(--emerald-500))', label: 'HRV (ms)' },
                stress: { color: 'hsl(var(--red-500))', label: 'Estresse (%)' },
                gsr: { color: 'hsl(var(--blue-500))', label: 'GSR (μS)' },
              }}
              className="w-full h-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid
                    vertical={false}
                    stroke="hsl(var(--border))"
                    strokeDasharray="3 3"
                  />
                  <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="stress"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={3}
                    isAnimationActive={false}
                    dot={false}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="hrv"
                    stroke="hsl(var(--success))"
                    strokeWidth={3}
                    isAnimationActive={false}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="gsr"
                    stroke="hsl(var(--blue-500))"
                    strokeWidth={3}
                    isAnimationActive={false}
                    dot={false}
                    strokeDasharray="5 5"
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          {!isRecording && data.length === 0 && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-sm rounded-xl">
              <span className="text-muted-foreground font-medium">
                Aguardando início do teste...
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
