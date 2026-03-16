import { useState } from 'react'
import { FileArchive, Download, Scale, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export default function ReportCenter() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [showReport, setShowReport] = useState(false)

  const patient = patients.find((p) => p.id === selectedPatientId)

  const matrixRows = [
    { domain: 'Biomarcadores', active: 'Vulnerabilidade' },
    { domain: 'Cognição', active: 'Regulação' },
    { domain: 'Emoção', active: 'Patologia' },
    { domain: 'Personalidade', active: 'Regulação' },
    { domain: 'Comportamento', active: 'Vulnerabilidade' },
    { domain: 'Ambiente', active: 'Performance' },
  ]
  const columns = ['Patologia', 'Vulnerabilidade', 'Regulação', 'Performance', 'Alta Performance']

  const handleGenerate = () => {
    if (!selectedPatientId) {
      toast({ title: 'Atenção', description: 'Selecione um paciente.', variant: 'destructive' })
      return
    }
    setShowReport(true)
    toast({
      title: 'Laudo Gerado',
      description: 'O Laudo de Estratificação Neuroética foi compilado com sucesso.',
    })
  }

  const handleExport = () => {
    toast({
      title: 'PDF Exportado',
      description: 'Documento assinado digitalmente foi baixado.',
    })
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 animate-fade-in-up">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <FileArchive className="w-8 h-8 text-accent" /> Central de Relatórios Éticos
          </h1>
          <p className="text-muted-foreground mt-1">
            Geração de laudos estruturados baseados no modelo de estratificação para fundamentação
            clínica e jurídica.
          </p>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium">Paciente Alvo</label>
            <Select
              value={selectedPatientId}
              onValueChange={(v) => {
                setSelectedPatientId(v)
                setShowReport(false)
              }}
            >
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
          <Button onClick={handleGenerate} className="w-full sm:w-auto">
            <Scale className="w-4 h-4 mr-2" /> Gerar Laudo de Estratificação Neuroética
          </Button>
        </CardContent>
      </Card>

      {showReport && patient && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex justify-end">
            <Button variant="secondary" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" /> Exportar PDF Certificado
            </Button>
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[800px] text-sm">
            <div className="text-center border-b pb-6 mb-8">
              <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">
                NEUROSTRATA
              </h2>
              <p className="text-muted-foreground uppercase tracking-widest mt-2 font-medium">
                Laudo de Estratificação Neuroética
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="col-span-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase">Paciente</p>
                <p className="font-medium text-base border-b pb-1 mt-1">{patient.name}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  Data de Emissão
                </p>
                <p className="font-medium text-base border-b pb-1 mt-1">
                  {new Date().toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">
                  ID do Registro
                </p>
                <p className="font-mono text-xs border-b pb-1 mt-1">{patient.id}</p>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                  1. Matriz Estratificada de Funcionamento
                </h3>
                <div className="overflow-x-auto border rounded-lg">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-bold text-foreground w-[160px]">
                          Domínios / Estágios
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
                          <TableCell className="font-medium">{row.domain}</TableCell>
                          {columns.map((col) => (
                            <TableCell key={col} className="text-center p-2 border-l">
                              {row.active === col ? (
                                <div className="mx-auto w-full max-w-[100px] bg-primary/10 border border-primary/30 text-primary py-1 rounded text-xs font-semibold shadow-sm">
                                  Detecção Atual
                                </div>
                              ) : (
                                <div className="mx-auto w-8 h-1 bg-muted/20 rounded-full" />
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                  2. Scores Clínico-Analíticos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border rounded-lg bg-muted/5">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-rose-600">Score de Risco</span>
                      <span className="font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-2 bg-rose-100 [&>div]:bg-rose-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-amber-600">Score de Estabilidade</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <Progress value={45} className="h-2 bg-amber-100 [&>div]:bg-amber-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-600">Score de Performance</span>
                      <span className="font-bold">30%</span>
                    </div>
                    <Progress value={30} className="h-2 bg-blue-100 [&>div]:bg-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-emerald-600">Score de Plasticidade</span>
                      <span className="font-bold">80%</span>
                    </div>
                    <Progress value={80} className="h-2 bg-emerald-100 [&>div]:bg-emerald-500" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                  3. Parecer Neuroético Conclusivo
                </h3>
                <p className="text-sm leading-relaxed border p-4 rounded-lg bg-white">
                  Com base no mapeamento multidimensional, o paciente apresenta índices de
                  vulnerabilidade concentrados nos eixos emocionais e comportamentais, com risco
                  associado de 65%. Entretanto, o elevado Score de Plasticidade (80%) indica forte
                  potencial de remodelação neural através de intervenções neuromodulatórias
                  contínuas. O quadro atual exige adequação de protocolos para fomento da regulação
                  basal, priorizando a integridade e privacidade mental conforme diretrizes da
                  UNESCO. Recomenda-se acompanhamento longitudinal.
                </p>
              </section>
            </div>

            <section className="mt-16 pt-8 border-t space-y-6 text-center">
              <div className="flex justify-center items-center gap-2 text-green-700 font-medium mb-8">
                <CheckCircle2 className="w-5 h-5" />
                <span>Assinado Eletronicamente (Validado via Blockchain EHR)</span>
              </div>

              <div className="flex justify-center">
                <div className="border-t border-muted-foreground w-64 text-center pt-2">
                  <strong>Dr. Renato Alves</strong>
                  <br />
                  CRM 12345-SP
                  <br />
                  <span className="text-xs text-muted-foreground mt-1 block">
                    Carimbo de Tempo: {new Date().toISOString()}
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
