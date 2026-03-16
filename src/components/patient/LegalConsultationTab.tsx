import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Scale,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Hash,
  Eye,
  FileSignature,
  Activity,
} from 'lucide-react'

export function LegalConsultationTab({ patient }: { patient: any }) {
  const [entityView, setEntityView] = useState('medico')

  const matrixRows = [
    { domain: 'Biomarcadores', active: 'Vulnerabilidade' },
    { domain: 'Cognição', active: 'Regulação' },
    { domain: 'Emoção', active: 'Patologia' },
    { domain: 'Personalidade', active: 'Regulação' },
    { domain: 'Comportamento', active: 'Vulnerabilidade' },
    { domain: 'Ambiente', active: 'Performance' },
  ]

  const columns = ['Patologia', 'Vulnerabilidade', 'Regulação', 'Performance', 'Alta Performance']

  const documents = [
    {
      name: 'Laudo Multidimensional (EHR)',
      type: 'Clínico/Legal',
      status: 'Autorizado',
      date: '2023-10-15',
    },
    { name: 'Mapeamento Cerebral (qEEG)', type: 'Exame', status: 'Autorizado', date: '2023-10-10' },
    { name: 'Notas de Psicoterapia', type: 'Sensível', status: 'Restrito', date: '2023-09-28' },
    {
      name: 'Biograma Longitudinal Certificado',
      type: 'Legal',
      status: 'Autorizado',
      date: '2023-10-15',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted/30 p-4 rounded-lg border">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" /> Visualização por Entidade
          </h2>
          <p className="text-sm text-muted-foreground">
            Simulação de controle de acesso baseado no perfil do solicitante.
          </p>
        </div>
        <Select value={entityView} onValueChange={setEntityView}>
          <SelectTrigger className="w-full sm:w-[250px] bg-background">
            <SelectValue placeholder="Selecione a entidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="medico">Médico Assistente (Acesso Total)</SelectItem>
            <SelectItem value="plano">Plano de Saúde (Auditoria Clínica)</SelectItem>
            <SelectItem value="mp">Ministério Público (Acesso Legal)</SelectItem>
            <SelectItem value="magistrado">Magistrado (Ordem Judicial)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-border/60 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -z-10" />
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-600" /> Verificação do Biograma
              Longitudinal
            </CardTitle>
            <CardDescription>
              Validação criptográfica e autenticidade para fins legais.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50/50 border border-green-100 rounded-md">
              <div className="flex items-center gap-2 text-green-800">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-sm">Certificado na Plataforma</span>
              </div>
              <Badge className="bg-green-600 hover:bg-green-700">Válido</Badge>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">ID do Paciente:</span>
                <span className="font-mono font-medium">{patient.id}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Data de Emissão:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-muted-foreground">Assinatura Digital:</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded flex items-center gap-1">
                  <Hash className="w-3 h-3" /> e3b0c442...855
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" /> Repositório Seguro de Documentos
            </CardTitle>
            <CardDescription>
              Controle de acesso a laudos e relatórios (Consentimento).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 border rounded-lg bg-background hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <FileSignature className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm leading-tight">{doc.name}</h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{doc.type}</span>
                        <span>•</span>
                        <span>{new Date(doc.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  {doc.status === 'Autorizado' ||
                  entityView === 'medico' ||
                  entityView === 'magistrado' ? (
                    <Badge
                      variant="outline"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Liberado
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-rose-50 text-rose-700 border-rose-200 flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" /> Restrito
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" /> Modelo Estratificado NeuroStrata
          </CardTitle>
          <CardDescription>
            Matriz 2D de representação do estado neurofuncional atual do paciente para fundamentação
            clínica e jurídica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-foreground">
                    Domínios \ Estágios
                  </TableHead>
                  {columns.map((col) => (
                    <TableHead key={col} className="text-center text-xs font-semibold">
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {matrixRows.map((row) => (
                  <TableRow key={row.domain}>
                    <TableCell className="font-medium bg-muted/20">{row.domain}</TableCell>
                    {columns.map((col) => (
                      <TableCell key={col} className="text-center p-2">
                        {row.active === col ? (
                          <div className="mx-auto w-full max-w-[120px] bg-primary/10 border border-primary/30 text-primary py-1.5 px-2 rounded-md flex items-center justify-center gap-1 text-xs font-semibold shadow-sm">
                            <Activity className="w-3 h-3" /> Atual
                          </div>
                        ) : (
                          <div className="mx-auto w-full max-w-[120px] h-8 bg-muted/10 border border-dashed border-border/50 rounded-md" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Scoring Neuro-Analítico
          </CardTitle>
          <CardDescription>
            Cálculo algorítmico derivado do modelo estratificado (índices quantitativos para
            embasamento legal).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-rose-600">Score de Risco</span>
                <span className="text-sm font-bold">65%</span>
              </div>
              <Progress value={65} className="h-2 bg-rose-100 [&>div]:bg-rose-500" />
              <p className="text-xs text-muted-foreground mt-1">
                Risco de agravamento clínico / vulnerabilidade social.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-amber-600">Score de Estabilidade</span>
                <span className="text-sm font-bold">45%</span>
              </div>
              <Progress value={45} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
              <p className="text-xs text-muted-foreground mt-1">
                Capacidade de manutenção da regulação neurofuncional.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-blue-600">Score de Performance</span>
                <span className="text-sm font-bold">30%</span>
              </div>
              <Progress value={30} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
              <p className="text-xs text-muted-foreground mt-1">
                Eficiência na execução de demandas cognitivas e sociais.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-sm font-semibold text-emerald-600">
                  Score de Plasticidade
                </span>
                <span className="text-sm font-bold">80%</span>
              </div>
              <Progress value={80} className="h-2 bg-emerald-100 [&>div]:bg-emerald-500" />
              <p className="text-xs text-muted-foreground mt-1">
                Potencial de resposta a intervenções terapêuticas.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
