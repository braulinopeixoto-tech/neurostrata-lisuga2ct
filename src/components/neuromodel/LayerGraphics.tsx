import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { PieChart, Activity, Brain } from 'lucide-react'
import { MentalRadarChart } from '@/components/charts/MentalRadarChart'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'

export function LayerGraphics({ caseId }: { caseId: string }) {
  const { caseWorkspaces, updateCaseBlock } = useTeamFlowStore()
  const { currentUser } = useAppStore()

  const cw = caseWorkspaces.find((c) => c.id === caseId)
  if (!cw) return null

  const indexData = cw.blocks.b13_index || {
    nsi: 70,
    integrity: 65,
    impairment: 35,
    risk: 40,
    dysfunction: 30,
  }

  const handleIndexChange = (key: string, value: number) => {
    updateCaseBlock(caseId, 'b13_index', { ...indexData, [key]: value }, currentUser.fullName)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Camada Analítica e Visual</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Blocos 13 e 14. Índices globais e representação gráfica do NeuroModel.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-rose-500 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-rose-600" /> Bloco 13: Índice NeuroStrata (NSI)
            </CardTitle>
            <CardDescription>
              Métricas agregadas calculadas a partir das camadas anteriores.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border rounded-xl">
              <h3 className="text-lg font-bold text-slate-700 mb-6">NeuroStrata Index Global</h3>
              <div className="relative flex items-center justify-center w-40 h-40">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * indexData.nsi) / 100}
                    strokeLinecap="round"
                    className="text-rose-500 transition-all duration-500"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-black text-slate-800">{indexData.nsi}</span>
                  <span className="text-[10px] font-bold text-slate-500">/ 100</span>
                </div>
              </div>
              <Slider
                value={[indexData.nsi]}
                onValueChange={(v) => handleIndexChange('nsi', v[0])}
                max={100}
                step={1}
                className="mt-8 max-w-[200px]"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <Label>Integridade Neurofuncional</Label>
                  <span className="text-emerald-600">{indexData.integrity}%</span>
                </div>
                <Slider
                  value={[indexData.integrity]}
                  onValueChange={(v) => handleIndexChange('integrity', v[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <Label>Comprometimento Cognitivo</Label>
                  <span className="text-amber-600">{indexData.impairment}%</span>
                </div>
                <Slider
                  value={[indexData.impairment]}
                  onValueChange={(v) => handleIndexChange('impairment', v[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <Label>Risco Psicopatológico</Label>
                  <span className="text-rose-600">{indexData.risk}%</span>
                </div>
                <Slider
                  value={[indexData.risk]}
                  onValueChange={(v) => handleIndexChange('risk', v[0])}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-semibold">
                  <Label>Disfunção Socioemocional</Label>
                  <span className="text-purple-600">{indexData.dysfunction}%</span>
                </div>
                <Slider
                  value={[indexData.dysfunction]}
                  onValueChange={(v) => handleIndexChange('dysfunction', v[0])}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-blue-600" /> Bloco 14: Perfil Dimensional
            </CardTitle>
            <CardDescription>Radar de funcionamento mental.</CardDescription>
          </CardHeader>
          <CardContent>
            <MentalRadarChart />
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-600" /> Bloco 14: Topografia (qEEG)
            </CardTitle>
            <CardDescription>Assinatura de redes mapeada no modelo.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-6">
            <BrainMapVisualizer variant="frontal" className="scale-110" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
