import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ActivitySquare,
  BookOpen,
  Settings,
  BrainCircuit,
  Stethoscope,
  FlaskConical,
  Compass,
  ShieldAlert,
  FileArchive,
  TrendingUp,
  Activity,
  UserCircle,
  Scale,
  Brain,
  Apple,
  MessageSquare,
  GraduationCap,
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

  const navItems = [
    { name: 'Início', path: '/', icon: LayoutDashboard },
    { name: 'Área Médica', path: '/medical', icon: Stethoscope },
    { name: 'Área Neuropsicológica', path: '/neuropsychology', icon: Brain },
    { name: 'Área Nutricional', path: '/nutrition', icon: Apple },
    { name: 'Área Fono', path: '/speech-therapy', icon: MessageSquare },
    { name: 'Área Psicopedagogia', path: '/psychopedagogy', icon: GraduationCap },
    { name: 'Gestão Macro', path: '/dashboard', icon: Activity },
    { name: 'Pacientes', path: '/patients', icon: Users },
    { name: 'Profissionais', path: '/professionals', icon: Stethoscope },
    { name: 'Nova Avaliação', path: '/assessment', icon: ActivitySquare },
    { name: 'Gestão Metabólica', path: '/gestao-metabolica', icon: FlaskConical },
    { name: 'Neuronavegação Guiada', path: '/neuronavigation', icon: Compass },
    { name: 'Biblioteca de Protocolos', path: '/protocols', icon: BookOpen },
    { name: 'Central de Relatórios', path: '/report-center', icon: FileArchive },
    { name: 'Portal do Auditor', path: '/auditor-portal', icon: ShieldAlert },
    { name: 'Portal do Defensor', path: '/defensor-portal', icon: Scale },
    { name: 'Evolução e Performance', path: '/performance-timeline', icon: TrendingUp },
    { name: 'Portal do Paciente', path: '/patient-portal', icon: UserCircle },
  ]

  return (
    <Sidebar variant="inset" className="border-r border-border">
      <SidebarHeader className="p-4 flex items-center justify-center">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <BrainCircuit className="w-6 h-6 text-accent" />
          <span>NeuroStrata</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-4">
        {activePatient && riskStatus && (
          <SidebarGroup className="mb-2 p-0">
            <SidebarGroupLabel className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
              Alerta de Risco: Paciente Atual
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <div
                className={`p-3 rounded-lg border ${riskStatus.bg} ${riskStatus.border} flex flex-col items-center gap-3`}
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
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                <span>Configurações</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
