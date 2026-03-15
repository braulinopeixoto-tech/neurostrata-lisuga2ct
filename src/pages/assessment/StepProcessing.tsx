import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrainCircuit, CheckCircle2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import useAppStore from '@/stores/useAppStore'

export function StepProcessing({ patientId }: { patientId?: string }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Inicializando Motor NeuroStrata...')
  const navigate = useNavigate()
  const { setCurrentAssessmentId } = useAppStore()

  useEffect(() => {
    const sequence = [
      { p: 20, text: 'Correlacionando funções psíquicas...' },
      { p: 45, text: 'Integrando matriz RDoC...' },
      { p: 75, text: 'Calculando Mapa Dimensional...' },
      { p: 100, text: 'Geração de insights concluída.' },
    ]

    let timer = 0
    sequence.forEach((step, index) => {
      timer += 800 + Math.random() * 500 // Fake processing time
      setTimeout(() => {
        setProgress(step.p)
        setStatus(step.text)
        if (index === sequence.length - 1) {
          setTimeout(() => {
            if (patientId) {
              setCurrentAssessmentId(patientId)
              navigate(`/analysis/${patientId}`)
            } else {
              navigate('/analysis/new')
            }
          }, 1000)
        }
      }, timer)
    })
  }, [navigate, patientId, setCurrentAssessmentId])

  return (
    <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative z-10 animate-pulse-glow">
          {progress === 100 ? (
            <CheckCircle2 className="w-12 h-12 text-success" />
          ) : (
            <BrainCircuit className="w-12 h-12 text-white" />
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Processamento Científico</h3>
      <p className="text-muted-foreground text-sm h-6 mb-8">{status}</p>

      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
        <p className="text-right text-xs mt-2 text-muted-foreground font-mono">{progress}%</p>
      </div>
    </div>
  )
}
