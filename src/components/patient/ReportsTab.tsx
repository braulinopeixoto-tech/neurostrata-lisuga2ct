import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Plus, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function ReportsTab() {
  const reports = [
    {
      id: 'rep-1',
      date: '10/01/2023',
      title: 'Laudo Neurofuncional Multidimensional',
      type: 'Admissão',
      status: 'Assinado',
    },
    {
      id: 'rep-2',
      date: '15/03/2023',
      title: 'Avaliação de Acompanhamento',
      type: 'Evolução',
      status: 'Assinado',
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Laudos e Documentos</h2>
          <p className="text-sm text-muted-foreground">
            Histórico de documentos clínicos gerados para o paciente.
          </p>
        </div>
        <Button asChild>
          <Link to="/report/new">
            <Plus className="w-4 h-4 mr-2" /> Novo Laudo
          </Link>
        </Button>
      </div>

      <div className="grid gap-4">
        {reports.map((rep) => (
          <Card key={rep.id} className="shadow-sm hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-primary">{rep.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{rep.date}</span>
                    <span>•</span>
                    <span className="uppercase text-[10px] bg-muted px-1.5 py-0.5 rounded font-bold">
                      {rep.type}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-600">{rep.status}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link to="/report-center">
                  <ExternalLink className="w-4 h-4 mr-2" /> Abrir
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
