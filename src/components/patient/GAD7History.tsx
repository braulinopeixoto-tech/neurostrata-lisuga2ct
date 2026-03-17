import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function GAD7History({ patientId }: { patientId: string }) {
  const { patientGAD7 } = useAppStore()
  const history = patientGAD7[patientId] || []

  if (history.length === 0) return null

  return (
    <div className="space-y-4">
      {history.map((record) => (
        <Card key={record.id} className="shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Inventário GAD-7
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Data: {new Date(record.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-amber-600">{record.totalScore || 0}</span>
                <span className="text-xs text-muted-foreground font-mono ml-1">/ 21</span>
              </div>
            </div>
            <div className="bg-muted/20 p-3 rounded-lg border">
              <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                {record.severity || 'Não Classificado'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
