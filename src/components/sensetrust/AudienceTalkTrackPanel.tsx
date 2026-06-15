import type { SenseTrustDemoTalkTrack } from '@/types/sensetrust/demo-readiness'

export function AudienceTalkTrackPanel({ tracks }: { tracks: SenseTrustDemoTalkTrack[] }) {
  return (
    <section className="rounded-md border bg-white p-5 shadow-sm">
      <p className="text-lg font-black text-slate-950">Audience talk tracks</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {tracks.map((track) => (
          <div key={track.track_id} className="rounded-md border border-slate-200 p-3">
            <p className="font-bold text-slate-950">{track.audience}</p>
            <p className="mt-1 text-sm text-slate-600">{track.focus}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">{track.safe_phrase}</p>
            <p className="mt-2 text-xs font-semibold text-rose-700">Proibido: {track.prohibited_phrase}</p>
            <p className="mt-2 text-xs text-slate-600">CTA: {track.cta}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
