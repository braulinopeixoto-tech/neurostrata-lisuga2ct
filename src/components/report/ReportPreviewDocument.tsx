import { Card, CardContent } from '@/components/ui/card'
import { Activity, Brain, Network, ShieldCheck, QrCode } from 'lucide-react'
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
          <div className="absolute top-0 right-0 hidden sm:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-300 text-xs font-bold shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Trust Layer™ Verified
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

      {/* SIGNATURE & AUTHENTICITY AREA */}
      <section className="flex flex-col items-center justify-center pt-16 border-t border-slate-200 mt-12 relative">
        <div className="w-64 border-b border-slate-800 mb-4"></div>
        <p className="font-bold text-slate-900 text-base">{currentUser.fullName}</p>
        <p className="text-xs text-slate-500 mt-1">{currentUser.registrationId}</p>

        {data.isSigned && data.signature && (
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between w-full bg-slate-50 border border-slate-200 p-6 rounded-xl gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-emerald-100 p-3 rounded-full text-emerald-600 shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                  Autenticidade Criptográfica (Trust Layer™)
                </span>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Este documento foi assinado digitalmente e imutavelmente registrado na
                  infraestrutura NeuroStrata. Qualquer alteração invalida o selo abaixo.
                </p>
                <div className="mt-2 bg-white px-2 py-1 border rounded text-[10px] font-mono text-slate-600 break-all w-full max-w-sm">
                  {data.signature.hash}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  Emitido em: {new Date(data.signature.timestamp).toLocaleString('pt-BR')}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center shrink-0 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
              <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-sm">
                {/* Placeholder for QR Code */}
                <QrCode className="w-16 h-16 text-slate-800" strokeWidth={1.5} />
              </div>
              <span className="text-[9px] uppercase font-bold text-slate-500 mt-2 tracking-widest">
                Escaneie para Validar
              </span>
              <a href="#" className="text-[10px] text-blue-600 hover:underline mt-0.5">
                neurostrata.app/verify
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
