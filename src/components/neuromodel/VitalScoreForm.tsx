import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { HeartPulse, Info, Save } from 'lucide-react'
import { useTeamFlowStore, VitalscoreSnapshot } from '@/stores/useTeamFlowStore'
import useAppStore from '@/stores/useAppStore'
import { calculateVitalScore } from '@/lib/vitalscore-engine'

const BLOCKS = [
  {
    id: 'A',
    name: 'Valência Negativa',
    q: [
      'Tenho sentido medo intenso ou desproporcional diante de situações específicas.',
      'Tenho permanecido em estado de alerta ou apreensão mesmo sem perigo claro.',
      'Sinto que meu corpo permanece tenso ou preparado para algo ruim por tempo prolongado.',
      'Tenho sofrido mais diante de perdas, frustrações ou decepções.',
      'Tenho ficado excessivamente irritado quando algo esperado não acontece.',
      'Percebo aumento de pensamentos catastróficos ou antecipação negativa.',
    ],
  },
  {
    id: 'B',
    name: 'Valência Positiva',
    q: [
      'Tenho sentido menos interesse por atividades que antes me mobilizavam.',
      'Tenho dificuldade para sentir prazer mesmo em situações positivas.',
      'Tenho menor energia para perseguir metas ou concluir objetivos.',
      'Percebo que só consigo funcionar com estímulos imediatos ou recompensas rápidas.',
      'Tenho dificuldade para sustentar esforço quando o resultado demora.',
      'Tenho oscilado entre desmotivação e busca impulsiva por prazer rápido.',
    ],
  },
  {
    id: 'C',
    name: 'Sistemas Cognitivos',
    q: [
      'Tenho dificuldade para manter a atenção em tarefas importantes.',
      'Distraio-me facilmente com estímulos externos ou pensamentos internos.',
      'Tenho percebido lentificação para entender, organizar ou executar tarefas.',
      'Tenho dificuldade para manter informações ativas na mente enquanto raciocino.',
      'Tenho percebido falhas de memória recente acima do meu padrão habitual.',
      'Tenho dificuldade para planejar, priorizar ou concluir etapas de uma tarefa.',
      'Tenho agido com mais impulsividade ou menor controle inibitório.',
      'Tenho notado piora na fluência verbal, compreensão ou organização da fala.',
    ],
  },
  {
    id: 'D',
    name: 'Processos Sociais',
    q: [
      'Tenho me sentido mais distante ou desconectado das pessoas.',
      'Tenho dificuldade para perceber adequadamente emoções, intenções ou reações dos outros.',
      'Tenho me sentido excessivamente inseguro em situações sociais.',
      'Tenho dificuldade para expressar o que sinto de maneira clara.',
      'Tenho percebido conflitos recorrentes por mal-entendidos sociais.',
      'Tenho ficado excessivamente dependente da validação de outras pessoas.',
    ],
  },
  {
    id: 'E',
    name: 'Excitação e Regulação',
    q: [
      'Tenho sentido meu corpo ou mente acelerados além do habitual.',
      'Tenho sentido queda importante de energia ou lentificação persistente.',
      'Meu sono piorou em qualidade, regularidade ou profundidade.',
      'Tenho acordado sem restauração adequada.',
      'Meu nível de ativação oscila demais ao longo do dia.',
      'Tenho dificuldade para retornar ao equilíbrio após estresse.',
    ],
  },
  {
    id: 'F',
    name: 'Sistemas Sensório-Motores',
    q: [
      'Tenho percebido inquietação motora, agitação ou incapacidade de ficar parado.',
      'Tenho notado lentificação motora ou queda na prontidão de resposta.',
      'Tenho maior sensibilidade a sons, luzes, toque, textura ou movimento.',
      'Tenho percebido pior coordenação, precisão ou organização motora.',
      'Meu corpo reage de forma exagerada a estímulos sensoriais comuns.',
      'Sinto dificuldade para integrar sensação corporal, movimento e controle da ação.',
    ],
  },
  {
    id: 'G',
    name: 'Impacto Funcional Transversal',
    q: [
      'O que estou sentindo tem prejudicado meu trabalho, estudo ou rotina.',
      'O que estou sentindo tem afetado minhas relações pessoais.',
      'Tenho percebido perda de produtividade, autonomia ou autocuidado.',
      'Tenho sentido piora progressiva nas últimas semanas.',
      'Tenho sentido sofrimento emocional difícil de manejar sozinho.',
    ],
  },
  {
    id: 'H',
    name: 'Itens Sentinela de Risco',
    q: [
      'Em algum momento recente, senti que não suportaria continuar como estou.',
      'Tive pensamentos recorrentes de desaparecer, desistir ou machucar a mim mesmo.',
      'Meu comportamento ficou mais impulsivo, arriscado ou fora do meu controle.',
      'Pessoas próximas perceberam piora importante no meu estado.',
      'Tenho sentido perda importante de esperança em relação ao futuro.',
    ],
  },
]

const FreqOptions = ['Nunca', 'Às vezes', 'Freq.', 'Quase sempre']
const AgrOptions = ['Não', 'Disc.', 'Clara.', 'Intensa.']

export function VitalScoreForm({ caseId, onComplete }: { caseId: string; onComplete: () => void }) {
  const { addVitalSnapshot, caseWorkspaces } = useTeamFlowStore()
  const { currentUser } = useAppStore()
  const cw = caseWorkspaces.find((c) => c.id === caseId)

  const [answers, setAnswers] = useState<Record<string, { freq: number; agr: number }>>({})

  const handleSetAnswer = (id: string, type: 'freq' | 'agr', val: number) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || { freq: 0, agr: 0 }), [type]: val },
    }))
  }

  const handleSubmit = () => {
    const result = calculateVitalScore(answers)

    const snapshot: VitalscoreSnapshot = {
      id: `vs-${Date.now()}`,
      patient_id: cw?.patient_id || '',
      case_workspace_id: caseId,
      total_score: result.score,
      reserve_level:
        result.score >= 85
          ? 'Preservada'
          : result.score >= 70
            ? 'Vigilância Leve'
            : result.score >= 55
              ? 'Moderada'
              : 'Crítica',
      trend: result.dvi > 1.25 ? 'Piora Clara' : 'Estável',
      model_version: 'v1.0-VitalScore',
      alert_level: result.alert,
      nfli: result.nfli,
      dvi: result.dvi,
      fii: result.fii,
      sri: result.sri,
      domain_scores: result.domains,
      raw_data: answers,
      recommendations: result.recommendations,
    }

    addVitalSnapshot(snapshot, currentUser.fullName)
    toast({
      title: 'VitalScore Calculado',
      description: 'A avaliação foi processada e registrada na Trust Layer™.',
    })
    onComplete()
  }

  let globalQuestionIndex = 1

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <HeartPulse className="w-6 h-6 text-rose-500" />
          Novo Check-Up VitalScore™
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Rastreio de desregulação neurofuncional e agravamento (Baseado na matriz RDoC).
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-800 text-sm flex items-start gap-3">
        <Info className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <strong>Instruções:</strong> Considere principalmente as últimas 2 semanas. Para cada
          item, indique a Frequência (carga atual) e o Agravamento Recente (vetor de piora).
        </div>
      </div>

      <div className="space-y-8">
        {BLOCKS.map((block) => (
          <Card
            key={block.id}
            className={`shadow-sm border-t-4 ${block.id === 'H' ? 'border-t-rose-500' : 'border-t-slate-800'}`}
          >
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-lg">
                Bloco {block.id} — {block.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 bg-slate-100 border-b text-xs font-bold text-slate-500 uppercase tracking-wider">
                <div className="col-span-6">Sintoma / Relato</div>
                <div className="col-span-3 text-center">Frequência</div>
                <div className="col-span-3 text-center">Agravamento</div>
              </div>

              <div className="divide-y">
                {block.q.map((qText) => {
                  const qId = `q${globalQuestionIndex++}`
                  const ans = answers[qId] || { freq: undefined, agr: undefined }

                  return (
                    <div
                      key={qId}
                      className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 sm:px-6 hover:bg-slate-50/50 transition-colors items-center"
                    >
                      <div className="lg:col-span-6 text-sm text-slate-700 font-medium">
                        <span className="text-slate-400 mr-2">{qId.replace('q', '')}.</span>
                        {qText}
                      </div>

                      <div className="lg:col-span-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 lg:hidden">
                          Frequência
                        </span>
                        <div className="flex w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                          {FreqOptions.map((opt, val) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSetAnswer(qId, 'freq', val)}
                              className={`flex-1 text-[10px] sm:text-xs py-2 transition-all ${
                                ans.freq === val
                                  ? 'bg-indigo-600 text-white font-bold'
                                  : 'bg-white text-slate-500 hover:bg-slate-100'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-3">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1 lg:hidden">
                          Agravamento Recente
                        </span>
                        <div className="flex w-full rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                          {AgrOptions.map((opt, val) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleSetAnswer(qId, 'agr', val)}
                              className={`flex-1 text-[10px] sm:text-xs py-2 transition-all ${
                                ans.agr === val
                                  ? 'bg-rose-500 text-white font-bold'
                                  : 'bg-white text-slate-500 hover:bg-slate-100'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="sticky bottom-4 z-10 flex justify-end bg-white/80 backdrop-blur-md p-4 rounded-xl border shadow-lg mt-8">
        <Button
          onClick={handleSubmit}
          size="lg"
          className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800"
        >
          <Save className="w-4 h-4 mr-2" /> Finalizar e Calcular VitalScore
        </Button>
      </div>
    </div>
  )
}
