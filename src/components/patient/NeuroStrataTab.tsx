import { useState, useEffect } from 'react'
import { Brain, Network, Zap, Target, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts'
import { getNeuroStrataData, NeuroStrataData } from '@/services/neuroStrataService'

interface NeuroStrataTabProps {
  patient: any
}

export function NeuroStrataTab({ patient }: NeuroStrataTabProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<NeuroStrataData | null>(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const result = await getNeuroStrataData(patient.id)
      setData(result)
      setLoading(false)
    }
    if (patient?.id) {
      loadData()
    }
  }, [patient?.id])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse py-4">
        <div className="h-32 bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl" />
          <div className="h-[400px] bg-slate-100 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            Perfil NeuroStrata
          </h2>
          <p className="text-muted-foreground mt-1">
            Mapeamento neurocognitivo e funcionalidade sistêmica do paciente
          </p>
        </div>
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1.5 text-sm font-medium"
        >
          Sincronizado
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md border-0">
          <CardContent className="p-6 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-100 text-sm font-medium mb-1">NSI Score</p>
                <h3 className="text-4xl font-bold">{data.nsiScore}</h3>
              </div>
              <Activity className="w-8 h-8 text-indigo-200 opacity-75" />
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-xs text-indigo-100 font-medium uppercase tracking-wider">
                Índice Neuro-Somático Global
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Distinção</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {data.distinctiveness}%
                </h3>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Target className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">
              Clareza de sinais neurais
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Coerência</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {data.coherence}%
                </h3>
              </div>
              <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                <Network className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Sincronia inter-redes</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">Continuidade</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                  {data.temporal}%
                </h3>
              </div>
              <div className="p-2 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 font-medium">Estabilidade temporal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Mapeamento de Domínios
            </CardTitle>
            <CardDescription>Distribuição de performance neurocognitiva</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-2">
              <ChartContainer
                config={{ A: { label: 'Score', color: 'hsl(var(--primary))' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data.domains}>
                    <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                    />
                    <Radar
                      name="Score"
                      dataKey="A"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="#818cf8"
                      fillOpacity={0.4}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Scores */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Fatores de Risco Funcional
            </CardTitle>
            <CardDescription>Propensão a colapsos sistêmicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[320px] w-full mt-2">
              <ChartContainer
                config={{ value: { label: 'Risco', color: 'hsl(var(--destructive))' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.risks}
                    layout="vertical"
                    margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
                      width={140}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: '#f1f5f9' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
                      {data.risks.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
