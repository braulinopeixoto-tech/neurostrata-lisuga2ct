import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ActivitySquare, CheckCircle2, Apple } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function AssessmentHubTab() {
  const [analyzed, setAnalyzed] = useState(false)

  const handleAnalyze = () => {
    toast({
      title: 'Avaliação processada',
      description: 'O perfil funcional foi gerado com sucesso.',
    })
    setAnalyzed(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-green-600 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <ActivitySquare className="w-6 h-6 text-green-600" /> Coleta de Dados Multidimensionais
          </CardTitle>
          <CardDescription>
            Insira recordatórios, sintomas TGI e queixas de humor e energia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label>Recordatório 24h & Padrão Semanal</Label>
              <Textarea
                placeholder="Descreva os padrões alimentares, jejum e horários..."
                className="h-32"
              />
            </div>
            <div className="space-y-3">
              <Label>Sintomas TGI (Trato Gastrointestinal)</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {[
                  'Distensão Abdominal',
                  'Refluxo/Azia',
                  'Constipação',
                  'Diarreia',
                  'Dor Abdominal',
                  'Gases',
                ].map((sym) => (
                  <div key={sym} className="flex items-center gap-2">
                    <Checkbox id={`sym-${sym}`} />
                    <label
                      htmlFor={`sym-${sym}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {sym}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>Qualidade do Sono</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bom">Reparador (Bom)</SelectItem>
                  <SelectItem value="insonia">Insônia Inicial</SelectItem>
                  <SelectItem value="acordar">Despertares Noturnos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nível de Energia Diurno</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estavel">Estável</SelectItem>
                  <SelectItem value="fadiga">Fadiga Matinal</SelectItem>
                  <SelectItem value="posprandial">Fadiga Pós-Prandial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Humor Predominante</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="estavel">Estável</SelectItem>
                  <SelectItem value="ansioso">Ansioso/Irritadiço</SelectItem>
                  <SelectItem value="deprimido">Deprimido/Apático</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={handleAnalyze} className="bg-green-600 hover:bg-green-700">
              Gerar Perfil Funcional
            </Button>
          </div>
        </CardContent>
      </Card>

      {analyzed && (
        <Card className="bg-green-50/50 border-green-200 shadow-sm animate-fade-in-up">
          <CardHeader className="pb-3 border-b border-green-100">
            <CardTitle className="text-green-800 text-lg flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" /> Resultados da Avaliação
              Nutricional
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">
                Perfil Metabólico
              </h4>
              <p className="text-lg font-semibold text-rose-600">Pró-Inflamatório Moderado</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">
                Risco Inflamatório (TGI)
              </h4>
              <p className="text-lg font-semibold text-amber-600">Disbiose Provável</p>
            </div>
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <h4 className="text-xs font-bold text-muted-foreground uppercase mb-1">
                Impacto no Cérebro
              </h4>
              <p className="text-lg font-semibold text-primary">
                Baixa Produção de GABA/Serotonina
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
