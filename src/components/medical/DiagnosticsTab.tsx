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
import { Activity, Beaker, Dna, ScanSearch, Plus, FileArchive } from 'lucide-react'
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
          <p className="text-sm text-muted-foreground max-w-2xl mt-1">
            Gerencie os resultados provenientes de laboratórios e clínicas. Os dados processados
            alimentam automaticamente a <strong>Central de Relatórios</strong> e o{' '}
            <strong>Biograma Longitudinal</strong> do paciente.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hidden md:flex">
            <FileArchive className="w-4 h-4 mr-2" /> Central de Relatórios
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Solicitar Exame
          </Button>
        </div>
      </div>

      <Tabs defaultValue="laboratorios" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 mb-4 h-auto p-1 bg-muted rounded-lg">
          <TabsTrigger value="laboratorios" className="flex gap-2 py-2">
            <Beaker className="w-4 h-4" /> Laboratórios
          </TabsTrigger>
          <TabsTrigger value="imagens" className="flex gap-2 py-2">
            <ScanSearch className="w-4 h-4" /> Clínicas de Imagens
          </TabsTrigger>
          <TabsTrigger value="salivares" className="flex gap-2 py-2">
            <Activity className="w-4 h-4" /> Testes Salivares
          </TabsTrigger>
          <TabsTrigger value="geneticos" className="flex gap-2 py-2">
            <Dna className="w-4 h-4" /> Testes Genéticos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="laboratorios">
          <Card>
            <CardHeader>
              <CardTitle>Laboratórios</CardTitle>
              <CardDescription>
                Gerenciamento de exames de sangue e marcadores metabólicos sistêmicos.
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

        <TabsContent value="imagens">
          <Card>
            <CardHeader>
              <CardTitle>Clínicas de Imagens</CardTitle>
              <CardDescription>
                Processamento de Ressonâncias, PET Scans e Mapeamentos Funcionais (qEEG).
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

        <TabsContent value="salivares">
          <Card>
            <CardHeader>
              <CardTitle>Testes Salivares</CardTitle>
              <CardDescription>
                Análises de ritmo circadiano, marcadores de estresse e hormônios esteróides.
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

        <TabsContent value="geneticos">
          <Card>
            <CardHeader>
              <CardTitle>Testes Genéticos</CardTitle>
              <CardDescription>
                Painéis farmacogenéticos e avaliação de polimorfismos (SNPs) relevantes.
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
