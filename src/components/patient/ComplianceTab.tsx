import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Save, ShieldCheck, AlertCircle } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'
import { toast } from '@/components/ui/use-toast'

const UNESCO_DOMAINS = [
  {
    id: 'mentalIntegrity',
    title: 'Integridade Mental',
    desc: 'Proteção contra alterações não autorizadas do estado mental.',
  },
  {
    id: 'personalIdentity',
    title: 'Identidade Pessoal',
    desc: 'Proteção do senso de si e continuidade psicológica.',
  },
  {
    id: 'freeWill',
    title: 'Livre Arbítrio / Agência Humana',
    desc: 'Capacidade de tomada de decisão autônoma durante intervenções.',
  },
  {
    id: 'mentalPrivacy',
    title: 'Privacidade Mental',
    desc: 'Controles para proteção de dados neurais e atividade cerebral.',
  },
  {
    id: 'equity',
    title: 'Equidade e Não-Discriminação',
    desc: 'Garantia de acesso justo e prevenção de vieses algorítmicos.',
  },
]

export function ComplianceTab({ patientId }: { patientId: string }) {
  const { patientCompliance, setPatientCompliance, addPatientAuditLog, currentUser } = useAppStore()
  const [data, setData] = useState<Record<string, { status: string; observation: string }>>({})

  useEffect(() => {
    if (patientCompliance[patientId]) {
      setData(patientCompliance[patientId])
    } else {
      const init: any = {}
      UNESCO_DOMAINS.forEach((d) => {
        init[d.id] = { status: 'review', observation: '' }
      })
      setData(init)
    }
  }, [patientId, patientCompliance])

  const updateData = (domainId: string, field: 'status' | 'observation', value: string) => {
    setData((prev) => ({
      ...prev,
      [domainId]: { ...prev[domainId], [field]: value },
    }))
  }

  const getStatusLabel = (status: string) => {
    if (status === 'compliant') return 'Conforme'
    if (status === 'review') return 'Em Revisão'
    return 'Não Conforme'
  }

  const handleSave = () => {
    setPatientCompliance(patientId, data)

    const metadata: Record<string, string[]> = {}
    UNESCO_DOMAINS.forEach((d) => {
      metadata[d.title] = [`Status: ${getStatusLabel(data[d.id]?.status || 'review')}`]
      if (data[d.id]?.observation) {
        metadata[d.title].push(`Obs: ${data[d.id].observation}`)
      }
    })

    addPatientAuditLog(patientId, {
      date: new Date().toISOString(),
      action: 'Avaliação de Conformidade Neuroética',
      user: currentUser.fullName,
      details: 'Revisão estruturada dos pilares da UNESCO para neurotecnologia.',
      metadata,
    })

    toast({
      title: 'Conformidade Atualizada',
      description: 'Diretrizes da UNESCO salvas e registradas na auditoria com sucesso.',
    })
  }

  if (Object.keys(data).length === 0) return null

  const compliantCount = Object.values(data).filter((d) => d.status === 'compliant').length
  const progress = (compliantCount / UNESCO_DOMAINS.length) * 100

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" /> Conformidade Neuroética
          </h2>
          <p className="text-sm text-muted-foreground">
            Avaliação baseada no framework de direitos neurais da UNESCO.
          </p>
        </div>
        <Button onClick={handleSave} className="w-full sm:w-auto">
          <Save className="w-4 h-4 mr-2" /> Salvar Conformidade
        </Button>
      </div>

      <Card className="bg-muted/30 border-border/60">
        <CardContent className="pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 w-full">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                Índice de Aderência Global
              </span>
              <span className="text-sm font-medium text-foreground">
                {compliantCount} de {UNESCO_DOMAINS.length} Pilares
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="shrink-0">
            {progress === 100 ? (
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 text-sm">
                Totalmente Conforme
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="border-amber-400 text-amber-700 bg-amber-50 px-3 py-1 text-sm flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" /> Atenção Requerida
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {UNESCO_DOMAINS.map((domain) => (
          <Card key={domain.id} className="overflow-hidden shadow-sm hover:shadow transition-all">
            <CardHeader className="pb-3 bg-muted/10 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-base text-primary">{domain.title}</CardTitle>
                  <CardDescription className="mt-1">{domain.desc}</CardDescription>
                </div>
                <Select
                  value={data[domain.id]?.status}
                  onValueChange={(v) => updateData(domain.id, 'status', v)}
                >
                  <SelectTrigger className="w-full sm:w-[160px] bg-background font-medium">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliant">Conforme</SelectItem>
                    <SelectItem value="review">Em Revisão</SelectItem>
                    <SelectItem value="non_compliant">Não Conforme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <label className="text-xs font-semibold uppercase text-muted-foreground mb-2 block">
                Observações de Neuroética
              </label>
              <Textarea
                placeholder="Documente as evidências, controles ou justificativas para o status atual deste pilar..."
                value={data[domain.id]?.observation}
                onChange={(e) => updateData(domain.id, 'observation', e.target.value)}
                className="min-h-[80px] text-sm resize-none bg-background/50 focus:bg-background transition-colors"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
