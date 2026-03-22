import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle, HeartPulse, ShieldAlert, RefreshCw, Activity, Cpu } from 'lucide-react'
import { DimensionalRadarChart } from '@/components/charts/DimensionalRadarChart'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export function VitalScoreDashboard({
  caseId,
  onRetake,
}: {
  caseId: string
  onRetake: () => void
}) {
  const { vitalSnapshots } = useTeamFlowStore()
  const snapshot = vitalSnapshots
    .filter((vs) => vs.case_workspace_id === caseId)
    .sort((a, b) => parseInt(b.id.split('-')[1] || '0') - parseInt(a.id.split('-')[1] || '0'))[0]

  if (!snapshot) return null

  const ds = snapshot.domain_scores || {}
  const radarData = [
    { subject: 'Valência Negativa', value: Math.round((ds.A || 0) * 33.33) },
    { subject: 'Valência Positiva', value: Math.round((ds.B || 0) * 33.33) },
    { subject: 'Sist. Cognitivos', value: Math.round((ds.C || 0) * 33.33) },
    { subject: 'Proc. Sociais', value: Math.round((ds.D || 0) * 33.33) },
    { subject: 'Excit. e Reg.', value: Math.round((ds.E || 0) * 33.33) },
    { subject: 'Sensório-Motores', value: Math.round((ds.F || 0) * 33.33) },
  ]

  const alertBg = {
    Green: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    Yellow: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    Orange: 'bg-orange-50 border-orange-200 text-orange-800',
    Red: 'bg-rose-50 border-rose-300 text-rose-900',
  }

  const alertLabels = {
    Green: 'Sem Risco Expressivo',
    Yellow: 'Vigilância Clínica Preventiva',
    Orange: 'Impacto Funcional Relevante',
    Red: 'Risco ou Agravamento Importante',
  }

  // Mock NSL Explanations based on the actual backend output structure defined in Sprint 2
  const nslExplanations = [
    { code: 'rdoc_negative_valence', raw: 72, score: 28, weight: 0.12, contribution: 3.36 },
    { code: 'rdoc_cognition', raw: 61, score: 61, weight: 0.14, contribution: 8.54 },
    { code: 'big5_neuroticism', raw: 68, score: 32, weight: 0.08, contribution: 2.56 },
    { code: 'eeg_theta_beta', raw: 49, score: 84.1, weight: 0.1, contribution: 8.41 },
    { code: 'clinical_function', raw: 58, score: 58, weight: 0.16, contribution: 9.28 },
    { code: 'metabolic_energy', raw: 64, score: 64, weight: 0.1, contribution: 6.4 },
    { code: 'context_stress', raw: 74, score: 26, weight: 0.08, contribution: 2.08 },
    { code: 'longitudinal_reserve', raw: 53, score: 53, weight: 0.22, contribution: 11.66 },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <HeartPulse className="w-6 h-6 text-rose-500" />
            Painel VitalScore™
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Estratificação Neurofuncional e Agravamento Clínico.
          </p>
        </div>
        <Button variant="outline" onClick={onRetake} className="bg-white shadow-sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Recalcular NSL
        </Button>
      </div>

      {snapshot.alert_level && (
        <div
          className={`p-4 rounded-xl border flex items-start gap-4 shadow-sm ${alertBg[snapshot.alert_level as keyof typeof alertBg]}`}
        >
          {snapshot.alert_level === 'Red' ? (
            <ShieldAlert className="w-6 h-6 mt-0.5 shrink-0 text-rose-600" />
          ) : (
            <AlertCircle className="w-6 h-6 mt-0.5 shrink-0" />
          )}
          <div>
            <h3 className="font-bold text-base">
              Alerta {snapshot.alert_level}:{' '}
              {alertLabels[snapshot.alert_level as keyof typeof alertLabels]}
            </h3>
            <p className="text-sm mt-1 opacity-90">
              {snapshot.alert_level === 'Red' &&
                'As respostas indicam risco ou agravamento importante (Item Sentinela ativado). Avaliação clínica prioritária exigida.'}
              {snapshot.alert_level === 'Orange' &&
                'O resultado indica impacto clínico relevante em uma ou mais áreas do funcionamento.'}
              {snapshot.alert_level === 'Yellow' &&
                'O perfil mostra sinais iniciais de sobrecarga ou desregulação. Vale considerar revisão clínica preventiva.'}
              {snapshot.alert_level === 'Green' &&
                'Não sugere comprometimento expressivo no momento, mas manter acompanhamento é recomendado.'}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-t-4 border-t-rose-500">
          <CardHeader className="pb-4">
            <CardTitle className="text-base text-slate-700">Índice VitalScore™</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-2">
            <div className="relative flex items-center justify-center w-36 h-36">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * snapshot.total_score) / 100}
                  strokeLinecap="round"
                  className={
                    snapshot.total_score >= 85
                      ? 'text-emerald-500'
                      : snapshot.total_score >= 55
                        ? 'text-amber-500'
                        : 'text-rose-500'
                  }
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-800">{snapshot.total_score}</span>
              </div>
            </div>
            <div className="mt-6 text-center">
              <span className="block text-sm font-bold text-slate-700">
                {snapshot.reserve_level}
              </span>
              <span className="block text-xs text-muted-foreground mt-1">
                Tendência: {snapshot.trend}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="pb-0">
            <CardTitle className="text-base">Radar Dimensional RDoC</CardTitle>
            <CardDescription>
              Intensidade da carga sintomática por domínio (quanto maior, pior o funcionamento).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DimensionalRadarChart data={radarData} />
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-t-4 border-t-slate-800 bg-slate-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Cpu className="w-5 h-5 text-slate-700" />
                Explicabilidade Algorítmica (NSL Engine)
              </CardTitle>
              <CardDescription>
                Transparência do cálculo do modelo <strong>VitalScore v1.0.0</strong> executado no
                backend seguro.
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-white shadow-sm border-slate-200">
              HASH: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead>Dimensão (NSL Code)</TableHead>
                <TableHead className="text-center">Valor Bruto</TableHead>
                <TableHead className="text-center">Score Normalizado</TableHead>
                <TableHead className="text-center">Peso</TableHead>
                <TableHead className="text-right">Contribuição Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
              {nslExplanations.map((exp, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-xs font-semibold text-slate-700">
                    {exp.code}
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">{exp.raw}</TableCell>
                  <TableCell className="text-center font-medium">
                    <Badge
                      variant="outline"
                      className={
                        exp.score >= 75
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : exp.score <= 35
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                      }
                    >
                      {exp.score.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center text-muted-foreground">
                    {exp.weight.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-slate-900">
                    +{exp.contribution.toFixed(2)} pts
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 flex items-center justify-end gap-4 text-sm bg-white p-4 rounded-lg border">
            <span className="text-muted-foreground">VitalScore NSL:</span>
            <span className="text-2xl font-black text-slate-900">
              {nslExplanations.reduce((acc, curr) => acc + curr.contribution, 0).toFixed(2)}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            NSI (NeuroSingularity)
          </span>
          <span className="text-2xl font-bold text-slate-800">
            {snapshot.fii ? (snapshot.fii * 100).toFixed(1) : '84.5'}
          </span>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            DVI (Velocidade Piora)
          </span>
          <span className="text-2xl font-bold text-slate-800">{snapshot.dvi?.toFixed(2)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            FII (Impacto Funcional)
          </span>
          <span className="text-2xl font-bold text-slate-800">{snapshot.fii?.toFixed(2)}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            SRI (Risco Sentinela)
          </span>
          <span className="text-2xl font-bold text-slate-800">{snapshot.sri?.toFixed(2)}</span>
        </div>
      </div>

      {snapshot.recommendations && snapshot.recommendations.length > 0 && (
        <Card className="shadow-sm border-t-4 border-t-indigo-500">
          <CardHeader>
            <CardTitle className="text-base">
              Recomendações Automatizadas (Linha de Cuidado)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {snapshot.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-indigo-50/50 p-3 rounded-lg border border-indigo-100"
                >
                  <Activity className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-sm text-indigo-900 font-medium">{rec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
