import { it, describe, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { LoadingScreen } from './loading-screen'

describe('LoadingScreen', () => {
  afterEach(() => {
    cleanup()
  })

  it('Renders correctly', () => {
    render(<LoadingScreen />)
    const loadingEl = screen.getByTestId('loading')
    expect(loadingEl).toBeDefined()
  })
})
