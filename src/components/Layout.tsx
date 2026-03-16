import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { AppSidebar } from './AppSidebar'
import { AppHeader } from './AppHeader'

export default function Layout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background overflow-hidden print:bg-white print:overflow-visible print:h-auto print:block">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 w-full overflow-hidden transition-all duration-300 print:overflow-visible print:h-auto print:block">
          <div className="print:hidden">
            <AppHeader />
          </div>
          <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fade-in-up print:p-0 print:overflow-visible print:h-auto print:block">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
