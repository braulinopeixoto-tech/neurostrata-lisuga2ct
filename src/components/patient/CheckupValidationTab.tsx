import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, CheckCircle2, Clock, Lock, Activity, FileEdit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import useAppStore, { CheckupStageId } from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'
import { AlertsDashboard } from './AlertsDashboard'

export function CheckupValidationTab({ patient }: { patient: any }) {
  const { patientJourneys, validateJourneyStage, currentUser } = useAppStore()
  const journey = patientJourneys[patient.id]
  const [validatingStageId, setValidatingStageId] = useState<string | null>(null)
  const [validationNotes, setValidationNotes] = useState('')

  const STAGES = [
    { id: 'level1_dass21', title: 'Rastreio Inicial (DASS-21)', subtitle: 'Nível 01' },
    { id: 'level2_functions', title: '18 Funções Psíquicas', subtitle: 'Nível 02' },
    { id: 'level2_rdoc', title: 'Domínios RDoC', subtitle: 'Nível 02' },
    { id: 'level2_bigfive', title: 'Perfil de Personalidade', subtitle: 'Nível 02' },
    { id: 'level3_performance', title: 'Performance Mental (CFP)', subtitle: 'Nível 03' },
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

  const handleConfirmValidation = () => {
    if (validatingStageId) {
      validateJourneyStage(
        patient.id,
        validatingStageId as CheckupStageId,
        currentUser.fullName,
        validationNotes,
      )
      toast({
        title: 'Etapa Validada com Sucesso',
        description:
          'A próxima etapa foi liberada para o paciente e a auditoria foi registrada com sua conduta.',
        action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      })
      setValidatingStageId(null)
      setValidationNotes('')
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Supervisão Profissional (Check-up)
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe o progresso do paciente por níveis, valide resultados e registre condutas para
            desbloquear a Arquitetura Mental Mapeada.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-foreground border-b pb-2">Etapas de Validação</h3>
        {STAGES.map((stage, index) => {
          const status = journey.stages[stage.id as keyof typeof journey.stages]
          const data = journey.data?.[stage.id as keyof typeof journey.data]
          const validator = journey.validatedBy?.[stage.id as keyof typeof journey.validatedBy]
          const notes = journey.notes?.[stage.id as keyof typeof journey.notes]

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
                          <Activity className="w-4 h-4 text-primary" /> Respostas / Resultados:
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
                      <div className="mt-4 ml-11 flex flex-col gap-2">
                        <span className="text-sm text-emerald-600 flex items-center gap-1.5 font-medium bg-emerald-50 w-max px-3 py-1.5 rounded-full border border-emerald-100">
                          <ShieldCheck className="w-4 h-4" /> Validado por {validator}
                        </span>
                        {notes && (
                          <div className="bg-slate-50 border border-slate-200 p-3 rounded-md text-sm text-slate-700 italic border-l-4 border-l-slate-400">
                            <strong>Anotações Clínicas:</strong> {notes}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {status === 'pending_validation' && (
                    <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 shrink-0 md:min-w-[280px]">
                      <Button
                        onClick={() => setValidatingStageId(stage.id)}
                        className="w-full h-12"
                      >
                        <FileEdit className="w-4 h-4 mr-2" /> Revisar e Validar
                      </Button>
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Ao validar, a próxima etapa é desbloqueada para o paciente.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Dialog
        open={!!validatingStageId}
        onOpenChange={(open) => !open && setValidatingStageId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Validar Etapa do Check-up</DialogTitle>
            <DialogDescription>
              Revise os dados enviados pelo paciente e registre sua conduta clínica para liberar a
              próxima fase da avaliação estratificada.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Conduta / Anotações Clínicas</label>
              <Textarea
                placeholder="Ex: Resultados congruentes com o relato subjetivo. Sem indicativos de risco agudo..."
                value={validationNotes}
                onChange={(e) => setValidationNotes(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setValidatingStageId(null)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmValidation}>
              <CheckCircle2 className="w-4 h-4 mr-2" /> Validar e Liberar Próxima
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertsDashboard patientId={patient.id} />
    </div>
  )
}
