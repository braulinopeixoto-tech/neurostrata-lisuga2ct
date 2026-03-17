import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Users, Brain, Apple, FlaskConical, Stethoscope } from 'lucide-react'

export function MultiProfTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Sincronização Multiprofissional
          </CardTitle>
          <CardDescription>
            Camada de visibilidade compartilhada com outras especialidades ativas no prontuário do
            paciente.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4">
            <Brain className="w-6 h-6 text-purple-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Neuropsicologia</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Avaliação Cognitiva e Big Five.
              </p>
              <div className="text-xs bg-white p-2 rounded border border-slate-200 text-slate-600">
                "Paciente apresenta rebaixamento em atenção alternada que pode influenciar
                desempenho no treino de fluência verbal."
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4">
            <Stethoscope className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Área Médica (Neurologia)</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Diagnóstico base e exames de imagem.
              </p>
              <div className="text-xs bg-white p-2 rounded border border-slate-200 text-slate-600">
                "Imagem por RM confirma lesão isquêmica em território da artéria cerebral média
                esquerda. Liberado para reabilitação."
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4">
            <FlaskConical className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Farmácia Clínica</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Fórmulas e suporte bioquímico.
              </p>
              <div className="text-xs bg-white p-2 rounded border border-slate-200 text-slate-600">
                "Aporte de Citicolina e DHA em andamento para suporte à sinaptogênese e reparo de
                membrana."
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4">
            <Apple className="w-6 h-6 text-green-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Nutrição Funcional</h4>
              <p className="text-xs text-muted-foreground mt-1 mb-2">
                Modulação intestinal e metabolismo.
              </p>
              <div className="text-xs bg-white p-2 rounded border border-slate-200 text-slate-600">
                "Dieta anti-inflamatória estabelecida para mitigar neuroinflamação pós-AVC."
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
