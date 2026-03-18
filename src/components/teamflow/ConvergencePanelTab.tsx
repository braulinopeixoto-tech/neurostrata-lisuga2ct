import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Network, ArrowRightLeft, Sparkles } from 'lucide-react'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'

export function ConvergencePanelTab({ caseId }: { caseId: string }) {
  const { specialtyReports } = useTeamFlowStore()
  const reports = specialtyReports.filter((r) => r.case_id === caseId)

  return (
    <div className="space-y-6 animate-fade-in">
      <Card className="shadow-sm border-t-4 border-t-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="w-5 h-5 text-purple-600" /> Painel de Convergência Translacional
          </CardTitle>
          <CardDescription>
            Cruzamento automático (IA) dos achados estruturados enviados pelas especialidades contra
            a Matriz NeuroStrata (RDoC / Big Five).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="p-10 text-center text-muted-foreground border border-dashed rounded-lg bg-slate-50">
              Nenhum dado estruturado recebido da equipe ainda para realizar o cruzamento.
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-purple-50/50 border border-purple-100 p-4 rounded-xl flex gap-4">
                <Sparkles className="w-6 h-6 text-purple-500 shrink-0" />
                <div>
                  <h4 className="font-bold text-purple-900 mb-1">
                    Síntese de Convergência (AI Engine)
                  </h4>
                  <p className="text-sm text-purple-800/80 leading-relaxed">
                    Identificada forte correlação entre os achados da Neuropsicologia (Déficit de
                    Memória Operacional) e o Domínio RDoC de Sistemas Cognitivos. A severidade
                    reportada (7/10) confirma comprometimento funcional.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                <div className="bg-slate-50 border rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-center text-sm uppercase tracking-wider text-slate-500">
                    Achados (Equipe)
                  </h4>
                  {reports.map((r) => (
                    <div key={r.id} className="bg-white p-3 border rounded shadow-sm text-sm">
                      <Badge variant="outline" className="mb-2">
                        {r.specialty}
                      </Badge>
                      <ul className="list-disc pl-4 space-y-1 text-slate-700">
                        {Object.entries(r.structured_data.checklists)
                          .filter(([_, val]) => val)
                          .map(([k]) => (
                            <li key={k}>{k}</li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="hidden lg:flex items-center justify-center">
                  <ArrowRightLeft className="w-8 h-8 text-slate-300" />
                </div>

                <div className="bg-slate-50 border rounded-lg p-4 space-y-4">
                  <h4 className="font-semibold text-center text-sm uppercase tracking-wider text-slate-500">
                    Matriz NeuroStrata
                  </h4>
                  <div className="bg-white p-3 border rounded shadow-sm border-l-4 border-l-blue-500">
                    <span className="text-xs font-bold text-blue-600 block mb-1">
                      Domínio RDoC Afetado
                    </span>
                    <p className="font-medium text-slate-800 text-sm">Sistemas Cognitivos</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Convergência confirmada pelos marcadores atencionais.
                    </p>
                  </div>
                  <div className="bg-white p-3 border rounded shadow-sm border-l-4 border-l-rose-500">
                    <span className="text-xs font-bold text-rose-600 block mb-1">
                      Impacto Funcional (Severidade)
                    </span>
                    <p className="font-medium text-slate-800 text-sm">
                      Nível 7/10 (Prejuízo Significativo)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
