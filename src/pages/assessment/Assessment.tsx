import { useState } from 'react'
import { Brain, Activity, Workflow, Bot, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { StepFunctions } from './StepFunctions'
import { StepRDoC } from './StepRDoC'
import { StepProcessing } from './StepProcessing'
import useAppStore from '@/stores/useAppStore'

const STEPS = [
  { id: 1, title: 'Funções Psíquicas', icon: Brain },
  { id: 2, title: 'Domínios RDoC', icon: Activity },
  { id: 3, title: 'Conectividade', icon: Workflow },
  { id: 4, title: 'Processamento', icon: Bot },
]

export default function Assessment() {
  const [currentStep, setCurrentStep] = useState(1)
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Nova Avaliação Neurofuncional</h1>
        <p className="text-muted-foreground mt-1">
          Preencha os dados estruturados para gerar o Mapa Dimensional.
        </p>
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm animate-fade-in">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <Label
                htmlFor="patient-select"
                className="text-base font-semibold flex items-center gap-2 text-primary"
              >
                <User className="w-5 h-5" />
                Nome do Paciente
              </Label>
              <p className="text-sm text-muted-foreground mt-1">
                Selecione o paciente para associar os dados desta avaliação.
              </p>
            </div>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger id="patient-select" className="w-full md:w-[400px] bg-white">
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
        </CardContent>
      </Card>

      <div className="relative mb-12 mt-8">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0 rounded-full" />
        <Progress
          value={(currentStep / 4) * 100}
          className="absolute top-1/2 left-0 h-1 -translate-y-1/2 z-0 bg-transparent rounded-full"
        />
        <div className="relative z-10 flex justify-between">
          {STEPS.map((step) => {
            const isActive = step.id === currentStep
            const isPast = step.id < currentStep
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border-2 ${
                    isActive
                      ? 'bg-accent border-accent text-white scale-110'
                      : isPast
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-muted text-muted-foreground'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-medium ${isActive ? 'text-accent' : 'text-muted-foreground'}`}
                >
                  {step.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <Card className="border-t-4 border-t-accent shadow-lg animate-slide-up">
        <CardContent className="p-6">
          {currentStep === 1 && (
            <StepFunctions onNext={nextStep} patientSelected={!!selectedPatientId} />
          )}
          {currentStep === 2 && <StepRDoC onNext={nextStep} onPrev={prevStep} />}
          {currentStep === 3 && (
            <div className="text-center py-12">
              <Workflow className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">Conectividade Neural (Opcional)</h3>
              <p className="text-muted-foreground mb-6">
                Módulo avançado de entrada de dados de fNIRS/QEEG.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={prevStep}
                  className="px-4 py-2 border rounded-md hover:bg-muted text-sm font-medium"
                >
                  Voltar
                </button>
                <button
                  onClick={nextStep}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium"
                >
                  Pular & Processar
                </button>
              </div>
            </div>
          )}
          {currentStep === 4 && <StepProcessing patientId={selectedPatientId} />}
        </CardContent>
      </Card>
    </div>
  )
}
