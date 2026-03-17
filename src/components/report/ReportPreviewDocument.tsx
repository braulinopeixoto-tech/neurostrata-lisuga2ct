import { Card, CardContent } from '@/components/ui/card'
import { Activity, Brain, Network, ShieldCheck } from 'lucide-react'
import useReportStore from '@/stores/useReportStore'
import useAppStore from '@/stores/useAppStore'

export function ReportPreviewDocument() {
  const { data } = useReportStore()
  const { currentUser } = useAppStore()

  return (
    <div className="bg-white p-8 sm:p-12 rounded-xl shadow-elevation border min-h-[800px] text-sm animate-fade-in max-w-4xl mx-auto">
      {/* HEADER */}
      <div className="border-b-2 border-slate-800 pb-6 mb-8 text-center relative">
        <h2 className="text-3xl font-serif font-black text-slate-900 uppercase tracking-widest">
          NeuroStrata Clinic
        </h2>
        <p className="text-slate-500 uppercase tracking-widest mt-2 font-semibold text-xs">
          Laudo de Avaliação Neurofuncional Multidimensional
        </p>
        {data.isSigned && (
          <div className="absolute top-0 right-0 hidden sm:flex items-center gap-2 text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" /> Selo ICP-Brasil
          </div>
        )}
      </div>

      {/* BLOCK 1: IDENTIFICATION */}
      <section className="mb-10">
        <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 mb-4 border-l-4 border-l-slate-400">
          I. Identificação do Paciente
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
          <div className="col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Nome Completo</span>
            <p className="font-medium text-base border-b border-slate-100 pb-1 mt-0.5">
              {data.patientName || 'Não informado'}
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Data de Nascimento / Idade
            </span>
            <p className="font-medium text-base border-b border-slate-100 pb-1 mt-0.5">
              {data.dob || '--'} ({data.age || '--'})
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Escolaridade</span>
            <p className="font-medium text-sm border-b border-slate-100 pb-1 mt-0.5">
              {data.education || '--'}
            </p>
          </div>
          <div className="col-span-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              Profissional Solicitante
            </span>
            <p className="font-medium text-sm border-b border-slate-100 pb-1 mt-0.5">
              {data.professional || 'Demanda Espontânea'}
            </p>
          </div>
        </div>
      </section>

      {/* BLOCK 2: CLINICAL HISTORY */}
      <section className="mb-10 space-y-6">
        <h3 className="font-bold text-xs bg-slate-100 px-3 py-1.5 rounded uppercase tracking-widest text-slate-700 border-l-4 border-l-slate-400">
          II. Histórico Clínico e Motivo
        </h3>
        <div>
          <span className="text-xs font-bold text-slate-800 mb-1 block">Motivo da Avaliação</span>
          <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-3 rounded">
            {data.reason || 'Nenhum motivo registrado.'}
          </p>
        </div>
        <div>
          <span className="text-xs font-bold text-slate-800 mb-1 block">
            Histórico Pregresso e Comportamental
          </span>
          <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
            {data.history || '--'}
          </p>
        </div>
      </section>

      {/* BLOCK 3: NEUROFUNCTIONAL EVALUATION */}
      <section className="mb-10 space-y-6">
        <h3 className="font-bold text-xs bg-blue-50 px-3 py-1.5 rounded uppercase tracking-widest text-blue-800 border-l-4 border-l-blue-400">
          III. Mapeamento Neurofuncional e Psicométrico
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
              <Activity className="w-4 h-4" /> Matriz RDoC
            </div>
            <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[100px] whitespace-pre-wrap">
              {data.rdoc || 'Avaliação pendente.'}
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-purple-700 font-bold mb-2">
              <Network className="w-4 h-4" /> Perfil Big Five
            </div>
            <p className="text-sm text-slate-600 bg-white border p-3 rounded shadow-sm min-h-[100px] whitespace-pre-wrap">
              {data.bigFive || 'Avaliação pendente.'}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-800 mb-1 block">
            Análise das 18 Funções Psíquicas
          </span>
          <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-wrap">
            {data.psychicFunc || '--'}
          </p>
        </div>
      </section>

      {/* BLOCK 4: CONCLUSION */}
      <section className="mb-16">
        <h3 className="font-bold text-xs bg-emerald-50 px-3 py-1.5 rounded uppercase tracking-widest text-emerald-800 border-l-4 border-l-emerald-500 mb-4">
          IV. Conclusão Diagnóstica e Parecer
        </h3>
        <div className="bg-emerald-50/30 border border-emerald-100 p-5 rounded-lg">
          <p className="text-sm leading-relaxed text-slate-800 font-medium whitespace-pre-wrap">
            {data.conclusion || 'Conclusão não elaborada.'}
          </p>
        </div>
      </section>

      {/* SIGNATURE AREA */}
      <section className="flex flex-col items-center justify-center pt-16 border-t border-slate-200 mt-12">
        <div className="w-64 border-b border-slate-800 mb-4"></div>
        <p className="font-bold text-slate-900 text-base">{currentUser.fullName}</p>
        <p className="text-xs text-slate-500 mt-1">{currentUser.registrationId}</p>

        {data.isSigned && data.signature && (
          <div className="mt-6 flex flex-col items-center text-center bg-slate-50 border p-3 rounded-lg w-full max-w-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500 mb-1" />
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">
              Documento Assinado Digitalmente
            </span>
            <span className="text-[10px] text-slate-500 mt-1 font-mono break-all px-2">
              Hash: {data.signature.hash}
            </span>
            <span className="text-[10px] text-slate-400 mt-1">
              {new Date(data.signature.timestamp).toLocaleString('pt-BR')}
            </span>
          </div>
        )}
      </section>
    </div>
  )
}
