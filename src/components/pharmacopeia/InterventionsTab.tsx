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
import { FileSignature, Plus } from 'lucide-react'
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
    if (!patientId || !necessidade || !eixo) return
    addIntervention({
      patientId,
      necessidade,
      eixo,
      prioridade,
    })
    setNecessidade('')
    setEixo('')
  }

  const handleValidate = (id: string) => {
    updateInterventionStatus(id, 'validada')

    addAuditLog({
      evento: 'Validação de Intervenção Funcional',
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Pharmacopeia - Intervenções',
      decisao_validada: true,
    })

    toast({
      title: 'Intervenção Validada',
      description: 'Conduta funcional aprovada e selada com rastreabilidade.',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Planejador de Intervenções Funcionais</CardTitle>
          <CardDescription>
            Estruture as necessidades funcionais em vez de fórmulas diretas, mantendo conformidade
            clínica e regulatória.
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
              <div className="bg-muted/30 p-4 rounded-lg border space-y-4">
                <h4 className="text-sm font-semibold uppercase text-muted-foreground flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Nova Proposição
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
                    <Label className="text-xs">Eixo Funcional Alvo</Label>
                    <Input
                      placeholder="Ex: Cognitivo"
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
                        <SelectItem value="baixa">Baixa</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 flex items-end">
                    <Button onClick={handleAdd} className="w-full">
                      Propor Estrutura
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Necessidade Funcional</TableHead>
                      <TableHead>Eixo</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Validação Profissional</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patientInterventions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                          Nenhuma intervenção funcional proposta.
                        </TableCell>
                      </TableRow>
                    )}
                    {patientInterventions.map((inv) => (
                      <TableRow key={inv.id}>
                        <TableCell className="font-medium text-slate-800">
                          {inv.necessidade}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{inv.eixo}</TableCell>
                        <TableCell>
                          <Badge
                            variant={inv.prioridade === 'alta' ? 'destructive' : 'secondary'}
                            className="capitalize"
                          >
                            {inv.prioridade}
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
                            {inv.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {inv.status === 'proposta' && (
                            <Button
                              size="sm"
                              onClick={() => handleValidate(inv.id)}
                              className="bg-slate-800 hover:bg-slate-700"
                            >
                              <FileSignature className="w-4 h-4 mr-2" /> Validar Conduta
                            </Button>
                          )}
                          {inv.status === 'validada' && (
                            <span className="text-emerald-600 text-sm font-medium flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Validado (Trust Layer)
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
// Adding missing import CheckCircle2 manually since it's used
import { CheckCircle2 } from 'lucide-react'
