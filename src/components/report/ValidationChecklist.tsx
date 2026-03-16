import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { CheckCircle2, AlertTriangle, ListChecks } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useReportStore from '@/stores/useReportStore'
import { ScrollArea } from '@/components/ui/scroll-area'

export function ValidationChecklist() {
  const { data } = useReportStore()

  const blocks = [
    {
      num: 1,
      name: 'Identificação do Paciente',
      valid: (data.patientName?.length || 0) > 0 && (data.dob?.length || 0) > 0,
    },
    { num: 2, name: 'Motivo da Avaliação', valid: (data.reason?.length || 0) > 20 },
    {
      num: 3,
      name: 'Histórico Clínico e Desenvolvimental',
      valid: (data.history?.length || 0) > 20,
    },
    { num: 4, name: 'Perfil Comportamental Atual', valid: (data.behavior?.length || 0) > 20 },
    { num: 5, name: 'Avaliação Cognitiva', valid: (data.cognitive?.length || 0) > 20 },
    { num: 6, name: 'Análise Dimensional RDoC', valid: (data.rdoc?.length || 0) > 20 },
    { num: 7, name: 'Perfil de Personalidade – Big Five', valid: (data.bigFive?.length || 0) > 20 },
    {
      num: 8,
      name: 'Modelo das 18 Funções Psíquicas',
      valid: (data.psychicFunc?.length || 0) > 20,
    },
    {
      num: 9,
      name: 'Análise Neurofisiológica (qEEG/ERP)',
      valid: (data.neurophysio?.length || 0) > 20,
    },
    { num: 10, name: 'Integração NeuroStrata', valid: (data.integration?.length || 0) > 20 },
    { num: 11, name: 'Hipóteses Clínicas', valid: (data.hypotheses?.length || 0) > 20 },
    { num: 12, name: 'Plano de Intervenção', valid: (data.intervention?.length || 0) > 20 },
    { num: 13, name: 'Índice NeuroStrata', valid: data.idxIntegrity > 0 },
    { num: 14, name: 'Visualização Gráfica', valid: data.radarData?.some((d) => d.value > 0) },
    { num: 15, name: 'Conclusão Técnica', valid: (data.conclusion?.length || 0) > 50 },
    { num: 16, name: 'Referências Científicas', valid: true },
    { num: 17, name: 'Assinatura Profissional', valid: (data.professional?.length || 0) > 0 },
  ]

  const invalidCount = blocks.filter((b) => !b.valid).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={invalidCount > 0 ? 'outline' : 'secondary'} className="relative">
          <ListChecks className="w-4 h-4 mr-2" />
          Checklist de Validação
          {invalidCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {invalidCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ListChecks className="w-5 h-5 text-primary" />
            Checklist Clínico (17 Blocos)
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4 flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-3 pb-8">
              {blocks.map((block) => (
                <div
                  key={block.num}
                  className="flex items-start justify-between p-3 border rounded-lg bg-card transition-colors hover:bg-muted/50"
                >
                  <div className="flex gap-3">
                    {block.valid ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Bloco {block.num}</h4>
                      <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                        {block.name}
                      </p>
                    </div>
                  </div>
                  {!block.valid && (
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded ml-2 shrink-0">
                      Pendente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}
