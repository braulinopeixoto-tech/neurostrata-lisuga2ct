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
            <PenLine className="w-5 h-5 text-primary" /> Quick Report Tool
          </CardTitle>
          <CardDescription>
            Registre anotações rápidas durante a consulta. O rascunho é sincronizado globalmente
            para as suas avaliações.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Digite suas observações clínicas rápidas..."
            className="min-h-[200px]"
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
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-accent" /> Farmacopeia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Base de dados pesquisável de medicamentos, suplementos e interações farmacológicas.
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
              <div className="flex flex-col items-center p-2 bg-muted/30 rounded border text-xs text-center font-medium">
                <Zap className="w-4 h-4 mb-1 text-amber-500" /> Neuromodulação
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/30 rounded border text-xs text-center font-medium">
                <Syringe className="w-4 h-4 mb-1 text-emerald-500" /> Injetáveis
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/30 rounded border text-xs text-center font-medium">
                <Beaker className="w-4 h-4 mb-1 text-purple-500" /> Manipulação
              </div>
              <div className="flex flex-col items-center p-2 bg-muted/30 rounded border text-xs text-center font-medium">
                <Pill className="w-4 h-4 mb-1 text-blue-500" /> Medicações
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
