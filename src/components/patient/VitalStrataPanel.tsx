import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Activity,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Clock,
  Info,
  CheckCircle2,
  Lock,
  AlertCircle,
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { getVitalStrataSummary, VitalStrataPayload } from '@/services/vitalStrataService'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { DimensionalRadarChart } from '@/components/charts/DimensionalRadarChart'

export function VitalStrataPanel({
  patientId,
  patientName,
}: {
  patientId: string
  patientName?: string
}) {
  const [data, setData] = useState<VitalStrataPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await getVitalStrataSummary(patientId, patientName)
        setData(res)
      } catch (err) {
        setError('Falha ao carregar dados do VitalStrata™')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [patientId])

  if (loading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-32 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-[300px] lg:col-span-2 w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
          <div className="h-[300px] w-full bg-slate-100 dark:bg-slate-800 rounded-xl" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Erro na Inteligência Clínica</AlertTitle>
        <AlertDescription>{error || 'Dados indisponíveis no momento.'}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Executive Header */}
      <Card className="border-indigo-200 dark:border-indigo-900 shadow-md bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-950 dark:to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            {/* VitalScore */}
            <div className="flex-1 flex items-center gap-6">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 dark:bg-indigo-950 border-4 border-indigo-500 shadow-inner">
                <span className="text-3xl font-bold text-indigo-700 dark:text-indigo-400">
                  {data.executive.vitalScore}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  VitalScore™
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {data.executive.vitalScore >= 75
                      ? 'Otimizado'
                      : data.executive.vitalScore >= 50
                        ? 'Estável'
                        : 'Alerta'}
                  </span>
                  <Badge
                    variant={data.executive.vitalScore >= 75 ? 'default' : 'secondary'}
                    className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100 border-transparent"
                  >
                    Top 15%
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
                  Índice composto de regulação neurofuncional e resiliência sistêmica.
                </p>
              </div>
            </div>

            <Separator orientation="vertical" className="hidden md:block h-24" />

            {/* Metrics */}
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Reserva Funcional Humana
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {data.executive.reserveDelta > 0 ? '+' : ''}
                    {data.executive.reserveDelta}%
                  </span>
                  {data.executive.reserveDelta > 0 ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : data.executive.reserveDelta < 0 ? (
                    <TrendingDown className="w-4 h-4 text-rose-500" />
                  ) : null}
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Confiabilidade Inferencial
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    {data.executive.reliability}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-blue-500" />
                </div>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                  Metadados de Auditoria
                </p>
                <div className="flex items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Última atualização:{' '}
                    {new Date(data.executive.lastUpdate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Info className="w-3 h-3" /> Versão do score: {data.executive.version}
                  </span>
                  <span
                    className="flex items-center gap-1 font-mono truncate max-w-[120px]"
                    title={data.executive.hash}
                  >
                    <Lock className="w-3 h-3" /> {data.executive.hash.substring(0, 8)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Perfil Dimensional
            </CardTitle>
            <CardDescription>Distribuição neurofuncional atual</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            <div className="w-full mt-2">
              <DimensionalRadarChart
                data={data.vetores.map((v) => ({ subject: v.name, value: v.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Tendência Longitudinal
            </CardTitle>
            <CardDescription>Evolução do VitalScore™ ao longo do tempo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ChartContainer
                config={{ score: { label: 'VitalScore', color: '#6366f1' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={data.tendencia}
                    margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      dy={10}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      domain={['dataMin - 5', 'dataMax + 5']}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="var(--color-score)"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                      activeDot={{ r: 6, fill: '#4f46e5', strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Priority Vectors */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Vetores Prioritários
            </CardTitle>
            <CardDescription>Decomposição por eixo funcional</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ChartContainer
                config={{ value: { label: 'Valor', color: 'hsl(var(--primary))' } }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data.vetores}
                    layout="vertical"
                    margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#334155' }}
                      width={80}
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'transparent' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {data.vetores.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Interventions Impact */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200 dark:border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Impacto das Intervenções
            </CardTitle>
            <CardDescription>
              Correlação entre eventos clínicos e trajetórias funcionais
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {data.impactos.length > 0 ? (
                data.impactos.map((impact, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 items-start sm:items-center"
                  >
                    <div className="flex-shrink-0 w-24 text-sm font-medium text-slate-500">
                      {impact.date}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        {impact.description}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-full whitespace-nowrap">
                      <CheckCircle2 className="w-4 h-4" />
                      {impact.impact}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  Nenhuma intervenção registrada com impacto mensurável no período.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
