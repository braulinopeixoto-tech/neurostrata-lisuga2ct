import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CheckCircle2, PlayCircle, Loader2 } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import useAppStore from '@/stores/useAppStore'

export function PatientPerformanceForm({ patientId }: { patientId: string }) {
  const { submitJourneyStage } = useAppStore()
  const [testing, setTesting] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (testing) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval)
            return 100
          }
          return p + 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [testing])

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        submitJourneyStage(patientId, 'level3_performance', {
          'Teste de Atenção Concentrada': 'Concluído',
          'Memória Operacional': 'Concluído',
          'Flexibilidade Cognitiva': 'Concluído',
        })
        toast({
          title: 'Nível 03 Concluído',
          description: 'Bateria de performance enviada.',
          action: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
        })
      }, 500)
    }
  }, [progress, patientId, submitJourneyStage])

  return (
    <Card className="shadow-sm border-t-4 border-t-primary animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">Nível 03: Performance Mental</CardTitle>
        <CardDescription>
          Bateria de testes validados pelo CFP para avaliação de desempenho cognitivo e atencional.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-12 space-y-6 text-center">
        {!testing && progress === 0 ? (
          <>
            <PlayCircle className="w-16 h-16 text-primary opacity-80" />
            <div>
              <h3 className="text-lg font-bold">Iniciar Bateria de Testes</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Certifique-se de estar em um ambiente silencioso e sem distrações. A bateria dura
                aproximadamente 15 minutos.
              </p>
            </div>
            <Button onClick={() => setTesting(true)} size="lg" className="mt-4">
              Iniciar Avaliação Online
            </Button>
          </>
        ) : (
          <div className="w-full max-w-md space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
            <h3 className="text-lg font-bold">Processando Bateria de Testes...</h3>
            <p className="text-sm text-muted-foreground">
              Executando simulação de avaliação de performance.
            </p>
            <Progress value={progress} className="h-3 w-full" />
            <span className="text-sm font-medium">{progress}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
