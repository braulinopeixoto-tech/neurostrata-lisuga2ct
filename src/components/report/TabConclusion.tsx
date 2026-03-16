import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Slider } from '@/components/ui/slider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useReportStore from '@/stores/useReportStore'

export function TabConclusion() {
  const { data, updateData } = useReportStore()

  const updateRadar = (idx: number, val: number) => {
    const newRadar = [...data.radarData]
    newRadar[idx].value = val
    updateData({ radarData: newRadar })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 13: Índices NeuroStrata</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <Label className="text-emerald-700">Integridade</Label>
              <span className="font-mono bg-muted px-2 rounded">{data.idxIntegrity}</span>
            </div>
            <Slider
              value={[data.idxIntegrity]}
              onValueChange={(v) => updateData({ idxIntegrity: v[0] })}
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <Label className="text-amber-700">Comprometimento</Label>
              <span className="font-mono bg-muted px-2 rounded">{data.idxImpairment}</span>
            </div>
            <Slider
              value={[data.idxImpairment]}
              onValueChange={(v) => updateData({ idxImpairment: v[0] })}
            />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <Label className="text-rose-700">Risco Clínico</Label>
              <span className="font-mono bg-muted px-2 rounded">{data.idxRisk}</span>
            </div>
            <Slider value={[data.idxRisk]} onValueChange={(v) => updateData({ idxRisk: v[0] })} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <Label className="text-purple-700">Disfunção</Label>
              <span className="font-mono bg-muted px-2 rounded">{data.idxDysfunction}</span>
            </div>
            <Slider
              value={[data.idxDysfunction]}
              onValueChange={(v) => updateData({ idxDysfunction: v[0] })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 14: Radar de Assinatura (Ajuste)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {data.radarData.map((d, i) => (
            <div key={d.subject} className="space-y-2">
              <div className="flex justify-between text-xs items-center">
                <Label className="font-semibold text-muted-foreground">{d.subject}</Label>
                <span className="font-mono bg-muted px-1.5 rounded text-[10px]">{d.value}%</span>
              </div>
              <Slider
                max={100}
                value={[d.value]}
                onValueChange={(v) => updateRadar(i, v[0])}
                className="[&>span:first-child]:bg-primary/20"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bloco 15: Conclusão Técnica</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            className="min-h-[120px]"
            value={data.conclusion}
            onChange={(e) => updateData({ conclusion: e.target.value })}
          />
        </CardContent>
      </Card>
    </div>
  )
}
