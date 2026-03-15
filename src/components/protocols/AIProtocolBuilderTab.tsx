import { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  CheckCircle2,
  ChevronRight,
  Activity,
  BrainCircuit,
  ShieldCheck,
  User,
  Network,
  Bot,
} from 'lucide-react'

export function AIProtocolBuilderTab() {
  const [step, setStep] = useState(1)

  const [inputs, setInputs] = useState({
    patient: '',
    age: '',
    diagnosis: '',
    symptoms: '',
    qeeg: '',
    networks: '',
    rdoc: '',
  })

  const generateProtocol = () => setStep(2)
  const approveProtocol = () => setStep(3)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border mb-6 overflow-x-auto">
        {[
          { id: 1, label: 'Análise do Paciente', icon: User },
          { id: 2, label: 'Estratégia IA', icon: BrainCircuit },
          { id: 3, label: 'Aprovação Humana', icon: ShieldCheck },
        ].map((s, i) => (
          <div key={s.id} className="flex items-center min-w-max">
            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${step >= s.id ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'}`}
            >
              <s.icon className="w-4 h-4" />
              <span className="text-sm">{s.label}</span>
            </div>
            {i < 2 && <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground/50" />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle>Entrada de Dados Clínicos</CardTitle>
            <CardDescription>
              Insira os dados da avaliação para gerar um sequenciamento terapêutico inteligente.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Paciente / Identificador</label>
                <Input
                  value={inputs.patient}
                  onChange={(e) => setInputs({ ...inputs, patient: e.target.value })}
                  placeholder="Nome do paciente..."
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Idade</label>
                  <Input
                    value={inputs.age}
                    onChange={(e) => setInputs({ ...inputs, age: e.target.value })}
                    placeholder="Ex: 45"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Diagnóstico Provável</label>
                  <Input
                    value={inputs.diagnosis}
                    onChange={(e) => setInputs({ ...inputs, diagnosis: e.target.value })}
                    placeholder="Ex: TDAH, TAG"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Sintomatologia Principal</label>
                <Textarea
                  value={inputs.symptoms}
                  onChange={(e) => setInputs({ ...inputs, symptoms: e.target.value })}
                  placeholder="Descreva as queixas principais..."
                  className="mt-1 resize-none"
                  rows={4}
                />
              </div>
            </div>
            <div className="space-y-5 bg-muted/30 p-5 rounded-xl border border-border/50">
              <div>
                <label className="text-sm font-medium flex items-center gap-2 text-primary">
                  <Activity className="w-4 h-4 text-blue-500" /> Achados qEEG
                </label>
                <Input
                  value={inputs.qeeg}
                  onChange={(e) => setInputs({ ...inputs, qeeg: e.target.value })}
                  placeholder="Ex: Hiperatividade theta frontal"
                  className="bg-white mt-1.5"
                />
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 text-primary">
                  <BrainCircuit className="w-4 h-4 text-accent" /> Redes Alteradas
                </label>
                <Select
                  value={inputs.networks}
                  onValueChange={(v) => setInputs({ ...inputs, networks: v })}
                >
                  <SelectTrigger className="bg-white mt-1.5">
                    <SelectValue placeholder="Selecione a disfunção principal..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dmn">Hiperatividade DMN</SelectItem>
                    <SelectItem value="cen">Hipoatividade Rede Executiva (CEN)</SelectItem>
                    <SelectItem value="sn">Desregulação Rede de Saliência (SN)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium flex items-center gap-2 text-primary">
                  <Network className="w-4 h-4 text-violet-500" /> Domínio RDoC Predominante
                </label>
                <Select
                  value={inputs.rdoc}
                  onValueChange={(v) => setInputs({ ...inputs, rdoc: v })}
                >
                  <SelectTrigger className="bg-white mt-1.5">
                    <SelectValue placeholder="Selecione o construto de base..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nv">Valência Negativa</SelectItem>
                    <SelectItem value="pv">Valência Positiva</SelectItem>
                    <SelectItem value="cs">Sistemas Cognitivos</SelectItem>
                    <SelectItem value="ar">Excitação e Regulação Autonômica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end border-t pt-6">
            <Button onClick={generateProtocol} className="gap-2 bg-accent hover:bg-accent/90">
              <Bot className="w-4 h-4" /> Processar Protocolo Sequencial
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
          <div className="bg-white p-6 rounded-xl border border-primary/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
            <div>
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Bot className="w-6 h-6 text-accent" /> Sequenciamento Terapêutico Sugerido
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Fundamentado em:{' '}
                <strong>
                  {inputs.networks === 'dmn'
                    ? 'DMN Hyperactivity'
                    : inputs.networks === 'cen'
                      ? 'Executive Network Hypoactivity'
                      : 'Múltiplas Redes'}
                </strong>{' '}
                e <strong>{inputs.qeeg || 'Padrão não especificado'}</strong>.
              </p>
            </div>
            <Button
              onClick={approveProtocol}
              className="bg-success hover:bg-success/90 text-white gap-2 shadow-md"
            >
              <ShieldCheck className="w-4 h-4" /> Aprovar e Assinar
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-t-4 border-t-blue-500 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                FASE 1
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Autorregulação</CardTitle>
                <CardDescription>Estabilização Sistêmica Basal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-1">Intervenção Sugerida</h4>
                  <p className="text-sm text-blue-800 font-medium">12 sessões de REAC NPO</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Objetivo:</strong> Promover a reorganização funcional global e a
                  estabilização autonômica antes da modulação local.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-accent shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                FASE 2
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Modulação Oscilatória</CardTitle>
                <CardDescription>Correção de Ritmos Corticais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <h4 className="font-semibold text-accent mb-1">Intervenção Sugerida</h4>
                  {inputs.networks === 'dmn' ? (
                    <p className="text-sm text-accent-foreground font-medium">
                      tACS Alpha (10 Hz) Parietal + rTMS Medial PFC
                    </p>
                  ) : inputs.networks === 'cen' ? (
                    <p className="text-sm text-accent-foreground font-medium">
                      15 mins de tACS Beta (20-30 Hz) + tDCS Anódica Left DLPFC
                    </p>
                  ) : (
                    <p className="text-sm text-accent-foreground font-medium">
                      15 mins de tACS Focada (20-30 Hz) em PFC
                    </p>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Objetivo:</strong> Reestruturação da atividade em tempo real focada na
                  disfunção da rede {inputs.networks?.toUpperCase() || 'cerebral mapeada'}.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-emerald-500 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg shadow-sm">
                FASE 3
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Consolidação</CardTitle>
                <CardDescription>Treinamento e Neuroplasticidade</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-1">Intervenção Sugerida</h4>
                  <p className="text-sm text-emerald-800 font-medium">
                    {inputs.networks === 'dmn'
                      ? 'Neurofeedback Alpha + Tarefas CC Atenção Sustentada'
                      : 'Neurofeedback Beta + Treinamento Computadorizado ERP'}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Objetivo:</strong> Treinar e fixar padrões desejados consolidados de forma
                  sustentável no sistema nervoso do paciente.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-start">
            <Button variant="outline" onClick={() => setStep(1)}>
              Voltar para Ajustes
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <Card className="animate-fade-in-up border-success/50 bg-success/5 overflow-hidden relative">
          <div className="absolute -right-20 -top-20 opacity-10">
            <ShieldCheck className="w-64 h-64 text-success" />
          </div>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-5 relative z-10">
            <div className="w-20 h-20 bg-success text-white rounded-full flex items-center justify-center mb-2 shadow-lg animate-pulse-glow">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-success-foreground">
              Estrutura Terapêutica Assinada
            </h2>
            <p className="text-muted-foreground max-w-lg text-base">
              O sequenciamento terapêutico para o paciente{' '}
              <strong className="text-foreground">{inputs.patient || 'selecionado'}</strong> foi
              aprovado e gravado no prontuário EHR. A equipe clínica já está autorizada a iniciar a
              Fase 1.
            </p>
            <div className="pt-6">
              <Button variant="outline" onClick={() => setStep(1)}>
                Iniciar Nova Avaliação
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
