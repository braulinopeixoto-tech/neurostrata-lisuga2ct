import { Save, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { toast } from '@/components/ui/use-toast'

export default function Report() {
  const handleExport = () => {
    toast({
      title: 'PDF Gerado',
      description: 'O laudo foi salvo e baixado com sucesso.',
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border-b sticky top-16 z-20 shadow-sm rounded-lg">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" /> Editor de Laudo Inteligente
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" /> Salvar Rascunho
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" /> Exportar PDF
          </Button>
        </div>
      </div>

      <div className="space-y-8 bg-white p-8 rounded-xl shadow-elevation border min-h-[800px]">
        {/* Header Laudo */}
        <div className="text-center border-b pb-6">
          <h2 className="text-2xl font-serif font-bold text-primary uppercase tracking-widest">
            NEUROSTRATA
          </h2>
          <p className="text-sm text-muted-foreground uppercase tracking-widest mt-1">
            Análise Neurofuncional de Base Científica
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="font-bold text-lg bg-muted px-3 py-1 rounded">1. Identificação</h3>
          <div className="grid grid-cols-2 gap-4 px-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Paciente
              </label>
              <Input
                defaultValue="Ana Silva Oliveira"
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Data da Avaliação
              </label>
              <Input
                defaultValue="15/10/2023"
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Avaliador
              </label>
              <Input
                defaultValue="Dr. Renato Alves (CRM 12345)"
                className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-lg bg-muted px-3 py-1 rounded">2. Contexto Clínico</h3>
          <div className="px-3">
            <Textarea
              className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
              defaultValue="A paciente apresenta quadro compatível com esgotamento atencional crônico, associado a sintomas de ansiedade moderada. Nega histórico de trauma cranioencefálico recente."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-lg bg-muted px-3 py-1 rounded">
            3. Avaliação Neurofuncional (Auto-gerada)
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[150px] resize-none border-0 focus-visible:ring-0 p-0 text-base leading-relaxed"
              defaultValue="O processamento via NeuroStrata evidenciou um Índice Geral de 70/100. Observa-se preservação significativa do Domínio Cognitivo e Social. No entanto, há um rebaixamento expressivo (Escore 42) no Domínio de Regulação Emocional (RDoC: Valência Negativa aumentada). As funções de Controle Inibitório e Memória de Trabalho apresentam flutuações dependentes do estado de alerta."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-lg bg-muted px-3 py-1 rounded">
            4. Integração e Conclusão
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[120px] resize-none border-0 focus-visible:ring-0 p-0 text-base"
              defaultValue="Perfil neurofuncional instável no eixo límbico-frontal. Sugere-se intervenção direcionada à regulação autonômica e modulação do córtex pré-frontal para suporte do controle inibitório."
            />
          </div>
        </section>

        <section className="mt-12 pt-8 border-t">
          <p className="text-xs text-muted-foreground text-center italic">
            Considerações Técnicas: Este relatório é um instrumento de inteligência analítica
            complementar. Os resultados não substituem o diagnóstico médico formal e devem ser
            integrados à prática clínica padronizada.
          </p>
        </section>
      </div>
    </div>
  )
}
