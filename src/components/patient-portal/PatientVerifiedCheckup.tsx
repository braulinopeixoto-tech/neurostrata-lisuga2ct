import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Brain, Lock, CheckCircle2, FileEdit, Clock } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function PatientVerifiedCheckup({ patientId }: { patientId: string }) {
  const { patientJourneys, submitJourneyStage } = useAppStore()
  const journey = patientJourneys[patientId]

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

  // Group level 2 logic
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
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <CardTitle className="text-xl">Sua Jornada de Check-up</CardTitle>
            <CardDescription className="mt-1">
              Complete os níveis para que seu médico possa desbloquear a arquitetura final da sua
              mente.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="relative border-l-2 border-muted ml-4 space-y-8 pb-4">
          {STAGES.map((stage, i) => {
            const status = getStageStatus(stage.id)

            return (
              <div key={stage.id} className="pl-8 relative group">
                <div
                  className={`absolute w-8 h-8 rounded-full -left-[17px] top-0 flex items-center justify-center ring-4 ring-white transition-transform ${
                    status === 'validated'
                      ? 'bg-emerald-500 text-white'
                      : status === 'pending_validation'
                        ? 'bg-amber-400 text-white'
                        : status === 'available'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {status === 'validated' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : status === 'pending_validation' ? (
                    <Clock className="w-4 h-4" />
                  ) : status === 'available' ? (
                    <FileEdit className="w-4 h-4" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                <div
                  className={`p-5 border rounded-xl shadow-sm ${
                    status === 'available' ? 'border-primary shadow-md bg-white' : 'bg-slate-50'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                    <div>
                      <h4
                        className={`font-bold text-lg ${status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}
                      >
                        {stage.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{stage.desc}</p>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      {status === 'validated' && (
                        <Badge className="bg-emerald-100 text-emerald-800 w-full justify-center">
                          Nível Validado
                        </Badge>
                      )}
                      {status === 'pending_validation' && (
                        <Badge className="bg-amber-100 text-amber-800 w-full justify-center">
                          Em Análise Médica
                        </Badge>
                      )}
                      {status === 'locked' && (
                        <Badge variant="secondary" className="w-full justify-center">
                          Aguardando Liberação
                        </Badge>
                      )}
                      {status === 'available' && (
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
