import { useState, useEffect, useMemo } from 'react'
import { Brain, Activity, User, Dna, Bot, Network, Stethoscope, BrainCircuit } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { StepFunctions } from '@/pages/assessment/StepFunctions'
import { StepRDoC } from '@/pages/assessment/StepRDoC'
import { StepBigFive } from '@/pages/assessment/StepBigFive'
import { StepBiomarkers } from '@/pages/assessment/StepBiomarkers'
import { StepProcessing } from '@/pages/assessment/StepProcessing'
import { StepMultiAgent } from '@/pages/assessment/StepMultiAgent'
import useAppStore from '@/stores/useAppStore'
import { cn } from '@/lib/utils'

const ALL_STEPS = [
  { id: '1', title: 'Funções Psíquicas', icon: Brain, complex: false, medicalOnly: false },
  { id: '2', title: 'Matriz RDoC', icon: Activity, complex: true, medicalOnly: false },
  { id: '3', title: 'Big Five', icon: Network, complex: true, medicalOnly: false },
  { id: '4', title: 'Biomarcadores', icon: Dna, complex: true, medicalOnly: false },
  { id: 'ma', title: 'Motor Multi-Agente', icon: BrainCircuit, complex: true, medicalOnly: true },
  { id: '5', title: 'Processamento', icon: Bot, complex: false, medicalOnly: false },
]

export default function Assessment() {
  const [currentTab, setCurrentTab] = useState('1')
  const { patients, professionals, setCurrentAssessmentId } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const [selectedProfId, setSelectedProfId] = useState<string>('')

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)
  const selectedProf = professionals.find((p) => p.id === selectedProfId)

  const visibleSteps = useMemo(() => {
    const checkComplex = () => {
      if (!selectedProf) return true
      const fullRoles = [
        'Médico',
        'Neurologista',
        'Psiquiatra',
        'Psicólogo(a)',
        'Neuropsicólogo(a)',
      ]
      return fullRoles.includes(selectedProf.specialty)
    }

    const checkMedical = () => {
      if (!selectedProf) return true
      return ['Médico', 'Neurologista', 'Psiquiatra'].includes(selectedProf.specialty)
    }

    return ALL_STEPS.filter((s) => {
      if (s.complex && !checkComplex()) return false
      if (s.medicalOnly && !checkMedical()) return false
      return true
    })
  }, [selectedProf])

  const isComplex = () => {
    if (!selectedProf) return true
    const fullRoles = ['Médico', 'Neurologista', 'Psiquiatra', 'Psicólogo(a)', 'Neuropsicólogo(a)']
    return fullRoles.includes(selectedProf.specialty)
  }

  const isMedical = () => {
    if (!selectedProf) return true
    return ['Médico', 'Neurologista', 'Psiquiatra'].includes(selectedProf.specialty)
  }

  useEffect(() => {
    if (!visibleSteps.find((s) => s.id === currentTab)) {
      setCurrentTab(visibleSteps[0].id)
    }
  }, [currentTab, visibleSteps])

  useEffect(() => {
    if (selectedPatientId) {
      setCurrentAssessmentId(selectedPatientId)
    }
  }, [selectedPatientId, setCurrentAssessmentId])

  const goNext = (id: string) => {
    const idx = visibleSteps.findIndex((s) => s.id === id)
    if (idx >= 0 && idx < visibleSteps.length - 1) {
      setCurrentTab(visibleSteps[idx + 1].id)
    }
  }

  const goPrev = (id: string) => {
    const idx = visibleSteps.findIndex((s) => s.id === id)
    if (idx > 0) {
      setCurrentTab(visibleSteps[idx - 1].id)
    }
  }

  const getNextLabel = (id: string) => {
    const idx = visibleSteps.findIndex((s) => s.id === id)
    if (idx >= 0 && idx < visibleSteps.length - 1) {
      return visibleSteps[idx + 1].title
    }
    return ''
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Avaliação Neurofuncional Multidimensional
        </h1>
        <p className="text-muted-foreground mt-1">
          Sistematização de avaliação clínica com módulos adaptáveis por especialidade.
        </p>
      </div>

      <Card className="border-t-4 border-t-primary shadow-sm animate-fade-in">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label
                htmlFor="prof-select"
                className="text-base font-semibold flex items-center gap-2 text-primary"
              >
                <Stethoscope className="w-5 h-5" /> Profissional Responsável
              </Label>
              <Select value={selectedProfId} onValueChange={setSelectedProfId}>
                <SelectTrigger id="prof-select" className="w-full bg-white">
                  <SelectValue placeholder="Selecione o profissional logado..." />
                </SelectTrigger>
                <SelectContent>
                  {professionals.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.fullName} ({p.specialty})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedProf && (
                <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2 bg-muted/30 p-2.5 rounded-md border border-border/50 w-max">
                  <span>Acesso ao Template de Avaliação:</span>
                  <span
                    className={cn('font-semibold', isComplex() ? 'text-primary' : 'text-amber-600')}
                  >
                    {isComplex() ? 'Completo (Avançado)' : 'Limitado (Simplificado)'}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Label
                htmlFor="patient-select"
                className="text-base font-semibold flex items-center gap-2 text-primary"
              >
                <User className="w-5 h-5" /> Paciente Associado
              </Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger id="patient-select" className="w-full bg-white">
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
              {selectedPatient && (
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium border border-primary/20 flex items-center gap-2 w-max">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Em avaliação:{' '}
                  {selectedPatient.name}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-8">
        <TabsList
          className={cn(
            'grid w-full h-auto p-1 bg-muted/50 gap-1 rounded-xl transition-all',
            visibleSteps.length === 6
              ? 'grid-cols-3 md:grid-cols-6 max-w-full'
              : visibleSteps.length === 5
                ? 'grid-cols-2 md:grid-cols-5 max-w-4xl mx-auto'
                : 'grid-cols-2 max-w-xl mx-auto',
          )}
        >
          {visibleSteps.map((step) => (
            <TabsTrigger
              key={step.id}
              value={step.id}
              className="flex flex-col items-center gap-2 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:text-accent transition-all"
            >
              <step.icon className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">{step.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="mt-6 bg-card border rounded-xl shadow-sm overflow-hidden min-h-[400px]">
          <TabsContent value="1" className="m-0 p-6 focus-visible:outline-none">
            <StepFunctions
              onNext={() => goNext('1')}
              nextLabel={getNextLabel('1')}
              patientSelected={!!selectedPatientId}
            />
          </TabsContent>
          {isComplex() && (
            <>
              <TabsContent value="2" className="m-0 p-6 focus-visible:outline-none">
                <StepRDoC onNext={() => goNext('2')} onPrev={() => goPrev('2')} />
              </TabsContent>
              <TabsContent value="3" className="m-0 p-6 focus-visible:outline-none">
                <StepBigFive onNext={() => goNext('3')} onPrev={() => goPrev('3')} />
              </TabsContent>
              <TabsContent value="4" className="m-0 p-6 focus-visible:outline-none">
                <StepBiomarkers onNext={() => goNext('4')} onPrev={() => goPrev('4')} />
              </TabsContent>
            </>
          )}
          {isMedical() && (
            <TabsContent value="ma" className="m-0 p-6 focus-visible:outline-none">
              <StepMultiAgent onNext={() => goNext('ma')} onPrev={() => goPrev('ma')} />
            </TabsContent>
          )}
          <TabsContent value="5" className="m-0 p-6 focus-visible:outline-none">
            <StepProcessing patientId={selectedPatientId} isComplex={isComplex()} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
