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
import { MapPin, Building2, Beaker, CheckCircle, ExternalLink } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import usePharmacyStore from '@/stores/usePharmacyStore'
import useTrustStore from '@/stores/useTrustStore'
import { toast } from '@/components/ui/use-toast'

export function PartnerNetworkTab() {
  const { patients, currentUser } = useAppStore()
  const { partners, addMonetizationEvent } = usePharmacyStore()
  const { addAuditLog } = useTrustStore()
  const [patientId, setPatientId] = useState('')
  const [filterType, setFilterType] = useState<'todos' | 'laboratorio' | 'farmacia'>('todos')

  const filteredPartners = partners
    .filter((p) => filterType === 'todos' || p.tipo === filterType)
    .sort((a, b) => a.nome.localeCompare(b.nome))

  const handleReferral = (partnerId: string, partnerName: string, tipo: string) => {
    if (!patientId) {
      toast({
        title: 'Atenção',
        description: 'Selecione um paciente antes de apresentar a opção parceira.',
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

    addAuditLog({
      evento: `Opção de Parceiro Apresentada (${partnerName})`,
      profissional: currentUser.fullName,
      data: new Date().toISOString(),
      origem: 'Gestão Metabólica - Rede Parceira',
      decisao_validada: true,
    })

    toast({
      title: 'Apresentação Concluída',
      description: 'A entidade parceira foi adicionada à lista de opções do paciente no Portal.',
      action: <CheckCircle className="w-4 h-4 text-emerald-500" />,
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <Label>Paciente (Obrigatório para compartilhar opções)</Label>
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
              <Label>Filtro de Entidades Cadastradas</Label>
              <Select value={filterType} onValueChange={(v: any) => setFilterType(v)}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os serviços" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Mostrar Todas</SelectItem>
                  <SelectItem value="laboratorio">Laboratórios Clínicos</SelectItem>
                  <SelectItem value="farmacia">Farmácias de Manipulação</SelectItem>
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
            className="shadow-sm hover:shadow-md transition-all flex flex-col bg-white border border-border/60"
          >
            <CardHeader className="pb-3 border-b border-muted/50 bg-slate-50/50">
              <div className="flex justify-between items-start mb-3">
                <Badge
                  variant={partner.tipo === 'laboratorio' ? 'default' : 'secondary'}
                  className="uppercase text-[10px] tracking-wider px-2 py-0.5"
                >
                  {partner.tipo === 'laboratorio' ? 'Laboratório' : 'Farmácia Magistral'}
                </Badge>
                {partner.integracao_api && (
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 uppercase tracking-wider"
                  >
                    API Conectada
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg flex items-center gap-2 text-slate-800">
                {partner.tipo === 'laboratorio' ? (
                  <Beaker className="w-5 h-5 text-blue-600" />
                ) : (
                  <Building2 className="w-5 h-5 text-emerald-600" />
                )}
                {partner.nome}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2 text-xs font-medium text-muted-foreground">
                <span className="font-mono bg-white border px-1.5 py-0.5 rounded shadow-sm">
                  ID: {partner.id}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {partner.localizacao}
                </span>
                <span className="ml-auto text-emerald-600 font-bold uppercase">
                  {partner.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="py-5 space-y-5 flex-1 text-sm">
              <div>
                <strong className="text-[11px] font-bold text-muted-foreground uppercase block mb-2 tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5" /> Certificações de Qualidade
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {partner.certificacoes.map((c, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="bg-slate-100 text-slate-700 font-medium border-slate-200"
                    >
                      {c}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-[11px] font-bold text-muted-foreground uppercase block mb-2 tracking-wider">
                  Catálogo de Serviços Específicos
                </strong>
                <div className="text-slate-600 text-sm leading-relaxed border-l-2 border-slate-200 pl-3">
                  {partner.servicos.join(' • ')}
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-slate-50/80 border-t p-4 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-slate-100 text-slate-700 border-slate-300 font-semibold"
                onClick={() => handleReferral(partner.id, partner.nome, partner.tipo)}
              >
                Apresentar Opção (Escolha Livre) <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground leading-tight px-4">
                A seleção final deve ser sempre feita pelo paciente através de seu portal,
                garantindo independência no fluxo da cadeia.
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
