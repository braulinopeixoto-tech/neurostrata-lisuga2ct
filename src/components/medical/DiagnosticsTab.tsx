import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Activity, Beaker, Dna, ScanSearch, Plus } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function DiagnosticsTab() {
  const handleIntegrate = () => {
    toast({
      title: 'Dados Integrados',
      description:
        'O resultado foi enviado para a Central de Relatórios e atualizou o Biograma Longitudinal.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-primary">Fluxo de Exames e Diagnóstico</h2>
          <p className="text-sm text-muted-foreground">
            Gerencie resultados laboratoriais, de imagem, salivares e genéticos em um só lugar.
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Solicitar Exame
        </Button>
      </div>

      <Tabs defaultValue="labs" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-4 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="labs" className="flex gap-2 py-2">
            <Beaker className="w-4 h-4" /> Laboratoriais
          </TabsTrigger>
          <TabsTrigger value="imaging" className="flex gap-2 py-2">
            <ScanSearch className="w-4 h-4" /> Imagem
          </TabsTrigger>
          <TabsTrigger value="salivary" className="flex gap-2 py-2">
            <Activity className="w-4 h-4" /> Salivares
          </TabsTrigger>
          <TabsTrigger value="genetic" className="flex gap-2 py-2">
            <Dna className="w-4 h-4" /> Genéticos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="labs">
          <Card>
            <CardHeader>
              <CardTitle>Exames Laboratoriais</CardTitle>
              <CardDescription>
                Gerenciamento de exames de sangue e marcadores metabólicos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Carlos Oliveira</TableCell>
                    <TableCell>Hemograma Completo, Perfil Lipídico</TableCell>
                    <TableCell>12/08/2023</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-200 bg-emerald-50"
                      >
                        Concluído
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleIntegrate}>
                        Integrar ao Biograma
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mariana Santos</TableCell>
                    <TableCell>Vitamina D, Vitamina B12, Zinco</TableCell>
                    <TableCell>14/08/2023</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Pendente</Badge>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="imaging">
          <Card>
            <CardHeader>
              <CardTitle>Clínicas de Imagem e Funcional</CardTitle>
              <CardDescription>Ressonâncias, PET Scans e Mapeamentos qEEG.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Roberto Fernandes</TableCell>
                    <TableCell>Ressonância Magnética (fMRI)</TableCell>
                    <TableCell>10/08/2023</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-200 bg-emerald-50"
                      >
                        Laudado
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleIntegrate}>
                        Integrar ao Biograma
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="salivary">
          <Card>
            <CardHeader>
              <CardTitle>Testes Salivares</CardTitle>
              <CardDescription>
                Análises de ritmo circadiano e marcadores de estresse.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Carlos Oliveira</TableCell>
                    <TableCell>Curva de Cortisol / DHEA</TableCell>
                    <TableCell>11/08/2023</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-200 bg-emerald-50"
                      >
                        Concluído
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleIntegrate}>
                        Integrar ao Biograma
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="genetic">
          <Card>
            <CardHeader>
              <CardTitle>Testes Genéticos</CardTitle>
              <CardDescription>Painéis farmacogenéticos e polimorfismos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Paciente</TableHead>
                    <TableHead>Exame</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Mariana Santos</TableCell>
                    <TableCell>Painel Farmacogenético (COMT, MTHFR)</TableCell>
                    <TableCell>05/08/2023</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className="text-emerald-600 border-emerald-200 bg-emerald-50"
                      >
                        Concluído
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={handleIntegrate}>
                        Integrar ao Biograma
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
