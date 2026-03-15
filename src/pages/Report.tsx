import { Save, Download, FileText, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

export default function Report() {
  const handleExport = (format: string) => {
    toast({
      title: `${format} Gerado`,
      description: 'O laudo estruturado foi processado e baixado.',
      action: <CheckCircle2 className="text-success w-5 h-5" />,
    })
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 border-b sticky top-16 z-20 shadow-sm rounded-lg">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5 text-accent" /> Editor de Laudo Estruturado
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Conformidade com padrões EHR e LGPD.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" /> Rascunho
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleExport('DOCX')}>
            <Download className="w-4 h-4 mr-2" /> DOCX
          </Button>
          <Button size="sm" onClick={() => handleExport('PDF')}>
            <Download className="w-4 h-4 mr-2" /> PDF Assinado
          </Button>
        </div>
      </div>

      <div className="space-y-8 bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[800px] text-sm">
        {/* Header Laudo */}
        <div className="text-center border-b pb-8">
          <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">
            NEUROSTRATA
          </h2>
          <p className="text-muted-foreground uppercase tracking-widest mt-2 font-medium">
            Avaliação Neurofuncional Multidimensional
          </p>
        </div>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            1. Identificação
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                Paciente
              </label>
              <Input
                defaultValue="Ana Silva Oliveira"
                className="border-0 border-b rounded-none px-0 h-8"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Data</label>
              <Input
                defaultValue="15/10/2023"
                className="border-0 border-b rounded-none px-0 h-8"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">
                NSI Score
              </label>
              <Input
                defaultValue="70/100"
                className="border-0 border-b rounded-none px-0 h-8 text-primary font-bold"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            2. Motivo e Histórico Clínico
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[80px] resize-none border-0 p-0"
              defaultValue="A paciente busca avaliação por esgotamento atencional crônico e ansiedade. Histórico familiar positivo para TAG. Relata impacto direto no desempenho executivo em ambiente de trabalho."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            3. Perfil RDoC e Big Five
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[100px] resize-none border-0 p-0 leading-relaxed"
              defaultValue="RDoC: Elevada ativação no domínio de Valência Negativa (medo/ansiedade crônica). Big Five: Neuroticismo acentuado, com Conscienciosidade preservada, indicando esforço intenso para manutenção da performance."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            4. Mapeamento de Funções Psíquicas
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[100px] resize-none border-0 p-0 leading-relaxed"
              defaultValue="Eixo Cognitivo e Social demonstram integridade. O Eixo Afetivo (Regulação Emocional) encontra-se em 42%, afetando secundariamente o Eixo Executivo (Controle Inibitório), gerando flutuações atencionais estado-dependentes."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            5. Integração de Biomarcadores (qEEG)
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[80px] resize-none border-0 p-0 leading-relaxed"
              defaultValue="A análise topográfica revela excesso de atividade em faixa Theta na região frontopolar (Fp1-Fp2), compatível com desregulação da rede frontolímbica."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-bold text-base bg-muted px-3 py-1.5 rounded uppercase tracking-wide">
            6. Integração Diagnóstica e Intervenção
          </h3>
          <div className="px-3">
            <Textarea
              className="min-h-[120px] resize-none border-0 p-0 leading-relaxed"
              defaultValue="Quadro neurofuncional compatível com Carga Alostática elevada. Recomenda-se:&#10;1. Intervenção terapêutica focada em flexibilidade cognitiva.&#10;2. Avaliação de Neuromodulação (Protocolo tDCS Anódico em Córtex Pré-Frontal)."
            />
          </div>
        </section>

        <section className="mt-16 pt-8 border-t space-y-4 text-xs text-muted-foreground">
          <p className="text-center italic">
            Documento assinado digitalmente em conformidade com as normas LGPD. Registro de
            auditoria temporal gravado no sistema EHR.
          </p>
          <div className="flex justify-center mt-8">
            <div className="border-t border-muted-foreground w-64 text-center pt-2">
              <strong>Dr. Renato Alves</strong>
              <br />
              CRM 12345-SP
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
