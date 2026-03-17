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
import { MessageSquare, Save, Activity } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function BaselineTab() {
  const [complaint, setComplaint] = useState('')
  const [history, setHistory] = useState('')
  const [funcLevel, setFuncLevel] = useState('')

  const handleSave = () => {
    toast({ title: 'Baseline Salvo', description: 'Dados iniciais registrados com sucesso.' })
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
            Defina a queixa principal e o histórico para gerar o perfil funcional preliminar da
            linguagem.
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
              <Save className="w-4 h-4 mr-2" /> Salvar Screening
            </Button>
          </div>

          <div className="bg-slate-50 border rounded-lg p-5">
            <h3 className="font-semibold text-primary flex items-center gap-2 mb-4 border-b pb-2">
              <Activity className="w-4 h-4 text-blue-500" /> Perfil Funcional da Linguagem
            </h3>
            {result ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-xs uppercase text-muted-foreground font-semibold block mb-1">
                    Classificação Inicial
                  </span>
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100 text-sm">
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
              </div>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                Preencha os campos ao lado para gerar o perfil funcional preliminar.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
