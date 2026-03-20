import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { Activity, BrainCircuit } from 'lucide-react'

export function LayerBiomarkers({ caseId }: { caseId: string }) {
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
        <h2 className="text-2xl font-bold text-slate-800">Camada 3: Neurofisiologia</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Bloco 9. Integração de dados de Mapeamento Cerebral e Conectividade.
        </p>
      </div>

      <Card className="shadow-sm border-t-4 border-t-cyan-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-600" /> Bloco 9: Análise Neurofisiológica
          </CardTitle>
          <CardDescription>
            Entrada de dados qEEG, LORETA, ERP e Conectividade (Rhythms of the Brain).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-cyan-50/50 border border-cyan-100 p-4 rounded-lg mb-6 flex items-start gap-4">
            <BrainCircuit className="w-6 h-6 text-cyan-500 shrink-0 mt-1" />
            <div>
              <p className="text-sm text-cyan-900 font-medium">Integração de Equipamentos</p>
              <p className="text-xs text-cyan-800/70 mt-1">
                Os dados brutos de mapeamento podem ser processados na aba de Neuronavegação Guiada
                e sumarizados neste bloco para compor a assinatura funcional do paciente.
              </p>
            </div>
          </div>

          <Textarea
            className="min-h-[250px]"
            value={cw.blocks.b9_neurophysio || ''}
            onChange={(e) => handleChange('b9_neurophysio', e.target.value)}
            placeholder="Parâmetros analisados: Assimetria Alpha, excesso Theta frontal, coerência reduzida na DMN..."
          />
        </CardContent>
      </Card>
    </div>
  )
}
