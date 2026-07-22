import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { createPersistedEvent } from '../repository/repository-test-fixtures'
import type { PreviewGateway } from '../preview/preview-gateway'
import { AiTrustDashboardIntegration } from './AiTrustDashboardIntegration'

const session = { userId: 'synthetic-user', email: 'synthetic@example.invalid' }
const organization = {
  organizationId: '00000000-0000-4000-8000-000000000123',
  memberRole: 'MEMBER' as const,
}

async function createGateway() {
  const event = await createPersistedEvent({ eventType: 'PREVIEW_VALIDATION' })
  const appendSyntheticEvent = vi.fn().mockResolvedValue(event)
  const gateway: PreviewGateway = {
    getSession: vi.fn().mockResolvedValue(session),
    subscribeToSession: vi.fn(() => () => undefined),
    resolveOrganization: vi.fn().mockResolvedValue(organization),
    appendSyntheticEvent,
    loadChain: vi.fn().mockResolvedValue({ events: [event], valid: true, errors: [] }),
    verifyCrossOrganizationIsolation: vi.fn().mockResolvedValue(true),
  }
  return { gateway, appendSyntheticEvent }
}

afterEach(cleanup)

describe('AI Trust NeuroStrata dashboard integration', () => {
  it('renders authenticated status, synthetic timeline and valid chain details', async () => {
    const { gateway } = await createGateway()
    render(
      <MemoryRouter>
        <AiTrustDashboardIntegration gateway={gateway} />
      </MemoryRouter>,
    )

    await waitFor(() =>
      expect(screen.getByTestId('ai-trust-status-card')).toHaveTextContent('VALID'),
    )
    expect(screen.getByTestId('ai-trust-status-card')).toHaveTextContent('AUTHENTICATED')
    expect(screen.getByTestId('ai-trust-status-card')).toHaveTextContent('DENIED_AS_EXPECTED')
    expect(screen.getByTestId('synthetic-trust-timeline')).toHaveTextContent('PREVIEW_VALIDATION')
    expect(screen.getByTestId('trust-details-panel')).toHaveTextContent('skip-preview-demo-001')
  })

  it('appends only a synthetic event through the governed gateway', async () => {
    const { gateway, appendSyntheticEvent } = await createGateway()
    render(
      <MemoryRouter>
        <AiTrustDashboardIntegration gateway={gateway} />
      </MemoryRouter>,
    )

    const appendButton = await screen.findByRole('button', { name: 'Registrar evento' })
    await waitFor(() => expect(appendButton).toBeEnabled())
    fireEvent.click(appendButton)

    await waitFor(() => expect(appendSyntheticEvent).toHaveBeenCalledOnce())
    expect(appendSyntheticEvent).toHaveBeenCalledWith(
      organization,
      'skip-preview-demo-001',
      'synthetic-user',
    )
  })
})
