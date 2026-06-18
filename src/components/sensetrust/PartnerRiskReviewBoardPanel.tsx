import type { SenseTrustPartnerRiskReviewBoard } from '@/types/sensetrust/strategic-partner-readiness-room'

export function PartnerRiskReviewBoardPanel({ boards }: { boards: SenseTrustPartnerRiskReviewBoard[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Partner Risk Review Board</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{boards.map((board) => <div key={board.partner_risk_review_board_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{board.highest_risk_level}</p><p className="text-xs text-slate-600">{board.items.length} riscos; sem opiniao legal/regulatoria</p></div>)}</div></section>
}
