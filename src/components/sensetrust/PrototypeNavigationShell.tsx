import type { ReactNode } from 'react'
import type { SenseTrustPrototypeNavigationItem, SenseTrustPrototypeRoute } from '@/types/sensetrust/prototype-ux'
import { PrototypeDisclosureBanner } from './PrototypeDisclosureBanner'

interface PrototypeNavigationShellProps {
  navigation: SenseTrustPrototypeNavigationItem[]
  activeRoute: SenseTrustPrototypeRoute
  onSelectRoute?: (path: string) => void
  children: ReactNode
}

export function PrototypeNavigationShell({ navigation, activeRoute, onSelectRoute, children }: PrototypeNavigationShellProps) {
  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-sm">
      <header className="border-b bg-slate-950 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xl font-black">SenseTrust</p>
            <p className="text-sm text-slate-300">Prototype UX / Public routes simulated</p>
          </div>
          <button type="button" className="rounded-md bg-emerald-400 px-3 py-2 text-sm font-black text-slate-950">{activeRoute.primary_cta.label}</button>
        </div>
        <nav className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {navigation.map((item) => (
            <button
              key={item.nav_id}
              type="button"
              onClick={() => onSelectRoute?.(item.route_path)}
              className={`shrink-0 rounded-md px-3 py-2 text-sm font-semibold ${item.route_path === activeRoute.route_path ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>
      <div className="p-4">
        <PrototypeDisclosureBanner />
        <div className="mt-4">{children}</div>
      </div>
      <footer className="border-t bg-slate-50 p-4 text-sm text-slate-600">
        NeuroStrata / VitalStrata / DNDA / BLC / Trust Layer / SenseTrust Layer / LGPD / Neurodireitos / Metadata Only
      </footer>
    </div>
  )
}
