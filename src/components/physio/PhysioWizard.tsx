import { useState } from 'react'
import { Patient } from '@/types'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
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
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { AlertCircle, CheckCircle, ChevronRight, ChevronLeft, Save } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export function PhysioWizard({ patient }: { patient: Patient }) {
  const [step, setStep] = useState(1)
  const [laborDemand, setLaborDemand] = useState('')
  const [promScore, setPromScore] = useState([50])
  const [obsScore, setObsScore] = useState([50])
  const [occupationalConclusion, setOccupationalConclusion] = useState('')

  const isContextValid = laborDemand.length > 10
  const isPromValid = promScore[0] > 0
  const isObsValid = obsScore[0] > 0

  const calculateInconsistency = () => Math.abs(promScore[0] - obsScore[0]) > 30
  const calculateBFS = () => Math.round(promScore[0] * 0.3 + obsScore[0] * 0.7)

  const handleComplete = () => {
    if (!isContextValid || !isPromValid || !isObsValid) {
      toast.error('Preencha todos os requisitos antes de concluir a avaliação.')
      return
    }
    if (!occupationalConclusion) {
      toast.error('Conclusão ocupacional é obrigatória.')
      return
    }
    toast.success('Avaliação pericial concluída e salva com sucesso!')
    setStep(1) // reset or redirect
  }

  return (
    <Card className="shadow-lg border-indigo-100 max-w-4xl mx-auto">
      <CardHeader className="bg-indigo-50/50 border-b border-indigo-100 flex flex-row items-center justify-between">
        <CardTitle className="text-lg text-indigo-900">Nova Avaliação Pericial Funcional</CardTitle>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={cn(
                'w-3 h-3 rounded-full transition-colors',
                step >= s ? 'bg-indigo-600' : 'bg-slate-200',
              )}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-6 min-h-[400px]">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                1. Contexto e Demanda Laboral
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Informações essenciais sobre a exigência física do trabalho atual ou pretendido pelo
                paciente.
              </p>
            </div>
            <div className="space-y-3">
              <Label className="text-slate-700">
                Descrição da Exigência Laboral <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Descreva as posturas, cargas, repetições e ambiente de trabalho..."
                className="h-32 resize-none"
                value={laborDemand}
                onChange={(e) => setLaborDemand(e.target.value)}
              />
              {!isContextValid && laborDemand.length > 0 && (
                <p className="text-xs text-amber-600">
                  Forneça mais detalhes para uma análise pericial robusta.
                </p>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">2. Autorrelato (PROM)</h3>
              <p className="text-sm text-slate-500 mb-4">
                Resultados de questionários reportados pelo paciente (ex: WHODAS 2.0, DASH).
              </p>
            </div>
            <div className="space-y-6 p-6 border rounded-xl bg-slate-50">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-semibold">Índice de Capacidade Relatada</Label>
                  <Badge variant="outline" className="bg-white font-mono text-sm">
                    {promScore[0]} / 100
                  </Badge>
                </div>
                <Slider
                  value={promScore}
                  onValueChange={setPromScore}
                  max={100}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0 (Incapacidade Total)</span>
                  <span>100 (Função Normal)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                3. Testes Observacionais de Desempenho
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Métricas objetivas coletadas pelo perito (ex: TUG, Dinamometria, FCE).
              </p>
            </div>
            <div className="space-y-6 p-6 border rounded-xl bg-indigo-50/30">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <Label className="text-base font-semibold">Desempenho Funcional Medido</Label>
                  <Badge className="bg-indigo-100 text-indigo-800 font-mono text-sm border-indigo-200">
                    {obsScore[0]} / 100
                  </Badge>
                </div>
                <Slider
                  value={obsScore}
                  onValueChange={setObsScore}
                  max={100}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>0 (Incapacidade Severa)</span>
                  <span>100 (Desempenho Pleno)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                4. Análise de Consistência e Conclusão
              </h3>
              <p className="text-sm text-slate-500 mb-4">
                Verificação cruzada de dados e emissão de parecer funcional-ocupacional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-none border-slate-200">
                <CardHeader className="bg-slate-50 py-3 border-b">
                  <CardTitle className="text-sm flex items-center gap-2">
                    Painel de Consistência
                    {calculateInconsistency() ? (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Autorrelato (PROM):</span>
                    <span className="font-mono text-sm font-semibold">{promScore[0]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Desempenho Observado:</span>
                    <span className="font-mono text-sm font-semibold">{obsScore[0]}</span>
                  </div>
                  <div className="h-[1px] bg-slate-100 w-full" />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-indigo-900">BFS-P Calculado:</span>
                    <Badge className="bg-indigo-600 text-white font-mono text-sm">
                      {calculateBFS()}
                    </Badge>
                  </div>

                  {calculateInconsistency() ? (
                    <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-800">
                      <span className="font-bold">Atenção:</span> Divergência significativa (&gt;30
                      pts) detectada entre o relato subjetivo e o desempenho objetivo. A evidência
                      sugere amplificação de sintomas.
                    </div>
                  ) : (
                    <div className="mt-4 p-3 bg-emerald-50 border border-emerald-100 rounded-lg text-sm text-emerald-800">
                      <span className="font-bold">Consistente:</span> Padrão funcional harmônico.
                      Alta confiabilidade da evidência.
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">
                    Conclusão Ocupacional <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={occupationalConclusion}
                    onValueChange={setOccupationalConclusion}
                    disabled={!isContextValid}
                  >
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Selecione o parecer pericial..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apto">Apto para função</SelectItem>
                      <SelectItem value="apto_restricoes">Apto com restrições</SelectItem>
                      <SelectItem value="inapto_temp">Inapto temporário</SelectItem>
                      <SelectItem value="inapto_def">Inapto definitivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {!isContextValid && (
                    <p className="text-xs text-red-500 mt-1">
                      Requer Demanda Laboral preenchida (Passo 1).
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-slate-50 border-t flex justify-between p-4 rounded-b-xl">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Anterior
        </Button>

        {step < 4 ? (
          <Button
            onClick={() => setStep(Math.min(4, step + 1))}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Próximo <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleComplete}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            disabled={!isContextValid || !isPromValid || !isObsValid || !occupationalConclusion}
          >
            <Save className="w-4 h-4 mr-2" /> Concluir Avaliação
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
