import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Stethoscope, Lock, ShieldCheck, Link as LinkIcon, Activity, Pill } from 'lucide-react'
import { toast } from 'sonner'

export default function MedicineTab({ patient }: { patient: any }) {
  const [sealed, setSealed] = useState(false)

  const handleSeal = () => {
    setSealed(true)
    toast.success('Autenticidade selada. Hash: m2n3o4p5q6r7s8t9...')
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Stethoscope className="w-5 h-5 text-primary" /> Avaliação Médica / Psiquiátrica
        </h3>
        {sealed ? (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 py-1 px-3">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Trust Layer™: Auditado
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-300 py-1 px-3"
          >
            <Lock className="w-4 h-4 mr-1.5" /> Trust Layer™: Pendente
          </Badge>
        )}
      </div>

      <Card className="bg-slate-50 border-dashed border-slate-300 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2 text-slate-700">
            <LinkIcon className="w-4 h-4 text-primary" /> Convergência BIM (Interdependência)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            <strong>Impacto em outras áreas:</strong> O ajuste na dosagem do psicoestimulante requer
            monitoramento da ansiedade e da qualidade do sono, fatores que afetam diretamente a
            capacidade de atenção sustentada (Neuropsicologia).
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" /> Sinais Clínicos e Comorbidades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">TDAH (Desatento)</span>
              <Badge
                variant="outline"
                className="bg-rose-50 text-rose-700 border-rose-200 font-normal"
              >
                Primário
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">Transtorno de Ansiedade Generalizada</span>
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-700 border-amber-200 font-normal"
              >
                Secundário
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">Qualidade do Sono</span>
              <Badge variant="secondary" className="bg-slate-100 text-slate-700 font-normal">
                Fragmentado
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Pill className="w-4 h-4 text-muted-foreground" /> Prescrições e Conduta (HL7 FHIR)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="border-l-2 border-primary pl-3">
                <p className="text-sm font-medium text-slate-800">Lisdexanfetamina 30mg</p>
                <p className="text-xs text-slate-500">
                  Uso diário pela manhã. Iniciado em 10/10/2023.
                </p>
              </div>
              <div className="border-l-2 border-muted pl-3">
                <p className="text-sm font-medium text-slate-800">Melatonina 3mg</p>
                <p className="text-xs text-slate-500">Uso noturno para indução do sono.</p>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs text-slate-600 bg-slate-50 border p-3 rounded-lg shadow-inner italic">
                <span className="font-bold text-primary block mb-1 text-normal not-italic">
                  Nota Clínica:
                </span>
                Paciente relatou leve taquicardia à tarde. Recomenda-se acompanhamento pressórico
                nas próximas duas semanas antes de considerar ajuste de dose.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSeal} disabled={sealed} className="gap-2 shadow-sm">
          <Lock className="w-4 h-4" /> Selar Autenticidade (Trust Layer™)
        </Button>
      </div>
    </div>
  )
}
