import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Lock, ShieldCheck, Link as LinkIcon, School, Check, Clock } from 'lucide-react'
import { toast } from 'sonner'

export default function PsychopedagogyTab({ patient }: { patient: any }) {
  const [sealed, setSealed] = useState(false)
  const [adaptations, setAdaptations] = useState([
    { id: 1, text: 'Extended testing time', status: 'Applied' },
    { id: 2, text: 'Reduced reading load', status: 'Pending' },
    { id: 3, text: 'Alternative math formulations', status: 'Pending' },
  ])

  const handleSeal = () => {
    setSealed(true)
    toast.success('Authenticity sealed. Hash: d4e5f6a7b8c9d0e1...')
  }

  const toggleStatus = (id: number) => {
    setAdaptations((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Applied' ? 'Pending' : 'Applied' } : a,
      ),
    )
    toast.success('Adaptation status updated')
  }

  return (
    <div className="space-y-6 animate-fade-in mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" /> Psychopedagogy Assessment
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
            <strong>Impact from other areas:</strong> Inhibitory control deficits (Neuropsychology)
            are manifesting as impulsivity in reading flow and consecutive mathematical calculation
            errors.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <School className="w-4 h-4 text-muted-foreground" /> Learning Profile & Complaints
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                School Complaints
              </h4>
              <p className="text-sm p-3 bg-white rounded-lg border text-slate-700 shadow-sm italic">
                "Student shows lack of focus during long classes and frequently misinterprets math
                problems despite knowing the formulas."
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                Learning Profiles
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="font-medium text-slate-700">Reading</span>
                  <Badge
                    variant="outline"
                    className="font-normal text-amber-700 bg-amber-50 border-amber-200"
                  >
                    Fluency Issues
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm border-b pb-2">
                  <span className="font-medium text-slate-700">Writing</span>
                  <Badge
                    variant="outline"
                    className="font-normal text-emerald-700 bg-emerald-50 border-emerald-200"
                  >
                    Adequate
                  </Badge>
                </div>
                <div className="flex justify-between items-center text-sm pb-1">
                  <span className="font-medium text-slate-700">Math</span>
                  <Badge
                    variant="outline"
                    className="font-normal text-rose-700 border-rose-200 bg-rose-50"
                  >
                    Logical Errors
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pedagogical Adaptations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {adaptations.map((adapt) => (
                <div
                  key={adapt.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg bg-white shadow-sm gap-3"
                >
                  <span className="text-sm font-medium text-slate-700">{adapt.text}</span>
                  <Button
                    variant={adapt.status === 'Applied' ? 'default' : 'secondary'}
                    size="sm"
                    className={`h-8 text-xs shrink-0 w-full sm:w-auto ${
                      adapt.status === 'Applied' ? 'bg-emerald-600 hover:bg-emerald-700' : ''
                    }`}
                    onClick={() => toggleStatus(adapt.id)}
                  >
                    {adapt.status === 'Applied' ? (
                      <Check className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <Clock className="w-3.5 h-3.5 mr-1" />
                    )}
                    {adapt.status}
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">
                School Communication Log
              </h4>
              <div className="text-xs text-slate-600 bg-slate-50 border p-3 rounded-lg shadow-inner">
                <span className="font-bold text-primary block mb-1">Oct 12, 2023:</span>
                Met with coordinator to align on math adaptations and shared neuropsychological
                findings.
              </div>
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
