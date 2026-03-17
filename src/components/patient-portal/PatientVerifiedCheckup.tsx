import { useMemo } from 'react'
import { ShieldCheck, Brain, Lock, CheckCircle2, Clock, Map as MapIcon, Play } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import useAppStore, { CheckupStageId } from '@/stores/useAppStore'
import { PatientDASS21Form } from './PatientDASS21Form'
import { PatientFunctionsForm } from './PatientFunctionsForm'
import { PatientRDoCForm } from './PatientRDoCForm'
import { PatientBigFiveForm } from './PatientBigFiveForm'
import { PatientPerformanceForm } from './PatientPerformanceForm'
import { PatientOnboardingFlow } from './PatientOnboardingFlow'
import { HeatMapVisualizer } from './HeatMapVisualizer'
import { ClinicalScores } from './ClinicalScores'
import { PeriodicCheckinForm } from './PeriodicCheckinForm'

const STAGES: { id: CheckupStageId; title: string; subtitle: string; level: number }[] = [
  {
    id: 'level1_dass21',
    title: 'Rastreio Inicial (DASS-21)',
    subtitle: 'Nível 01: Linha de Base',
    level: 1,
  },
  {
    id: 'level2_functions',
    title: '18 Funções Psíquicas',
    subtitle: 'Nível 02: Perfil Neurofuncional',
    level: 2,
  },
  {
    id: 'level2_rdoc',
    title: 'Domínios RDoC',
    subtitle: 'Nível 02: Matriz Dimensional',
    level: 2,
  },
  {
    id: 'level2_bigfive',
    title: 'Perfil de Personalidade',
    subtitle: 'Nível 02: Big Five',
    level: 2,
  },
  {
    id: 'level3_performance',
    title: 'Performance Mental (CFP)',
    subtitle: 'Nível 03: Bateria Validada',
    level: 3,
  },
]

export function PatientVerifiedCheckup({ patientId }: { patientId: string }) {
  const { patients, patientJourneys, patientOnboarded } = useAppStore()

  const patient = useMemo(() => patients.find((p) => p.id === patientId), [patients, patientId])
  const journey = patientJourneys[patientId]
  const isOnboarded = patientOnboarded[patientId]

  if (!isOnboarded) {
    return <PatientOnboardingFlow patientId={patientId} />
  }

  const activeIndex = STAGES.findIndex((s) => journey?.stages[s.id] !== 'validated')
  const isComplete = activeIndex === -1
  const activeStage = isComplete ? null : STAGES[activeIndex]
  const activeStatus = activeStage ? journey?.stages[activeStage.id] : null
  const professional = patient?.linkedProfessionals?.[0]

  if (isComplete && journey) {
    const allData = {
      ...journey.data?.level2_functions,
      ...journey.data?.level2_rdoc,
      ...journey.data?.level2_bigfive,
    }

    return (
      <div className="space-y-8 animate-fade-in mt-6">
        <div className="bg-gradient-to-r from-emerald-50 to-transparent border border-emerald-100 p-6 rounded-xl flex items-start gap-4">
          <Brain className="w-8 h-8 text-emerald-600 shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-emerald-900">
              Arquitetura Mental Mapeada com Sucesso
            </h3>
            <p className="text-sm text-emerald-800/80 mt-1 leading-relaxed max-w-3xl">
              Seus resultados foram validados clinicamente por {professional?.name}. Abaixo, você
              encontra a visualização de seus indicadores e o formulário para monitoramento
              contínuo.
            </p>
          </div>
        </div>

        <ClinicalScores data={allData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HeatMapVisualizer data={allData} />
          <PeriodicCheckinForm patientId={patientId} />
        </div>

        <div className="text-center pt-8 border-t">
          <p className="text-xs text-muted-foreground inline-flex items-center gap-1.5 bg-muted/30 px-4 py-2 rounded-full border border-border/50">
            <ShieldCheck className="w-3.5 h-3.5" />
            <strong>Aviso Institucional:</strong> O sistema não realiza diagnóstico automático e
            funciona estritamente como infraestrutura de suporte à decisão clínica e
            auto-observação.
          </p>
        </div>
      </div>
    )
  }

  const renderActiveContent = () => {
    if (activeStatus === 'pending_validation') {
      return (
        <Card className="border-t-4 border-t-amber-500 bg-amber-50/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Clock className="w-20 h-20 text-amber-500 mb-6" />
            <h3 className="text-2xl font-bold text-amber-800">Aguardando Validação Clínica</h3>
            <p className="text-amber-700 mt-3 max-w-md text-lg">
              Sua avaliação ({activeStage?.title}) foi enviada. A próxima etapa será liberada assim
              que recebermos a validação do seu profissional.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full border border-amber-200">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-medium">Profissional: {professional?.name}</span>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (activeStage?.id === 'level1_dass21') return <PatientDASS21Form patientId={patientId} />
    if (activeStage?.id === 'level2_functions')
      return <PatientFunctionsForm patientId={patientId} />
    if (activeStage?.id === 'level2_rdoc') return <PatientRDoCForm patientId={patientId} />
    if (activeStage?.id === 'level2_bigfive') return <PatientBigFiveForm patientId={patientId} />
    if (activeStage?.id === 'level3_performance')
      return <PatientPerformanceForm patientId={patientId} />

    return null
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-l-primary p-6 rounded-r-lg shadow-sm flex items-center gap-4">
        <Brain className="w-10 h-10 text-primary shrink-0 opacity-80" />
        <div>
          <blockquote className="text-xl font-serif italic text-primary leading-relaxed">
            "Aqui, enquanto você se revela, alguém capacitado te observa."
          </blockquote>
          <p className="text-sm text-muted-foreground font-medium mt-1">
            Jornada guiada e acompanhada por: {professional?.name} ({professional?.role})
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 bg-muted/10 border rounded-xl p-6">
          <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
            <MapIcon className="w-5 h-5 text-primary" /> Sua Arquitetura Mental
          </h3>
          <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4 pt-2">
            {STAGES.map((stage, idx) => {
              const status = journey?.stages[stage.id]
              const isValidated = status === 'validated'
              const isPending = status === 'pending_validation'
              const isAvail = status === 'available'
              const validator = journey?.validatedBy[stage.id]

              return (
                <div key={stage.id} className="pl-6 relative">
                  <div
                    className={cn(
                      'absolute w-4 h-4 rounded-full -left-[9px] top-1 ring-4 ring-background flex items-center justify-center',
                      {
                        'bg-emerald-500': isValidated,
                        'bg-amber-500': isPending,
                        'bg-primary animate-pulse': isAvail,
                        'bg-slate-300': status === 'locked',
                      },
                    )}
                  >
                    {isValidated && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                    {isPending && <Clock className="w-2.5 h-2.5 text-white" />}
                    {isAvail && <Play className="w-2 h-2 text-white ml-0.5" />}
                    {status === 'locked' && <Lock className="w-2.5 h-2.5 text-white" />}
                  </div>

                  <div
                    className={cn(
                      'transition-opacity',
                      status === 'locked' ? 'opacity-50' : 'opacity-100',
                    )}
                  >
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      Etapa {idx + 1}
                    </div>
                    <p
                      className={cn(
                        'font-bold text-base leading-tight',
                        isAvail ? 'text-primary' : 'text-foreground',
                      )}
                    >
                      {stage.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">{stage.subtitle}</p>

                    {isValidated && validator && (
                      <Badge
                        variant="outline"
                        className="mt-2 text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Verificado por {validator}
                      </Badge>
                    )}
                    {isPending && (
                      <Badge
                        variant="secondary"
                        className="mt-2 text-[10px] bg-amber-50 text-amber-700"
                      >
                        Em análise
                      </Badge>
                    )}
                    {status === 'locked' && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1 font-medium italic">
                        <Lock className="w-3 h-3" /> Aguardando validação do profissional
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-8">{renderActiveContent()}</div>
      </div>
    </div>
  )
}
