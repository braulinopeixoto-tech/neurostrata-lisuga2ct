import { Cpu, FileText, Bot, CheckCircle2, ChevronRight, FileArchive } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function AutomationTab() {
  return (
    <div className="space-y-6 animate-fade-in mt-4">
      <Card className="border-t-4 border-t-slate-800 shadow-sm bg-gradient-to-br from-slate-100 to-white">
        <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 space-y-3">
            <Badge className="bg-slate-200 text-slate-800 border-none font-bold uppercase tracking-widest text-[10px]">
              Automação Documental V2
            </Badge>
            <h2 className="text-2xl font-bold text-slate-900">Geração de Laudos via Núcleo</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
              A documentação agora é uma consequência automática da{' '}
              <strong>convergência diagnóstica</strong>. Após a avaliação na Camada 3 (Núcleo), o
              sistema gera laudos pré-formatados com as hipóteses validadas.
            </p>
          </div>
          <Button
            asChild
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-md"
          >
            <Link to="/report-center">
              Ir para Central de Relatórios <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" /> Relatórios Estratificados
            </CardTitle>
            <CardDescription>Documentos baseados nas métricas NeuroStrata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Os relatórios (Judicial, Plano de Saúde, Acompanhamento) utilizam os scores
              processados no Núcleo Diagnóstico e são protegidos pela Trust Layer™.
            </p>
            <div className="flex gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 p-2 rounded border border-emerald-100">
              <CheckCircle2 className="w-4 h-4" /> Pronto para assinatura ICP-Brasil
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-purple-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-500" /> Assistente IA (Quick Report)
            </CardTitle>
            <CardDescription>Resumo narrativo automático de consultas.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              A IA transcreve e estrutura os relatos não estruturados para integrá-los à Camada 1 da
              Jornada Clínica.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/report/new">Acessar Editor de Laudos</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
