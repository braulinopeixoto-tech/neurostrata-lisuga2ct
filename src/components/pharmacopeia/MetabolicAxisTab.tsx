import { useState, useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
import { Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'

export function MetabolicAxisTab() {
  const { patients } = useAppStore()
  const { metabolicAxes, setMetabolicAxis } = usePharmacyStore()
  const [patientId, setPatientId] = useState('')
  const [correlation, setCorrelation] = useState('')

  useEffect(() => {
    if (patientId) {
      setCorrelation(
        `O paciente apresenta oscilações na atenção sustentada que parecem se agravar em períodos de maior fadiga física. Há forte indicativo de que desequilíbrios na energia mitocondrial e marcadores inflamatórios sustentem esse quadro funcional crônico.`,
      )
    } else {
      setCorrelation('')
    }
  }, [patientId])

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
            Avaliação e acompanhamento estruturado das áreas funcionais centrais da saúde
            metabólica.
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
                  <Label className="text-sm font-semibold text-rose-700">
                    Inflamação Sistêmica
                  </Label>
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
                  Impacto direto em neuroplasticidade e regulação afetiva. Modulação prioritária em
                  casos de hiperativação límbica ou fadiga cognitiva.
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
                  Regulação de fadiga central e metabolismo oxidativo. Fundamental para o suporte
                  das funções executivas complexas.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-semibold text-emerald-600">
                    Microbiota e Eixo Intestino-Cérebro
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
                  Equilíbrio da absorção de nutrientes e modulação de precursores de
                  neurotransmissores como GABA e Serotonina.
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-200">
                <Label className="text-sm font-semibold text-slate-800">
                  Correlação com Lacunas Neurofuncionais
                </Label>
                <p className="text-xs text-muted-foreground">
                  Descreva como os eixos metabólicos acima se relacionam com as lacunas cognitivas
                  ou emocionais mapeadas na avaliação do paciente.
                </p>
                <Textarea
                  value={correlation}
                  onChange={(e) => setCorrelation(e.target.value)}
                  className="bg-white min-h-[100px] resize-none"
                  placeholder="Ex: O índice inflamatório elevado correlaciona-se clinicamente com os relatos de fadiga atencional..."
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
