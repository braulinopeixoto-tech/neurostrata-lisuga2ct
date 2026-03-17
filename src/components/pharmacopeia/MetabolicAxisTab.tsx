import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'

export function MetabolicAxisTab() {
  const { patients } = useAppStore()
  const { metabolicAxes, setMetabolicAxis } = usePharmacyStore()
  const [patientId, setPatientId] = useState('')

  const currentAxis = metabolicAxes[patientId] || { inflamacao: 50, energia: 50, microbiota: 50 }

  const handleUpdate = (key: 'inflamacao' | 'energia' | 'microbiota', val: number[]) => {
    if (!patientId) return
    setMetabolicAxis(patientId, { ...currentAxis, [key]: val[0] })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Eixo Metabólico Funcional
          </CardTitle>
          <CardDescription>
            Avaliação estruturada de marcadores neurofuncionais sistêmicos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-2">
            <Label>Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {patientId && (
            <div className="space-y-8 bg-slate-50 p-6 rounded-xl border">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-semibold text-rose-700">Índice Inflamatório</Label>
                  <span className="font-mono text-sm font-medium">{currentAxis.inflamacao}%</span>
                </div>
                <Slider
                  max={100}
                  min={0}
                  step={1}
                  value={[currentAxis.inflamacao]}
                  onValueChange={(v) => handleUpdate('inflamacao', v)}
                />
                <p className="text-xs text-muted-foreground">
                  Impacto direto em neuroplasticidade e síntese de BDNF. Modulação prioritária em
                  casos de hiperativação límbica.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-semibold text-amber-600">
                    Energia Mitocondrial
                  </Label>
                  <span className="font-mono text-sm font-medium">{currentAxis.energia}%</span>
                </div>
                <Slider
                  max={100}
                  min={0}
                  step={1}
                  value={[currentAxis.energia]}
                  onValueChange={(v) => handleUpdate('energia', v)}
                />
                <p className="text-xs text-muted-foreground">
                  Regulação de fadiga central e metabolismo oxidativo. Fundamental para suporte
                  cognitivo basal.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-semibold text-emerald-600">
                    Equilíbrio da Microbiota
                  </Label>
                  <span className="font-mono text-sm font-medium">{currentAxis.microbiota}%</span>
                </div>
                <Slider
                  max={100}
                  min={0}
                  step={1}
                  value={[currentAxis.microbiota]}
                  onValueChange={(v) => handleUpdate('microbiota', v)}
                />
                <p className="text-xs text-muted-foreground">
                  Eixo Intestino-Cérebro atuando na modulação de precursores de GABA/Serotonina
                  essenciais.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
