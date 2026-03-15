import { useState } from 'react'
import { Brain, Activity, User, Dna, Bot, Network } from 'lucide-react'
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
import { StepFunctions } from './StepFunctions'
import { StepRDoC } from './StepRDoC'
import { StepBigFive } from './StepBigFive'
import { StepBiomarkers } from './StepBiomarkers'
import { StepProcessing } from './StepProcessing'
import useAppStore from '@/stores/useAppStore'

const STEPS = [
  { id: '1', title: 'Funções Psíquicas', icon: Brain },
  { id: '2', title: 'Matriz RDoC', icon: Activity },
  { id: '3', title: 'Big Five', icon: Network },
  { id: '4', title: 'Biomarcadores', icon: Dna },
  { id: '5', title: 'Processamento', icon: Bot },
]

export default function Assessment() {
  const [currentTab, setCurrentTab] = useState('1')
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')
  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Avaliação Neurofuncional Multidimensional
        </h1>
        <p className="text-muted-foreground mt-1">
          Sistematização RDoC, Big Five e 18 Funções Psíquicas com integração biomarcadora.
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
                <User className="w-5 h-5" /> Paciente Associado
              </Label>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
              {selectedPatient && (
                <div className="px-4 py-2 bg-primary/10 text-primary rounded-md text-sm font-medium border border-primary/20 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Em avaliação:{' '}
                  {selectedPatient.name}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-8">
        <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-muted/50 gap-1 rounded-xl">
          {STEPS.map((step) => (
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
              onNext={() => setCurrentTab('2')}
              patientSelected={!!selectedPatientId}
            />
          </TabsContent>
          <TabsContent value="2" className="m-0 p-6 focus-visible:outline-none">
            <StepRDoC onNext={() => setCurrentTab('3')} onPrev={() => setCurrentTab('1')} />
          </TabsContent>
          <TabsContent value="3" className="m-0 p-6 focus-visible:outline-none">
            <StepBigFive onNext={() => setCurrentTab('4')} onPrev={() => setCurrentTab('2')} />
          </TabsContent>
          <TabsContent value="4" className="m-0 p-6 focus-visible:outline-none">
            <StepBiomarkers onNext={() => setCurrentTab('5')} onPrev={() => setCurrentTab('3')} />
          </TabsContent>
          <TabsContent value="5" className="m-0 p-6 focus-visible:outline-none">
            <StepProcessing patientId={selectedPatientId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
