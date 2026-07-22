import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { createPersistedEvent } from '../repository/repository-test-fixtures'
import { AiTrustPreviewPage } from './AiTrustPreviewPage'
import type { PreviewGateway, PreviewSession } from './preview-gateway'

function createGateway(overrides: Partial<PreviewGateway> = {}): PreviewGateway {
  return {
    getSession: vi.fn().mockResolvedValue(null),
    subscribeToSession: vi.fn(() => () => undefined),
    signIn: vi.fn(),
    signOut: vi.fn().mockResolvedValue(undefined),
    resolveOrganization: vi.fn(),
    appendSyntheticEvent: vi.fn(),
    loadChain: vi.fn().mockResolvedValue({ events: [], valid: true, errors: [] }),
    verifyCrossOrganizationIsolation: vi.fn().mockResolvedValue(true),
    ...overrides,
  }
}

const session: PreviewSession = { userId: 'synthetic-user', email: 'synthetic@example.invalid' }
const organization = {
  organizationId: '00000000-0000-4000-8000-000000000123',
  memberRole: 'MEMBER' as const,
}

afterEach(cleanup)

describe('AiTrustPreviewPage', () => {
  it('denies append actions to anonymous users', async () => {
    render(<AiTrustPreviewPage gateway={createGateway()} />)

    await waitFor(() =>
      expect(screen.getByTestId('authentication-status')).toHaveTextContent('ANONYMOUS'),
    )
    expect(screen.getByRole('button', { name: /append synthetic event/i })).toBeDisabled()
  })

  it('renders a valid retrieved chain for the authenticated organization', async () => {
    const event = await createPersistedEvent({ eventType: 'PREVIEW_VALIDATION' })
    const gateway = createGateway({
      getSession: vi.fn().mockResolvedValue(session),
      resolveOrganization: vi.fn().mockResolvedValue(organization),
      loadChain: vi.fn().mockResolvedValue({ events: [event], valid: true, errors: [] }),
    })
    render(<AiTrustPreviewPage gateway={gateway} />)

    await waitFor(() =>
      expect(screen.getByTestId('organization-context')).not.toHaveTextContent('NOT_RESOLVED'),
    )
    fireEvent.click(screen.getByRole('button', { name: /load chain/i }))

    await waitFor(() => expect(screen.getByTestId('chain-status')).toHaveTextContent('VALID'))
    expect(screen.getByText('PREVIEW_VALIDATION')).toBeInTheDocument()
  })

  it('renders normalized repository failures without exposing secrets', async () => {
    const gateway = createGateway({
      getSession: vi.fn().mockResolvedValue(session),
      resolveOrganization: vi.fn().mockResolvedValue(organization),
      loadChain: vi.fn().mockRejectedValue(new Error('Persistence access was denied.')),
    })
    render(<AiTrustPreviewPage gateway={gateway} />)

    await waitFor(() => expect(screen.getByRole('button', { name: /load chain/i })).toBeEnabled())
    fireEvent.click(screen.getByRole('button', { name: /load chain/i }))

    await waitFor(() =>
      expect(screen.getByTestId('preview-error')).toHaveTextContent(
        'Persistence access was denied.',
      ),
    )
  })

  it('renders the staging route without clinical or personal content', async () => {
    const { container } = render(<AiTrustPreviewPage gateway={createGateway()} />)
    await waitFor(() => expect(screen.getByTestId('ai-trust-preview')).toBeInTheDocument())

    const text = container.textContent?.toLowerCase() ?? ''
    expect(text).toContain('staging only')
    expect(text).not.toMatch(/patient|diagnosis|eeg|clinical record/)
  })
})
