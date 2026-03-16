import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Search, Scale, FileText, AlertTriangle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function LegalConsultationTab({ patient }: { patient: any }) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2 text-blue-800">
            <Scale className="w-5 h-5" /> Base de Jurisprudência
          </h2>
          <p className="text-sm text-muted-foreground">
            Consulta rápida de precedentes jurídicos relacionados a quadros neurofuncionais.
          </p>
        </div>
      </div>

      <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
            <Input
              placeholder="Buscar termos jurídicos, CID, ou tratamentos..."
              className="pl-9 bg-white border-blue-200 focus-visible:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <h4 className="font-semibold text-primary">
                  Fornecimento de Neuromodulação (Plano de Saúde)
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Precedentes do STJ obrigando cobertura de tDCS/TMS quando há refratariedade
                medicamentosa atestada.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" /> Ler Acórdão
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="font-semibold text-primary">
                  Interdição e Capacidade Civil (Neurodireitos)
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Diretrizes do Estatuto da Pessoa com Deficiência baseadas em avaliação
                biopsicossocial.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" /> Ver Diretrizes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
