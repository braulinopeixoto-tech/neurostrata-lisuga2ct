import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldCheck, Fingerprint, Lock, CheckCircle2 } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function TabSignature() {
  const { data, updateData } = useReportStore()
  const { currentUser } = useAppStore()
  const [signing, setSigning] = useState(false)

  const handleSign = () => {
    setSigning(true)
    setTimeout(() => {
      updateData({
        isSigned: true,
        signature: {
          hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          timestamp: new Date().toISOString(),
          ip: '187.45.22.11',
          standard: 'NeuroStrata Trust Layer™ / ICP-Brasil A3',
        },
      })
      setSigning(false)
      toast({
        title: 'Documento Assinado',
        description: 'Laudo selado criptograficamente com sucesso na Trust Layer™.',
        action: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      })
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card
        className={
          data.isSigned ? 'border-emerald-500 border-t-4' : 'border-t-4 border-t-slate-800'
        }
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck
              className={`w-6 h-6 ${data.isSigned ? 'text-emerald-500' : 'text-slate-800'}`}
            />
            Assinatura Digital Trust Layer™
          </CardTitle>
          <CardDescription>
            Finalize e sele o laudo utilizando seu certificado digital para conferir validade
            clínica e jurídica irrefutável, vinculando-o ao Biograma validado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!data.isSigned ? (
            <div className="flex flex-col items-center justify-center p-10 bg-slate-50 border border-dashed rounded-xl">
              <Fingerprint className="w-16 h-16 text-slate-300 mb-4" />
              <p className="text-slate-600 mb-6 text-center max-w-sm">
                Ao assinar este documento, ele será bloqueado para edições e um Hash criptográfico
                será gerado e associado à Validação Diagnóstica (Biograma) do paciente.
              </p>
              <Button
                onClick={handleSign}
                disabled={signing}
                size="lg"
                className="bg-slate-800 hover:bg-slate-700 text-white w-full sm:w-auto"
              >
                {signing
                  ? 'Processando Criptografia...'
                  : `Assinar Digitalmente como ${currentUser.fullName}`}
              </Button>
            </div>
          ) : (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl relative overflow-hidden">
              <Lock className="w-32 h-32 absolute -right-4 -top-4 text-emerald-100 opacity-50" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
                  <CheckCircle2 className="w-6 h-6" /> Documento Finalizado e Selado
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-emerald-900/80">
                  <div>
                    <strong className="block text-emerald-900 mb-1">Responsável Técnico</strong>
                    {currentUser.fullName} <br /> {currentUser.registrationId}
                  </div>
                  <div>
                    <strong className="block text-emerald-900 mb-1">Carimbo de Tempo</strong>
                    {new Date(data.signature.timestamp).toLocaleString('pt-BR')}
                  </div>
                  <div className="sm:col-span-2">
                    <strong className="block text-emerald-900 mb-1">
                      Padrão e Hash de Integridade (SHA-256)
                    </strong>
                    <div className="font-mono text-xs bg-emerald-100/50 p-2 rounded border border-emerald-200 break-all">
                      {data.signature.standard} | {data.signature.hash}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
