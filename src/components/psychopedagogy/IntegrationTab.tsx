import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Activity, FileText, Eye, Brain } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const EXTERNAL_DOCS = [
  {
    id: '1',
    type: 'Neuropsicologia',
    title: 'Laudo Neuropsicológico Completo',
    date: '12/08/2023',
    status: 'Validado',
  },
  {
    id: '2',
    type: 'Fonoaudiologia',
    title: 'Avaliação de Linguagem (PAC)',
    date: '05/09/2023',
    status: 'Validado',
  },
  {
    id: '3',
    type: 'Área Médica',
    title: 'Relatório Clínico e qEEG',
    date: '20/07/2023',
    status: 'Validado',
  },
]

export function IntegrationTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" /> Hub de Integração Clínica
          </CardTitle>
          <CardDescription>
            Acesse laudos de outras especialidades e visualize correlações cognitivas com a
            aprendizagem.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground border-b pb-2">
              Documentos Multidisciplinares
            </h3>
            <div className="space-y-3">
              {EXTERNAL_DOCS.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors bg-white"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-indigo-500" />
                    <div>
                      <p className="text-sm font-semibold">{doc.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-[10px] py-0">
                          {doc.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="shrink-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground border-b pb-2">
              Correlações Cognitivas e Aprendizagem
            </h3>
            <div className="p-4 border rounded-xl bg-slate-50 flex items-start gap-4 h-full">
              <Brain className="w-8 h-8 text-indigo-600 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">
                  Déficit Atencional Mapeado (RDoC)
                </h4>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  A equipe de Neuropsicologia detectou hiperativação em Sistemas Cognitivos, com
                  impacto direto no controle inibitório e atenção sustentada.
                </p>
                <div className="text-xs bg-white p-3 rounded border border-indigo-100 text-indigo-900 font-medium">
                  <strong>Impacto na Psicopedagogia:</strong> Esta disfunção neurofuncional se
                  correlaciona diretamente com a queixa escolar de baixo desempenho em Matemática
                  (erros por desatenção) e na Fluência Leitora (trocas visuais por impulsividade).
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
