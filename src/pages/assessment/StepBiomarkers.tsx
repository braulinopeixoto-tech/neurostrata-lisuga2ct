import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Activity, AlertTriangle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function StepBiomarkers({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  const { currentAssessmentData: data, setAssessmentData } = useAppStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">Integração de Dados e Biomarcadores</h2>
        <p className="text-sm text-muted-foreground">
          Inputs especializados para dados clínicos e neurofisiológicos (qEEG, LORETA, ERP).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-primary border-b pb-2">qEEG Topográfico</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Excesso de Theta (Frontal)</Label>
                <Switch
                  checked={data.qeegTheta}
                  onCheckedChange={(v) => setAssessmentData({ qeegTheta: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Déficit de Alpha (Parietal)</Label>
                <Switch
                  checked={data.qeegAlpha}
                  onCheckedChange={(v) => setAssessmentData({ qeegAlpha: v })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label>Beta Spindles</Label>
                <Switch />
              </div>
              <div className="pt-2">
                <Label className="text-xs text-muted-foreground">
                  Pico de Frequência Individual (PAF)
                </Label>
                <Input type="number" placeholder="Ex: 9.5 Hz" className="mt-1" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-primary border-b pb-2">
              Potenciais Relacionados a Eventos (ERP)
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm">Amplitude P300 (Atenção)</Label>
                <Input placeholder="μV" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Latência N200 (Controle Inibitório)</Label>
                <Input placeholder="ms" className="mt-1" />
              </div>
              <div>
                <Label className="text-sm">Conectividade Funcional (Coerência)</Label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                  <option>Normativa</option>
                  <option>Hiperconectividade Frontal</option>
                  <option>Hipoconectividade Global</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-sm md:col-span-2 border-t-4 border-t-muted">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-primary border-b pb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Dados Clínicos e Safety Gates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Idade</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 45"
                    value={data.age}
                    onChange={(e) => setAssessmentData({ age: e.target.value })}
                    className="mt-1 h-9"
                  />
                </div>
                <div>
                  <Label className="text-xs">Medicações em Uso</Label>
                  <Input
                    placeholder="Ex: Escitalopram 10mg"
                    value={data.medications}
                    onChange={(e) => setAssessmentData({ medications: e.target.value })}
                    className="mt-1 h-9"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Qualidade do Sono</Label>
                  <select
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm mt-1"
                    value={data.sleepQuality}
                    onChange={(e) => setAssessmentData({ sleepQuality: e.target.value })}
                  >
                    <option value="regular">Regular</option>
                    <option value="insomnia">Insônia / Fragmentado</option>
                    <option value="hypersomnia">Hipersônia</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs">Comorbidades Relevantes</Label>
                  <Input
                    placeholder="Ex: TDAH, HAS"
                    value={data.comorbidities}
                    onChange={(e) => setAssessmentData({ comorbidities: e.target.value })}
                    className="mt-1 h-9"
                  />
                </div>
              </div>
              <div className="space-y-3 bg-red-50/50 p-4 rounded-lg border border-red-100">
                <h4 className="text-xs font-bold flex items-center gap-2 text-red-600 uppercase">
                  <AlertTriangle className="w-3 h-3" /> Gate de Segurança
                </h4>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-red-900">Histórico Convulsivo</Label>
                  <Switch
                    checked={data.seizureRisk}
                    onCheckedChange={(v) => setAssessmentData({ seizureRisk: v })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-red-900">Implantes Metálicos</Label>
                  <Switch
                    checked={data.implants}
                    onCheckedChange={(v) => setAssessmentData({ implants: v })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext} className="bg-primary">
          Avançar para Agentes IA
        </Button>
      </div>
    </div>
  )
}
