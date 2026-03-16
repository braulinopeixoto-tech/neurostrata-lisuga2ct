import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Brain, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function EvolutionTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Evolução Longitudinal
          </CardTitle>
          <CardDescription>
            Acompanhe o progresso das métricas do paciente ao longo das intervenções.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground border-t border-dashed">
          <Brain className="w-12 h-12 mb-4 opacity-20" />
          <p className="mb-6 max-w-md">
            O acompanhamento longitudinal detalhado, com gráficos e comparativos, está disponível no
            módulo dedicado de Evolução e Performance.
          </p>
          <Button asChild variant="outline">
            <Link to="/performance-timeline">
              Acessar Painel de Evolução <TrendingUp className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
