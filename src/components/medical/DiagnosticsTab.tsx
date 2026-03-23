import { FlaskConical, Beaker, Brain, Target, ChevronRight, ActivitySquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function DiagnosticsTab() {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <Card className="border-t-4 border-t-purple-600 shadow-sm bg-gradient-to-br from-purple-50 to-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <Badge className="bg-purple-100 text-purple-800 border-none font-bold uppercase tracking-widest text-[10px]">
              Fluxo V2 — Camada 2
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900">
              Módulo de Biomarcadores (Camada 2)
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              O fluxo de exames e solicitação de diagnósticos físicos/laboratoriais agora faz parte
              da <strong>Jornada Clínica (Camada 2)</strong>. É lá que você insere os resultados
              para que o <strong>Núcleo Diagnóstico</strong> processe as correlações
              automaticamente.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-md"
          >
            <Link to="/clinical-journey">
              Acessar Camada de Biomarcadores <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500 group hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Beaker className="w-5 h-5 text-blue-500" /> Exames Laboratoriais
            </CardTitle>
            <CardDescription>Painel metabólico, inflamatório e hormonal.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Os dados coletados aqui influenciam o Score de Risco Metabólico no Núcleo Diagnóstico,
              permitindo ajustes no protocolo nutricional e farmacológico.
            </p>
            <Button
              variant="outline"
              className="w-full group-hover:border-blue-300 group-hover:text-blue-700 transition-colors"
              asChild
            >
              <Link to="/gestao-metabolica">Gerenciar Via Gestão Metabólica</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-purple-500 group hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" /> Neuroimagem e Eletrofisiologia
            </CardTitle>
            <CardDescription>qEEG, sLORETA e Ressonância Funcional.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Esses exames são mapeados na Camada 2 e projetados visualmente através do componente
              de topografia para justificar a Neuromodulação.
            </p>
            <Button
              variant="outline"
              className="w-full group-hover:border-purple-300 group-hover:text-purple-700 transition-colors"
              asChild
            >
              <Link to="/neuronavigation">Cruzar com Neuronavegação</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
