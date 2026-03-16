import { useMemo, useState } from 'react'
import { Activity, Brain, ShieldAlert, HeartPulse, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from 'recharts'
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import useAppStore from '@/stores/useAppStore'

export default function Dashboard() {
  const { patients } = useAppStore()
  const [dateRange, setDateRange] = useState('30d')
  const [category, setCategory] = useState('all')

  // Mock macro data derived from current patient base structure
  const macroStats = useMemo(() => {
    return {
      avgNSI: 74,
      totalActive: patients.filter((p) => p.status === 'Ativo' || p.status === 'Em Tratamento')
        .length,
      protocolSuccess: 82,
      criticalAlerts: 3,
    }
  }, [patients])

  const impairmentData = [
    { name: 'Leve', value: 45, fill: 'hsl(var(--chart-1))' },
    { name: 'Moderado', value: 30, fill: 'hsl(var(--chart-2))' },
    { name: 'Grave', value: 15, fill: 'hsl(var(--chart-3))' },
    { name: 'Profundo', value: 5, fill: 'hsl(var(--chart-4))' },
  ]

  const riskData = [
    { name: 'Baixo Risco', value: 250, fill: 'hsl(var(--chart-5))' },
    { name: 'Risco Moderado', value: 120, fill: 'hsl(var(--chart-2))' },
    { name: 'Alto Risco', value: 45, fill: 'hsl(var(--chart-3))' },
  ]

  const trendData = [
    { month: 'Jan', integridade: 62, disfuncao: 38 },
    { month: 'Fev', integridade: 65, disfuncao: 35 },
    { month: 'Mar', integridade: 68, disfuncao: 32 },
    { month: 'Abr', integridade: 71, disfuncao: 29 },
    { month: 'Mai', integridade: 73, disfuncao: 27 },
    { month: 'Jun', integridade: 74, disfuncao: 26 },
  ]

  const chartConfig = {
    value: { label: 'Pacientes', color: 'hsl(var(--primary))' },
    integridade: { label: 'Integridade Média', color: 'hsl(var(--chart-1))' },
    disfuncao: { label: 'Disfunção Socioemocional', color: 'hsl(var(--chart-3))' },
  }

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Activity className="w-8 h-8 text-accent" /> Gestão Clínica (Macro)
          </h1>
          <p className="text-muted-foreground mt-2">
            Visão populacional e inteligência analítica de todos os seus pacientes ativos.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium bg-muted/50 p-2 rounded-lg border">
            <Filter className="w-4 h-4" /> Filtros:
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[140px] bg-white">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último Ano</SelectItem>
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Categoria Diagnóstica" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas Categorias</SelectItem>
              <SelectItem value="neuro">Neurodesenvolvimento</SelectItem>
              <SelectItem value="mood">Transtornos do Humor</SelectItem>
              <SelectItem value="anxiety">Transtornos Ansiosos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-t-4 border-t-primary shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-muted-foreground">NeuroStrata Index (Médio)</p>
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold text-primary">{macroStats.avgNSI}</div>
              <span className="text-xs text-muted-foreground font-mono">/ 100</span>
            </div>
            <p className="text-xs mt-2 text-emerald-600 font-medium">+2.4% vs último período</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-muted-foreground">Pacientes Ativos</p>
              <Activity className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-bold">{macroStats.totalActive}</div>
            <p className="text-xs mt-2 text-muted-foreground">Em acompanhamento contínuo</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-muted-foreground">Eficácia Terapêutica</p>
              <HeartPulse className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold">{macroStats.protocolSuccess}%</div>
            <p className="text-xs mt-2 text-muted-foreground">Atingiram platô de melhora</p>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-t-rose-500 shadow-sm bg-rose-50/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between pb-2">
              <p className="text-sm font-medium text-rose-700">Alertas Clínicos</p>
              <ShieldAlert className="h-5 w-5 text-rose-500" />
            </div>
            <div className="text-3xl font-bold text-rose-600">{macroStats.criticalAlerts}</div>
            <p className="text-xs mt-2 text-rose-600 font-medium">Requerem revisão de protocolo</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Distribuição de Risco Psicopatológico</CardTitle>
            <CardDescription>Estratificação da base atual de pacientes.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <ChartLegend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Níveis de Comprometimento Cognitivo</CardTitle>
            <CardDescription>Volume de pacientes por gravidade de déficit.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impairmentData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <RechartsTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {impairmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="text-lg">Tendências de Integridade vs. Disfunção</CardTitle>
            <CardDescription>
              Evolução longitudinal média da clínica ao longo do semestre.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="hsl(var(--border))"
                  />
                  <XAxis
                    dataKey="month"
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
                  <ChartLegend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line
                    type="monotone"
                    name="Integridade Média"
                    dataKey="integridade"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={4}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    name="Disfunção Socioemocional"
                    dataKey="disfuncao"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={4}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
