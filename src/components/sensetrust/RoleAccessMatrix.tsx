import type { SenseTrustPermission, SenseTrustUserRole } from '@/types/sensetrust/saas-core'

interface RoleAccessMatrixProps {
  roles: Array<{ role: SenseTrustUserRole; permissions: SenseTrustPermission[] }>
}

export function RoleAccessMatrix({ roles }: RoleAccessMatrixProps) {
  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="p-3">papel</th>
            <th className="p-3">emitir</th>
            <th className="p-3">revogar</th>
            <th className="p-3">auditar</th>
            <th className="p-3">billing</th>
            <th className="p-3">portal publico</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(({ role, permissions }) => (
            <tr key={role} className="border-t">
              <td className="p-3 font-bold text-slate-900">{role}</td>
              <td className="p-3">{yesNo(permissions.includes('issue_certificate'))}</td>
              <td className="p-3">{yesNo(permissions.includes('revoke_document'))}</td>
              <td className="p-3">{yesNo(permissions.includes('view_audit_trail'))}</td>
              <td className="p-3">{yesNo(permissions.includes('manage_billing'))}</td>
              <td className="p-3">{yesNo(permissions.includes('view_public_verification'))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function yesNo(value: boolean) {
  return <span className={`font-mono text-xs font-bold ${value ? 'text-emerald-700' : 'text-slate-400'}`}>{value ? 'yes' : 'no'}</span>
}
