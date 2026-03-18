import { useState } from 'react'
import {
  User,
  FileText,
  Activity,
  History,
  Printer,
  CheckCircle2,
  ShieldCheck,
  Download,
  TrendingUp,
  Lock,
  Stethoscope,
  Calendar,
  Eye,
  Map as MapIcon,
  UploadCloud,
  Brain,
  Watch,
  RefreshCcw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import useAppStore from '@/stores/useAppStore'
import { SimplifiedRadarChart } from '@/components/patient-portal/SimplifiedRadarChart'
import { PatientDigitizationTab } from '@/components/patient-portal/PatientDigitizationTab'
import { PatientVerifiedCheckup } from '@/components/patient-portal/PatientVerifiedCheckup'
import { PatientWearablesTab } from '@/components/patient-portal/PatientWearablesTab'
import { DynamicBiograma } from '@/components/patient-portal/DynamicBiograma'

export default function PatientPortal() {
  const { patients, patientBiogram, simulateBiogramSync } = useAppStore()
  const { toast } = useToast()
  // Use P001 which is fully mocked, or fallback
  const patient = patients.find((p) => p.id === 'P001') || patients[0]
  const [activeTab, setActiveTab] = useState('biogram')
  const [isSyncing, setIsSyncing] = useState(false)

  if (!patient.hasPortalAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center animate-fade-in">
        <Lock className="w-16 h-16 text-muted-foreground opacity-50" />
        <h2 className="text-2xl font-bold text-primary">Acesso Restrito</h2>
        <p className="text-muted-foreground max-w-md">
          Seu acesso ao Portal do Paciente está temporariamente suspenso ou ainda não foi liberado
          pelo seu profissional de saúde.
        </p>
      </div>
    )
  }

  const isSimplified = patient.portalVisibility === 'Simplified'
  const patientBiogramData = patientBiogram[patient.id] || []

  const handlePrint = () => {
    window.print()
  }

  const handleSimulateSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      simulateBiogramSync(patient.id)
      setIsSyncing(false)
      toast({
        title: 'Sincronização Concluída',
        description: 'Novos dados de Wearables integrados ao seu Biograma.',
        action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      })
    }, 1500)
  }

  const handleDownloadPDF = (certName: string) => {
    const dummyContent = `--- NEUROSTRATA DOCUMENTO OFICIAL ---\n\nPaciente: ${patient.name}\nDocumento: ${certName}\nData: ${new Date().toLocaleDateString('pt-BR')}\n\n[Assinatura Digital Verificada]`
    const blob = new Blob([dummyContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${certName.replace(/\s+/g, '_')}_${patient.name.replace(/\s+/g, '')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast({
      title: 'Download Concluído',
      description: `O arquivo "${certName}" foi baixado para o seu dispositivo.`,
      action: <CheckCircle2 className="text-emerald-500 w-5 h-5" />,
    })
  }

  const radarEvolutionData = [
    { subject: 'Foco e Atenção', baseline: 45, current: 85 },
    { subject: 'Bem-estar Emocional', baseline: 40, current: 75 },
    { subject: 'Energia e Motivação', baseline: 50, current: 80 },
    { subject: 'Regulação Social', baseline: 55, current: 90 },
    { subject: 'Qualidade do Sono', baseline: 35, current: 70 },
  ]

  const certificates = [
    {
      id: 'cert-003',
      name: 'Biograma Longitudinal Semestral',
      date: '20/07/2023',
      doctor: 'Dr. Renato Alves',
      crm: 'CRM 12345-SP',
      type: 'Acompanhamento',
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    },
    {
      id: 'cert-002',
      name: 'Certificado de Evolução Terapêutica (Fase 1)',
      date: '15/03/2023',
      doctor: 'Dr. Renato Alves',
      crm: 'CRM 12345-SP',
      type: 'Intervenção',
      hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
    },
    {
      id: 'cert-001',
      name: 'Laudo Neurofuncional de Admissão',
      date: '10/01/2023',
      doctor: 'Dr. Renato Alves',
      crm: 'CRM 12345-SP',
      type: 'Avaliação Inicial',
      hash: 'b10a8db164e0754105b7a99be72e3fe5ffe3c71ea124e477610c3b4007b8b217',
    },
  ]

  const history = [
    {
      date: '20/07/2023',
      event: 'Emissão de Biograma Longitudinal Semestral',
      type: 'Documento',
      desc: 'Consolidação de ganhos da Fase 2 do tratamento.',
    },
    {
      date: '10/06/2023',
      event: 'Sessão de Neuromodulação (Ciclo 2)',
      type: 'Intervenção',
      desc: 'Protocolo de estabilização fronto-límbica.',
    },
    {
      date: '15/03/2023',
      event: 'Avaliação de Acompanhamento (Fase 1)',
      type: 'Avaliação',
      desc: 'Reavaliação de marcadores cognitivos. Melhora observada.',
    },
    {
      date: '10/01/2023',
      event: 'Avaliação Neurofuncional de Admissão',
      type: 'Avaliação',
      desc: 'Mapeamento multidimensional completo.',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium shadow-sm print:hidden">
        <Lock className="w-4 h-4" />
        Ambiente Seguro e Criptografado do Paciente
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <User className="w-8 h-8 text-accent" /> Portal do Paciente
          </h1>
          <p className="text-muted-foreground mt-1">
            Acompanhe sua jornada clínica, acesse laudos e monitore sua evolução funcional.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {patient.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-sm leading-tight text-foreground">{patient.name}</p>
              <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Paciente {patient.status}
              </p>
            </div>
          </div>
          {activeTab === 'biogram' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSimulateSync}
              disabled={isSyncing}
              className="w-full bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800"
            >
              <RefreshCcw className={`w-3.5 h-3.5 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              Sincronizar Wearables
            </Button>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar print:hidden">
          <TabsTrigger
            value="biogram"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap text-primary font-bold uppercase tracking-tight"
          >
            <TrendingUp className="w-4 h-4" /> Biograma Dinâmico
          </TabsTrigger>
          <TabsTrigger
            value="checkup"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Brain className="w-4 h-4" /> Check-up Mental
          </TabsTrigger>
          <TabsTrigger
            value="dashboard"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <Activity className="w-4 h-4" /> Consulta Rápida
          </TabsTrigger>
          <TabsTrigger
            value="wearable"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap font-semibold text-indigo-700"
          >
            <Watch className="w-4 h-4" /> Wearables & IA
          </TabsTrigger>
          <TabsTrigger
            value="digitization"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
          >
            <UploadCloud className="w-4 h-4" /> Digitalização Validada
          </TabsTrigger>
          {!isSimplified && (
            <>
              <TabsTrigger
                value="certificates"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
              >
                <FileText className="w-4 h-4" /> Documentos Oficiais
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 flex gap-2 whitespace-nowrap"
              >
                <History className="w-4 h-4" /> Histórico Clínico
              </TabsTrigger>
            </>
          )}
        </TabsList>

        <TabsContent value="biogram" className="m-0 print:block animate-fade-in">
          <DynamicBiograma data={patientBiogramData} />
        </TabsContent>

        <TabsContent value="checkup" className="m-0 print:hidden animate-fade-in space-y-6">
          <PatientVerifiedCheckup patientId={patient.id} />
        </TabsContent>

        <TabsContent value="dashboard" className="m-0 space-y-6 print:block animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1 shadow-sm border-t-4 border-t-accent flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">Progresso Global</CardTitle>
                <CardDescription>Resumo de sua evolução clínica até o momento.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center flex-1 pb-8">
                <div className="relative flex items-center justify-center w-36 h-36 mb-6">
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
                      className="text-emerald-500 animate-pulse-glow"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-4xl font-black text-emerald-600">80%</span>
                  </div>
                </div>
                <div className="w-full space-y-3 px-4">
                  <div className="flex justify-between items-center text-sm border-b pb-2">
                    <span className="text-muted-foreground">Fase Atual</span>
                    <span className="font-semibold text-primary">Platô de Regulação</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Próxima Avaliação</span>
                    <span className="font-semibold text-primary">15/08/2023</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapIcon className="w-5 h-5 text-primary" /> Radar de Assinatura Evolutiva
                </CardTitle>
                <CardDescription>
                  Comparativo entre seu estado na admissão (Linha de Base) e o momento atual.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SimplifiedRadarChart data={radarEvolutionData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wearable" className="m-0 space-y-6 print:block animate-fade-in">
          <PatientWearablesTab patientId={patient.id} />
        </TabsContent>

        <TabsContent value="digitization" className="m-0 print:block animate-fade-in">
          <PatientDigitizationTab patientId={patient.id} />
        </TabsContent>

        {!isSimplified && (
          <TabsContent value="certificates" className="m-0 print:block animate-fade-in">
            <div className="flex justify-between items-center mb-4 print:hidden">
              <div>
                <h2 className="text-lg font-semibold text-primary">Documentos Oficiais e Laudos</h2>
                <p className="text-sm text-muted-foreground">
                  Arquivos com validade clínica e verificação criptográfica ICP-Brasil.
                </p>
              </div>
              <Button variant="outline" onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" /> Imprimir Lista
              </Button>
            </div>
            <div className="space-y-4">
              {certificates.map((cert) => (
                <Card
                  key={cert.id}
                  className="shadow-sm overflow-hidden border-l-4 border-l-emerald-500 hover:border-l-emerald-600 transition-colors print:break-inside-avoid print:shadow-none print:border-l-0 print:border-y print:border-r print:border-border"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col sm:flex-row justify-between p-5 gap-6">
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 bg-emerald-50"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Assinado Digitalmente
                          </Badge>
                          <Badge
                            variant="outline"
                            className="border-blue-200 text-blue-700 bg-blue-50"
                          >
                            <ShieldCheck className="w-3 h-3 mr-1" /> ICP-Brasil
                          </Badge>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground">
                            {cert.type}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="font-bold text-lg text-primary">{cert.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> Emitido em: {cert.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Stethoscope className="w-4 h-4" /> {cert.doctor} ({cert.crm})
                            </span>
                          </div>
                        </div>

                        <div className="bg-muted/40 p-2.5 rounded text-xs border border-border/50">
                          <div className="text-muted-foreground font-semibold uppercase mb-1 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Hash de Autenticidade (SHA-256):
                          </div>
                          <span className="font-mono text-slate-600 break-all select-all">
                            {cert.hash}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col items-center justify-end gap-3 print:hidden shrink-0 border-t sm:border-t-0 sm:border-l pt-4 sm:pt-0 sm:pl-6">
                        <Button
                          variant="default"
                          className="w-full sm:w-auto"
                          onClick={() => handleDownloadPDF(cert.name)}
                        >
                          <Download className="w-4 h-4 mr-2" /> Baixar PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto bg-transparent"
                          onClick={() => handleDownloadPDF(cert.name)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> Visualizar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {!isSimplified && (
          <TabsContent value="history" className="m-0 print:block animate-fade-in">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Linha do Tempo Clínica</CardTitle>
                <CardDescription>
                  Registro de todos os seus eventos, avaliações e procedimentos realizados.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4 pt-2">
                  {history.map((item, idx) => (
                    <div key={idx} className="pl-6 relative group">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 ring-4 ring-background group-hover:scale-125 transition-transform" />
                      <div className="bg-white p-4 rounded-lg border shadow-sm group-hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" /> {item.date}
                          </span>
                          <Badge variant="secondary" className="text-[10px]">
                            {item.type}
                          </Badge>
                        </div>
                        <p className="font-semibold text-foreground text-base">{item.event}</p>
                        <p className="text-sm text-muted-foreground mt-1.5">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
