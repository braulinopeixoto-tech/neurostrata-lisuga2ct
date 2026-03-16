import { useState } from 'react'
import { ShieldCheck, Lock, Fingerprint, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useReportStore from '@/stores/useReportStore'
import useAppStore from '@/stores/useAppStore'

export function TabSignature() {
  const { data, updateData } = useReportStore()
  const { currentUser } = useAppStore()
  const [pin, setPin] = useState('')
  const [isSigning, setIsSigning] = useState(false)

  const handleSign = () => {
    if (pin.length < 4) return
    setIsSigning(true)

    // Simulate cryptographic delay
    setTimeout(() => {
      const generatedHash = Array.from({ length: 64 }, () =>
        Math.floor(Math.random() * 16).toString(16),
      ).join('')

      updateData({
        isSigned: true,
        signature: {
          name: currentUser.fullName,
          professionalId: currentUser.registrationId,
          timestamp: new Date().toISOString(),
          hash: generatedHash,
          standard: 'ICP-Brasil Nível A3',
        },
      })
      setIsSigning(false)
    }, 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <Card className="border-t-4 border-t-emerald-600 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Fingerprint className="w-6 h-6 text-emerald-600" /> Governança e Assinatura Digital
          </CardTitle>
          <CardDescription>
            Aplique sua assinatura digital (Padrão ICP-Brasil) para finalizar este laudo. Após
            assinado, o documento ganha validade jurídica.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.isSigned && data.signature ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3 text-emerald-800">
                <ShieldCheck className="w-8 h-8" />
                <div>
                  <h4 className="font-bold text-lg leading-tight">Documento Assinado e Selado</h4>
                  <p className="text-sm opacity-80">
                    A integridade do relatório está garantida criptograficamente.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white p-4 rounded border">
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] font-bold">
                    Profissional
                  </span>
                  <p className="font-medium">{data.signature.name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] font-bold">
                    Registro
                  </span>
                  <p className="font-medium">{data.signature.professionalId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] font-bold">
                    Data/Hora
                  </span>
                  <p className="font-medium">
                    {new Date(data.signature.timestamp).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] font-bold">
                    Padrão
                  </span>
                  <p className="font-medium">{data.signature.standard}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <span className="text-muted-foreground uppercase text-[10px] font-bold">
                    Hash de Integridade (SHA-256)
                  </span>
                  <p className="font-mono text-xs break-all bg-muted px-2 py-1 rounded mt-1">
                    {data.signature.hash}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted/30 p-4 rounded-lg border flex items-start gap-4">
                <Lock className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm text-slate-600 leading-relaxed">
                  Ao assinar este documento, você atesta a veracidade das informações dos 17 blocos
                  funcionais. Este ato é irreversível na versão atual do documento, sendo necessário
                  gerar um termo de retificação para futuras alterações.
                </div>
              </div>

              <div className="space-y-4 max-w-sm">
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN do Certificado Digital (A3 / Nuvem)</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="••••••••"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                  />
                </div>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSign}
                  disabled={isSigning || pin.length < 4}
                >
                  {isSigning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processando Criptografia...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 mr-2" /> Assinar Digitalmente
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
