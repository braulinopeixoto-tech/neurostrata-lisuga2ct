import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  ArrowLeft,
  BrainCircuit,
  Activity,
  Layers,
  FileCheck,
  Target,
  Network,
  PieChart,
  HeartPulse,
} from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable'
import { Progress } from '@/components/ui/progress'

import { LayerTriage } from '@/components/neuromodel/LayerTriage'
import { LayerCollection } from '@/components/neuromodel/LayerCollection'
import { LayerBiomarkers } from '@/components/neuromodel/LayerBiomarkers'
import { LayerConvergence } from '@/components/neuromodel/LayerConvergence'
import { LayerPlanning } from '@/components/neuromodel/LayerPlanning'
import { LayerGraphics } from '@/components/neuromodel/LayerGraphics'
import { LayerReport } from '@/components/neuromodel/LayerReport'
import { CollaborationPanel } from '@/components/neuromodel/CollaborationPanel'
import { LayerVitalScore } from '@/components/neuromodel/LayerVitalScore'

export default function CaseWorkspaceDetail() {
  const { id } = useParams()
  const { caseWorkspaces } = useTeamFlowStore()
  const { patients } = useAppStore()
  const [activeLayer, setActiveLayer] = useState('triage')

  const cw = caseWorkspaces.find((c) => c.id === id)
  const patient = cw ? patients.find((p) => p.id === cw.patient_id) : null

  if (!cw || !patient) return <div className="p-10 text-center">NeuroModel não encontrado.</div>

  const menuItems = [
    { id: 'triage', label: 'Triagem Clínica', icon: Activity, desc: 'Camada 1 (Blocos 1-4)' },
    {
      id: 'collection',
      label: 'Avaliação Estruturada',
      icon: Layers,
      desc: 'Camada 2 (Blocos 5-8)',
    },
    { id: 'vitalscore', label: 'VitalScore™ Core', icon: HeartPulse, desc: 'Check-Up Dimensional' },
    { id: 'biomarkers', label: 'Neurofisiologia', icon: BrainCircuit, desc: 'Camada 3 (Bloco 9)' },
    { id: 'convergence', label: 'Convergência IA', icon: Network, desc: 'Camada 4 (Blocos 10-11)' },
    { id: 'planning', label: 'Plano Terapêutico', icon: Target, desc: 'Camada 5 (Bloco 12)' },
    {
      id: 'graphics',
      label: 'Dashboard Analítico',
      icon: PieChart,
      desc: 'Camada 6 (Blocos 13-14)',
    },
    { id: 'report', label: 'Motor de Laudos', icon: FileCheck, desc: 'Camada 7 (Blocos 15-17)' },
  ]

  const ActiveComponent = () => {
    switch (activeLayer) {
      case 'triage':
        return <LayerTriage caseId={cw.id} />
      case 'collection':
        return <LayerCollection caseId={cw.id} />
      case 'vitalscore':
        return <LayerVitalScore caseId={cw.id} />
      case 'biomarkers':
        return <LayerBiomarkers caseId={cw.id} />
      case 'convergence':
        return <LayerConvergence caseId={cw.id} />
      case 'planning':
        return <LayerPlanning caseId={cw.id} />
      case 'graphics':
        return <LayerGraphics caseId={cw.id} />
      case 'report':
        return <LayerReport caseId={cw.id} />
      default:
        return null
    }
  }

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4 animate-fade-in -m-2 sm:-m-4">
      {/* Top Header BIM-style */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 py-3 bg-white border-b shadow-sm shrink-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="-ml-2">
            <Link to="/teamflow/cases">
              <ArrowLeft className="w-5 h-5 text-slate-500" />
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-none">{cw.title}</h1>
            <p className="text-sm text-slate-500 mt-1 font-medium">
              Paciente: {patient.name} | Status:{' '}
              <span className="text-indigo-600">{cw.status}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 mt-3 sm:mt-0">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Integridade do Modelo
            </span>
            <div className="flex items-center gap-2">
              <Progress
                value={cw.consistency_score}
                className="w-24 h-2 bg-emerald-100 [&>div]:bg-emerald-500"
              />
              <span className="text-sm font-bold text-emerald-600">{cw.consistency_score}%</span>
            </div>
          </div>
          <div className="flex flex-col border-l pl-6">
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
              Risco Clínico
            </span>
            <div className="flex items-center gap-2">
              <Progress
                value={cw.risk_score}
                className="w-24 h-2 bg-rose-100 [&>div]:bg-rose-500"
              />
              <span className="text-sm font-bold text-rose-600">{cw.risk_score}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Area using Resizable Panels */}
      <div className="flex-1 overflow-hidden px-2 sm:px-4 pb-2">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-xl border bg-white shadow-sm overflow-hidden"
        >
          {/* Left Sidebar: Layers / BIM Navigator */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-slate-50/50">
            <div className="p-4 border-b h-14 flex items-center">
              <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">
                Camadas do Modelo
              </h3>
            </div>
            <div className="p-2 space-y-1 overflow-y-auto h-[calc(100%-3.5rem)]">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveLayer(item.id)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    activeLayer === item.id
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm'
                      : 'hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 shrink-0 mt-0.5 ${
                      activeLayer === item.id
                        ? item.id === 'vitalscore'
                          ? 'text-rose-600'
                          : 'text-indigo-600'
                        : 'text-slate-400'
                    }`}
                  />
                  <div>
                    <div
                      className={`font-semibold text-sm ${
                        activeLayer === item.id
                          ? item.id === 'vitalscore'
                            ? 'text-rose-900'
                            : 'text-indigo-900'
                          : 'text-slate-700'
                      }`}
                    >
                      {item.label}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        activeLayer === item.id
                          ? item.id === 'vitalscore'
                            ? 'text-rose-600/80'
                            : 'text-indigo-600/80'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Middle Content: Active Layer Builder */}
          <ResizablePanel defaultSize={60} className="bg-slate-50">
            <div className="h-full overflow-y-auto p-6 sm:p-10">
              <ActiveComponent />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="hidden lg:flex" />

          {/* Right Sidebar: Collaboration / Audit */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="hidden lg:block">
            <CollaborationPanel caseId={cw.id} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}
