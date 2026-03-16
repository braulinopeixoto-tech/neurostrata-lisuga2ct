import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Compass, FileSignature, Settings2, ArrowRight } from 'lucide-react'

export function AutomationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" /> Neuronavegação Guiada
            </CardTitle>
            <CardDescription>Ferramenta para relatórios verificados e validados.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Acesse a plataforma de meta-análise automatizada para decodificação funcional e
              cruzamento de biomarcadores (integração Neurosynth).
            </p>
            <Button asChild className="w-full">
              <Link to="/neuronavigation">
                Iniciar Neuronavegação <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-accent" /> Personalização Diagnóstica
            </CardTitle>
            <CardDescription>
              Configure os blocos visuais e layout dos laudos médicos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center justify-between gap-4">
              <Label
                htmlFor="b1"
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                Incluir Histórico RDoC detalhado
              </Label>
              <Switch id="b1" defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label
                htmlFor="b2"
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                Exibir gráficos de conectividade (Biograma)
              </Label>
              <Switch id="b2" defaultChecked />
            </div>
            <div className="flex items-center justify-between gap-4">
              <Label
                htmlFor="b3"
                className="text-sm text-foreground leading-relaxed cursor-pointer"
              >
                Incluir referências científicas automáticas
              </Label>
              <Switch id="b3" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-sm border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSignature className="w-5 h-5 text-emerald-600" /> Assinatura Digital & Automação
              de Prontuário
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-2 text-sm text-muted-foreground">
              <p>
                A infraestrutura suporta integração direta com o padrão{' '}
                <strong>ICP-Brasil Nível A3</strong> para emissão de prescrições e laudos com
                validade jurídica.
              </p>
              <p>
                Ative a assinatura automática para encerramento de relatórios em lote, garantindo
                conformidade (LGPD) e segurança em todo o fluxo de trabalho da sua equipe.
              </p>
            </div>
            <div className="w-full md:w-auto">
              <Button
                variant="outline"
                className="w-full md:w-auto text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100"
              >
                <FileSignature className="w-4 h-4 mr-2" /> Configurar Certificado A3
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
