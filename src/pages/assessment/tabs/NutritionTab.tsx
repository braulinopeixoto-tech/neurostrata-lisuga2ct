import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Apple, Lock, ShieldCheck, Link as LinkIcon, Activity, Flame } from 'lucide-react'
import { toast } from 'sonner'
import { Progress } from '@/components/ui/progress'

export default function NutritionTab({ patient }: { patient: any }) {
  const [sealed, setSealed] = useState(false)

  const handleSeal = () => {
    setSealed(true)
    toast.success('Autenticidade selada. Hash: z1y2x3w4v5u6t7s8...')
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Apple className="w-5 h-5 text-primary" /> Avaliação Nutricional e Metabólica
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
            <strong>Impacto em outras áreas:</strong> Níveis sub-ótimos de Vitamina B12 e Ferritina
            foram mapeados, o que pode exacerbar a fadiga cognitiva e reduzir a eficácia dos treinos
            de função executiva (Neuropsicologia).
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" /> Marcadores Séricos (HL7 FHIR)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm items-center">
                <span className="font-medium">Vitamina B12</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono">210 pg/mL</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-rose-50 text-rose-700 border-rose-200"
                  >
                    Atenção
                  </Badge>
                </div>
              </div>
              <Progress value={30} className="h-2 [&>div]:bg-rose-500" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm items-center">
                <span className="font-medium">Vitamina D (25-OH)</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono">42 ng/mL</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200"
                  >
                    Adequado
                  </Badge>
                </div>
              </div>
              <Progress value={70} className="h-2 [&>div]:bg-emerald-500" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm items-center">
                <span className="font-medium">Ferritina</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-mono">25 ng/mL</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-amber-50 text-amber-700 border-amber-200"
                  >
                    Limítrofe
                  </Badge>
                </div>
              </div>
              <Progress value={45} className="h-2 [&>div]:bg-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Flame className="w-4 h-4 text-muted-foreground" /> Conduta Nutricional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
                <span className="text-sm font-medium">Perfil Alimentar</span>
                <span className="text-sm text-slate-600">Risco pró-inflamatório moderado</span>
              </div>
              <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
                <span className="text-sm font-medium">Hidratação</span>
                <span className="text-sm text-slate-600">~1.2L / dia (Baixa)</span>
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Prescrição e Suplementação
              </h4>
              <ul className="text-sm text-slate-700 space-y-2 list-disc pl-4 marker:text-primary">
                <li>Suplementação de Metilcobalamina 1000mcg/dia.</li>
                <li>Adequação de ingestão hídrica para 2.5L/dia.</li>
                <li>Redução de ultraprocessados para controle inflamatório global.</li>
              </ul>
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
