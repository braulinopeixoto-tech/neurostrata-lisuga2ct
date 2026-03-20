import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, Save, Activity, Network } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'

export function BaselineTab({ patientId }: { patientId: string }) {
  const [complaint, setComplaint] = useState('')
  const [history, setHistory] = useState('')
  const [funcLevel, setFuncLevel] = useState('')
  const [rdocImpact, setRdocImpact] = useState('')
  const { logAction } = useTeamFlowStore()

  const handleSave = () => {
    if (!complaint || !rdocImpact) {
      toast({
        title: 'Campos Obrigatórios',
        description: 'Preencha a queixa e o impacto RDoC para prosseguir.',
        variant: 'destructive',
      })
      return
    }

    logAction(
      'speech_therapy_baseline',
      patientId,
      'SAVE_BASELINE',
      null,
      { complaint, history, funcLevel, rdocImpact },
      'Fonoaudiologia',
    )

    toast({
      title: 'Baseline RDoC Salvo',
      description: 'Dados registrados na Trust Layer e refletidos no VitalScore™.',
    })
  }

  const getProfile = () => {
    if (!complaint || !history || !funcLevel) return null
    let profile = ''
    let classification = ''

    if (complaint === 'Linguagem/Compreensão' && history === 'AVC') {
      classification = 'Afasia Receptiva Provável'
      profile =
        'Comprometimento na decodificação de estímulos verbais e semânticos. Necessidade de avaliação de Wernicke.'
    } else if (complaint === 'Fala/Articulação' && history === 'Neurodesenvolvimento') {
      classification = 'Atraso Motor da Fala'
      profile = 'Dificuldade na programação e execução dos movimentos articulatórios.'
    } else if (complaint === 'Leitura/Escrita' || funcLevel === 'Leve') {
      classification = 'Dificuldade de Processamento / Aprendizagem'
      profile = 'Trocas fonêmicas e dificuldade de conversão grafema-fonema.'
    } else {
      classification = 'Avaliação Mista Necessária'
      profile = 'Quadro atípico. Sugere-se mapeamento completo de linguagem e cognição.'
    }

    return { profile, classification }
  }

  const result = getProfile()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-600" /> Screening Inicial (Baseline)
          </CardTitle>
          <CardDescription>
            Defina a queixa principal e mapeie o impacto dimensional no sistema RDoC.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Queixa Principal</Label>
              <Select value={complaint} onValueChange={setComplaint}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fala/Articulação">Fala / Articulação</SelectItem>
                  <SelectItem value="Linguagem/Compreensão">Linguagem / Compreensão</SelectItem>
                  <SelectItem value="Leitura/Escrita">Leitura / Escrita</SelectItem>
                  <SelectItem value="Voz/Deglutição">Voz / Deglutição</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Impacto Dimensional (RDoC)</Label>
              <Select value={rdocImpact} onValueChange={setRdocImpact}>
                <SelectTrigger className="border-indigo-200">
                  <SelectValue placeholder="Selecione o domínio RDoC afetado..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sistemas Cognitivos">
                    Sistemas Cognitivos (Linguagem)
                  </SelectItem>
                  <SelectItem value="Sistemas de Processamento Social">
                    Processamento Social (Comunicação Pragmática)
                  </SelectItem>
                  <SelectItem value="Sistemas Sensório-Motores">
                    Sistemas Sensório-Motores (Articulação)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Histórico Clínico Associado</Label>
              <Select value={history} onValueChange={setHistory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AVC">Acidente Vascular Cerebral (AVC)</SelectItem>
                  <SelectItem value="TCE">Traumatismo Cranioencefálico (TCE)</SelectItem>
                  <SelectItem value="Neurodesenvolvimento">
                    Transtorno do Neurodesenvolvimento
                  </SelectItem>
                  <SelectItem value="Neurodegenerativo">Quadro Neurodegenerativo</SelectItem>
                  <SelectItem value="Nenhum">Sem histórico relevante</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nível Funcional de Comunicação</Label>
              <Select value={funcLevel} onValueChange={setFuncLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grave">
                    Grave (Não verbal ou ausência de compreensão)
                  </SelectItem>
                  <SelectItem value="Moderado">
                    Moderado (Comunica necessidades básicas com apoio)
                  </SelectItem>
                  <SelectItem value="Leve">
                    Leve (Fluente com leves trocas ou hesitações)
                  </SelectItem>
                  <SelectItem value="Preservado">Plenamente Preservado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700">
              <Save className="w-4 h-4 mr-2" /> Salvar & Sincronizar VitalScore
            </Button>
          </div>

          <div className="bg-slate-50 border rounded-lg p-5 flex flex-col gap-4">
            <h3 className="font-semibold text-primary flex items-center gap-2 border-b pb-2">
              <Activity className="w-4 h-4 text-blue-500" /> Perfil Funcional e Estratificação
            </h3>
            {result ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-xs uppercase text-muted-foreground font-semibold block mb-1">
                    Classificação Inicial
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-sm">
                    {result.classification}
                  </Badge>
                </div>
                <div>
                  <span className="text-xs uppercase text-muted-foreground font-semibold block mb-1">
                    Síntese do Perfil
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 border rounded shadow-sm">
                    {result.profile}
                  </p>
                </div>
                {rdocImpact && (
                  <div className="bg-indigo-50 border border-indigo-100 p-3 rounded-md">
                    <span className="text-xs uppercase text-indigo-800 font-semibold flex items-center gap-1.5 mb-1">
                      <Network className="w-3.5 h-3.5" /> Convergência RDoC
                    </span>
                    <p className="text-xs text-indigo-900/80 leading-relaxed font-medium">
                      O agravo em <strong>{rdocImpact}</strong> será computado no VitalScore™ como
                      um fator de atrito (Friction Score), influenciando o planejamento
                      multidisciplinar do paciente.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8 my-auto">
                Preencha os campos ao lado para gerar o perfil funcional preliminar e a correlação
                com o sistema RDoC.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
