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
import { Activity, Save } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function BaselineTab() {
  const [complaint, setComplaint] = useState('')
  const [schoolYear, setSchoolYear] = useState('')
  const [history, setHistory] = useState('')
  const [performance, setPerformance] = useState('')

  const handleSave = () => {
    toast({
      title: 'Baseline Salvo',
      description: 'Screening psicopedagógico registrado com sucesso.',
    })
  }

  const getProfile = () => {
    if (!complaint || !schoolYear || !history || !performance) return null
    let profile = ''
    let classification = ''

    if (performance === 'Abaixo do Esperado' && complaint === 'Leitura') {
      classification = 'Risco: Dislexia / Transtorno de Leitura'
      profile =
        'Atraso significativo no processo de decodificação e fluência leitora. Necessário investigar processamento fonológico.'
    } else if (complaint === 'Atenção' && history === 'Atraso Motor') {
      classification = 'Risco: Disfunção Executiva / TDAH'
      profile =
        'Dificuldade de sustentação atencional e sinais de agitação motora. Avaliar controle inibitório.'
    } else {
      classification = 'Dificuldade de Aprendizagem Mista'
      profile =
        'Desempenho aquém do esperado sem uma queixa específica isolada. Necessário mapeamento abrangente.'
    }

    return { profile, classification }
  }

  const result = getProfile()

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5 text-indigo-600" /> Screening Inicial Escolar
          </CardTitle>
          <CardDescription>
            Registre as queixas principais e o histórico para gerar o perfil preliminar de
            aprendizagem.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Queixa Escolar Principal</Label>
              <Select value={complaint} onValueChange={setComplaint}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leitura">Leitura (Fluência/Compreensão)</SelectItem>
                  <SelectItem value="Escrita">Escrita (Ortografia/Produção)</SelectItem>
                  <SelectItem value="Matemática">Matemática (Raciocínio/Cálculo)</SelectItem>
                  <SelectItem value="Atenção">Atenção e Comportamento</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ano Escolar / Série</Label>
              <Select value={schoolYear} onValueChange={setSchoolYear}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ed Infantil">Educação Infantil</SelectItem>
                  <SelectItem value="Fund 1">Ensino Fundamental I</SelectItem>
                  <SelectItem value="Fund 2">Ensino Fundamental II</SelectItem>
                  <SelectItem value="Medio">Ensino Médio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Histórico de Desenvolvimento</Label>
              <Select value={history} onValueChange={setHistory}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sem Alterações">Sem Alterações Relevantes</SelectItem>
                  <SelectItem value="Atraso Fala">Atraso no Desenvolvimento da Fala</SelectItem>
                  <SelectItem value="Atraso Motor">Atraso Motor / Agitação</SelectItem>
                  <SelectItem value="Prematuridade">Prematuridade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Desempenho Escolar Relatado</Label>
              <Select value={performance} onValueChange={setPerformance}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abaixo do Esperado">Abaixo do Esperado</SelectItem>
                  <SelectItem value="Na Média">Na Média</SelectItem>
                  <SelectItem value="Acima da Média">Acima da Média</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700">
              <Save className="w-4 h-4 mr-2" /> Salvar Screening
            </Button>
          </div>

          <div className="bg-slate-50 border rounded-lg p-5">
            <h3 className="font-semibold text-primary flex items-center gap-2 mb-4 border-b pb-2">
              <Activity className="w-4 h-4 text-indigo-500" /> Perfil Inicial de Aprendizagem
            </h3>
            {result ? (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <span className="text-xs uppercase text-muted-foreground font-semibold block mb-1">
                    Áreas de Risco Identificadas
                  </span>
                  <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-100 text-sm">
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
                Preencha os campos ao lado para gerar o perfil preliminar de aprendizagem.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
