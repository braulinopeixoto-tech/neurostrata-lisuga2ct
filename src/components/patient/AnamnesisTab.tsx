import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AnamnesisTab({ patient }: { patient: any }) {
  return (
    <div className="animate-fade-in space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Dados Biopsicossociais</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
              Contexto Familiar
            </h4>
            <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md">
              {patient.familyContext || 'Não informado.'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
              Histórico Médico
            </h4>
            <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md">
              {patient.medicalHistory || 'Não informado.'}
            </p>
          </div>
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase">
                Sintomatologia Principal
              </h4>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100"
              >
                <Link
                  to={`/neuronavigation?q=${encodeURIComponent(
                    patient.symptoms || patient.neuroHistory || '',
                  )}`}
                >
                  <Compass className="w-3 h-3 mr-1" /> Neuronavegação
                </Link>
              </Button>
            </div>
            <p className="text-sm bg-muted/30 border border-border/50 p-3 rounded-md min-h-[60px]">
              {patient.symptoms || patient.neuroHistory || 'Sem queixas registradas.'}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Domínios Funcionais (Histórico)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                Desenvolvimento
              </h4>
              <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                {patient.developmentHistory || 'Normativo.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                Cognição
              </h4>
              <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                {patient.cognition || 'Preservado em vias gerais.'}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                Regulação Emocional
              </h4>
              <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                {patient.emotionalRegulation || 'Sem alterações severas relatadas na admissão.'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1 text-muted-foreground uppercase">
                Comportamento Social & Adaptativo
              </h4>
              <p className="text-sm text-foreground bg-white border p-3 rounded-md min-h-[50px]">
                {patient.socialBehavior || patient.adaptiveFunctioning || 'Adequado ao contexto.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
