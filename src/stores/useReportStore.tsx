import React, { createContext, useContext, useState, ReactNode } from 'react'

export const defaultReportState = {
  patientName: 'Ana Silva Oliveira',
  dob: '12/04/1985',
  age: '38',
  sex: 'Feminino',
  education: 'Ensino Superior Completo',
  guardian: 'N/A',
  professional: 'Dr. Renato Alves',
  institution: 'NeuroStrata Clinic',
  evalDate: '15/10/2023',
  reason:
    'Avaliação neurofuncional por esgotamento atencional crônico e ansiedade manifesta em ambiente corporativo.',
  history:
    'Histórico familiar positivo para TAG (Transtorno de Ansiedade Generalizada). Sem histórico cirúrgico. Gestação e marcos de desenvolvimento normativos. Relata episódios de trauma psicológico secundário na infância.',
  behavior:
    'Retraimento social intermitente, hipervigilância, respostas de esquiva ativas sob pressão. Padrão de comunicação fluido, sem estereotipias.',
  cognitive:
    'Atenção sustentada e flexibilidade cognitiva levemente rebaixadas. Memória de trabalho e processamento visual preservados. Orientação temporal e espacial íntegras.',
  rdoc: 'Valência Negativa: Elevada ativação no subdomínio de Medo/Ansiedade Crônica.\nValência Positiva: Adaptação normativa.\nSistemas de Excitabilidade: Hiperativação basal persistente.',
  bigFive:
    'Neuroticismo acentuado (>85%), Conscienciosidade elevada indicando esforço compensatório para manutenção da performance, Extroversão moderada-baixa.',
  psychicFunc:
    'Eixo Afetivo (Regulação Emocional): 42% - Disfuncional\nEixo Executivo (Inibição): 65% - Moderado\nEixo Cognitivo: 85% - Preservado\nEixo Social: 78% - Preservado',
  neurophysio:
    'Análise Topográfica revela excesso de atividade em faixa Theta na região frontopolar (Fp1-Fp2) com assimetria leve. Conectividade Funcional mostra hipercoerência em rede frontoparietal.',
  integration:
    'O quadro neurofuncional sugere uma sobrecarga do eixo regulatório (carga alostática elevada), compensada por alto esforço do sistema executivo, gerando a sintomatologia de esgotamento.',
  hypotheses:
    'Compatível com Transtorno de Ansiedade Generalizada (CID-11: 6B00 / DSM-5-TR: F41.1), agravado por exaustão neurocognitiva.',
  intervention:
    '1. Psicoterapia Cognitivo-Comportamental semanal.\n2. Neuromodulação (tDCS Anódico em Córtex Pré-Frontal Dorso-lateral Esquerdo) - 10 sessões.\n3. Suporte Nutracêutico: Modulação do eixo ansiolítico (L-Theanina e Magnésio Treonato).',
  idxIntegrity: 70,
  idxImpairment: 45,
  idxRisk: 65,
  idxDysfunction: 50,
  radarData: [
    { subject: 'Ameaça', value: 85 },
    { subject: 'Recompensa', value: 50 },
    { subject: 'Cog. Exec.', value: 65 },
    { subject: 'Consciência', value: 75 },
    { subject: 'Social', value: 60 },
    { subject: 'Regulatório', value: 35 },
    { subject: 'E. Neural', value: 40 },
    { subject: 'Integrativo', value: 55 },
  ],
  conclusion:
    'Com base no mapeamento multidimensional de 17 blocos, atesta-se vulnerabilidade significativa nos eixos emocionais com risco de 65%. O elevado Score de Plasticidade indica forte potencial de remodelação neural através de intervenções neuromodulatórias. O paciente apresenta aptidão para início imediato do protocolo terapêutico sugerido.',
  historicalAssessments: [
    {
      date: '10/05/2023',
      radarData: [
        { subject: 'Ameaça', value: 95 },
        { subject: 'Recompensa', value: 40 },
        { subject: 'Cog. Exec.', value: 50 },
        { subject: 'Consciência', value: 65 },
        { subject: 'Social', value: 45 },
        { subject: 'Regulatório', value: 20 },
        { subject: 'E. Neural', value: 30 },
        { subject: 'Integrativo', value: 45 },
      ],
    },
    {
      date: '15/01/2023',
      radarData: [
        { subject: 'Ameaça', value: 90 },
        { subject: 'Recompensa', value: 45 },
        { subject: 'Cog. Exec.', value: 55 },
        { subject: 'Consciência', value: 70 },
        { subject: 'Social', value: 50 },
        { subject: 'Regulatório', value: 30 },
        { subject: 'E. Neural', value: 35 },
        { subject: 'Integrativo', value: 50 },
      ],
    },
  ],
}

export type ReportState = typeof defaultReportState

interface ReportStore {
  data: ReportState
  updateData: (fields: Partial<ReportState>) => void
}

const ReportContext = createContext<ReportStore | undefined>(undefined)

export function ReportStoreProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ReportState>(defaultReportState)
  const updateData = (fields: Partial<ReportState>) => setData((prev) => ({ ...prev, ...fields }))

  return <ReportContext.Provider value={{ data, updateData }}>{children}</ReportContext.Provider>
}

export default function useReportStore() {
  const context = useContext(ReportContext)
  if (!context) throw new Error('useReportStore must be used within ReportStoreProvider')
  return context
}
