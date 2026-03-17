import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Target, Save } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'

const DASHBOARD_DATA = [
  { domain: 'Leitura', score: 45, status: 'Risk' },
  { domain: 'Escrita', score: 60, status: 'Stability' },
  { domain: 'Matemática', score: 80, status: 'Improvement' },
  { domain: 'Atenção', score: 55, status: 'Risk' },
]

export function InterventionDashboardTab() {
  const [goal, setGoal] = useState('')
  const [frequency, setFrequency] = useState('')
  const [strategy, setStrategy] = useState('')

  const handleSave = () => {
    toast({ title: 'Plano Salvo', description: 'Metas e estratégias de intervenção atualizadas.' })
  }

  const chartConfig = {
    score: { label: 'Desempenho Cognitivo (%)', color: 'hsl(var(--primary))' },
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" /> Plano de Intervenção
          </CardTitle>
          <CardDescription>
            Defina as metas e acompanhe visualmente o desenvolvimento cognitivo.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Meta Principal de Aprendizagem</Label>
              <Input
                placeholder="Ex: Melhorar fluência leitora em textos complexos"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Frequência de Atendimentos</Label>
              <Select value={frequency} onValueChange={setFrequency}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1x">1x por semana</SelectItem>
                  <SelectItem value="2x">2x por semana</SelectItem>
                  <SelectItem value="quinzenal">Quinzenal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Estratégia Foco</Label>
              <Select value={strategy} onValueChange={setStrategy}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="leitura">
                    Reforço de Leitura e Consciência Fonológica
                  </SelectItem>
                  <SelectItem value="escrita">Treino de Escrita e Produção Textual</SelectItem>
                  <SelectItem value="organizacao">Organização Cognitiva e Executiva</SelectItem>
                  <SelectItem value="matematica">Raciocínio Lógico e Cálculo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} className="w-full bg-indigo-600 hover:bg-indigo-700 mt-2">
              <Save className="w-4 h-4 mr-2" /> Salvar Plano
            </Button>
          </div>

          <div className="bg-slate-50 border rounded-lg p-4 flex flex-col h-full">
            <h3 className="font-semibold text-sm uppercase text-muted-foreground mb-4">
              Dashboard de Desenvolvimento Cognitivo
            </h3>
            <div className="flex-1 min-h-[250px] w-full">
              <ChartContainer config={chartConfig} className="w-full h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={DASHBOARD_DATA}
                    layout="vertical"
                    margin={{ top: 0, right: 20, left: 10, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <YAxis
                      dataKey="domain"
                      type="category"
                      tick={{ fill: 'hsl(var(--foreground))', fontSize: 12, fontWeight: 500 }}
                      width={80}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
                      {DASHBOARD_DATA.map((entry, index) => (
                        <cell
                          key={`cell-${index}`}
                          fill={
                            entry.status === 'Risk'
                              ? '#ef4444'
                              : entry.status === 'Stability'
                                ? '#f59e0b'
                                : '#10b981'
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 pt-2 border-t text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div> Risco
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-amber-500 rounded-sm"></div> Estabilidade
              </span>
              <span className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Evolução
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
