import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  CheckCircle2,
  ShieldAlert,
  Fingerprint,
  Lock,
  FileSignature,
  RefreshCw,
} from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function DiagnosisValidationTab({ patient }: { patient: any }) {
  const {
    diagnosisWorkflows,
    updateDiagnosisWorkflow,
    simulateDataCompromise,
    addPatientAuditLog,
    currentUser,
  } = useAppStore()
  const workflow = diagnosisWorkflows[patient.id]

  if (!workflow) {
    return (
      <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20 animate-fade-in">
        Nenhum fluxo de diagnóstico iniciado.
      </div>
    )
  }

  const allCriteriaMet = Object.values(workflow.criteriaMet).every(Boolean)

  const handleSign = () => {
    const signatureHash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    updateDiagnosisWorkflow(patient.id, {
      status: 'Validated',
      signature: {
        hash: signatureHash,
        timestamp: new Date().toISOString(),
        signer: currentUser.fullName,
      },
      validatedAt: new Date().toISOString(),
      validatedBy: currentUser.fullName,
      isDataCompromised: false,
    })

    addPatientAuditLog(patient.id, {
      date: new Date().toISOString(),
      action: 'Diagnóstico Validado (Trust Layer)',
      user: currentUser.fullName,
      details: `Diagnóstico assinado digitalmente. Hash gerado: ${signatureHash.substring(0, 16)}...`,
    })

    toast({
      title: 'Diagnóstico Validado',
      description: 'O diagnóstico foi bloqueado e selado criptograficamente.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  const handleRevalidate = () => {
    updateDiagnosisWorkflow(patient.id, {
      status: 'Pending Validation',
      isDataCompromised: false,
      signature: null,
      dataHash: `REVAL_${Date.now()}`, // Simulate new hash
    })
    toast({
      title: 'Fluxo Reiniciado',
      description: 'O diagnóstico foi retornado para revisão pendente.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center space-y-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Fluxo de Validação Diagnóstica</h2>
        <p className="text-slate-500">
          Garante que o diagnóstico atende aos critérios do Biograma antes da emissão final do
          laudo.
        </p>
      </div>

      {workflow.isDataCompromised && (
        <Alert
          variant="destructive"
          className="bg-rose-50 border-rose-200 text-rose-900 animate-in fade-in slide-in-from-top-4"
        >
          <ShieldAlert className="h-5 w-5 text-rose-600" />
          <AlertTitle className="font-bold text-base">Alerta de Integridade de Dados</AlertTitle>
          <AlertDescription className="mt-2 text-sm leading-relaxed">
            Dados clínicos subjacentes (ex: resultados de qEEG ou testes neuropsicológicos) foram
            modificados após a validação deste diagnóstico. A assinatura digital anterior foi{' '}
            <strong>invalidada</strong>. É necessário um novo ciclo de validação.
          </AlertDescription>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRevalidate}
            className="mt-4 bg-white hover:bg-rose-50 text-rose-700 border-rose-200"
          >
            <RefreshCw className="w-4 h-4 mr-2" /> Iniciar Revalidação
          </Button>
        </Alert>
      )}

      <div className="relative mb-12 mt-8">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0 rounded-full" />
        <div
          className="absolute top-1/2 left-0 h-1 bg-rose-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{
            width:
              workflow.status === 'Draft'
                ? '0%'
                : workflow.status === 'Pending Validation'
                  ? '33%'
                  : workflow.status === 'Validated'
                    ? '66%'
                    : '100%',
          }}
        />

        <div className="relative z-10 flex justify-between">
          {['Draft', 'Pending Validation', 'Validated', 'Finalized'].map((step, idx) => {
            const isActive = workflow.status === step
            const isPast =
              (['Pending Validation', 'Validated', 'Finalized'].includes(workflow.status) &&
                step === 'Draft') ||
              (['Validated', 'Finalized'].includes(workflow.status) &&
                step === 'Pending Validation') ||
              (workflow.status === 'Finalized' && step === 'Validated')

            return (
              <div key={step} className="flex flex-col items-center gap-2 bg-white px-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                    isActive
                      ? 'bg-rose-500 text-white ring-4 ring-rose-100'
                      : isPast
                        ? 'bg-rose-200 text-rose-700'
                        : 'bg-slate-100 text-slate-400 border-2 border-slate-200'
                  }`}
                >
                  {isPast ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span
                  className={`text-xs font-semibold ${isActive ? 'text-rose-700' : 'text-slate-500'}`}
                >
                  {step === 'Draft'
                    ? 'Rascunho'
                    : step === 'Pending Validation'
                      ? 'Revisão Pendente'
                      : step === 'Validated'
                        ? 'Validado'
                        : 'Finalizado (Laudo)'}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Critérios Obrigatórios (Biograma)</CardTitle>
            <CardDescription>
              O diagnóstico só pode ser validado se todos os eixos estiverem preenchidos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(workflow.criteriaMet).map(([key, isMet]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 border rounded-lg bg-slate-50/50"
              >
                <span className="text-sm font-medium text-slate-700">{key} Mapeado</span>
                {isMet ? (
                  <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Completo
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                    Pendente
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
          <CardFooter className="bg-slate-50 border-t flex justify-between items-center text-sm p-4">
            <span className="text-slate-500 font-medium">Status dos Critérios:</span>
            {allCriteriaMet ? (
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Liberado para Validação
              </span>
            ) : (
              <span className="text-amber-600 font-bold">Incompleto</span>
            )}
          </CardFooter>
        </Card>

        <Card
          className={`shadow-sm border-t-4 ${workflow.status === 'Validated' || workflow.status === 'Finalized' ? 'border-t-emerald-500' : 'border-t-slate-200'}`}
        >
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Lock
                className={`w-5 h-5 ${workflow.status === 'Validated' || workflow.status === 'Finalized' ? 'text-emerald-500' : 'text-slate-400'}`}
              />
              Selo de Autenticidade
            </CardTitle>
            <CardDescription>Assinatura digital e bloqueio do registro clínico.</CardDescription>
          </CardHeader>
          <CardContent>
            {workflow.status === 'Validated' || workflow.status === 'Finalized' ? (
              <div className="space-y-4">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col items-center text-center">
                  <Fingerprint className="w-12 h-12 text-emerald-500 mb-2 opacity-80" />
                  <h4 className="font-bold text-emerald-900">Diagnóstico Selado e Autenticado</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Validado por {workflow.validatedBy} em{' '}
                    {new Date(workflow.validatedAt!).toLocaleDateString()}
                  </p>
                  <div className="mt-4 bg-white px-3 py-1.5 rounded border border-emerald-100 w-full">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block text-left mb-1">
                      Hash de Integridade (SHA-256)
                    </span>
                    <span className="font-mono text-xs text-slate-700 break-all">
                      {workflow.signature.hash}
                    </span>
                  </div>
                </div>
                {workflow.status === 'Validated' && !workflow.isDataCompromised && (
                  <Button
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => simulateDataCompromise(patient.id)}
                  >
                    (DEV) Simular Alteração de Dados
                  </Button>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center">
                <FileSignature className="w-10 h-10 text-slate-300 mb-4" />
                <p className="text-sm text-slate-600 mb-6">
                  Para validar o diagnóstico e gerar o Hash de integridade, todos os critérios do
                  Biograma devem estar completos.
                </p>
                <Button
                  onClick={handleSign}
                  disabled={!allCriteriaMet || workflow.isDataCompromised}
                  className="bg-rose-600 hover:bg-rose-700 w-full"
                >
                  <Fingerprint className="w-4 h-4 mr-2" /> Assinar e Validar
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
