import { useState } from 'react'
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Eye,
  Download,
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

  const handleAction = (action: string, docName: string) => {
    toast({
      title: `Ação: ${action}`,
      description: `Simulando ${action.toLowerCase()} de "${docName}".`,
    })
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
                    <TableRow key={doc.id} className="group">
                      <TableCell className="font-medium text-primary">{doc.name}</TableCell>
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
                            onClick={() => handleAction('Visualizar', doc.name)}
                          >
                            <Eye className="w-4 h-4 text-primary" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleAction('Download', doc.name)}
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
    </div>
  )
}
