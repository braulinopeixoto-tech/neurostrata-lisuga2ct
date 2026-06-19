import type { SenseTrustPilotHumanReviewBoard } from '@/types/sensetrust/strategic-partnership-pilot-proposal-room'

export function PilotHumanReviewBoardPanel({ boards }: { boards: SenseTrustPilotHumanReviewBoard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Pilot Human Review Board</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{boards.slice(0, 8).map((x) => <div key={x.human_review_board_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{x.human_review_board_id}</p><p className="text-xs text-slate-600">{x.items.length} human review items</p></div>)}</div></section>
}
