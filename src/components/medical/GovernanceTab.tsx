import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Scale, ShieldAlert, FileArchive, ArrowRight, ShieldCheck } from 'lucide-react'

export function GovernanceTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg flex items-start gap-3 shadow-sm">
        <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" />
        <div>
          <h3 className="font-semibold text-blue-900">Central de Governança Jurídica Integrada</h3>
          <p className="text-sm mt-1 text-blue-800/80 leading-relaxed">
            O ecossistema médico-legal conecta diretamente os seus laudos validados aos portais de
            defesa e auditoria externa, garantindo conformidade, proteção jurídica e mitigação de
            riscos na prática clínica.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileArchive className="w-5 h-5 text-primary" /> Central de Relatórios
            </CardTitle>
            <CardDescription>Emissão de laudos estruturados.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Gerencie e exporte todos os documentos finais, laudos dimensionais e atestados com
              certificação digital.
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

        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Scale className="w-5 h-5 text-indigo-500" /> Portal do Defensor
            </CardTitle>
            <CardDescription>Gestão de defesas e liminares.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Compartilhe evidências neurofuncionais e biogramas consolidados para amparo jurídico
              direto (advogados e MP).
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:text-indigo-700 hover:border-indigo-300"
            >
              <Link to="/defensor-portal">
                Acessar Portal <ArrowRight className="w-4 h-4 ml-2" />
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
              Geração de links criptografados com acesso temporário e restrito a laudos sensíveis
              para planos de saúde.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full hover:text-amber-700 hover:border-amber-300"
            >
              <Link to="/auditor-portal">
                Acessar Portal <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
