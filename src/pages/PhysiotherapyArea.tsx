import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, Search, Users, AlertCircle, FileCheck } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import useAppStore from '@/stores/useAppStore'
import PhysiotherapyTab from '@/pages/assessment/tabs/PhysiotherapyTab'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function PhysiotherapyArea() {
  const { patients } = useAppStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

  const filteredPatients = patients.filter(
    (p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm),
  )

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900 flex items-center gap-3">
            <Activity className="w-8 h-8 text-indigo-600" />
            Integração | Fisioterapia Pericial
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl">
            Módulo BioStrata Fisio para perícia funcional, análise de consistência e geração de
            laudos longitudinais.
          </p>
        </div>
      </div>

      {!selectedPatient ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-md border-indigo-100">
            <CardHeader className="bg-indigo-50/50 border-b border-indigo-100">
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <Users className="w-5 h-5" /> Selecionar Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Buscar paciente por nome ou prontuário..."
                  className="pl-10 h-12 text-base bg-white border-slate-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {filteredPatients.map((patient) => (
                    <div
                      key={patient.id}
                      className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group"
                      onClick={() => setSelectedPatientId(patient.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                            {patient.name}
                          </h3>
                          <p className="text-xs text-slate-500">Prontuário: {patient.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="bg-white">
                          Score: {patient.score}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-indigo-600 hover:text-indigo-800 hover:bg-indigo-100"
                        >
                          Acessar Perícia
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="shadow-sm border-indigo-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Alertas de Inconsistência
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-2">
                  <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-sm font-medium text-red-800">João Silva</p>
                    <p className="text-xs text-red-600 mt-1">
                      Alta divergência entre autorrelato (WHODAS) e desempenho observacional (TUG).
                    </p>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
                    <p className="text-sm font-medium text-amber-800">Maria Oliveira</p>
                    <p className="text-xs text-amber-600 mt-1">
                      Contexto laboral ausente para conclusão funcional.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-indigo-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <FileCheck className="w-4 h-4" /> Laudos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mt-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0"
                    >
                      <span className="text-slate-700">Laudo Pericial #{1040 + i}</span>
                      <span className="text-xs text-slate-400">Há {i} dia(s)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => setSelectedPatientId(null)}
            className="text-indigo-600 hover:bg-indigo-50 -ml-4"
          >
            &larr; Voltar para lista
          </Button>
          <PhysiotherapyTab patient={selectedPatient} />
        </div>
      )}
    </div>
  )
}
