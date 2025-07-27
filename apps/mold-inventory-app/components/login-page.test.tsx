import { it, describe, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginPage } from './login-page'

// mock auth0 library
import * as auth0 from '@auth0/auth0-react'
vi.mock('@auth0/auth0-react')

// fake user
const fakeUser = {
    email: "user@test.com",
    email_verified: true,
    sub: ""
};

describe('LoginPage', () => {
    it('Sign In button calls Auth0 loginWithRedirect', async () => {
        // Prepare

        // Mock useAuth0
        const loginWithRedirect = vi.fn();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (auth0 as any).useAuth0 = vi.fn().mockReturnValue({
            isAuthenticated: true,
            user: fakeUser,
            logout: vi.fn(),
            loginWithRedirect,
            getAccessTokenSilently: vi.fn(),
            getAccessTokenWithPopup: vi.fn(),
            getIdTokenClaims: vi.fn(),
            loginWithPopup: vi.fn(),
            handleRedirectCallback: vi.fn(),
            isLoading: false,
            error: undefined
        });

        const user = userEvent.setup()

        
        // Act

        // Render login page
        render(<LoginPage />)

        // Click the "Sign In" button
        const signInButton = screen.getByText('Sign In');
        await user.click(signInButton)

        
        // Expect

        // "Sign In" button called loginWithRedirect
        expect(auth0.useAuth0).toHaveBeenCalled();
        expect(loginWithRedirect).toHaveBeenCalled();
    });
});