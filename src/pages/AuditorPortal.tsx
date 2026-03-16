import { useState } from 'react'
import {
  ShieldAlert,
  Link as LinkIcon,
  Eye,
  CheckCircle2,
  Lock,
  FileText,
  Calendar,
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
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export default function AuditorPortal() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [expiration, setExpiration] = useState<string>('')
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [generatedLink, setGeneratedLink] = useState<string | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const patient = patients.find((p) => p.id === selectedPatientId)

  const availableDocs = [
    { id: 'd1', name: 'Laudo Multidimensional (EHR)', type: 'Clínico/Legal', date: '2023-10-15' },
    { id: 'd2', name: 'Mapeamento Cerebral (qEEG)', type: 'Exame', date: '2023-10-10' },
    { id: 'd3', name: 'Notas de Psicoterapia', type: 'Sensível', date: '2023-09-28' },
    { id: 'd4', name: 'Biograma Longitudinal Certificado', type: 'Legal', date: '2023-10-15' },
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
    setGeneratedLink(`https://neurostrata.app/audit/verify?token=${token}&rec=${recipient}`)
    toast({
      title: 'Link Seguro Gerado',
      description: 'O link temporário foi criado e copiado para a área de transferência.',
    })
  }

  const selectedDocsData = availableDocs.filter((d) => selectedDocs.includes(d.id))

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in-up">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-accent" /> Portal do Auditor
        </h1>
        <p className="text-muted-foreground mt-1">
          Gere links de acesso seguro e temporário para auditorias externas, controlando
          visibilidade de documentos sensíveis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-t-4 border-t-accent shadow-sm">
          <CardHeader>
            <CardTitle>Configuração de Acesso Seguro</CardTitle>
            <CardDescription>Defina o escopo do compartilhamento legal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Paciente</label>
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
              <label className="text-sm font-medium">Tipo de Destinatário (Auditor)</label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione a entidade..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plano">Plano de Saúde (Auditoria Clínica)</SelectItem>
                  <SelectItem value="mp">Ministério Público (Acesso Legal)</SelectItem>
                  <SelectItem value="magistrado">Magistrados (Ordem Judicial)</SelectItem>
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
            <CardTitle>Seleção de Documentos</CardTitle>
            <CardDescription>
              Escolha quais evidências serão disponibilizadas para este link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!patient ? (
              <div className="text-sm text-muted-foreground p-4 bg-muted/50 rounded-md text-center">
                Selecione um paciente primeiro.
              </div>
            ) : (
              <div className="space-y-3">
                {availableDocs.map((doc) => (
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
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-[10px] py-0">
                          {doc.type}
                        </Badge>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {doc.date}
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

      <div className="flex justify-end gap-4 border-t pt-6">
        <Button variant="outline" onClick={() => setPreviewOpen(true)} disabled={!generatedLink}>
          <Eye className="w-4 h-4 mr-2" /> Pré-visualização do Auditor
        </Button>
        <Button onClick={handleGenerateLink}>
          <LinkIcon className="w-4 h-4 mr-2" /> Gerar Link Seguro
        </Button>
      </div>

      {generatedLink && (
        <Card className="border-green-200 bg-green-50/50 mt-6 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-sm">Link de Auditoria Ativo</p>
                <p className="text-xs text-green-700 mt-1 font-mono break-all bg-green-100/50 p-1 rounded inline-block">
                  {generatedLink}
                </p>
              </div>
            </div>
            <div className="text-xs text-green-700 font-medium">Expira em: {expiration}</div>
          </CardContent>
        </Card>
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl bg-muted/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Lock className="w-5 h-5 text-primary" /> Visualização Restrita do Auditor
            </DialogTitle>
            <DialogDescription>
              Interface simplificada e somente leitura que o destinatário acessará.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-white rounded-xl shadow-elevation p-6 min-h-[400px] border border-border/50">
            <div className="border-b pb-4 mb-6">
              <h2 className="text-2xl font-bold text-primary tracking-tight">
                Portal de Verificação EHR
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Acesso Legal Autorizado - NeuroStrata Systems
              </p>
            </div>

            <div className="grid gap-6">
              <div className="p-4 bg-muted/30 rounded-lg border">
                <h3 className="text-sm font-semibold uppercase text-muted-foreground mb-2">
                  Identificação Anonimizada / Criptografada
                </h3>
                <p className="font-mono text-sm">ID: {patient?.id || '---'}</p>
                <p className="text-sm mt-1">Status: Liberação Temporária Judicial/Auditoria</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 border-l-4 border-accent pl-3">
                  Documentos Autorizados
                </h3>
                {selectedDocsData.length === 0 ? (
                  <p className="text-sm text-muted-foreground italic">
                    Nenhum documento selecionado para este lote.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {selectedDocsData.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-background hover:border-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              Emissão: {doc.date} | Certificado SHA-256
                            </p>
                          </div>
                        </div>
                        <Button variant="secondary" size="sm">
                          Visualizar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-dashed text-center text-xs text-muted-foreground">
              <p>
                Este ambiente é auditado. Todas as ações de visualização são registradas no Biograma
                Longitudinal.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
