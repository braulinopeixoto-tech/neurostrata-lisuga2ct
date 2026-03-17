import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { CheckCircle2, Clock, Circle, Stethoscope } from 'lucide-react'

export function DiagnosisFlowTab() {
  const steps = [
    {
      name: 'Triagem e Anamnese Inicial',
      status: 'completed',
      desc: 'Coleta de queixas principais e histórico clínico.',
    },
    {
      name: 'Bateria Psicométrica (Check-up)',
      status: 'completed',
      desc: 'Avaliação das 18 funções e DASS-21.',
    },
    {
      name: 'Mapeamento Funcional (qEEG)',
      status: 'current',
      desc: 'Aquisição de sinais elétricos e processamento topográfico em andamento.',
    },
    {
      name: 'Avaliação de Inteligência Preditiva',
      status: 'upcoming',
      desc: 'Cruzamento com Matriz RDoC e Big Five.',
    },
    {
      name: 'Laudo Neuropsicológico Final',
      status: 'upcoming',
      desc: 'Emissão de documento com selo ICP-Brasil.',
    },
  ]

  return (
    <Card className="shadow-sm animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="w-6 h-6 text-primary" /> Fluxo de Exames e Diagnóstico
        </CardTitle>
        <CardDescription>
          Visualizador de progresso da esteira de investigação clínica do paciente.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex flex-col gap-8 relative border-l-2 border-muted ml-4">
          {steps.map((s, i) => (
            <div key={i} className="flex items-start gap-6 relative group pl-8">
              <div className="absolute -left-[17px] top-0 bg-background">
                {s.status === 'completed' && (
                  <CheckCircle2 className="text-emerald-500 w-8 h-8 bg-white rounded-full" />
                )}
                {s.status === 'current' && (
                  <Clock className="text-amber-500 w-8 h-8 bg-white rounded-full animate-pulse" />
                )}
                {s.status === 'upcoming' && (
                  <Circle className="text-muted-foreground/30 w-8 h-8 bg-white rounded-full" />
                )}
              </div>
              <div>
                <h4
                  className={`text-lg font-bold ${s.status === 'upcoming' ? 'text-muted-foreground' : s.status === 'current' ? 'text-amber-600' : 'text-primary'}`}
                >
                  {s.name}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
