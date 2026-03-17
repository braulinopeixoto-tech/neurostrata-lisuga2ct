import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Activity, Apple, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function SupervisionDashboardTab() {
  const { patients, nutritionProfiles } = useAppStore()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Apple className="w-5 h-5 text-green-600" /> Pacientes em Acompanhamento Funcional
          </CardTitle>
          <CardDescription>
            Visão geral da adesão e resposta clínica das condutas nutricionais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Perfil Metabólico</TableHead>
                <TableHead>Score Intestinal</TableHead>
                <TableHead>Evolução Geral</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {nutritionProfiles.map((prof) => {
                const p = patients.find((pat) => pat.score >= 0) // fallback mock logic for demo
                return (
                  <TableRow key={prof.id}>
                    <TableCell className="font-medium">{p?.name || 'Carlos Oliveira'}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-rose-600 border-rose-200 bg-rose-50">
                        {prof.metabolic_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-muted rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-amber-500 h-2 rounded-full"
                            style={{ width: `${prof.gut_health_score}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono">{prof.gut_health_score}/100</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-emerald-600 flex items-center gap-1 text-xs font-semibold">
                      <Activity className="w-3 h-3" /> Resposta Positiva
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Em Conduta
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
