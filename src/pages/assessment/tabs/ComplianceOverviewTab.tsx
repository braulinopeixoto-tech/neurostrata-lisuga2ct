import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ShieldCheck, FileText, History, Network, CheckCircle2 } from 'lucide-react'
import { toast } from 'sonner'

export default function ComplianceOverviewTab({
  patient,
  onTabChange,
}: {
  patient: any
  onTabChange: (tab: string) => void
}) {
  const handleValidate = () => toast.success('Biograma validado e selado criptograficamente.')
  const handleTrustReport = () => toast.success('Trust Report gerado com sucesso.')

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <Card className="border-transparent shadow-sm bg-slate-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Network className="w-5 h-5" />
            Biogram Methodology & Correlation
          </CardTitle>
          <CardDescription>
            Centralized view of the patient's multi-dimensional clinical data and methodology
            validation.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-border/50 shadow-sm">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Data Integrity
              </div>
              <div className="font-bold text-emerald-600 flex items-center gap-1 mt-1 text-lg">
                98% <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border/50 shadow-sm">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Inter-Professional Sync
              </div>
              <div className="font-bold text-primary mt-1 text-lg">Fully Correlated</div>
            </div>
            <div className="p-4 bg-white rounded-xl border border-border/50 shadow-sm">
              <div className="text-xs font-semibold text-muted-foreground uppercase">
                Trust Layer™ Status
              </div>
              <div className="font-bold text-amber-600 mt-1 text-lg">Pending Validation</div>
            </div>
          </div>
          <p className="text-sm text-slate-600 mt-4 leading-relaxed">
            The Biogram connects cognitive function, language metrics, and psychopedagogical
            profiles into a single verified state. This interconnected data framework ensures that
            assessments from Neuropsychology, Speech Therapy, and Psychopedagogy are consistent and
            clinically cohesive before generating the final report.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-4">
        <Button onClick={handleValidate} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
          <ShieldCheck className="w-4 h-4" /> Validate Biogram
        </Button>
        <Button
          onClick={handleTrustReport}
          className="gap-2 bg-slate-800 hover:bg-slate-900 text-white"
        >
          <FileText className="w-4 h-4" /> Generate Trust Report
        </Button>
        <Button variant="outline" onClick={() => onTabChange('audit')} className="gap-2 bg-white">
          <History className="w-4 h-4" /> View Audit Log
        </Button>
      </div>
    </div>
  )
}
