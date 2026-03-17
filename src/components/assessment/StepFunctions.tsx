import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Brain, AlertCircle } from 'lucide-react'
import { PSYCHIC_FUNCTIONS_CATEGORIZED } from '@/lib/mock-data'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import useAppStore from '@/stores/useAppStore'

export function StepFunctions({ onNext, nextLabel, patientSelected }: any) {
  const { currentAssessmentData, setAssessmentData } = useAppStore()

  const handleSelect = (funcName: string, value: string) => {
    setAssessmentData({
      psychicFunctions: {
        ...currentAssessmentData.psychicFunctions,
        [funcName]: value,
      },
    })
  }

  const levels = [
    { value: 'Plenamente preservado', label: 'Plenamente Preservado', color: 'text-emerald-600' },
    { value: 'Preservado', label: 'Preservado', color: 'text-blue-600' },
    { value: 'Regular', label: 'Regular (Flutuante)', color: 'text-amber-600' },
    { value: 'Disfuncional', label: 'Disfuncional', color: 'text-orange-600' },
    { value: 'Disfuncional grave', label: 'Disfuncional Grave', color: 'text-rose-600' },
  ]

  if (!patientSelected) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground h-full min-h-[400px]">
        <AlertCircle className="w-12 h-12 mb-4 opacity-50" />
        <p className="max-w-md">
          Por favor, selecione um paciente acima para iniciar o mapeamento das funções psíquicas.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" /> Mapeamento 18 Funções Psíquicas
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Avalie o estado atual das funções mentais básicas para construir o alicerce diagnóstico.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PSYCHIC_FUNCTIONS_CATEGORIZED.map((cat, i) => (
          <Card
            key={i}
            className="shadow-sm border-t-4"
            style={{ borderTopColor: cat.color.replace('bg-', '') }}
          >
            <CardContent className="p-5">
              <h3 className="font-bold text-foreground mb-4">{cat.category}</h3>
              <div className="space-y-4">
                {cat.items.map((func) => (
                  <div
                    key={func}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 rounded-lg border"
                  >
                    <span className="text-sm font-medium text-slate-700">{func}</span>
                    <Select
                      value={currentAssessmentData.psychicFunctions[func]}
                      onValueChange={(v) => handleSelect(func, v)}
                    >
                      <SelectTrigger className="w-full sm:w-[180px] bg-white h-8 text-xs">
                        <SelectValue placeholder="Avaliar..." />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((l) => (
                          <SelectItem key={l.value} value={l.value} className={l.color}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t mt-8">
        <Button onClick={onNext} className="gap-2 px-8">
          Próximo: {nextLabel} <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
