import type { SenseTrustMeetingRecord } from '@/types/sensetrust/meeting-intelligence'

export function MeetingRecordPanel({ records }: { records: SenseTrustMeetingRecord[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Meeting records</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {records.map((record) => (
          <div key={record.meeting_id} className="rounded-md border border-slate-200 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="font-bold text-slate-950">{record.meeting_title}</p>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{record.meeting_status}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{record.objective.summary}</p>
            <p className="mt-2 text-xs text-slate-500">Materiais: {record.demo_materials_used.join(', ')}</p>
            <p className="mt-2 text-xs font-semibold text-emerald-700">Feedback {record.feedback_items.length} / Objecoes {record.objections.length} / Proximos passos {record.next_steps.length}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
