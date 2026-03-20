import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { Network, Bot, Sparkles, CheckCircle2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function LayerConvergence({ caseId }: { caseId: string }) {
  const { caseWorkspaces, updateCaseBlock } = useTeamFlowStore()
  const { currentUser } = useAppStore()

  const cw = caseWorkspaces.find((c) => c.id === caseId)
  if (!cw) return null

  const handleChange = (block: keyof typeof cw.blocks, value: string) => {
    updateCaseBlock(caseId, block, value, currentUser.fullName)
  }

  const handleSimulateAI = () => {
    const aiText = `A IA analisou as camadas 1, 2 e 3 e identificou Forte Correlação (Consistency Score: 88%) entre:\n- Domínio RDoC: Sistemas Cognitivos (Prejuízo na Memória de Trabalho)\n- Neurofisiologia: Excesso Theta Frontal (Fz/Cz)\n- Perfil Clínico: Desatenção sustentada reportada na Anamnese.\n\nSugestão Diagnóstica: Transtorno do Neurodesenvolvimento (TDAH) com impacto executivo primário.`
    updateCaseBlock(caseId, 'b10_integration', aiText, 'AI Engine')
    toast({
      title: 'Integração Assistida Concluída',
      description: 'A IA gerou a síntese no Bloco 10.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Camada 4: Síntese & Convergência</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Blocos 10 e 11. Onde as dimensões se encontram para formar as hipóteses.
          </p>
        </div>
        <Button onClick={handleSimulateAI} className="bg-purple-600 hover:bg-purple-700">
          <Sparkles className="w-4 h-4 mr-2" /> Acionar IA NeuroStrata
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card className="shadow-sm border-t-4 border-t-purple-500 relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-5 pointer-events-none p-4">
            <Network className="w-40 h-40" />
          </div>
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-600" /> Bloco 10: Integração NeuroStrata
            </CardTitle>
            <CardDescription>
              Cruzamento de dados clínicos, comportamentais e eletrofisiológicos.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <Textarea
              className="min-h-[180px]"
              value={cw.blocks.b10_integration || ''}
              onChange={(e) => handleChange('b10_integration', e.target.value)}
              placeholder="Perfil neurofuncional integrado gerado pela análise cruzada..."
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle>Bloco 11: Hipóteses Clínicas (DSM-5-TR)</CardTitle>
            <CardDescription>
              Categorização diagnóstica formal fundamentada pela convergência.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              className="min-h-[150px]"
              value={cw.blocks.b11_hypotheses || ''}
              onChange={(e) => handleChange('b11_hypotheses', e.target.value)}
              placeholder="Transtornos do neurodesenvolvimento, do humor, ansiedade..."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
