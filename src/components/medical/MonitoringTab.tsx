import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, UserPlus, ArrowRight, Activity } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export function MonitoringTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm border-t-4 border-t-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-accent" /> Encaminhamento e Monitoramento
            </CardTitle>
            <CardDescription>
              Gestão de referências para outras especialidades e monitoramento contínuo de status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                <div>
                  <p className="font-medium text-sm text-primary">Carlos Oliveira</p>
                  <p className="text-xs text-muted-foreground">Fonoaudiologia</p>
                </div>
                <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                  Aguardando Avaliação
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                <div>
                  <p className="font-medium text-sm text-primary">Mariana Santos</p>
                  <p className="text-xs text-muted-foreground">Nutrição Clínica</p>
                </div>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-600 border-emerald-200"
                >
                  Em Acompanhamento
                </Badge>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Ver Todos Encaminhamentos
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" /> Evolução e Performance
            </CardTitle>
            <CardDescription>
              Acompanhe os desfechos clínicos longitudinais e métricas precisas de recuperação.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col h-full">
            <p className="text-sm text-muted-foreground mb-6 flex-1">
              Acesse o painel completo para visualizar gráficos de conectividade, performance
              executiva e estabilidade comportamental dos pacientes.
            </p>
            <Button asChild className="w-full">
              <Link to="/performance-timeline">
                Dashboard de Performance <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Alertas de Acompanhamento (Real-time)
          </CardTitle>
          <CardDescription>
            Visão geral de pacientes em programas de evolução longitudinal e alertas de
            autoavaliação diária.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Fase Atual</TableHead>
                <TableHead>Última Resposta (Autoavaliação)</TableHead>
                <TableHead>Alerta Clínico</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium text-primary">Carlos Oliveira</TableCell>
                <TableCell>Fase 2 (Platô)</TableCell>
                <TableCell className="text-muted-foreground">Hoje, 09:30 (WHO-5)</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-600 border-emerald-200"
                  >
                    Estável
                  </Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium text-primary">Roberto Fernandes</TableCell>
                <TableCell>Fase 1 (Ajuste)</TableCell>
                <TableCell className="text-muted-foreground">Ontem, 18:45 (PHQ-9)</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-rose-50 text-rose-600 border-rose-200">
                    Atenção Requerida
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
