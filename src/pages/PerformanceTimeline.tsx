import { useState, useMemo } from 'react'
import {
  TrendingUp,
  CheckCircle,
  FileText,
  Download,
  ShieldCheck,
  Activity,
  Brain,
  ArrowRight,
  Map as MapIcon,
  Bot,
  BookMarked,
  Copy,
  Trash2,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'
import useAppStore from '@/stores/useAppStore'

export default function PerformanceTimeline() {
  const {
    patients,
    currentUser,
    patientEvidence,
    quickReportDraft,
    citations,
    removeCitation,
    appendQuickReportDraft,
  } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [showPerformance, setShowPerformance] = useState(true)
  const [showStability, setShowStability] = useState(true)
  const [showConnectivity, setShowConnectivity] = useState(true)

  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [citationsModalOpen, setCitationsModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('progress')

  const patient = patients.find((p) => p.id === selectedPatientId)
  const evidence = patient ? patientEvidence[patient.id] : null

  const timelineData = useMemo(() => {
    if (!selectedPatientId) return []
    return [
      { phase: 'Linha de Base', date: 'Jan', performance: 20, stability: 30, connectivity: 25 },
      { phase: 'Fase 1 (Ajuste)', date: 'Mar', performance: 45, stability: 50, connectivity: 45 },
      { phase: 'Fase 2 (Platô)', date: 'Mai', performance: 70, stability: 65, connectivity: 75 },
      { phase: 'Avaliação Final', date: 'Jul', performance: 85, stability: 80, connectivity: 90 },
    ]
  }, [selectedPatientId])

  const prePostData = useMemo(() => {
    if (timelineData.length === 0) return []
    const first = timelineData[0]
    const last = timelineData[timelineData.length - 1]
    return [
      { metric: 'Performance', pre: first.performance, post: last.performance },
      { metric: 'Estabilidade', pre: first.stability, post: last.stability },
      { metric: 'Conectividade', pre: first.connectivity, post: last.connectivity },
    ]
  }, [timelineData])

  const chartConfig = {
    performance: { label: 'Performance', color: 'hsl(var(--chart-1))' },
    stability: { label: 'Estabilidade', color: 'hsl(var(--chart-2))' },
    connectivity: { label: 'Conectividade Global', color: 'hsl(var(--chart-3))' },
  }

  const barChartConfig = {
    pre: { label: 'Linha de Base (Pré)', color: 'hsl(var(--muted-foreground))' },
    post: { label: 'Avaliação Final (Pós)', color: 'hsl(var(--primary))' },
  }

  const handleExport = () => {
    toast({
      title: 'Relatório Técnico Exportado',
      description: 'O PDF assinado digitalmente foi baixado com sucesso.',
      action: <CheckCircle className="text-success w-5 h-5" />,
    })
    setReportModalOpen(false)
  }

  const handleInsertCitation = (cit: any) => {
    appendQuickReportDraft(
      `\n\n[Referência Bibliográfica]\n${cit.authors}. "${cit.title}". Disponível em: ${cit.link}`,
    )
    toast({
      title: 'Citação Inserida',
      description: 'A referência foi adicionada ao seu Quick Report de paciente.',
      action: <CheckCircle className="text-success w-5 h-5" />,
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-accent" /> Painel de Evolução e Conectividade
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhamento longitudinal de métricas e geração de relatórios técnicos automatizados.
          </p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            onClick={() => setCitationsModalOpen(true)}
            className="bg-white shadow-sm flex-1 md:flex-none"
          >
            <BookMarked className="w-4 h-4 mr-2 text-blue-600" /> Biblioteca de Citações
          </Button>
          {selectedPatientId && (
            <Button
              onClick={() => setReportModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm flex-1 md:flex-none"
            >
              <FileText className="w-4 h-4 mr-2" /> Gerar Relatório
            </Button>
          )}
        </div>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Filtro de Paciente e Métricas</CardTitle>
          <CardDescription>
            Selecione o paciente para visualizar o impacto das intervenções ao longo do tempo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-6 items-start lg:items-end">
          <div className="flex-1 w-full lg:max-w-md space-y-2">
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

          <div className="flex flex-wrap items-center gap-6 p-3 bg-muted/30 border rounded-lg w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <Switch id="perf" checked={showPerformance} onCheckedChange={setShowPerformance} />
              <Label htmlFor="perf" className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]" /> Performance
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="stab" checked={showStability} onCheckedChange={setShowStability} />
              <Label htmlFor="stab" className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]" /> Estabilidade
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="conn" checked={showConnectivity} onCheckedChange={setShowConnectivity} />
              <Label htmlFor="conn" className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]" /> Conectividade
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedPatientId ? (
        <Tabs defaultValue="longitudinal" className="w-full">
          <TabsList className="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 mb-4 h-auto p-1 bg-muted rounded-lg">
            <TabsTrigger value="longitudinal" className="flex-1 flex items-center gap-2 py-2">
              <Activity className="w-4 h-4" /> Evolução Longitudinal
            </TabsTrigger>
            <TabsTrigger value="prepost" className="flex-1 flex items-center gap-2 py-2">
              <ArrowRight className="w-4 h-4" /> Comparativo Pré x Pós
            </TabsTrigger>
            <TabsTrigger value="brainmaps" className="flex-1 flex items-center gap-2 py-2">
              <MapIcon className="w-4 h-4" /> Modo Comparativo (Mapas)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="longitudinal">
            <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">Trajetória de {patient?.name}</CardTitle>
                <CardDescription>
                  Acompanhamento progressivo através das fases do protocolo terapêutico.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={timelineData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
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
                        <ChartTooltip content={<ChartTooltipContent labelKey="phase" />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        {showPerformance && (
                          <Line
                            type="monotone"
                            name="Performance"
                            dataKey="performance"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={4}
                            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 7 }}
                          />
                        )}
                        {showStability && (
                          <Line
                            type="monotone"
                            name="Estabilidade"
                            dataKey="stability"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={4}
                            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 7 }}
                          />
                        )}
                        {showConnectivity && (
                          <Line
                            type="monotone"
                            name="Conectividade Global"
                            dataKey="connectivity"
                            stroke="hsl(var(--chart-3))"
                            strokeWidth={4}
                            dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
                            activeDot={{ r: 7 }}
                          />
                        )}
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prepost">
            <Card className="shadow-sm border-t-4 border-t-accent animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">Eficácia da Intervenção - {patient?.name}</CardTitle>
                <CardDescription>
                  Contraste direto entre a linha de base (admissão) e o estado funcional atual.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ChartContainer config={barChartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prePostData}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="hsl(var(--border))"
                        />
                        <XAxis
                          dataKey="metric"
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
                        <ChartTooltip
                          content={<ChartTooltipContent />}
                          cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        <Bar
                          dataKey="pre"
                          name="Pré-Intervenção (Base)"
                          fill="hsl(var(--muted-foreground)/0.5)"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                        <Bar
                          dataKey="post"
                          name="Pós-Intervenção (Atual)"
                          fill="hsl(var(--primary))"
                          radius={[4, 4, 0, 0]}
                          barSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="brainmaps">
            <Card className="shadow-sm border-t-4 border-t-violet-500 animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">
                  Comparativo de Mapeamento Cerebral (Basal vs Atual)
                </CardTitle>
                <CardDescription>
                  Análise espacial de ativação. A transição topográfica evidencia a consolidação da
                  rede alvo estabelecida.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50/50 p-6 rounded-xl border mt-4">
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                    <Badge
                      variant="outline"
                      className="mb-4 bg-slate-100 uppercase tracking-widest"
                    >
                      Pré-Intervenção (Base)
                    </Badge>
                    <BrainMapVisualizer
                      title="Padrão Admissional"
                      subtitle="Hiperativação Frontal"
                      variant="frontal"
                      className="scale-110"
                    />
                  </div>
                  <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm border border-violet-100">
                    <Badge className="mb-4 bg-violet-100 text-violet-800 border-violet-200 hover:bg-violet-100 uppercase tracking-widest">
                      Pós-Intervenção (Atual)
                    </Badge>
                    <BrainMapVisualizer
                      title="Padrão Consolidado"
                      subtitle="Equilíbrio e Integração"
                      variant="default"
                      className="scale-110"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Motor de Sugestões de Protocolos IA */}
          <Card className="mt-8 border-t-4 border-t-accent shadow-sm animate-fade-in-up">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bot className="w-6 h-6 text-accent" /> Motor de Sugestão de Protocolos
              </CardTitle>
              <CardDescription>
                A IA cruzou os achados da avaliação com a "Biblioteca Inteligente" para recomendar
                os seguintes direcionamentos clínicos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-5 bg-muted/30 border rounded-xl hover:bg-white hover:border-accent/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        tACS Alpha (10Hz) Parietal + rTMS Medial PFC
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-3xl">
                        <strong className="text-slate-700 font-semibold">
                          Justificativa Clínica:
                        </strong>{' '}
                        Identificada hiperatividade na DMN (Default Mode Network) no mapeamento da
                        linha de base. Este protocolo favorece a supressão de ritmos acelerados e
                        induz relaxamento cortical, o que se correlaciona intimamente com a melhora
                        de 60% observada na métrica de "Estabilidade".
                      </p>
                    </div>
                    <Badge className="shrink-0 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50">
                      Evidência Alta
                    </Badge>
                  </div>
                </div>

                <div className="p-5 bg-muted/30 border rounded-xl hover:bg-white hover:border-accent/40 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        Neurofeedback Específico + Treinamento ERP
                      </h4>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-3xl">
                        <strong className="text-slate-700 font-semibold">
                          Justificativa Clínica:
                        </strong>{' '}
                        Como o paciente atingiu um platô sustentável na Fase 2 (Score de Performance
                        estabilizado em 85%), sugere-se a transição direta para o Módulo de
                        Treinamento Funcional para fixação definitiva da neuroplasticidade
                        alcançada.
                      </p>
                    </div>
                    <Badge className="shrink-0 bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                      Evidência Média
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      ) : (
        <Card className="bg-muted/30 border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
            <TrendingUp className="w-12 h-12 mb-4 opacity-20" />
            <p>Selecione um paciente para visualizar o acompanhamento evolutivo.</p>
          </CardContent>
        </Card>
      )}

      {/* Modal de Geração de Relatório Técnico */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0 overflow-hidden bg-muted/10">
          <DialogHeader className="p-6 pb-4 bg-background border-b z-10">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5 text-primary" /> Gerador Automático de Relatório
            </DialogTitle>
            <DialogDescription>
              O sistema compilará dados longitudinais, evidências e scores automaticamente.
            </DialogDescription>
            <div className="mt-4 flex items-center gap-3">
              <Label className="shrink-0 text-sm font-medium">Modelo de Documento:</Label>
              <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <SelectTrigger className="w-[300px] bg-white">
                  <SelectValue placeholder="Selecione o template..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress">Relatório de Progresso do Paciente</SelectItem>
                  <SelectItem value="referral">Encaminhamento Multiprofissional</SelectItem>
                  <SelectItem value="evidence">
                    Síntese de Evidências Clínicas (Auditoria)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[600px] max-w-3xl mx-auto text-sm animate-fade-in">
              <div className="text-center border-b pb-6 mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">
                  NEUROSTRATA
                </h2>
                <p className="text-muted-foreground uppercase tracking-widest mt-2 font-medium">
                  {selectedTemplate === 'progress' && 'Relatório Longitudinal de Progresso'}
                  {selectedTemplate === 'referral' &&
                    'Encaminhamento Multiprofissional Estruturado'}
                  {selectedTemplate === 'evidence' &&
                    'Síntese de Evidências Clínicas e Biomarcadores'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div>
                  <span className="font-semibold text-muted-foreground uppercase text-xs">
                    Paciente:
                  </span>{' '}
                  <p className="font-medium text-base">{patient?.name}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground uppercase text-xs">
                    Data de Emissão:
                  </span>{' '}
                  <p className="font-medium text-base">{new Date().toLocaleDateString('pt-BR')}</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground uppercase text-xs">
                    Período Avaliado:
                  </span>{' '}
                  <p className="font-medium">Jan/2023 - Jul/2023</p>
                </div>
                <div>
                  <span className="font-semibold text-muted-foreground uppercase text-xs">
                    Responsável Técnico:
                  </span>{' '}
                  <p className="font-medium">{currentUser.fullName}</p>
                </div>
              </div>

              <div className="space-y-6 leading-relaxed text-slate-800">
                {selectedTemplate === 'progress' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        1. Evolução Clínica
                      </h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        O paciente demonstrou evolução substancial em suas métricas primárias
                        durante o período observado. O Score de Performance evoluiu de{' '}
                        <strong>{timelineData[0]?.performance}%</strong> (Linha de Base) para{' '}
                        <strong>{timelineData[timelineData.length - 1]?.performance}%</strong>{' '}
                        (Final). Observou-se uma redução significativa nas oscilações
                        comportamentais, atestada pelo aumento do Score de Estabilidade para 80%. A
                        queixa inicial de fadiga atencional encontra-se atualmente em remissão
                        funcional.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        2. Dinâmica de Conectividade
                      </h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        O índice de conectividade neural global saltou de 25% para 90% ao término da
                        Fase 2. Este ganho estrutural reflete a otimização das redes de modo padrão
                        (DMN) e executiva central (CEN), corroborando a eficácia do protocolo de
                        neuromodulação adotado.
                      </p>
                    </section>
                  </>
                )}

                {selectedTemplate === 'referral' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        1. Motivo do Encaminhamento
                      </h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        Solicita-se avaliação e acompanhamento conjunto nas áreas de fonoaudiologia
                        e terapia ocupacional, visando potencializar os ganhos obtidos na fase de
                        regulação basal (concluída com sucesso). O paciente encontra-se em janela de
                        alta plasticidade sináptica (Score de Plasticidade &gt; 80%).
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        2. Achados Neurofuncionais (Resumo)
                      </h3>
                      <div className="border p-4 rounded-lg bg-slate-50/50 space-y-2">
                        {evidence ? (
                          <>
                            <p>
                              <strong>Domínios RDoC Elevados:</strong> {evidence.rdoc.join(', ')}
                            </p>
                            <p>
                              <strong>Alvos Neurais Mapeados:</strong>{' '}
                              {evidence.neuralNetworks.join(', ')}
                            </p>
                            <p>
                              <strong>Funções Psíquicas em Risco Residual:</strong>{' '}
                              {evidence.psychicFunctions.join(', ')}
                            </p>
                          </>
                        ) : (
                          <p className="italic text-muted-foreground">
                            Sistema RDoC: Déficit Executivo moderado detectado. Regulação emocional
                            estável no momento atual.
                          </p>
                        )}
                      </div>
                    </section>
                  </>
                )}

                {selectedTemplate === 'evidence' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        1. Justificativa Terapêutica (Metanálise)
                      </h3>
                      <div className="border p-4 rounded-lg bg-slate-50/50 space-y-3">
                        <p>
                          A estratégia de intervenção adotada baseou-se em cruzamento automático de
                          dados da base Neurosynth. O quadro de hipoatividade pré-frontal detectado
                          na linha de base possui forte correlação (Z-Score &gt; 0.6) com os achados
                          clínicos de desregulação emocional.
                        </p>
                        {quickReportDraft && (
                          <div className="bg-white p-3 border border-dashed rounded text-sm italic whitespace-pre-wrap">
                            <span className="font-semibold block mb-1 not-italic">
                              Anotações e Pesquisas Associadas:
                            </span>
                            {quickReportDraft}
                          </div>
                        )}
                      </div>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">
                        2. Consolidação de Biomarcadores
                      </h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        Os índices pré/pós intervenção evidenciam que a modificação do traço alvo
                        ("Neuroticismo Elevado") foi acompanhada por uma reorganização
                        anatômico-funcional comprovável pelas métricas de conectividade que
                        atingiram 90% no ciclo final.
                      </p>
                    </section>
                  </>
                )}
              </div>

              <section className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-end gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-700 font-bold">
                    <ShieldCheck className="w-5 h-5" />
                    <span>Pronto para Assinatura ICP-Brasil</span>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted/30 p-2 rounded max-w-xs">
                    Este documento será bloqueado contra edições e armazenado no Biograma
                    Longitudinal do paciente.
                  </p>
                </div>
                <div className="border-t border-foreground w-64 text-center pt-3">
                  <strong className="text-base text-primary">{currentUser.fullName}</strong>
                  <br />
                  <span className="text-sm text-muted-foreground">
                    {currentUser.registrationId}
                  </span>
                </div>
              </section>
            </div>
          </ScrollArea>

          <DialogFooter className="p-4 bg-background border-t z-10 flex sm:justify-between items-center w-full">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <Brain className="w-4 h-4 text-primary" /> IA NeuroStrata compilou este documento.
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                onClick={() => setReportModalOpen(false)}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button onClick={handleExport} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" /> Exportar PDF Final
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal da Biblioteca de Citações */}
      <Dialog open={citationsModalOpen} onOpenChange={setCitationsModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-50">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BookMarked className="w-5 h-5 text-blue-600" /> Biblioteca de Citações Favoritas
            </DialogTitle>
            <DialogDescription>
              Gerencie as referências científicas salvas (Neurosynth) e insira-as nos seus
              relatórios e matrizes.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] mt-4 pr-4">
            <div className="space-y-4">
              {citations.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground bg-white border border-dashed rounded-lg">
                  Nenhuma citação salva. Utilize o módulo de Neuronavegação para pesquisar e
                  adicionar referências aos seus favoritos.
                </div>
              ) : (
                citations.map((cit) => (
                  <Card key={cit.id} className="shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-primary text-sm leading-tight">
                            {cit.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">{cit.authors}</p>
                          <a
                            href={cit.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline mt-2 inline-block break-all"
                          >
                            {cit.link}
                          </a>
                        </div>
                        <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 flex-1 sm:flex-none justify-start"
                            onClick={() => handleInsertCitation(cit)}
                          >
                            <Copy className="w-3 h-3 mr-1.5" /> Inserir no Report
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs h-8 text-destructive hover:bg-destructive/10 flex-1 sm:flex-none justify-start"
                            onClick={() => removeCitation(cit.id)}
                          >
                            <Trash2 className="w-3 h-3 mr-1.5" /> Remover
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
          <DialogFooter className="mt-4 border-t pt-4">
            <Button variant="outline" onClick={() => setCitationsModalOpen(false)}>
              Fechar Biblioteca
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
