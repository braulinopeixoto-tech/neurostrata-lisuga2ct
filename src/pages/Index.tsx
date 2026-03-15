import { Users, Activity, FileText, Zap, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PopulationChart } from '@/components/charts/PopulationChart'
import useAppStore from '@/stores/useAppStore'

export default function Index() {
  const { patients } = useAppStore()
  const recentPatients = patients.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Visão geral da sua prática neurofuncional.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button asChild className="w-full sm:w-auto">
            <Link to="/assessment">
              <Plus className="w-4 h-4 mr-2" /> Nova Avaliação
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'Total de Pacientes', value: '1,284', icon: Users, trend: '+12% este mês' },
          {
            title: 'Avaliações no Mês',
            value: '86',
            icon: Activity,
            trend: '+5% que o mês passado',
          },
          {
            title: 'Relatórios Pendentes',
            value: '12',
            icon: FileText,
            trend: 'Requer atenção',
            alert: true,
          },
          { title: 'Uso de Protocolos', value: '64%', icon: Zap, trend: 'Terapia REAC principal' },
        ].map((stat, i) => (
          <Card key={i} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-y-0 pb-2">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <stat.icon
                  className={`h-4 w-4 ${stat.alert ? 'text-destructive' : 'text-accent'}`}
                />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs mt-1 ${stat.alert ? 'text-destructive font-medium' : 'text-muted-foreground'}`}
              >
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Índice Populacional</CardTitle>
            <CardDescription>
              Comparação média dos seus pacientes versus base global do NeuroStrata.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PopulationChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimos pacientes avaliados.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-semibold text-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{patient.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{patient.lastAssessment}</p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-primary">{patient.score} pts</div>
                </div>
              ))}
            </div>
            <Button variant="link" asChild className="w-full mt-4 text-accent">
              <Link to="/patients">Ver todos os pacientes</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
