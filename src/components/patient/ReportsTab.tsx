import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { FileText, Plus, ExternalLink, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

export function ReportsTab() {
  const reports = [
    {
      id: 'rep-1',
      date: '10/01/2023',
      title: 'Laudo Neurofuncional Multidimensional',
      type: 'Admissão',
      status: 'Assinado',
      isTrustLayerVerified: true,
    },
    {
      id: 'rep-2',
      date: '15/03/2023',
      title: 'Avaliação de Acompanhamento',
      type: 'Evolução',
      status: 'Rascunho',
      isTrustLayerVerified: false,
    },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Laudos e Sumários Clínicos</h2>
          <p className="text-sm text-muted-foreground">
            Histórico de documentos gerados para o paciente, com selo de autenticidade.
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
          <Card
            key={rep.id}
            className={`shadow-sm hover:border-primary/50 transition-colors ${rep.isTrustLayerVerified ? 'border-l-4 border-l-emerald-500' : ''}`}
          >
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-start gap-3">
                <FileText
                  className={`w-5 h-5 mt-0.5 ${rep.isTrustLayerVerified ? 'text-emerald-600' : 'text-slate-400'}`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-primary">{rep.title}</h4>
                    {rep.isTrustLayerVerified && (
                      <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 h-5 px-1.5 text-[10px]"
                      >
                        <ShieldCheck className="w-3 h-3 mr-1" /> Trust Layer™
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <span>{rep.date}</span>
                    <span>•</span>
                    <span className="uppercase text-[10px] bg-muted px-1.5 py-0.5 rounded font-bold">
                      {rep.type}
                    </span>
                    <span>•</span>
                    <span
                      className={
                        rep.status === 'Assinado'
                          ? 'text-emerald-600 font-medium'
                          : 'text-amber-600 font-medium'
                      }
                    >
                      {rep.status}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant={rep.isTrustLayerVerified ? 'default' : 'outline'}
                size="sm"
                asChild
                className={
                  rep.isTrustLayerVerified ? 'bg-slate-800 hover:bg-slate-900 text-white' : ''
                }
              >
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
