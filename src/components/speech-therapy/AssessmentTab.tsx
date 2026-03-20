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
import { Badge } from '@/components/ui/badge'
import { ClipboardCheck, Save, ShieldCheck } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'

const ASSESSMENT_AREAS = [
  'Linguagem Expressiva',
  'Linguagem Receptiva',
  'Fluência Verbal',
  'Nomeação',
  'Compreensão Auditiva',
  'Leitura e Escrita',
  'Processamento Auditivo Central',
]

export function AssessmentTab({ patientId }: { patientId: string }) {
  const [results, setResults] = useState<Record<string, string>>({})
  const { logAction } = useTeamFlowStore()

  const handleSave = () => {
    if (Object.keys(results).length === 0) {
      toast({
        title: 'Nenhum dado inserido',
        description: 'Selecione o nível de pelo menos uma área antes de salvar.',
        variant: 'destructive',
      })
      return
    }

    logAction(
      'speech_therapy_assessment',
      patientId,
      'SUBMIT_ASSESSMENT',
      null,
      results,
      'Fonoaudiologia',
    )

    toast({
      title: 'Avaliação Salva e Auditada',
      description: 'Protocolos de avaliação registrados na Trust Layer™ com sucesso.',
      action: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    })
  }

  const handleSelect = (area: string, value: string) => {
    setResults((prev) => ({ ...prev, [area]: value }))
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-emerald-500">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" /> Biblioteca de Avaliação
              </CardTitle>
              <CardDescription className="mt-1">
                Registre os resultados das baterias de testes padronizados. Esses dados comporão os
                Blocos do NeuroModel.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <ShieldCheck className="w-3 h-3 mr-1" /> Trust Layer Enabled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {ASSESSMENT_AREAS.map((area) => (
              <div
                key={area}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-slate-50 gap-3 hover:border-blue-200 transition-colors"
              >
                <span className="font-medium text-sm text-slate-800">{area}</span>
                <Select value={results[area] || ''} onValueChange={(v) => handleSelect(area, v)}>
                  <SelectTrigger className="w-full sm:w-[180px] bg-white h-8 text-xs">
                    <SelectValue placeholder="Selecione o nível..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="adequado">Adequado / Preservado</SelectItem>
                    <SelectItem value="leve">Alteração Leve</SelectItem>
                    <SelectItem value="moderado">Alteração Moderada</SelectItem>
                    <SelectItem value="grave">Alteração Grave</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center border-t pt-4">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Assinatura criptográfica
              aplicada ao salvar.
            </p>
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Gravar Resultados no Ledger
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
