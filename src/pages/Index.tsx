import { Link } from 'react-router-dom'
import {
  User,
  Scale,
  ShieldCheck,
  Network,
  Activity,
  AlertCircle,
  FileCheck,
  BrainCircuit,
  History,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrustSection } from '@/components/TrustSection'
import { cn } from '@/lib/utils'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'

const portals = [
  {
    title: 'Portal do Paciente',
    icon: User,
    path: '/patient-portal',
    borderClass: 'border-t-emerald-500',
    iconClass: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Portal do Auditor',
    icon: ShieldCheck,
    path: '/auditor-portal',
    borderClass: 'border-t-amber-500',
    iconClass: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Portal do Defensor',
    icon: Scale,
    path: '/defensor-portal',
    borderClass: 'border-t-slate-800',
    iconClass: 'bg-slate-100 text-slate-800',
  },
]

export default function Index() {
  const { caseWorkspaces, vitalSnapshots, auditLogs } = useTeamFlowStore()
  const { patients } = useAppStore()

  const activeCases = caseWorkspaces.filter((c) => c.status !== 'Laudo Validado')
  const validatedCount = caseWorkspaces.length - activeCases.length
  const criticalAlerts = vitalSnapshots.filter(
    (vs) => vs.alert_level === 'Red' || vs.alert_level === 'Orange',
  )

  const getPatientName = (id: string) => patients.find((p) => p.id === id)?.name || id

  return (
    <div className="space-y-8 animate-fade-in-up pb-16 max-w-6xl mx-auto px-2 sm:px-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-8 rounded-xl border border-slate-800 shadow-elevation relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Activity className="w-64 h-64 -mt-10 -mr-10 text-white" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-400" /> Command Center (Ledger Clínico)
          </h1>
          <p className="text-slate-400 mt-2 max-w-2xl text-sm leading-relaxed">
            Visão geral do ecossistema NeuroStrata. Controle em tempo real do fluxo de convergência
            clínica, alertas sentinela do VitalScore™ e registro imutável da Trust Layer™.
          </p>
        </div>
        <Button
          asChild
          className="bg-indigo-600 hover:bg-indigo-500 text-white relative z-10 w-full sm:w-auto"
        >
          <Link to="/teamflow">Acessar Team Flow</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between">
              Modelos em Convergência <BrainCircuit className="w-4 h-4 text-indigo-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeCases.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-t-4 border-t-rose-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between">
              Alertas Críticos (VitalScore) <AlertCircle className="w-4 h-4 text-rose-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-600">{criticalAlerts.length}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex justify-between">
              Laudos Certificados <FileCheck className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">{validatedCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Network className="w-5 h-5 text-indigo-600" /> Fila de Casos (Team Flow)
          </h2>
          {activeCases.slice(0, 3).map((cw) => (
            <Card
              key={cw.id}
              className="shadow-sm hover:shadow-md transition-shadow group border-l-4 border-l-indigo-500"
            >
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold text-slate-900 leading-tight group-hover:text-indigo-700 transition-colors">
                      {cw.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Paciente: {getPatientName(cw.patient_id)}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-indigo-50 text-indigo-700">
                    {cw.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-xs mt-4 pt-4 border-t border-slate-100">
                  <div className="flex gap-4">
                    <span className="font-semibold text-slate-500">
                      BIM: <span className="text-emerald-600">{cw.consistency_score}%</span>
                    </span>
                    <span className="font-semibold text-slate-500">
                      Risco: <span className="text-rose-600">{cw.risk_score}%</span>
                    </span>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="h-7 text-indigo-600">
                    <Link to={`/teamflow/cases/${cw.id}`}>Abrir</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {activeCases.length === 0 && (
            <div className="text-center p-8 bg-slate-50 border border-dashed rounded-xl text-muted-foreground text-sm">
              Nenhum caso na fila.
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" /> Ledger Clínico (Trust Layer™)
          </h2>
          <Card className="shadow-sm bg-slate-50 border-slate-200">
            <CardContent className="p-0">
              <div className="p-4 border-b border-slate-200 bg-white rounded-t-xl flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-700">
                  Últimas Validações de Bloco
                </span>
                <History className="w-4 h-4 text-slate-400" />
              </div>
              <div className="p-4 space-y-4">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-start gap-3 text-sm">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <div>
                      <p className="text-slate-700 font-medium">
                        {log.action}{' '}
                        <span className="text-slate-500 font-normal">por {log.actor_id}</span>
                      </p>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {new Date(log.timestamp).toLocaleString('pt-BR')} • {log.id}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {criticalAlerts.length > 0 && (
            <Card className="shadow-sm border-l-4 border-l-rose-500 bg-rose-50/50">
              <CardHeader className="py-3 px-4 border-b border-rose-100">
                <CardTitle className="text-sm text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> Alertas Sentinela Ativos
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {criticalAlerts.slice(0, 2).map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-white p-3 rounded border border-rose-100 shadow-sm text-sm"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <strong className="text-slate-700">
                        Paciente: {getPatientName(alert.patient_id)}
                      </strong>
                      <Badge variant="destructive" className="text-[10px]">
                        Risco {alert.alert_level}
                      </Badge>
                    </div>
                    <p className="text-slate-500 text-xs">
                      VitalScore: {alert.total_score} | Tendência: {alert.trend}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="pt-8">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Portais de Acesso Externo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portals.map((portal, i) => (
            <Link key={i} to={portal.path} className="block group">
              <Card
                className={cn(
                  'h-full border-t-4 hover:shadow-md transition-all bg-white',
                  portal.borderClass,
                )}
              >
                <CardHeader className="p-5 flex flex-row items-center gap-4 space-y-0">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                      portal.iconClass,
                    )}
                  >
                    <portal.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{portal.title}</CardTitle>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <TrustSection />
    </div>
  )
}
