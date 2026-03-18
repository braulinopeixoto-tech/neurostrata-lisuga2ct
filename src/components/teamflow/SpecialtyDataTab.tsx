import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Save, Brain, CheckCircle2, Link as LinkIcon } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { toast } from '@/components/ui/use-toast'

export function SpecialtyDataTab({ caseId }: { caseId: string }) {
  const { specialtyReports, saveSpecialtyReport } = useTeamFlowStore()
  const [specialty, setSpecialty] = useState('Neuropsicologia')

  // Minimal structured form state
  const [checklists, setChecklists] = useState<Record<string, boolean>>({})
  const [scaleScore, setScaleScore] = useState('')
  const [evidenceLink, setEvidenceLink] = useState('')

  const handleToggle = (key: string) => setChecklists((prev) => ({ ...prev, [key]: !prev[key] }))

  const handleSave = () => {
    saveSpecialtyReport(
      {
        id: `SR-${Date.now()}`,
        case_id: caseId,
        specialty,
        author_id: 'TM-CURRENT',
        status: 'Submitted',
        updated_at: new Date().toISOString(),
        structured_data: {
          checklists,
          scales: { 'Nível de Severidade (1-10)': parseInt(scaleScore) || 0 },
          evidence_links: evidenceLink ? [evidenceLink] : [],
        },
      },
      'Membro da Equipe',
    )

    toast({
      title: 'Dados Estruturados Salvos',
      description: `A avaliação de ${specialty} foi consolidada no caso.`,
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  const existingReport = specialtyReports.find(
    (r) => r.case_id === caseId && r.specialty === specialty,
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
      <Card className="md:col-span-1 shadow-sm h-fit">
        <CardHeader>
          <CardTitle className="text-base">Especialidade</CardTitle>
          <CardDescription>Selecione o módulo de coleta.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {['Neuropsicologia', 'Nutrição Funcional', 'Fonoaudiologia', 'Psicopedagogia'].map(
            (spec) => (
              <Button
                key={spec}
                variant={specialty === spec ? 'secondary' : 'ghost'}
                className="justify-start w-full"
                onClick={() => setSpecialty(spec)}
              >
                {spec}
              </Button>
            ),
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-3 shadow-sm border-t-4 border-t-indigo-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-500" /> Coleta Estruturada: {specialty}
          </CardTitle>
          <CardDescription>
            Formulário travado contra textos livres longos. Força a categorização de achados para
            permitir cruzamento via IA.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {existingReport && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4" /> Dados já submetidos para esta especialidade. Você
              pode atualizá-los.
            </div>
          )}

          <div className="space-y-4">
            <h4 className="font-semibold text-sm border-b pb-2">
              Marcadores Clínicos (Checklist Mapeado)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Déficit de Memória Operacional',
                'Impulsividade Motora',
                'Desregulação Emocional Severa',
                'Fadiga Atencional',
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center space-x-2 bg-slate-50 p-3 rounded border"
                >
                  <Checkbox
                    id={item}
                    checked={!!checklists[item]}
                    onCheckedChange={() => handleToggle(item)}
                  />
                  <Label
                    htmlFor={item}
                    className="text-sm font-normal cursor-pointer leading-tight"
                  >
                    {item}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm border-b pb-2">Escalas Quantitativas</h4>
            <div className="max-w-xs space-y-2">
              <Label>Nível de Severidade / Prejuízo (1 a 10)</Label>
              <Input
                type="number"
                min="1"
                max="10"
                value={scaleScore}
                onChange={(e) => setScaleScore(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-sm border-b pb-2 flex items-center gap-2">
              <LinkIcon className="w-4 h-4" /> Anexação Obrigatória de Evidência
            </h4>
            <div className="space-y-2">
              <Label>Link do Laudo Bruto (PDF/Drive) ou Arquivo do Paciente</Label>
              <Input
                placeholder="https://..."
                value={evidenceLink}
                onChange={(e) => setEvidenceLink(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                O sistema exige a fonte primária para auditoria na Trust Layer.
              </p>
            </div>
          </div>

          <Button
            onClick={handleSave}
            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
          >
            <Save className="w-4 h-4 mr-2" /> Salvar Coleta Estruturada
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
