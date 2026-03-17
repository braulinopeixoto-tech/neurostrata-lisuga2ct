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
        description: 'Preencha todos os campos da requisição funcional.',
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
      evento: 'Solicitação Estruturada de Exame',
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
      description: 'A requisição do biomarcador foi adicionada ao plano de investigação.',
    })
  }

  const handleUpload = (id: string) => {
    updateExamStatus(id, 'realizado', resultado)
    setUploadingId(null)
    toast({
      title: 'Resultado Anexado',
      description: 'Os dados laboratoriais foram associados ao eixo neurofuncional.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })

    addAuditLog({
      evento: `Upload de Resultado (${resultado.toUpperCase()})`,
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
          <CardTitle className="text-lg">Gestão e Interpretação de Biomarcadores</CardTitle>
          <CardDescription>
            Solicite análises laboratoriais alinhadas às lacunas funcionais, sem prescrição
            diagnóstica fechada.
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
              <div className="bg-muted/30 p-5 rounded-lg border space-y-4">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                  <Plus className="w-4 h-4" /> Nova Investigação de Biomarcador
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
                    <Label className="text-xs">Impacto Funcional (Ex: Modulação Emocional)</Label>
                    <Input
                      value={impacto}
                      onChange={(e) => setImpacto(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Eixo (Ex: Inflamatório)</Label>
                    <Input
                      value={eixo}
                      onChange={(e) => setEixo(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={handleRequest} className="w-full">
                      Adicionar ao Plano
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Biomarcador</TableHead>
                      <TableHead>Status Biológico</TableHead>
                      <TableHead>Impacto Funcional</TableHead>
                      <TableHead>Eixo Metabólico</TableHead>
                      <TableHead className="text-right">Ação do Profissional</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientExams.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Nenhum exame solicitado para este paciente no momento.
                        </TableCell>
                      </TableRow>
                    )}
                    {patientExams.map((exam) => (
                      <TableRow key={exam.id}>
                        <TableCell className="font-medium text-slate-800">
                          {exam.biomarcador}
                        </TableCell>
                        <TableCell>
                          {exam.status === 'realizado' && exam.resultado ? (
                            <Badge
                              variant={exam.resultado === 'normal' ? 'outline' : 'destructive'}
                              className={
                                exam.resultado !== 'normal'
                                  ? 'bg-rose-100 text-rose-800 border-rose-200'
                                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              }
                            >
                              {exam.resultado.toUpperCase()}
                            </Badge>
                          ) : (
                            <Badge
                              variant="secondary"
                              className="font-normal text-[10px] uppercase"
                            >
                              Aguardando Laudo
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {exam.impacto_funcional}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-muted/20 text-slate-600 border-slate-200"
                          >
                            {exam.eixo}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right min-w-[220px]">
                          {exam.status !== 'realizado' && uploadingId !== exam.id && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50"
                              onClick={() => setUploadingId(exam.id)}
                            >
                              <Upload className="w-3.5 h-3.5 mr-1.5" /> Anexar / Interpretar
                            </Button>
                          )}
                          {uploadingId === exam.id && (
                            <div className="flex items-center justify-end gap-2 bg-muted/30 p-1.5 rounded-lg border">
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
                                className="h-8 text-xs bg-slate-800 hover:bg-slate-700"
                                onClick={() => handleUpload(exam.id)}
                              >
                                Salvar
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-8 text-xs text-muted-foreground hover:bg-slate-200"
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
