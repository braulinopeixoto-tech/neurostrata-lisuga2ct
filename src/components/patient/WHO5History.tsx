import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function WHO5History({ patientId }: { patientId: string }) {
  const { patientWHO5 } = useAppStore()
  const history = patientWHO5[patientId] || []

  if (history.length === 0) return null

  return (
    <div className="space-y-4">
      {history.map((record) => (
        <Card key={record.id} className="shadow-sm border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Índice WHO-5
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Data: {new Date(record.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-emerald-600">
                  {record.totalScore || 0}
                </span>
                <span className="text-xs text-muted-foreground font-mono ml-1">/ 100</span>
              </div>
            </div>
            <div className="bg-muted/20 p-3 rounded-lg border">
              <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                {record.interpretation || 'Não Classificado'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
