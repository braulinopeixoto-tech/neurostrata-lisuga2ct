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
import { FileText, ShieldCheck, Download } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'

export function ReportTab() {
  const { patients } = useAppStore()
  const { formulas, monitoringLogs } = usePharmacyStore()
  const { addDocument } = useTrustStore()
  const [patientId, setPatientId] = useState('')
  const [generated, setGenerated] = useState(false)

  const formula = formulas.find((f) => f.patientId === patientId)
  const log = monitoringLogs[patientId]?.[0]

  const handleGenerate = () => {
    if (!patientId || !formula) {
      toast({
        title: 'Atenção',
        description: 'Paciente não possui fórmula registrada.',
        variant: 'destructive',
      })
      return
    }
    setGenerated(true)
    toast({ title: 'Relatório Gerado', description: 'A síntese farmacêutica foi compilada.' })
  }

  const handleSeal = () => {
    const doc = {
      id: `NS-PHARM-${Date.now()}`,
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Mock hash
      vts: 90,
      status: 'Valid' as const,
      jsonData: {
        patient_hash: '8d969eef...',
        professional_id: 'Farmacêutico Clínico',
        supervisor_id: null,
        instrumentos: ['Mapeamento Clínico Farmacêutico'],
        frameworks: ['Integrado'],
        algoritmo_version: '1.0',
        data_coleta: new Date().toISOString(),
        data_emissao: new Date().toISOString(),
        consistency_score: 0.95,
        risk_level: 'baixo' as const,
      },
    }
    addDocument(doc)
    toast({
      title: 'Documento Selado',
      description: 'Registro salvo na Trust Layer™ com sucesso.',
      action: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" /> Pharmaceutical Quick Report
          </CardTitle>
          <CardDescription>
            Gere um relatório integrado da conduta magistral e evolução clínica.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Select
            value={patientId}
            onValueChange={(v) => {
              setPatientId(v)
              setGenerated(false)
            }}
          >
            <SelectTrigger className="w-full sm:w-[300px]">
              <SelectValue placeholder="Selecione o paciente..." />
            </SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGenerate} className="w-full sm:w-auto">
            Compilar Relatório
          </Button>
        </CardContent>
      </Card>

      {generated && formula && (
        <Card className="border-t-4 border-t-slate-800 shadow-elevation animate-fade-in-up">
          <CardContent className="p-8">
            <div className="border-b-2 border-slate-200 pb-4 mb-6 text-center">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-800">
                Relatório Farmacêutico Clínico
              </h2>
              <p className="text-sm text-muted-foreground mt-1">Integração Neurofuncional</p>
            </div>

            <div className="space-y-6 text-sm text-slate-700">
              <section className="bg-slate-50 p-4 rounded border">
                <h4 className="font-bold uppercase text-xs mb-2 text-slate-500">
                  Objetivo Clínico e Prescrição
                </h4>
                <p className="mb-3">
                  <strong>Finalidade:</strong> {formula.objective}
                </p>
                <pre className="font-mono text-xs bg-white p-3 border rounded leading-relaxed">
                  {formula.output}
                </pre>
                <p className="mt-3">
                  <strong>Status de Validação:</strong> {formula.status}
                </p>
              </section>

              {log && (
                <section className="bg-blue-50 p-4 rounded border border-blue-100">
                  <h4 className="font-bold uppercase text-xs mb-2 text-blue-800">
                    Evolução e Monitoramento
                  </h4>
                  <div className="space-y-2">
                    <p>
                      <strong>Data de Registro:</strong> {new Date(log.date).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Adesão Reportada:</strong> {log.adherence}/10
                    </p>
                    <p>
                      <strong>Efeitos Subjetivos:</strong> {log.effects}
                    </p>
                    {log.qeegCurrent && (
                      <p>
                        <strong>Modulação qEEG Verificada:</strong> {log.qeegCurrent}
                      </p>
                    )}
                  </div>
                </section>
              )}

              <section className="text-center pt-8 mt-8 border-t border-dashed">
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Relatório gerado via módulo de acompanhamento clínico. A eficácia da fórmula
                  magistral depende da adesão contínua e avaliação médica regular.
                </p>
              </section>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" /> Exportar PDF
              </Button>
              <Button className="bg-slate-800 hover:bg-slate-700" onClick={handleSeal}>
                <ShieldCheck className="w-4 h-4 mr-2" /> Selar na Trust Layer™
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
