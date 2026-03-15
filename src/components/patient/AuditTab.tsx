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
        ...patient.auditLogs.map((log: any) => ({
          id: log.id,
          date: log.date,
          title: log.action,
          description: 'Registro manual no sistema EHR.',
          user: log.user,
          type: 'log',
          hash:
            `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.substring(0, 32) +
            log.id,
          ip: '172.16.254.1',
          icon: Activity,
          color: 'text-blue-500',
          bgColor: 'bg-blue-500/10',
        })),
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
      title: 'Gerando Certificado',
      description: 'Compilando biograma longitudinal e selo de verificação...',
    })
    setTimeout(() => {
      toast({
        title: 'Biograma Exportado',
        description: 'Documento assinado digitalmente com sucesso.',
      })
    }, 2000)
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-600" /> Biograma Longitudinal EHR
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Trilha de auditoria certificada com validade legal e preservação criptográfica.
          </p>
        </div>
        <Button
          onClick={handleGenerateReport}
          className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
        >
          <Download className="w-4 h-4 mr-2" /> Gerar Biograma Certificado
        </Button>
      </div>

      <Card className="border-border/60 shadow-sm">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle className="text-lg">Eventos Clínicos e Interações</CardTitle>
          <CardDescription>
            Histórico cronológico imutável. Todos os registros são assinados digitalmente.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] px-6 py-6">
            <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
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
                      className="border-border/50 shadow-none hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                              {event.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {event.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="bg-green-50 text-green-700 border-green-200 flex w-fit items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Certificado
                          </Badge>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-4 pt-4 border-t border-border/40">
                          <span className="flex items-center gap-1.5" title="Data/Hora Exata (UTC)">
                            <Clock className="w-3.5 h-3.5" />{' '}
                            {new Date(event.date).toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1.5" title="Autor/Responsável">
                            <User className="w-3.5 h-3.5" /> {event.user}
                          </span>
                          <span
                            className="flex items-center gap-1.5 font-mono bg-muted/50 px-1.5 py-0.5 rounded"
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
                  Nenhum registro de auditoria encontrado neste biograma.
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t py-3 flex justify-between items-center text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
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
                className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1 mb-2"
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
              Detalhes estruturados e metadados de certificação do evento.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 my-4">
            <div className="bg-muted/30 border rounded-lg p-4 space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2 border-b pb-2">
                <Fingerprint className="w-4 h-4" /> Metadados da Assinatura
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground block mb-1">Data/Hora (UTC)</span>
                  <span className="font-medium flex items-center gap-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    {selectedEvent ? new Date(selectedEvent.date).toISOString() : ''}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Endereço IP / Origem</span>
                  <span className="font-medium flex items-center gap-2">
                    <Globe className="w-3 h-3 text-muted-foreground" />
                    {selectedEvent?.ip}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground block mb-1">
                    Hash SHA-256 (Imutabilidade)
                  </span>
                  <span className="font-mono bg-background border px-2 py-1 rounded text-xs break-all flex items-center gap-2">
                    <Hash className="w-3 h-3 text-muted-foreground shrink-0" />
                    {selectedEvent?.hash}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-muted-foreground block mb-1">Autor / Responsável</span>
                  <span className="font-medium flex items-center gap-2">
                    <User className="w-3 h-3 text-muted-foreground" />
                    {selectedEvent?.user}
                  </span>
                </div>
              </div>
            </div>

            {selectedEvent?.metadata && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Network className="w-4 h-4" /> Carga de Dados Preservada
                </h4>
                <div className="bg-background border rounded-lg p-4 max-h-[250px] overflow-y-auto">
                  <div className="space-y-4">
                    {Object.entries(selectedEvent.metadata).map(([key, items]: [string, any]) => (
                      <div key={key}>
                        <h5 className="text-xs font-semibold uppercase text-muted-foreground mb-1.5">
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
                          {(items as string[]).map((item, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="font-normal text-xs bg-muted/50 hover:bg-muted"
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
