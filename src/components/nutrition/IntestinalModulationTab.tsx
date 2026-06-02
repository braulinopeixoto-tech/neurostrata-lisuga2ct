import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Activity,
  Trash2,
  PlusCircle,
  RefreshCw,
  Wrench,
  Scale,
  Save,
  CheckCircle2,
} from 'lucide-react'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const RS_STAGES = [
  {
    id: 'remove',
    icon: Trash2,
    title: '1. Remover',
    desc: 'Eliminar gatilhos inflamatórios, patógenos e alérgenos.',
    color: 'text-red-500',
    interventions: [
      'Dieta de Eliminação (Low-FODMAP / Sem Glúten/Lácteos)',
      'Fitoterápicos para Disbiose/SIBO (Óleo de Orégano, Berberina, Alho)',
      'Remoção de Toxinas Ambientais e Xenobióticos',
      'Redução de Açúcares Refinados e Ultraprocessados',
    ],
  },
  {
    id: 'replace',
    icon: PlusCircle,
    title: '2. Recolocar',
    desc: 'Otimizar a capacidade digestiva e absortiva.',
    color: 'text-amber-500',
    interventions: [
      'Enzimas Digestivas (Amilase, Protease, Lipase)',
      'Betaína HCl (Suporte Gástrico)',
      'Sais Biliares (Suporte Hepático/Biliar)',
      'Mastigação Consciente e Mindful Eating',
    ],
  },
  {
    id: 'reinoculate',
    icon: RefreshCw,
    title: '3. Reinocular',
    desc: 'Reintroduzir bactérias benéficas para reequilíbrio do microbioma.',
    color: 'text-emerald-500',
    interventions: [
      'Probióticos Cepas-Específicas (Lactobacillus, Bifidobacterium)',
      'Prebióticos (FOS, GOS, Inulina, Psyllium)',
      'Alimentos Fermentados (Kefir, Kombucha, Chucrute)',
      'Fibras Solúveis e Amido Resistente',
    ],
  },
  {
    id: 'repair',
    icon: Wrench,
    title: '4. Reparar',
    desc: 'Regenerar a mucosa e integridade da barreira intestinal (Leaky Gut).',
    color: 'text-blue-500',
    interventions: [
      'L-Glutamina (Combustível Enterócito)',
      'Zinco Carnosina',
      'Ômega-3 (EPA/DHA)',
      'Vitamina D3 e Vitamina A',
      'Caldo de Ossos / Colágeno / Aloe Vera',
    ],
  },
  {
    id: 'rebalance',
    icon: Scale,
    title: '5. Reequilibrar',
    desc: 'Manutenção do estilo de vida, sono e manejo do eixo intestino-cérebro.',
    color: 'text-purple-500',
    interventions: [
      'Manejo de Estresse (Mindfulness, Meditação, Yoga)',
      'Higiene do Sono (Ritmo Circadiano)',
      'Exercício Físico Moderado',
      'Apoio Psicológico / Terapia Cognitivo-Comportamental',
    ],
  },
]

export function IntestinalModulationTab() {
  const [msq, setMsq] = useState({
    digestorio: 12,
    cognitivo: 8,
    imunologico: 5,
    energia: 15,
    emocional: 10,
  })

  const handleMsqChange = (key: keyof typeof msq, val: number[]) => {
    setMsq((prev) => ({ ...prev, [key]: val[0] }))
  }

  const chartData = [
    { subject: 'Digestório', score: msq.digestorio, fullMark: 20 },
    { subject: 'Cognitivo', score: msq.cognitivo, fullMark: 20 },
    { subject: 'Imunológico', score: msq.imunologico, fullMark: 20 },
    { subject: 'Energia', score: msq.energia, fullMark: 20 },
    { subject: 'Emocional', score: msq.emocional, fullMark: 20 },
  ]

  const totalScore = Object.values(msq).reduce((a, b) => a + b, 0)

  const getSeverity = (score: number) => {
    if (score < 20) return { label: 'Leve', color: 'bg-green-100 text-green-700' }
    if (score < 50) return { label: 'Moderado', color: 'bg-amber-100 text-amber-700' }
    return { label: 'Grave', color: 'bg-red-100 text-red-700' }
  }

  const severity = getSeverity(totalScore)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Modulação Intestinal (Programa 5Rs)</h2>
          <p className="text-muted-foreground mt-1">
            Abordagem clínica integrada baseada no Medical Symptom Questionnaire (MSQ) e eixo
            Intestino-Cérebro.
          </p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
          <Save className="w-4 h-4" /> Salvar Plano Terapêutico
        </Button>
      </div>

      <Tabs defaultValue="msq" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 h-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger value="msq" className="py-2.5 text-xs sm:text-sm flex flex-col gap-1">
            <Activity className="w-4 h-4 text-blue-500" />
            MSQ
          </TabsTrigger>
          {RS_STAGES.map((stage) => {
            const Icon = stage.icon
            return (
              <TabsTrigger
                key={stage.id}
                value={stage.id}
                className="py-2.5 text-xs sm:text-sm flex flex-col gap-1"
              >
                <Icon className={`w-4 h-4 ${stage.color}`} />
                {stage.title.split(' ')[1]}
              </TabsTrigger>
            )
          })}
        </TabsList>

        <div className="mt-6">
          <TabsContent value="msq" className="m-0 focus-visible:outline-none">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="w-5 h-5 text-blue-500" /> Medical Symptom Questionnaire
                    </CardTitle>
                    <CardDescription>
                      Ajuste a pontuação de sintomas por sistema para gerar o mapa de toxicidade.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {Object.entries(msq).map(([key, val]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <Label className="capitalize text-sm font-medium">
                            {key === 'digestorio' ? 'Trato Digestório' : key}
                          </Label>
                          <span className="text-sm font-bold text-muted-foreground">{val}/20</span>
                        </div>
                        <Slider
                          value={[val]}
                          max={20}
                          step={1}
                          onValueChange={(v) => handleMsqChange(key as any, v)}
                          className="py-1"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-2 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg">Mapa de Rastreamento Metabólico</CardTitle>
                        <CardDescription>Visualização radial da carga de sintomas.</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black">{totalScore}</div>
                        <Badge variant="outline" className={severity.color}>
                          Toxicidade {severity.label}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex items-center justify-center p-6">
                    <div className="w-full h-[300px]">
                      <ChartContainer
                        config={{
                          score: {
                            label: 'Pontuação',
                            color: 'hsl(var(--primary))',
                          },
                        }}
                        className="w-full h-full mx-auto aspect-square max-h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart
                            data={chartData}
                            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                          >
                            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            <PolarGrid strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 20]} />
                            <Radar
                              name="Score de Toxicidade"
                              dataKey="score"
                              stroke="hsl(var(--primary))"
                              fill="hsl(var(--primary))"
                              fillOpacity={0.4}
                              strokeWidth={2}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {RS_STAGES.map((stage) => {
            const Icon = stage.icon
            return (
              <TabsContent
                key={stage.id}
                value={stage.id}
                className="m-0 focus-visible:outline-none"
              >
                <Card className={`border-t-4 border-t-${stage.color.split('-')[1]}-500 shadow-sm`}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-${stage.color.split('-')[1]}-50`}>
                        <Icon className={`w-6 h-6 ${stage.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{stage.title}</CardTitle>
                        <CardDescription className="text-base mt-1">{stage.desc}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-6">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Intervenções Sugeridas
                      </h4>
                      <div className="space-y-4 bg-muted/20 p-5 rounded-xl border">
                        {stage.interventions.map((intervention, idx) => (
                          <div key={idx} className="flex items-start space-x-3">
                            <Switch id={`${stage.id}-${idx}`} />
                            <Label
                              htmlFor={`${stage.id}-${idx}`}
                              className="text-sm font-medium leading-snug cursor-pointer"
                            >
                              {intervention}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4" /> Prescrição & Conduta Específica
                      </h4>
                      <Textarea
                        placeholder={`Descreva a conduta, formulações e orientações específicas para a fase de ${stage.title.split(' ')[1]}...`}
                        className="min-h-[250px] resize-none bg-white"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )
          })}
        </div>
      </Tabs>
    </div>
  )
}

function FileText(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  )
}
