import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'

export function LayerTriage({ caseId }: { caseId: string }) {
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
        <h2 className="text-2xl font-bold text-slate-800">Camada 1: Triagem e Admissão</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Blocos 1 a 4 do Protocolo NeuroStrata v1.0
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm border-t-4 border-t-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bloco 2: Motivo da Avaliação</CardTitle>
            <CardDescription>
              Descreva a demanda principal (Ex: investigação de neurodivergência).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[100px]"
              value={cw.blocks.b2_reason || ''}
              onChange={(e) => handleChange('b2_reason', e.target.value)}
              placeholder="Descreva o motivo..."
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">
              Bloco 3: Histórico Clínico e Desenvolvimental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[120px]"
              value={cw.blocks.b3_history || ''}
              onChange={(e) => handleChange('b3_history', e.target.value)}
              placeholder="Histórico gestacional, neonatal, psiquiátrico, eventos traumáticos..."
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Bloco 4: Perfil Comportamental Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[120px]"
              value={cw.blocks.b4_behavior || ''}
              onChange={(e) => handleChange('b4_behavior', e.target.value)}
              placeholder="Comportamento social, regulação emocional, estereotipias..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
