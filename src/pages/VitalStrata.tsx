import { useState } from 'react'
import { HeartPulse, UserCircle, Stethoscope } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAppStore from '@/stores/useAppStore'
import useVitalStrataStore from '@/stores/useVitalStrataStore'

import { GovernancePanel } from '@/components/vitalstrata/GovernancePanel'
import { DomainModules } from '@/components/vitalstrata/DomainModules'
import { InteractiveBiogram } from '@/components/vitalstrata/InteractiveBiogram'
import { SimulationEngine } from '@/components/vitalstrata/SimulationEngine'
import { TrustLayerAudit } from '@/components/vitalstrata/TrustLayerAudit'
import { PatientView } from '@/components/vitalstrata/PatientView'
import { InterventionsLibrary } from '@/components/vitalstrata/InterventionsLibrary'

export default function VitalStrata() {
  const { patients } = useAppStore()
  const { getPatientRecords } = useVitalStrataStore()

  const [selectedPatientId, setSelectedPatientId] = useState<string>('P001')
  const [isPatientMode, setIsPatientMode] = useState(false)

  const records = getPatientRecords(selectedPatientId)
  const latestRecord = records[0]
  const previousRecord = records[1]

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-accent" /> Módulo VitalStrata™
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Gestão inteligente da Reserva Funcional Humana (RFH). Infraestrutura multidimensional,
            preditiva e auditável.
          </p>
        </div>

        <div className="flex flex-col items-end gap-4 w-full md:w-auto">
          <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
            <SelectTrigger className="w-[250px] bg-white">
              <SelectValue placeholder="Selecionar Paciente..." />
            </SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-3 bg-muted/50 p-2.5 rounded-lg border">
            <Label
              htmlFor="view-mode"
              className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <Stethoscope className="w-4 h-4" /> Profissional
            </Label>
            <Switch id="view-mode" checked={isPatientMode} onCheckedChange={setIsPatientMode} />
            <Label
              htmlFor="view-mode"
              className="text-sm font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <UserCircle className="w-4 h-4 text-emerald-600" /> Paciente
            </Label>
          </div>
        </div>
      </div>

      {isPatientMode ? (
        <PatientView latestRecord={latestRecord} />
      ) : (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap hide-scrollbar">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 font-semibold"
            >
              Dashboard de Governança
            </TabsTrigger>
            <TabsTrigger
              value="interventions"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-500 data-[state=active]:text-indigo-700 data-[state=active]:bg-transparent py-3 font-semibold"
            >
              Intervenções & Protocolos
            </TabsTrigger>
            <TabsTrigger
              value="biogram"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 font-semibold"
            >
              Biograma VitalStrata™
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 font-semibold"
            >
              Simulação Preditiva
            </TabsTrigger>
            <TabsTrigger
              value="audit"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 font-semibold text-emerald-700 data-[state=active]:text-emerald-800"
            >
              Trust Layer™ (Auditoria)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="m-0 space-y-6 focus-visible:outline-none">
            <GovernancePanel latestRecord={latestRecord} previousRecord={previousRecord} />
            <DomainModules record={latestRecord} />
          </TabsContent>

          <TabsContent value="interventions" className="m-0 focus-visible:outline-none">
            <InterventionsLibrary patientId={selectedPatientId} />
          </TabsContent>

          <TabsContent value="biogram" className="m-0 focus-visible:outline-none">
            <InteractiveBiogram records={records} />
          </TabsContent>

          <TabsContent value="simulation" className="m-0 focus-visible:outline-none">
            <SimulationEngine record={latestRecord} />
          </TabsContent>

          <TabsContent value="audit" className="m-0 focus-visible:outline-none">
            <TrustLayerAudit records={records} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
