import { Link, useLocation } from 'react-router-dom'
import {
  Users,
  ActivitySquare,
  BrainCircuit,
  Target,
  ShieldCheck,
  UserCircle,
  ShieldAlert,
  Scale,
  Brain,
  Settings,
  ChevronRight,
  Database,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import useAppStore from '@/stores/useAppStore'

export function AppSidebar() {
  const location = useLocation()
  const { patients } = useAppStore()

  const activePatientMatch = location.pathname.match(/^\/patients\/([^/]+)/)
  const activePatientId = activePatientMatch ? activePatientMatch[1] : null
  const activePatient = activePatientId ? patients.find((p) => p.id === activePatientId) : null

  const getRiskStatus = (score: number) => {
    const risk = 100 - score
    if (risk >= 50)
      return {
        level: 'Alto Risco',
        color: 'text-red-600',
        bg: 'bg-red-50',
        border: 'border-red-200',
        activeIndex: 0,
      }
    if (risk >= 20)
      return {
        level: 'Risco Moderado',
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        activeIndex: 1,
      }
    return {
      level: 'Risco Baixo (Estável)',
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200',
      activeIndex: 2,
    }
  }

  const riskStatus = activePatient ? getRiskStatus(activePatient.score) : null

  const coreNavItems = [
    { name: 'Pacientes', path: '/patients', icon: Users, color: 'text-slate-500' },
    {
      name: '1. Jornada Clínica',
      path: '/clinical-journey',
      icon: ActivitySquare,
      color: 'text-blue-600',
    },
    {
      name: '2. Núcleo Diagnóstico',
      path: '/diagnostic-core',
      icon: BrainCircuit,
      color: 'text-amber-500',
    },
    { name: '3. Intervenções', path: '/interventions', icon: Target, color: 'text-emerald-600' },
    {
      name: '4. Auditoria (Trust Layer)',
      path: '/trust-layer',
      icon: ShieldCheck,
      color: 'text-slate-900',
    },
  ]

  const portalNavItems = [
    {
      name: 'Portal do Paciente',
      path: '/patient-portal',
      icon: UserCircle,
      color: 'text-slate-500',
    },
    {
      name: 'Portal do Auditor',
      path: '/auditor-portal',
      icon: ShieldAlert,
      color: 'text-slate-500',
    },
    { name: 'Portal do Defensor', path: '/defensor-portal', icon: Scale, color: 'text-slate-500' },
  ]

  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl text-slate-900 tracking-tight"
        >
          <Brain className="w-6 h-6 text-slate-900" />
          <span>NeuroStrata</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 pt-4">
        {activePatient && riskStatus && (
          <SidebarGroup className="mb-2 p-0">
            <SidebarGroupLabel className="px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
              Contexto do Paciente
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <div
                className={`p-3 rounded-lg border ${riskStatus.bg} ${riskStatus.border} flex flex-col items-center gap-3 shadow-sm`}
              >
                <span
                  className={`text-[11px] font-bold ${riskStatus.color} uppercase text-center tracking-wider`}
                >
                  {activePatient.name.split(' ')[0]} - {riskStatus.level}
                </span>

                <div className="flex gap-3 bg-slate-900 px-4 py-2.5 rounded-full shadow-inner border border-slate-700">
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${riskStatus.activeIndex === 0 ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,1)]' : 'bg-red-500/20'}`}
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${riskStatus.activeIndex === 1 ? 'bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,1)]' : 'bg-yellow-400/20'}`}
                  />
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${riskStatus.activeIndex === 2 ? 'bg-green-500 shadow-[0_0_12px_rgba(34,197,94,1)]' : 'bg-green-500/20'}`}
                  />
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Motor Clínico OS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {coreNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      location.pathname === item.path ||
                      (item.path !== '/' && location.pathname.startsWith(item.path))
                    }
                    className="data-[active=true]:bg-slate-100 data-[active=true]:shadow-sm transition-all"
                  >
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="font-semibold text-slate-800 tracking-tight">
                        {item.name}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
            Portais Externos
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {portalNavItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-600 font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center gap-3 text-slate-500">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Configurações Base</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
