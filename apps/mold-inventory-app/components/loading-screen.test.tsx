import { it, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingScreen } from './loading-screen'

describe('LoadingScreen', () => {
    it('Renders correctly', () => {
        render(<LoadingScreen />)
        const textElement = screen.getByText('Loading...');
        expect(textElement).toBeDefined()
    });
});