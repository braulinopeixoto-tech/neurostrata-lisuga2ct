import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function DASS21History({ patientId }: { patientId: string }) {
  const { patientDASS21 } = useAppStore()
  const history = patientDASS21[patientId] || []

  if (history.length === 0) return null

  return (
    <div className="space-y-4">
      {history.map((record) => (
        <Card key={record.id} className="shadow-sm border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <Activity className="w-4 h-4" /> Escala DASS-21
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Data: {new Date(record.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 bg-muted/20 p-3 rounded-lg border">
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold">Depressão</span>
                <p className="text-lg font-bold text-foreground">{record.scores?.depressao || 0}</p>
                <Badge variant="outline" className="mt-1 text-[10px]">
                  {record.levels?.depressao || 'Normal'}
                </Badge>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold">Ansiedade</span>
                <p className="text-lg font-bold text-foreground">{record.scores?.ansiedade || 0}</p>
                <Badge variant="outline" className="mt-1 text-[10px]">
                  {record.levels?.ansiedade || 'Normal'}
                </Badge>
              </div>
              <div>
                <span className="text-xs text-muted-foreground uppercase font-bold">Estresse</span>
                <p className="text-lg font-bold text-foreground">{record.scores?.estresse || 0}</p>
                <Badge variant="outline" className="mt-1 text-[10px]">
                  {record.levels?.estresse || 'Normal'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
