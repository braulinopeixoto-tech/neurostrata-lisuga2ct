import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, ShieldCheck } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function PatientDigitizationTab({ patientId }: { patientId: string }) {
  const { documents } = useAppStore()
  const patientDocs = documents.filter((d) => d.patientId === patientId && d.status === 'completed')

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" /> Repositório de Documentos
        </CardTitle>
        <CardDescription>
          Exames e documentos processados pela equipe e integrados ao seu prontuário.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {patientDocs.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
            Nenhum documento finalizado em seu repositório no momento.
          </div>
        ) : (
          <div className="space-y-4">
            {patientDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col sm:flex-row justify-between sm:items-center p-4 border rounded-lg bg-slate-50 gap-4"
              >
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Processado em: {new Date(doc.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-white">
                  Categoria: {doc.category}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
