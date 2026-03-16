import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PSYCHIC_FUNCTIONS_CATEGORIZED } from '@/lib/mock-data'
import { AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

const SCALE_OPTIONS = [
  {
    value: 'disfuncional_grave',
    label: 'Disfuncional Grave',
    colorClass: 'border-rose-500 text-rose-600',
    mobileBgClass: 'bg-rose-50 border-rose-200',
    mobileTextClass: 'text-rose-700',
  },
  {
    value: 'disfuncional',
    label: 'Disfuncional',
    colorClass: 'border-orange-500 text-orange-600',
    mobileBgClass: 'bg-orange-50 border-orange-200',
    mobileTextClass: 'text-orange-700',
  },
  {
    value: 'regular',
    label: 'Regular',
    colorClass: 'border-amber-500 text-amber-600',
    mobileBgClass: 'bg-amber-50 border-amber-200',
    mobileTextClass: 'text-amber-700',
  },
  {
    value: 'preservado',
    label: 'Preservado',
    colorClass: 'border-emerald-500 text-emerald-600',
    mobileBgClass: 'bg-emerald-50 border-emerald-200',
    mobileTextClass: 'text-emerald-700',
  },
  {
    value: 'plenamente_preservado',
    label: 'Plenamente Preservado',
    colorClass: 'border-blue-500 text-blue-600',
    mobileBgClass: 'bg-blue-50 border-blue-200',
    mobileTextClass: 'text-blue-700',
  },
]

export function StepFunctions({
  onNext,
  nextLabel = 'Avançar',
  patientSelected = true,
}: {
  onNext: () => void
  nextLabel?: string
  patientSelected?: boolean
}) {
  const [scores, setScores] = useState<Record<string, string>>({})

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-primary">Mapeamento de 18 Funções Psíquicas</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Avalie o comprometimento em 4 eixos funcionais utilizando a escala clínica padronizada.
        </p>
        {!patientSelected && (
          <div className="flex items-center gap-2 text-sm text-destructive mt-4 bg-destructive/10 p-3 rounded-md border border-destructive/20 w-max">
            <AlertTriangle className="w-4 h-4" /> Selecione o paciente antes de avançar.
          </div>
        )}
      </div>

      <div className="space-y-12">
        {PSYCHIC_FUNCTIONS_CATEGORIZED.map((cat) => (
          <div key={cat.category} className="space-y-4">
            <h3 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2 text-foreground">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              Eixo: {cat.category}
            </h3>

            {/* Desktop Table View */}
            <div className="hidden lg:block bg-white rounded-xl border shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[300px] font-bold">Função Psíquica</TableHead>
                    {SCALE_OPTIONS.map((opt) => (
                      <TableHead key={opt.value} className="text-center text-xs font-semibold">
                        {opt.label}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cat.items.map((fn) => (
                    <TableRow key={fn} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-medium text-foreground text-sm">{fn}</TableCell>
                      {SCALE_OPTIONS.map((opt) => (
                        <TableCell key={opt.value} className="text-center p-3">
                          <RadioGroup
                            value={scores[fn]}
                            onValueChange={(val) => setScores({ ...scores, [fn]: val })}
                            className="flex justify-center"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`desktop-${fn}-${opt.value}`}
                              className={cn(
                                'w-5 h-5 transition-colors',
                                scores[fn] === opt.value
                                  ? opt.colorClass
                                  : 'border-muted-foreground/40',
                              )}
                            />
                          </RadioGroup>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile Cards View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
              {cat.items.map((fn) => (
                <div key={fn} className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
                  <div className="font-semibold text-primary">{fn}</div>
                  <RadioGroup
                    value={scores[fn]}
                    onValueChange={(val) => setScores({ ...scores, [fn]: val })}
                    className="flex flex-col gap-2"
                  >
                    {SCALE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        htmlFor={`mobile-${fn}-${opt.value}`}
                        className={cn(
                          'flex items-center space-x-3 border p-3 rounded-lg transition-colors cursor-pointer',
                          scores[fn] === opt.value
                            ? cn('border-transparent', opt.mobileBgClass)
                            : 'hover:bg-muted/50 border-border',
                        )}
                      >
                        <RadioGroupItem
                          value={opt.value}
                          id={`mobile-${fn}-${opt.value}`}
                          className={cn(
                            'w-4 h-4',
                            scores[fn] === opt.value
                              ? opt.colorClass
                              : 'border-muted-foreground/40',
                          )}
                        />
                        <span
                          className={cn(
                            'flex-1 font-medium text-sm leading-none',
                            scores[fn] === opt.value ? opt.mobileTextClass : 'text-foreground',
                          )}
                        >
                          {opt.label}
                        </span>
                      </label>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-6 border-t mt-10">
        <Button onClick={onNext} disabled={!patientSelected} className="px-8 h-11 text-base">
          Avançar para {nextLabel}
        </Button>
      </div>
    </div>
  )
}
