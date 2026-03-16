import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  FlaskConical,
  BookOpen,
  PenLine,
  ArrowRight,
  Zap,
  Syringe,
  Pill,
  Beaker,
  Brain,
} from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export function ClinicalHubTab() {
  const { quickReportDraft, setQuickReportDraft } = useAppStore()

  const handleSaveReport = () => {
    toast({
      title: 'Rascunho Salvo',
      description: 'As observações foram sincronizadas globalmente.',
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
      <Card className="lg:col-span-2 shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PenLine className="w-5 h-5 text-primary" /> Quick Report
          </CardTitle>
          <CardDescription>
            Geração rápida de resumos clínicos. O rascunho é sincronizado globalmente para as suas
            avaliações e laudos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Digite suas observações clínicas rápidas..."
            className="min-h-[250px]"
            value={quickReportDraft}
            onChange={(e) => setQuickReportDraft(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setQuickReportDraft('')}>
              Limpar
            </Button>
            <Button onClick={handleSaveReport}>Salvar no Prontuário</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Brain className="w-5 h-5 text-emerald-500" /> Área de Nova Avaliação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Inicie um workflow estruturado para avaliação neurofuncional de novos pacientes.
            </p>
            <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link to="/assessment">
                Iniciar Avaliação <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-accent" /> Farmacopeia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Referência pesquisável de medicamentos, suplementos e interações farmacológicas.
            </p>
            <Button asChild className="w-full" variant="outline">
              <Link to="/pharmacopeia">
                Acessar Farmacopeia <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-500" /> Biblioteca de Protocolos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-xs text-center font-medium h-16">
                <Pill className="w-4 h-4 mb-1 text-blue-500" /> Medicamentosos
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-[11px] leading-tight text-center font-medium h-16">
                <Zap className="w-4 h-4 mb-1 text-amber-500" /> Protocolos de Neuromodulação
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-xs text-center font-medium h-16">
                <Syringe className="w-4 h-4 mb-1 text-emerald-500" /> Protocolos Injetáveis
              </div>
              <div className="flex flex-col items-center justify-center p-2 bg-muted/30 rounded border text-[11px] leading-tight text-center font-medium h-16">
                <Beaker className="w-4 h-4 mb-1 text-purple-500" /> Protocolos de Manipulação
              </div>
            </div>
            <Button asChild className="w-full" variant="outline">
              <Link to="/protocols">
                Ver Protocolos <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
