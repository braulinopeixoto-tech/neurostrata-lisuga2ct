import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FileText, Download, Sparkles } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function QuickReportTab() {
  const [report, setReport] = useState('')
  const [generating, setGenerating] = useState(false)
  const [template, setTemplate] = useState('technical')

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => {
      if (template === 'technical') {
        setReport(`RELATÓRIO PSICOPEDAGÓGICO - VERSÃO TÉCNICA CLÍNICA
Data: ${new Date().toLocaleDateString()}

1. PERFIL DE APRENDIZAGEM:
Risco para Disfunção Executiva, com atraso significativo no processo de decodificação e controle inibitório. Correlação positiva com hiperativação de Sistemas Cognitivos (RDoC).

2. DIFICULDADES IDENTIFICADAS:
- Leitura: Alteração Severa (Fluência reduzida, trocas por impulsividade).
- Atenção: Alteração Moderada.

3. PLANO DE INTERVENÇÃO:
- Meta: Melhorar controle atencional e fluência leitora.
- Estratégia: Organização Cognitiva e Reforço de Consciência Fonológica (2x/semana).

4. ORIENTAÇÕES:
Recomendada adaptação curricular e tempo estendido de prova na instituição escolar.`)
      } else {
        setReport(`RELATÓRIO PSICOPEDAGÓGICO - VERSÃO SIMPLIFICADA (ESCOLA/FAMÍLIA)
Data: ${new Date().toLocaleDateString()}

1. COMO O ALUNO APRENDE (Perfil):
O aluno demonstra excelente potencial, mas atualmente enfrenta desafios na concentração e na hora de ler textos mais longos de forma fluida.

2. PONTOS DE ATENÇÃO:
Notamos que a leitura e a manutenção do foco nas atividades de sala de aula precisam de apoio extra.

3. O QUE ESTAMOS FAZENDO (Plano):
Trabalharemos 2 vezes por semana com exercícios lúdicos focados em organizar as ideias e treinar a atenção.

4. RECOMENDAÇÕES PARA A ESCOLA:
Sugerimos gentilmente conceder tempo extra nas avaliações e permitir que as provas tenham menos textos visuais complexos por página.`)
      }
      setGenerating(false)
    }, 1200)
  }

  const handleExport = () => {
    toast({
      title: 'Relatório Exportado',
      description: 'Documento psicopedagógico gerado com sucesso.',
    })
  }

  return (
    <Card className="shadow-sm animate-fade-in border-t-4 border-t-indigo-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" /> Gerador de Relatórios Psicopedagógicos
        </CardTitle>
        <CardDescription>
          Gere relatórios automatizados baseados nos dados integrados. Escolha entre versão técnica
          ou simplificada.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger className="w-full sm:w-[300px] bg-white">
              <SelectValue placeholder="Selecione a versão..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technical">Versão Técnica (Para Prontuário Clínico)</SelectItem>
              <SelectItem value="simplified">Versão Simplificada (Para Pais e Escola)</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleGenerate}
            disabled={generating}
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            {generating ? 'Sintetizando Dados...' : 'Gerar Relatório'}
          </Button>
        </div>

        <Textarea
          className="min-h-[350px] text-sm leading-relaxed font-mono bg-slate-50"
          placeholder="O relatório estruturado aparecerá aqui..."
          value={report}
          onChange={(e) => setReport(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            onClick={handleExport}
            disabled={!report}
            className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
          >
            <Download className="w-4 h-4 mr-2" /> Exportar PDF Final
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
