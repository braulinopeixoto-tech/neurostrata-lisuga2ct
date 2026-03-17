import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckCircle2, AlertTriangle, ListChecks } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'

export function ValidationChecklist() {
  const { data } = useReportStore()
  const [open, setOpen] = useState(false)

  const items = [
    { key: 'patientName', label: 'Identificação completa do paciente' },
    { key: 'reason', label: 'Motivo do encaminhamento preenchido' },
    { key: 'history', label: 'Histórico clínico e anamnese documentados' },
    { key: 'cognitive', label: 'Avaliação cognitiva estruturada' },
    { key: 'rdoc', label: 'Mapeamento na Matriz RDoC' },
    { key: 'bigFive', label: 'Integração do Perfil Big Five' },
    { key: 'conclusion', label: 'Conclusão e Parecer Técnico finalizados' },
  ]

  const getStatus = (key: keyof typeof data) => {
    const val = data[key]
    return val && typeof val === 'string' && val.length > 20
  }

  const completedCount = items.filter((item) => getStatus(item.key as any)).length
  const allComplete = completedCount === items.length

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <ListChecks className="w-4 h-4" />
          <span className="hidden sm:inline">Checklist de Validação</span>
          <span className="sm:hidden">
            {completedCount}/{items.length}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" /> Checklist Documental
          </DialogTitle>
          <DialogDescription>
            Requisitos mínimos para a estruturação de um laudo neurofuncional válido.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 flex items-center justify-between text-sm font-medium">
            <span>Progresso da Estruturação</span>
            <span className={allComplete ? 'text-emerald-600' : 'text-amber-600'}>
              {completedCount} de {items.length} completos
            </span>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {items.map((item) => {
                const complete = getStatus(item.key as any)
                return (
                  <div
                    key={item.key}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${complete ? 'bg-emerald-50/50 border-emerald-100' : 'bg-slate-50 border-slate-200'}`}
                  >
                    {complete ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    )}
                    <span className={`text-sm ${complete ? 'text-slate-700' : 'text-slate-500'}`}>
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
