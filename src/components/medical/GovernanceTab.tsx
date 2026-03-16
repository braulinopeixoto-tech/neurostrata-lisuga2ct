import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Scale, ShieldAlert, FileArchive, ArrowRight, Landmark } from 'lucide-react'

export function GovernanceTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-indigo-50 border border-indigo-200 text-indigo-800 p-5 rounded-lg flex items-start gap-4 shadow-sm">
        <Landmark className="w-6 h-6 mt-0.5 shrink-0" />
        <div>
          <h2 className="text-xl font-bold text-indigo-900 tracking-tight">
            Área de Governança Jurídica
          </h2>
          <p className="text-sm mt-1.5 text-indigo-800/80 leading-relaxed max-w-3xl">
            O ecossistema médico-legal conecta diretamente os seus laudos validados e documentação
            estruturada aos portais de defesa e auditoria externa, garantindo conformidade (LGPD),
            proteção jurídica do ato médico e mitigação de riscos na prática clínica.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-indigo-600">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="w-5 h-5 text-indigo-600" /> Portal do Defensor
            </CardTitle>
            <CardDescription>Gestão de defesas e amparo legal.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Compartilhe evidências neurofuncionais, laudos e o Biograma Longitudinal certificado
              diretamente com advogados ou Ministério Público para instrução de processos.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:text-indigo-700 hover:border-indigo-300"
            >
              <Link to="/defensor-portal">
                Acessar Portal do Defensor <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ShieldAlert className="w-5 h-5 text-amber-500" /> Portal do Auditor
            </CardTitle>
            <CardDescription>Auditoria clínica e operadoras.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Geração de links criptografados com acesso temporário e leitura restrita de laudos
              sensíveis para verificações e auditorias de planos de saúde.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:text-amber-700 hover:border-amber-300"
            >
              <Link to="/auditor-portal">
                Acessar Portal do Auditor <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileArchive className="w-5 h-5 text-primary" /> Central de Relatórios
            </CardTitle>
            <CardDescription>Repositório de laudos estruturados.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Gerencie, visualize e exporte todos os documentos finais, laudos dimensionais e
              atestados que receberam Assinatura Digital (ICP-Brasil).
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:text-primary hover:border-primary/50"
            >
              <Link to="/report-center">
                Acessar Central <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
