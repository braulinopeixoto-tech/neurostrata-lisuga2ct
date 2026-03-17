import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  ShieldCheck,
  Brain,
  Mic,
  BookOpen,
  History,
  User,
  LayoutDashboard,
  Clock,
} from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

import ComplianceOverviewTab from './tabs/ComplianceOverviewTab'
import NeuropsychologyTab from './tabs/NeuropsychologyTab'
import SpeechTherapyTab from './tabs/SpeechTherapyTab'
import PsychopedagogyTab from './tabs/PsychopedagogyTab'
import AuditTrailTab from './tabs/AuditTrailTab'

export default function Assessment() {
  const [currentTab, setCurrentTab] = useState('overview')
  const { patients } = useAppStore()
  const [selectedPatientId, setSelectedPatientId] = useState<string>('')

  const selectedPatient = patients.find((p) => p.id === selectedPatientId)

  useEffect(() => {
    if (!selectedPatientId && patients.length > 0) {
      setSelectedPatientId(patients[0].id)
    }
  }, [patients, selectedPatientId])

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" /> Compliance Study Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Unified interface for inter-professional data validation and Biogram methodology
            auditing.
          </p>
        </div>
        {selectedPatient && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white shadow-sm hover:bg-slate-50">
                <Clock className="w-4 h-4" /> Timeline of Changes
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Audit Timeline - {selectedPatient.name}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[300px] mt-4">
                <div className="space-y-4">
                  <div className="pl-4 border-l-2 border-primary pb-4">
                    <span className="text-xs text-muted-foreground">Today, 09:30 AM</span>
                    <p className="text-sm font-medium">Biogram Methodology Validated</p>
                    <p className="text-xs text-slate-500">by Dr. Renato Alves</p>
                  </div>
                  <div className="pl-4 border-l-2 border-muted pb-4">
                    <span className="text-xs text-muted-foreground">Yesterday, 14:15 PM</span>
                    <p className="text-sm font-medium">Psychopedagogy Data Updated</p>
                    <p className="text-xs text-slate-500">by Maria Silva</p>
                  </div>
                  <div className="pl-4 border-l-2 border-muted pb-4">
                    <span className="text-xs text-muted-foreground">Oct 12, 10:00 AM</span>
                    <p className="text-sm font-medium">Speech Therapy Waveforms Verified</p>
                    <p className="text-xs text-slate-500">by System Bot</p>
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label
                htmlFor="patient-select"
                className="text-base font-semibold flex items-center gap-2 text-primary"
              >
                <User className="w-5 h-5" /> Patient Context
              </Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger id="patient-select" className="w-full bg-white">
                  <SelectValue placeholder="Select a patient..." />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {selectedPatient && (
              <div className="flex items-center gap-6 sm:justify-end">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Trust Layer Status
                  </div>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                    Pending Validation
                  </Badge>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                    Biogram Integrity
                  </div>
                  <span className="text-2xl font-black text-emerald-600">98%</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedPatient && (
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full mt-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full h-auto p-1 bg-muted/50 gap-1 rounded-xl transition-all">
            <TabsTrigger
              value="overview"
              className="flex flex-col items-center gap-2 py-3 rounded-lg"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">Compliance Overview</span>
            </TabsTrigger>
            <TabsTrigger value="neuro" className="flex flex-col items-center gap-2 py-3 rounded-lg">
              <Brain className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">Neuropsychology</span>
            </TabsTrigger>
            <TabsTrigger
              value="speech"
              className="flex flex-col items-center gap-2 py-3 rounded-lg"
            >
              <Mic className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">Speech Therapy</span>
            </TabsTrigger>
            <TabsTrigger
              value="psycho"
              className="flex flex-col items-center gap-2 py-3 rounded-lg"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">Psychopedagogy</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex flex-col items-center gap-2 py-3 rounded-lg">
              <History className="w-5 h-5" />
              <span className="text-xs font-medium hidden sm:block">Audit Trail</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-2 min-h-[400px]">
            <TabsContent value="overview" className="m-0 focus-visible:outline-none">
              <ComplianceOverviewTab patient={selectedPatient} onTabChange={setCurrentTab} />
            </TabsContent>
            <TabsContent value="neuro" className="m-0 focus-visible:outline-none">
              <NeuropsychologyTab patient={selectedPatient} />
            </TabsContent>
            <TabsContent value="speech" className="m-0 focus-visible:outline-none">
              <SpeechTherapyTab patient={selectedPatient} />
            </TabsContent>
            <TabsContent value="psycho" className="m-0 focus-visible:outline-none">
              <PsychopedagogyTab patient={selectedPatient} />
            </TabsContent>
            <TabsContent value="audit" className="m-0 focus-visible:outline-none">
              <AuditTrailTab patient={selectedPatient} />
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  )
}
