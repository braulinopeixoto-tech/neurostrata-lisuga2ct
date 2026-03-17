import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Upload, Plus, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'

export function ExamsTab() {
  const { patients, currentUser } = useAppStore()
  const { examRequests, addExamRequest, updateExamStatus } = usePharmacyStore()
  const { addAuditLog } = useTrustStore()

  const [patientId, setPatientId] = useState('')
  const [biomarcador, setBiomarcador] = useState('')
  const [impacto, setImpacto] = useState('')
  const [eixo, setEixo] = useState('')

  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [resultado, setResultado] = useState<'baixo' | 'normal' | 'alto'>('normal')

  const patientExams = examRequests.filter((e) => e.patientId === patientId)

  const handleRequest = () => {
    if (!patientId || !biomarcador || !impacto || !eixo) {
      toast({
        title: 'Atenção',
        description: 'Preencha todos os campos do exame.',
        variant: 'destructive',
      })
      return
    }
    addExamRequest({
      patientId,
      biomarcador,
      impacto_funcional: impacto,
      eixo,
      status: 'recomendado',
    })

    addAuditLog({
      evento: 'Solicitação de Exame Funcional',
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Gestão Metabólica - Exames',
      decisao_validada: true,
    })

    setBiomarcador('')
    setImpacto('')
    setEixo('')
    toast({
      title: 'Exame Solicitado',
      description: 'O exame foi adicionado ao dossiê metabólico do paciente.',
    })
  }

  const handleUpload = (id: string) => {
    updateExamStatus(id, 'realizado', resultado)
    setUploadingId(null)
    toast({
      title: 'Upload Concluído',
      description: 'Resultado associado ao eixo metabólico com sucesso.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })

    addAuditLog({
      evento: 'Upload de Resultado de Exame',
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Gestão Metabólica - Exames',
      decisao_validada: true,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Painel de Biomarcadores Correlacionados</CardTitle>
          <CardDescription>
            Estruture as requisições de exames baseadas em lacunas neurofuncionais identificadas.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-2">
            <Label>Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o paciente..." />
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

          {patientId && (
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nova Requisição Estruturada
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Biomarcador (Ex: Vitamina D)</Label>
                    <Input
                      value={biomarcador}
                      onChange={(e) => setBiomarcador(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Impacto Funcional</Label>
                    <Input
                      placeholder="Ex: Modulação Emocional"
                      value={impacto}
                      onChange={(e) => setImpacto(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Eixo Alvo</Label>
                    <Input
                      placeholder="Ex: Inflamatório"
                      value={eixo}
                      onChange={(e) => setEixo(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={handleRequest} className="w-full">
                      Adicionar Exame
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Biomarcador</TableHead>
                      <TableHead>Impacto Funcional</TableHead>
                      <TableHead>Eixo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ação / Resultado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientExams.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Nenhum exame solicitado para este paciente.
                        </TableCell>
                      </TableRow>
                    )}
                    {patientExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium">{exam.biomarcador}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {exam.impacto_funcional}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-muted/50">
                            {exam.eixo}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              exam.status === 'recomendado'
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : exam.status === 'pendente'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                  : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }
                          >
                            {exam.status}
                          </Badge>
                          {exam.resultado && (
                            <span className="ml-2 text-[11px] font-bold uppercase text-slate-500">
                              [{exam.resultado}]
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right min-w-[200px]">
                          {exam.status !== 'realizado' && uploadingId !== exam.id && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => setUploadingId(exam.id)}
                            >
                              <Upload className="w-4 h-4 mr-2" /> Anexar Resultado (MVP)
                            </Button>
                          )}
                          {uploadingId === exam.id && (
                            <div className="flex items-center justify-end gap-2 bg-muted/50 p-1.5 rounded-md">
                              <Select value={resultado} onValueChange={(v: any) => setResultado(v)}>
                                <SelectTrigger className="w-[100px] h-8 text-xs bg-white">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="baixo">Baixo</SelectItem>
                                  <SelectItem value="normal">Normal</SelectItem>
                                  <SelectItem value="alto">Alto</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => handleUpload(exam.id)}
                              >
                                Salvar PDF
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-muted-foreground"
                                onClick={() => setUploadingId(null)}
                              >
                                Canc.
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
