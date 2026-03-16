import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { Link as LinkIcon, Activity } from 'lucide-react'
import useAppStore from '@/stores/useAppStore'

export function PatientFeedbackTab({ patient }: { patient: any }) {
  const { patientFeedbacks } = useAppStore()
  const feedbacks = patientFeedbacks[patient.id] || []

  const chartData = [...feedbacks].reverse().map((f: any) => ({
    date: new Date(f.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    mood: f.mood,
    focus: f.focus,
    sleep: f.sleep,
    anxiety: f.anxiety,
  }))

  const config = {
    mood: { label: 'Humor', color: 'hsl(var(--chart-1))' },
    focus: { label: 'Foco', color: 'hsl(var(--chart-2))' },
    sleep: { label: 'Sono', color: 'hsl(var(--chart-3))' },
    anxiety: { label: 'Ansiedade', color: 'hsl(var(--chart-4))' },
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-3 bg-muted/50 p-4 rounded-lg border">
        <Activity className="w-5 h-5 text-primary" />
        <div>
          <h3 className="font-semibold text-foreground">Integração Longitudinal de Sintomas</h3>
          <p className="text-sm text-muted-foreground">
            Monitoramento em tempo real do relato subjetivo do paciente para correlação com
            biomarcadores.
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-t-4 border-t-primary">
        <CardHeader>
          <CardTitle>Histórico de Autoavaliação (Portal do Paciente)</CardTitle>
          <CardDescription>
            Gráfico evolutivo de humor, foco, qualidade de sono e níveis de ansiedade (escala 1 a
            5).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {feedbacks.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground border border-dashed rounded-lg bg-muted/20">
              Nenhum feedback registrado pelo paciente ainda. O paciente pode acessar o Portal para
              realizar a autoavaliação diária.
            </div>
          ) : (
            <div className="space-y-8">
              <div className="h-[350px]">
                <ChartContainer config={config} className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={chartData}
                      margin={{ top: 20, right: 20, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} dy={10} />
                      <YAxis domain={[0, 5]} tickLine={false} axisLine={false} dx={-10} />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend wrapperStyle={{ paddingTop: '20px' }} />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        name="Humor"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="focus"
                        name="Foco"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="sleep"
                        name="Sono"
                        stroke="hsl(var(--chart-3))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="anxiety"
                        name="Ansiedade"
                        stroke="hsl(var(--chart-4))"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>

              <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                  <LinkIcon className="w-4 h-4" /> Correlação Clínica (Motor NSI)
                </h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Os sintomas relatados alimentam diretamente os <strong>Blocos 4, 6 e 7</strong> da
                  sua Avaliação Multidimensional (Perfil Comportamental, RDoC e Big Five), ajustando
                  o baseline de risco clínico dinamicamente na Matriz Neurofuncional.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-lg border-b pb-2">Registros Detalhados</h4>
                <div className="grid gap-3">
                  {feedbacks.map((f: any) => (
                    <div
                      key={f.id}
                      className="p-4 border rounded-lg bg-card shadow-sm hover:border-primary/40 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-sm bg-muted px-2 py-1 rounded">
                          {new Date(f.date).toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-1))]" />{' '}
                          <span className="text-muted-foreground">Humor:</span>{' '}
                          <strong>{f.mood}/5</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-2))]" />{' '}
                          <span className="text-muted-foreground">Foco:</span>{' '}
                          <strong>{f.focus}/5</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-3))]" />{' '}
                          <span className="text-muted-foreground">Sono:</span>{' '}
                          <strong>{f.sleep}/5</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-4))]" />{' '}
                          <span className="text-muted-foreground">Ansiedade:</span>{' '}
                          <strong>{f.anxiety}/5</strong>
                        </div>
                      </div>
                      {f.notes && (
                        <p className="text-sm bg-muted/50 p-3 rounded-md border-l-2 border-l-primary/50 text-slate-700 italic mt-2">
                          "{f.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
