import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Lock, CheckCircle2, FileEdit, Clock, AlertTriangle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function PatientVerifiedCheckup({ patientId }: { patientId: string }) {
  const { patientJourneys, submitJourneyStage, patientBiogram } = useAppStore()
  const journey = patientJourneys[patientId]

  // Mock checking if there's a recent biogram issue (RDoC Agravamento)
  const biogramData = patientBiogram[patientId] || []
  const latestBiogram = biogramData[biogramData.length - 1]
  const hasAgravamento = latestBiogram && latestBiogram.metrics.stress > 70

  const handleStartStage = (stageId: string) => {
    toast({ title: 'Redirecionando...', description: 'Abrindo o questionário seguro.' })
    setTimeout(() => {
      submitJourneyStage(patientId, stageId as any, { timestamp: new Date().toISOString() })
      toast({
        title: 'Concluído',
        description: 'Respostas enviadas para validação clínica.',
        action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      })
    }, 1500)
  }

  const STAGES = [
    { id: 'level1_dass21', title: 'Nível 1: Rastreio Inicial', desc: 'Sintomas de base (DASS-21)' },
    {
      id: 'level2_functions',
      title: 'Nível 2: Mapeamento Multidimensional',
      desc: '18 Funções, RDoC e Big Five',
    },
    {
      id: 'level3_performance',
      title: 'Nível 3: Performance Mental',
      desc: 'Bateria de testes validados',
    },
  ]

  const getStageStatus = (id: string) => {
    if (!journey) return 'locked'
    if (id === 'level2_functions') {
      const s1 = journey.stages.level2_functions
      const s2 = journey.stages.level2_rdoc
      const s3 = journey.stages.level2_bigfive
      if (s1 === 'validated' && s2 === 'validated' && s3 === 'validated') return 'validated'
      if (s1 === 'pending_validation' || s2 === 'pending_validation' || s3 === 'pending_validation')
        return 'pending_validation'
      if (s1 === 'available') return 'available'
      return 'locked'
    }
    return journey.stages[id as keyof typeof journey.stages] || 'locked'
  }

  return (
    <Card className="border-t-4 border-t-primary shadow-sm">
      <CardHeader className="bg-slate-50 border-b pb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-xl">Sua Jornada de Check-up</CardTitle>
              <CardDescription className="mt-1">
                Acompanhamento contínuo conectado ao seu VitalScore™.
              </CardDescription>
            </div>
          </div>
          {hasAgravamento && (
            <Badge className="bg-rose-100 text-rose-800 border-rose-300 hover:bg-rose-100 p-2">
              <AlertTriangle className="w-4 h-4 mr-1.5" /> Alerta de Agravamento RDoC Ativo
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {hasAgravamento && (
          <div className="mb-6 bg-rose-50 border border-rose-200 p-4 rounded-lg text-sm text-rose-800">
            <strong>Recomendação Médica:</strong> Detectamos uma variação recente nos seus
            indicadores de estresse (VitalScore). Por favor, realize o Nível 2 de Mapeamento o mais
            rápido possível para que nossa equipe ajuste seu protocolo.
          </div>
        )}

        <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
          {STAGES.map((stage, i) => {
            const status = getStageStatus(stage.id)

            // Auto-unlock level 2 if there's an issue
            const isAvailableOverride =
              status === 'locked' && hasAgravamento && stage.id === 'level2_functions'

            const finalStatus = isAvailableOverride ? 'available' : status

            return (
              <div key={stage.id} className="pl-8 relative group">
                <div
                  className={`absolute w-8 h-8 rounded-full -left-[17px] top-0 flex items-center justify-center ring-4 ring-white transition-transform ${
                    finalStatus === 'validated'
                      ? 'bg-emerald-500 text-white'
                      : finalStatus === 'pending_validation'
                        ? 'bg-amber-400 text-white'
                        : finalStatus === 'available'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {finalStatus === 'validated' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : finalStatus === 'pending_validation' ? (
                    <Clock className="w-4 h-4" />
                  ) : finalStatus === 'available' ? (
                    <FileEdit className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`p-5 border rounded-xl shadow-sm ${
                    finalStatus === 'available'
                      ? 'border-primary shadow-md bg-white'
                      : 'bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div>
                      <h4
                        className={`font-bold text-lg ${finalStatus === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}
                      >
                        {stage.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{stage.desc}</p>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      {finalStatus === 'validated' && (
                        <Badge className="bg-emerald-100 text-emerald-800 w-full justify-center">
                          Nível Validado
                        </Badge>
                      )}
                      {finalStatus === 'pending_validation' && (
                        <Badge className="bg-amber-100 text-amber-800 w-full justify-center">
                          Em Análise Médica
                        </Badge>
                      )}
                      {finalStatus === 'locked' && (
                        <Badge variant="secondary" className="w-full justify-center">
                          Aguardando Liberação
                        </Badge>
                      )}
                      {finalStatus === 'available' && (
                        <Button onClick={() => handleStartStage(stage.id)} className="w-full">
                          Iniciar Questionário
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
