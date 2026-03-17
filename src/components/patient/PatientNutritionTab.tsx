import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Apple, Activity, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function PatientNutritionTab({ patient }: { patient: any }) {
  const { nutritionProfiles, nutritionTracking } = useAppStore()

  const profile = nutritionProfiles.find((p) => p.id === 'NP001') // using mock ID
  const tracking =
    nutritionTracking.find((t) => t.patient_id === patient.id) || nutritionTracking[0]

  if (!profile) {
    return (
      <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
        Nenhum perfil de nutrição funcional registrado para este paciente.
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-green-700">
            <Apple className="w-5 h-5" /> Perfil Nutricional Funcional
          </h2>
          <p className="text-sm text-muted-foreground">
            Correlação entre metabolismo e neurofuncionamento.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground">
              Status Metabólico (Eixo Intestino-Cérebro)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs uppercase text-muted-foreground font-semibold">
                Tipo Metabólico
              </span>
              <p className="font-medium text-lg text-rose-600">{profile.metabolic_type}</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Saúde Intestinal (Gut Health)</span>
                <span className="text-amber-600 font-bold">{profile.gut_health_score}/100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${profile.gut_health_score}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Risco Inflamatório Sistêmico</span>
                <span className="text-rose-600 font-bold">{profile.inflammatory_score}/100</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-rose-500 h-2 rounded-full"
                  style={{ width: `${profile.inflammatory_score}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-foreground flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" /> Último Registro Clínico
            </CardTitle>
            <CardDescription>{new Date(tracking.timestamp).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div>
              <strong className="text-muted-foreground block text-xs uppercase mb-1">
                Queixas / Sintomas:
              </strong>
              <div className="flex flex-wrap gap-2">
                {tracking.symptoms.map((s, i) => (
                  <Badge key={i} variant="secondary">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <strong className="text-muted-foreground block text-xs uppercase mb-1">
                Padrão Alimentar Reportado:
              </strong>
              <p className="bg-slate-50 p-2 rounded border italic">{tracking.diet_log}</p>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-muted-foreground text-xs uppercase">
                Energia Global (1-10):
              </strong>
              <span className="font-bold text-amber-600">{tracking.energy_level}/10</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
