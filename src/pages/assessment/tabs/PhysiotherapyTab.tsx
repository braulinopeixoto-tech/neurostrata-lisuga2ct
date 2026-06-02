import { Patient } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, FileText, TrendingUp, AlertTriangle } from 'lucide-react'
import { PhysioDashboard } from '@/components/physio/PhysioDashboard'
import { PhysioWizard } from '@/components/physio/PhysioWizard'
import { PhysioBiogram } from '@/components/physio/PhysioBiogram'
import { PhysioReport } from '@/components/physio/PhysioReport'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface PhysiotherapyTabProps {
  patient: Patient
}

export default function PhysiotherapyTab({ patient }: PhysiotherapyTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" />
            BioStrata Fisio | Perícia Funcional
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Análise de consistência, testes observacionais e laudo automatizado
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid grid-cols-4 w-full md:w-[600px] mb-6">
          <TabsTrigger value="dashboard" className="text-xs sm:text-sm">
            <Activity className="w-4 h-4 mr-2" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="wizard" className="text-xs sm:text-sm">
            <FileText className="w-4 h-4 mr-2" />
            Avaliação
          </TabsTrigger>
          <TabsTrigger value="biogram" className="text-xs sm:text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Biograma
          </TabsTrigger>
          <TabsTrigger value="report" className="text-xs sm:text-sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Laudo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0 focus-visible:outline-none">
          <PhysioDashboard patient={patient} />
        </TabsContent>
        <TabsContent value="wizard" className="mt-0 focus-visible:outline-none">
          <PhysioWizard patient={patient} />
        </TabsContent>
        <TabsContent value="biogram" className="mt-0 focus-visible:outline-none">
          <PhysioBiogram patient={patient} />
        </TabsContent>
        <TabsContent value="report" className="mt-0 focus-visible:outline-none">
          <PhysioReport patient={patient} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
