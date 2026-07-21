import type { TrustEvent } from '../contracts'

export interface TrustFoundationPanelProps {
  events: TrustEvent[]
}

export function TrustFoundationPanel({ events }: TrustFoundationPanelProps) {
  return (
    <section aria-labelledby="ai-trust-foundation-title">
      <h2 id="ai-trust-foundation-title">AI Trust Foundation</h2>
      <p>Validação técnica local. Não constitui certificação clínica.</p>
      <ul>
        {events.map((event) => (
          <li key={event.eventId}>
            <span>{event.eventType}</span> <strong>{event.status}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}
