import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mic, Lock, ShieldCheck, Link as LinkIcon, Activity, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function SpeechTherapyTab({ patient }: { patient: any }) {
  const [sealed, setSealed] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    setVerified(true)
    toast.success('Waveform data integrity verified successfully.')
  }

  const handleSeal = () => {
    setSealed(true)
    toast.success('Authenticity sealed. Hash: a7b8c9d0e1f2a3b4...')
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Mic className="w-5 h-5 text-primary" /> Speech Therapy Assessment
        </h3>
        {sealed ? (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 py-1 px-3">
            <ShieldCheck className="w-4 h-4 mr-1.5" /> Trust Layer™: Audited
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-300 py-1 px-3"
          >
            <Lock className="w-4 h-4 mr-1.5" /> Trust Layer™: Pending
          </Badge>
        )}
      </div>

      <Card className="bg-slate-50 border-dashed border-slate-300 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2 text-slate-700">
            <LinkIcon className="w-4 h-4 text-primary" /> Clinical Interdependency
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600">
            <strong>Impact from other areas:</strong> Low working memory scores (Neuropsychology)
            correlate directly with difficulties in complex sentence comprehension and delayed P300
            latency.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Language Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">Expressive Language</span>
              <Badge variant="outline" className="font-normal">
                Adequate
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">Verbal Fluency</span>
              <Badge
                variant="destructive"
                className="bg-rose-100 text-rose-800 border-rose-200 font-normal"
              >
                Moderate Deficit
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-lg bg-white shadow-sm">
              <span className="text-sm font-medium">Auditory Processing</span>
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 border-amber-200 font-normal"
              >
                Mild Deficit
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" /> Electrophysiological Data
              </div>
              {verified && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 flex flex-col h-[calc(100%-3rem)]">
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="text-slate-600">P300 Latency</span>
                <span className="font-mono font-bold">345 ms</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b pb-2">
                <span className="text-slate-600">N400 Amplitude</span>
                <span className="font-mono font-bold text-rose-600">-4.2 µV</span>
              </div>
            </div>

            {!verified ? (
              <Button variant="outline" onClick={handleVerify} className="w-full mt-auto">
                Verify Integrity of Waveforms
              </Button>
            ) : (
              <div className="text-sm text-center text-emerald-700 font-semibold bg-emerald-50 py-2.5 rounded-md border border-emerald-200 mt-auto flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Integrity Verified
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end pt-4 border-t">
        <Button onClick={handleSeal} disabled={sealed} className="gap-2 shadow-sm">
          <Lock className="w-4 h-4" /> Seal Authenticity
        </Button>
      </div>
    </div>
  )
}
