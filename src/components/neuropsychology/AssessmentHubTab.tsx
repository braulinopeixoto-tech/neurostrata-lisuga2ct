import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ActivitySquare, PlayCircle, ClipboardList } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function AssessmentHubTab() {
  const { patients } = useAppStore()

  // Show a quick list of recent patients and their assessments status
  const recentPatients = patients.slice(0, 4)

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="bg-gradient-to-r from-primary/10 to-accent/5 border-primary/20 shadow-sm">
        <CardContent className="p-8 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
            <ActivitySquare className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-foreground">
            Iniciar Nova Avaliação Multidimensional
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl">
            Acesse o ambiente especializado para inserir dados estruturados de RDoC, Perfil Big Five
            e realizar o mapeamento das 18 Funções Psíquicas.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-base shadow-md">
            <Link to="/assessment">
              <PlayCircle className="w-5 h-5 mr-2" /> Abrir Workspace de Avaliação
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-muted-foreground" /> Avaliações Recentes (Hub)
          </CardTitle>
          <CardDescription>
            Pacientes com histórico recente de mapeamento psicométrico.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentPatients.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between p-4 border rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div>
                  <h4 className="font-bold text-foreground">{p.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Última avaliação: {new Date(p.lastAssessment).toLocaleDateString()}
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-emerald-50 text-emerald-700 border border-emerald-200"
                >
                  Score: {p.score}/100
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
