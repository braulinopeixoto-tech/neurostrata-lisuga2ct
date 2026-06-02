import {
  FlaskConical,
  Users,
  Activity,
  FileText,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function ClinicalPharmacyArea() {
  const recentInterventions = [
    {
      id: 1,
      patient: 'João Silva',
      type: 'Ajuste de Dose',
      status: 'pendente',
      date: 'Hoje, 09:30',
      medication: 'Metilfenidato 10mg',
    },
    {
      id: 2,
      patient: 'Maria Oliveira',
      type: 'Nova Fórmula',
      status: 'concluido',
      date: 'Ontem, 15:45',
      medication: 'Fórmula Mitocondrial Base',
    },
    {
      id: 3,
      patient: 'Carlos Santos',
      type: 'Conciliação',
      status: 'alerta',
      date: 'Ontem, 11:20',
      medication: 'Interação Detectada',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in-up pb-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <FlaskConical className="w-8 h-8 text-emerald-600" />
            Farmácia Clínica
          </h1>
          <p className="text-muted-foreground mt-1">
            Gestão de intervenções farmacológicas, conciliação medicamentosa e acompanhamento
            terapêutico.
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nova Intervenção
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pacientes em Acompanhamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">+12 esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Fórmulas Prescritas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85</div>
            <p className="text-xs text-muted-foreground mt-1">Neste mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Alertas de Interação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">Requerem atenção</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Adesão Terapêutica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">82%</div>
            <p className="text-xs text-muted-foreground mt-1">Média geral</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="patients">Meus Pacientes</TabsTrigger>
          <TabsTrigger value="formulas">Fórmulas Magistrais</TabsTrigger>
          <TabsTrigger value="alerts">Farmacovigilância</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Intervenções Recentes</CardTitle>
                <CardDescription>
                  Últimas atualizações no prontuário farmacoterapêutico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentInterventions.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {item.patient
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </div>
                        <div>
                          <p className="font-medium">{item.patient}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{item.type}</span>
                            <span>•</span>
                            <span>{item.medication}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-muted-foreground">{item.date}</div>
                        {item.status === 'pendente' && (
                          <Badge
                            variant="outline"
                            className="text-blue-600 border-blue-200 bg-blue-50"
                          >
                            <Clock className="w-3 h-3 mr-1" /> Validação Médica
                          </Badge>
                        )}
                        {item.status === 'concluido' && (
                          <Badge
                            variant="outline"
                            className="text-emerald-600 border-emerald-200 bg-emerald-50"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" /> Efetivado
                          </Badge>
                        )}
                        {item.status === 'alerta' && (
                          <Badge
                            variant="outline"
                            className="text-red-600 border-red-200 bg-red-50"
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" /> Revisão Urgente
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <FileText className="w-4 h-4 mr-3 text-blue-500" />
                  <div className="text-left">
                    <div className="font-medium">Conciliação Medicamentosa</div>
                    <div className="text-xs text-muted-foreground">Iniciar novo processo</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <Search className="w-4 h-4 mr-3 text-purple-500" />
                  <div className="text-left">
                    <div className="font-medium">Busca de Interações</div>
                    <div className="text-xs text-muted-foreground">Verificar compatibilidade</div>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start h-auto py-3">
                  <Activity className="w-4 h-4 mr-3 text-emerald-500" />
                  <div className="text-left">
                    <div className="font-medium">Correlação QEEG</div>
                    <div className="text-xs text-muted-foreground">
                      Analisar impacto neurofisiológico
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Meus Pacientes</CardTitle>
              <CardDescription>
                Pacientes com acompanhamento farmacoterapêutico ativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                <Input placeholder="Buscar paciente..." className="max-w-sm" />
                <Button variant="secondary">Buscar</Button>
              </div>
              <div className="text-center py-10 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p>Selecione um paciente para ver o histórico detalhado.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formulas" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Biblioteca de Fórmulas</CardTitle>
              <CardDescription>
                Gerencie suas formulações magistrais e racionais terapêuticos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <FlaskConical className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p>
                  Acesse o hub integrado em "Gestão Metabólica" para gerenciar as formulações
                  completas.
                </p>
                <Button variant="outline" className="mt-4">
                  Ir para Gestão Metabólica
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Alertas de Farmacovigilância</CardTitle>
              <CardDescription>
                Monitoramento ativo de interações e reações adversas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10 text-muted-foreground">
                <AlertTriangle className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
                <p>
                  Nenhum alerta crítico no momento. O sistema continua monitorando as interações em
                  tempo real.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
