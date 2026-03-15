import { useParams, Link } from 'react-router-dom'
import { Activity, FileText, Calendar, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EvolutionChart } from '@/components/charts/EvolutionChart'
import useAppStore from '@/stores/useAppStore'

export default function PatientDetail() {
  const { id } = useParams()
  const { patients } = useAppStore()
  const patient = patients.find((p) => p.id === id) || patients[0]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent text-2xl font-bold">
            {patient.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{patient.name}</h1>
            <p className="text-muted-foreground flex items-center gap-2 text-sm mt-1">
              <span>Idade: 38 anos</span> • <span>Sexo: {patient.sex}</span> •
              <span className="text-success font-medium">{patient.status}</span>
            </p>
          </div>
        </div>
        <Button asChild>
          <Link to="/assessment">
            <Plus className="w-4 h-4 mr-2" /> Nova Avaliação
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
          <TabsTrigger
            value="history"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3"
          >
            Histórico Clínico
          </TabsTrigger>
          <TabsTrigger
            value="evolution"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3"
          >
            Evolução Neurofuncional
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3"
          >
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações Médicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-1">Queixa Principal</h4>
                <p className="text-muted-foreground text-sm bg-muted p-3 rounded-md">
                  Paciente relata dificuldade de concentração e fadiga mental persistente nos
                  últimos 6 meses. Episódios esporádicos de ansiedade noturna.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-sm mb-1">Medicação Atual</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                    <li>Escitalopram 10mg/dia</li>
                    <li>Melatonina 3mg (se necessário)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-1">Histórico Familiar</h4>
                  <p className="text-sm text-muted-foreground">
                    Mãe com histórico de Transtorno de Ansiedade Generalizada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Progresso das Funções Psíquicas</CardTitle>
            </CardHeader>
            <CardContent>
              <EvolutionChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="animate-fade-in">
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 bg-card border rounded-lg hover:border-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-muted-foreground w-5 h-5" />
                  <div>
                    <h4 className="font-medium text-sm">Avaliação de Acompanhamento T{item}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> 1{item}/10/2023
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/report/r${item}`}>Ver Relatório</Link>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
