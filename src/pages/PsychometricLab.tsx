import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
  TestTubes,
  Activity,
  PlayCircle,
  BarChart3,
  GitCompare,
  Network,
  Cpu,
  BrainCircuit,
  Terminal,
} from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  getNslModels,
  getNslModelDimensions,
  createPerson,
  createAssessment,
  computeVitalScore,
} from '@/services/nsl-engine'

export default function PsychometricLab() {
  const [activeTab, setActiveTab] = useState('nsl')
  const [models, setModels] = useState<any[]>([])
  const [runs, setRuns] = useState<any[]>([])
  const [nslModels, setNslModels] = useState<any[]>([])
  const [nslDimensions, setNslDimensions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [testingNsl, setTestingNsl] = useState(false)
  const [testResult, setTestResult] = useState<any>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const { data: versions } = await supabase
        .from('score_versions')
        .select('*')
        .order('created_at', { ascending: false })
      const { data: runsData } = await supabase
        .from('score_calibration_runs')
        .select('*, score_versions(version_code)')
        .order('created_at', { ascending: false })

      if (versions) setModels(versions)
      if (runsData) setRuns(runsData)

      // NSL Models fetch
      const nslData = await getNslModels()
      setNslModels(nslData)
      if (nslData && nslData.length > 0) {
        const dims = await getNslModelDimensions(nslData[0].id)
        setNslDimensions(dims)
      }
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  const handleTestNsl = async () => {
    setTestingNsl(true)
    setTestResult(null)
    toast({
      title: 'Iniciando NSL Engine',
      description: 'Processando funções plpgsql no backend (Supabase)...',
    })

    try {
      // 1. Create a dummy person
      const person = await createPerson({
        fullName: 'Paciente Teste NSL',
        externalCode: `TEST-${Date.now()}`,
      })

      // 2. Create Assessment Payload
      const payload = {
        rdoc: {
          negative_valence: 72,
          cognition: 61,
        },
        big5: {
          neuroticism: 68,
        },
        eeg: {
          theta_beta: 49,
        },
        clinical: {
          function: 58,
        },
        metabolic: {
          energy: 64,
        },
        context: {
          stress: 74,
        },
        longitudinal: {
          reserve: 53,
        },
        distinctiveness_proxy: 66,
        coherence_proxy: 59,
        temporal_proxy: 63,
      }

      // 3. Insert Assessment
      const assessment = await createAssessment({
        personId: person.id,
        assessmentType: 'full_battery',
        payload,
      })

      // 4. Compute via RPC
      const resultId = await computeVitalScore(assessment.id)

      // 5. Fetch resulting profile
      const { data: profile } = await supabase
        .from('computed_profiles')
        .select('*')
        .eq('id', resultId)
        .single()

      setTestResult(profile)

      toast({
        title: 'Motor NSL Concluído',
        description: `VitalScore Gerado: ${profile.vital_score}`,
      })
    } catch (error: any) {
      console.error(error)
      toast({
        variant: 'destructive',
        title: 'Erro NSL',
        description: error.message || 'Falha ao rodar o motor NSL.',
      })
    } finally {
      setTestingNsl(false)
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in-up mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-elevation relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <BrainCircuit className="w-64 h-64 -mt-10 -mr-10 text-emerald-400" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 uppercase tracking-widest text-[10px]">
              Pesquisa & Validação NSL
            </Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <TestTubes className="w-8 h-8 text-emerald-400" /> Laboratório Psicométrico
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Infraestrutura metodológica de calibração baseada em NSL (NeuroSingularity Language). A
            lógica clínica é processada imutavelmente direto no banco de dados.
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3 mb-6">
          <TabsTrigger value="nsl">Motor NSL (Ativo)</TabsTrigger>
          <TabsTrigger value="models">Modelos Antigos</TabsTrigger>
          <TabsTrigger value="calibrations">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="nsl" className="space-y-6">
          <Card className="shadow-sm border-t-4 border-t-emerald-500 overflow-hidden">
            <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
              <Terminal className="w-48 h-48 -mr-8 -mt-8" />
            </div>
            <CardHeader className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-emerald-600" /> NSL Engine — Definições
                    Proprietárias
                  </CardTitle>
                  <CardDescription>
                    O modelo é calculado via SQL com segurança de nível de linha (RLS).
                  </CardDescription>
                </div>
                <Button
                  onClick={handleTestNsl}
                  disabled={testingNsl}
                  className="bg-slate-900 hover:bg-slate-800 text-emerald-400 shadow-md border border-slate-700"
                >
                  {testingNsl ? (
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <PlayCircle className="w-4 h-4 mr-2" />
                  )}
                  {testingNsl ? 'Processando NSL...' : 'Testar Motor NSL'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              {nslModels.length > 0 && (
                <div className="mb-6 flex gap-4">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                    Versão Ativa: {nslModels[0].model_code} {nslModels[0].version}
                  </Badge>
                  <Badge variant="outline" className="bg-slate-50">
                    Módulo: PL/pgSQL RPC
                  </Badge>
                </div>
              )}

              {testResult && (
                <div className="mb-8 p-6 bg-slate-900 rounded-xl border border-slate-800 text-white animate-fade-in">
                  <h3 className="text-emerald-400 font-bold mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5" />
                    Resultado do Processamento (Backend)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">
                        VitalScore
                      </div>
                      <div className="text-3xl font-black text-white">{testResult.vital_score}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">
                        Índice NSI
                      </div>
                      <div className="text-3xl font-black text-white">{testResult.nsi_score}</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 col-span-2">
                      <div className="text-xs text-slate-400 uppercase font-bold mb-1">
                        Classificação Long.
                      </div>
                      <div className="text-xl font-bold text-emerald-400 uppercase tracking-wide mt-1">
                        {testResult.class_label.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono bg-black p-3 rounded-lg overflow-x-auto">
                    HASH: {testResult.computed_hash}
                  </div>
                </div>
              )}

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código da Dimensão</TableHead>
                    <TableHead>Tipo de Score</TableHead>
                    <TableHead>Peso</TableHead>
                    <TableHead>Parâmetros de Normalização</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nslDimensions.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-mono text-xs font-bold text-slate-700">
                        {d.code}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            d.score_type === 'inverse'
                              ? 'text-rose-600 bg-rose-50 border-rose-200'
                              : d.score_type === 'window'
                                ? 'text-blue-600 bg-blue-50 border-blue-200'
                                : 'text-emerald-600 bg-emerald-50 border-emerald-200'
                          }
                        >
                          {d.score_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-bold">{d.weight}</TableCell>
                      <TableCell className="text-xs text-muted-foreground font-mono">
                        {d.score_type === 'window'
                          ? `target: ${d.target_value}, tol: ${d.tolerance_value}`
                          : `min: ${d.min_value}, max: ${d.max_value}`}
                      </TableCell>
                    </TableRow>
                  ))}
                  {nslDimensions.length === 0 && !loading && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Nenhuma dimensão NSL carregada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Network className="w-5 h-5 text-slate-600" /> Versões de Score (Legacy)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Algoritmo</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {models.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-mono text-xs">{m.version_code}</TableCell>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.algorithm_type}</TableCell>
                      <TableCell>{m.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calibrations" className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" /> Histórico de Calibrações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Run Nome</TableHead>
                    <TableHead>Dataset</TableHead>
                    <TableHead>Métricas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {runs.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-semibold">{r.run_name}</TableCell>
                      <TableCell>{r.dataset_size}</TableCell>
                      <TableCell>
                        <pre className="text-[10px] text-emerald-700 bg-emerald-50 p-1.5 rounded-md inline-block">
                          {JSON.stringify(r.calibration_metrics)}
                        </pre>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
