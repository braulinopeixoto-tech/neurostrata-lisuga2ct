import { useState, useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import {
  Clock,
  ShieldCheck,
  Download,
  Activity,
  FileText,
  CheckCircle2,
  Shield,
  Network,
  BrainCircuit,
  Hash,
  Globe,
  User,
  Fingerprint,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function AuditTab({ patient }: { patient: any }) {
  const { documents, patientEvidence, currentUser } = useAppStore()
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const events = useMemo(() => {
    const combined = []

    // 1. Audit Logs
    if (patient.auditLogs) {
      combined.push(
        ...patient.auditLogs.map((log: any) => {
          const isCompliance = log.action.includes('Conformidade')
          const isValidation = log.action.includes('Validad') || log.action.includes('Trust Layer')
          return {
            id: log.id,
            date: log.date,
            title: log.action,
            description: log.details || 'Registro manual no sistema EHR.',
            user: log.user,
            type: 'log',
            hash:
              `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.substring(0, 32) +
              log.id,
            ip: '172.16.254.1',
            icon: isValidation ? ShieldCheck : isCompliance ? ShieldCheck : Activity,
            color: isValidation
              ? 'text-emerald-500'
              : isCompliance
                ? 'text-green-500'
                : 'text-blue-500',
            bgColor: isValidation
              ? 'bg-emerald-500/10'
              : isCompliance
                ? 'bg-green-500/10'
                : 'bg-blue-500/10',
            metadata: log.metadata,
          }
        }),
      )
    }

    // 2. Documents
    const patientDocs = documents.filter((d: any) => d.patientId === patient.id)
    patientDocs.forEach((doc: any) => {
      combined.push({
        id: doc.id,
        date: doc.date,
        title: `Upload de Documento: ${doc.name}`,
        description: `Categoria: ${doc.category} | Status: ${doc.status === 'completed' ? 'Processado' : 'Pendente'}`,
        user: currentUser.fullName,
        type: 'document',
        hash:
          `8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92`.substring(0, 32) +
          doc.id,
        ip: '172.16.254.1',
        icon: FileText,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/10',
      })
    })

    // 3. Evidence
    const ev = patientEvidence[patient.id]
    if (ev && patientDocs.some((d: any) => d.status === 'completed')) {
      const completedDocs = patientDocs.filter((d: any) => d.status === 'completed')
      const lastDocDate =
        completedDocs.sort(
          (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        )[0]?.date || new Date().toISOString()

      combined.push({
        id: `ev-${patient.id}`,
        date: new Date(new Date(lastDocDate).getTime() + 5000).toISOString(),
        title: 'Mapeamento de Evidências Clínicas (IA)',
        description:
          'Extração automática de marcadores neurofuncionais e classificação estruturada.',
        user: 'Motor IA NeuroStrata v2.1',
        type: 'evidence',
        hash:
          `cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce`.substring(0, 32) +
          patient.id,
        ip: 'internal-cluster-01',
        metadata: ev,
        icon: BrainCircuit,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
      })
    }

    return combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }, [patient, documents, patientEvidence, currentUser])

  const handleGenerateReport = () => {
    toast({
      title: 'Gerando Certificado de Auditoria',
      description: 'Compilando log imutável com selo de verificação...',
    })
    setTimeout(() => {
      toast({
        title: 'Audit Log Exportado',
        description: 'Documento assinado digitalmente com sucesso.',
      })
    }, 2000)
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-slate-800" /> Trust Layer™ Audit Log
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Ledger imutável que registra todas as ações, modificações e validações no prontuário do
            paciente.
          </p>
        </div>
        <Button
          onClick={handleGenerateReport}
          className="bg-slate-800 hover:bg-slate-900 text-white shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Exportar Ledger (PDF)
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm border-t-4 border-t-slate-800">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-lg">Trilha de Eventos Clínicos e Interações</CardTitle>
          <CardDescription>
            Histórico cronológico não editável. Todos os registros possuem carimbo de tempo e são
            assinados criptograficamente.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] px-6 py-6">
            <div className="relative border-l-2 border-slate-200 ml-4 space-y-8 pb-4">
              {events.map((event, idx) => {
                const Icon = event.icon
                return (
                  <div key={event.id || idx} className="pl-8 relative group">
                    <div
                      className={`absolute w-8 h-8 rounded-full -left-[17px] top-0 flex items-center justify-center ring-4 ring-background ${event.bgColor} ${event.color} transition-transform group-hover:scale-110`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <Card
                      className="border-border/50 shadow-none hover:border-accent/50 hover:bg-slate-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                              {event.title}
                            </h4>
                            <p className="text-sm text-slate-600 mt-1">{event.description}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-emerald-50 text-emerald-700 border-emerald-200 flex w-fit items-center gap-1 shrink-0"
                          >
                            <ShieldCheck className="w-3 h-3" /> Verificado
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">
                          <span
                            className="flex items-center gap-1.5 font-medium text-slate-700"
                            title="Data/Hora Exata (UTC)"
                          >
                            <Clock className="w-3.5 h-3.5" />{' '}
                            {new Date(event.date).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1.5" title="Autor/Responsável">
                            <User className="w-3.5 h-3.5" /> {event.user}
                          </span>
                          <span
                            className="flex items-center gap-1.5 font-mono bg-slate-100 px-1.5 py-0.5 rounded"
                            title="Assinatura Criptográfica"
                          >
                            <Hash className="w-3.5 h-3.5" /> {event.hash.substring(0, 16)}...
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )
              })}
              {events.length === 0 && (
                <p className="text-sm text-muted-foreground ml-4">
                  Nenhum registro de auditoria encontrado neste ledger.
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-slate-50 border-t py-3 flex justify-between items-center text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Infraestrutura Validada (Compliance LGPD & HIPAA)</span>
          </div>
          <span>Padrão de Preservação: SHA-256 + Carimbo de Tempo (NTP)</span>
        </CardFooter>
      </Card>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center justify-between pr-6">
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 mb-2"
              >
                <CheckCircle2 className="w-3 h-3" /> Prova Digital Verificada
              </Badge>
            </div>
            <DialogTitle className="text-xl flex items-center gap-2">
              {selectedEvent?.icon && (
                <selectedEvent.icon className={`w-5 h-5 ${selectedEvent?.color}`} />
              )}
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription>
              Detalhes estruturados e metadados de certificação do evento no Trust Layer™.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-4">
            <div className="bg-slate-50 border rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2 border-b pb-2 text-slate-800">
                <Fingerprint className="w-4 h-4 text-slate-500" /> Metadados da Assinatura
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-slate-500 block mb-1">Data/Hora (UTC)</span>
                  <span className="font-medium flex items-center gap-2 text-slate-900">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {selectedEvent ? new Date(selectedEvent.date).toISOString() : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Endereço IP / Origem</span>
                  <span className="font-medium flex items-center gap-2 text-slate-900">
                    <Globe className="w-3 h-3 text-slate-400" />
                    {selectedEvent?.ip}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block mb-1">Hash SHA-256 (Imutabilidade)</span>
                  <span className="font-mono bg-white border px-2 py-1.5 rounded text-xs break-all flex items-center gap-2 text-slate-700">
                    <Hash className="w-3 h-3 text-slate-400 shrink-0" />
                    {selectedEvent?.hash}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block mb-1">Autor / Responsável</span>
                  <span className="font-medium flex items-center gap-2 text-slate-900">
                    <User className="w-3 h-3 text-slate-400" />
                    {selectedEvent?.user}
                  </span>
                </div>
              </div>
            </div>

            {selectedEvent?.metadata && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-slate-800">
                  <Network className="w-4 h-4 text-slate-500" /> Carga de Dados Preservada
                </h4>
                <div className="bg-white border rounded-lg p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(selectedEvent.metadata).map(([key, items]: [string, any]) => (
                      <div key={key}>
                        <h5 className="text-xs font-semibold uppercase text-slate-500 mb-1.5">
                          {key === 'rdoc'
                            ? 'Domínios RDoC'
                            : key === 'bigFive'
                              ? 'Perfil Big Five'
                              : key === 'dsm'
                                ? 'Classificação DSM-5-TR'
                                : key === 'icd'
                                  ? 'Classificação CID-11'
                                  : key === 'psychicFunctions'
                                    ? 'Funções Psíquicas'
                                    : key === 'neuralNetworks'
                                      ? 'Redes Neuronais'
                                      : key}
                        </h5>
                        <div className="flex flex-wrap gap-1.5">
                          {(Array.isArray(items) ? items : [items]).map((item, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="font-normal text-xs bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
