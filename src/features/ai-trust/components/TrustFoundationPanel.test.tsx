import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { createSyntheticTrustEvent } from '../test-fixtures'
import { TrustFoundationPanel } from './TrustFoundationPanel'

describe('TrustFoundationPanel', () => {
  it('renders the static Trust UI with synthetic mocked data', async () => {
    const event = await createSyntheticTrustEvent()
    render(<TrustFoundationPanel events={[event]} />)

    expect(screen.getByRole('heading', { name: 'AI Trust Foundation' })).toBeInTheDocument()
    expect(screen.getByText('SYNTHETIC_VALIDATION')).toBeInTheDocument()
    expect(screen.getByText(/Não constitui certificação clínica/)).toBeInTheDocument()
  })
})
