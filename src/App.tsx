import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import Layout from './components/Layout'
import NotFound from './pages/NotFound'
import { AppStoreProvider } from './stores/useAppStore'

import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import Assessment from './pages/assessment/Assessment'
import Analysis from './pages/Analysis'
import Report from './pages/Report'
import Protocols from './pages/Protocols'
import Professionals from './pages/Professionals'
import Pharmacopeia from './pages/Pharmacopeia'
import Neuronavigation from './pages/Neuronavigation'
import AuditorPortal from './pages/AuditorPortal'
import ReportCenter from './pages/ReportCenter'
import PerformanceTimeline from './pages/PerformanceTimeline'

const App = () => (
  <AppStoreProvider>
    <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/patients/:id" element={<PatientDetail />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/pharmacopeia" element={<Pharmacopeia />} />
            <Route path="/neuronavigation" element={<Neuronavigation />} />
            <Route path="/analysis/:id" element={<Analysis />} />
            <Route path="/report/:id" element={<Report />} />
            <Route path="/protocols" element={<Protocols />} />
            <Route path="/auditor-portal" element={<AuditorPortal />} />
            <Route path="/report-center" element={<ReportCenter />} />
            <Route path="/performance-timeline" element={<PerformanceTimeline />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </AppStoreProvider>
)

export default App
