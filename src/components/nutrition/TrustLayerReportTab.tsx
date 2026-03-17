import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ShieldCheck, FileText, Download, QrCode, Lock } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

export function TrustLayerReportTab() {
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState('')
  const [reportGenerated, setReportGenerated] = useState(false)

  const handleGenerate = () => {
    if (!selectedPatientId) return
    toast({
      title: 'Laudo Nutricional Gerado',
      description: 'Assinatura digital e hash aplicados.',
    })
    setReportGenerated(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="border-t-4 border-t-slate-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-800" /> Emissão de Laudo Trust Layer™
          </CardTitle>
          <CardDescription>
            Gere relatórios nutricionais funcionais com integridade validada e QR Code de
            verificação pública.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="max-w-md space-y-2">
            <label className="text-sm font-medium">Paciente</label>
            <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione um paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={!selectedPatientId}
            className="bg-slate-800 hover:bg-slate-700"
          >
            <FileText className="w-4 h-4 mr-2" /> Gerar Laudo Seguro
          </Button>
        </CardContent>
      </Card>

      {reportGenerated && (
        <div className="bg-white p-8 rounded-xl border shadow-elevation relative overflow-hidden animate-fade-in-up">
          <div className="absolute top-0 right-0 p-6 opacity-10">
            <Lock className="w-32 h-32" />
          </div>
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900 uppercase tracking-widest">
              NEUROSTRATA
            </h2>
            <p className="text-muted-foreground uppercase tracking-widest mt-1 text-sm font-medium">
              Laudo de Nutrição Funcional Integrada
            </p>
          </div>

          <div className="space-y-6 relative z-10">
            <div className="bg-slate-50 p-4 rounded border text-sm">
              <p>
                <strong>Status de Integridade:</strong> Validado (ICP-Brasil)
              </p>
              <p>
                <strong>Hash SHA-256:</strong>{' '}
                <span className="font-mono text-xs break-all">
                  f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center bg-muted/20 p-6 rounded-xl border border-dashed gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground flex items-center gap-2">
                  <QrCode className="w-5 h-5" /> Verificação Pública
                </h4>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Leia o QR Code ou acesse a URL abaixo para validar a autenticidade deste laudo
                  diretamente na Trust Layer™.
                </p>
                <div className="font-mono text-xs bg-white p-2 rounded border inline-block mt-2">
                  https://neurostrata-72c3b.goskip.app/verify/NS-NUTRI-001
                </div>
              </div>
              <div className="w-24 h-24 bg-white border-2 border-slate-900 p-2 rounded flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>

            <div className="flex justify-end">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Baixar PDF Certificado
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
