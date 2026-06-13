import type { SenseTrustPilotAuditReport } from '@/types/sensetrust/pilot-console'

interface PilotAuditReportPanelProps {
  report: SenseTrustPilotAuditReport
}

export function PilotAuditReportPanel({ report }: PilotAuditReportPanelProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">{report.audit_report_id}</p>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
        <Field label="steps_passed" value={String(report.steps_passed)} />
        <Field label="steps_failed" value={String(report.steps_failed)} />
        <Field label="payload_status" value={report.public_payload_status} />
        <Field label="certificate_hash" value={report.hash_partials.certificate_hash_partial} />
        <Field label="emission_hash" value={report.hash_partials.emission_hash_partial} />
        <Field label="document_hash" value={report.hash_partials.document_hash_partial} />
      </div>
      <p className="mt-3 rounded-md bg-slate-50 p-3 text-xs font-semibold text-slate-600">
        metadata_only / simulated_only. Nao exibe dado clinico.
      </p>
    </section>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border bg-slate-50 p-2">
      <p className="text-xs font-semibold uppercase text-slate-500">{label}</p>
      <p className="mt-1 break-words font-mono text-xs font-bold text-slate-900">{value}</p>
    </div>
  )
}
