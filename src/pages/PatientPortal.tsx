import { useState } from 'react'
import {
  User,
  FileText,
  Activity,
  History,
  Printer,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  Download,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { SimplifiedRadarChart } from '@/components/patient-portal/SimplifiedRadarChart'
import { PatientBiogramChart } from '@/components/patient-portal/PatientBiogramChart'

export default function PatientPortal() {
  const { patients } = useAppStore()
  const patient = patients[0]
  const [activeTab, setActiveTab] = useState('dashboard')

  const handlePrint = () => {
    window.print()
  }

  const radarData = [
    { subject: 'Foco e Atenção', value: 85 },
    { subject: 'Bem-estar Emocional', value: 70 },
    { subject: 'Energia e Motivação', value: 80 },
    { subject: 'Socialização', value: 90 },
    { subject: 'Qualidade do Sono', value: 65 },
  ]

  const biogramData = [
    { date: 'Janeiro', bemEstar: 45, foco: 50, energia: 40 },
    { date: 'Março', bemEstar: 55, foco: 65, energia: 50 },
    { date: 'Maio', bemEstar: 65, foco: 75, energia: 65 },
    { date: 'Julho', bemEstar: 70, foco: 85, energia: 80 },
  ]

  const certificates = [
    {
      id: 'cert-001',
      name: 'Laudo Neurofuncional de Admissão',
      date: '10/01/2023',
      doctor: 'Dr. Renato Alves',
      type: 'Avaliação Inicial',
    },
    {
      id: 'cert-002',
      name: 'Certificado de Evolução Terapêutica (Fase 1)',
      date: '15/03/2023',
      doctor: 'Dr. Renato Alves',
      type: 'Acompanhamento',
    },
    {
      id: 'cert-003',
      name: 'Biograma Longitudinal Semestral',
      date: '20/07/2023',
      doctor: 'Dr. Renato Alves',
      type: 'Evolução',
    },
  ]

  const history = [
    {
      date: '20/07/2023',
      event: 'Emissão de Biograma Longitudinal Semestral',
      type: 'Documento',
    },
    { date: '10/06/2023', event: 'Sessão de Neuromodulação (Ciclo 2)', type: 'Intervenção' },
    { date: '15/03/2023', event: 'Avaliação de Acompanhamento (Fase 1)', type: 'Avaliação' },
    { date: '10/01/2023', event: 'Avaliação Neurofuncional de Admissão', type: 'Avaliação' },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <User className="w-8 h-8 text-accent" /> Portal do Paciente
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe sua jornada, evolução e acesse seus documentos certificados.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-muted/30 px-4 py-2 rounded-lg border">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">{patient.name}</p>
            <p className="text-xs text-muted-foreground">Paciente Ativo</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar print:hidden">
          <TabsTrigger
            value="dashboard"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <Activity className="w-4 h-4" /> Visão Geral
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <History className="w-4 h-4" /> Histórico Clínico
          </TabsTrigger>
          <TabsTrigger
            value="certificates"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <FileText className="w-4 h-4" /> Central de Diagnósticos
          </TabsTrigger>
          <TabsTrigger
            value="biogram"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2"
          >
            <TrendingUp className="w-4 h-4" /> Biograma Longitudinal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="m-0 space-y-6 print:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 shadow-sm border-t-4 border-t-accent">
              <CardHeader>
                <CardTitle className="text-lg">Progresso Global</CardTitle>
                <CardDescription>Resumo de sua evolução clínica.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-4 pb-8">
                <div className="relative flex items-center justify-center w-32 h-32 mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="hsl(var(--muted))"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      strokeDasharray="283"
                      strokeDashoffset="56"
                      strokeLinecap="round"
                      className="text-emerald-500 animate-pulse"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-3xl font-black text-emerald-600">80%</span>
                  </div>
                </div>
                <p className="text-center text-sm font-medium">Meta Terapêutica</p>
                <p className="text-center text-xs text-muted-foreground mt-2">
                  Você tem mantido excelente engajamento nos protocolos.
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">
                  Radar de Assinatura Funcional (Simplificado)
                </CardTitle>
                <CardDescription>
                  Como estão seus níveis em diferentes áreas de bem-estar e cognição.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimplifiedRadarChart data={radarData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="m-0 print:block">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Linha do Tempo Clínica</CardTitle>
              <CardDescription>
                Registro de todas as suas avaliações e procedimentos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
                {history.map((item, idx) => (
                  <div key={idx} className="pl-6 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background" />
                    <div className="bg-muted/30 p-4 rounded-lg border">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">
                        {item.date}
                      </span>
                      <p className="font-medium text-foreground">{item.event}</p>
                      <Badge variant="secondary" className="mt-2 text-[10px]">
                        {item.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="m-0 print:block">
          <div className="flex justify-between items-center mb-4 print:hidden">
            <div>
              <h2 className="text-lg font-semibold text-primary">Seus Documentos Certificados</h2>
              <p className="text-sm text-muted-foreground">
                Arquivos oficiais com validade clínica e verificação criptográfica.
              </p>
            </div>
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-2" /> Imprimir Seleção
            </Button>
          </div>
          <div className="space-y-4">
            {certificates.map((cert) => (
              <Card
                key={cert.id}
                className="shadow-sm overflow-hidden border-l-4 border-l-emerald-500 print:break-inside-avoid print:shadow-none print:border-l-0 print:border-y print:border-r print:border-border"
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-6 gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge
                          variant="outline"
                          className="border-emerald-200 text-emerald-700 bg-emerald-50"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Certificado
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-200 text-blue-700 bg-blue-50"
                        >
                          <ShieldCheck className="w-3 h-3 mr-1" /> Verificado
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-purple-200 text-purple-700 bg-purple-50"
                        >
                          <BadgeCheck className="w-3 h-3 mr-1" /> Validado
                        </Badge>
                      </div>
                      <h3 className="font-bold text-lg text-primary">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Emitido em: {cert.date} por {cert.doctor}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted/50 inline-block px-2 py-1 rounded">
                        Hash ICP-Brasil: {Math.random().toString(36).substring(2, 15)}...
                      </p>
                    </div>
                    <div className="flex flex-col sm:items-end justify-between print:hidden">
                      <Badge variant="secondary">{cert.type}</Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-4 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                      >
                        <Download className="w-4 h-4 mr-2" /> Baixar PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="biogram" className="m-0 print:block">
          <Card className="shadow-sm border-t-4 border-t-primary print:shadow-none print:border-none">
            <CardHeader className="flex flex-row justify-between items-start print:pb-2">
              <div>
                <CardTitle className="text-xl">Biograma Longitudinal Certificado</CardTitle>
                <CardDescription>
                  Acompanhamento da sua evolução funcional ao longo do tratamento.
                </CardDescription>
              </div>
              <Button variant="outline" onClick={handlePrint} className="print:hidden">
                <Printer className="w-4 h-4 mr-2" /> Imprimir Biograma
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-blue-900">
                    Documento de Valor Clínico
                  </h4>
                  <p className="text-xs text-blue-800 mt-1">
                    Este gráfico representa a consolidação validada das suas melhoras em
                    métricas-chave de saúde neurofuncional, certificado pelo seu médico assistente.
                  </p>
                </div>
              </div>
              <PatientBiogramChart data={biogramData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
