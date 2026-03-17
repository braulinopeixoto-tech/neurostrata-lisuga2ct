import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BrainCircuit, Loader2, CheckCircle2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'

export function StepProcessing({
  patientId,
  isComplex,
}: {
  patientId: string
  isComplex: boolean
}) {
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval)
            setStatus('done')
            toast({
              title: 'Processamento Concluído',
              description: 'O NSI foi calculado e os dados salvos.',
            })
            return 100
          }
          return p + 20
        })
      }, 600)
      return () => clearInterval(interval)
    }
  }, [status])

  const handleStart = () => {
    if (!patientId) {
      toast({
        title: 'Atenção',
        description: 'Nenhum paciente selecionado.',
        variant: 'destructive',
      })
      return
    }
    setStatus('processing')
    setProgress(0)
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-16 text-center animate-fade-in min-h-[400px]">
      {status === 'idle' && (
        <div className="space-y-6 max-w-md">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
            <BrainCircuit className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold">Processamento Final</h2>
          <p className="text-muted-foreground text-sm">
            O Motor NSI cruzará todas as variáveis{' '}
            {isComplex ? '(Funções, RDoC, Big Five, Biomarcadores)' : '(Funções Psíquicas)'} para
            gerar o Índice Neurofuncional e os mapas de risco.
          </p>
          <Button size="lg" onClick={handleStart} className="w-full">
            Iniciar Processamento Neural
          </Button>
        </div>
      )}

      {status === 'processing' && (
        <div className="space-y-6 w-full max-w-md">
          <Loader2 className="w-16 h-16 animate-spin text-accent mx-auto" />
          <h2 className="text-xl font-bold">Compilando Dados...</h2>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="bg-accent h-3 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground font-mono">
            Processando matrizes multidimensionais: {progress}%
          </p>
        </div>
      )}

      {status === 'done' && (
        <div className="space-y-6 max-w-md animate-fade-in-up">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Avaliação Finalizada</h2>
          <p className="text-muted-foreground text-sm">
            Os dados foram estruturados. Você já pode visualizar a Análise Multidimensional ou gerar
            o Laudo (Quick Report / Trust Layer).
          </p>
          <div className="flex flex-col gap-3 pt-4">
            <Button asChild size="lg" className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Link to={`/analysis/${patientId}`}>
                Acessar Painel de Análise <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <Link to={`/report-center`}>Ir para Central de Laudos</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
