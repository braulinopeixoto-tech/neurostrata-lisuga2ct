import { Link } from 'react-router-dom'
import { Activity, Brain, AlertTriangle, FileEdit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function Analysis() {
  const dimensions = [
    { name: 'Cognitivo', val: 78, color: 'bg-blue-500' },
    { name: 'Emocional', val: 42, color: 'bg-orange-500', alert: true },
    { name: 'Regulação', val: 55, color: 'bg-yellow-500' },
    { name: 'Social', val: 82, color: 'bg-green-500' },
    { name: 'Excitação', val: 68, color: 'bg-purple-500' },
  ]

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Brain className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">Análise Concluída</h1>
          <p className="text-primary-foreground/80 mt-1">
            Paciente: Ana Silva Oliveira • Data: Hoje
          </p>
        </div>
        <Button variant="secondary" className="relative z-10 shadow-sm" asChild>
          <Link to="/report/new">
            <FileEdit className="w-4 h-4 mr-2" /> Gerar Laudo
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center p-6 text-center border-t-4 border-t-accent shadow-elevation">
          <h3 className="text-lg font-medium text-muted-foreground mb-4">Índice NeuroStrata</h3>
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90 transform">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--accent))"
                strokeWidth="8"
                strokeDasharray="283"
                strokeDashoffset="84"
                strokeLinecap="round"
                className="animate-pulse-glow"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-bold text-primary">70</span>
              <span className="text-xs text-muted-foreground mt-1">/ 100</span>
            </div>
          </div>
          <Badge variant="outline" className="mt-6 bg-accent/10 text-accent border-accent/20">
            Perfil Estável com Ressalvas
          </Badge>
        </Card>

        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Mapa Dimensional</CardTitle>
            <CardDescription>
              Perfil transdiagnóstico baseado no RDoC e Funções Psíquicas.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {dimensions.map((dim) => (
              <div key={dim.name} className="space-y-2 group">
                <div className="flex justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    {dim.name}
                    {dim.alert && (
                      <AlertTriangle className="w-3 h-3 text-destructive animate-pulse" />
                    )}
                  </span>
                  <span className="font-mono text-muted-foreground">{dim.val}%</span>
                </div>
                <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full ${dim.color} transition-all duration-1000 ease-out`}
                    style={{ width: `${dim.val}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-l-4 border-l-violet-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700">
            <Activity className="w-5 h-5" /> Insights Correlacionais Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg border">
            <h4 className="font-semibold text-sm mb-1">Déficit Executivo-Emocional Associado</h4>
            <p className="text-sm text-muted-foreground">
              A discrepância entre o Domínio Cognitivo (78) e a Regulação Emocional (42) sugere um
              esforço compensatório elevado (Allostatic Load). A função de Controle Inibitório está
              sendo diretamente impactada pelo afeto negativo.
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border">
            <h4 className="font-semibold text-sm mb-1">Recomendação de Protocolo</h4>
            <p className="text-sm text-muted-foreground">
              Com base na baixa Valência Positiva e alta Excitação, sugere-se a avaliação de
              protocolos de neuromodulação voltados para o Córtex Pré-Frontal Dorsolateral (DLPFC)
              esquerdo (ex: tDCS Anódico).
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
