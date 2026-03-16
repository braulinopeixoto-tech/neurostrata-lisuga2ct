import { useState } from 'react'
import {
  Scale,
  ShieldCheck,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  Lock,
  FileText,
  Calendar,
  History,
  TrendingUp,
  Landmark,
  HeartPulse,
  Building2,
  Download,
  Gavel,
  FileCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'
import { PatientBiogramChart } from '@/components/patient-portal/PatientBiogramChart'

export default function DefensorPortal() {
  const { patients, documents } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')

  // Link Generation State
  const [recipient, setRecipient] = useState<string>('')
  const [expiration, setExpiration] = useState<string>('')
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)

  // Preview States
  const [previewLinkOpen, setPreviewLinkOpen] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<any>(null)

  const patient = patients.find((p) => p.id === selectedPatientId)
  const patientDocs = documents.filter((d) => d.patientId === selectedPatientId)

  const biogramData = [
    { date: 'Janeiro', bemEstar: 45, foco: 50, energia: 40 },
    { date: 'Março', bemEstar: 55, foco: 65, energia: 50 },
    { date: 'Maio', bemEstar: 65, foco: 75, energia: 65 },
    { date: 'Julho', bemEstar: 75, foco: 85, energia: 80 },
  ]

  const historyEvents = [
    {
      date: '20/07/2023',
      event: 'Emissão de Biograma Longitudinal Semestral',
      type: 'Documento Legal',
      desc: 'Consolidação de ganhos da Fase 2 do tratamento.',
    },
    {
      date: '10/06/2023',
      event: 'Laudo Neurofuncional (Estratificação)',
      type: 'Perícia',
      desc: 'Comprovação de déficit executivo para pedido de liminar.',
    },
    {
      date: '15/03/2023',
      event: 'Avaliação de Acompanhamento (Fase 1)',
      type: 'Avaliação',
      desc: 'Reavaliação de marcadores cognitivos. Melhora observada.',
    },
  ]

  const legalOutcomes = [
    {
      id: '1',
      caseRef: 'Proc. 1002345-67.2023.8.26.0000',
      patientName: 'Carlos Oliveira',
      outcome: 'Liminar Deferida',
      date: '15/08/2023',
      description: 'Garantia de custeio de tratamento neuromodulatório pelo plano de saúde.',
    },
    {
      id: '2',
      caseRef: 'Proc. 1009876-54.2023.8.26.0000',
      patientName: 'Mariana Santos',
      outcome: 'Vitória Judicial (Sentença)',
      date: '20/07/2023',
      description:
        'Reconhecimento de validade do laudo neurofuncional para concessão de benefício.',
    },
    {
      id: '3',
      caseRef: 'Proc. 1011223-44.2023.8.26.0000',
      patientName: 'Roberto Fernandes',
      outcome: 'Acordo Homologado',
      date: '05/06/2023',
      description: 'Acordo com a rede hospitalar para fornecimento de intervenção contínua.',
    },
  ]

  const handleToggleDoc = (docId: string) => {
    setSelectedDocs((prev) =>
      prev.includes(docId) ? prev.filter((id) => id !== docId) : [...prev, docId],
    )
  }

  const handleGenerateLink = () => {
    if (!selectedPatientId || !recipient || !expiration || selectedDocs.length === 0) {
      toast({
        title: 'Atenção',
        description: 'Preencha todos os campos e selecione pelo menos um documento.',
        variant: 'destructive',
      })
      return
    }

    const token = Math.random().toString(36).substring(2, 10)
    setGeneratedLink(`https://neurostrata.app/legal/verify?token=${token}&rec=${recipient}`)
    toast({
      title: 'Link Seguro Gerado',
      description: 'O link temporário foi criado e copiado para a área de transferência.',
    })
  }

  const selectedDocsData = patientDocs.filter((d) => selectedDocs.includes(d.id))

  const handleDownloadDoc = (doc: any) => {
    toast({
      title: 'Download Iniciado',
      description: `Baixando cópia certificada de: ${doc.name}`,
    })
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Scale className="w-8 h-8 text-indigo-600" /> Portal do Defensor
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de defesas jurídicas apoiadas em dados neurofuncionais e Biograma Longitudinal.
          </p>
        </div>
        <div className="w-full sm:w-72">
          <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
            <SelectTrigger className="bg-white border-indigo-200">
              <SelectValue placeholder="Selecionar Paciente/Cliente..." />
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
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <History className="w-4 h-4" /> Histórico Clínico
          </TabsTrigger>
          <TabsTrigger
            value="gerar-link"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <LinkIcon className="w-4 h-4" /> Envio de Evidências (Link)
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <FileCheck className="w-4 h-4" /> Digitalização Validada
          </TabsTrigger>
          <TabsTrigger
            value="outcomes"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Gavel className="w-4 h-4" /> Resultados Jurídicos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="m-0 focus-visible:outline-none">
          {!patient ? (
            <Card className="bg-muted/30 border-dashed">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <History className="w-12 h-12 mb-4 opacity-20" />
                <p>Selecione um paciente para visualizar seu histórico e biograma.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-indigo-50 to-transparent rounded-xl border border-indigo-100">
                  <div className="bg-white border border-indigo-200 p-2.5 rounded-lg text-indigo-600 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-indigo-950 text-sm">
                      Biograma Longitudinal Ativo
                    </h4>
                    <p className="text-xs text-indigo-900/80 mt-1 leading-relaxed font-medium">
                      Evolução documentada com rastreabilidade auditável para amparo jurídico.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-emerald-50 to-transparent rounded-xl border border-emerald-100">
                  <div className="bg-white border border-emerald-200 p-2.5 rounded-lg text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">Diagnóstico Validado</h4>
                    <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed font-medium">
                      Precisão técnica baseada em evidências padronizadas e cruzamento RDoC/DSM.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-indigo-500">
                  <CardHeader>
                    <CardTitle className="text-lg">Biograma de {patient.name}</CardTitle>
                    <CardDescription>
                      Consolidação longitudinal das métricas clínicas para fundamentação de pedidos.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <PatientBiogramChart data={biogramData} />
                  </CardContent>
                </Card>

                <Card className="shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">Eventos Chave</CardTitle>
                    <CardDescription>Linha do tempo de laudos e avaliações.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-2 pt-2">
                      {historyEvents.map((item, idx) => (
                        <div key={idx} className="pl-6 relative group">
                          <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[7px] top-1.5 ring-4 ring-background group-hover:scale-125 transition-transform" />
                          <div className="bg-white p-3 rounded-lg border shadow-sm group-hover:border-indigo-300 transition-colors">
                            <div className="flex justify-between items-start mb-1.5">
                              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {item.date}
                              </span>
                            </div>
                            <p className="font-semibold text-foreground text-sm">{item.event}</p>
                            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="gerar-link" className="m-0 focus-visible:outline-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-t-accent shadow-sm">
              <CardHeader>
                <CardTitle>Configuração de Acesso Legal</CardTitle>
                <CardDescription>
                  Defina o escopo do compartilhamento de evidências clínicas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Paciente / Cliente</label>
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

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tipo de Destinatário (Magistrado/Perito)
                  </label>
                  <Select value={recipient} onValueChange={setRecipient}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione a entidade..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="magistrado">Juiz / Magistrado</SelectItem>
                      <SelectItem value="perito">Perito Judicial</SelectItem>
                      <SelectItem value="mp">Ministério Público</SelectItem>
                      <SelectItem value="plano">Auditoria de Plano de Saúde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Validade do Link</label>
                  <Select value={expiration} onValueChange={setExpiration}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Tempo de expiração..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">24 Horas</SelectItem>
                      <SelectItem value="7d">7 Dias</SelectItem>
                      <SelectItem value="30d">30 Dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Seleção de Provas Documentais</CardTitle>
                <CardDescription>
                  Escolha os documentos que embasarão o pleito jurídico.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!patient ? (
                  <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-md text-center">
                    Selecione um paciente primeiro.
                  </div>
                ) : patientDocs.length === 0 ? (
                  <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-md text-center">
                    Nenhum documento encontrado para este paciente.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {patientDocs.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <Checkbox
                          id={doc.id}
                          checked={selectedDocs.includes(doc.id)}
                          onCheckedChange={() => handleToggleDoc(doc.id)}
                          className="mt-1"
                        />
                        <div className="grid gap-1.5 leading-none w-full">
                          <label
                            htmlFor={doc.id}
                            className="text-sm font-medium cursor-pointer leading-tight"
                          >
                            {doc.name}
                          </label>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <Badge variant="outline" className="text-[10px] py-0">
                              {doc.category}
                            </Badge>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />{' '}
                              {new Date(doc.date).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 border-t pt-6 mt-6">
            <Button
              variant="outline"
              onClick={() => setPreviewLinkOpen(true)}
              disabled={!generatedLink}
            >
              <Eye className="w-4 h-4 mr-2" /> Pré-visualização do Juiz
            </Button>
            <Button onClick={handleGenerateLink} className="bg-indigo-600 hover:bg-indigo-700">
              <LinkIcon className="w-4 h-4 mr-2" /> Gerar Link Probatório
            </Button>
          </div>

          {generatedLink && (
            <Card className="border-indigo-200 bg-indigo-50/50 mt-6 shadow-sm animate-fade-in-up">
              <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3 text-indigo-800">
                  <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                  <div>
                    <p className="font-semibold text-sm">Link de Evidências Ativo</p>
                    <p className="text-xs text-indigo-700 mt-1 font-mono break-all bg-indigo-100/50 p-1 rounded inline-block">
                      {generatedLink}
                    </p>
                  </div>
                </div>
                <div className="text-xs text-indigo-700 font-medium">Expira em: {expiration}</div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documents" className="m-0 focus-visible:outline-none">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-primary" /> Repositório de Digitalização Validada
              </CardTitle>
              <CardDescription>
                Acesso de leitura aos exames, testes e relatórios processados e validados
                clinicamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!patient ? (
                <div className="text-sm text-muted-foreground p-10 bg-muted/20 border border-dashed rounded-md text-center">
                  Selecione um paciente para ver seus documentos validados.
                </div>
              ) : patientDocs.length === 0 ? (
                <div className="text-sm text-muted-foreground p-10 bg-muted/20 border border-dashed rounded-md text-center">
                  O paciente não possui documentos registrados.
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead>Documento</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Validação</TableHead>
                        <TableHead className="text-right">Ação</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patientDocs.map((doc) => (
                        <TableRow key={doc.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              {doc.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-normal">
                              {doc.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(doc.date).toLocaleDateString('pt-BR')}
                          </TableCell>
                          <TableCell>
                            {doc.validationStatus === 'Validado' ? (
                              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                                <ShieldCheck className="w-3 h-3 mr-1" /> Validado
                              </Badge>
                            ) : (
                              <Badge variant="secondary">Pendente</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" onClick={() => setPreviewDoc(doc)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDownloadDoc(doc)}
                              >
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="m-0 focus-visible:outline-none">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gavel className="w-5 h-5 text-indigo-600" /> Histórico de Resultados Jurídicos
              </CardTitle>
              <CardDescription>
                Rastreio de decisões judiciais e liminares obtidas com apoio dos laudos de
                estratificação NeuroStrata.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead>Processo / Referência</TableHead>
                      <TableHead>Paciente</TableHead>
                      <TableHead>Resultado Alcançado</TableHead>
                      <TableHead>Data</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legalOutcomes.map((outcome) => (
                      <TableRow key={outcome.id}>
                        <TableCell>
                          <div className="font-medium text-primary">{outcome.caseRef}</div>
                          <div className="text-xs text-muted-foreground mt-1 max-w-md line-clamp-1">
                            {outcome.description}
                          </div>
                        </TableCell>
                        <TableCell>{outcome.patientName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              outcome.outcome.includes('Vitória') ||
                              outcome.outcome.includes('Acordo')
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200'
                            }
                          >
                            <Gavel className="w-3 h-3 mr-1" /> {outcome.outcome}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{outcome.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Trust & Certification Bar */}
      <div className="space-y-6 pt-10 mt-10 border-t border-border/60">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">
            Chancelas e Certificações Institucionais
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Nossa infraestrutura assegura a validade clínica e jurídica dos dados apresentados.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'OAB / Defensoria', icon: Scale, desc: 'Amparo Jurídico' },
            { name: 'Ministério Público', icon: Landmark, desc: 'Acesso Legal EHR' },
            { name: 'Planos de Saúde', icon: HeartPulse, desc: 'Auditoria Clínica' },
            { name: 'Redes Hospitalares', icon: Building2, desc: 'Integração de Dados' },
          ].map((cert, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border/80 shadow-sm text-center transition-all hover:shadow-md hover:border-indigo-400 group"
            >
              <cert.icon className="w-8 h-8 text-slate-400 mb-3 group-hover:text-indigo-600 transition-colors" />
              <span className="font-semibold text-sm text-foreground">{cert.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{cert.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for Previewing the Generated Link */}
      <Dialog open={previewLinkOpen} onOpenChange={setPreviewLinkOpen}>
        <DialogContent className="max-w-3xl bg-muted/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Lock className="w-5 h-5 text-primary" /> Visualização do Magistrado / Perito
            </DialogTitle>
            <DialogDescription>
              Interface simplificada e somente leitura que o destinatário acessará.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-white rounded-xl shadow-elevation p-6 min-h-[400px] border border-border/50">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-indigo-900 tracking-tight flex items-center gap-2">
                <Scale className="w-6 h-6" /> Portal de Evidências Judiciais
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Acesso Legal Autorizado - NeuroStrata Systems
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                  Identificação do Pleito
                </h3>
                <p className="font-mono text-sm">ID Paciente: {patient?.id || '---'}</p>
                <p className="text-sm mt-1">Status: Liberação Temporária de Provas e Laudos</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-l-4 border-indigo-500 pl-3">
                  Documentos Anexados
                </h3>
                {selectedDocsData.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    Nenhum documento selecionado.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedDocsData.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-background hover:border-indigo-300 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-indigo-600" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Emissão: {new Date(doc.date).toLocaleDateString('pt-BR')} | Validação:{' '}
                              {doc.validationStatus}
                            </p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                          Visualizar Autos
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-dashed text-center text-xs text-muted-foreground">
              <p>
                Este ambiente é auditado. Todas as visualizações geram logs anexados ao Biograma
                Longitudinal.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for Previewing a Specific Document */}
      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-slate-50/50">
          <DialogHeader className="p-4 bg-white border-b z-10">
            <div className="flex justify-between items-start pr-8">
              <div>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-indigo-600" /> Visualizador de Documentos (Defesa)
                </DialogTitle>
                <DialogDescription className="mt-1">{previewDoc?.name}</DialogDescription>
              </div>
              <Badge
                variant="outline"
                className={
                  previewDoc?.validationStatus === 'Validado'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }
              >
                Status: {previewDoc?.validationStatus}
              </Badge>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-muted/20">
            <div className="bg-white shadow-elevation border rounded-sm w-full max-w-3xl min-h-full p-6 sm:p-10 relative">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03]">
                <Scale className="w-32 h-32" />
              </div>
              <div className="text-center border-b pb-6 mb-8">
                <h2 className="text-2xl font-serif font-bold text-indigo-900 uppercase tracking-widest">
                  NEUROSTRATA
                </h2>
                <p className="text-muted-foreground uppercase tracking-widest mt-1 text-xs font-medium">
                  Documentação Probatória
                </p>
              </div>
              <div className="space-y-6 text-sm text-slate-700 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-lg border border-slate-100">
                  <div>
                    <span className="font-semibold text-muted-foreground">Categoria:</span> <br />
                    {previewDoc?.category}
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Data:</span> <br />
                    {previewDoc ? new Date(previewDoc.date).toLocaleDateString('pt-BR') : ''}
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">ID Referência:</span>{' '}
                    <br />
                    <span className="font-mono text-xs">{previewDoc?.id}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Hash ICP-Brasil:</span>{' '}
                    <br />
                    <span className="font-mono text-[10px] break-all">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                  </div>
                </div>
                <div className="p-8 sm:p-12 border-2 border-dashed border-indigo-100 rounded-lg text-center text-muted-foreground mt-8 bg-indigo-50/30 flex flex-col items-center justify-center min-h-[300px]">
                  <FileText className="w-16 h-16 mb-4 text-indigo-200" />
                  <p className="max-w-md mx-auto">
                    O conteúdo do arquivo <strong>{previewDoc?.name}</strong> está bloqueado para
                    edições e pronto para anexação judicial.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                    <Lock className="w-3 h-3" /> Integridade validada
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 bg-background border-t z-10 flex sm:justify-between items-center w-full">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Assinatura Digital Preservada
            </div>
            <Button
              onClick={() => handleDownloadDoc(previewDoc)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              <Download className="w-4 h-4 mr-2" /> Baixar Autos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
