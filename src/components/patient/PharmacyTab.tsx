import { useState, useEffect } from 'react'
import { FlaskConical, Target, History, Plus, CheckCircle2, Activity } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase/client'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/use-auth'

const FRAMEWORK = [
  {
    id: 'eixo-1',
    axis: 'Eixo Neuroinflamatório',
    goal: 'Aumentar potência Alpha e estabilidade cortical',
    formulaName: 'Super Omega 3',
    substances: '4 g/dia (1080 mg EPA, 720 mg DHA)',
    mechanism:
      'Melhora da fluidez de membrana neuronal, aumento de transmissão glutamatérgica regulada, modulação microglial.',
    expectedQeeg: '↑ potência Alpha peak, ↑ coerência fronto-parietal',
    evidence: [
      'https://pubmed.ncbi.nlm.nih.gov/22073138/',
      'https://pubmed.ncbi.nlm.nih.gov/25112976/',
    ],
  },
  {
    id: 'eixo-2',
    axis: 'Eixo Colina / Memória',
    goal: 'Modulação frontal executiva',
    formulaName: 'Modulador Colinérgico',
    substances: 'Citicolina 500 mg, Alpha GPC 300 mg, Bacopa monnieri 300 mg',
    mechanism: 'Aumento acetilcolina, aumento BDNF, plasticidade hipocampal.',
    expectedQeeg: '↑ coerência Beta frontal, ↑ conectividade pré-frontal',
    evidence: ['https://pubmed.ncbi.nlm.nih.gov/27572852/'],
  },
  {
    id: 'eixo-3',
    axis: 'Eixo Mitocondrial',
    goal: 'Redução de lentificação theta',
    formulaName: 'Cofatores Mitocondriais',
    substances: 'CoQ10 200 mg, PQQ 20 mg, Acetil L-carnitina 1000 mg',
    mechanism: 'Aumento do metabolismo neuronal e eficiência respiratória.',
    expectedQeeg: '↓ potência Theta frontal patológica, ↑ metabolismo neuronal',
    evidence: ['https://pubmed.ncbi.nlm.nih.gov/30403619/'],
  },
  {
    id: 'eixo-4',
    axis: 'Eixo Adaptógeno Cortical',
    goal: 'Redução de fadiga',
    formulaName: 'Mix Adaptogênico',
    substances: 'Rhodiola rosea 400 mg, Panax ginseng 200 mg',
    mechanism: 'Modulação HPA, aumento dopamina e serotonina.',
    expectedQeeg: '↑ beta funcional, ↓ fadiga cortical',
    evidence: ['https://pubmed.ncbi.nlm.nih.gov/20378318/'],
  },
  {
    id: 'eixo-5',
    axis: 'Eixo GABA / Ansiedade',
    goal: 'Redução de hiperatividade',
    formulaName: 'Modulador Gabaérgico',
    substances: 'L-theanine 200 mg, Magnésio L-treonato 2 g',
    mechanism: 'Aumento da sinalização inibitória e relaxamento cortical.',
    expectedQeeg: '↑ Alpha frontal, ↓ hiperatividade beta',
    evidence: ['https://pubmed.ncbi.nlm.nih.gov/18296328/'],
  },
  {
    id: 'eixo-6',
    axis: 'Eixo Plasticidade Sináptica',
    goal: 'Estabilidade de redes neurais',
    formulaName: 'Fator de Crescimento',
    substances: 'Lion’s Mane (Hericium erinaceus) 1000 mg',
    mechanism: 'Estímulo ao NGF e mielinização.',
    expectedQeeg: '↑ conectividade frontal, ↑ estabilidade da rede DMN',
    evidence: ['https://pubmed.ncbi.nlm.nih.gov/24266378/'],
  },
  {
    id: 'eixo-7',
    axis: 'Eixo Serotonina / Humor',
    goal: 'Estabilidade emocional',
    formulaName: 'Precursores de Serotonina',
    substances: '5-HTP 100 mg, Vitamina B6 25 mg, Metilfolato 800 mcg',
    mechanism: 'Aporte de cofatores e precursores diretos para síntese de 5-HT.',
    expectedQeeg: '↑ estabilidade alpha posterior, ↓ variabilidade theta',
    evidence: [],
  },
]

export function PharmacyTab({ patient }: { patient: any }) {
  const { user } = useAuth()
  const [interventions, setInterventions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedAxisId, setSelectedAxisId] = useState<string>('')
  const [rationale, setRationale] = useState('')

  const fetchInterventions = async () => {
    const { data, error } = await supabase
      .from('pharmacotherapy_interventions')
      .select('*, prescriber:profiles(full_name)')
      .eq('patient_id', patient.id)
      .order('created_at', { ascending: false })
    if (!error && data) setInterventions(data)
  }

  useEffect(() => {
    fetchInterventions()
  }, [patient.id])

  const handlePrescribe = async () => {
    if (!selectedAxisId || !rationale) {
      toast({ title: 'Erro', description: 'Preencha todos os campos.', variant: 'destructive' })
      return
    }
    const axis = FRAMEWORK.find((a) => a.id === selectedAxisId)
    if (!axis) return

    setLoading(true)
    const { error } = await supabase.from('pharmacotherapy_interventions').insert([
      {
        patient_id: patient.id,
        prescriber_id: user?.id,
        axis_id: axis.id,
        axis_name: axis.axis,
        formula_name: axis.formulaName,
        substances: axis.substances,
        mechanism: axis.mechanism,
        rationale,
        expected_qeeg: axis.expectedQeeg,
      },
    ])
    setLoading(false)

    if (error) {
      toast({ title: 'Erro', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Sucesso', description: 'Intervenção registrada no BLC™.' })
      setRationale('')
      setSelectedAxisId('')
      fetchInterventions()
    }
  }

  const handleUpdateQeeg = async (id: string, observedQeeg: string) => {
    const { error } = await supabase
      .from('pharmacotherapy_interventions')
      .update({ observed_qeeg: observedQeeg, status: 'evaluated' })
      .eq('id', id)
    if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' })
    else {
      toast({ title: 'Resultado registrado', description: 'QEEG validado.' })
      fetchInterventions()
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="bg-teal-900 text-white p-6 rounded-xl shadow-md bg-[url('https://img.usecurling.com/p/800/300?q=brain%20network&color=teal')] bg-cover bg-blend-overlay">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
          <FlaskConical className="w-6 h-6 text-teal-300" />
          Farmacologia Nutricional Guiada por QEEG
        </h2>
        <p className="text-teal-100 max-w-3xl mb-4 text-sm">
          Framework de Convergência BIM correlacionando decisões farmacêuticas a biomarcadores
          eletrofisiológicos (QEEG).
        </p>
        <div className="bg-black/40 p-4 rounded-lg border border-teal-500/30 font-mono text-xs text-teal-200">
          <div className="mb-1 text-teal-300 font-semibold">Estrutura Lógica:</div>
          <div>
            EEG_signal = f(Synaptic efficiency × Neurotransmitter balance × Metabolic energy)
          </div>
          <div className="mt-1 text-teal-400">
            ΔEEG = f(Ω3 + adaptogens + mitochondrial cofactors + cholinergic modulators)
          </div>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-2 max-w-md mb-6">
          <TabsTrigger value="active">Intervenções do Paciente</TabsTrigger>
          <TabsTrigger value="library">Biblioteca & Framework</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-6 m-0">
          <Card className="border-teal-100 shadow-sm">
            <CardHeader className="bg-teal-50/50 border-b border-teal-100 pb-4">
              <CardTitle className="text-lg text-teal-900 flex items-center gap-2">
                <Plus className="w-5 h-5 text-teal-600" />
                Propor Nova Intervenção Rastreável
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Eixo de Atuação (Framework)
                  </label>
                  <Select value={selectedAxisId} onValueChange={setSelectedAxisId}>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione o eixo neurofisiológico..." />
                    </SelectTrigger>
                    <SelectContent>
                      {FRAMEWORK.map((a) => (
                        <SelectItem key={a.id} value={a.id}>
                          {a.axis}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {selectedAxisId && (
                  <div className="bg-slate-50 p-3 rounded-md border text-sm">
                    <div className="font-semibold text-teal-800 mb-1">
                      {FRAMEWORK.find((a) => a.id === selectedAxisId)?.formulaName}
                    </div>
                    <div className="text-slate-600 text-xs mb-2">
                      {FRAMEWORK.find((a) => a.id === selectedAxisId)?.substances}
                    </div>
                    <div className="font-medium text-slate-700 text-xs mt-2">
                      Alvo QEEG Esperado:
                    </div>
                    <div className="text-teal-700 text-xs font-mono bg-teal-50 px-2 py-1 rounded mt-1 border border-teal-100">
                      {FRAMEWORK.find((a) => a.id === selectedAxisId)?.expectedQeeg}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Racional Terapêutico (Integração BIM)
                </label>
                <Textarea
                  placeholder="Justificativa clínica integrada..."
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  className="min-h-[100px] bg-white"
                />
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50 border-t justify-end py-4">
              <Button
                onClick={handlePrescribe}
                disabled={loading || !selectedAxisId || !rationale}
                className="bg-teal-700 hover:bg-teal-800"
              >
                Registrar Intervenção no BLC™
              </Button>
            </CardFooter>
          </Card>
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-500" />
              Histórico de Convergência Farmacêutica
            </h3>
            {interventions.length === 0 ? (
              <div className="bg-white border border-dashed rounded-xl p-8 text-center text-slate-500">
                Nenhuma intervenção registrada.
              </div>
            ) : (
              <div className="grid gap-4">
                {interventions.map((inv) => (
                  <InterventionCard
                    key={inv.id}
                    intervention={inv}
                    onUpdateQeeg={handleUpdateQeeg}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="library" className="m-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FRAMEWORK.map((axis) => (
              <Card
                key={axis.id}
                className="flex flex-col h-full hover:shadow-md transition-shadow border-slate-200"
              >
                <CardHeader className="pb-3 border-b bg-slate-50/50">
                  <Badge className="w-fit mb-2 bg-teal-100 text-teal-800 border-none">
                    {axis.axis}
                  </Badge>
                  <CardTitle className="text-base text-slate-800 leading-tight">
                    {axis.formulaName}
                  </CardTitle>
                  <CardDescription className="text-xs">{axis.goal}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4 flex-1 space-y-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                      Substâncias Claves
                    </div>
                    <p className="text-sm font-medium text-slate-700">{axis.substances}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                      Mecanismo Neurobiológico
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{axis.mechanism}</p>
                  </div>
                  <div className="bg-teal-50 p-2 rounded border border-teal-100">
                    <div className="text-xs font-semibold text-teal-800 mb-1">
                      Resultado QEEG Esperado
                    </div>
                    <p className="font-mono text-xs text-teal-700">{axis.expectedQeeg}</p>
                  </div>
                  {axis.evidence && axis.evidence.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-slate-500 uppercase mb-1">
                        Evidências (PubMed)
                      </div>
                      <ul className="space-y-1">
                        {axis.evidence.map((link, i) => (
                          <li key={i}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-blue-600 hover:underline break-all"
                            >
                              {link}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function InterventionCard({
  intervention,
  onUpdateQeeg,
}: {
  intervention: any
  onUpdateQeeg: (id: string, qeeg: string) => void
}) {
  const [observed, setObserved] = useState(intervention.observed_qeeg || '')
  return (
    <Card className="overflow-hidden border-slate-200">
      <div
        className={`h-1 w-full ${intervention.status === 'evaluated' ? 'bg-emerald-500' : 'bg-amber-400'}`}
      />
      <CardContent className="p-5">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-slate-100">
                {intervention.axis_name}
              </Badge>
              <Badge
                variant={intervention.status === 'evaluated' ? 'default' : 'secondary'}
                className={
                  intervention.status === 'evaluated'
                    ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200'
                }
              >
                {intervention.status === 'evaluated'
                  ? 'QEEG Validado'
                  : 'Aguardando Avaliação QEEG'}
              </Badge>
            </div>
            <h4 className="font-bold text-lg text-slate-800">{intervention.formula_name}</h4>
            <p className="text-sm text-slate-500 mt-1">{intervention.substances}</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <div>
              Prescrito por:{' '}
              <span className="font-medium text-slate-700">
                {intervention.prescriber?.full_name || 'Farmacêutico Clínico'}
              </span>
            </div>
            <div>{new Date(intervention.created_at).toLocaleDateString('pt-BR')}</div>
          </div>
        </div>
        <div className="bg-slate-50 p-3 rounded-md mb-4 border border-slate-100">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Racional Terapêutico
          </div>
          <p className="text-sm text-slate-700">{intervention.rationale}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50/50 p-4 rounded-lg border border-teal-100">
          <div>
            <div className="text-xs font-semibold text-teal-800 mb-1 flex items-center gap-1">
              <Target className="w-3 h-3" /> Alvo QEEG Esperado
            </div>
            <div className="font-mono text-xs text-teal-700 bg-white p-2 rounded border border-teal-100">
              {intervention.expected_qeeg}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-800 mb-1 flex items-center gap-1">
              <Activity className="w-3 h-3" /> Resultado QEEG Observado
            </div>
            {intervention.status === 'evaluated' ? (
              <div className="font-mono text-xs text-emerald-700 bg-white p-2 rounded border border-emerald-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                {intervention.observed_qeeg}
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  placeholder="Ex: ↑ Alpha peak..."
                  className="h-8 text-xs font-mono bg-white"
                  value={observed}
                  onChange={(e) => setObserved(e.target.value)}
                />
                <Button
                  size="sm"
                  className="h-8 text-xs bg-emerald-600 hover:bg-emerald-700"
                  onClick={() => onUpdateQeeg(intervention.id, observed)}
                  disabled={!observed}
                >
                  Salvar
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
