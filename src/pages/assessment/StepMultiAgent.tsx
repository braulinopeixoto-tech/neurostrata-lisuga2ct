import { useState, useEffect } from 'react'
import {
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
  FileSearch,
  Sparkles,
  Activity,
  Link as LinkIcon,
  Network,
  CheckCircle2,
  Fingerprint,
  Stethoscope,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'

export function StepMultiAgent({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { currentAssessmentData: data } = useAppStore()
  const [isProcessing, setIsProcessing] = useState(true)
  const [approved, setApproved] = useState(false)
  const [protocol, setProtocol] = useState({ b1: '', b2: '', b3: '', b4: '' })

  useEffect(() => {
    const timer = setTimeout(() => setIsProcessing(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const hasSafetyRisks = data.seizureRisk || data.implants

  if (isProcessing) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center relative z-10">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-primary">Iniciando Core Multi-Agente...</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto font-mono">
            Decodificando construtos RDoC, analisando dados ingeridos e mapeando evidências
            clínicas.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold flex items-center gap-2 text-primary">
          <BrainCircuit className="w-6 h-6" /> Core de Inteligência Multi-Agente
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Formulação baseada em estados neurofuncionais e sequenciamento terapêutico guiado por
          evidências.
        </p>
      </div>

      {hasSafetyRisks && (
        <Alert variant="destructive" className="animate-fade-in-up border-red-500/50 bg-red-50/50">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <AlertTitle className="font-bold text-red-800">Safety Gate System Ativado</AlertTitle>
          <AlertDescription className="space-y-1 mt-2 text-red-700">
            {data.seizureRisk && (
              <p>
                • <strong>Risco de Convulsão:</strong> Restrição para estimulação excitatória de
                alta frequência (ex: rTMS &gt; 10Hz, tACS específica).
              </p>
            )}
            {data.implants && (
              <p>
                • <strong>Implantes:</strong> Contraindicação absoluta para estimulação magnética
                (TMS). Restrição de campo.
              </p>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-t-4 border-t-accent shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">State Formulation Layer</CardTitle>
          <CardDescription>
            Retrato neurofuncional integrado gerado pelos agentes a partir dos dados do paciente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Disfunção Dominante
              </div>
              <div className="font-bold text-foreground">Hiper-reatividade + Ruminação</div>
            </div>
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Disfunção Secundária
              </div>
              <div className="font-bold text-foreground">Fadiga Executiva (Controle)</div>
            </div>
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Modificador
              </div>
              <div className="font-bold text-amber-600">Instabilidade de Arousal</div>
            </div>
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Rede Prioritária
              </div>
              <div className="font-bold text-blue-600">Default Mode Network (DMN)</div>
            </div>
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Nível de Certeza
              </div>
              <div className="font-bold text-emerald-600 flex items-center gap-1">
                87% <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 bg-muted/40 rounded-xl border border-border/50 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Risco Operacional
              </div>
              <div className="font-bold text-rose-600">Moderado (Impacto Laboral)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="neuroanatomy" className="w-full">
        <TabsList className="grid grid-cols-3 w-full h-auto p-1">
          <TabsTrigger value="neuroanatomy" className="gap-2 py-2.5">
            <Network className="w-4 h-4 hidden sm:block" /> Agente Neuroanatômico
          </TabsTrigger>
          <TabsTrigger value="neuromodulation" className="gap-2 py-2.5">
            <Activity className="w-4 h-4 hidden sm:block" /> Agente de Neuromodulação
          </TabsTrigger>
          <TabsTrigger value="evidence" className="gap-2 py-2.5">
            <FileSearch className="w-4 h-4 hidden sm:block" /> Agente de Evidências
          </TabsTrigger>
        </TabsList>

        <TabsContent value="neuroanatomy" className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="font-semibold flex items-center gap-2 mb-3">
                  <Network className="w-4 h-4 text-blue-500" /> Decodificação de Padrões
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-3">
                    <p>
                      <strong>Redes Implicadas:</strong> DMN (88% prob), Salience Network (75%).
                    </p>
                    <p>
                      <strong>Alvos Estruturais:</strong> ACC (Confiança: 80%), DLPFC Esquerdo
                      (Confiança: 90%).
                    </p>
                    <p>
                      <strong>Construto RDoC:</strong> Valência Negativa (Ameaça Sustentada) /
                      Sistemas Cognitivos.
                    </p>
                  </div>
                  <div className="p-4 bg-amber-50 text-amber-900 rounded-lg border border-amber-200 shadow-sm">
                    <span className="font-semibold block mb-1 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" /> Marcador de Incerteza:
                    </span>
                    Alta variabilidade na coerência theta-beta frontal sugere possível artefato
                    transitório ou estado compensatório não totalmente consolidado.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="neuromodulation" className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-5">
              <h4 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" /> Raciocínio Terapêutico (Hipóteses)
              </h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1 font-medium text-sm text-muted-foreground">
                    Nível A (Objetivo Bio)
                  </div>
                  <div className="sm:col-span-3 text-sm">
                    Restaurar equilíbrio inibitório top-down via estimulação pré-frontal. Hipótese:
                    Promover controle cognitivo sobre a reatividade límbica.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1 font-medium text-sm text-muted-foreground">
                    Nível B (Classe)
                  </div>
                  <div className="sm:col-span-3 text-sm">
                    Sugere-se <strong>tDCS</strong> como primeira linha pela robustez regulatória;{' '}
                    <strong>rTMS</strong> como alternativa se refratário.{' '}
                    <strong>Neurofeedback</strong> para consolidação.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1 font-medium text-sm text-muted-foreground">
                    Nível C (Estratégia)
                  </div>
                  <div className="sm:col-span-3 text-sm">
                    1. Priming (Estabilização Base) → 2. Modulação Focal (Rede Alvo) → 3.
                    Consolidação Plástica.
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="sm:col-span-1 font-medium text-sm text-muted-foreground">
                    Nível D (Restrições)
                  </div>
                  <div className="sm:col-span-3 text-sm">
                    {hasSafetyRisks ? (
                      <span className="text-destructive font-semibold">
                        Intervenções magnéticas ou excitatórias bloqueadas pelos parâmetros de
                        segurança.
                      </span>
                    ) : (
                      <span className="text-emerald-600 font-medium">
                        Nenhuma contraindicação fisiológica absoluta detectada.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evidence" className="mt-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h4 className="font-semibold flex items-center gap-2 mb-4">
                <FileSearch className="w-4 h-4 text-emerald-500" /> Mapeamento de Literatura
              </h4>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Modulação da DMN com tDCS anódica</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> Nature Neuroscience (2022)
                    </p>
                  </div>
                  <Badge className="w-max mt-2 sm:mt-0 bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                    Consolidado
                  </Badge>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Neurofeedback guiado por LORETA</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <LinkIcon className="w-3 h-3" /> Brain Stimulation (2023)
                    </p>
                  </div>
                  <Badge className="w-max mt-2 sm:mt-0 bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200">
                    Promissor / Experimental
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="border-t-4 border-t-primary shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-5">
          <Fingerprint className="w-40 h-40" />
        </div>
        <CardHeader className="relative z-10 pb-4 border-b">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-accent" /> Modular Protocol Composer
          </CardTitle>
          <CardDescription>
            Construa a intervenção em blocos sequenciais baseado nas hipóteses.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 pt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Badge variant="outline" className="bg-slate-50 w-full justify-center py-1">
                Bloco 1: Regulação Basal
              </Badge>
              <Select
                value={protocol.b1}
                onValueChange={(v) => setProtocol({ ...protocol, b1: v })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="reac">REAC (NPO) - Neuromodulação</SelectItem>
                  <SelectItem value="tdcs_cons">tDCS Conservadora (Bilateral)</SelectItem>
                  <SelectItem value="nfb_smr">Neurofeedback SMR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Badge variant="outline" className="bg-slate-50 w-full justify-center py-1">
                Bloco 2: Intervenção Alvo
              </Badge>
              <Select
                value={protocol.b2}
                onValueChange={(v) => setProtocol({ ...protocol, b2: v })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tdcs_focal">tDCS Focal Anódica (DLPFC)</SelectItem>
                  <SelectItem value="tacs_alpha" disabled={data.seizureRisk}>
                    tACS Alpha (Parietal)
                  </SelectItem>
                  <SelectItem value="tms_hf" disabled={hasSafetyRisks}>
                    rTMS Alta Freq. (DLPFC)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Badge variant="outline" className="bg-slate-50 w-full justify-center py-1">
                Bloco 3: Consolidação
              </Badge>
              <Select
                value={protocol.b3}
                onValueChange={(v) => setProtocol({ ...protocol, b3: v })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nfb_loreta">sLORETA Neurofeedback</SelectItem>
                  <SelectItem value="cog_train">Treinamento Cognitivo Comp.</SelectItem>
                  <SelectItem value="erp_train">Retreinamento Guiado por ERP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <Badge variant="outline" className="bg-slate-50 w-full justify-center py-1">
                Bloco 4: Verificação
              </Badge>
              <Select
                value={protocol.b4}
                onValueChange={(v) => setProtocol({ ...protocol, b4: v })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qEEG_re">Re-mapeamento qEEG (30 dias)</SelectItem>
                  <SelectItem value="erp_short">ERP Curto (P300/N200)</SelectItem>
                  <SelectItem value="scales">Escalas Clínicas + HRV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="p-6 bg-slate-50 border border-slate-200 border-dashed rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-start gap-4 flex-1">
          <ShieldCheck className="w-10 h-10 text-slate-400 shrink-0 mt-1" />
          <div className="space-y-1.5">
            <h4 className="font-semibold text-slate-800">Responsabilidade e Learning Loop</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              A inteligência artificial <strong>não prescreve</strong> intervenções. As sugestões
              são probabilísticas. Ao aprovar, os dados de baseline serão registrados no{' '}
              <em>Learning Loop</em> para Outcome Tracking (rastreamento de desfecho). A
              responsabilidade clínica é exclusiva do profissional.
            </p>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
          <Button
            size="lg"
            className="w-full md:w-auto bg-success hover:bg-success/90 text-white font-semibold gap-2 shadow-sm transition-all"
            disabled={!protocol.b1 || !protocol.b2 || approved}
            onClick={() => {
              setApproved(true)
              setTimeout(() => {
                console.log('Protocol DNA Generated:', {
                  mechanism: 'Inibição DMN / Controle Executivo',
                  techniques: protocol,
                  status: 'Aprovado Humano',
                })
                onNext()
              }, 1200)
            }}
          >
            {approved ? (
              <>
                <CheckCircle2 className="w-5 h-5" /> Protocolo Assinado
              </>
            ) : (
              <>
                <Stethoscope className="w-5 h-5" /> Revisar e Aprovar Protocolo
              </>
            )}
          </Button>
          {!protocol.b1 && !protocol.b2 && !approved && (
            <span className="text-xs text-muted-foreground font-medium">
              Formule pelo menos os Blocos 1 e 2.
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar para Biomarcadores
        </Button>
      </div>
    </div>
  )
}
