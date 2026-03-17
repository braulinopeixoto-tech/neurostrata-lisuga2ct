import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { FileSignature, Plus, CheckCircle2 } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'

export function InterventionsTab() {
  const { patients, currentUser } = useAppStore()
  const { interventions, addIntervention, updateInterventionStatus } = usePharmacyStore()
  const { addAuditLog } = useTrustStore()

  const [patientId, setPatientId] = useState('')
  const [necessidade, setNecessidade] = useState('')
  const [eixo, setEixo] = useState('')
  const [prioridade, setPrioridade] = useState<'baixa' | 'media' | 'alta'>('media')

  const patientInterventions = interventions.filter((i) => i.patientId === patientId)

  const handleAdd = () => {
    if (!patientId || !necessidade || !eixo) {
      toast({
        title: 'Atenção',
        description: 'Descreva claramente a necessidade e o eixo alvo.',
        variant: 'destructive',
      })
      return
    }
    addIntervention({
      patientId,
      necessidade,
      eixo,
      prioridade,
    })

    addAuditLog({
      evento: 'Proposição de Intervenção Funcional',
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Gestão Metabólica - Intervenções',
      decisao_validada: false,
    })

    setNecessidade('')
    setEixo('')
    toast({
      title: 'Necessidade Funcional Registrada',
      description: 'A proposição aguarda validação profissional.',
    })
  }

  const handleValidate = (id: string) => {
    updateInterventionStatus(id, 'validada')

    addAuditLog({
      evento: 'Validação de Necessidade Clínica',
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Gestão Metabólica - Intervenções',
      decisao_validada: true,
    })

    toast({
      title: 'Intervenção Validada',
      description: 'A necessidade clínica foi selada com rastreabilidade na Trust Layer™.',
      action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Matriz de Intervenções Funcionais</CardTitle>
          <CardDescription>
            Estruture condutas com base em "Necessidades Funcionais" (não prescritivas), permitindo
            encaminhamento aberto para entidades parceiras.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="max-w-md space-y-2">
            <Label>Paciente</Label>
            <Select value={patientId} onValueChange={setPatientId}>
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Selecione o paciente..." />
              </SelectTrigger>
              <SelectContent>
                {patients.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {patientId && (
            <div className="space-y-6">
              <div className="bg-muted/30 p-5 rounded-lg border space-y-4">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2 mb-2">
                  <Plus className="w-4 h-4" /> Definir Nova Necessidade Funcional
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Necessidade (Ex: Suporte Dopaminérgico)</Label>
                    <Input
                      value={necessidade}
                      onChange={(e) => setNecessidade(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Eixo Funcional Alvo (Ex: Cognitivo)</Label>
                    <Input
                      value={eixo}
                      onChange={(e) => setEixo(e.target.value)}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Prioridade Clínica</Label>
                    <Select value={prioridade} onValueChange={(v: any) => setPrioridade(v)}>
                      <SelectTrigger className="bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baixa">Baixa (Manutenção)</SelectItem>
                        <SelectItem value="media">Média (Regulação)</SelectItem>
                        <SelectItem value="alta">Alta (Aguda)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={handleAdd} className="w-full bg-slate-800 hover:bg-slate-700">
                      Adicionar à Matriz
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Necessidade Funcional</TableHead>
                      <TableHead>Eixo de Atuação</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status de Validação</TableHead>
                      <TableHead className="text-right">Ação de Auditoria</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientInterventions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Nenhuma intervenção funcional proposta até o momento.
                        </TableCell>
                      </TableRow>
                    )}
                    {patientInterventions.map((inv) => (
                      <TableRow
                        key={inv.id}
                        className={inv.status === 'validada' ? 'bg-emerald-50/20' : ''}
                      >
                        <TableCell className="font-medium text-slate-800">
                          {inv.necessidade}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{inv.eixo}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              inv.prioridade === 'alta'
                                ? 'bg-rose-100 text-rose-800 border-rose-200'
                                : inv.prioridade === 'media'
                                  ? 'bg-amber-100 text-amber-800 border-amber-200'
                                  : 'bg-slate-100 text-slate-700 border-slate-200'
                            }
                          >
                            {inv.prioridade.toUpperCase()}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              inv.status === 'proposta'
                                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }
                            variant="outline"
                          >
                            {inv.status === 'proposta' ? 'Aguardando Aval' : 'Validada'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {inv.status === 'proposta' && (
                            <Button
                              size="sm"
                              onClick={() => handleValidate(inv.id)}
                              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm w-full md:w-auto"
                            >
                              <FileSignature className="w-4 h-4 mr-2" /> Validar Necessidade
                            </Button>
                          )}
                          {inv.status === 'validada' && (
                            <span className="text-emerald-700 text-sm font-semibold flex items-center justify-end gap-1.5 bg-emerald-50 py-1.5 px-3 rounded-md border border-emerald-200 inline-flex ml-auto">
                              <CheckCircle2 className="w-4 h-4" /> Autenticado
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
