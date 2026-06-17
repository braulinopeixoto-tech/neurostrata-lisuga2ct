import type { SenseTrustScaleDecisionBoard } from '@/types/sensetrust/institutional-readiness-scale-gate'

export function ScaleDecisionBoardPanel({ boards }: { boards: SenseTrustScaleDecisionBoard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Decision Board</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{boards.slice(0, 8).map((board) => <div key={board.board_id} className="rounded-md bg-slate-50 p-3"><p className="text-xs font-bold uppercase text-slate-500">{board.board_id}</p><p className="font-black text-slate-900">{board.recommended_decision}</p><p className="text-xs text-slate-600">{board.decisions.length} decisoes simuladas</p></div>)}</div></section>
}
