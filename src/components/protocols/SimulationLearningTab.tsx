import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Activity, Beaker, Send, TrendingUp, GitMerge, AlertCircle, RefreshCw } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export function SimulationLearningTab() {
  const [learningForm, setLearningForm] = useState({
    protocol: '',
    qeegChange: '',
    clinicalChange: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    toast({
      title: 'Aprendizado Algorítmico Atualizado',
      description:
        'Os dados de desfecho clínico e qEEG foram incorporados à base de inteligência artificial.',
    })
    setTimeout(() => {
      setSubmitted(false)
      setLearningForm({ protocol: '', qeegChange: '', clinicalChange: '' })
    }, 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-accent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitMerge className="w-5 h-5 text-accent" /> Simulação de Impacto na Rede
          </CardTitle>
          <CardDescription>
            Modelo dinâmico teórico de alteração de conectividade com base na prescrição atual.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[350px] relative bg-muted/10 rounded-b-lg">
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs bg-white border px-3 py-1.5 rounded-full text-muted-foreground shadow-sm">
            <AlertCircle className="w-3 h-3 text-accent" /> Projeção de Fase 2
          </div>

          <div className="relative w-full max-w-[280px] aspect-square my-4">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <ellipse
                cx="50"
                cy="55"
                rx="42"
                ry="48"
                fill="hsl(var(--muted)/0.3)"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />

              {/* Nodes Base */}
              <circle
                cx="35"
                cy="30"
                r="5"
                fill="hsl(var(--destructive))"
                className="animate-pulse"
              />
              <circle
                cx="65"
                cy="30"
                r="5"
                fill="hsl(var(--destructive))"
                className="animate-pulse"
              />
              <circle cx="50" cy="70" r="5" fill="hsl(var(--blue-500))" />

              {/* Lines Before (Hyperconnected Frontal) */}
              <path
                d="M 35 30 Q 50 10 65 30"
                fill="none"
                stroke="hsl(var(--destructive))"
                strokeWidth="2.5"
                strokeDasharray="4"
                className="animate-pulse"
                opacity="0.7"
              />

              {/* Lines After (Targeted Consolidation) */}
              <path
                d="M 35 30 Q 20 50 50 70"
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="2"
                className="animate-pulse-glow"
              />
              <path
                d="M 65 30 Q 80 50 50 70"
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="2"
                className="animate-pulse-glow"
              />
            </svg>
          </div>

          <div className="w-full mt-2 grid grid-cols-2 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg border shadow-sm">
              <div className="text-[10px] font-bold text-destructive uppercase mb-1 tracking-wider">
                Estado Admissional
              </div>
              <div className="text-sm font-medium text-foreground">Hiperconectividade Frontal</div>
            </div>
            <div className="bg-success/10 p-3 rounded-lg border border-success/30 shadow-sm">
              <div className="text-[10px] font-bold text-success uppercase mb-1 tracking-wider">
                Projeção Neurofuncional
              </div>
              <div className="text-sm font-medium text-foreground">Integração Fronto-Parietal</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-primary" /> Sistema de Aprendizado Clínico
          </CardTitle>
          <CardDescription>
            Realimente o algoritmo NSI com dados do mundo real para otimizar futuras sugestões de
            protocolos.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-foreground">
              Protocolo Aplicado na Sessão
            </label>
            <Select
              value={learningForm.protocol}
              onValueChange={(v) => setLearningForm({ ...learningForm, protocol: v })}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Selecione o protocolo testado..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="reac">REAC NPO (Fase 1)</SelectItem>
                <SelectItem value="tacs_a">tACS Alpha 10Hz (Fase 2)</SelectItem>
                <SelectItem value="tdcs_anodal">tDCS Anódica DLPFC (Fase 2)</SelectItem>
                <SelectItem value="nfb">Neurofeedback SMR (Fase 3)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" /> Alteração Objetiva (Marcador / qEEG)
            </label>
            <Input
              className="mt-1.5"
              placeholder="Ex: Redução de 30% na potência absoluta Theta em Fz"
              value={learningForm.qeegChange}
              onChange={(e) => setLearningForm({ ...learningForm, qeegChange: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-semibold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-success" /> Desfecho Clínico Observado
            </label>
            <Textarea
              className="mt-1.5 resize-none"
              placeholder="Ex: Paciente relata maior flexibilidade cognitiva e redução de episódios de ruminação ansiosa."
              rows={4}
              value={learningForm.clinicalChange}
              onChange={(e) => setLearningForm({ ...learningForm, clinicalChange: e.target.value })}
            />
          </div>

          <div className="pt-4 border-t">
            <Button
              className={`w-full gap-2 transition-all ${submitted ? 'bg-success hover:bg-success' : ''}`}
              onClick={handleSubmit}
              disabled={submitted || !learningForm.protocol}
            >
              {submitted ? (
                <>
                  Dados Incorporados à Base de IA <CheckCircle2 className="w-4 h-4" />
                </>
              ) : (
                <>
                  Enviar para Loop de Aprendizado Algorítmico <Send className="w-4 h-4" />
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-3 flex items-center justify-center gap-1">
              <RefreshCw className="w-3 h-3" /> A atualização fortalece predições de rede para
              perfis semelhantes.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
