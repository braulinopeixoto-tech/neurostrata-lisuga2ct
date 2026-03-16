import { useState } from 'react'
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Eye,
  Download,
  Landmark,
  Scale,
  HeartPulse,
  Building2,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

const CATEGORIES = [
  'Exames',
  'Testes',
  'Relatórios',
  'Receitas',
  'Prontuários Hospitalares',
  'Documentos Jurídicos',
]

export function PatientDigitizationTab({ patientId }: { patientId: string }) {
  const { documents, addDocument } = useAppStore()
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [previewDoc, setPreviewDoc] = useState<any>(null)

  const patientDocs = documents
    .filter((d) => d.patientId === patientId && d.validationStatus)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const handleUpload = () => {
    if (!file || !category) {
      toast({
        title: 'Atenção',
        description: 'Selecione um arquivo e uma categoria.',
        variant: 'destructive',
      })
      return
    }

    setIsUploading(true)
    setTimeout(() => {
      const newDoc = {
        id: `doc-${Date.now()}`,
        patientId,
        name: file.name,
        category,
        date: new Date().toISOString(),
        status: 'completed',
        validationStatus: 'Pendente',
      }
      addDocument(newDoc)
      setFile(null)
      setCategory('')
      setIsUploading(false)
      toast({
        title: 'Upload Concluído',
        description: 'Documento enviado com sucesso. Aguardando validação clínica.',
        action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      })
    }, 1500)
  }

  const handleAction = (action: string, doc: any) => {
    if (action === 'Visualizar') {
      setPreviewDoc(doc)
    } else {
      toast({
        title: `Ação: ${action}`,
        description: `Simulando ${action.toLowerCase()} de "${doc.name}".`,
      })
    }
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-4 rounded-lg flex items-start gap-3 shadow-sm">
        <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-blue-900 text-base">
            Central de Digitalização Validada
          </h3>
          <p className="text-sm text-blue-800/80 mt-1 leading-relaxed">
            Envie seus documentos de forma segura. Todos os arquivos são verificados por nossa
            equipe clínica para compor seu <strong>Biograma Longitudinal</strong> e assegurar um{' '}
            <strong>Diagnóstico Validado</strong> com máximo rigor e rastreabilidade.
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <UploadCloud className="w-5 h-5" /> Enviar Novo Documento
          </CardTitle>
          <CardDescription>Selecione o arquivo e a categoria correspondente.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Arquivo</label>
              <Input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Categoria do Documento</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleUpload}
              disabled={isUploading || !file || !category}
              className="w-full sm:w-auto"
            >
              {isUploading ? (
                <UploadCloud className="w-4 h-4 mr-2 animate-bounce" />
              ) : (
                <UploadCloud className="w-4 h-4 mr-2" />
              )}
              {isUploading ? 'Enviando...' : 'Enviar Documento'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5" /> Repositório de Documentos
          </CardTitle>
          <CardDescription>
            Seu histórico completo de documentos digitalizados e seus respectivos status de
            validação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {patientDocs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground text-center bg-muted/20 rounded-lg border border-dashed">
              <FileText className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm">Nenhum documento enviado ainda.</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data de Envio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientDocs.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className="group cursor-pointer hover:bg-muted/50"
                      onClick={() => handleAction('Visualizar', doc)}
                    >
                      <TableCell className="font-medium text-primary">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          {doc.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-background">
                          {doc.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(doc.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        {doc.validationStatus === 'Validado' ? (
                          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 flex items-center w-fit gap-1">
                            <ShieldCheck className="w-3 h-3" /> Validado
                          </Badge>
                        ) : (
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 flex items-center w-fit gap-1"
                          >
                            <Clock className="w-3 h-3" /> Pendente
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAction('Visualizar', doc)
                            }}
                          >
                            <Eye className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAction('Download', doc)
                            }}
                          >
                            <Download className="w-4 h-4 text-primary" />
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

      <div className="space-y-6 pt-10 mt-10 border-t border-border/60">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            Certificações e Validações Institucionais
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Nossa infraestrutura assegura a validade clínica e jurídica dos seus documentos.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Ministério Público', icon: Landmark, desc: 'Acesso Legal EHR' },
            { name: 'OAB / Defensoria', icon: Scale, desc: 'Amparo Jurídico' },
            { name: 'Planos de Saúde', icon: HeartPulse, desc: 'Auditoria Clínica' },
            { name: 'Redes Hospitalares', icon: Building2, desc: 'Integração de Dados' },
          ].map((cert, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-5 bg-white rounded-xl border border-border/80 shadow-sm text-center transition-all hover:shadow-md hover:border-primary/40 group"
            >
              <cert.icon className="w-8 h-8 text-slate-400 mb-3 group-hover:text-primary transition-colors" />
              <span className="font-semibold text-sm text-foreground">{cert.name}</span>
              <span className="text-xs text-muted-foreground mt-1">{cert.desc}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-50 to-transparent rounded-xl border border-blue-100">
            <div className="bg-white border border-blue-200 p-3 rounded-lg text-blue-600 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-blue-950 text-base">Biograma Longitudinal</h4>
              <p className="text-sm text-blue-900/80 mt-1 leading-relaxed font-medium">
                Rastreabilidade auditável e certificação ICP-Brasil para comprovação evolutiva.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-emerald-50 to-transparent rounded-xl border border-emerald-100">
            <div className="bg-white border border-emerald-200 p-3 rounded-lg text-emerald-600 shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-emerald-950 text-base">Diagnóstico Validado</h4>
              <p className="text-sm text-emerald-900/80 mt-1 leading-relaxed font-medium">
                Segurança jurídica e precisão técnica baseada em evidências padronizadas.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!previewDoc} onOpenChange={(open) => !open && setPreviewDoc(null)}>
        <DialogContent className="max-w-4xl h-[85vh] flex flex-col p-0 gap-0 overflow-hidden bg-slate-50/50">
          <DialogHeader className="p-4 bg-white border-b z-10">
            <div className="flex justify-between items-start pr-8">
              <div>
                <DialogTitle className="flex items-center gap-2 text-lg">
                  <Eye className="w-5 h-5 text-primary" /> Visualizador de Documentos
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
                <ShieldCheck className="w-32 h-32" />
              </div>
              <div className="text-center border-b pb-6 mb-8">
                <h2 className="text-2xl font-serif font-bold text-primary uppercase tracking-widest">
                  NEUROSTRATA
                </h2>
                <p className="text-muted-foreground uppercase tracking-widest mt-1 text-xs font-medium">
                  Cópia Digital de Arquivo Clínico Validado
                </p>
              </div>
              <div className="space-y-6 text-sm text-slate-700 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-lg border border-slate-100">
                  <div>
                    <span className="font-semibold text-muted-foreground">Categoria:</span> <br />
                    {previewDoc?.category}
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Data de Envio:</span>{' '}
                    <br />
                    {previewDoc ? new Date(previewDoc.date).toLocaleDateString('pt-BR') : ''}
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">ID Referência:</span>{' '}
                    <br />
                    <span className="font-mono text-xs">{previewDoc?.id}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">
                      Status da Verificação:
                    </span>{' '}
                    <br />
                    {previewDoc?.validationStatus}
                  </div>
                </div>
                <div className="p-8 sm:p-12 border-2 border-dashed rounded-lg text-center text-muted-foreground mt-8 bg-slate-50/50 flex flex-col items-center justify-center min-h-[300px]">
                  <FileText className="w-16 h-16 mb-4 opacity-20" />
                  <p className="max-w-md mx-auto">
                    O conteúdo original do arquivo <strong>{previewDoc?.name}</strong> está sendo
                    renderizado neste visualizador seguro.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
                    <Lock className="w-3 h-3" /> Documento protegido e criptografado de ponta a
                    ponta.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-4 bg-background border-t z-10 flex sm:justify-between items-center w-full">
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Verificação Criptográfica
              ICP-Brasil
            </div>
            <Button onClick={() => handleAction('Download', previewDoc)}>
              <Download className="w-4 h-4 mr-2" /> Baixar Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
