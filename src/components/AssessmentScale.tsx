import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

export const SCALE_OPTIONS = [
  {
    value: 'Disfuncional grave',
    label: 'Disfuncional grave',
    colorClass: 'border-rose-500 text-rose-600',
    mobileBgClass: 'bg-rose-50 border-rose-200',
    mobileTextClass: 'text-rose-700',
    indicatorClass: 'bg-rose-500',
  },
  {
    value: 'Disfuncional',
    label: 'Disfuncional',
    colorClass: 'border-orange-500 text-orange-600',
    mobileBgClass: 'bg-orange-50 border-orange-200',
    mobileTextClass: 'text-orange-700',
    indicatorClass: 'bg-orange-500',
  },
  {
    value: 'Regular',
    label: 'Regular',
    colorClass: 'border-amber-500 text-amber-600',
    mobileBgClass: 'bg-amber-50 border-amber-200',
    mobileTextClass: 'text-amber-700',
    indicatorClass: 'bg-amber-500',
  },
  {
    value: 'Preservado',
    label: 'Preservado',
    colorClass: 'border-emerald-500 text-emerald-600',
    mobileBgClass: 'bg-emerald-50 border-emerald-200',
    mobileTextClass: 'text-emerald-700',
    indicatorClass: 'bg-emerald-500',
  },
  {
    value: 'Plenamente preservado',
    label: 'Plenamente preservado',
    colorClass: 'border-blue-500 text-blue-600',
    mobileBgClass: 'bg-blue-50 border-blue-200',
    mobileTextClass: 'text-blue-700',
    indicatorClass: 'bg-blue-500',
  },
]

interface AssessmentItem {
  id: string
  name: string
  description?: string
}

export function AssessmentScale({
  items,
  scores,
  onScoreChange,
}: {
  items: AssessmentItem[]
  scores: Record<string, string>
  onScoreChange: (id: string, val: string) => void
}) {
  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[300px] font-bold">Domínio / Função</TableHead>
              {SCALE_OPTIONS.map((opt) => (
                <TableHead key={opt.value} className="text-center text-xs font-semibold">
                  {opt.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-medium text-foreground text-sm">
                  <div className="flex items-center gap-2">
                    {scores[item.id] ? (
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full shrink-0',
                          SCALE_OPTIONS.find((o) => o.value === scores[item.id])?.indicatorClass,
                        )}
                      />
                    ) : (
                      <div className="w-2 h-2 rounded-full shrink-0 bg-transparent" />
                    )}
                    <div>
                      <div>{item.name}</div>
                      {item.description && (
                        <div className="text-xs text-muted-foreground font-normal mt-0.5 max-w-[250px] leading-tight">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                {SCALE_OPTIONS.map((opt) => (
                  <TableCell key={opt.value} className="text-center p-3">
                    <RadioGroup
                      value={scores[item.id]}
                      onValueChange={(val) => onScoreChange(item.id, val)}
                      className="flex justify-center"
                    >
                      <RadioGroupItem
                        value={opt.value}
                        id={`desktop-${item.id}-${opt.value}`}
                        className={cn(
                          'w-5 h-5 transition-colors',
                          scores[item.id] === opt.value
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
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
            <div className="font-semibold text-primary">
              <div className="flex items-center gap-2">
                {scores[item.id] ? (
                  <div
                    className={cn(
                      'w-2 h-2 rounded-full shrink-0',
                      SCALE_OPTIONS.find((o) => o.value === scores[item.id])?.indicatorClass,
                    )}
                  />
                ) : (
                  <div className="w-2 h-2 rounded-full shrink-0 bg-transparent" />
                )}
                {item.name}
              </div>
              {item.description && (
                <div className="text-xs text-muted-foreground font-normal mt-1 ml-4">
                  {item.description}
                </div>
              )}
            </div>
            <RadioGroup
              value={scores[item.id]}
              onValueChange={(val) => onScoreChange(item.id, val)}
              className="flex flex-col gap-2"
            >
              {SCALE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  htmlFor={`mobile-${item.id}-${opt.value}`}
                  className={cn(
                    'flex items-center space-x-3 border p-3 rounded-lg transition-colors cursor-pointer',
                    scores[item.id] === opt.value
                      ? cn('border-transparent', opt.mobileBgClass)
                      : 'hover:bg-muted/50 border-border',
                  )}
                >
                  <RadioGroupItem
                    value={opt.value}
                    id={`mobile-${item.id}-${opt.value}`}
                    className={cn(
                      'w-4 h-4',
                      scores[item.id] === opt.value ? opt.colorClass : 'border-muted-foreground/40',
                    )}
                  />
                  <span
                    className={cn(
                      'flex-1 font-medium text-sm leading-none',
                      scores[item.id] === opt.value ? opt.mobileTextClass : 'text-foreground',
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
  )
}
