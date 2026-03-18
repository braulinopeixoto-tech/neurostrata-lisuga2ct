import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileSignature, ShieldCheck, CheckCircle2, Lock } from 'lucide-react'
import { useTeamFlowStore, CaseWorkspace } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function ValidationReportTab({
  caseData,
  patient,
}: {
  caseData: CaseWorkspace
  patient: any
}) {
  const { updateCaseStatus } = useTeamFlowStore()
  const { currentUser } = useAppStore()

  const isCompleted = caseData.status === 'Laudo Validado'

  const handleValidate = () => {
    updateCaseStatus(caseData.id, 'Laudo Validado', currentUser.fullName)
    toast({
      title: 'Diagnóstico Validado e Selado',
      description: 'O Laudo Integrado foi assinado via Trust Layer e o caso foi fechado.',
      action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card
        className={`shadow-sm border-t-4 ${isCompleted ? 'border-t-emerald-500' : 'border-t-slate-800'}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSignature
              className={`w-5 h-5 ${isCompleted ? 'text-emerald-500' : 'text-slate-800'}`}
            />
            Editor de Laudo Integrado (Líder Médico)
          </CardTitle>
          <CardDescription>
            Puxe os blocos estruturados da convergência para gerar a versão final que será assinada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCompleted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center relative overflow-hidden">
              <Lock className="absolute -right-4 -top-4 w-32 h-32 text-emerald-100 opacity-50" />
              <ShieldCheck className="w-12 h-12 text-emerald-500 mx-auto mb-4 relative z-10" />
              <h3 className="text-xl font-bold text-emerald-900 relative z-10">
                Laudo Fechado e Selado
              </h3>
              <p className="text-emerald-800/80 mt-2 max-w-md mx-auto relative z-10">
                O diagnóstico multidisciplinar foi validado por {currentUser.fullName} e está
                armazenado imutavelmente na Trust Layer™.
              </p>
              <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 relative z-10">
                Ver PDF Assinado
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                <p className="text-muted-foreground max-w-md mx-auto mb-4">
                  A IA gerou um rascunho com base no Painel de Convergência. Revise o texto e
                  aplique a Assinatura Digital para validar o diagnóstico.
                </p>
                <div className="bg-white p-4 border rounded text-left text-sm text-slate-700 shadow-sm mx-auto max-w-2xl mb-6">
                  <h4 className="font-bold border-b pb-2 mb-2">Conclusão Diagnóstica Integrada</h4>
                  <p>
                    Com base na coleta estruturada da equipe (Neuropsicologia), confirmada pelo
                    cruzamento na Matriz RDoC (Sistemas Cognitivos), o paciente {patient.name}{' '}
                    apresenta quadro compatível com déficit executivo primário de severidade 7/10.
                    Recomenda-se protocolo de neuromodulação focado em DMN.
                  </p>
                </div>
                <Button
                  onClick={handleValidate}
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" /> Assinar Digitalmente e Validar Laudo
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
