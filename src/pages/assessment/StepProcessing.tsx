import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrainCircuit, CheckCircle2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import useAppStore from '@/stores/useAppStore'

export function StepProcessing({ patientId }: { patientId?: string }) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Inicializando NSI Engine...')
  const navigate = useNavigate()
  const { setCurrentAssessmentId } = useAppStore()

  useEffect(() => {
    const sequence = [
      { p: 15, text: 'Correlacionando 18 Funções Psíquicas...' },
      { p: 35, text: 'Integrando domínios RDoC e Big Five...' },
      { p: 60, text: 'Mapeando marcadores qEEG (Topografia)...' },
      { p: 85, text: 'Calculando NeuroStrata Index (NSI)...' },
      { p: 100, text: 'Geração de insights concluída.' },
    ]

    let timer = 0
    sequence.forEach((step, index) => {
      timer += 800 + Math.random() * 600
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
          }, 1200)
        }
      }, timer)
    })
  }, [navigate, patientId, setCurrentAssessmentId])

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping"></div>
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative z-10 shadow-lg">
          {progress === 100 ? (
            <CheckCircle2 className="w-12 h-12 text-success" />
          ) : (
            <BrainCircuit className="w-12 h-12 text-white animate-pulse" />
          )}
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-2">Motor de Inteligência Clínica</h3>
      <p className="text-muted-foreground text-sm h-6 mb-8 font-mono">{status}</p>

      <div className="w-full max-w-md">
        <Progress value={progress} className="h-2" />
        <p className="text-right text-xs mt-2 text-muted-foreground font-mono">{progress}%</p>
      </div>
    </div>
  )
}
