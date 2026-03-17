import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Zap, PlusCircle, CheckCircle2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

const FONO_PROTOCOLS = [
  'Reabilitação de Afasia (Broca/Wernicke)',
  'Treino de Linguagem Expressiva',
  'Treino de Compreensão',
  'Reabilitação Pós-AVC',
  'Treino de Processamento Auditivo Central',
]

export function RehabProtocolsTab() {
  const [fonoProt, setFonoProt] = useState('')
  const [neuroMod, setNeuroMod] = useState('')
  const [activeProtocols, setActiveProtocols] = useState<any[]>([])

  const handleAdd = () => {
    if (!fonoProt || !neuroMod) {
      toast({
        title: 'Atenção',
        description: 'Selecione a terapia e a neuromodulação.',
        variant: 'destructive',
      })
      return
    }
    setActiveProtocols((prev) => [...prev, { fono: fonoProt, neuro: neuroMod, id: Date.now() }])
    toast({
      title: 'Protocolo Registrado',
      description: 'O plano de intervenção combinada foi salvo.',
    })
    setFonoProt('')
    setNeuroMod('')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" /> Protocolos de Reabilitação Integrada
          </CardTitle>
          <CardDescription>
            Associe os treinos fonoaudiológicos específicos aos alvos de neuromodulação.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end bg-slate-50 p-4 rounded-lg border mb-6">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Protocolo Fonoaudiológico</label>
              <Select value={fonoProt} onValueChange={setFonoProt}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {FONO_PROTOCOLS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium">Suporte Neuromodulatório</label>
              <Select value={neuroMod} onValueChange={setNeuroMod}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tDCS Broca">tDCS Anódica (Área de Broca - F7/F8)</SelectItem>
                  <SelectItem value="tDCS Wernicke">
                    tDCS Anódica (Área de Wernicke - CP5/P3)
                  </SelectItem>
                  <SelectItem value="tACS Alpha">tACS Alpha Parietal</SelectItem>
                  <SelectItem value="Neurofeedback SMR">Neurofeedback (Treino SMR)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAdd} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <PlusCircle className="w-4 h-4 mr-2" /> Associar
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase text-muted-foreground">
              Plano de Intervenção Ativo
            </h4>
            {activeProtocols.length === 0 ? (
              <p className="text-sm text-muted-foreground italic border border-dashed p-4 rounded text-center">
                Nenhum protocolo combinado registrado.
              </p>
            ) : (
              activeProtocols.map((prot) => (
                <div
                  key={prot.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg bg-white shadow-sm"
                >
                  <div>
                    <h5 className="font-bold text-primary">{prot.fono}</h5>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-500" /> Associado com: {prot.neuro}
                    </p>
                  </div>
                  <Badge className="mt-2 sm:mt-0 bg-emerald-50 text-emerald-700 border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Em andamento
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
