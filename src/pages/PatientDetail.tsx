import { useParams, Link } from 'react-router-dom'
import { FileText, Calendar, Plus, ShieldCheck, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EvolutionChart } from '@/components/charts/EvolutionChart'
import useAppStore from '@/stores/useAppStore'

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
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6 overflow-x-auto">
          <TabsTrigger
            value="anamnesis"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3"
          >
            Anamnese Estruturada
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
            Laudos Clínicos
          </TabsTrigger>
          <TabsTrigger
            value="audit"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-accent data-[state=active]:bg-transparent py-3"
          >
            Auditoria EHR
          </TabsTrigger>
        </TabsList>

        <TabsContent value="anamnesis" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Dados Biopsicossociais</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                  Contexto Familiar
                </h4>
                <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md">
                  {patient.familyContext || 'Não informado.'}
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                  Histórico Médico
                </h4>
                <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md">
                  {patient.medicalHistory || 'Não informado.'}
                </p>
              </div>
              <div className="md:col-span-2">
                <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                  Sintomatologia Principal
                </h4>
                <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md min-h-[60px]">
                  {patient.symptoms || patient.neuroHistory || 'Sem queixas registradas.'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domínios Funcionais (Histórico)</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                    Desenvolvimento
                  </h4>
                  <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                    {patient.developmentHistory || 'Normativo.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                    Cognição
                  </h4>
                  <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                    {patient.cognition || 'Preservado em vias gerais.'}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                    Regulação Emocional
                  </h4>
                  <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                    {patient.emotionalRegulation || 'Sem alterações severas relatadas na admissão.'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                    Comportamento Social & Adaptativo
                  </h4>
                  <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                    {patient.socialBehavior ||
                      patient.adaptiveFunctioning ||
                      'Adequado ao contexto.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution" className="animate-fade-in space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Evolução Longitudinal de Funções Psíquicas</CardTitle>
              <CardDescription>
                Acompanhamento quantitativo dos processos cognitivos e afetivos ao longo do tempo.
              </CardDescription>
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
                    <h4 className="font-medium text-sm">
                      Laudo Multidimensional Automatizado v{item}
                    </h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> 1{item}/10/2023 • Assinado digitalmente
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/report/r${item}`}>Visualizar / Exportar</Link>
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="audit" className="animate-fade-in space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trilha de Auditoria (Timestamp)</CardTitle>
              <CardDescription>
                Histórico de edições e acessos, em conformidade com políticas EHR e LGPD.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l ml-4 space-y-6">
                {(patient.auditLogs || []).map((log: any, idx: number) => (
                  <div key={log.id || idx} className="pl-6 relative">
                    <div className="absolute w-3 h-3 bg-accent rounded-full -left-[6.5px] top-1.5 ring-4 ring-background" />
                    <h4 className="font-medium text-sm text-primary">{log.action}</h4>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {new Date(log.date).toLocaleString()}
                      </span>
                      <span>
                        Autor: <strong className="font-medium">{log.user}</strong>
                      </span>
                    </div>
                  </div>
                ))}
                {(!patient.auditLogs || patient.auditLogs.length === 0) && (
                  <p className="text-sm text-muted-foreground ml-4">
                    Nenhum registro de auditoria encontrado.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
