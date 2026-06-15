import type { SenseTrustAudienceMessage } from '@/types/sensetrust/public-narrative'

interface AudienceMessagingMatrixProps {
  messages: SenseTrustAudienceMessage[]
}

export function AudienceMessagingMatrix({ messages }: AudienceMessagingMatrixProps) {
  return (
    <section className="rounded-md border bg-white p-4 shadow-sm">
      <p className="text-sm font-black text-slate-950">Audience messaging</p>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr>
              <th className="px-2 py-2">audiencia</th>
              <th className="px-2 py-2">dor</th>
              <th className="px-2 py-2">mensagem</th>
              <th className="px-2 py-2">limite</th>
              <th className="px-2 py-2">CTA</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.message_id} className="border-t">
                <td className="px-2 py-2 font-bold">{message.audience}</td>
                <td className="px-2 py-2">{message.pain}</td>
                <td className="px-2 py-2">{message.central_message}</td>
                <td className="px-2 py-2">{message.limit}</td>
                <td className="px-2 py-2">{message.call_to_action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
