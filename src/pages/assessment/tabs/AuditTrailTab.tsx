import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { History, User, Lock, Clock, Hash } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'

export default function AuditTrailTab({ patient }: { patient: any }) {
  const logs = [
    {
      id: 1,
      action: 'Biogram Methodology Validated',
      user: 'Dr. Renato Alves',
      date: new Date().toISOString(),
      hash: '8f93a2b1c4e5d6f7...',
    },
    {
      id: 2,
      action: 'Psychopedagogy Adaptations Updated',
      user: 'Maria Silva (PP)',
      date: new Date(Date.now() - 86400000).toISOString(),
      hash: 'd4e5f6a7b8c9d0e1...',
    },
    {
      id: 3,
      action: 'Speech Therapy Waveform Verified',
      user: 'Carlos Santos (Fono)',
      date: new Date(Date.now() - 172800000).toISOString(),
      hash: 'a7b8c9d0e1f2a3b4...',
    },
    {
      id: 4,
      action: 'Neuropsychology Data Sealed',
      user: 'Ana Costa (Neuro)',
      date: new Date(Date.now() - 259200000).toISOString(),
      hash: 'b1c4e5d6f7a8b9c0...',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <Card className="shadow-sm border-t-4 border-t-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-800">
            <History className="w-5 h-5" /> Audit Trail & Timeline of Changes
          </CardTitle>
          <CardDescription>
            Immutable ledger recording all actions, validations, and document seals for this patient
            assessment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px] pr-4">
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col sm:flex-row gap-4 sm:items-center justify-between hover:border-slate-300 transition-colors"
                >
                  <div>
                    <h4 className="font-semibold text-slate-800 text-base">{log.action}</h4>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" /> {log.user}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {new Date(log.date).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right flex flex-col items-start sm:items-end gap-2 mt-2 sm:mt-0 border-t sm:border-0 pt-3 sm:pt-0">
                    <Badge
                      variant="outline"
                      className="bg-emerald-50 text-emerald-700 border-emerald-200"
                    >
                      <Lock className="w-3 h-3 mr-1" /> Sealed
                    </Badge>
                    <span
                      className="font-mono text-[10px] text-slate-500 bg-white border px-1.5 py-0.5 rounded flex items-center gap-1.5 shadow-sm"
                      title="Cryptographic Hash"
                    >
                      <Hash className="w-3 h-3 text-slate-400" /> {log.hash}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
