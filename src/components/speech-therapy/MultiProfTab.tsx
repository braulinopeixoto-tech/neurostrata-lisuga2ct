import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Users, Brain, Apple, FlaskConical, Stethoscope } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function MultiProfTab({ patientId }: { patientId: string }) {
  const { patients } = useAppStore()
  const patient = patients.find((p) => p.id === patientId)

  // Use real mock data if available, fallback to hardcoded if missing
  const funcs = patient?.functionalAreas || {
    neuropsychology: {
      status: 'Atenção',
      summary:
        'Paciente apresenta rebaixamento em atenção alternada que pode influenciar desempenho no treino de fluência verbal.',
    },
    pharmacy: {
      status: 'Normal',
      summary: 'Aporte de Citicolina e DHA em andamento para suporte à sinaptogênese.',
    },
    nutrition: {
      status: 'Normal',
      summary: 'Dieta anti-inflamatória estabelecida para mitigar neuroinflamação.',
    },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Sincronização Multiprofissional
          </CardTitle>
          <CardDescription>
            Camada de visibilidade compartilhada do NeuroModel. Veja o que outras especialidades
            estão observando para alinhar o plano fonoaudiológico.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4 hover:bg-white hover:border-purple-200 transition-colors">
            <Brain className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Neuropsicologia</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Status: {funcs.neuropsychology.status}
              </p>
              <div className="text-xs bg-white p-3 rounded border border-slate-200 text-slate-600 italic">
                "{funcs.neuropsychology.summary}"
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4 hover:bg-white hover:border-blue-200 transition-colors">
            <Stethoscope className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Área Médica (Neurologia)</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">Diagnóstico base</p>
              <div className="text-xs bg-white p-3 rounded border border-slate-200 text-slate-600 italic">
                "Imagem por RM confirma lesão isquêmica em território da artéria cerebral média
                esquerda. Liberado para reabilitação intensiva."
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4 hover:bg-white hover:border-orange-200 transition-colors">
            <FlaskConical className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Gestão Metabólica (Farmácia)</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Status: {funcs.pharmacy.status}
              </p>
              <div className="text-xs bg-white p-3 rounded border border-slate-200 text-slate-600 italic">
                "{funcs.pharmacy.summary}"
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4 hover:bg-white hover:border-green-200 transition-colors">
            <Apple className="w-6 h-6 text-green-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Nutrição Funcional</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Status: {funcs.nutrition.status}
              </p>
              <div className="text-xs bg-white p-3 rounded border border-slate-200 text-slate-600 italic">
                "{funcs.nutrition.summary}"
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
