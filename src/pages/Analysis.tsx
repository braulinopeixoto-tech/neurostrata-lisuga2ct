import { Link } from 'react-router-dom'
import { Activity, Brain, AlertTriangle, FileEdit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MentalRadarChart } from '@/components/charts/MentalRadarChart'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'

export default function Analysis() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -top-10 opacity-10">
          <Brain className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight">Análise Multidimensional Concluída</h1>
          <p className="text-primary-foreground/80 mt-1">
            Motor NSI processou RDoC, Funções Psíquicas, Big Five e qEEG.
          </p>
        </div>
        <Button variant="secondary" className="relative z-10 shadow-sm font-semibold" asChild>
          <Link to="/report/new">
            <FileEdit className="w-4 h-4 mr-2" /> Gerar Laudo Clínico
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1 flex flex-col items-center justify-center p-6 text-center border-t-4 border-t-accent shadow-elevation bg-card">
          <h3 className="text-lg font-bold text-primary mb-4">NeuroStrata Index</h3>
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-44 h-44 -rotate-90 transform">
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
              <span className="text-5xl font-black text-primary">70</span>
              <span className="text-xs text-muted-foreground mt-1 font-mono">/ 100</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 leading-tight">
            Métrica agregada de integridade neurofuncional.
          </p>
        </Card>

        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Radar de Funcionamento Mental</CardTitle>
            <CardDescription>Distribuição dos construtos em 4 eixos principais.</CardDescription>
          </CardHeader>
          <CardContent>
            <MentalRadarChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 shadow-sm border-t-4 border-t-blue-500">
          <CardHeader className="pb-0">
            <CardTitle className="text-base text-center">Topografia qEEG</CardTitle>
          </CardHeader>
          <CardContent>
            <BrainMapVisualizer />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-l-4 border-l-violet-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-violet-700">
            <Activity className="w-5 h-5" /> Insights Diagnósticos e Biomarcadores
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm">Déficit Executivo-Emocional</h4>
              <Badge variant="outline" className="text-xs border-destructive text-destructive">
                Alerta RDoC
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O domínio de <strong>Valência Negativa</strong> apresenta hiperativação funcional. Há
              correlação direta com a assimetria na faixa Theta observada na região Fp1 (qEEG).
              Sugere esforço compensatório no controle inibitório.
            </p>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg border">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-sm">Perfil Big Five Correlacionado</h4>
              <Badge variant="secondary" className="text-xs">
                Observação
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              O traço de <strong>Neuroticismo</strong> elevado cruza clinicamente com os achados de
              regulação emocional e com a queixa relatada na anamnese. Impacto funcional moderado na
              adaptação interpessoal.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
