import { ShieldCheck } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'
import { DimensionalRadarChart } from '@/components/charts/DimensionalRadarChart'
import { BrainMapVisualizer } from '@/components/charts/BrainMapVisualizer'
import { Badge } from '@/components/ui/badge'

export function ReportPreviewDocument() {
  const { data } = useReportStore()

  const Block = ({ num, title, content }: { num: number; title: string; content: string }) => (
    <section className="space-y-2 break-inside-avoid">
      <h3 className="font-bold text-sm bg-muted/50 px-3 py-1.5 rounded uppercase tracking-wide border-l-4 border-primary">
        {num}. {title}
      </h3>
      <p className="text-sm px-3 leading-relaxed whitespace-pre-wrap">{content}</p>
    </section>
  )

  return (
    <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[1000px] text-foreground animate-fade-in relative">
      {data.isSigned && (
        <div className="absolute top-8 right-8 rotate-12 opacity-80 pointer-events-none">
          <div className="border-4 border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg font-bold text-xl uppercase tracking-widest bg-emerald-50/50">
            Assinado Digitalmente
          </div>
        </div>
      )}

      <div className="text-center border-b pb-6 mb-8">
        <h2 className="text-3xl font-serif font-bold text-primary uppercase tracking-widest">
          NEUROSTRATA
        </h2>
        <p className="text-muted-foreground uppercase tracking-widest mt-2 font-medium flex items-center justify-center gap-2">
          Relatório Neurofuncional Dimensional
          {data.isSigned && (
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              Finalizado
            </Badge>
          )}
        </p>
      </div>

      <div className="space-y-8">
        <section className="space-y-2">
          <h3 className="font-bold text-sm bg-muted/50 px-3 py-1.5 rounded uppercase tracking-wide border-l-4 border-primary">
            1. Identificação
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-3 text-sm">
            <div className="col-span-2">
              <span className="text-muted-foreground text-xs uppercase">Paciente</span>
              <strong className="block text-base">{data.patientName}</strong>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase">Data de Nascimento</span>
              <strong className="block text-base">
                {data.dob} ({data.age} anos)
              </strong>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase">Sexo</span>
              <strong className="block text-base">{data.sex}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground text-xs uppercase">Escolaridade</span>
              <strong className="block">{data.education}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground text-xs uppercase">Responsável Legal</span>
              <strong className="block">{data.guardian}</strong>
            </div>
            <div className="col-span-2">
              <span className="text-muted-foreground text-xs uppercase">Profissional</span>
              <strong className="block">{data.professional}</strong>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase">Instituição</span>
              <strong className="block">{data.institution}</strong>
            </div>
            <div>
              <span className="text-muted-foreground text-xs uppercase">Data de Emissão</span>
              <strong className="block">{data.evalDate}</strong>
            </div>
          </div>
        </section>

        <Block num={2} title="Motivo da Avaliação" content={data.reason} />
        <Block num={3} title="Histórico Clínico" content={data.history} />
        <Block num={4} title="Perfil Comportamental" content={data.behavior} />
        <Block num={5} title="Avaliação Cognitiva" content={data.cognitive} />
        <Block num={6} title="Análise RDoC" content={data.rdoc} />
        <Block num={7} title="Perfil Big Five" content={data.bigFive} />
        <Block num={8} title="18 Funções Psíquicas" content={data.psychicFunc} />
        <Block num={9} title="Análise Neurofisiológica" content={data.neurophysio} />
        <Block num={10} title="Integração NeuroStrata" content={data.integration} />
        <Block num={11} title="Hipóteses Clínicas (DSM-5-TR)" content={data.hypotheses} />
        <Block num={12} title="Plano de Intervenção" content={data.intervention} />

        <section className="space-y-4 break-inside-avoid">
          <h3 className="font-bold text-sm bg-muted/50 px-3 py-1.5 rounded uppercase tracking-wide border-l-4 border-primary">
            13. Índices NeuroStrata
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-3">
            <div className="border border-emerald-500/20 rounded-lg p-4 text-center bg-emerald-500/5">
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                Integridade
              </div>
              <div className="text-2xl font-bold text-emerald-600">{data.idxIntegrity}</div>
            </div>
            <div className="border border-amber-500/20 rounded-lg p-4 text-center bg-amber-500/5">
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                Comprometimento
              </div>
              <div className="text-2xl font-bold text-amber-600">{data.idxImpairment}</div>
            </div>
            <div className="border border-rose-500/20 rounded-lg p-4 text-center bg-rose-500/5">
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                Risco Clínico
              </div>
              <div className="text-2xl font-bold text-rose-600">{data.idxRisk}</div>
            </div>
            <div className="border border-purple-500/20 rounded-lg p-4 text-center bg-purple-500/5">
              <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1">
                Disfunção
              </div>
              <div className="text-2xl font-bold text-purple-600">{data.idxDysfunction}</div>
            </div>
          </div>
        </section>

        <section className="space-y-4 break-inside-avoid">
          <h3 className="font-bold text-sm bg-muted/50 px-3 py-1.5 rounded uppercase tracking-wide border-l-4 border-primary">
            14. Visualizações Dimensionais
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center px-3 border rounded-xl p-4 bg-muted/5">
            <div>
              <h4 className="text-center text-xs font-bold text-muted-foreground uppercase mb-2">
                Radar de Assinatura Neurofuncional
              </h4>
              <DimensionalRadarChart data={data.radarData} />
            </div>
            <div className="flex flex-col items-center">
              <h4 className="text-center text-xs font-bold text-muted-foreground uppercase mb-2">
                Topografia qEEG (Amostra)
              </h4>
              <BrainMapVisualizer variant="frontal" title="Excesso Frontal Relativo" />
            </div>
          </div>
        </section>

        <Block num={15} title="Conclusão Técnica" content={data.conclusion} />

        <section className="space-y-2 break-inside-avoid">
          <h3 className="font-bold text-sm bg-muted/50 px-3 py-1.5 rounded uppercase tracking-wide border-l-4 border-primary">
            16. Referências Científicas
          </h3>
          <ul className="text-xs text-muted-foreground px-5 list-disc list-inside space-y-1">
            <li>
              American Psychiatric Association. (2022). Diagnostic and Statistical Manual of Mental
              Disorders (5th ed., text rev.).
            </li>
            <li>
              Insel, T., et al. (2010). Research Domain Criteria (RDoC): Toward a new classification
              framework. Am J Psychiatry.
            </li>
            <li>Costa, P. T., & McCrae, R. R. (1992). Revised NEO Personality Inventory.</li>
            <li>Buzsáki, G. (2006). Rhythms of the Brain. Oxford University Press.</li>
          </ul>
        </section>

        <section className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-start gap-6 bg-muted/10 p-6 rounded-lg break-inside-avoid">
          {data.isSigned && data.signature ? (
            <div className="space-y-3 w-full max-w-sm">
              <div className="flex items-center gap-2 text-green-700 font-bold">
                <ShieldCheck className="w-6 h-6" />
                <span>Assinatura Digital Verificada</span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1.5 bg-white p-3 rounded border shadow-sm">
                <p>
                  <strong>Padrão:</strong> {data.signature.standard}
                </p>
                <p>
                  <strong>Autenticidade:</strong>{' '}
                  <span className="font-mono text-[10px] bg-muted px-1 py-0.5 rounded break-all">
                    {data.signature.hash}
                  </span>
                </p>
                <p>
                  <strong>Carimbo de Tempo:</strong>{' '}
                  {new Date(data.signature.timestamp).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground italic">
              * Documento pendente de assinatura digital.
            </div>
          )}

          <div className="border-t border-foreground w-full md:w-64 text-center pt-3 mt-4 md:mt-0 self-center">
            <strong className="text-base text-primary block">
              {data.signature?.name || data.professional}
            </strong>
            <span className="text-sm text-muted-foreground block">
              {data.signature?.professionalId || 'Registro Profissional'}
            </span>
          </div>
        </section>
      </div>
    </div>
  )
}
