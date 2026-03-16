import { useState, useMemo } from 'react'
import { TrendingUp, CheckCircle, FileText, Download, ShieldCheck, Activity, Brain, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Line, LineChart, BarChart, Bar, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export default function PerformanceTimeline() {
  const { patients, currentUser, patientEvidence, quickReportDraft } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [showPerformance, setShowPerformance] = useState(true)
  const [showStability, setShowStability] = useState(true)
  const [showConnectivity, setShowConnectivity] = useState(true)
  
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('progress')

  const patient = patients.find(p => p.id === selectedPatientId)
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
        {selectedPatientId && (
          <Button onClick={() => setReportModalOpen(true)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <FileText className="w-4 h-4 mr-2" /> Gerar Relatório Técnico
          </Button>
        )}
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
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
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
          <TabsList className="w-full sm:w-auto grid grid-cols-2 mb-4">
            <TabsTrigger value="longitudinal" className="flex items-center gap-2">
              <Activity className="w-4 h-4" /> Evolução Longitudinal
            </TabsTrigger>
            <TabsTrigger value="prepost" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" /> Comparativo Pré x Pós
            </TabsTrigger>
          </TabsList>

          <TabsContent value="longitudinal">
            <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl">Trajetória de {patient?.name}</CardTitle>
                <CardDescription>Acompanhamento progressivo através das fases do protocolo terapêutico.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={timelineData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                          tickLine={false} 
                          axisLine={false} 
                          dy={10} 
                        />
                        <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} dx={-10} />
                        <ChartTooltip content={<ChartTooltipContent labelKey="phase" />} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />

                        {showPerformance && (
                          <Line type="monotone" name="Performance" dataKey="performance" stroke="hsl(var(--chart-1))" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
                        )}
                        {showStability && (
                          <Line type="monotone" name="Estabilidade" dataKey="stability" stroke="hsl(var(--chart-2))" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
                        )}
                        {showConnectivity && (
                          <Line type="monotone" name="Conectividade Global" dataKey="connectivity" stroke="hsl(var(--chart-3))" strokeWidth={4} dot={{ r: 5, strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 7 }} />
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
                <CardDescription>Contraste direto entre a linha de base (admissão) e o estado funcional atual.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] mt-4">
                  <ChartContainer config={barChartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={prePostData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="metric" tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} dy={10} />
                        <YAxis domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))' }} tickLine={false} axisLine={false} dx={-10} />
                        <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: 'hsl(var(--muted)/0.5)' }} />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        
                        <Bar dataKey="pre" name="Pré-Intervenção (Base)" fill="hsl(var(--muted-foreground)/0.5)" radius={[4, 4, 0, 0]} barSize={40} />
                        <Bar dataKey="post" name="Pós-Intervenção (Atual)" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in-up">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-primary text-sm">Remodelação Consolidada</h4>
                <p className="text-xs text-muted-foreground mt-1">O aumento sustentado na conectividade global correlaciona-se com a melhora reportada na regulação emocional e atenção seletiva.</p>
              </div>
            </div>
            <div className="bg-accent/5 p-4 rounded-lg border border-accent/20 flex items-start gap-3">
              <Brain className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-accent text-sm">Platô Terapêutico Alcançado</h4>
                <p className="text-xs text-muted-foreground mt-1">As métricas de estabilidade indicam que o paciente atingiu uma reserva funcional robusta. Indicado fase de manutenção.</p>
              </div>
            </div>
          </div>
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
                  <SelectItem value="evidence">Síntese de Evidências Clínicas (Auditoria)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>

          <ScrollArea className="flex-1 p-6">
            <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[600px] max-w-3xl mx-auto text-sm animate-fade-in">
              <div className="text-center border-b pb-6 mb-8">
                <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">NEUROSTRATA</h2>
                <p className="text-muted-foreground uppercase tracking-widest mt-2 font-medium">
                  {selectedTemplate === 'progress' && 'Relatório Longitudinal de Progresso'}
                  {selectedTemplate === 'referral' && 'Encaminhamento Multiprofissional Estruturado'}
                  {selectedTemplate === 'evidence' && 'Síntese de Evidências Clínicas e Biomarcadores'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div><span className="font-semibold text-muted-foreground uppercase text-xs">Paciente:</span> <p className="font-medium text-base">{patient?.name}</p></div>
                <div><span className="font-semibold text-muted-foreground uppercase text-xs">Data de Emissão:</span> <p className="font-medium text-base">{new Date().toLocaleDateString('pt-BR')}</p></div>
                <div><span className="font-semibold text-muted-foreground uppercase text-xs">Período Avaliado:</span> <p className="font-medium">Jan/2023 - Jul/2023</p></div>
                <div><span className="font-semibold text-muted-foreground uppercase text-xs">Responsável Técnico:</span> <p className="font-medium">{currentUser.fullName}</p></div>
              </div>

              <div className="space-y-6 leading-relaxed text-slate-800">
                {selectedTemplate === 'progress' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">1. Evolução Clínica</h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        O paciente demonstrou evolução substancial em suas métricas primárias durante o período observado. O Score de Performance evoluiu de <strong>{timelineData[0]?.performance}%</strong> (Linha de Base) para <strong>{timelineData[timelineData.length - 1]?.performance}%</strong> (Final). Observou-se uma redução significativa nas oscilações comportamentais, atestada pelo aumento do Score de Estabilidade para 80%. A queixa inicial de fadiga atencional encontra-se atualmente em remissão funcional.
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">2. Dinâmica de Conectividade</h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        O índice de conectividade neural global saltou de 25% para 90% ao término da Fase 2. Este ganho estrutural reflete a otimização das redes de modo padrão (DMN) e executiva central (CEN), corroborando a eficácia do protocolo de neuromodulação adotado.
                      </p>
                    </section>
                  </>
                )}

                {selectedTemplate === 'referral' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">1. Motivo do Encaminhamento</h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        Solicita-se avaliação e acompanhamento conjunto nas áreas de fonoaudiologia e terapia ocupacional, visando potencializar os ganhos obtidos na fase de regulação basal (concluída com sucesso). O paciente encontra-se em janela de alta plasticidade sináptica (Score de Plasticidade > 80%).
                      </p>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">2. Achados Neurofuncionais (Resumo)</h3>
                      <div className="border p-4 rounded-lg bg-slate-50/50 space-y-2">
                        {evidence ? (
                          <>
                            <p><strong>Domínios RDoC Elevados:</strong> {evidence.rdoc.join(', ')}</p>
                            <p><strong>Alvos Neurais Mapeados:</strong> {evidence.neuralNetworks.join(', ')}</p>
                            <p><strong>Funções Psíquicas em Risco Residual:</strong> {evidence.psychicFunctions.join(', ')}</p>
                          </>
                        ) : (
                          <p className="italic text-muted-foreground">Sistema RDoC: Déficit Executivo moderado detectado. Regulação emocional estável no momento atual.</p>
                        )}
                      </div>
                    </section>
                  </>
                )}

                {selectedTemplate === 'evidence' && (
                  <>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">1. Justificativa Terapêutica (Metanálise)</h3>
                      <div className="border p-4 rounded-lg bg-slate-50/50 space-y-3">
                        <p>
                          A estratégia de intervenção adotada baseou-se em cruzamento automático de dados da base Neurosynth. O quadro de hipoatividade pré-frontal detectado na linha de base possui forte correlação (Z-Score > 0.6) com os achados clínicos de desregulação emocional.
                        </p>
                        {quickReportDraft && (
                          <div className="bg-white p-3 border border-dashed rounded text-sm italic">
                            <span className="font-semibold block mb-1 not-italic">Trechos da Pesquisa Associada:</span>
                            {quickReportDraft}
                          </div>
                        )}
                      </div>
                    </section>
                    <section>
                      <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-3">2. Consolidação de Biomarcadores</h3>
                      <p className="border p-4 rounded-lg bg-slate-50/50">
                        Os índices pré/pós intervenção evidenciam que a modificação do traço alvo ("Neuroticismo Elevado") foi acompanhada por uma reorganização anatômico-funcional comprovável pelas métricas de conectividade que atingiram 90% no ciclo final.
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
                    Este documento será bloqueado contra edições e armazenado no Biograma Longitudinal do paciente.
                  </p>
                </div>
                <div className="border-t border-foreground w-64 text-center pt-3">
                  <strong className="text-base text-primary">{currentUser.fullName}</strong><br />
                  <span className="text-sm text-muted-foreground">{currentUser.registrationId}</span>
                </div>
              </section>
            </div>
          </ScrollArea>
          
          <DialogFooter className="p-4 bg-background border-t z-10 flex sm:justify-between items-center w-full">
             <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <Brain className="w-4 h-4 text-primary" /> IA NeuroStrata compilou este documento.
             </div>
             <div className="flex gap-2 w-full sm:w-auto">
              <Button variant="outline" onClick={() => setReportModalOpen(false)} className="w-full sm:w-auto">Cancelar</Button>
              <Button onClick={handleExport} className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" /> Exportar PDF Final
              </Button>
             </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
