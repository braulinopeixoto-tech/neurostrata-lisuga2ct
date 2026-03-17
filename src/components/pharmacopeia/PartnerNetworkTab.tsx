import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { MapPin, Building2, Beaker, CheckCircle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import { toast } from '@/components/ui/use-toast'

export function PartnerNetworkTab() {
  const { patients } = useAppStore()
  const { partners, addMonetizationEvent } = usePharmacyStore()
  const [patientId, setPatientId] = useState('')
  const [filterType, setFilterType] = useState<'todos' | 'laboratorio' | 'farmacia'>('todos')

  const filteredPartners = partners
    .filter((p) => filterType === 'todos' || p.tipo === filterType)
    .sort((a, b) => a.nome.localeCompare(b.nome))

  const handleReferral = (partnerId: string, tipo: string) => {
    if (!patientId) {
      toast({
        title: 'Atenção',
        description: 'Selecione um paciente antes de gerar o encaminhamento.',
        variant: 'destructive',
      })
      return
    }

    addMonetizationEvent({
      partnerId,
      patientId,
      type: tipo === 'farmacia' ? 'revenue_share' : 'fee',
      amount: tipo === 'farmacia' ? 15.0 : 5.0,
    })

    toast({
      title: 'Encaminhamento Neutro Concluído',
      description: 'O paciente recebeu a lista de rede parceira sem direcionamentos preferenciais.',
      action: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-blue-500">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <Label>Paciente Alvo (Obrigatório para Encaminhamento)</Label>
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
            <div className="flex-1 space-y-2">
              <Label>Filtro de Entidades Parceiras</Label>
              <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os serviços" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas Entidades</SelectItem>
                  <SelectItem value="laboratorio">Laboratórios Clínicos</SelectItem>
                  <SelectItem value="farmacia">Farmácias Magistrais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPartners.map((partner) => (
          <Card
            key={partner.id}
            className="shadow-sm hover:shadow-elevation transition-all flex flex-col bg-white border border-border/60"
          >
            <CardHeader className="pb-3 border-b border-muted/50 bg-slate-50/50">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  variant={partner.tipo === 'laboratorio' ? 'default' : 'secondary'}
                  className="uppercase text-[10px] tracking-wider px-2 py-0.5"
                >
                  {partner.tipo}
                </Badge>
                {partner.integracao_api && (
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 uppercase tracking-wider"
                  >
                    Integração API
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                {partner.tipo === 'laboratorio' ? (
                  <Beaker className="w-5 h-5 text-primary" />
                ) : (
                  <Building2 className="w-5 h-5 text-accent" />
                )}
                {partner.nome}
              </CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" /> {partner.localizacao}
              </CardDescription>
            </CardHeader>
            <CardContent className="py-5 space-y-4 flex-1 text-sm">
              <div>
                <strong className="text-[11px] font-bold text-muted-foreground uppercase block mb-2 tracking-wider">
                  Catálogo de Serviços
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {partner.servicos.map((s, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-slate-50 text-slate-600 font-normal"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-[11px] font-bold text-muted-foreground uppercase block mb-1 tracking-wider">
                  Certificações de Qualidade
                </strong>
                <div className="text-slate-700 text-xs font-medium">
                  {partner.certificacoes.join(' • ')}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 border-t p-4">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
                onClick={() => handleReferral(partner.id, partner.tipo)}
              >
                Sugerir Entidade ao Paciente
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
