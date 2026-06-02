import { useState, useEffect } from 'react'
import {
  Activity,
  Brain,
  Clock,
  Shield,
  Plus,
  List,
  ArrowRight,
  History,
  Fingerprint,
  Network,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  fetchVsSubjects,
  fetchSubjectTimeline,
  processNewAssessment,
} from '@/services/vsCommandCenterService'

const ScoreBar = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-3">
    <div className="flex justify-between mb-1">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      <span className="text-xs font-bold text-slate-900">{value}/100</span>
    </div>
    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full bg-indigo-600 transition-all" style={{ width: `${value}%` }} />
    </div>
  </div>
)

export default function VsCommandCenter() {
  const [subjects, setSubjects] = useState<any[]>([])
  const [selectedSubject, setSelectedSubject] = useState<any>(null)
  const [timeline, setTimeline] = useState<any>({
    scores: [],
    inferences: [],
    events: [],
    observations: [],
  })
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  // Modal Control e Inputs (0 a 100 visualmente, mas mapeado para 0-1 no engine)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputs, setInputs] = useState({
    hrv_metric: 50,
    qeeg_metric: 50,
    prom_score: 50,
    sleep_quality: 50,
    adherence: 50,
  })

  useEffect(() => {
    loadSubjects()
  }, [])

  useEffect(() => {
    if (selectedSubject) {
      loadTimeline(selectedSubject.id)
    }
  }, [selectedSubject])

  async function loadSubjects() {
    const data = await fetchVsSubjects()
    setSubjects(data)
    if (data.length > 0) setSelectedSubject(data[0])
    setLoading(false)
  }

  async function loadTimeline(id: string) {
    const data = await fetchSubjectTimeline(id)
    setTimeline(data)
  }

  async function handleComputeScore() {
    if (!selectedSubject) return
    setProcessing(true)

    // Normaliza para o framework 0-1 exigido pelo motor de MVP
    const normalizedInputs = {
      hrv_metric: inputs.hrv_metric / 100,
      qeeg_metric: inputs.qeeg_metric / 100,
      prom_score: inputs.prom_score / 100,
      sleep_quality: inputs.sleep_quality / 100,
      adherence: inputs.adherence / 100,
      previous_score: timeline.scores.length > 0 ? timeline.scores[0].overall_score : undefined,
    }

    await processNewAssessment(selectedSubject.id, normalizedInputs)
    setIsModalOpen(false)
    await loadTimeline(selectedSubject.id)
    setProcessing(false)
  }

  const latestScore = timeline.scores[0]
  const payload = latestScore?.payload || {}

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50 font-sans w-full max-w-[1600px] mx-auto animate-fade-in border rounded-lg shadow-sm overflow-hidden my-4">
      {/* Sidebar: Lista Clínica de Sujeitos */}
      <div className="w-80 bg-white border-r flex flex-col h-full overflow-hidden shrink-0">
        <div className="p-4 border-b bg-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-slate-800">Command Center</h2>
        </div>
        <div className="p-4 border-b flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Sujeitos Ativos
          </h3>
          {loading && <p className="text-sm text-slate-500">Carregando...</p>}
          <div className="space-y-2">
            {subjects.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubject(sub)}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedSubject?.id === sub.id
                    ? 'bg-indigo-50 border-indigo-200 shadow-sm'
                    : 'bg-white hover:bg-slate-50'
                }`}
              >
                <div className="font-semibold text-sm text-slate-800">
                  {sub.payload?.name || 'Desconhecido'}
                </div>
                <div className="text-xs text-slate-500 mt-1 flex justify-between">
                  <span>{sub.external_id}</span>
                  <span className={sub.status === 'active' ? 'text-emerald-600' : 'text-slate-400'}>
                    {sub.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Painel Clínico */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {selectedSubject ? (
          <>
            {/* Header Mínimo e Técnico */}
            <div className="p-6 bg-white border-b flex justify-between items-center sticky top-0 z-10 shadow-sm">
              <div>
                <h1 className="text-2xl font-black text-slate-800">
                  {selectedSubject.payload?.name || 'Sujeito Sem Nome'}
                </h1>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                  <Fingerprint className="w-4 h-4" /> UUID:{' '}
                  <span className="font-mono text-xs">{selectedSubject.id}</span>
                </p>
              </div>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Avaliação (MVP)
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Coleta de Observações Brutas</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-6 py-4">
                    <div className="grid gap-2">
                      <Label className="flex justify-between">
                        <span>HRV Metric</span>{' '}
                        <span className="font-mono text-indigo-600">{inputs.hrv_metric}</span>
                      </Label>
                      <Slider
                        value={[inputs.hrv_metric]}
                        onValueChange={(v) => setInputs({ ...inputs, hrv_metric: v[0] })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="flex justify-between">
                        <span>qEEG Efficiency</span>{' '}
                        <span className="font-mono text-indigo-600">{inputs.qeeg_metric}</span>
                      </Label>
                      <Slider
                        value={[inputs.qeeg_metric]}
                        onValueChange={(v) => setInputs({ ...inputs, qeeg_metric: v[0] })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="flex justify-between">
                        <span>PROM (Escala Funcional)</span>{' '}
                        <span className="font-mono text-indigo-600">{inputs.prom_score}</span>
                      </Label>
                      <Slider
                        value={[inputs.prom_score]}
                        onValueChange={(v) => setInputs({ ...inputs, prom_score: v[0] })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="flex justify-between">
                        <span>Sleep Quality</span>{' '}
                        <span className="font-mono text-indigo-600">{inputs.sleep_quality}</span>
                      </Label>
                      <Slider
                        value={[inputs.sleep_quality]}
                        onValueChange={(v) => setInputs({ ...inputs, sleep_quality: v[0] })}
                        max={100}
                        step={1}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label className="flex justify-between">
                        <span>Adesão ao Cuidado</span>{' '}
                        <span className="font-mono text-indigo-600">{inputs.adherence}</span>
                      </Label>
                      <Slider
                        value={[inputs.adherence]}
                        onValueChange={(v) => setInputs({ ...inputs, adherence: v[0] })}
                        max={100}
                        step={1}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleComputeScore}
                      disabled={processing}
                      className="w-full bg-indigo-600"
                    >
                      {processing ? 'Processando Audit Trail...' : 'Processar & Inferir'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-50/50">
              {/* VitalScore Painel Primário */}
              <Card className="col-span-1 lg:col-span-3 shadow-sm border-t-4 border-t-indigo-500">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-8 justify-between">
                  <div className="flex items-center gap-6">
                    <div className="relative flex items-center justify-center w-32 h-32 bg-slate-50 rounded-full border-4 border-indigo-100 shadow-inner">
                      <span className="text-4xl font-black text-indigo-600">
                        {latestScore ? latestScore.overall_score : '--'}
                      </span>
                      {payload.uncertainty && (
                        <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded font-bold border border-amber-200">
                          Incompleto
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                        VitalScore Global
                      </h3>
                      <p className="text-xl font-bold text-slate-800">
                        {payload.risk_classification || 'Sem Avaliações Registradas'}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 font-medium">
                        <Clock className="w-3 h-3" /> Último cálculo:{' '}
                        {latestScore
                          ? new Date(latestScore.created_at).toLocaleString('pt-BR')
                          : 'N/A'}
                      </p>
                      {payload.version && (
                        <Badge variant="outline" className="mt-2 text-[10px] shadow-sm bg-white">
                          {payload.version}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {latestScore && (
                    <div className="flex gap-4">
                      <div className="bg-white p-4 rounded-xl border text-center w-32 shadow-sm">
                        <Brain className="w-5 h-5 mx-auto text-rose-500 mb-2" />
                        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Energia
                        </div>
                        <div className="text-sm font-bold text-slate-800 capitalize mt-1">
                          {payload.state?.brain_energy || '--'}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border text-center w-32 shadow-sm">
                        <Network className="w-5 h-5 mx-auto text-blue-500 mb-2" />
                        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Integração
                        </div>
                        <div className="text-sm font-bold text-slate-800 capitalize mt-1">
                          {payload.state?.network_integration || '--'}
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border text-center w-32 shadow-sm">
                        <Activity className="w-5 h-5 mx-auto text-emerald-500 mb-2" />
                        <div className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          Organização
                        </div>
                        <div className="text-sm font-bold text-slate-800 capitalize mt-1">
                          {payload.state?.functional_org || '--'}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Subscores Detalhados */}
              <Card className="col-span-1 shadow-sm">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-slate-700">
                    <List className="w-4 h-4" /> Eixos Funcionais
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  {payload.subscores ? (
                    <div className="space-y-4">
                      <ScoreBar label="Autorregulação" value={payload.subscores.autoregulation} />
                      <ScoreBar label="Neurofunção" value={payload.subscores.neurofunction} />
                      <ScoreBar
                        label="Função Percebida"
                        value={payload.subscores.perceived_function}
                      />
                      <ScoreBar
                        label="Tendência Temporal"
                        value={payload.subscores.temporal_trend}
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-6">
                      Sem evidências derivadas disponíveis.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Timeline Biograma */}
              <Card className="col-span-1 lg:col-span-2 shadow-sm">
                <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-slate-700">
                      <History className="w-4 h-4" /> Biograma Longitudinal
                    </CardTitle>
                    <CardDescription className="mt-1">Evolução do estado clínico</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  {timeline.scores.length > 0 ? (
                    <div className="space-y-3">
                      {timeline.scores.slice(0, 4).map((score: any) => (
                        <div
                          key={score.id}
                          className="flex items-center gap-4 p-3 rounded-lg border bg-white shadow-sm"
                        >
                          <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center font-bold text-indigo-700 border border-indigo-100 shrink-0">
                            {score.overall_score}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-800">
                              {score.payload?.risk_classification}
                            </h4>
                            <p className="text-xs font-medium text-slate-400 mt-0.5">
                              {new Date(score.created_at).toLocaleString('pt-BR')}
                            </p>
                          </div>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600">
                            {score.payload?.state?.functional_org}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-6">
                      Sem histórico registrado.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Trilha Auditável */}
              <Card className="col-span-1 lg:col-span-3 shadow-sm border-t-4 border-t-slate-800 bg-white">
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 text-slate-700">
                    <Shield className="w-4 h-4 text-slate-700" /> Trilha Auditável (Event Sourcing)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-0">
                  <Table>
                    <TableHeader className="bg-slate-50">
                      <TableRow>
                        <TableHead className="w-[180px]">Data/Hora</TableHead>
                        <TableHead>Tipo de Evento</TableHead>
                        <TableHead>Origem</TableHead>
                        <TableHead className="text-right">Hash Criptográfico (State)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {timeline.events.slice(0, 5).map((evt: any) => (
                        <TableRow key={evt.id} className="hover:bg-slate-50/50">
                          <TableCell className="text-xs font-medium text-slate-500">
                            {new Date(evt.occurred_at).toLocaleString('pt-BR')}
                          </TableCell>
                          <TableCell className="font-semibold text-xs text-slate-700">
                            {evt.event_type}
                          </TableCell>
                          <TableCell className="text-xs">
                            <Badge
                              variant="outline"
                              className="text-[10px] text-slate-500 bg-white"
                            >
                              {evt.source_type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <span
                              className="font-mono text-[10px] text-slate-400 bg-slate-100 px-2 py-1 rounded inline-block max-w-[200px] truncate"
                              title={evt.current_hash || evt.id}
                            >
                              {evt.current_hash || evt.id}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-white text-center p-8">
            <Activity className="w-16 h-16 text-indigo-100 mb-4" />
            <h3 className="text-xl font-bold text-slate-700">Command Center Operacional</h3>
            <p className="text-slate-500 mt-2 max-w-md">
              Acesse o índice auditável do estado neurofuncional. <br />
              Selecione um paciente na barra lateral para iniciar a análise longitudinal.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
