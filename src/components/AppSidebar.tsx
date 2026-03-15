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
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'

export function AppSidebar() {
  const location = useLocation()

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Pacientes', path: '/patients', icon: Users },
    { name: 'Profissionais', path: '/professionals', icon: Stethoscope },
    { name: 'Nova Avaliação', path: '/assessment', icon: ActivitySquare },
    { name: 'Farmacopeia', path: '/pharmacopeia', icon: FlaskConical },
    { name: 'Neuronavegação Guiada', path: '/neuronavigation', icon: Compass },
    { name: 'Biblioteca de Protocolos', path: '/protocols', icon: BookOpen },
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
