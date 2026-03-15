import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'

export function StepBiomarkers({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold">Integração de Biomarcadores</h2>
        <p className="text-sm text-muted-foreground">
          Inputs especializados para dados neurofisiológicos (qEEG, LORETA, ERP).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border shadow-sm">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-primary border-b pb-2">qEEG Topográfico</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Excesso de Theta (Frontal)</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Déficit de Alpha (Parietal)</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Beta Spindles</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Assimetria Fp1-Fp2</Label>
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
      </div>

      <div className="flex justify-between pt-6 border-t">
        <Button variant="outline" onClick={onPrev}>
          Voltar
        </Button>
        <Button onClick={onNext} className="bg-primary">
          Gerar Processamento Científico
        </Button>
      </div>
    </div>
  )
}
