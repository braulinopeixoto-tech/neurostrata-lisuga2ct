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
import { ShieldCheck, FileText, Download } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'

export function IntegratedReportTab() {
  const { patients, currentUser } = useAppStore()
  const { examRequests, interventions } = usePharmacyStore()
  const { addDocument } = useTrustStore()
  const [patientId, setPatientId] = useState('')
  const [generated, setGenerated] = useState(false)

  const patientExams = examRequests.filter((e) => e.patientId === patientId)
  const patientInterventions = interventions.filter((i) => i.patientId === patientId)

  const handleGenerate = () => {
    if (!patientId) {
      toast({
        title: 'Atenção',
        description: 'Selecione um paciente primeiro.',
        variant: 'destructive',
      })
      return
    }
    setGenerated(true)
  }

  const handleSeal = () => {
    const doc = {
      id: `NS-CLIN-${Date.now()}`,
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // Mock hash for visual feedback
      vts: 95,
      status: 'Valid' as const,
      jsonData: {
        patient_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
        professional_id: currentUser.registrationId,
        supervisor_id: null,
        instrumentos: ['Perfil Metabólico e Funcional'],
        frameworks: ['NeuroStrata Integrated Axis'],
        algoritmo_version: '1.2.0',
        data_coleta: new Date().toISOString(),
        data_emissao: new Date().toISOString(),
        consistency_score: 0.98,
        risk_level: 'baixo' as const,
      },
    }
    addDocument(doc)
    toast({
      title: 'Dossiê Selado',
      description: 'O relatório clínico-metabólico foi gravado na Trust Layer™ de forma imutável.',
      action: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="w-5 h-5 text-slate-800" /> Relatório Clínico Funcional
          </CardTitle>
          <CardDescription>
            Consolide as correlações neuro-metabólicas e intervenções com rastreabilidade
            criptográfica.
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
              <SelectValue placeholder="Selecione o paciente alvo..." />
            </SelectTrigger>
            <SelectContent>
              {patients.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={handleGenerate}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700"
          >
            Compilar Dossiê Analítico
          </Button>
        </CardContent>
      </Card>

      {generated && (
        <Card className="shadow-elevation animate-fade-in-up bg-white">
          <CardContent className="p-8">
            <div className="border-b-2 border-slate-200 pb-4 mb-8 text-center">
              <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-800">
                Dossiê Neuro-Metabólico
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Validado e Rastreado
              </p>
            </div>

            <div className="space-y-8 text-sm text-slate-700">
              <section className="bg-slate-50 p-6 rounded-lg border border-slate-200 shadow-sm">
                <h4 className="font-bold uppercase text-xs mb-4 text-slate-600 tracking-widest">
                  Resumo de Biomarcadores Avaliados
                </h4>
                {patientExams.length === 0 ? (
                  <p className="text-muted-foreground italic text-xs">
                    Nenhum exame biomarcador registrado na sessão atual.
                  </p>
                ) : (
                  <ul className="space-y-3 list-disc pl-5">
                    {patientExams.map((ex) => (
                      <li key={ex.id} className="leading-relaxed">
                        <strong className="text-slate-800">{ex.biomarcador}</strong> (Eixo:{' '}
                        <span className="italic">{ex.eixo}</span>) <br />
                        <span className="text-xs text-muted-foreground">
                          Impacto Esperado: {ex.impacto_funcional} | Status Corrente:{' '}
                          <span className="font-semibold uppercase">{ex.status}</span>{' '}
                          {ex.resultado && `[Aferição: ${ex.resultado}]`}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="bg-blue-50/50 p-6 rounded-lg border border-blue-100 shadow-sm">
                <h4 className="font-bold uppercase text-xs mb-4 text-blue-800 tracking-widest">
                  Intervenções Funcionais Concluídas
                </h4>
                {patientInterventions.length === 0 ? (
                  <p className="text-blue-600/70 italic text-xs">
                    Nenhuma intervenção terapêutica funcional validada.
                  </p>
                ) : (
                  <ul className="space-y-3 list-disc pl-5 text-blue-900">
                    {patientInterventions.map((inv) => (
                      <li key={inv.id} className="leading-relaxed">
                        <strong className="text-blue-950">{inv.necessidade}</strong> (Prioridade:{' '}
                        <span className="uppercase text-[10px] font-bold">{inv.prioridade}</span>){' '}
                        <br />
                        <span className="text-xs opacity-80">
                          Eixo Direcionado: {inv.eixo} | Status Regulatório:{' '}
                          {inv.status === 'validada'
                            ? 'Validada pelo Profissional'
                            : 'Pendente de Validação'}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="border-t border-dashed border-slate-300 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900 text-slate-300 p-5 rounded-lg shadow-inner gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Responsável Técnico
                  </p>
                  <p className="font-bold text-slate-100 text-base">{currentUser.fullName}</p>
                  <p className="text-xs font-mono mt-0.5">{currentUser.registrationId}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
                    Assinatura Digital (Hash)
                  </p>
                  <p className="font-mono text-emerald-400 text-xs bg-black/50 py-1 px-2 rounded break-all">
                    d41d8cd98f00b204e9800998ecf8427e
                  </p>
                </div>
              </section>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 border-t pt-6">
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" /> Exportar PDF Criptografado
              </Button>
              <Button
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleSeal}
              >
                <ShieldCheck className="w-4 h-4 mr-2" /> Registrar e Selar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
