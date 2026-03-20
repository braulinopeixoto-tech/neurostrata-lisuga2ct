import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Brain, Target, Network, Activity } from 'lucide-react'

export function LayerCollection({ caseId }: { caseId: string }) {
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
        <h2 className="text-2xl font-bold text-slate-800">Camada 2: Avaliação Estruturada</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Blocos 5 a 8 do Protocolo NeuroStrata v1.0. Coleta dimensional baseada em frameworks.
        </p>
      </div>

      <Tabs defaultValue="b5" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto p-1 bg-muted rounded-lg mb-6">
          <TabsTrigger value="b5" className="py-2 gap-2">
            <Brain className="w-4 h-4" /> Bloco 5: Cognitiva
          </TabsTrigger>
          <TabsTrigger value="b6" className="py-2 gap-2">
            <Activity className="w-4 h-4" /> Bloco 6: RDoC
          </TabsTrigger>
          <TabsTrigger value="b7" className="py-2 gap-2">
            <Network className="w-4 h-4" /> Bloco 7: Big Five
          </TabsTrigger>
          <TabsTrigger value="b8" className="py-2 gap-2">
            <Target className="w-4 h-4" /> Bloco 8: 18 Funções
          </TabsTrigger>
        </TabsList>

        <TabsContent value="b5" className="m-0">
          <Card className="shadow-sm border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>Avaliação Cognitiva</CardTitle>
              <CardDescription>Atenção, Memória, Linguagem, Funções Executivas.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px]"
                value={cw.blocks.b5_cognitive || ''}
                onChange={(e) => handleChange('b5_cognitive', e.target.value)}
                placeholder="Insira os scores e interpretações das baterias neuropsicológicas..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="b6" className="m-0">
          <Card className="shadow-sm border-t-4 border-t-indigo-500">
            <CardHeader>
              <CardTitle>Análise Dimensional RDoC</CardTitle>
              <CardDescription>
                Negative Valence, Positive Valence, Cognitive Systems, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px]"
                value={cw.blocks.b6_rdoc || ''}
                onChange={(e) => handleChange('b6_rdoc', e.target.value)}
                placeholder="Scores dimensionais e interpretação clínica NIMH..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="b7" className="m-0">
          <Card className="shadow-sm border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle>Perfil de Personalidade (Big Five)</CardTitle>
              <CardDescription>
                Neuroticismo, Extroversão, Abertura, Amabilidade, Conscienciosidade.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px]"
                value={cw.blocks.b7_bigfive || ''}
                onChange={(e) => handleChange('b7_bigfive', e.target.value)}
                placeholder="Perfil interpretativo baseado no modelo de Paul Costa..."
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="b8" className="m-0">
          <Card className="shadow-sm border-t-4 border-t-rose-500">
            <CardHeader>
              <CardTitle>Modelo das 18 Funções Psíquicas</CardTitle>
              <CardDescription>
                Classificação funcional nas categorias Cognitivas, Afetivas, Sociais e Executivas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px]"
                value={cw.blocks.b8_psychic || ''}
                onChange={(e) => handleChange('b8_psychic', e.target.value)}
                placeholder="Classifique a integridade de cada função psíquica básica..."
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
