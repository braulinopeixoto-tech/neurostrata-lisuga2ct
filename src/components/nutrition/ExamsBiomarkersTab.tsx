import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Activity, CheckCircle2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function ExamsBiomarkersTab() {
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = () => {
    toast({ title: 'Biomarcadores processados', description: 'Interpretação funcional gerada.' })
    setAnalyzed(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Entrada de Exames e Biomarcadores
          </CardTitle>
          <CardDescription>
            Insira os resultados laboratoriais para interpretação de impacto funcional
            neuro-metabólico.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Vitamina D (ng/mL)</Label>
              <Input placeholder="Ex: 30" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Vitamina B12 (pg/mL)</Label>
              <Input placeholder="Ex: 400" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Ferritina (ng/mL)</Label>
              <Input placeholder="Ex: 50" type="number" />
            </div>
            <div className="space-y-2">
              <Label>PCR-us (mg/L)</Label>
              <Input placeholder="Ex: 1.5" type="number" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label>Glicemia Jejum (mg/dL)</Label>
              <Input placeholder="Ex: 95" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Insulina Jejum (µU/mL)</Label>
              <Input placeholder="Ex: 12" type="number" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleAnalyze}>Análise Funcional Automática</Button>
          </div>
        </CardContent>
      </Card>

      {analyzed && (
        <Card className="border-t-4 border-t-amber-500 shadow-sm animate-fade-in-up bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-amber-800">Interpretação Funcional (IA)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border shadow-sm">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm">
                    Alerta: Risco Inflamatório de Baixo Grau
                  </h5>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    PCR-us moderadamente elevado sugere neuroinflamação subclínica, podendo afetar
                    neuroplasticidade e humor.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 bg-white p-3 rounded-lg border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <h5 className="font-semibold text-sm">Níveis de B12 Funcionais Adequados</h5>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Suporte basal para síntese de mielina e neurotransmissores aparentemente
                    preservado.
                  </p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="bg-muted p-4 rounded-lg flex items-start gap-3 text-xs text-muted-foreground">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
        <p>
          <strong>Aviso Regulatório:</strong> Este sistema não substitui o julgamento profissional e
          não emite diagnósticos médicos. A análise de biomarcadores aqui presente visa
          exclusivamente a avaliação funcional para fins de intervenção nutricional e suporte ao
          eixo intestino-cérebro, devendo ser validada clinicamente pelo profissional responsável.
        </p>
      </div>
    </div>
  )
}
