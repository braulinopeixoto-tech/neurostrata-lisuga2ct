import { ScrollArea } from '@/components/ui/scroll-area'
import { useTeamFlowStore } from '@/stores/useTeamFlowStore'
import { History, MessageSquare, ShieldCheck, Activity } from 'lucide-react'

export function CollaborationPanel({ caseId }: { caseId: string }) {
  const { auditLogs } = useTeamFlowStore()

  const logs = auditLogs
    .filter((l) => l.entity_id === caseId || l.entity_id.startsWith(caseId))
    .slice(0, 20)

  return (
    <div className="h-full flex flex-col bg-slate-50 border-l">
      <div className="p-4 border-b bg-white">
        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
          <Activity className="w-4 h-4 text-indigo-600" /> Atividade do NeuroModel
        </h3>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {logs.length === 0 && (
            <p className="text-xs text-muted-foreground text-center mt-10">
              Nenhuma atividade registrada.
            </p>
          )}

          {logs.map((log) => (
            <div key={log.id} className="text-xs border-l-2 border-indigo-200 pl-3 pb-4 relative">
              <div className="absolute w-2 h-2 bg-indigo-500 rounded-full -left-[5px] top-1" />
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-slate-700">{log.actor_id}</span>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <p className="text-slate-600">
                Ação: <span className="font-medium">{log.action}</span>
              </p>
              {log.action === 'UPDATE_BLOCK' && (
                <p className="text-[10px] text-slate-500 mt-1 bg-white border p-1 rounded">
                  Camada atualizada via builder.
                </p>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 p-2 rounded border border-emerald-100">
          <ShieldCheck className="w-4 h-4" /> 100% Auditável (Trust Layer™)
        </div>
      </div>
    </div>
  )
}
