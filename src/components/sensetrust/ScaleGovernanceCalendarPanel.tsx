import type { SenseTrustScaleGovernanceCalendar } from '@/types/sensetrust/strategic-scale-operating-model'

export function ScaleGovernanceCalendarPanel({ calendars }: { calendars: SenseTrustScaleGovernanceCalendar[] }) {
  return <section className="rounded-md border bg-white p-4"><h2 className="text-base font-black text-slate-950">Scale Governance Calendar</h2><div className="mt-3 grid gap-2 md:grid-cols-4">{calendars.slice(0, 8).map((calendar) => <div key={calendar.calendar_id} className="rounded-md bg-slate-50 p-3"><p className="font-bold text-slate-900">{calendar.calendar_items.length} janelas</p><p className="text-xs text-slate-600">agenda simulada nao vinculante</p></div>)}</div></section>
}
