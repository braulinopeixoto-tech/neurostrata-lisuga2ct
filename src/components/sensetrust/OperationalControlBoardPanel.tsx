import type { SenseTrustOperationalControlBoard } from '@/types/sensetrust/strategic-scale-operating-model'

export function OperationalControlBoardPanel({ boards }: { boards: SenseTrustOperationalControlBoard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Operational Control Board</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{boards.slice(0, 8).map((board) => <div key={board.control_board_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{board.active_controls.join(' / ')}</p><p className="text-xs text-slate-600">sem operacao real</p></div>)}</div></section>
}
