import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, CheckCircle2, Clock, Lock, Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function CheckupValidationTab({ patient }: { patient: any }) {
  const { patientJourneys, validateJourneyStage, currentUser } = useAppStore()
  const journey = patientJourneys[patient.id]

  const STAGES = [
    {
      id: 'psychic_functions',
      title: '18 Funções Psíquicas',
      subtitle: 'Autoavaliação do paciente',
    },
    { id: 'rdoc', title: 'Domínios RDoC', subtitle: 'Autoavaliação do paciente' },
    { id: 'big_five', title: 'Perfil de Personalidade', subtitle: 'Autoavaliação do paciente' },
  ]

  if (!journey) {
    return (
      <div className="p-12 text-center text-muted-foreground bg-muted/20 rounded-xl border border-dashed animate-fade-in">
        <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <h3 className="text-lg font-bold text-foreground">Aguardando Início</h3>
        <p className="max-w-md mx-auto mt-2">
          O paciente ainda não iniciou a jornada do Check-up Mental Verificado no portal.
        </p>
      </div>
    )
  }

  const handleValidate = (stageId: any) => {
    validateJourneyStage(patient.id, stageId, currentUser.fullName)
    toast({
      title: 'Etapa Validada com Sucesso',
      description:
        'A próxima etapa foi liberada para o paciente e os dados foram consolidados no Biograma.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Validação do Check-up Mental
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o progresso do paciente e valide cada etapa para compor a avaliação clínica.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {STAGES.map((stage, index) => {
          const status = journey.stages[stage.id as keyof typeof journey.stages]
          const data = journey.data?.[stage.id as keyof typeof journey.data]
          const validator = journey.validatedBy?.[stage.id as keyof typeof journey.validatedBy]

          return (
            <Card
              key={stage.id}
              className={status === 'pending_validation' ? 'border-amber-400 shadow-md' : ''}
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground text-sm shrink-0">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-bold text-foreground whitespace-nowrap">
                        {stage.title}
                      </h3>
                      {status === 'validated' && (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" /> Validado
                        </Badge>
                      )}
                      {status === 'pending_validation' && (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200">
                          <Clock className="w-3 h-3 mr-1" /> Aguardando Validação
                        </Badge>
                      )}
                      {status === 'available' && (
                        <Badge
                          variant="outline"
                          className="text-blue-600 border-blue-200 bg-blue-50"
                        >
                          <Activity className="w-3 h-3 mr-1" /> Em Preenchimento
                        </Badge>
                      )}
                      {status === 'locked' && (
                        <Badge variant="secondary" className="text-muted-foreground">
                          <Lock className="w-3 h-3 mr-1" /> Bloqueado
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground ml-11">{stage.subtitle}</p>

                    {data && (
                      <div className="mt-4 ml-11 bg-muted/30 p-4 rounded-lg border text-sm">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Activity className="w-4 h-4 text-primary" /> Respostas do Paciente:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {Object.entries(data)
                            .slice(0, 6)
                            .map(([k, v]) => (
                              <div
                                key={k}
                                className="flex justify-between items-center bg-white p-2 rounded border"
                              >
                                <span
                                  className="text-muted-foreground text-xs truncate mr-2"
                                  title={k}
                                >
                                  {k}
                                </span>
                                <span className="font-medium text-xs whitespace-nowrap">
                                  {v as string}
                                </span>
                              </div>
                            ))}
                          {Object.keys(data).length > 6 && (
                            <div className="text-xs text-muted-foreground p-2 font-medium italic">
                              + {Object.keys(data).length - 6} itens respondidos...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {status === 'validated' && validator && (
                      <p className="text-sm text-emerald-600 mt-4 ml-11 flex items-center gap-1.5 font-medium bg-emerald-50 w-max px-3 py-1.5 rounded-full border border-emerald-100">
                        <ShieldCheck className="w-4 h-4" /> Validado por {validator}
                      </p>
                    )}
                  </div>

                  {status === 'pending_validation' && (
                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 shrink-0 md:min-w-[280px]">
                      <Button onClick={() => handleValidate(stage.id)} className="w-full h-12">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Validar Etapa e Liberar Próxima
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Ao validar, os dados serão consolidados no Biograma Longitudinal do
                        paciente.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
