import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  TestTubes,
  Activity,
  ShieldCheck,
  ArrowRight,
  Plus,
  BrainCircuit,
  AlertTriangle,
  FileText,
  Database,
  LineChart as LineChartIcon,
  Sparkles,
  Lock,
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const mockChartData = [
  { session: 'S1', vitalScore: 45, responseProb: 30 },
  { session: 'S2', vitalScore: 48, responseProb: 35 },
  { session: 'S3', vitalScore: 55, responseProb: 45 },
  { session: 'S4', vitalScore: 62, responseProb: 60 },
  { session: 'S5', vitalScore: 75, responseProb: 82 },
]

const chartConfig = {
  vitalScore: {
    label: 'VitalScore',
    color: 'hsl(var(--primary))',
  },
}

const PipelineStages = ({ current }: { current: string }) => {
  const stages = ['pending_consent', 'baseline', 'intervention', 'post', 'completed']
  const labels = ['Consent', 'Baseline', 'Interv.', 'Post', 'Done']
  const idx = stages.indexOf(current)
  return (
    <div className="flex items-center gap-1 w-full mt-4">
      {stages.map((s, i) => (
        <div key={s} className="flex-1 flex flex-col gap-1">
          <div
            className={cn(
              'h-1.5 rounded-full transition-colors',
              i <= idx
                ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.6)]'
                : 'bg-slate-200 dark:bg-slate-800',
            )}
          />
          <span
            className={cn(
              'text-[9px] uppercase tracking-wider font-bold truncate',
              i <= idx ? 'text-violet-700 dark:text-violet-400' : 'text-slate-400',
            )}
            title={labels[i]}
          >
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function NeuroLabDashboard() {
  const [protocols, setProtocols] = useState<any[]>([])
  const [trials, setTrials] = useState<any[]>([])
  const [predictions, setPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, tRes, predRes] = await Promise.all([
          supabase.from('neurolab_protocols' as any).select('*, neurolab_protocol_versions(*)'),
          supabase
            .from('neurolab_trials' as any)
            .select('*, patients(*), neurolab_protocol_versions(neurolab_protocols(*))'),
          supabase
            .from('neurolab_predictions' as any)
            .select('*, neurolab_trials(patients(*)), neurolab_features(*)'),
        ])

        if (pRes.data) setProtocols(pRes.data)
        if (tRes.data) setTrials(tRes.data)
        if (predRes.data) setPredictions(predRes.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-900/50 p-6 gap-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
            <TestTubes className="w-8 h-8 text-violet-600" />
            NeuroLab F1
            <Badge
              variant="outline"
              className="bg-violet-100 text-violet-800 border-violet-200 ml-2 shadow-sm"
            >
              Command Center
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1 font-medium">
            Research & Innovation - Real-World Evidence (RWE) Hub
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-violet-200 text-violet-700 hover:bg-violet-50"
          >
            <Database className="w-4 h-4 mr-2" />
            Exportar RWE
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white shadow-md">
            <Plus className="w-4 h-4 mr-2" />
            Novo Ensaio (N-of-1)
          </Button>
        </div>
      </div>

      <Tabs defaultValue="trials" className="w-full">
        <TabsList className="bg-white dark:bg-slate-900 border shadow-sm p-1 rounded-xl mb-6 inline-flex overflow-x-auto max-w-full">
          <TabsTrigger
            value="trials"
            className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm"
          >
            <Activity className="w-4 h-4 mr-2" />
            Pipeline de Ensaios
          </TabsTrigger>
          <TabsTrigger
            value="protocols"
            className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm"
          >
            <BrainCircuit className="w-4 h-4 mr-2" />
            Protocol Engine
          </TabsTrigger>
          <TabsTrigger
            value="neuropredict"
            className="rounded-lg data-[state=active]:bg-amber-50 data-[state=active]:text-amber-700 data-[state=active]:shadow-sm"
          >
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
            NeuroPredict AI
          </TabsTrigger>
          <TabsTrigger
            value="compliance"
            className="rounded-lg data-[state=active]:bg-violet-50 data-[state=active]:text-violet-700 data-[state=active]:shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Trust Layer & Compliance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trials" className="mt-0">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              Carregando dados estruturados...
            </div>
          ) : trials.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trials.map((trial) => (
                <Card
                  key={trial.id}
                  className="border-violet-100/50 shadow-sm hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3 border-b border-slate-100 bg-white/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg text-slate-800 truncate max-w-[200px]">
                          {trial.patients?.full_name || 'Paciente Não Identificado'}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          <FileText className="w-3 h-3" />
                          {trial.neurolab_protocol_versions?.neurolab_protocols?.code ||
                            'Protocolo Genérico'}
                        </CardDescription>
                      </div>
                      {trial.risk_level === 'moderate' && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 shrink-0"
                        >
                          Risco Moderado
                        </Badge>
                      )}
                      {trial.risk_level === 'high' && (
                        <Badge
                          variant="outline"
                          className="bg-rose-50 text-rose-700 border-rose-200 shrink-0"
                        >
                          Alto Risco
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500 font-medium">Fase Atual</span>
                      <span className="font-semibold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                        {trial.current_stage || 'Iniciando'}
                      </span>
                    </div>

                    <PipelineStages current={trial.status} />

                    <div className="pt-4 mt-2 border-t border-slate-100">
                      <Link to={`/neurolab/trials/${trial.id}`}>
                        <Button
                          variant="ghost"
                          className="w-full text-violet-600 hover:text-violet-800 hover:bg-violet-50"
                        >
                          Abrir Workspace <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl border-slate-200">
              Nenhum ensaio clínico ativo no momento.
            </div>
          )}
        </TabsContent>

        <TabsContent value="protocols" className="mt-0 space-y-4">
          {loading ? (
            <div className="text-center py-10 text-muted-foreground">
              Sincronizando Protocol Engine...
            </div>
          ) : protocols.length > 0 ? (
            protocols.map((p) => {
              const latestVersion = p.neurolab_protocol_versions?.[0] || {}
              return (
                <Card key={p.id} className="border-slate-200 shadow-sm">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-2 w-full">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                        <Badge
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 font-mono text-xs"
                        >
                          {p.code} v{latestVersion.version_number || 1}
                        </Badge>
                        {p.is_off_label && (
                          <Badge
                            variant="outline"
                            className="bg-rose-50 text-rose-700 border-rose-200"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" /> Off-Label
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <BrainCircuit className="w-4 h-4 text-violet-500" />{' '}
                          {p.rdoc_domain || 'N/A'}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-4 h-4 text-blue-500" />{' '}
                          {p.neural_network_target || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge
                        variant={p.status === 'active' ? 'default' : 'secondary'}
                        className={p.status === 'active' ? 'bg-violet-600 hover:bg-violet-700' : ''}
                      >
                        {p.status === 'active' ? 'Ativo' : 'Rascunho'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl border-slate-200">
              Nenhum protocolo mestre configurado.
            </div>
          )}
        </TabsContent>

        <TabsContent value="neuropredict" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <LineChartIcon className="w-5 h-5 text-indigo-500" />
                  Evolução Longitudinal & VitalScore
                </CardTitle>
                <CardDescription>
                  Acompanhamento do índice funcional com base no cluster fenotípico e resposta
                  terapêutica.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mockChartData}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        className="stroke-slate-200 dark:stroke-slate-700"
                      />
                      <XAxis
                        dataKey="session"
                        className="text-xs"
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis className="text-xs" tickLine={false} axisLine={false} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="vitalScore"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fill="url(#colorScore)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  NeuroPredict AI (ATS)
                </CardTitle>
                <CardDescription>Predição de resposta e next-best-action.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {predictions.length > 0 ? (
                  predictions.map((pred) => (
                    <div
                      key={pred.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-sm text-slate-800 dark:text-slate-200">
                          {pred.neurolab_trials?.patients?.full_name}
                        </span>
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 shadow-none">
                          {(pred.response_probability * 100).toFixed(0)}% Prob.
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <p className="text-[10px] text-slate-500 uppercase font-bold">
                            Delta Esperado
                          </p>
                          <p className="text-sm font-bold text-emerald-600">
                            +{pred.expected_delta}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                          <p className="text-[10px] text-slate-500 uppercase font-bold">
                            Risk Score
                          </p>
                          <p className="text-sm font-bold text-rose-600">{pred.risk_score}</p>
                        </div>
                      </div>
                      <div className="text-xs bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-200">
                        <strong className="block mb-1 text-indigo-700 dark:text-indigo-400">
                          Recomendação Adaptativa:
                        </strong>
                        {pred.recommended_intervention?.type} — Montage:{' '}
                        {pred.recommended_intervention?.montage} (
                        {pred.recommended_intervention?.intensity})
                      </div>
                      <div className="mt-3 flex items-center justify-between border-t pt-2 border-slate-200 dark:border-slate-700">
                        <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          {pred.hash_sha256?.substring(0, 8)}...
                        </span>
                        <span className="text-[10px] text-slate-400">
                          Model {pred.model_version}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-slate-500 text-sm">
                    Nenhuma predição gerada ainda.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="mt-0">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle>Trust Layer & Compliance</CardTitle>
              <CardDescription>
                Governança ética, TCLE digital e logs de auditoria imutáveis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl border-slate-200">
                Modulo de Compliance em configuração.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
