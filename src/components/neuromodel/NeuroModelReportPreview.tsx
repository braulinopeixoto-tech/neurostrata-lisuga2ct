import { CaseWorkspace } from '@/stores/useTeamFlowStore'
import { ShieldCheck, Brain, FileText } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function NeuroModelReportPreview({ caseData }: { caseData: CaseWorkspace }) {
  const { patients } = useAppStore()
  const patient = patients.find((p) => p.id === caseData.patient_id)
  const blocks = caseData.blocks

  if (!patient) return null

  return (
    <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[800px] text-sm animate-fade-in w-full max-w-4xl mx-auto">
      {/* HEADER BIM / OFFICIAL */}
      <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center relative">
        <h2 className="text-3xl font-serif font-black text-slate-900 uppercase tracking-widest">
          NeuroStrata
        </h2>
        <p className="text-slate-500 uppercase tracking-widest mt-2 font-semibold text-xs">
          Laudo Neurofuncional Dimensional
        </p>
        <p className="text-slate-400 text-[10px] mt-1">
          Protocolo Clinical v1.0 | NeuroModel ID: {caseData.id}
        </p>

        {caseData.status === 'Laudo Validado' && (
          <div className="absolute top-0 right-0 hidden sm:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-300 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Trust Layer™ Verified
          </div>
        )}
      </div>

      <div className="space-y-10">
        {/* BLOCO 1 */}
        <section>
          <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-4 border-l-4 border-l-slate-400">
            Bloco 1: Identificação do Paciente
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 bg-slate-50 p-4 rounded border">
            <div className="col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nome</span>
              <p className="font-medium text-sm">{patient.name}</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Nascimento</span>
              <p className="font-medium text-sm">
                {new Date(patient.dob).toLocaleDateString('pt-BR')}
              </p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Sexo</span>
              <p className="font-medium text-sm">{patient.sex}</p>
            </div>
            <div className="col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Escolaridade</span>
              <p className="font-medium text-sm">{patient.education || 'N/D'}</p>
            </div>
          </div>
        </section>

        {/* BLOCO 2, 3, 4 */}
        <section className="space-y-6">
          <div>
            <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-2 border-l-4 border-l-slate-400">
              Bloco 2: Motivo da Avaliação
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap pl-4 border-l border-slate-200">
              {blocks.b2_reason || 'Não informado.'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-2 border-l-4 border-l-slate-400">
              Bloco 3: Histórico Clínico e Desenvolvimental
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap pl-4 border-l border-slate-200">
              {blocks.b3_history || 'Não informado.'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-2 border-l-4 border-l-slate-400">
              Bloco 4: Perfil Comportamental Atual
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap pl-4 border-l border-slate-200">
              {blocks.b4_behavior || 'Não informado.'}
            </p>
          </div>
        </section>

        {/* BLOCO 5, 6, 7, 8 */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-indigo-700 border-b-2 border-indigo-100 pb-2 mb-4">
            <Brain className="w-5 h-5" />{' '}
            <h3 className="font-bold text-sm uppercase tracking-widest">
              Avaliação Dimensional Estruturada
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-xs text-indigo-800 mb-1">
                Bloco 5: Avaliação Cognitiva
              </h4>
              <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[80px] whitespace-pre-wrap">
                {blocks.b5_cognitive || '--'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs text-indigo-800 mb-1">Bloco 6: Análise RDoC</h4>
              <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[80px] whitespace-pre-wrap">
                {typeof blocks.b6_rdoc === 'string'
                  ? blocks.b6_rdoc
                  : JSON.stringify(blocks.b6_rdoc) || '--'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs text-indigo-800 mb-1">Bloco 7: Perfil Big Five</h4>
              <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[80px] whitespace-pre-wrap">
                {blocks.b7_bigfive || '--'}
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs text-indigo-800 mb-1">
                Bloco 8: 18 Funções Psíquicas
              </h4>
              <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[80px] whitespace-pre-wrap">
                {blocks.b8_psychic || '--'}
              </p>
            </div>
          </div>
        </section>

        {/* BLOCO 9 & 10 */}
        <section className="space-y-6">
          <div>
            <h3 className="font-bold text-xs bg-cyan-50 text-cyan-800 px-3 py-1.5 rounded uppercase tracking-widest mb-2 border-l-4 border-l-cyan-500">
              Bloco 9: Análise Neurofisiológica
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap pl-4 border-l border-slate-200">
              {blocks.b9_neurophysio || 'Sem dados.'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-purple-50 text-purple-800 px-3 py-1.5 rounded uppercase tracking-widest mb-2 border-l-4 border-l-purple-500">
              Bloco 10: Integração NeuroStrata
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap bg-purple-50/30 p-4 rounded border border-purple-100">
              {blocks.b10_integration || 'Sem síntese.'}
            </p>
          </div>
        </section>

        {/* BLOCO 11 & 12 */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-2 border-l-4 border-l-slate-400">
              Bloco 11: Hipóteses Clínicas
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {blocks.b11_hypotheses || '--'}
            </p>
          </div>
          <div>
            <h3 className="font-bold text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded uppercase tracking-widest mb-2 border-l-4 border-l-emerald-500">
              Bloco 12: Plano de Intervenção
            </h3>
            <p className="text-sm text-slate-700 whitespace-pre-wrap">
              {blocks.b12_intervention || '--'}
            </p>
          </div>
        </section>

        {/* BLOCO 13 & 14 (Visual & Index) */}
        <section className="bg-slate-50 border p-6 rounded-xl flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-1">
              Bloco 13: Índice NeuroStrata
            </h3>
            <p className="text-3xl font-black text-slate-800">
              {blocks.b13_index?.nsi || 70}{' '}
              <span className="text-sm text-slate-400 font-normal">/100 NSI</span>
            </p>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-xs text-slate-500 uppercase tracking-widest mb-1">
              Bloco 14: Gráficos
            </h3>
            <p className="text-xs text-slate-600">Visualizações anexadas na versão gráfica PDF.</p>
          </div>
        </section>

        {/* BLOCO 15 */}
        <section>
          <h3 className="font-bold text-xs bg-slate-800 text-white px-3 py-1.5 rounded uppercase tracking-widest mb-4">
            Bloco 15: Conclusão Técnica
          </h3>
          <p className="text-sm leading-relaxed text-slate-800 font-medium whitespace-pre-wrap border p-4 rounded-lg shadow-sm">
            {blocks.b15_conclusion || 'Conclusão não elaborada.'}
          </p>
        </section>

        {/* BLOCO 16 */}
        <section>
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-widest mb-2">
            Bloco 16: Referências Científicas
          </h3>
          <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
            {blocks.b16_references?.map((ref, i) => <li key={i}>{ref}</li>) || (
              <li>Nenhuma referência listada.</li>
            )}
          </ul>
        </section>

        {/* BLOCO 17 (Signature) */}
        <section className="flex flex-col items-center justify-center pt-16 border-t border-slate-200 mt-12 relative">
          <div className="w-64 border-b border-slate-800 mb-4"></div>
          <p className="font-bold text-slate-900 text-base">
            Assinatura do Profissional Responsável
          </p>

          {caseData.status === 'Laudo Validado' && blocks.b17_signature && (
            <div className="mt-8 flex flex-col md:flex-row items-center justify-between w-full bg-slate-50 border border-slate-200 p-6 rounded-xl gap-6">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                    Bloco 17: Autenticidade (Trust Layer™)
                  </span>
                  <div className="bg-white px-2 py-1 border rounded text-[10px] font-mono text-slate-600 break-all max-w-sm">
                    {blocks.b17_signature.hash}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Emitido em: {new Date(blocks.b17_signature.timestamp).toLocaleString('pt-BR')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
