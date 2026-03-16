import { useParams, Link } from 'react-router-dom'
import { Plus, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAppStore from '@/stores/useAppStore'
import { AnamnesisTab } from '@/components/patient/AnamnesisTab'
import { EvolutionTab } from '@/components/patient/EvolutionTab'
import { ReportsTab } from '@/components/patient/ReportsTab'
import { AuditTab } from '@/components/patient/AuditTab'
import { DigitizationTab } from '@/components/patient/DigitizationTab'
import { ComplianceTab } from '@/components/patient/ComplianceTab'
import { ModularLibraryTab } from '@/components/protocols/ModularLibraryTab'
import { LegalConsultationTab } from '@/components/patient/LegalConsultationTab'

export default function PatientDetail() {
  const { id } = useParams()
  const { patients } = useAppStore()
  const patient = patients.find((p) => p.id === id) || patients[0]

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              {patient.name} <ShieldCheck className="w-5 h-5 text-success" />
            </h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <span>Sexo: {patient.sex}</span> •
              <span>Escolaridade: {patient.education || 'N/D'}</span> •
              <span className="text-success font-medium">{patient.status}</span>
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/assessment">
            <Plus className="w-4 h-4 mr-2" /> Avaliação Multidimensional
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="anamnesis" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto flex-nowrap shrink-0 scrollbar-hide">
          <TabsTrigger
            value="anamnesis"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Anamnese
          </TabsTrigger>
          <TabsTrigger
            value="digitization"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Digitalização
          </TabsTrigger>
          <TabsTrigger
            value="compliance"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Conformidade (UNESCO)
          </TabsTrigger>
          <TabsTrigger
            value="evolution"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Evolução
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Laudos
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Auditoria EHR
          </TabsTrigger>
          <TabsTrigger
            value="protocols"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap"
          >
            Biblioteca de Protocolos
          </TabsTrigger>
          <TabsTrigger
            value="legal"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3 whitespace-nowrap text-blue-700 data-[state=active]:text-blue-800"
          >
            Consulta Jurídica
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anamnesis" className="m-0">
          <AnamnesisTab patient={patient} />
        </TabsContent>
        <TabsContent value="digitization" className="m-0">
          <DigitizationTab patientId={patient.id} />
        </TabsContent>
        <TabsContent value="compliance" className="m-0">
          <ComplianceTab patientId={patient.id} />
        </TabsContent>
        <TabsContent value="evolution" className="m-0">
          <EvolutionTab />
        </TabsContent>
        <TabsContent value="reports" className="m-0">
          <ReportsTab />
        </TabsContent>
        <TabsContent value="audit" className="m-0">
          <AuditTab patient={patient} />
        </TabsContent>
        <TabsContent value="protocols" className="m-0">
          <ModularLibraryTab />
        </TabsContent>
        <TabsContent value="legal" className="m-0">
          <LegalConsultationTab patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
