import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Lock, ShieldCheck, Link as LinkIcon, Activity } from 'lucide-react'
import { toast } from 'sonner'

export default function NeuropsychologyTab({ patient }: { patient: any }) {
  const [sealed, setSealed] = useState(false)

  const handleSeal = () => {
    setSealed(true)
    toast.success('Authenticity sealed. Hash: 8f93a2b1c4e5d6f7a...')
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" /> Neuropsychology Assessment
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
            <strong>Impact on other areas:</strong> The mapped attention deficit directly impacts
            reading metrics (Psychopedagogy) and verbal fluency training efficiency (Speech
            Therapy).
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Activity className="w-4 h-4 text-muted-foreground" /> Cognitive Functions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Sustained Attention</span>
                <span className="text-muted-foreground">65/100</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Working Memory</span>
                <span className="text-muted-foreground">42/100</span>
              </div>
              <Progress value={42} className="h-2 [&>div]:bg-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="w-4 h-4 text-muted-foreground" /> Executive Functions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Inhibitory Control</span>
                <span className="text-muted-foreground">30/100</span>
              </div>
              <Progress value={30} className="h-2 [&>div]:bg-rose-500" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Cognitive Flexibility</span>
                <span className="text-muted-foreground">78/100</span>
              </div>
              <Progress value={78} className="h-2 [&>div]:bg-emerald-500" />
            </div>
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
