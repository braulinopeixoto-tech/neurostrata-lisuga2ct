import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { Target } from 'lucide-react'

export function LayerPlanning({ caseId }: { caseId: string }) {
  const { caseWorkspaces, updateCaseBlock } = useTeamFlowStore()
  const { currentUser } = useAppStore()

  const cw = caseWorkspaces.find((c) => c.id === caseId)
  if (!cw) return null

  const handleChange = (block: keyof typeof cw.blocks, value: string) => {
    updateCaseBlock(caseId, block, value, currentUser.fullName)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Camada 5: Planejamento Terapêutico</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Bloco 12. Direcionamento das intervenções com base na arquitetura diagnosticada.
        </p>
      </div>

      <Card className="shadow-sm border-t-4 border-t-emerald-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" /> Bloco 12: Plano de Intervenção
          </CardTitle>
          <CardDescription>
            Estratégia clínica estruturada e sequenciada (Neuromodulação, Psicoterapia,
            Farmacologia, etc).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[300px]"
            value={cw.blocks.b12_intervention || ''}
            onChange={(e) => handleChange('b12_intervention', e.target.value)}
            placeholder="Descreva as intervenções indicadas. Ex: 1. Neuromodulação (tDCS anódico em F3)... 2. TCC focada em regulação emocional..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
