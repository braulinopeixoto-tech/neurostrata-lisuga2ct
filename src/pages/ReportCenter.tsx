import { useState } from 'react'
import { FileArchive, Download, Scale, ShieldCheck } from 'lucide-react'
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
  const { patients, currentUser } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState('judicial')
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
        <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-end">
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

          <div className="flex-1 w-full space-y-2">
            <label className="text-sm font-medium">Modelo do Laudo</label>
            <Select
              value={selectedTemplate}
              onValueChange={(v) => {
                setSelectedTemplate(v)
                setShowReport(false)
              }}
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o modelo..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="judicial">Modelo Judicial (Completo)</SelectItem>
                <SelectItem value="health_insurance">
                  Modelo Plano de Saúde (Intervenção)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleGenerate} className="w-full md:w-auto">
            <Scale className="w-4 h-4 mr-2" /> Gerar Laudo
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
                {selectedTemplate === 'judicial'
                  ? 'Laudo de Estratificação Neuroética (Judicial)'
                  : 'Relatório Clínico para Plano de Saúde'}
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
              {selectedTemplate === 'judicial' ? (
                <>
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
                          <span className="font-semibold text-amber-600">
                            Score de Estabilidade
                          </span>
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
                          <span className="font-semibold text-emerald-600">
                            Score de Plasticidade
                          </span>
                          <span className="font-bold">80%</span>
                        </div>
                        <Progress
                          value={80}
                          className="h-2 bg-emerald-100 [&>div]:bg-emerald-500"
                        />
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
                      associado de 65%. Entretanto, o elevado Score de Plasticidade (80%) indica
                      forte potencial de remodelação neural através de intervenções
                      neuromodulatórias contínuas. O quadro atual exige adequação de protocolos para
                      fomento da regulação basal, priorizando a integridade e privacidade mental
                      conforme diretrizes da UNESCO. Recomenda-se acompanhamento longitudinal.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="font-bold text-base bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                      1. Síntese Diagnóstica (CID/DSM)
                    </h3>
                    <p className="text-sm leading-relaxed border p-4 rounded-lg bg-white shadow-sm">
                      Apresenta quadro clínico compatível com Transtorno de Ansiedade Generalizada
                      (CID-11: 6B00 / DSM-5-TR: F41.1), com manifestações secundárias de déficit de
                      controle inibitório e atenção sustentada. Histórico documentado de
                      refratariedade parcial a abordagens medicamentosas de primeira linha.
                    </p>
                  </section>

                  <section>
                    <h3 className="font-bold text-base bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                      2. Indicadores de Severidade e Prognóstico
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border rounded-lg bg-white shadow-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-rose-600">
                            Score de Risco Clínico
                          </span>
                          <span className="font-bold">65%</span>
                        </div>
                        <Progress value={65} className="h-2 bg-rose-100 [&>div]:bg-rose-500" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-semibold text-emerald-600">
                            Score de Potencial Terapêutico
                          </span>
                          <span className="font-bold">80%</span>
                        </div>
                        <Progress
                          value={80}
                          className="h-2 bg-emerald-100 [&>div]:bg-emerald-500"
                        />
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="font-bold text-base bg-blue-50 text-blue-800 border border-blue-200 px-3 py-1.5 rounded uppercase tracking-wide mb-4">
                      3. Justificativa de Intervenção e Plano Terapêutico
                    </h3>
                    <p className="text-sm leading-relaxed border p-4 rounded-lg bg-white shadow-sm">
                      Dado o elevado Score de Potencial Terapêutico associado ao alto risco clínico
                      com prejuízos funcionais diários, atesta-se a necessidade imperativa de
                      intervenção especializada. Solicita-se autorização para início de Protocolo de
                      Neuromodulação Não Invasiva (tDCS) associado à reabilitação neurocognitiva,
                      com frequência de 2x semanais, a fim de mitigar a progressão dos déficits e
                      prevenir agravos ou internações futuras.
                    </p>
                  </section>
                </>
              )}
            </div>

            <section className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-start gap-6 bg-muted/10 p-6 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-700 font-bold">
                  <ShieldCheck className="w-6 h-6" />
                  <span>Assinatura Digital Verificada</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1.5 bg-white p-3 rounded border">
                  <p className="flex items-center gap-2">
                    <strong>Padrão:</strong> Certificação ICP-Brasil Nível A3
                  </p>
                  <p className="flex items-start gap-2">
                    <strong>Autenticidade:</strong>
                    <span className="font-mono bg-muted px-1.5 py-0.5 rounded text-[10px] break-all max-w-[200px] sm:max-w-none">
                      e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                    </span>
                  </p>
                  <p className="flex items-center gap-2">
                    <strong>Carimbo de Tempo:</strong> {new Date().toISOString()}
                  </p>
                </div>
              </div>

              <div className="flex justify-center md:justify-end w-full md:w-auto mt-4 md:mt-0">
                <div className="border-t border-foreground w-64 text-center pt-3">
                  <strong className="text-base text-primary">{currentUser.fullName}</strong>
                  <br />
                  <span className="text-sm text-muted-foreground">
                    {currentUser.registrationId}
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
